# DESIGN.md — BCT Taipei

## 1. Product brief (read before any token)

BCT Taipei is the marketing/portfolio site for Bahwan CyberTek's Taipei studio — a software,
data-platform, and AI consulting shop. It serves two audiences: prospective clients evaluating BCT
for outsourced technical work, and prospective hires or partners assessing the studio's credibility.
The UI's job is to make BCT's technical capability legible fast. Every case study must read as real,
shipped proof of work — not marketing copy that happens to have screenshots in it.

## 2. Design principles (what the UI must always do — checkable)

- Every case study reads as proof of work: real product screens, short copy, no filler. (DataLake's
  intro copy was deliberately cut from ~280 to ~180 words because it read as filler, not evidence.)
- One shared shell (header + footer + type scale) across every page, so the site feels like one
  product — except NOVA, which is a deliberate, permanent exception (see §6).
- The header always reads against whatever is behind it. It adapts live; it never gets to be
  illegible against a section it wasn't designed for.
- Mobile is checked, not assumed. Every layout is verified at the smallest supported width before
  it's called done — most real bugs this system has shipped were "worked at 1280px, broke at 375px."
- Nothing essential is ever hidden behind a decorative layer. A caption sits beside or below the
  graphic it describes — never as a mask over it.

## 3. Tokens (value → intent → boundary)

### Colour
- `--blue` `#0a7bc4` / `--blue-deep` `#0b5a91` — CTAs, links, active nav state, gradient accents.
  Never a full-bleed background; it's an accent, not a surface.
- `--ink` `#1a1a1a` — headings and primary body text on light surfaces. Not for large fills.
- `--paper` `#f7f4ef` — the page background everywhere except NOVA and photographic sections. Warm
  off-white, deliberately not pure `#fff` — a stark white surface reads as a colder, different
  product. Keep it `--paper`, don't "clean it up" to white.
- `--muted` `#5d6673` (body copy) / `--nav-text` `#4a5462` (nav links) — secondary text, captions,
  nav labels. Never for anything the visitor must act on (a button label, a link that matters).
- `#e6e1d8` — hairline dividers (footer border, card separators) on light surfaces only.
- Clay accent palette — service-card art only: `#e8996b` terracotta, `#e3c065` gold, `#9b8ecf`
  lavender, `#7fb4d9` sky. These sit behind service-card photography as a warm backdrop tint. This
  is a photography treatment, not a UI palette — never reach for these for buttons, badges, or
  status.
- Dark-page inversion: `#1a1a1a` background + `rgba(255,255,255,.72)` text. Used only when the
  section above is already dark. A light footer must never trail a dark page, and a dark footer
  must never trail a light one — the header and footer invert as a pair, always.

### Spacing / gutter
- `--bct-gutter` `6vw` — the one horizontal margin every mobile section uses. A case-study page that
  inherited its hand-tuned desktop padding (usually `80px`) and never got it swapped to `6vw` is the
  single most common mobile bug in this codebase. Check this first on any new mobile pass.
