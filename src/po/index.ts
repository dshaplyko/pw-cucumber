import { Page } from '@playwright/test';
import HomePage from './pages/Home.page';
import LoginPage from './pages/Login.page';

export default class App {
  constructor(readonly page: Page) {
    this.page = page;
  }

  get homePage(): HomePage {
    return new HomePage(this.page);
  }

  get loginPage(): LoginPage {
    return new LoginPage(this.page);
  }
}
