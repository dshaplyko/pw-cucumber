import { BeforeAll, Before, AfterAll, After, Status, AfterStep } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { pageFixture } from './pageFixture';
import App from '../../po';

let browser: Browser;
let page: Page;
let context: BrowserContext;
let app: App;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false });
});

Before(async () => {
  context = await browser.newContext();
  page = await context.newPage();
  app = new App(page);
  app.page.setDefaultTimeout(60000);
  pageFixture.app = app;
});

AfterStep(async function ({ pickle }) {
  const img = await app.page.screenshot({ path: `./test-result/screenshots/${pickle.name}.png`, type: 'png' });
  this.attach(img, 'image/png');
});

After(async function ({ pickle, result }) {
  if (result.status === Status.FAILED) {
    const img = await app.page.screenshot({ path: `./test-result/screenshots/${pickle.name}.png`, type: 'png' });
    this.attach(img, 'image/png');
  }

  await app.page.close();
  await context.close();
});

AfterAll(async () => {
  await browser.close();
});
