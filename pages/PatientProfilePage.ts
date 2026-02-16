import type { Page } from '@playwright/test';

export class PatientProfilePage {

  constructor(private page: Page) {}

  async goToFinancial() {

    await this.page.click('text=Financial');

    await this.page.waitForSelector('text=Payments');

  }

}
