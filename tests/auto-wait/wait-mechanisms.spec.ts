import { expect, test } from "@playwright/test";

test.beforeEach( async ({page}) =>{
  await page.goto("/"); // url is not opened in playwright
  await page.getByText("Button Triggering AJAX Request").click();
  //after clicking on thsi button we need to for 15 secs
  
})

test('case0', async ({page})=>{
  const successButton = page.locator(".bg-success"); // only after 15secs
  await successButton.click();
})

test('case1', async ({page})=>{
    const successButton = page.locator(".bg-success"); // only after 15secs
    await expect(successButton).toBeAttached({timeout:30_000});
    await successButton.waitFor(); // is more visbile 
    await successButton.click();
})

test('case2', async ({page})=>{
  const successButton = page.locator(".bg-success"); // only after 15secs

  //wait for a particular response to receive
  await page.waitForResponse('https://uitestingplayground.com/ajaxdata'); //would work in most cases

  //waiting for all network calls to be received/completed  
  await page.waitForLoadState('networkidle'); // this is not best practice, last resort
  //
  await successButton.click();
})

test('case3', async ({page})=>{
  const successButton = page.locator(".bg-success"); // only after 15secs

  //wait for a particular response to receive
  await page.waitForResponse('https://uitestingplayground.com/ajaxdata'); //would work in most cases

  //waiting for all network calls to be received/completed  
  await page.waitForLoadState('networkidle'); // this is not best practice, last resort
  //
  await successButton.click();

  await expect.soft(successButton).toHaveText('some thng', {timeout:5});
})