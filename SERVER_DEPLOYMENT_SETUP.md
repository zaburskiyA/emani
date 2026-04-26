# Server Deployment Configuration (emani)

This document describes the full deployment setup that was configured for this project:

- SSH key-based access (passwordless login)
- Nginx web server
- Git push-to-deploy pipeline (`./deploy.sh`)
- Domain + HTTPS helper (`./connect-domain.sh`)
- DNS requirements

Current status:

- HTTPS is active for both `emanis.ru` and `www.emanis.ru`
- HTTP redirects to HTTPS for both hostnames

Server used in this setup:

- Host: `5.42.123.97`
- User: `root`
- OS: Ubuntu 24.04 LTS

---

## 1) SSH configuration (passwordless)

### What was done

1. Ensured a local SSH key exists (`~/.ssh/id_ed25519` and `~/.ssh/id_ed25519.pub`).
2. Copied the local public key to the server `root` account.
3. Verified key-only login works.

### Verification command

```bash
ssh -o BatchMode=yes root@5.42.123.97 "whoami && hostname"
```

Expected behavior: returns `root` and server hostname without asking for password.

---

## 2) Server packages installed

Installed on the server:

- `git`
- `rsync`
- `nginx`
- `ufw`
- `certbot`
- `python3-certbot-nginx`
- `nodejs` (upgraded to Node 22)

Runtime verified:

- `node -v` -> `v22.22.1`
- `npm -v` -> `10.9.4`

---

## 3) Directory layout on the server

```text
/opt/emani.git              # bare git repository (deployment remote)
/opt/emani.git/hooks/post-receive
/var/www/emani/current      # checked out working tree from main
/var/www/emani/site         # built static files served by nginx
```

---

## 4) Git push-to-deploy pipeline

### Local git remote

Local repository has an additional remote:

```bash
git remote add production root@5.42.123.97:/opt/emani.git
```

### Deploy script

File: `deploy.sh`

```bash
./deploy.sh
```

Default behavior:

- pushes `main` branch to remote `production`
- triggers server-side `post-receive` hook automatically

Optional usage:

```bash
./deploy.sh <remote> <branch>
```

### Server hook behavior

Server file: `/opt/emani.git/hooks/post-receive`

The hook deploys only when `refs/heads/main` is pushed. It:

1. checks out latest `main` into `/var/www/emani/current`
2. runs `npm ci`
3. runs `npm run build`
4. syncs `dist/` to `/var/www/emani/site` with `rsync --delete`
5. sets ownership to `www-data:www-data`
6. reloads nginx

Equivalent hook content:

```bash
#!/usr/bin/env bash
set -euo pipefail

APP_NAME="emani"
REPO_DIR="/opt/${APP_NAME}.git"
WORK_TREE="/var/www/${APP_NAME}/current"
PUBLIC_DIR="/var/www/${APP_NAME}/site"
BRANCH="main"

read -r oldrev newrev refname
if [ "$refname" != "refs/heads/${BRANCH}" ]; then
  echo "Skipping deploy: pushed ref ${refname}, deploy branch is ${BRANCH}."
  exit 0
fi

echo "Deploying commit ${newrev} to ${WORK_TREE}"

mkdir -p "$WORK_TREE" "$PUBLIC_DIR"

git --work-tree="$WORK_TREE" --git-dir="$REPO_DIR" checkout -f "$BRANCH"

cd "$WORK_TREE"

npm ci
npm run build

rsync -a --delete dist/ "$PUBLIC_DIR/"
chown -R www-data:www-data "$PUBLIC_DIR"

if command -v systemctl >/dev/null 2>&1; then
  systemctl reload nginx || true
fi

echo "Deployment completed successfully."
```

---

## 5) Nginx configuration

Nginx site file:

- `/etc/nginx/sites-available/emani.conf`
- symlinked to `/etc/nginx/sites-enabled/emani.conf`

Configured server block (initial HTTP setup before certbot):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name emanis.ru www.emanis.ru;

    root /var/www/emani/site;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

After SSL issuance with certbot, nginx was updated to:

- listen on `443` for IPv4 and IPv6
- use certificate from `/etc/letsencrypt/live/www.emanis.ru/`
- redirect `http://emanis.ru` and `http://www.emanis.ru` to HTTPS

Current production file: `/etc/nginx/sites-available/emani.conf`

Default nginx site was removed (`/etc/nginx/sites-enabled/default`).

Validation command:

```bash
nginx -t
```

---

## 6) Firewall configuration (UFW)

Enabled rules:

- `OpenSSH`
- `Nginx Full`

Check status:

```bash
ufw status
```

---

## 7) Domain + HTTPS helper

File: `connect-domain.sh`

Usage:

```bash
./connect-domain.sh <domain> <email> [host]
```

Example:

```bash
./connect-domain.sh emanis.ru admin@emanis.ru
```

What it does:

1. writes nginx domain config (`server_name <domain> www.<domain>`)
2. reloads nginx
3. runs certbot (`--nginx`) for both root and `www`
4. enables HTTP -> HTTPS redirect

Note:

- If a certificate already exists for only one name (for example, only `www`), you may need certbot `--expand` to include both names in one cert.
- Command used in production to finalize both domains:

```bash
certbot --nginx --expand -d emanis.ru -d www.emanis.ru -m admin@emanis.ru --agree-tos --non-interactive --redirect
```

---

## 8) DNS requirements for this setup

For the site to open from this server, DNS must point to `5.42.123.97`.

Required records:

- `A  emanis.ru      -> 5.42.123.97`
- `A  www.emanis.ru  -> 5.42.123.97`

Optional IPv6:

- `AAAA emanis.ru -> <server_ipv6>` only if that IPv6 is configured on this server and nginx serves this host on IPv6.

Important:

- Remove conflicting `A` records for `emanis.ru` that point to other IPv4 addresses.
- Remove conflicting `AAAA` record if it points to another host (unless that IPv6 belongs to this same server and is configured).

Mail records (`MX`, `TXT`, `DKIM`) can stay unchanged.

---

## 9) End-to-end deploy flow

1. Commit local changes to `main`.
2. Run:

```bash
./deploy.sh
```

3. Git push triggers server hook.
4. Server builds and publishes new static files.
5. Nginx serves updated version.

---

## 10) Useful checks

### Local

```bash
git remote -v
./deploy.sh
```

### Server

```bash
ssh root@5.42.123.97 "systemctl is-active nginx"
ssh root@5.42.123.97 "test -f /var/www/emani/site/index.html && echo OK"
```

### Public

```bash
curl -I http://5.42.123.97
curl -I http://emanis.ru
curl -I http://www.emanis.ru
curl -I https://emanis.ru
curl -I https://www.emanis.ru
```

### SSL details

```bash
ssh root@5.42.123.97 "certbot certificates"
ssh root@5.42.123.97 "certbot renew --dry-run"
```

---

## 11) Recommended hardening (optional)

After confirming SSH keys work from all admin machines, disable password SSH auth on the server:

- set `PasswordAuthentication no` in `/etc/ssh/sshd_config`
- reload SSH service

Do this carefully to avoid locking yourself out.
