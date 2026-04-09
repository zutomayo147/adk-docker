/**
 * Regression test for the blank screen bug fixed in commit 4afbd60c.
 *
 * Root cause: With `verbatimModuleSyntax: true` in tsconfig.app.json,
 * TypeScript requires type-only imports to use `import type { X }` syntax.
 * The old code used `import { Report }` (value-style import of a type) in
 * ResultDisplay.tsx and `import { type Step }` (inline type qualifier) in
 * usePredict.ts, both of which trigger TS1484 errors. This caused `tsc -b`
 * (and therefore `npm run build`) to fail, producing a blank screen in the
 * WebUI.
 *
 * This test:
 *  1. Compiles the current (fixed) source and asserts zero TS errors.
 *  2. Compiles synthetic snippets that reproduce the old buggy import
 *     patterns and asserts that TS1484 is emitted — proving that without
 *     the fix the build would still break.
 */

import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

/** Absolute path to the project's local tsc binary */
const TSC = path.resolve(__dirname, "../../node_modules/.bin/tsc");
const ROOT = path.resolve(__dirname, "../..");

describe("Blank screen regression (commit 4afbd60c)", () => {
  it("should compile the project without TypeScript errors (npm run build)", () => {
    // `tsc -b` is the first half of `npm run build` ("tsc -b && vite build").
    // If this succeeds the TS1484 bug is not present.
    expect(() =>
      execSync(`${TSC} -b`, { cwd: ROOT, stdio: "pipe" }),
    ).not.toThrow();
  });

  it("should reject a value-style import of a type-only export (TS1484)", () => {
    // Reproduces the old buggy import in ResultDisplay.tsx:
    //   import { Report } from "../hooks/usePredict";
    // `Report` is an interface (type-only) so under verbatimModuleSyntax
    // it MUST use `import type`.
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "ts1484-"));
    const srcDir = path.join(tmp, "src");
    fs.mkdirSync(srcDir, { recursive: true });

    // Minimal type-only export
    fs.writeFileSync(
      path.join(srcDir, "types.ts"),
      'export interface Report { agent: string; report: string; }\n',
    );

    // Buggy value-style import
    fs.writeFileSync(
      path.join(srcDir, "bad.ts"),
      'import { Report } from "./types";\nconst r: Report = { agent: "", report: "" };\nconsole.log(r);\n',
    );

    // tsconfig that mirrors the project's settings
    fs.writeFileSync(
      path.join(tmp, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          moduleResolution: "bundler",
          verbatimModuleSyntax: true,
          strict: true,
          noEmit: true,
          skipLibCheck: true,
          erasableSyntaxOnly: true,
        },
        include: ["src"],
      }),
    );

    let output = "";
    try {
      execSync(`${TSC} --noEmit -p ${tmp}/tsconfig.json`, {
        cwd: tmp,
        stdio: "pipe",
      });
    } catch (e: unknown) {
      const err = e as { stdout?: Buffer; stderr?: Buffer };
      output =
        (err.stdout?.toString() ?? "") + (err.stderr?.toString() ?? "");
    }

    // Clean up
    fs.rmSync(tmp, { recursive: true, force: true });

    // TS1484: 'Report' is a type and must be imported using a type-only import
    expect(output).toMatch(/TS1484/);
  });

  it("should use 'import type' (not value import) for Report in ResultDisplay.tsx", () => {
    // Directly verify that the fixed source files use the correct
    // `import type { X }` syntax for type-only imports. If someone
    // reverts to the old `import { Report }` pattern, this test will
    // catch it before `tsc -b` even runs.
    const resultDisplay = fs.readFileSync(
      path.join(ROOT, "src/components/ResultDisplay.tsx"),
      "utf-8",
    );
    const usePredict = fs.readFileSync(
      path.join(ROOT, "src/hooks/usePredict.ts"),
      "utf-8",
    );

    // ResultDisplay.tsx must NOT have a bare value import of Report
    expect(resultDisplay).not.toMatch(
      /^import\s*\{\s*Report\s*\}\s*from/m,
    );
    // It should use `import type { Report }`
    expect(resultDisplay).toMatch(
      /^import\s+type\s+\{\s*Report\s*\}\s*from/m,
    );

    // usePredict.ts must use `import type { Step }` (not `import { type Step }`)
    expect(usePredict).toMatch(
      /^import\s+type\s+\{\s*Step\s*\}\s*from/m,
    );
  });
});
