.PHONY: up down restart build logs ps shell-backend shell-frontend test-frontend help

# Default target
help:
	@echo "使用可能なコマンド:"
	@echo "  make up             - Dockerコンテナをバックグラウンドで起動"
	@echo "  make down           - Dockerコンテナを停止・削除"
	@echo "  make restart        - Dockerコンテナを再起動"
	@echo "  make build          - Dockerイメージをビルド"
	@echo "  make logs           - ログを表示 (Ctrl+Cで終了)"
	@echo "  make ps             - コンテナの状態を表示"
	@echo "  make shell-backend  - バックエンドコンテナでシェルを実行"
	@echo "  make shell-frontend - フロントエンドコンテナでシェルを実行"
	@echo "  make test-frontend  - フロントエンドのリンターを実行"
	@echo "  make help           - このヘルプを表示"

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

build:
	docker compose build

logs:
	docker compose logs -f

ps:
	docker compose ps

shell-backend:
	docker compose exec backend /bin/bash

shell-frontend:
	docker compose exec frontend /bin/sh

test-frontend:
	docker compose exec frontend npm run lint
