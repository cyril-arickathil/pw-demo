import { expect, test } from "@playwright/test";


//Promise ---> promise fulfilled , not fulfilled.
// handled using await keyword
// js --> async and await go hand in hand 

// testcase.spec.ts
// testcase.test.ts

// and  are setup(before each) and tear down(after each)

// <input>
//chaining and filtering

test.beforeEach( async ({page}) =>{
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await page.getByText("Forms").click();
  await (page.getByText("Form Layouts").or(page.locator('#id12'))).click();
});

test("learning different locator syntaxes", async({page}) =>{
  
  //by tag name
  await page.locator('input').click();

  //by ID #
  page.locator('#inputEmail1')

  //by class .
  page.locator('.status-basic')
  
  //by attribute
  page.locator('[type="email"]')

  //by mentioning all class values
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

  //combination of different locators
  page.locator('input[placeholder="Email"]')

  //XPATH type of locator - not recommended
  page.locator('//*[@id="inputEmail1"]')
//hand operator && || 

//by partial text match
page.locator(':text("Using the")')

//by exact match with text
page.locator(':text-is("Using the Grid")')  //very primitive 
})

//best- parctices user facing locators

test('best practice using user facing locators', async ({page}) =>
{
  await page.getByRole("textbox", {name: "Email"}).first().click();
  await page.getByRole("button", {name: "Sign in"}).first().click();

  await page.getByLabel("Email").first().click();
  await page.getByPlaceholder("Jane Doe").click();

  await page.getByText("Using the Grid").click();

  await page.getByTestId("Using the Grid").click();
})
//writin an xpath is atediuos 
// healeanium -- self healing xpath

//playwright - Cypress and Selenium

//2024 - playwright 

// C# , flurl, java - rest assured  to be migrated to playwright

//one stop shop - UI/ APi in same place with test runner , codegen , ui better debugging

test('locating child elements', async ({page}) =>
  {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    //chaining in locators
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();

    await page.locator('nb-card').getByRole('button', {name: "Sign in "}).first().click();
   // await page.getByRole('button').filter().click();
//indexing starts from 0

//locating using indexing should be avoided - last resort
   await page.locator('nb-card').nth(3).getByRole('button').click();
  })

  test('locating parent elements', async ({page}) =>
    {
      await page.locator('nb-card', {hasText:"Using the Grid"}).getByRole('textbox', {name: "Email"}).click();
      
      await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click();
  
      await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click();

      //traversing from child to parent // xpath way 
      await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click();

    })

    test('reuse created locator', async ({page}) =>
      {
       const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
       const email_textbox = basicForm.getByRole('textbox', {name: "Email"});

        await email_textbox.fill("user01@google.com");
        await basicForm.getByRole('textbox', {name: "Password"}).fill("secret001");
        await basicForm.getByRole('button', {name: "Submit"}).click();

        await expect(email_textbox).toHaveValue("testuser@google.com");

      })

//POM --> 


test('extract values/text from locators', async ({page}) =>
  {
   const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
   const button_text = await basicForm.locator('button').textContent();

   expect(button_text).toEqual("Submit");

   const text_radioButtons = await page.locator('nb-radio').allTextContents();
   expect(text_radioButtons).toContain("Option 3");
  })

  //asertions
  //password -->regex match 'nameis123!@##' should atleast 1 characters
  //interview questions at end of session/course

  test('assertions tests', async ({page}) =>{
    // generic / general assertion
    const inputValue = 5;

    expect(inputValue).toEqual(5);

    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
    const button_text = await basicForm.locator('button').textContent();
    expect(button_text).toEqual("test-Submit");

    //locator assertion
    const button_submit = basicForm.locator('button');
   // await expect(button_submit).toHaveText("Submit");

    //soft Assertion
    expect.soft(button_text).toEqual("test-Submit");

    await button_submit.click();


  })



