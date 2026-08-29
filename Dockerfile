# syntax=docker/dockerfile:1

# --- build: Astro 静的サイトを dist/ に出力 ---
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- runtime: 静的ファイルを nginx で配信（Cloud Run の PORT 対応） ---
FROM nginx:1.27-alpine AS runner

# Cloud Run は PORT を注入する（未設定時は 8080）
ENV PORT=8080
# envsubst が nginx 変数（$uri 等）を壊さないよう、置換対象を PORT のみに限定
ENV NGINX_ENVSUBST_FILTER=^PORT$

COPY --from=builder /app/dist /usr/share/nginx/html

# 公式 nginx イメージは /etc/nginx/templates/*.template を起動時に envsubst する
COPY <<'EOF' /etc/nginx/templates/default.conf.template
server {
    listen       ${PORT};
    server_name  _;
    root         /usr/share/nginx/html;
    index        index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    error_page 404 /404.html;
}
EOF

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
