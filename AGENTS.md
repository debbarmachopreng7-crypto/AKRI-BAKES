# AKRI-BAKES

Premium bakery website (Akri Bakes, Dimapur, Nagaland) — Next.js static export deployed to GitHub Pages. Branch: `complete-ordering-system`.

## Deploy

- Live: https://debbarmachopreng7-crypto.github.io/AKRI-BAKES/
- Remote: https://github.com/debbarmachopreng7-crypto/AKRI-BAKES.git (branch `complete-ordering-system`)
- Workflow: `.github/workflows/deploy.yml` — build + `actions/deploy-pages@v4`, runs on push and workflow_dispatch
- Deploy takes ~5-10 min (large video assets). Verify: `curl -s "https://api.github.com/repos/debbarmachopreng7-crypto/AKRI-BAKES/actions/runs?per_page=1"`
- API access (repo owner): token available via keychain — `git credential-osxkeychain get` for host github.com; scopes include `repo` + `workflow`. Store in `/tmp/ghtok.txt` for the session.

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

## Supabase backend (optional, real-time orders)

Orders are stored in Supabase (Postgres) when configured; otherwise the site falls back to `localStorage` + WhatsApp handoff. Code auto-activates when env keys are present — the build stays green with empty keys.

- Client: `lib/supabase.js` (guarded singleton; `isSupabaseConfigured()`), used by `components/CartContext.js` (insert/select/update + realtime `postgres_changes` subscription on table `orders`) and `components/AdminGate.js` (Supabase Auth: `signInWithPassword` login, `signInWithOtp`/`verifyOtp` email-OTP password reset, `updateUser`).
- Schema: `supabase/schema.sql` — create `orders` table, enable RLS (anon may insert `AKRI-%`; authenticated staff may select/update), add table to `supabase_realtime` publication.
- Setup: create a free Supabase project → run `supabase/schema.sql` in SQL Editor → Auth→Providers→Email: enable **Email OTP** (numeric codes, required for the 6-digit reset flow) → Auth→Users: create the staff admin user (email + password) → set repo secrets `SUPABASE_URL` + `SUPABASE_ANON_KEY` (Settings→Secrets→Actions) → deploy.
- Env vars (empty = feature off): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (`.env.local` locally, secrets in `.github/workflows/deploy.yml` build step).
- Legacy generic REST backend: `NEXT_PUBLIC_API_URL` (`/orders`, `/api/otp/send`, `/api/otp/verify`), still honored after Supabase.
- Admin login on live site: `/admin` — staff email + password (Supabase) or localStorage password `akribakes2026` when not configured.
