# AKRI-BAKES

Premium bakery website (Akri Bakes, Dimapur, Nagaland) — Next.js static export deployed to GitHub Pages. Branch: `complete-ordering-system`.

## Deploy

- Live: https://debbarmachopreng7-crypto.github.io/AKRI-BAKES/
- Remote: https://github.com/debbarmachopreng7-crypto/AKRI-BAKES.git (branch `complete-ordering-system`)
- Workflow: `.github/workflows/deploy.yml` — build + `actions/deploy-pages@v4`, runs on push, workflow_dispatch, and every 20 min via `schedule`
- Deploy takes ~5-10 min (large video assets). Verify: `curl -s "https://api.github.com/repos/debbarmachopreng7-crypto/AKRI-BAKES/actions/runs?per_page=1"`
- API access (repo owner): token available via keychain — `git credential-osxkeychain get` for host github.com; scopes include `repo` + `workflow`. Store in `/tmp/ghtok.txt` for the session.

## 2026-08-06: GitHub Pages backend degradation

Deployments created but never processed; `deploy-pages` times out after ~10 min ("deployment_queued" forever), then the deployment ends in `failure`. Started ~11:40 UTC 2026-08-06, matches widespread reports (actions/deploy-pages#406, same-day comments). Not caused by repo content — the identical artifact deployed fine at 09:05 UTC.

Handled by auto-heal: workflow retries once per run + re-runs every 20 min via schedule. New homepage commits (`bba33d3` → `48a9c97`) are built and will deploy automatically when the backend recovers. Site stays live on the previous deploy meanwhile.

Once deploy succeeds: remove the `schedule` block from `deploy.yml`.

## Build / verify

- `npm run build` (static export to `out/`; Pages served with `/AKRI-BAKES/` prefix via `next.config.mjs` basePath)
- Local preview: `python3 -m http.server 9444` serving `out/`
- Homepage: `app/page.js`; Gallery: `app/gallery/page.js`

## Video assets (hero)

- `public/gallery/wedding/wedding-anung-joel-4k.mp4` — HEVC `hvc1` 2160×3840, ~25.3MB (`libx265 -crf 30 -preset medium -tag:v hvc1 -movflags +faststart`)
- `public/gallery/wedding/wedding-anung-joel-1080p.mp4` — h264 `avc1` 1080×1920, ~26.5MB (`libx264 -crf 22 -preset slow -tag:v avc1 -movflags +faststart`)
- Browser picks HEVC on Safari/iOS/Chrome-Mac, h264 elsewhere; cache-bust `?v=2`
- Source is Instagram 720×1280 (source-limited); AI-upscaled
- Upscale toolchain in `/var/folders/vr/xdjytrrj12d_c2p114d64_kc0000gn/T/opencode/upscale/` (venv python, `upscale.py`, `run_upscale.py`, `hero/frames_out/` = 900 valid frames)
- Hero uses `preload="metadata"` + `fetchPriority="high"` for poster-first progressive load
