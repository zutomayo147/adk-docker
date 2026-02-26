# ADK Docker Starter

Python (FastAPI) と React (Vite + Tailwind CSS) が動作する、最小限の Docker Compose 開発環境です。

## 🚀 起動方法

### 前提条件

- Docker / Docker Compose がインストールされていること

### 手順

1. リポジトリをビルド・起動します：
   ```bash
   docker compose up -d
   ```
2. ブラウザで以下にアクセスします：
   - **フロントエンド**: [http://localhost:3000](http://localhost:3000)
   - **バックエンド API**: [http://localhost:8000](http://localhost:8000)
   - **API ドキュメント (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🛠 技術構成

### バックエンド

- **言語/フレームワーク**: Python 3.12 / FastAPI
- **バリデーション**: Pydantic
- **ポート**: 8000 (固定)
- **特徴**: Pydantic モデルによる厳密な型定義、ホットリロード対応。

### フロントエンド

- **言語/フレームワーク**: TypeScript / React (Vite)
- **スタイリング**: Tailwind CSS
- **ポート**: 3000 (固定)
- **特徴**: バックエンドとの疎通確認済み、モダンなダークテーマUI。

---

## 📂 プロジェクト構造

```text
.
├── backend/            # バックエンド (FastAPI)
│   ├── app/            # アプリケーションロジック
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/           # フロントエンド (React)
│   ├── src/            # ソースコード
│   ├── Dockerfile
│   └── vite.config.ts
├── docker-compose.yml  # コンテナ統合管理
└── .env               # 環境変数
```

---

## 📝 開発ルール

- ポート番号 (3000/8000) は変更しないでください。
- バックエンドの API 更新時は `backend/app/schemas.py` の Pydantic モデルを更新してください。
- フロントエンドのスタイリングは Tailwind CSS を優先してください。
