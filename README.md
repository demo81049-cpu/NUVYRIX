# NUVYRIX TECHNOLOGIES
update
Freelance web & app development studio site — **Build. Launch. Grow.**

Built with **Next.js**, **Tailwind CSS**, **Razorpay**, and **Hostinger SMTP**.

## Pages

- `/` — Home
- `/services` — Services
- `/kolkata-web-development` — Web and app development for Kolkata and West Bengal
- `/portfolio` — Live projects (BringBasket, cirKle, Vnoras, PayKash)
- `/about` — About
- `/payment` — Secure Razorpay checkout
- `/contact` — Inquiry form (emails the team)

## Setup

```bash
npm install
# Pull the Vercel environment variables for local development:
vercel env pull .env.development.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Configure these environment variables in Vercel. For local development, pull
them with `vercel env pull .env.development.local`.

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | Server-only MongoDB Atlas connection string |
| `MONGODB_DB_NAME` | MongoDB database name (defaults to `nuvyrix`) |
| `RAZORPAY_KEY_ID` | Razorpay API Key ID; the server returns it to Checkout |
| `RAZORPAY_KEY_SECRET` | Server-only Razorpay API Key Secret |
| `ADMIN_USERNAME` | Private admin login username (at least 3 characters) |
| `ADMIN_PASSWORD` | Private admin login password (at least 16 characters) |
| `ADMIN_SESSION_SECRET` | Random signing secret for admin sessions (at least 32 characters) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Outgoing mail |
| `SMTP_FROM` | From address |
| `NOTIFY_EMAIL` | Inbox for payment + contact alerts |

Create API keys in the Razorpay Dashboard under **Account & Settings → API Keys**.
Start with Test Mode keys, configure both values in Vercel (or pull them into
`.env.development.local` for local development), and restart the dev server.
Account IDs and Merchant IDs are not API keys and cannot authenticate checkout.
Never commit `.env` or expose `RAZORPAY_KEY_SECRET`; only the Key ID is sent to
the browser for Razorpay Checkout.

### Admin dashboard

Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and a unique random
`ADMIN_SESSION_SECRET` in Vercel. Use a password manager to generate the
password and session secret; do not commit or share them. Visit `/admin` to
review the latest contact inquiries. The login has no public signup, and the
signed session cookie is HTTP-only, secure in production, and expires after
eight hours.

### MongoDB Atlas setup

Create a database user with a strong password and permission to read and write
the application's database. Add `MONGODB_URI` to Vercel without committing or
sharing the connection string, and set `MONGODB_DB_NAME` to `nuvyrix` (or your
chosen database name). The application creates the contact collection and its
index on first database use. In Atlas, allow network access from the
deployment; prefer restricting it to known static egress IPs where available.
If the hosting plan does not provide static egress, understand the exposure
before allowing `0.0.0.0/0`, and protect access with a dedicated least-privilege
database user.

## Deploy to Vercel

1. Import `demo81049-cpu/NUVYRIX` from GitHub in the Vercel dashboard. Vercel
   detects Next.js automatically; keep the default build command (`npm run
   build`) and output settings.
2. In **Project Settings → Environment Variables**, add `MONGODB_URI`,
   `MONGODB_DB_NAME`, and the Razorpay, admin, and SMTP variables above.
   Configure Preview values too if you want working contact and test payments
   on preview deployments.
3. Use Razorpay **Test Mode** API keys for previews. Add Live Mode API keys only
   to Production after enabling and verifying the Razorpay account.
4. Redeploy after changing environment variables. Configure `nuvyrix.online` in
   **Project Settings → Domains** and follow Vercel’s DNS instructions.

Contact inquiries are stored in MongoDB and emailed via SMTP. The app does not
save or email payment details; payment processing and its required transaction
records are handled by Razorpay. Payment verification is performed with
Razorpay directly.

## Search and local service area

The canonical site domain is `https://nuvyrix.online`. The public pages
describe NUVYRIX services for businesses in Kolkata, across West Bengal, and
throughout India. `/kolkata-web-development` is the Kolkata-focused service
page. The organization is marked up as a service provider, without publishing
an unverified office address.

The Google Search Console verification file is served from the site root.
After deploying, add the `https://nuvyrix.online/` domain property in Search
Console, verify it using the HTML file, and submit
`https://nuvyrix.online/sitemap.xml`.

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm run start    # run production build
npm run lint     # ESLint
```

## Notes

- Razorpay Standard Checkout docs: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/
