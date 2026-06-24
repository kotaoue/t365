# t365

A small tool to turn text into GitHub contribution-style dates on a 7x53 grid.

Supported input: `A-Z`, `0-9`, and spaces.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Optional checks

```bash
npm test
npm run lint
npm run build
```

## Cloudflare Setup

This app is statically exported (`output: "export"`). Use these Cloudflare Pages settings:

1. Connect this repository in Cloudflare Pages
2. Set build settings:
   - Framework preset: `Next.js`
   - Build command: `npm run build`
   - Build output directory: `out`
3. No environment variables required
