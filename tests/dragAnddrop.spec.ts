import { test } from "@playwright/test";


test('drag and drop', async ({page}) =>
{
  await page.goto('https://www.globalsqa.com/demo-site/draganddrop/');

  //locate the frame first
  const frame = 
  page.frameLocator('[rel-title="Photo Manager"] iframe');

  //identify list
  //page.getByRole('list') //ul
  const sourceLocator =
   frame.locator('li', {hasText: "High Tatras 2"});
  //await frame.getByRole('listitem', {name: "High Tatras"}).click(); //li list-item working why not
  //source locator



  //target locator
const targetLocator =
  frame.locator('#trash');

  //drag&drop
  await sourceLocator.dragTo(targetLocator);
  // await sourceLocator.hover();
  // await page.mouse.down();
  // await targetLocator.hover();
  // await page.mouse.up();


})


// <html>

// <iframe>
// <html>
// </html>
// </iframe>

// </html>

//MCP  --> Playwright with MCP (under development)
//Selenium with MCP