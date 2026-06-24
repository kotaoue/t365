# t365

A small tool to turn text into GitHub contribution-style dates on a 7x53 grid.

Supported input: `A-Z`, `0-9`, and spaces.

## 1. ローカルでの Usage

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

What you can do in the UI:

- Enter text
- Choose year
- Choose start week (From week)
- Copy generated dates (`M/D` format) with one click

Optional checks:

```bash
npm test
npm run lint
npm run build
```

## 2. Cloudflare Setup

This app is statically exported (`output: "export"`). Use these Cloudflare Pages settings:

1. Connect this repository in Cloudflare Pages
2. Set build settings:
   - Framework preset: `Next.js`
   - Build command: `npm run build`
   - Build output directory: `out`
3. No environment variables required

## Notes

- GitHub contribution updates can be delayed.
- Visibility also depends on commit email and repository visibility settings.
