import type { Page } from '@playwright/test';

export class FinancialPage {

  constructor(private page: Page) {}

  async createPayment(amount: string) {

    await this.page.click('button:has-text("Add Payment")');

    await this.page.fill('#amount', amount);

    await this.page.getByRole('option', { name: 'Cash' }).click();

    await this.page.click('button:has-text("Charge Payment")');

  }

  async expectPaymentCreated() {

    const { expect } = await import('@playwright/test');
    await expect(this.page.getByText('Payment successful')).toBeVisible();

  }

}
