const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\Vishu Vatsay\\.gemini\\antigravity-ide\\brain\\13694790-c34a-48a1-813b-5258ac6c8bc8';

async function run() {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  
  // 1. Desktop 1440px
  console.log('Testing 1440px Desktop...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  
  const desktopHeroPath = path.join(ARTIFACT_DIR, 'desktop_1440_hero.png');
  await page.screenshot({ path: desktopHeroPath });
  console.log('Captured:', desktopHeroPath);

  // Full page desktop screenshot
  const desktopFullPath = path.join(ARTIFACT_DIR, 'desktop_1440_full.png');
  await page.screenshot({ path: desktopFullPath, fullPage: true });
  console.log('Captured:', desktopFullPath);

  // 2. Tablet 768px
  console.log('Testing 768px Tablet...');
  await page.setViewport({ width: 768, height: 1024 });
  await new Promise(r => setTimeout(r, 1000));
  const tabletPath = path.join(ARTIFACT_DIR, 'tablet_768.png');
  await page.screenshot({ path: tabletPath });
  console.log('Captured:', tabletPath);

  // 3. Mobile 375px
  console.log('Testing 375px Mobile...');
  await page.setViewport({ width: 375, height: 812 });
  await new Promise(r => setTimeout(r, 1000));
  const mobilePath = path.join(ARTIFACT_DIR, 'mobile_375.png');
  await page.screenshot({ path: mobilePath });
  console.log('Captured:', mobilePath);

  // 4. Test GTM dataLayer and form submit
  console.log('Testing GTM dataLayer on page...');
  const dataLayerBefore = await page.evaluate(() => window.dataLayer);
  console.log('dataLayer events count before submit:', dataLayerBefore ? dataLayerBefore.length : 0);

  // Test submitting newsletter form
  console.log('Testing Newsletter Form submission...');
  await page.evaluate(() => {
    const consent = document.getElementById('newsletter-consent');
    if (consent) consent.click();
    const email = document.getElementById('newsletter-email');
    if (email) {
      email.value = 'test-founder@upthrust.agency';
      email.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const form = document.querySelector('footer form');
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  });

  await new Promise(r => setTimeout(r, 1500));

  const dataLayerAfter = await page.evaluate(() => window.dataLayer);
  console.log('dataLayer events count after submit:', dataLayerAfter ? dataLayerAfter.length : 0);
  const formSubmitEvent = dataLayerAfter.find(e => e.event === 'form_submit');
  console.log('form_submit event found in dataLayer:', !!formSubmitEvent, formSubmitEvent);

  const newsletterSuccessPath = path.join(ARTIFACT_DIR, 'newsletter_success.png');
  await page.screenshot({ path: newsletterSuccessPath });
  console.log('Captured:', newsletterSuccessPath);

  await browser.close();
  console.log('Testing complete successfully!');
}

run().catch(err => {
  console.error('Error during test:', err);
  process.exit(1);
});
