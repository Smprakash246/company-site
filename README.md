# Company website

Static website for our digital + AI company in Ganapathy, Coimbatore. Main job: show clinics what we do and let them try the clinic AI live.

No database, no build step. Works on Hostinger shared hosting with PHP 8.

## Rename the company or product

Edit `data/site.json`:

| Field | What it is |
|---|---|
| `company` | company name (logo, titles, footer, chat) |
| `product` | name of the WhatsApp AI product |
| `product_line` | one-line description of the product |
| `founder`, `founder_role` | shown on the About page |
| `phone`, `whatsapp`, `email`, `address`, `hours` | contact details. `whatsapp` = number with country code, no `+` or spaces |
| `kukoo_url` | live link to the Kukoo Organics site |
| `demo_clinic` | fictional clinic name used in the demo |

The only other place the names appear is the small `application/ld+json` block in `index.html` (for Google). Update the two names there too when you finalise.

## Turn on the chatbot

1. Get a key from Google AI Studio.
2. Copy `api/config.example.php` to `api/config.php` on the server and paste the key.
3. Set `GEMINI_MODEL` to a current Gemini model name.

`api/config.php` is git-ignored. Without a key the chat still opens and points people to WhatsApp.

The assistant has two modes, and their instructions are in `api/prompts/`:
- `company.txt`: answers questions about our services.
- `clinic_demo.txt`: acts as the front desk of the fictional demo clinic.

Any "Try the clinic AI" button opens the chat straight in demo mode. A link ending in `#demo` does the same, so you can send `yoursite.in/#demo` to someone.

## Deploy on Hostinger

Upload everything into `public_html`, then add `api/config.php` on the server.

## Test on your laptop

```
php -S localhost:8000
```

Open http://localhost:8000. Double-clicking the HTML files won't work, because browsers block reading JSON from `file://`.

## Rules for anyone editing

Read `AGENTS.md`. In short: no invented clients, numbers or testimonials, and no real clinic names or logos.
