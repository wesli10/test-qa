import { chromium } from 'playwright-core';
import fs from 'fs';
import { LoginPage } from '../pages/LoginPage';
import { UsersPage } from '../pages/UsersPage';
import { expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

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
    baseURL: process.env.BASE_URL || 'https://seu-dominio.com'
  });

  const page = await context.newPage();

  if (fs.existsSync('.auth/patient.json')) {
    fs.unlinkSync('.auth/patient.json');
  }

  const loginPage = new LoginPage(page);
  const usersPage = new UsersPage(page);

  await loginPage.goto();

  const email = process.env.QA_EMAIL || '';
  const password = process.env.QA_PASSWORD || '';

  if (!email || !password) {
    throw new Error('QA_EMAIL e QA_PASSWORD devem ser configuradas no arquivo .env');
  }

  await loginPage.login(email, password);

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
