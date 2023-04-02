import { Page } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  readonly baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = 'https://mazda.by';
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(this.baseUrl + url);
  }
}
