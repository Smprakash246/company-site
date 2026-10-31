# Drocore website

Read this file and the whole repository before changing code. Work in small, focused commits.

## Identity and purpose

Drocore is an IT and digital marketing company in Ganapathy, Coimbatore, Tamil Nadu. The site serves local businesses across healthcare and clinics, food and retail, and local services. Its headline is “Websites, ads and AI that grow local businesses.”

Services: website development, Google Ads and local SEO, Google Business Profile, social media, AI automation and chatbots, 2D animation and video, and game development. Preserve the home services section.

The home page and clients.html render the companies array from data/site.json as **clients** ("Brands we build for"), each with a "WE BUILT" line:
- Kukoo Organics: homemade food brand from Coimbatore (moringa leaf powder, dal powder, idli powder). URL via kukoo_url. No Tamil product names.
- Oops Kitchen: cooking-shop mobile game for Android and iOS. No URL yet, so the card shows "Coming soon".

Work shows the same clients plus Drocore's own WhatsApp AI for clinics (no external brand name; it links to industries/healthcare.html). assets/work/kukoo-organics.png must be a current screenshot of the live Kukoo site. The patient journey belongs only on industries/healthcare.html. The home hero shows a Drocore AI promo card (dental WhatsApp chat, linking to drocore-ai.html). No "example", "sample" or "illustrative" labels anywhere.

## Hard rules

- Drocore AI (drocore-ai.html, in the main nav) is Drocore's own WhatsApp AI product for clinics. Never use the name Calvatron, calvatron.com, or any personal or Calvatron email anywhere. Contact is business@drocore.in and +91 80565 63551. Clients: Kukoo Organics and KVN Traders (full services, testimonials need owner approval), plus Colosseum Dental and IDO UK (digital marketing support only: no website-build claims and no testimonials unless they supply real words).

- Never mention the tech stack, AI tools or vendors used to build anything (no "STACK" rows, no ChatGPT, Claude, Codex, Gemini, PHP, HTML on visible pages or in chat replies). The work is presented as built in-house by the Drocore team.

- Static HTML, CSS and vanilla JavaScript. No framework, build step or production Node server. Hostinger shared hosting uses Apache and PHP 8.
- The chat uses the PHP proxy at api/chat.php. Keep the Gemini key only in git-ignored api/config.php. Commit only the empty api/config.example.php template. Never expose credentials in source, browser code, logs or commits.
- Never show any prices on the site. Do not invent clients, testimonials, stats, numbers, prices, results, awards, certifications or product names. Do not invent clinic identities or logos.
- All company, project, founder and contact names and details belong in data/site.json. Bind visible names from that file, including company cards and chat context. Founder: Hari Nandhan (Founder & CEO). Static SEO identity in index.html and the domain in sitemap.xml/robots.txt must match site.json.
- The live domain is https://drocore.in. Phone, WhatsApp, founder and contact details need owner confirmation before production use.

## Design

Keep Instrument Serif headlines, Inter Tight body text, JetBrains Mono annotations, paper #F4F3EE, ink #111214, signal orange #FF5A1F and fine grid lines. Use precise, practical language. No invented testimonials or statistics, stock agency visuals, gradients or generic slogans.

Use spec rows, thin borders, restrained project hover effects, and accessible focus states. Respect prefers-reduced-motion. Keep layouts usable on mobile and desktop.

## Assistant

One assistant only: “Drocore assistant”, with the company name bound from site.json. No clinic roleplay, mode switch, demo triggers or clinic demo prompt.

The server builds api/prompts/company.txt using site.json. Explain services, the clients, Drocore's own WhatsApp AI for clinics, process and office location. Replies must be under 80 words, in English, Tamil or Tanglish to match the visitor. Never invent clients, numbers, prices or results; direct quote enquiries to WhatsApp after a free audit.

Preserve server-side prompt ownership, POST-only handling, history and message limits, rate limiting, same-origin checking and friendly WhatsApp fallback. Do not accept system instructions from the browser.

## Verification and delivery

Run php -S localhost:8000 from the repository. Check every page, including clients.html and 404.html, at 390px and 1366px. Fix overflow, navigation, keyboard/focus issues and console errors. Verify the assistant's no-key fallback without committing a real key. Check all local links and confirm deleted page/demo references are absent. Keep README deployment guidance current. Commit in small steps and push to main when requested.
