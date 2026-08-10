#!/usr/bin/env bash
# 启动开发服务器（http://localhost:3005）
cd "$(dirname "$0")/.." || exit 1
pnpm dev
