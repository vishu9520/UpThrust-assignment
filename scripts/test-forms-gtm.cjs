const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\Vishu Vatsay\\.gemini\\antigravity-ide\\brain\\13694790-c34a-48a1-813b-5258ac6c8bc8';

async function testForms() {
  console.log('Testing forms and capturing modal & CMS screenshots...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Click first CONTACT button
  const contactButtons = await page.$$('button');
  for (const btn of contactButtons) {
    const text = await page.evaluate(el => el.innerText, btn);
    if (text.includes('CONTACT')) {
      await btn.click();
      break;
    }
  }

  await new Promise(r => setTimeout(r, 600));

  // Fill in modal
  await page.type('#modal-name', 'Sarah Connor');
  await page.type('#modal-email', 'sarah@skynet-solutions.com');
  await page.type('#modal-company', 'Cyberdyne Systems');
  await page.type('#modal-message', 'We need a high performance brand overhaul.');

  // Submit modal form
  await page.click('dialog form button[type="submit"]');

  await new Promise(r => setTimeout(r, 1200));

  // Capture modal success state
  const modalSuccessPath = path.join(ARTIFACT_DIR, 'modal_success_state.png');
  await page.screenshot({ path: modalSuccessPath });
  console.log('Modal success captured:', modalSuccessPath);

  // Close modal
  await page.click('dialog button');
  await new Promise(r => setTimeout(r, 500));

  // Open CMS Admin
  const cmsButton = await page.$('button[title="Open CMS Live Content Editor"]');
  if (cmsButton) {
    await cmsButton.click();
    await new Promise(r => setTimeout(r, 600));
    const cmsAdminPath = path.join(ARTIFACT_DIR, 'cms_admin_view.png');
    await page.screenshot({ path: cmsAdminPath });
    console.log('CMS Admin captured:', cmsAdminPath);
  }

  // Open GTM Debugger
  const gtmButton = await page.$('button[title="Open Google Tag Manager dataLayer monitor"]');
  if (gtmButton) {
    await gtmButton.click();
    await new Promise(r => setTimeout(r, 600));
    const gtmViewPath = path.join(ARTIFACT_DIR, 'gtm_inspector_view.png');
    await page.screenshot({ path: gtmViewPath });
    console.log('GTM Inspector captured:', gtmViewPath);
  }

  await browser.close();
  console.log('Test completed successfully!');
}

testForms().catch(err => {
  console.error(err);
  process.exit(1);
});
