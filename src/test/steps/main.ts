import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../hooks/pageFixture';

Given('I am on {string} page', async function (page: 'home' | 'login') {
  const pages = {
    home: 'homePage',
    login: 'loginPage',
  };
  console.log(pages[page]);
  await pageFixture.app[pages[page]].goto();
});

When('I click {string} button', async function (string) {
  await pageFixture.app.homePage.searchButton.click();
});

Then('Search menu should be opened', async function () {
  await expect(pageFixture.app.homePage.searchInput, 'not visible').toBeVisible();
});
