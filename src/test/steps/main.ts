import { Given, Then, When } from '@cucumber/cucumber';
import { chromium, Page, Browser, expect } from '@playwright/test';

let browser: Browser;
let page: Page;

Given('I am on {string} page', async function (string) {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://mazda.by');
  console.log('LOGIN@@@');
});

When('I click {string} button', async function (string) {
  await page.locator('button.js-search-trigger').click();
});

Then('Search menu should be opened', async function () {
  await expect(page.locator('input.js-search-popup-input')).toBeVisible();
  await browser.close();
});
