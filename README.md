# OneLink

Premium acquisition website for `OneLink`, built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and a Razorpay checkout scaffold.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Razorpay order + verification routes
- Vitest for utility tests

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a local env file:

```bash
cp .env.example .env.local
```

3. Run the app:

```bash
npm run dev
```

4. Verify the project:

```bash
npm run lint
npm run test
npm run build
```

## Environment

The checkout flow is scaffolded for Razorpay and expects:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_CONTACT_EMAIL`

If Razorpay keys are not configured, the UI still renders, but `Buy Now` / `Pay Setup Fee` will return a clear configuration error instead of opening checkout.

## Project Shape

- `src/app/page.tsx`: main acquisition landing page
- `src/app/demo/[slug]/page.tsx`: internal sample OneLink demo pages
- `src/app/api/razorpay/*`: order creation and signature verification
- `src/content/site.ts`: typed copy, pricing, FAQs, demos, badges, and contact config
- `src/components/*`: reusable UI, sections, lead capture, and checkout components
- `src/lib/*`: WhatsApp helpers, pricing lookup, and Razorpay utilities
