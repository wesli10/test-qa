import { chromium } from 'playwright-core';
import fs from 'fs';
import { LoginPage } from '../pages/LoginPage';
import { UsersPage } from '../pages/UsersPage';

export default async function globalSetup() {
  const browser = await chromium.launch();

  const context = await browser.newContext({
    baseURL: 'https://doctors.qa.patientstudio.com'
  });

  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  const usersPage = new UsersPage(page);

  await loginPage.goto();

  await loginPage.login(
    'office-admin@patientstudio.com',
    '1 Super Safe Password!'
  );

  await context.storageState({
    path: '.auth/storageState.json'
  });

  const user = await usersPage.createUser();

  fs.writeFileSync(
    'utils/test-user.json',
    JSON.stringify(user)
  );

  await browser.close();
}
