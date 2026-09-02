/**
 * Renders resume.html -> JC_Resume.pdf using headless Chromium (Playwright).
 *
 * One-time setup:
 *   npm install playwright
 *   npx playwright install chromium
 *
 * Usage:
 *   node render-pdf.js [input.html] [output.pdf]
 *   (defaults to resume.html -> JC_Resume.pdf in this folder)
 */
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const input = process.argv[2] || path.join(__dirname, 'resume.html');
  const output = process.argv[3] || path.join(__dirname, 'JC_Resume.pdf');

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve(input), { waitUntil: 'networkidle' });

  await page.pdf({
    path: output,
    format: 'Letter',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `
      <div style="width:100%; font-size:8px; color:#9aa0a6; font-family: Inter, Arial, sans-serif; text-align:center; padding-top: 4px;">
        Juan Ramirez &middot; Resume &middot; Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>`,
    margin: { top: '0px', bottom: '40px', left: '0px', right: '0px' },
  });

  await browser.close();
  console.log('PDF written to', output);
})();
