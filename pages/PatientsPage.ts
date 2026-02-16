import { expect, type Page } from '@playwright/test';

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

    const patientResult = this.page.getByRole('row', {
      name: fullName
    });

    await expect(patientResult).toBeVisible();

    await patientResult.click();

    

  }

}
