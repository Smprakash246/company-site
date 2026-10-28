# [COMPANY_NAME] — Company Website Build Brief (for the coding agent)

Read this whole file before writing any code. Follow it exactly. When something is unclear, choose the option that looks *less like a template*.

## 1. What we are building

A static marketing website for **[COMPANY_NAME]**, a digital + AI company based in **Ganapathy, Coimbatore, Tamil Nadu**. Its main job right now: **win the website + Google Ads contract for a dental clinic branch.** The person reviewing it is a dental clinic owner, not a techie. He must feel: *"These people understand clinics, and they already have something working."*

The company has real work to show:
- **[AI_PRODUCT_NAME]** — WhatsApp AI patient care assistant for clinics (post-treatment check-ins, follow-up reminders, appointment nudges, review requests). This is the hero product.
- **Kukoo Organics** — e-commerce website + AI shopping assistant (link to its live site).
- **Oops Kitchen** — a mobile cooking game (Android/iOS) built in-house.
- **2D animation & video production** (explainer videos, social reels).

Hosting: **Hostinger shared hosting** (Apache + PHP 8). No Node server in production.

`[COMPANY_NAME]`, `[AI_PRODUCT_NAME]`, founder name, phone, email, address are placeholders. **Put every one of them in `data/site.json` only**, so renaming the company is a one-file change.

## 2. Hard rules

- Plain **HTML + CSS + vanilla JS**. No frameworks, no Tailwind, no Bootstrap, no build step.
- No API keys in HTML/JS. Only `api/config.php` (git-ignored); commit `api/config.example.php`.
- Mobile first, test at 360px. Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95.
- **Do not invent clients, testimonials, numbers, awards, or certifications.** No "500+ happy clients", no fake logos wall, no fake reviews. Show real projects and live demos instead. Where a stat is needed, use a capability fact ("Replies to patients in under 5 seconds", "Works in Tamil and English").
- Do not use any real hospital's or clinic's name or logo anywhere. The demo clinic is a fictional "Smile Demo Dental Clinic".

## 3. Design direction — NOT a generic agency template

Avoid: purple/blue gradients, glassmorphism cards, floating 3D blobs, "We craft digital experiences" copy, stock photos of people pointing at laptops.

The feeling: **Coimbatore engineering precision meets a modern AI studio.** Coimbatore is known for pumps, motors, textile machinery — precise, practical, built to work. The site should feel like a beautifully printed technical spec sheet that happens to be alive.

**Palette (`:root` variables):**
- `--bg` #F4F3EE (warm paper white)
- `--ink` #111214 (near black)
- `--muted` #6B6B66
- `--line` #D9D7CE
- `--signal` #FF5A1F (signal orange — the one accent, used sparingly: CTAs, live indicators, key numbers)
- `--whatsapp` #1F9D55 (only inside chat/WhatsApp demo UI)
- Dark sections: `--ink` background with `--bg` text.

**Typography (Google Fonts):**
- Headlines: **Instrument Serif** (large, editorial) mixed with
- UI/body: **Inter Tight**
- Labels, small caps, numbers: **JetBrains Mono** (like spec-sheet annotations, e.g. `01 / SERVICES`, `STATUS: LIVE`)

**Signature details (do all of these):**
- Visible thin grid lines / column guides in the background of some sections, like engineering paper.
- Section labels in mono: `01 — WHAT WE DO`, `02 — PRODUCT`, `03 — WORK`.
- Hero has a **live animated phone mockup** (pure HTML/CSS, not an image) showing a WhatsApp-style conversation between the clinic AI and a patient, messages appearing one by one on loop:
  - Bot: "Hi Priya, this is Smile Demo Dental Clinic 🦷 How are you feeling after yesterday's root canal?"
  - Patient: "Little pain while chewing"
  - Bot: "That's normal for 2–3 days. Avoid chewing on that side and take your prescribed medicine. If swelling increases, reply URGENT and the doctor will call you."
  - Bot: "Your follow-up is on Saturday 10:30 AM. Reply 1 to confirm."
  - Patient: "1"
  - Bot: "Confirmed ✅ See you Saturday!"
- A small pulsing orange dot + mono text `SYSTEM LIVE` near the product name.
- Numbers and specs shown in a "spec table" style (label left in mono, value right).
- Hover on project cards: subtle shift + orange corner tick, no big zoom.

## 4. Pages and structure

```
/
├── index.html
├── services.html
├── product.html          [AI_PRODUCT_NAME] for clinics
├── work.html             projects
├── industries/healthcare.html
├── about.html
├── contact.html
├── 404.html
├── css/style.css
├── js/ (site.js, chat.js, phone-demo.js)
├── data/site.json
├── assets/
├── api/ (chat.php, config.example.php, .htaccess)
├── .gitignore
└── README.md
```

