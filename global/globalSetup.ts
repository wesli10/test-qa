import { chromium } from 'playwright-core';
import fs from 'fs';
import { LoginPage } from '../pages/LoginPage';
import { UsersPage } from '../pages/UsersPage';
import { expect } from '@playwright/test';

export default async function globalSetup() {
  fs.mkdirSync('.auth', { recursive: true });

  if (
    fs.existsSync('.auth/storageState.json') &&
    fs.existsSync('.auth/patient.json')
  ) {
    return;
  }

  const browser = await chromium.launch();

  const context = await browser.newContext({
    baseURL: 'https://doctors.qa.patientstudio.com'
  });

  const page = await context.newPage();

  if (fs.existsSync('.auth/patient.json')) {
    fs.unlinkSync('.auth/patient.json');
  }

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

  const patient = await usersPage.createUser();
  
  await expect(
    page.getByText('Patient was successfully created')
  ).toBeVisible();
  
  fs.mkdirSync('.auth', { recursive: true });

  fs.writeFileSync(
    '.auth/patient.json',
    JSON.stringify(patient, null, 2)
  );

  await browser.close();}
