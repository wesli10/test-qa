import type { Page } from '@playwright/test';

export class UsersPage {

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/patients');
  }

  async createUser() {

    await this.goto();

    await this.page.click('button:has-text("Create New Patient")');

    const firstName = `Weslindo`;
    const lastName = `Lins`;
    const dateOfBirth = `01-16-2000`;
    const email = `weslindoQa@test.com`;
    // const phoneNumber = `1828317472`;

    await this.page.getByTestId('firstName').fill(firstName);
    await this.page.getByTestId('lastName').fill(lastName);
    await this.page.getByTestId('dateOfBirth').fill(dateOfBirth);
    await this.page.getByTestId('email').fill(email);
    // await this.page.getByTestId('phoneNumber').fill(phoneNumber);
    await this.page.getByTestId('createPatientConfirmBtn').click();

    return {
      fullName: `${firstName} ${lastName}`,
    };
  }

  async openUser(fullName: string) {

    await this.goto();

    const searchInput = this.page.getByTestId('searchValue');

    await searchInput.fill(fullName);
    await searchInput.press('Enter');

    const userResult = this.page.locator(`text=${fullName}`);

    await userResult.waitFor({ state: 'visible' });


  }

}
