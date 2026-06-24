# t365

`t365` converts text into GitHub contribution calendar dates on a 7×53 grid. Type letters, digits, or spaces to generate commit dates.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

### Checks

```bash
npm test
npm run lint
npm run build
```

## Deploy on Cloudflare Pages

1. Connect this GitHub repository in Cloudflare Pages.
2. Use these build settings:
   - **Framework preset:** Next.js (static export) or static site
   - **Build command:** `npm run build`
   - **Output directory:** `out`
3. No environment variables are required.

Because the app is exported with `output: "export"`, it stays fully static and client-side.

## How date generation works

1. Input text is normalized to uppercase ASCII letters, digits, and spaces.
2. Each character is rendered with a deterministic 5×7 bitmap font.
3. Characters are placed left-to-right with a 1-column gap, then truncated safely if they exceed the 53 visible contribution weeks.
4. Grid rows map to weekdays (`0 = Sun ... 6 = Sat`), and columns map to weeks starting from the week containing January 1st.
5. Every filled pixel becomes a real UTC calendar date.
6. Pixels outside the selected year are ignored.

The UI shows each generated date in both forms:

- display: `M/D`
- value: `YYYY-MM-DD`

## Cautions

- GitHub contribution graphs do not always update instantly after a commit.
- Contribution visibility can also depend on commit email, repository visibility, and GitHub processing delays.
