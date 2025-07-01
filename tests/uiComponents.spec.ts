import { expect, test } from "@playwright/test";

test.beforeEach( async ({page}) =>{
   await page.goto("http://localhost:4200/pages/iot-dashboard");
});

test.describe('form layout page', ()=>
{
  test.beforeEach( async ({page}) =>{
    await page.getByText("Forms").click();
    await (page.getByText("Form Layouts").or(page.locator('#id12'))).click();
  })
  test('different input fields', async ({page}) =>
    {
     const usingGridEmailInput = page.locator('nb-card').filter({hasText: "Using the Grid"})
     .getByRole('textbox', {name: "Email"});
    
        await usingGridEmailInput.fill("test-user@google.com");
        await usingGridEmailInput.clear();

        await usingGridEmailInput.pressSequentially("test-user@google.com", {delay:1000}); // actual user

        //assertions
        await expect(usingGridEmailInput).toHaveValue('test-user1@google.com')
    })

    test('handle radio buttons', async ({page})=>{

      const usingGridForm = page.locator('nb-card').filter({hasText: "Using the Grid"});
      //await usingGridForm.getByLabel('Option 1').check({force: true});

      await usingGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true});

      //generic way
      const checkRadioStatus = await usingGridForm.getByRole('radio', {name: 'Option 1'}).isChecked();
      expect(checkRadioStatus).toBeTruthy();
      //locator assertion - are recommended
      await expect(usingGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked();

    })

    test('handle checkboxes', async ({page})=>{
      await page.getByText('Modal & Overlays').click();
      await page.getByText('Toastr').click();

      await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true});
//force action to ignore actionability checks
await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true});
//DOM
//nb-checkbox
//nb-newCheckbox
//local and 
      const allCheckBoxes = page.getByRole('checkbox')
      for(const box of await allCheckBoxes.all())
      {
          await box.uncheck({force: true})
          await expect(box).not.toBeChecked();
      }

    })

    test('handle drop downs and lists', async ({page}) =>
    {
      // <ul>
      //   <li>
      //   <li>

      // </ul>

      
      //li getByRole('listitem')
      const dropDown = page.locator('ngx-header nb-select');
      await dropDown.click();

      // page.getByRole('list') //ul getByRole('list')

      // page.getByRole('list').locator('nb-option')

      const optionList = page.locator('nb-option-list nb-option') // return 4 webElements

      await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

      // optionList.getByText("Cosmic")
      await optionList.filter({hasText: "Cosmic"}).click();

      //also show how to validate background color on theme change
    })


    test('handle tooltips', async ({page}) =>
      {
        await page.getByText('Modal & Overlays').click();
      await page.getByText('Tooltip').click();
      const tooltipcard=
      page.locator('nb-card', {hasText: "Tooltip Placements"})
      await tooltipcard.getByRole('button', {name: "Top"}).hover() //type="button" or <button>
//[text()="Top"]
      // await tooltipcard.getByRole('tooltip', {name: "Top"}).hover()
      const tooltipText= page.locator('nbtooltip')

      await expect(tooltipText).toHaveText('This is a tooltip')

// const tooltiptext=
//       page.locator('nbtooltip').textContent()

//       expect(tooltiptext).toEqual('This is a tooltip')
  //find a way to assert tool tip - assignment 
  //nbtooltip="This is a tooltip" find the value of attribute name
      });
      test('dialog box test', async ({ page }) => {
        await page.getByText('Tables & Data').click();
        await page.getByText('Smart Table').click();

        //before clickin trash icon need to handle dialog box
//<table> use role as table
page.on('dialog', dialog => {
  expect(dialog.message()).toEqual('Are you sure you want to delete?')
   dialog.accept()  //this will click on OK/ Accept
}); //dialog.dismiss()

        await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash')
        .click();
      });

      test('handling web tables/smart tables test', async ({ page }) => {
        await page.getByText('Tables & Data').click();
        await page.getByText('Smart Table').click();

        await page.getByRole('button', {name: ''}).click({});

        //each row / 1 single row


        // const row = page.getByRole('row', {name: "snow@gmail.com"});
        // await row.locator('.nb-edit').click();

        // await page.locator('input-editor').getByPlaceholder('Age').clear();
        // await page.locator('input-editor').getByPlaceholder('Age').fill('31');

       // await page.locator('nb-check').click()

       //testing whether filter works or not
        const ages = ["20", "40", "100"]
//runing for 1st time
        for(const age of ages )
        {
          await page.locator('input-filter').getByPlaceholder('Age').clear();
          await page.locator('input-filter').getByPlaceholder('Age').fill(age);

          //await page.waitForTimeout(1000);  // not recommned to handle 
          //try diff approaches to handle wait here
         // await page.locator().waitFor({state: "attached"})
//attached --> wait for the element to be available in the DOM

          const ageRows = page.locator('tbody tr')  //5 rows []  //1 row //40

          for(const row of await ageRows.all())
          {
            const cellValue = 
              await row.locator('td').last().textContent() ; //age=20 for first
              if(age ==="100")
              {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
              }
              else{
                expect(cellValue).toEqual(age);
              }
              

             // expect(locator).toHaveText(age)  //locator assertion
          }

        }

      });
      
