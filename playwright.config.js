// playwright.config.js
const { devices } = require('@playwright/test');


module.exports = {
testDir: './tests/specs',
timeout: 30 * 1000,
expect: { timeout: 5000 },
fullyParallel: false,
retries: process.env.CI ? 2 : 0,
reporter: [['list'], ['html', { open: 'never' }]],
use: {
baseURL: 'https://www.saucedemo.com',
headless: true,
viewport: { width: 1280, height: 720 },
actionTimeout: 10 * 1000,
trace: 'on-first-retry',
},
projects: [
{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }
],
};