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

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm run start    # run production build
npm run lint     # ESLint
```

## Notes

- Payments and contact submissions are saved under `data/` locally (gitignored JSON) and emailed via SMTP.
- Razorpay Standard Checkout docs: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/
