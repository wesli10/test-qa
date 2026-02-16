import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  workers: 2,

  globalSetup: './global/globalSetup.ts',

  use: {
    baseURL: 'https://doctors.qa.patientstudio.com',
    storageState: '.auth/storageState.json',
    headless: false
  }

});
