# ADLD Center Website

Static HTML site for the ADLD Center (Autosomal Dominant Leukodystrophy). Patient, caregiver, and researcher-facing content. Hosted on Hostinger.

## Collaborators
- **Inderpal Singh** (owner, @inderpalsinghmi)
- **Ujjal Didar Singh Sekhon** (@ujjaldidarsingh)

Two people edit this repo. Follow the workflow below to avoid collisions.

## Workflow: branch + PR (always)

Never commit directly to `main`. Every change goes through a branch and a pull request, even typo fixes.

1. `git checkout main && git pull`
2. `git checkout -b <yourname>/<short-desc>` (e.g. `ujjal/update-team-bios`, `inderpal/new-donate-copy`)
3. Make changes; preview locally (see below)
4. `git add -p && git commit -m "type: description"` (types: feat, fix, copy, style, chore)
5. `git push -u origin <branch>`
6. `gh pr create --fill` or open in browser
7. Other person reviews; either merges or requests changes
8. After merge, whoever merged runs the deploy workflow (see Deploy)

**Before starting work**, check `state.md` for what the other person has in flight. Update it when you start and when you finish.

## Local preview

The site is plain HTML; no build step.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in Chrome. Images use absolute paths (`/homepage-hero.png`), so the server-root serve is required; double-clicking the HTML file won't render correctly.

## Deploy

GitHub Actions → **Deploy to Hostinger** → **Run workflow** (manual only; `workflow_dispatch`). Pushes to `main` do NOT auto-deploy.

Deploy config: [.github/workflows/deploy.yml](.github/workflows/deploy.yml). FTP credentials live in repo secrets (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`).

After deploying, log it in `state.md` under **Deploy log**.

## File map

- `index.html` — Patients & Caregivers homepage (hero + landing)
- `about.html` — About the ADLD Center
- `team.html` — Team bios
- `contact.html` — Contact form
- `donate.html` — Donation page
- `resources.html` — Patient/caregiver resources
- `research-roadmap.html` — Research program overview
- `natural-history-study.html` — Natural History Study page
- `ADLD-Handbook-v1.pdf` — patient handbook download
- `*.png`, `*.jpg`, `favicon.svg` — site images/assets
- `.github/workflows/deploy.yml` — Hostinger FTP deploy

## Conventions

- **Tailwind via CDN** (`cdn.tailwindcss.com`); no PostCSS pipeline
- **Fonts**: Inter (body), Plus Jakarta Sans (display); loaded via Google Fonts
- **Brand color**: `#0a2342` (deep navy) for primary text/headers; sky blues for accents; `red-600` for the Donate CTA
- **Leftover `data-astro-cid-*` attributes** are residue from the old Astro build; safe to ignore, don't spend effort stripping them
- **Images are large** (2MB+ PNGs). If you add new ones, compress first (TinyPNG or similar) before committing
- **External hero logo** is served from `adld.center/wp-content/...` (legacy WordPress URL); replace-in-place if the old site goes down

## Writing style

- Patient-first tone: warm, direct, plain language
- No medical jargon without definition
- Avoid em dashes (use semicolons or commas)
- Active voice; name the actor ("The ADLD Center funds..." not "Research is funded...")
- See `~/.claude/rules/code-quality.md` for full anti-slop rules (applies to page copy too)

## Gotchas

- Tailwind CDN reads classes at page load; if a class isn't styled, you probably typo'd it
- The nav dropdown uses `:hover` + `:focus-within` CSS; test keyboard navigation before shipping nav changes
- FTP deploy uploads everything except `.git*` and `.github/**`; keep the repo clean of `.DS_Store`, drafts, or one-off test files
- Don't commit the `.claude/` folder with session state; it's in `.gitignore` scope by convention (add it if needed)

## Related projects

- Obsidian vault: `02 ADLD Center/` for Strategy, Meetings, Partnerships, Patient Registry, Scientific notes
- When writing site copy as Ujjal, apply the Ujjal Voice profile (`~/Work/CC Projects/Ujjal Voice/`)
