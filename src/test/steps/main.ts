import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../hooks/pageFixture';

Given('I am on {string} page', async function (string) {
  await pageFixture.page.goto('https://mazda.by');
});

When('I click {string} button', async function (string) {
  await pageFixture.page.locator('button.js-search-trigger').click();
});

Then('Search menu should be opened', async function () {
  await expect(pageFixture.page.locator('input.js-search-popup-input')).toBeVisible();
});
