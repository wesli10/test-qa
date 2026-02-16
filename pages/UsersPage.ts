import { Page } from '@playwright/test';

export class UsersPage {

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/users');
  }

  async createUser() {

    await this.goto();

    await this.page.click('button:has-text("Criar usuário")');

    const name = `User ${Date.now()}`;
    const email = `user${Date.now()}@test.com`;

    await this.page.fill('#name', name);

    await this.page.fill('#email', email);

    await this.page.click('button:has-text("Salvar")');

    await this.page.waitForSelector(`text=${email}`);

    return { name, email };
  }

  async openUser(email: string) {

    await this.goto();

    await this.page.click(`text=${email}`);
  }

}