//xpath 
  //     await page.getByRole('textbox', {name: }).fill('Test location 1');
      
  // await page.locator('#number input').fill('Test Locatio 1');


  // <input>
      //   id=name
    
      //   <li>

      // </input>

})


test('dialog component', async ({ page }) => 
  {
    await page.getByText('Modal & Overlays').click();
        await page.getByText('Dialog').click();

        await page.getByRole('button', {name: 'Open Dialog with component'}).click();

});

test('handle dates / calenders ', async ({ page }) => 
  {
    await page.getByText('Forms').click();
        await page.getByText('Datepicker').click();
      const calenderInput= page.getByPlaceholder('Form Picker');

      await calenderInput.click();

      const date = new Date();
     // date.setDate(date.getDate() +365)  //when insurance expire
      const expecteddate = date.getDate().toString()
      const expectedMonth = date.toLocaleString('En-US', {month: 'short'})
      const expectedYear = date.getFullYear()
      const dateAssert = `${expectedMonth} ${expecteddate}, ${expectedYear}`     //'Jun 1, 2025'
//case 1 - insurance today , and insurance is valid for 1 year
//dd/mmm/yyyy
// mmm 
//Jun
//June
//june -06

// class="today day-cell ng-star-inserted"
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expecteddate, {exact: true}).click();
    await expect(calenderInput).toHaveValue(dateAssert);


    //you need to select future year from calender and then current month and date as 25

    
});


test('handling slider', async({page})=>{
  // first locate temperature 
  // page.locator('[tabtitle="Humidity"] ngx-temperature-dragger circle')  //humidity tab
  // //await page.getByText('Temperature').click();  //we are already on temperature tab
  // const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')// temp tab
//<circle _ngcontent-ook-c272="" cx="232.6309883354377" cy="47.36901166456225" r="16" stroke-width="3" fill="#f7f9fc" stroke="#3366ff"></circle>
  //update the attribute value inside circle tag

  // await tempGauge.evaluate(node =>
  // {
  //   node.setAttribute('cx', '232.6309883354377')
  //   node.setAttribute('cy', '232.6309883354377')
  // }
  // )
  // //java script executor --
  // //jse -- directly actions on your browser
  // //click() jse.click('[]'. '')

  // await tempGauge.click();


  const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
  await tempBox.scrollIntoViewIfNeeded();

  const box = await tempBox.boundingBox();

  //my goal is to move my mouse only within the mentioned box

  const x = box.x + box.width / 2 ;   //box.x ==0 
  const y = box.y + box.height/2 ;

  await page.mouse.move(x,y);
  await page.mouse.down()

  await page.mouse.move(300, 300, {steps:5});


})