import { defineConfig } from '@playwright/test';
import fs from 'fs';

const storageState = fs.existsSync('.auth/storageState.json')
  ? '.auth/storageState.json'
  : undefined;

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  workers: 2,

  globalSetup: './global/globalSetup.ts',

  use: {
    baseURL: process.env.BASE_URL || 'https://seu-dominio.com',
    storageState,
    headless: false
  }

});
