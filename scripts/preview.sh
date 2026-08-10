#!/usr/bin/env bash
# 预览生产构建产物
cd "$(dirname "$0")/.." || exit 1
pnpm preview
