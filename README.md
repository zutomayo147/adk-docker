# ADK Docker Starter

Python (FastAPI) と React (Vite + Tailwind CSS) が動作する、AI エージェント開発用の Docker Compose 環境です。
最新のアップデートにより、**Deep Research AI** 風のプレミアムな Web UI が搭載されました。

## 🚀 起動方法

### 前提条件

- Docker / Docker Compose がインストールされていること

### 手順

1. リポジトリをビルド・起動します：
   ```bash
   docker compose up -d
   ```
2. ブラウザで以下にアクセスします：
   - **フロントエンド (Deep Research UI)**: [http://localhost:3000](http://localhost:3000)
   - **バックエンド API**: [http://localhost:8000](http://localhost:8000)
   - **API ドキュメント (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)

### 💻 CLI 実行方法

WebUI を経由せずに、バックエンドコンテナ内でエージェントを直接実行することができます。

```bash
docker compose exec backend python -m cli_run
```

カスタムプロンプトを指定する場合：

```bash
docker compose exec backend python -m cli_run --prompt "明日の日経平均の動向を、特に半導体株に注目して分析してください。"
```

---

## ✨ 最新の Web UI 機能

スクリーンショットを参考に、高機能かつプレミアムなリサーチダッシュボードを実装しました。

- **Thinking Process**: AI の思考ステップをリアルタイム（模倣）で視覚化
- **Project Context**: 関連スニペット、マーケットセンチメント、ライブ引用の表示
- **Responsive Layout**: サイドバー、メインコンテンツ、コンテキストパネルの 3 カラム構成
- **Dark Theme**: ガラスモーフィズムと洗練されたアニメーションを採用

---

## 🛠 技術構成

### バックエンド

- **言語/フレームワーク**: Python 3.12 / FastAPI / [google-adk](https://github.com/google-gemini/google-adk)
- **バリデーション**: Pydantic
- **ポート**: 8000 (固定)
- **特徴**: ADK エージェントによる推論、ストリーミングログ、Pydantic モデルによる厳密な型定義。

### フロントエンド

- **言語/フレームワーク**: TypeScript / React (Vite)
- **スタイリング**: Tailwind CSS 4.0
- **ポート**: 3000 (固定)
- **特徴**: プレミアムな「Deep Research AI」風 UI、コンポーネント指向設計。

---

## 📂 プロジェクト構造

```text
.
├── backend/            # バックエンド (FastAPI + ADK Agents)
│   ├── app/            # アプリケーションロジック・エージェント定義
│   ├── cli_run.py      # CLI 実行スクリプト
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/           # フロントエンド (React)
│   ├── src/            # デザイン済みコンポーネント (Sidebar, Navbar, etc.)
│   ├── Dockerfile
│   └── vite.config.ts
├── docker-compose.yml  # コンテナ統合管理
└── .env               # 環境変数 (UPPER_SNAKE_CASE)
```

---

## 📝 開発ルール

- ポート番号 (3000/8000) は絶対に変更しないでください。
- バックエンドの API 更新時は Pydantic モデルを定義し、dict での扱いは避けてください。
- スタイリングは Tailwind CSS を優先し、CSS の重複定義は避けてください。
- AI コンテキスト制御のため、`.geminiignore` を活用しています。