- Section rhythm is generous, not tight. Leave real air between a heading/paragraph and the next
  visual block (24–36px minimum). When unsure, add space rather than remove it — several real fixes
  in this codebase existed purely to put spacing *back* (a paragraph butting straight against the
  next section's tinted background, result cards sitting too close together).

### Radius / surface
- Cards and photo frames are consistently rounded (16–20px) to match the soft, tactile "clay"
  aesthetic. The one deliberate exception: UI glyphs like the `+` cursor are squared off to match
  the site's other flat design elements — rounding is for surfaces, not for iconography.
- Full-bleed art breaks out of the gutter on purpose (`width:100vw; margin-left:calc(50% - 50vw)`)
  for hero photography and section-opening images. This is a named, repeatable pattern — reach for
  it any time a photo should feel immersive, not a one-off hack for a single page.

## 4. Typography (scale + when to use + what it can't be)

Font: **General Sans** everywhere, with PingFang TC / Noto Sans TC fallback for Chinese —
enforced site-wide (`body *{font-family:...!important}` in `bct-system.css`). No exceptions,
including on a page that arrives with its own webfont already linked.

Scale (`body.bct-scale`, the shared case-study scale — enforced in `bct-system.css`, not a
convention pages are trusted to follow on their own):
- `h1` 40px/1.15 — page hero title only. One per page.
- `h2` 30px/1.2 — section titles.
- `h3` 22px/1.3, **weight 600** — card and subsection titles. Not 700: a bolder h3 reads
  inconsistent next to every other h3 on the page. This was a real shipped bug — several pages
  independently ended up at 700 (their own local rule, never actually overridden by the shared
  scale, because `body.bct-scale h3` originally set size/line-height only) — so `font-weight:600` was
  added to that shared rule directly. Don't re-locally-set an h3's weight on a page; if a card genuinely
  needs a heavier title, that's a sign it isn't card-title content and shouldn't be an `<h3>`.
- `h4`–`h6` 18px/1.35 — rare, minor headings.
- body / `li` 16px/1.6, weight 400 — default copy. Case-study body text is never bold or
  near-black by default; a heavier paragraph reads as a different, denser product than the rest of
  the page.
- Eyebrow label — 12px/600 weight/2px letter-spacing/uppercase/`#aaa` — the small kicker above a
  section title ("Design & UX", "Our Mission"). One shared style, everywhere. A page that hand-rolls
  its own eyebrow treatment is a bug, not a valid variant — this exact drift was caught between
  FLIR and fitting, and again later in custombike (a local `.eyebrow` class at 20px/700/blue,
  nothing like the shared kicker) — check new pages for this specifically, it recurs.
  Colour is the one property a page may override, to its own accent (FLIR's amber, custombike's
  blue). **The override must live in a stylesheet that loads AFTER `bct-system.css`** — in practice
  the page's `#bctpage-css` block, not its main `<head>` styles. The shared rule carries
  `!important` at equal specificity, so against a head-styles override it wins purely on source
  order and the accent silently renders `#aaa`. This shipped as a real bug on custombike:
  "Project Goal" was declared blue from the head styles and rendered grey for several rounds
  before anyone noticed.

Exception: **fitting** doesn't carry `body.bct-scale` at all — it shipped with its own hand-tuned
sizes before the shared scale existed, and by the time the scale was written those sizes were
already deliberate (e.g. a 36px/700 slide heading that isn't a "card title" in the sense above).
Leave it opted out; don't "fix" it into the shared scale without a reason beyond consistency.

Rule: build hierarchy with weight and position on the scale above, not by inventing a new size.

## 5. Component decision logic (when to use which)

- **Header** — fixed, live-samples the background colour under it and swaps between light-on-dark
  and dark-on-light automatically (`bct-system.js`). Never hand-set to one fixed theme on a page
  that has more than one background tone.
- **Footer** — `--paper` light by default; flips to `#1a1a1a` dark automatically via
  `body.bct-dark`. Header and footer theme are a pair — never light footer under a dark page, or
  the reverse.
- **Step-by-step / process walkthroughs** (e.g. eShipping's 5-step flow) — one active step shown at
  a time, animated stage on top, caption below it, never overlapping. A dark-scrim caption laid
  over the graphic was tried and explicitly reverted: "text on a card" means beside or below the
  art, not a mask over it.
- **Data tables / dense grids at mobile width** — give columns real gaps and truncate long values
  with an ellipsis. Never let a cell's content overflow past the edge of its card.
- **Hero art** — fills the room it's given. On mobile the graphic scales to use the space above the
  title, not a small fixed-size mockup floating in whitespace; on desktop it sits in its designed
  frame. Full-bleed break-out (§3) is the default for hero photography, not the exception.
- **Case-study body copy** — cut to what's necessary before it ships. If a paragraph reads as
  marketing filler instead of stating what was built, shorten it. This is a standing editorial
  rule, not a one-time edit (DataLake's intro was cut roughly in half).

## 6. Don'ts (explicit)

- No em dashes anywhere in copy, on any page.
- NOVA (`BCT Taipei Dark.html`) does not use this system — no `bct-system.css`/`.js`, no shared
  header/footer, no shared type scale. This is a deliberate, permanent exception, not a page
  someone forgot to migrate.
- Never hard-code a fixed pixel value (an inset, a font-size, a column width) that was only checked
  on desktop. Nearly every real bug this system has shipped is exactly this pattern breaking at
  375px.
- Never let a decorative layer — scrim, mask, gradient overlay — sit on top of content the visitor
  needs to read, or a graphic they need to see clearly.
- Never leave real text under `pointer-events:none`. If it looks like text, it must be selectable
  and copyable.
- Don't invent a new eyebrow-label, footer, or header treatment per page. One shared style,
  enforced with `!important` in `bct-system.css` specifically so a page's own CSS can't quietly
  re-skin it.
- Don't let case-study copy run long. Shorten before you ship it, not after someone flags it.
- Don't ship a mobile layout without checking it at the smallest supported width — gutter, type
  scale, and every full-bleed image get verified there, not assumed from the desktop pass.

<!--
  First draft, scoped to what's been explicitly established in review so far. Known-incomplete:
  the don'ts list above is what's been confirmed; more are expected to be added as they come up.
  Next step per the design-partner diagnostic loop: generate the next new case-study page (or the
  next non-trivial mobile pass) against this file and see where it drifts from what's written here
  — that drift is the sentence this file is still missing.
-->
