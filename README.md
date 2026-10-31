# Drocore website

Drocore is an IT and digital marketing company in Ganapathy, Coimbatore. This static site covers websites, ads, local SEO, AI automation, social media, animation and game development for local businesses.

Instrument Serif, Inter Tight and JetBrains Mono are self-hosted in `assets/fonts/` with their SIL Open Font Licenses. The office map loads when requested; a Google Maps link is also available.

No database or build step. Production hosting uses Apache and PHP 8 on Hostinger.

## Site data

Edit `data/site.json` for names and contact details:

| Field | Purpose |
|---|---|
| `company` | Company identity in the header, footer, titles and assistant |
| `companies` | Company cards on the home page and `clients.html`; each has `id`, `name`, `description` and `url` |
| `kukoo_url` | Live food company website; a company `url` of `kukoo_url` resolves to this field |
| `game` | Mobile cooking game name |
| `founder`, `founder_role` | About page; founder remains a placeholder |
| `phone`, `whatsapp`, `email`, `address`, `hours` | Contact details; WhatsApp uses country code without spaces or `+` |
| `site_url` | `https://drocore.in` — live domain |
| `map_embed` | Office map URL |

Keep the static JSON-LD in `index.html`, `sitemap.xml` and `robots.txt` aligned with the confirmed identity and domain. The current email/domain and phone/WhatsApp are placeholders; replace them with verified contact details before launch.

The companies array contains Kukoo Organics (homemade food products) and Calvatron (WhatsApp AI patient care for clinics, https://calvatron.com). Company cards open their websites in new tabs. The patient journey appears only on the healthcare page. The home dashboard has a “Sample data” tag; its values and sparklines are illustrative, with no claimed business results. `js/dashboard.js` counts the values up once over 1.2 seconds. Reduced motion and JavaScript-disabled browsing show the final values without animation.

## Assistant setup

1. Get a Gemini key from Google AI Studio.
2. Copy `api/config.example.php` to `api/config.php` on the server and add the key.
3. Set `GEMINI_MODEL` to a current supported model.

`api/config.php` is git-ignored. Never commit the key or include it in browser code. Without a configured key, the assistant provides a friendly WhatsApp fallback.

There is one Drocore assistant. `api/prompts/company.txt` covers services, companies, process and office location. The PHP server fills its placeholders from site data. The browser sends POST JSON `{ "messages": [{ "role": "user", "text": "Hello" }] }`; it cannot choose another prompt. History is limited to 12 messages and 500 characters per message, with same-origin checking and per-IP rate limiting.

## Run locally

```sh
php -S localhost:8000
```

Open http://localhost:8000. Direct `file://` browsing cannot fetch the JSON data. Check every HTML page at 390px and 1366px, menu links, company links, contact form and assistant fallback. The PHP development server is for trusted local testing; Apache enforces the committed `.htaccess` restrictions in production.

## Hostinger deployment

Upload the site into `public_html` and add `api/config.php` separately on the server. Preserve `.htaccess` files, which prevent public access to configuration and prompts. Use https://drocore.in only after confirming domain ownership and DNS. Read `AGENTS.md` before editing; use real project facts and never invent clients, testimonials or results.
