#!/bin/bash
set -e

# 第一步：只用 HTTP 启动 nginx，供 certbot 验证
docker compose up -d nginx
sleep 3

# 第二步：申请证书
docker compose run --rm certbot certonly \
  --webroot -w /var/www/certbot \
  --email admin@dengw.xyz \
  --agree-tos --no-eff-email \
  -d dengw.xyz -d www.dengw.xyz

# 第三步：将 SSL server block 追加到 nginx.conf
cat >> nginx.conf << 'EOF'

server {
    listen 443 ssl;
    server_name dengw.xyz www.dengw.xyz;
    root /usr/share/nginx/html;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/dengw.xyz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dengw.xyz/privkey.pem;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
}
EOF

# 第四步：重启 nginx 加载 SSL 配置
docker compose restart nginx
echo "部署完成！访问 https://dengw.xyz"
