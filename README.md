# NUVYRIX TECHNOLOGIES

Freelance web & app development studio site — **Build. Launch. Grow.**

Built with **Next.js**, **Tailwind CSS**, **Razorpay**, and **Hostinger SMTP**.

## Pages

- `/` — Home
- `/services` — Services
- `/portfolio` — Live projects (BringBasket, cirKle, Vnoras, PayKash)
- `/about` — About
- `/payment` — Secure Razorpay checkout
- `/contact` — Inquiry form (emails the team)

## Setup

```bash
npm install
# Windows PowerShell:
Copy-Item .env.example .env
# Add your Razorpay API Key ID and Key Secret, then configure SMTP values.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env` and set:

| Variable | Purpose |
|----------|---------|
| `RAZORPAY_KEY_ID` | Razorpay API Key ID; the server returns it to Checkout |
| `RAZORPAY_KEY_SECRET` | Server-only Razorpay API Key Secret |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Outgoing mail |
| `SMTP_FROM` | From address |
| `NOTIFY_EMAIL` | Inbox for payment + contact alerts |

Create API keys in the Razorpay Dashboard under **Account & Settings → API Keys**.
Start with Test Mode keys, add both values to `.env`, and restart the dev server.
Account IDs and Merchant IDs are not API keys and cannot authenticate checkout.
Never commit `.env` or expose `RAZORPAY_KEY_SECRET`; only the Key ID is sent to
the browser for Razorpay Checkout.

## Deploy to Vercel

1. Import `demo81049-cpu/NUVYRIX` from GitHub in the Vercel dashboard. Vercel
   detects Next.js automatically; keep the default build command (`npm run
   build`) and output settings.
2. In **Project Settings → Environment Variables**, add the variables listed in
   `.env.example` for the Production environment. Add them to Preview too if
   you want working contact and test payments on preview deployments.
3. Use Razorpay **Test Mode** API keys for previews. Add Live Mode API keys only
   to Production after enabling and verifying the Razorpay account.
4. Redeploy after changing environment variables. Configure `nuvyrix.tech` in
   **Project Settings → Domains** and follow Vercel’s DNS instructions.

Contact inquiries and verified payments are emailed via SMTP and are **not
stored by the website**. Keep a payment record in the Razorpay dashboard.

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm run start    # run production build
npm run lint     # ESLint
```

## Notes

- Razorpay Standard Checkout docs: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/
