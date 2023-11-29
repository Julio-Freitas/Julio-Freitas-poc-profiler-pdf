import puppeteer from 'puppeteer';
import chromium from 'chromium';

export async function generatePDF({ url, html }) {
  // Create a browser instance
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    executablePath: '/usr/bin/google-chrome',
    devtools: false,
    pipe: true,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting=none',
      '--disable-gpu',
      '--disable-web-security',
      '--disable-dev-profile',
      '--single-process',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--full-memory-crash-report',
      '--unlimited-storage',
      '--headless',
    ],
  });

  // Create a new page
  const page = await browser.newPage();

  const configGoto = {
    headless: 'new',
    waitUntil: ['domcontentloaded', 'load', 'networkidle2'],
    timeout: 1800000,
  };

  if (url) await page.goto(url, { ...configGoto });

  if (html)
    await page.setContent(html, {
      ...configGoto,
    });

  await page.emulateMediaType('screen');
  await page.waitForSelector('body');

  // Downlaod the PDF
  const pdf = await page.pdf({
    format: 'A4',
    displayHeaderFooter: true,
    printBackground: true,
    margin: { top: 0, left: 0, right: 0, bottom: 0 },
    headerTemplate: '<div></div>',
    footerTemplate:
      '<div class="footer" style="font-size: 11px;color: #8872B2;margin: 15px 500px;clear:both;position: relative;top: 20px;font-family: Roboto;font-weight: bold; "><span class="pageNumber"></span></div>',
    timeout: 0,
  });

  await page.close();
  await browser.close();
  browser.disconnect();

  return pdf;
}
