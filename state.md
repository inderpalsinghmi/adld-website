# State

Living doc for what's in flight and what recently shipped. Update it when you start work and when you finish.

## In flight

### Ujjal
- PR 1: em dash strip across all 8 pages, copyright bump to 2026, Scholar→journal URL swaps, remove fabricated references, AI-voice softening; branch `ujjal/pr1-em-dashes-and-citations`
- PR 2 (next): "Request Printed Copy" decision, phone number consistency, stale 2026 trial claim, prevalence figure, handbook graphic flow

### Inderpal
- _none_

## Open questions / blockers

- `about.html` line 46: "multi-patient trials by 2026" status as of 2026-04-21 (Ujjal to provide for PR 2)
- `index.html` line 347: prevalence figure "~1 in 50k" accuracy (Ujjal to confirm for PR 2)
- Finnsson 2015 citation on `index.html:132`: current site has wrong journal (*Neurology*) and wrong title (*Natural course...*); actual paper is in *Annals of Neurology*, titled "LMNB1-related autosomal-dominant leukodystrophy: Clinical and radiological course." Fixing in PR 1; flagging in PR description.
- Research roadmap overhaul (T1-T4 labels, biomarker miRNA rewrite, partner additions Italy/CHOP, team leadership bios) deferred to a future `/grill-me` session.

## Recent changes (rolling, newest first)

- 2026-04-20 — Ujjal — collab workflow scaffolding (PR [#1](https://github.com/inderpalsinghmi/adld-website/pull/1), merged as `2966e02`)
- 2026-04-20 — Inderpal — `010bd55` Fix FTP deploy, remove nested public_html dir
- 2026-04-20 — Inderpal — `843ba44` Upgrade workflow to Node.js 24
- 2026-04-20 — Inderpal — `2e193cd` Remove phone number box from contact page
- 2026-04-20 — Inderpal — `215b3e6` Add manual deploy workflow for Hostinger
- 2026-04-20 — Inderpal — `7756f7b` Switch to plain HTML, drop Astro build step

## Deploy log

Whoever runs the deploy workflow logs it here. Format: `YYYY-MM-DD HH:MM — Name — commit SHA — note`.

- _no deploys logged yet_

## Backlog (ideas, not committed)

- _add ideas here; move to "In flight" when someone picks them up_
