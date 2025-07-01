import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  globalTimeout: 1000*60*60, //3600000ms is 1hr ?
  timeout: 60_000, //30secs
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry 2 times on CI and 1 time when run locally */
  retries: process.env.CI ? 2 : 1,
  //check we can configure based on conditions
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',
// /auth  --> http://localhost:3000/auth
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    //will locate elements based on the data-testid attribute, but you can configure it in your test config 
    testIdAttribute: 'data-test',
    //by default is set to false, set to true when SSL certification not to be checked
    ignoreHTTPSErrors: true,
    video: 'on'  // video gets created only at end of run
    //create your github account(USE GMAIL) -- individual task/activity
  },
 // ENV = dev   //.env.dev file , .env.prod

  /* Configure projects for major browsers */

  //dev , qa , non-prod , prod--> 

  //create projects , ID ?
  projects: [
    {
      name: 'PROD tests',
      use: { ...devices['Desktop Chrome'],
        baseURL: 'https://thinking-tester-contact-list.herokuapp.com',
       },
       testDir: 'tests/API-tests',
    },
  
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
//for POM use fixtures --recommended