# Vaultline — Crypto Portfolio

A responsive crypto portfolio tracker and trading UI built with React, TypeScript, Tailwind CSS, Zustand, and React Router DOM.

## Included

- Portfolio overview with total value, performance chart, asset allocation, holdings, and recent activity
- Markets route with live-style price cards, sparklines, search, and buy actions
- Activity route with transaction history, filters, search, and export affordance
- Settings route with account and security overview
- Responsive desktop sidebar, mobile header, and mobile bottom navigation
- Zustand store for holdings, cash balance, transactions, selected chart range, and market updates
- Simulated secure buy/sell processing with validation and balance updates

## Run locally

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:5173`.

## Build

```bash
pnpm run build
pnpm preview
```

## Demo note

This is a frontend demo. Market updates are simulated locally and trades update Zustand state in memory. Production transaction processing should be connected to a vetted exchange/custody provider and a server-side API with authentication, key management, audit logging, and compliance controls.
