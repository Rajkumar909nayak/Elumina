import { PlaywrightTestConfig, devices } from '@playwright/test';
import { testConfig } from './testConfig';
import fs from 'fs';
import path from 'path';
let zephyrdata = JSON.parse(fs.readFileSync(path.resolve('utils/api/zephyr_Integration_Data.json'), 'utf-8'))
const ENV = process.env.ENV;
const headless = process.env.HEADLESS_MODE?.toLowerCase() === 'true';
const Hr = (new Date).getHours();
const AMorPM = Hr >= 12 ? 'pm' : 'am';
const a = (Hr % 12) || 12;
const Hrs = a.toString();
const min = (new Date).getMinutes().toString();
const Finaltime = " time - " + Hrs + ":" + min + " " + AMorPM;

if (!ENV || ![`production`, `staging`, `sandbox`, `p7`, `qa`, `dev`, `qaApi`, `devApi`].includes(ENV)) {
  console.log(`Please provide a correct environment value like "npx cross-env ENV=production|staging|sandbox|p7|qa|dev|qaApi|devApi"`);
  process.exit();
}

const config: PlaywrightTestConfig = {

  //Global Setup to run before all tests
  globalSetup: `./global-setup`,

  //Global Teardown to run after all tests
  globalTeardown: `./global-teardown`,

  //sets timeout for each test case
  timeout: 420000,

  //number of retries if test case fails
  retries: 0,

  //Reporters
  reporter: [[`./CustomReporterConfig.ts`], [`allure-playwright`], [`html`, { outputFolder: 'html-report/' + (new Date).toDateString().concat(" ", ENV, " ", Hrs, "-", min, " ", AMorPM), open: 'never' }], ['./ExcelReporter.ts'],
  ['playwright-zephyr/lib/src/cloud', {
    authorizationToken: zephyrdata.authorization,
    projectKey: zephyrdata.projectKey,
    testCycle: {
      folderId: zephyrdata.testCycleFolderID,
      name: `Automated Playwright Run - ${new Date().toISOString()}`,
    },
  }]
  ],

  projects: [
    {
      name: `Chrome`,
      use: {
        // Configure the browser to use.
        browserName: `chromium`,

        //Chrome Browser Config
        channel: `chrome`,


        //Picks Base Url based on User input
        baseURL: testConfig[process.env.ENV],

        //Browser Mode
        headless: headless,

        //Browser height and width
        viewport: { width: 1250, height: 600 },
        ignoreHTTPSErrors: true,

        //Enable File Downloads in Chrome
        acceptDownloads: true,

        //Artifacts
        screenshot: `on`,
        video: `on`,
        trace: `on`,

        //Slows down execution by ms
        launchOptions: {
          slowMo: 0
        }
      },
    },
    {
      name: `Chromium`,
      use: {
        browserName: `chromium`,
        baseURL: testConfig[process.env.ENV],
        headless: headless,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },

    {
      name: `Firefox`,
      use: {
        browserName: `firefox`,
        baseURL: testConfig[process.env.ENV],
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },

    {
      name: `Edge`,
      use: {
        browserName: `chromium`,
        channel: `msedge`,
        baseURL: testConfig[process.env.ENV],
        headless: false,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },
    {
      name: `WebKit`,
      use: {
        browserName: `webkit`,
        baseURL: testConfig[process.env.ENV],
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },
    {
      name: `Device`,
      use: {
        ...devices[`Pixel 4a (5G)`],
        browserName: `chromium`,
        channel: `chrome`,
        baseURL: testConfig[process.env.ENV],
        headless: true,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },
    {
      name: `DB`
    },
    {
      name: `API`,
      use: {
        baseURL: testConfig[process.env.ENV]
      }
    }
  ],
};
export default config;