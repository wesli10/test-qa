import { expect, type Page } from '@playwright/test';

export class FinancialPage {

  constructor(private page: Page) {}

  async createPayment(amount: string) {

    await this.page.click('button:has-text("Add Payment")');

    const amountInput = this.page.getByTestId('value');

    await expect(amountInput).toBeVisible();
    await expect(amountInput).toBeEnabled();

    await amountInput.fill(amount);

    const paymentMethod = this.page.getByTestId('paymentMethod');
    await expect(paymentMethod).toBeVisible();
    await paymentMethod.click();

    await this.page.getByRole('option', { name: 'Cash' }).click();

    await this.page.click('button:has-text("Charge Payment")');

  }

  async expectPaymentCreated() {

    const { expect } = await import('@playwright/test');
    await expect(this.page.getByText('Payment successful')).toBeVisible();

  }

}
