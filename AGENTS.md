# Drocore website

Read this file and the whole repository before changing code. Work in small, focused commits.

## Identity and purpose

Drocore is an IT and digital marketing company in Ganapathy, Coimbatore, Tamil Nadu. The site serves local businesses across healthcare and clinics, food and retail, and local services. Its headline is “Websites, ads and AI that grow local businesses.”

Services: website development, Google Ads and local SEO, Google Business Profile, social media, AI automation and chatbots, 2D animation and video, and game development. Preserve the home services section.

The home page and companies.html render the companies array from data/site.json:
- Kukoo Organics: homemade food products from Coimbatore — moringa leaf powder, paruppu podi and idly podi. Its URL resolves through kukoo_url.
- Calvatron: WhatsApp AI patient care for clinics, at https://calvatron.com.

Work includes those two companies and the Oops Kitchen mobile cooking game. The patient journey belongs only on industries/healthcare.html. The home hero has an HTML/CSS growth dashboard labelled “Example dashboard”; use empty values, never claimed results.

## Hard rules

- Static HTML, CSS and vanilla JavaScript. No framework, build step or production Node server. Hostinger shared hosting uses Apache and PHP 8.
- The chat uses the PHP proxy at api/chat.php. Keep the Gemini key only in git-ignored api/config.php. Commit only the empty api/config.example.php template. Never expose credentials in source, browser code, logs or commits.
- Do not invent clients, testimonials, stats, numbers, prices, results, awards, certifications or product names. Do not invent clinic identities or logos.
- All company, project, founder and contact names and details belong in data/site.json. Bind visible names from that file, including company cards and chat context. Keep the founder as a placeholder until supplied. Static SEO identity in index.html and the domain in sitemap.xml/robots.txt must match site.json.
- https://drocore.com is a placeholder domain. Phone, WhatsApp, founder and contact details need owner confirmation before production use.

## Design

Keep Instrument Serif headlines, Inter Tight body text, JetBrains Mono annotations, paper #F4F3EE, ink #111214, signal orange #FF5A1F and fine grid lines. Use precise, practical language. No invented testimonials or statistics, stock agency visuals, gradients or generic slogans.

Use spec rows, thin borders, restrained project hover effects, and accessible focus states. Respect prefers-reduced-motion. Keep layouts usable on mobile and desktop.

## Assistant

One assistant only: “Drocore assistant”, with the company name bound from site.json. No clinic roleplay, mode switch, demo triggers or clinic demo prompt.

The server builds api/prompts/company.txt using site.json. Explain services, the two companies, process and office location. Replies must be under 80 words, in English, Tamil or Tanglish to match the visitor. Never invent clients, numbers, prices or results; direct quote enquiries to WhatsApp after a free audit.

Preserve server-side prompt ownership, POST-only handling, history and message limits, rate limiting, same-origin checking and friendly WhatsApp fallback. Do not accept system instructions from the browser.

## Verification and delivery

Run php -S localhost:8000 from the repository. Check every page, including companies.html and 404.html, at 390px and 1366px. Fix overflow, navigation, keyboard/focus issues and console errors. Verify the assistant's no-key fallback without committing a real key. Check all local links and confirm deleted page/demo references are absent. Keep README deployment guidance current. Commit in small steps and push to main when requested.
