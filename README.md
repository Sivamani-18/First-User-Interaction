# 🖱️ First User Interaction Demo (Next.js)

This is a demo Next.js project that tracks the **very first user interaction**
(click or pointer event) across all tabs in a browser session, and logs it to the console.

It uses:

- `sessionStorage` for per-session state
- `BroadcastChannel` for cross-tab communication
- `usePathname` from Next.js App Router for route awareness

## 🚀 Run locally

```bash
npm install
npm run dev
```

Then open: `http://localhost:3000`

Open multiple tabs and navigate between:

- `/`
- `/about`
- `/contact`

Watch your browser devtools console to see how **only one**
`🎉 First user interaction captured` log appears per browser session,
even across tabs and routes.

## 📁 Key file

- `app/components/InteractionListener.jsx` – core logic
- `app/layout.jsx` – wraps the whole app with the listener
