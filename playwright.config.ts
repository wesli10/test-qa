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
    baseURL: 'https://doctors.qa.patientstudio.com',
    storageState,
    headless: false
  }

});
