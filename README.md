<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1pmO0u5tASolpnNfyWUe1PBSDBcbfc7xV

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## CI/CD to VPS (auto-deploy on push)

This repo now includes:

- `CI` workflow: runs type-check and build for PRs/pushes.
- `Deploy to VPS` workflow: builds on GitHub Actions and uploads `dist/` to your VPS on every push to `main`.

### 1) Prepare your VPS (one-time)

1. Install and configure Nginx.
2. Choose a deploy directory, for example: `/var/www/emani`.
3. Point your Nginx server root to that directory.

Example Nginx block:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/emani;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

Then reload Nginx:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### 2) Create SSH deploy key (one-time)

On your local machine:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/emani_actions
```

Add the public key to VPS user authorized keys:

```bash
ssh-copy-id -i ~/.ssh/emani_actions.pub user@your-vps-host
```

Copy the private key content for GitHub secret:

```bash
cat ~/.ssh/emani_actions
```

### 3) Add GitHub Actions secrets

In GitHub -> Settings -> Secrets and variables -> Actions, add:

- `VPS_HOST`: your VPS IP or hostname
- `VPS_USER`: SSH user that can write to deploy directory
- `VPS_PATH`: deploy path (example `/var/www/emani`)
- `VPS_SSH_KEY`: private SSH key content (`~/.ssh/emani_actions`)
- `VPS_PORT`: optional (defaults to `22`)

### 4) Deploy

Push to `main`. The workflow `.github/workflows/deploy-vps.yml` will:

1. install dependencies
2. type-check
3. build Vite app
4. `rsync --delete` build output to your VPS path

Changes appear immediately after upload (Nginx serves updated static files right away).

If you do not need GitHub Pages deployment, you can remove `.github/workflows/deploy.yml`.
