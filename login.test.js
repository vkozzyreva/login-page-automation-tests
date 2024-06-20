const { test, expect } = require('@playwright/test');

test('Login page loads successfully', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  expect(page.url()).toBe('https://the-internet.herokuapp.com/login');
});

test('Successful login redirects to secure area', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation()
  ]);
  const url = await page.url();
  expect(page.url()).toBe('https://the-internet.herokuapp.com/secure');
});

test('Invalid login shows error message', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.fill('#username', 'invalidUser');
  await page.fill('#password', 'invalidPassword');
  await page.click('button[type="submit"]');
  const errorMessage = await page.locator('#flash');
  expect(await errorMessage.textContent()).toContain('Your username is invalid!');
});