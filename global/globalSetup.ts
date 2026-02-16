import { chromium } from '@playwright/test';
import fs from 'fs';
import { LoginPage } from '../pages/LoginPage.js';
import { UsersPage } from '../pages/UsersPage.js';

export default async function globalSetup() {

  const browser = await chromium.launch();

  const page = await browser.newPage();

  const loginPage = new LoginPage(page);
  const usersPage = new UsersPage(page);

  await loginPage.goto();
  await loginPage.login('login@email.com', 'senha');

  await page.context().storageState({
    path: '.auth/storageState.json'
  });

  const user = await usersPage.createUser();

  fs.writeFileSync(
    'utils/test-user.json',
    JSON.stringify(user)
  );

  await browser.close();
}
