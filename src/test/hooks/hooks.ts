import { BeforeAll, Before, AfterAll, After } from '@cucumber/cucumber';
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

After(async () => {
  await pageFixture.page.close();
  await context.close();
});

AfterAll(async () => {
  await browser.close();
});
