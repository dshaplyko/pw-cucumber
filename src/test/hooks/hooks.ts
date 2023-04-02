import { BeforeAll, Before, AfterAll, After, Status, AfterStep } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { pageFixture } from './pageFixture';

let browser: Browser;
let page: Page;
let context: BrowserContext;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false });
});

Before(async () => {
  context = await browser.newContext();
  page = await context.newPage();
  pageFixture.page = page;
});

AfterStep(async function ({ pickle, result }) {
  const img = await pageFixture.page.screenshot({ path: `./test-result/screenshots/${pickle.name}.png`, type: 'png' });
  this.attach(img, 'image/png');
});

After(async function ({ pickle, result }) {
  if (result.status === Status.FAILED) {
    const img = await pageFixture.page.screenshot({ path: `./test-result/screenshots/${pickle.name}.png`, type: 'png' });
    this.attach(img, 'image/png');
  }

  await pageFixture.page.close();
  await context.close();
});

AfterAll(async () => {
  await browser.close();
});
