# Resume build

- `JC_Resume.md` — plain-text/ATS-friendly source of the resume content (edit this first).
- `resume.html` — styled HTML/CSS version used to generate the polished PDF (keep in sync with the `.md`).
- `render-pdf.js` — renders `resume.html` to `JC_Resume.pdf` using headless Chromium via Playwright.

## Regenerate the PDF after editing `resume.html`

```bash
cd cv
npm install playwright        # one-time
npx playwright install chromium   # one-time, downloads Chromium (~200MB)
node render-pdf.js                # resume.html -> JC_Resume.pdf
```

> `install_pandoc.sh` / the old LaTeX+pandoc pipeline is no longer used for `JC_Resume.pdf`
> (kept only for historical reference). The HTML+Chromium pipeline above gives full
> control over layout, colors, and typography without requiring a LaTeX install.
