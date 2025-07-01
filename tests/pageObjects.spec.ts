import {  test } from "../fixtures/myfixture.fixture"
import {NavigationPage} from '../pages/navigation.page'
import { FormLayoutPage } from "../pages/formLayouts.page";

test.beforeEach(async ({page}) =>
{
 await page.goto("http://localhost:4200")
});

//http://localhost:4200  --> prod
//http://dev.localhost:4200  --> dev
//http://local.localhost:4200   --> local
 
//process.env.

test('navigation to form page', async ({navigationPage}) =>
{
    await navigationPage.formLayoutPage();
    await navigationPage.datePickerPage();
    await navigationPage.SmartTable();
});

test('filling form', async ({navigationPage, formLayoutPage}) =>
    {
        await navigationPage.formLayoutPage();
        await formLayoutPage.submitUsingtheGridForm("testuser@test.com", "secret123", "Option 1");
         await formLayoutPage.submitInLineFomr("firstname lastname", "firstname_lastname@test.com", true)
    });

    //test-data --> json file {10 times - 10 combinations}

    //show using fixtures - tomorrow with an example


    //UI part - 

//     const pagePromise = context.waitForEvent('page');
// await page.getByText('open new tab').click();
// const newPage = await pagePromise;
// // Interact with the new page normally.


// await newPage.getByRole('button').click();  //new page 
// console.log(await newPage.title());



test('Multi window', async({browser}) => {
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    const pagePromise=context.waitForEvent("page")
    
    await page.locator("a[href='https://www.linkedin.com/company/orangehrm/mycompany/']").click()
    const newPage=await pagePromise;
    console.log(await newPage.title())
    await context.close()
    
    });


    // test('Multi window', async({page,context}) => {

    //     await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    //     const newPage = context.waitForEvent("page")
        
    //     await page.locator("a[href='https://www.linkedin.com/company/orangehrm/mycompany/']").click()
    //     const newPage=await pagePromise;
    //     console.log(await newPage.title())
    //     await context.close()
        
    //     });
