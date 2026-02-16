import { Page } from '@playwright/test';

export class PaymentsPage {

  constructor(private page: Page) {}

  async createPayment(amount: string) {

    await this.page.click('button:has-text("Criar pagamento")');

    await this.page.fill('#amount', amount);

    await this.page.click('button:has-text("Confirmar")');

  }

}
