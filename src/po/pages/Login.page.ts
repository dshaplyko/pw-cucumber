import { Locator, Page } from '@playwright/test';
import { BasePage } from './Base.page';

export default class LoginPage extends BasePage {
  readonly page: Page;

  readonly url: string;

  readonly searchButton: Locator;

  readonly searchInput: Locator;

  constructor(page: Page, url = '/login') {
    super(page);
    this.url = url;
    this.searchButton = this.page.locator('button.js-search-trigger');
    this.searchInput = this.page.locator('input.js-search-popup-input');
  }

  async goto(): Promise<void> {
    await super.goto(this.url);
  }
}
