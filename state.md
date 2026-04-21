# State

Living doc for what's in flight and what recently shipped. Update it when you start work and when you finish.

## In flight

### Ujjal
- _none_

### Inderpal
- _none_

## Open questions / blockers

- **Ready to deploy**: six PRs merged today covering research roadmap restructure, handbook redesign, Pharma tab Therapeutic Pipeline, and site-wide cleanup. Main is at `e7086ff`. Nothing has shipped to `adld.center` yet. Run **GitHub Actions → Deploy to Hostinger → Run workflow** when ready to publish.
- **Partner disclosures** (future roadmap follow-up PR): Nikegen, Convelo, A-Star / Oliver Dreesen, MGH / Dr. Yedda Li are described generically on `research-roadmap.html`. Once Ujjal confirms which are public-ready, name them on the roadmap cards and add them to the `team.html` partner grid.
- **Italy + CHOP partners**: previously flagged but not in the board slides. Still active relationships? Where should they appear?
- **Stale asset**: `/handbook-cover.png` is no longer referenced in any HTML (replaced with CSS book cover in PR #5). Kept in the repo for now; safe to delete in a follow-up.

## Recent changes (rolling, newest first)

- 2026-04-21 — Ujjal — PR #7 site-wide cleanup: 80 em dashes stripped across 8 pages, copyright bumped to 2026, citation DOI swaps (Padiath, Finnsson, Bartoletti-Stella, Ratti, Dhamija), prevalence stat correction (`~1 in 50k` → `<1 in 1M` per Orphanet, backed by a deep-research report showing ~45 families globally), AI-voice line edits. Supersedes PR #2.
- 2026-04-21 — Ujjal — PR #6 Therapeutic Pipeline section in the Pharma & Biotech tab on `index.html` (shRNA Program + Drug Repurposing with Rarebase, Padiath, Giorgio, Ratti)
- 2026-04-21 — Ujjal — PR #5 handbook redesign: CSS book cover replacing the PNG, themed card matching the site's navy + sky palette, applied to both `index.html` and `resources.html`
- 2026-04-21 — Ujjal — PR #4 research roadmap restructure: 4 tracks → 6 tracks (T1 ASO, T2 NHS & Biomarkers, T3 shRNA/AAV, T4 Drug Repurposing, T5 Biotech Partnerships, T6 Mouse Model), Gantt-style quarterly timeline with per-track phase sequences, stale `/research-roadmap-full.png` block removed
- 2026-04-21 — Ujjal — PR #3 copy polish: Request Printed Copy button removed from `resources.html`, tel: CTA removed from `donate.html`, handbook section restyled as card, initial prevalence citation (later corrected in PR #7)
- 2026-04-21 — Ujjal — PR #1 collab workflow scaffolding (CLAUDE.md, state.md, PR template, .claude/settings.json)
- 2026-04-20 — Inderpal — `010bd55` Fix FTP deploy, remove nested public_html dir
- 2026-04-20 — Inderpal — `843ba44` Upgrade workflow to Node.js 24
- 2026-04-20 — Inderpal — `2e193cd` Remove phone number box from contact page
- 2026-04-20 — Inderpal — `215b3e6` Add manual deploy workflow for Hostinger
- 2026-04-20 — Inderpal — `7756f7b` Switch to plain HTML, drop Astro build step

## Deploy log

Whoever runs the deploy workflow logs it here. Format: `YYYY-MM-DD HH:MM — Name — commit SHA — note`.

- _no deploys logged yet; main at `e7086ff` is ready to push live_

## Backlog (ideas, not committed)

- **Partner-naming follow-up PR**: once Ujjal confirms disclosure approvals, name the currently-generic partners on `research-roadmap.html` and add them to `team.html` + `natural-history-study.html`. Includes Italy + CHOP if still active.
- **Research roadmap image asset**: the inline Gantt timeline ships now; an optional designer-built `/research-roadmap-full.png` can replace it later.
- **Prevalence framing alternatives**: `<1 in 1M` (Orphanet, shipped) is one valid framing. Alternatives worth revisiting are `~40 families` (concrete count) or `~1 in 1-5M` (true biological estimate per the deep-research report).
- **Delete `/handbook-cover.png`** from the repo (no longer referenced in any HTML).
- **Branch protection on `main`**: currently honor-system; requires Inderpal admin access to enable.
- **Grill-me session for research roadmap v2**: detailed dates, named collaborators, and T4 Rarebase positioning on the timeline all involve Ujjal-side tacit knowledge that a structured interview would surface.
