import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5090/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('user1@test.com');
  await page.getByLabel('Email:').press('Tab');
  await page.getByLabel('Password:').fill('test');
  await page.getByLabel('Password:').press('Enter');



  await page.getByRole('link', { name: 'All movies' }).click();
  const linkSelector = 'main > ul > li:nth-child(1) > a'
  const movieName = await page.evaluate((selector) => {
    const movieLink = document.querySelector(selector);
    return movieLink?.textContent;
  }, linkSelector)
  await page.pause()
  await page.locator(linkSelector).click();
  await expect(page.getByRole('heading', { name: movieName })).toBeAttached();
  await page.getByLabel('Score:').selectOption('5');
  await page.getByRole('button', { name: 'Submit' }).click();

  // Rating page
  await page.waitForSelector('main > ul > li:nth-child(1)')
  const renderedRating = await page.evaluate(() => {
    return document.querySelector('main > ul > li:nth-child(1)').textContent.split(': ')[1]
  })
  console.log(renderedRating);
  
  expect(renderedRating).toBe('5');
});