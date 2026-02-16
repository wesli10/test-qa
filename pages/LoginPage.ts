import type { Page } from '@playwright/test';

export class LoginPage {

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {

    await this.page.locator('input[name="username"]').fill(email);

    await this.page.locator('input[name="password"]').fill(password);

    await this.page.click('button[type="submit"]');

    await this.page.waitForURL('/dashboard?tab=pendingNotes');
  }

}
