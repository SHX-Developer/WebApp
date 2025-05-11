#!/bin/bash

echo "📦 Установка Python-зависимостей..."
pip install -r requirements.txt || exit 1

echo "📦 Установка и сборка фронтенда..."
cd frontend || exit 1
npm install || exit 1
npm run build || exit 1
cd ..

echo "🚀 Запуск FastAPI..."
uvicorn main:app --host 0.0.0.0 --port 8000
