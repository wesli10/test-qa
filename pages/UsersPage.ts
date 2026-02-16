import { expect, type Page } from '@playwright/test';
import { generatePatient } from '../utils/dataFactory';

export class UsersPage {

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/patients');
  }

  async createUser() {

    await this.goto();

    await this.page.click('button:has-text("Create New Patient")');

    const patient = generatePatient();

    await this.page.getByTestId('firstName').fill(patient.firstName);
    await this.page.getByTestId('lastName').fill(patient.lastName);
    await this.page.getByTestId('dateOfBirth').fill(patient.dateOfBirth);
    await this.page.getByTestId('email').fill(patient.email);
    await this.page.getByTestId('createPatientConfirmBtn').click();

    const toast = this.page.getByText('Patient was successfully created');

    await expect(toast).toBeVisible({ timeout: 15000 });
    
    return {
      fullName: `${patient.firstName} ${patient.lastName}`,
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