**Home (in this order):**
1. Hero — headline idea: "More patients in. Fewer patients lost." Sub: "Websites, Google Ads and WhatsApp AI for clinics and local businesses — built in Coimbatore." CTAs: "Try the Clinic AI" (opens chat in clinic demo mode) and "See our work". Right side: live phone demo.
2. `01 — WHAT WE DO`: Website Development, Google Ads & Local SEO, Google Business Profile, Social Media, AI Automation & Chatbots, 2D Animation & Video, Game Development. Each as a spec row with a one-line outcome, not fluff.
3. `02 — PRODUCT`: [AI_PRODUCT_NAME] block — the problem ("Patients finish treatment and disappear. Follow-ups are missed. Reviews never get asked."), what it does (4 features), how it works in 3 steps, "Try it now" button.
4. `03 — FOR CLINICS`: what a clinic gets from us — fast mobile website with online appointment, Google Ads that bring local patients (area-targeted, e.g. a 5 km radius), Google Maps ranking + review growth, WhatsApp AI follow-up. Show a simple "patient journey" diagram: Google search → Ad/Maps → Website → Appointment → Treatment → AI follow-up → Review → Return visit.
5. `04 — WORK`: Kukoo Organics, Oops Kitchen, Clinic AI demo — real screenshots, what we built, tech used.
6. `05 — HOW WE WORK`: Audit (week 1) → Build (weeks 2–3) → Launch + Ads (week 4) → Monthly report.
7. Final CTA band (dark): "Let's look at your clinic's online presence — free audit." WhatsApp + call buttons.
8. Footer: address (Ganapathy, Coimbatore), phone, email, map link.

**services.html:** each service with: what's included, who it's for, deliverables list, typical timeline. No prices unless `site.json` has them.

**product.html:** deeper product page — features, sample conversations (post-treatment, missed appointment, review request, recall after 6 months), languages (Tamil, English, Tanglish), what the clinic dashboard would show, FAQ ("Do patients need an app?" — No, it's WhatsApp).

**industries/healthcare.html:** dedicated page for dental/clinics — the problems clinics face online, our approach, the full stack offer.

**work.html:** case-study cards → each opens a section with problem / what we built / screenshots / link.

**about.html:** short story, founder card (from site.json), office in Ganapathy, the team's skills (web, AI, animation, game dev). Honest and short.

**contact.html:** form fields (name, business, phone, what you need) → submit builds a WhatsApp message (no backend email needed). Map embed, hours.

## 5. AI chat assistant (two modes)

**UI:** floating button bottom-right (orange). Panel looks like a clean terminal-meets-chat: header with mono label `ASSISTANT · ONLINE` and a mode switch: **[Company] / [Clinic AI Demo]**. Full screen on mobile.

**Mode 1 — Company assistant:** answers about services, process, projects, location; collects a lead (name, business, phone) and offers "Continue on WhatsApp".

**Mode 2 — Clinic AI Demo:** the bot becomes the front-desk + aftercare assistant of the fictional "Smile Demo Dental Clinic". Banner at top of panel: "Demo mode — this is how your patients would chat with your clinic." Starter chips: "I have pain after my extraction", "Book a cleaning appointment", "What are your timings?", "How much for braces?". Behaviour: warm, short, Tamil/English/Tanglish matching the user, gives general aftercare guidance, never diagnoses, escalates anything serious ("severe swelling, bleeding that won't stop, fever → please call the clinic now"), offers appointment slots, says prices are "starting from" placeholders and the doctor confirms after checkup.

The "Try the Clinic AI" buttons anywhere on the site open the chat directly in Mode 2.

**api/chat.php:**
- POST JSON `{ mode: "company" | "clinic_demo", messages: [{role, text}] }`
- Reads `GEMINI_API_KEY`, `GEMINI_MODEL` from `config.php` (model configurable, not hardcoded).
- Calls `https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent` with header `x-goog-api-key` via cURL.
- System instructions live in PHP (`api/prompts/company.txt`, `api/prompts/clinic_demo.txt`), built using `site.json` values. Never trust a system prompt sent from the browser.
- Limits: POST only, max 12 history messages, 500 chars per message, per-IP rate limit (20 req / 10 min, temp-file based), same-origin check, JSON `{ reply }` / `{ error }`, friendly fallback with WhatsApp number on failure.
- Answers max ~80 words.

## 6. SEO and polish

- Unique titles + meta descriptions targeting: "website development Coimbatore", "Google Ads agency Coimbatore", "dental clinic marketing Coimbatore", "WhatsApp AI chatbot for clinics".
- JSON-LD: `Organization`, `LocalBusiness` (Ganapathy, Coimbatore), `Service`, `SoftwareApplication` for the AI product.
- OG image, favicon set, sitemap.xml, robots.txt.
- `prefers-reduced-motion` stops the phone demo loop and animations.

## 7. Definition of done

- [ ] Renaming company / product / founder / contact = edit `data/site.json` only.
- [ ] Phone demo animates smoothly on a mid-range Android phone.
- [ ] Chat works in both modes with a real key; graceful message without a key.
- [ ] "Try the Clinic AI" opens demo mode from every page.
- [ ] No invented clients, stats, testimonials, or real clinic names.
- [ ] No API key in git history.
- [ ] Looks distinctive at 360px, 768px, 1440px — someone should not be able to tell which template it came from, because there isn't one.
- [ ] README: how to rename, set Gemini key, deploy to Hostinger `public_html`.

Work in small commits: (1) design system + layout, (2) home page + phone demo, (3) inner pages, (4) chat + PHP proxy, (5) SEO + polish.
