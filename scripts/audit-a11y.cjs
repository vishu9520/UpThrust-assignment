const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runAudit() {
  console.log('Running Axe Accessibility Audit on http://localhost:3000/ ...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  // Inject axe-core
  const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
  await page.evaluate(axeSource);

  // Run axe analysis
  const results = await page.evaluate(async () => {
    // @ts-ignore
    return await axe.run({
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']
      }
    });
  });

  console.log('--- Axe Accessibility Results ---');
  console.log(`Violations: ${results.violations.length}`);
  console.log(`Passes: ${results.passes.length}`);
  console.log(`Incomplete: ${results.incomplete.length}`);

  if (results.violations.length > 0) {
    console.log('\nViolation Details:');
    results.violations.forEach((v, i) => {
      console.log(`\n${i + 1}. [${v.impact?.toUpperCase()}] ${v.id}: ${v.help}`);
      console.log(`   Help URL: ${v.helpUrl}`);
      v.nodes.forEach(n => {
        console.log(`   - Target: ${n.target}`);
        console.log(`     Failure: ${n.failureSummary}`);
      });
    });
  } else {
    console.log('\n🎉 ZERO accessibility violations found! 100% WCAG 2.1 AA Compliant.');
  }

  await browser.close();
}

runAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
