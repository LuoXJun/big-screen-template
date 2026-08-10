#!/usr/bin/env bash
# 类型检查 + 生产构建
cd "$(dirname "$0")/.." || exit 1
pnpm build
