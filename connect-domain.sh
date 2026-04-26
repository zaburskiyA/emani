#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${1:-}"
EMAIL="${2:-}"
HOST="${3:-5.42.123.97}"
SITE_NAME="emani"
PUBLIC_DIR="/var/www/${SITE_NAME}/site"

if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
  echo "Usage: ./connect-domain.sh <domain> <email> [host]" >&2
  echo "Example: ./connect-domain.sh example.com admin@example.com" >&2
  exit 1
fi

echo "Configuring Nginx and HTTPS for $DOMAIN on $HOST..."

ssh "root@${HOST}" 'bash -s' -- "$DOMAIN" "$EMAIL" "$PUBLIC_DIR" <<'REMOTE'
set -euo pipefail

DOMAIN="$1"
EMAIL="$2"
PUBLIC_DIR="$3"

if [ ! -d "$PUBLIC_DIR" ]; then
  echo "Public dir not found: $PUBLIC_DIR" >&2
  exit 1
fi

cat > /etc/nginx/sites-available/emani.conf <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    root ${PUBLIC_DIR};
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/emani.conf /etc/nginx/sites-enabled/emani.conf
nginx -t
systemctl reload nginx

certbot --nginx \
  -d "$DOMAIN" \
  -d "www.$DOMAIN" \
  -m "$EMAIL" \
  --agree-tos \
  --non-interactive \
  --redirect

echo "Domain and HTTPS configured for $DOMAIN"
REMOTE

echo "Done. Visit: https://${DOMAIN}"
