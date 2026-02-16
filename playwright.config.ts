import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  workers: 2,

  globalSetup: './global/globalSetup.ts',

  use: {
    baseURL: 'https://platform.com',

    storageState: '.auth/storageState.json',

    headless: true,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure'
  }

});
