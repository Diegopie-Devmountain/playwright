import {test, expect} from '@playwright/test'

function delay (ms) {
  return new Promise( resolve => {
    setTimeout(()=> {
      resolve(null)
    }, ms)
  })
}

const loginData = {
  email: 'user1@test.com',
  password: 'test'
}

const movieData = {

}

test.beforeEach(async ({page}) => {
  await page.goto('localhost:5090');

  // Login 
  await page.locator('#root > nav > ul > li:nth-child(3) > a').click()
  await page.locator('#email').fill(loginData.email)
  await page.locator('#password').fill(loginData.password)
  await page.locator('#password').press('Enter')

})

test.afterEach(async ({page, browserName}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshotPath = testInfo.outputPath(`${browserName}-failure.png`);
    testInfo.attachments.push({name: 'screenshot', path: screenshotPath, contentType: 'image/png'})
    await page.screenshot({path: screenshotPath, timeout:15000})
  }
})

test.describe('Test Movie Titles, Create Rating, Create Movie', () => {

test('Rating', async ({page}) => {
  await page.getByRole('link', { name: 'All movies' }).click();
  const linkSelector = 'main > ul > li:nth-child(1) > a'
  const movieName = await page.evaluate((selector) => {
    const movieLink = document.querySelector(selector);
    return movieLink?.textContent;
  }, linkSelector)
  await page.locator(linkSelector).click();
  await expect(page.getByRole('heading', { name: movieName })).toBeAttached();
  await page.getByLabel('Score:').selectOption('5');
  await page.getByRole('button', { name: 'Submit' }).click();

  // Rating page

  await page.waitForSelector('main > ul > li:nth-child(1)')
  const renderedRating = await page.evaluate(() => {
    return document.querySelector('main > ul > li:nth-child(1)')?.textContent.split(': ')[1]
  })
  console.log(renderedRating);
  
  expect(renderedRating).toBe('5');
})

})

