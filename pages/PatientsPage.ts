import type { Page } from '@playwright/test';

export class PatientsPage {

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/patients');
  }

  async openPatient(fullName: string) {

    await this.goto();

    
    const searchInput = this.page.getByTestId('searchValue');

    await searchInput.fill(fullName);
    await searchInput.press('Enter');

    const userResult = this.page.locator(`text=${fullName}`);

    await userResult.waitFor({ state: 'visible' });

    await userResult.click();

  }

}
