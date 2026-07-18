# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

基于中医体质辨识的免疫力提升系统（纯静态站点）。

- `index.html` — 体质问卷（16题，覆盖8种体质）
- `report.html` — 个性化体质报告
- 无构建步骤，无依赖，无测试框架

## 本地预览

直接用浏览器打开 `index.html`，无需服务器。

## 部署架构

生产环境运行在 `dengw.xyz`，集成到服务器已有的 `xray-nginx` Docker 容器中：

- HTML 文件路径：`/root/xray-deploy/nginx/html/`
- Nginx 配置：`/root/xray-deploy/nginx/conf.d/trojan.conf`
- Clean URLs 由 nginx `try_files $uri $uri.html` 实现（`/report` → `report.html`）
- SSL 证书已由 certbot 签发，挂载在 `/root/xray-deploy/certbot/conf/`

**更新静态文件到生产环境：**
```bash
cp index.html report.html /root/xray-deploy/nginx/html/
# 无需重启 nginx，静态文件立即生效
```

**修改 nginx 配置后重载：**
```bash
docker exec xray-nginx nginx -t       # 验证语法
docker exec xray-nginx nginx -s reload
```

## 注意事项

- `Dockerfile`、`docker-compose.yml`、`nginx.conf`、`deploy.sh` 是备用参考文件，当前生产环境未使用（已集成到 xray-nginx）
- `vercel.json` 保留用于 Vercel 备用部署（cleanUrls: true）
- 修改 `trojan.conf` 时注意保留 Xray WebSocket 代理的 `location /7bef9f0437bcd213` 块
