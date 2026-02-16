import { expect, type Page } from '@playwright/test';

export class PatientProfilePage {

  constructor(private page: Page) {}

  async goToFinancial(patientFullName: string) {

    await expect(
      this.page.getByText(patientFullName)
    ).toBeVisible();

    await this.page.click('text=Financial');

    await this.page.waitForSelector('text=Payments');

  }

}
