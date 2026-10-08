const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const UPLOAD_DIR = 'C:\\Users\\Vishu Vatsay\\.gemini\\antigravity-ide\\brain\\13694790-c34a-48a1-813b-5258ac6c8bc8\\.user_uploaded';

async function cropCards() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  const strategyData = fs.readFileSync(path.join(UPLOAD_DIR, 'media_1791472576457.png')).toString('base64');
  const brandingData = fs.readFileSync(path.join(UPLOAD_DIR, 'media_1791472576624.png')).toString('base64');
  const digitalData = fs.readFileSync(path.join(UPLOAD_DIR, 'media_1791472576564.png')).toString('base64');
  const panoramaData = fs.readFileSync(path.join(UPLOAD_DIR, 'media_1791469544260.png')).toString('base64');
  
  await page.setContent(`
    <!DOCTYPE html>
    <html><body>
      <canvas id="c"></canvas>
      <script>
        window.crop = async function(b64, x, y, w, h) {
          const img = new Image();
          await new Promise((res, rej) => {
            img.onload = res;
            img.onerror = rej;
            img.src = 'data:image/png;base64,' + b64;
          });
          const c = document.getElementById('c');
          c.width = w;
          c.height = h;
          const ctx = c.getContext('2d');
          ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
          return c.toDataURL('image/png').split(',')[1];
        };
      </script>
    </body></html>
  `);

  // Crop Strategy card mockup: in 1024x576 image, x=85, y=240, w=350, h=240
  const stratCard = await page.evaluate(async (b64) => {
    return await window.crop(b64, 85, 238, 350, 240);
  }, strategyData);
  fs.writeFileSync('public/images/card-strategy-exact.png', Buffer.from(stratCard, 'base64'));

  // Crop Branding card mockup
  const brandCard = await page.evaluate(async (b64) => {
    return await window.crop(b64, 85, 238, 350, 240);
  }, brandingData);
  fs.writeFileSync('public/images/card-branding-exact.png', Buffer.from(brandCard, 'base64'));

  // Crop Digital UX card mockup
  const digitalCard = await page.evaluate(async (b64) => {
    return await window.crop(b64, 85, 238, 350, 240);
  }, digitalData);
  fs.writeFileSync('public/images/card-digital-exact.png', Buffer.from(digitalCard, 'base64'));

  // Crop Campaign card mockup from panorama (4th panel):
  // panorama is 1024 x 143; 4th card is at x ~ 780, y ~ 62, w ~ 90, h ~ 60
  // Or in 1024x143, panel 4 is x=768..1024
  const campaignCard = await page.evaluate(async (b64) => {
    // In 1024x143 panorama, card 4 mockup is from x=788 to 878, y=55 to 118
    return await window.crop(b64, 788, 55, 90, 64);
  }, panoramaData);
  fs.writeFileSync('public/images/card-campaign-exact.png', Buffer.from(campaignCard, 'base64'));

  console.log('Successfully cropped exact mockup cards from design!');
  await browser.close();
}

cropCards().catch(console.error);
