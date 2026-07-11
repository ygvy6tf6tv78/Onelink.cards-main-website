# OneLink Website Handoff

This document is the single-file handoff for another LLM or developer.

## Project Summary

OneLink is a premium acquisition website for a done-for-you smart business page product.

Current build goals:

- Premium desktop-first marketing site
- Fast path from interest to booking/payment
- Razorpay-powered checkout scaffold
- Legal pages and booking invoice flow
- Real portfolio and reel/video showcase

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Razorpay server/client scaffold
- Vitest for utility tests

## Current Homepage Flow

The active homepage order is:

1. Hero
2. Portfolio
3. Pricing
4. Videos
5. Why OneLink
6. After Booking
7. Trust
8. FAQ
9. Final CTA
10. Footer

Main homepage entry:

- [`src/app/page.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/app/page.tsx)

## Active Design Direction

- Brand: `OneLink`
- Primary blue: `#00A9FF`
- Dark text: `#151515`
- Supporting accents: premium blue + subtle violet + small orange highlight in pricing
- Clean premium typography with `Sora` for display and `Manrope` for body
- Desktop polish is prioritized over mobile in the latest pass

Global styles live in:

- [`src/app/globals.css`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/app/globals.css)

## Key Active Sections

### Hero

- [`src/components/sections/hero-section.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/sections/hero-section.tsx)
- [`src/components/hero-mockup-showcase.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/hero-mockup-showcase.tsx)

What it does:

- Two-line headline
- Buy Now + View Portfolio CTAs
- Trust chips
- Auto-changing mockup stage using real OneLink screenshots

## Portfolio Section

- [`src/components/sections/demo-showcase-section.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/sections/demo-showcase-section.tsx)

Real live examples wired in:

- Mango
- Honey's Fresh N Frozen
- CA Ramit
- Mera Halwai
- Honey Money Fish Company
- Jay Ess

Image assets come from:

- [`Portfolio/`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/Portfolio)

## Pricing Section

- [`src/components/sections/pricing-section.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/sections/pricing-section.tsx)

Current active plans:

- Launch Plan
- 5-Year Plan
- Hidden 6-Month Starter

Important:

- Pricing values are driven from [`src/content/site.ts`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/content/site.ts)
- The latest design pass made cards more compact and boxed
- Orange accent is used only as a supporting highlight, mainly in monthly payment messaging

## Videos / Reels Section

- [`src/components/sections/videos-section.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/sections/videos-section.tsx)

Current behavior:

- Desktop reel-style `9:16` cards
- Uses actual local video files
- Each card links to Instagram

Tracked web-safe video assets:

- [`public/videos/0301-web.mp4`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/public/videos/0301-web.mp4)
- [`public/videos/0301-1-web.mp4`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/public/videos/0301-1-web.mp4)
- [`public/videos/0301-3-web.mp4`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/public/videos/0301-3-web.mp4)

Source-heavy local files are intentionally ignored:

- `/videos/`
- `/public/videos/*.mov`

Compression helper used to generate the smaller mp4 files:

- [`tools/compress_video.swift`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/tools/compress_video.swift)

Example command:

```bash
swift tools/compress_video.swift videos/0301.mov public/videos/0301-web.mp4
```

## Booking Flow

Active booking flow pages:

1. Plan
2. Details
3. Invoice
4. Payment
5. Success

Routes:

- [`src/app/book/page.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/app/book/page.tsx)
- [`src/app/book/details/page.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/app/book/details/page.tsx)
- [`src/app/book/invoice/page.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/app/book/invoice/page.tsx)
- [`src/app/book/payment/page.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/app/book/payment/page.tsx)
- [`src/app/book/success/page.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/app/book/success/page.tsx)

Core booking components:

- [`src/components/booking/booking-shell.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/booking/booking-shell.tsx)
- [`src/components/booking/booking-progress.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/booking/booking-progress.tsx)
- [`src/components/booking/plan-selection-step.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/booking/plan-selection-step.tsx)
- [`src/components/booking/customer-details-step.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/booking/customer-details-step.tsx)
- [`src/components/booking/invoice-step.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/booking/invoice-step.tsx)
- [`src/components/booking/payment-step.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/booking/payment-step.tsx)
- [`src/components/booking/success-step.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/booking/success-step.tsx)

Booking state logic:

- [`src/lib/booking.ts`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/lib/booking.ts)

Invoice rendering:

- [`src/components/booking/invoice-preview.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/booking/invoice-preview.tsx)

## Razorpay Flow

Frontend checkout trigger:

- [`src/components/payment/buy-button.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/payment/buy-button.tsx)

Server routes:

- [`src/app/api/razorpay/order/route.ts`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/app/api/razorpay/order/route.ts)
- [`src/app/api/razorpay/verify/route.ts`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/app/api/razorpay/verify/route.ts)

Razorpay helpers:

- [`src/lib/razorpay.ts`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/lib/razorpay.ts)

Payment success/failure routes:

- [`src/app/payment/success/page.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/app/payment/success/page.tsx)
- [`src/app/payment/failed/page.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/app/payment/failed/page.tsx)

## Legal Pages

Routes:

- [`src/app/terms/page.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/app/terms/page.tsx)
- [`src/app/refund/page.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/app/refund/page.tsx)
- [`src/app/privacy/page.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/app/privacy/page.tsx)

Shared layout:

- [`src/components/legal/legal-page.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/legal/legal-page.tsx)

Content:

- [`src/content/legal.ts`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/content/legal.ts)

Latest legal UX improvement:

- Top back button added
- Navbar now only points to `Terms & Conditions`

## Layout / Navigation

Navbar:

- [`src/components/layout/navbar.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/layout/navbar.tsx)

Current desktop navbar:

- Portfolio
- Pricing
- FAQs
- Terms & Conditions
- Instagram icon
- Buy Now

Footer:

- [`src/components/layout/footer.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/layout/footer.tsx)

Payment brand strip:

- [`src/components/ui/payment-brand-strip.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/ui/payment-brand-strip.tsx)

## Content Source of Truth

Most editable website content is stored in:

- [`src/content/site.ts`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/content/site.ts)

This includes:

- Navbar labels
- Pricing plans
- FAQs
- Trust chips
- Contact config
- Demo metadata
- Add-ons
- Brand text

## Utilities and Shared UI

Shared UI:

- [`src/components/ui/action-link.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/ui/action-link.tsx)
- [`src/components/ui/reveal.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/ui/reveal.tsx)
- [`src/components/ui/section-heading.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/ui/section-heading.tsx)

Icons:

- [`src/components/icons.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/icons.tsx)

General utils:

- [`src/lib/utils.ts`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/lib/utils.ts)

## Active Assets

Hero mockup assets:

- [`onelink_mockups/`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/onelink_mockups)

Portfolio screenshots:

- [`Portfolio/`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/Portfolio)

Public brand mark:

- [`public/onelink-mark.svg`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/public/onelink-mark.svg)

## Environment Variables

Use `.env.local` with:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_INSTAGRAM_URL`

Starter file:

- [`.env.example`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/.env.example)

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

## Current Build Notes

- Build script uses `next build --webpack`
- This was kept because Turbopack build path was unstable in this environment
- Desktop polish has been prioritized in recent passes
- Several older section components still exist in the repo but are not currently used on the homepage

Legacy or currently unused homepage section files still present:

- [`src/components/sections/problem-solution-section.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/sections/problem-solution-section.tsx)
- [`src/components/sections/features-section.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/sections/features-section.tsx)
- [`src/components/sections/how-it-works-section.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/sections/how-it-works-section.tsx)
- [`src/components/sections/payments-section.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/sections/payments-section.tsx)
- [`src/components/sections/solution-categories-section.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/sections/solution-categories-section.tsx)
- [`src/components/sections/value-band.tsx`](/Users/krishang/Downloads/CodeX/onelink%20new%2020256/src/components/sections/value-band.tsx)

## Suggested Next Work

If another LLM continues from here, the clean next tasks are:

1. Final desktop hero polish
2. Optional mobile tightening pass
3. Real official payment logo assets if brand-approved
4. Optional cleanup of unused legacy section files
5. Final copy polish across remaining sections

## Verification Status

Latest verified commands:

- `npm run lint`
- `npm run build`

Both were passing at the time of this handoff.
