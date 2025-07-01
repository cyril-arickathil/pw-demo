import { test as baseTest } from "@playwright/test";
import { NavigationPage } from "../pages/navigation.page";
import { FormLayoutPage } from "../pages/formLayouts.page";


//declare types of your fixture..
type MyFixtures =
{
  navigationPage: NavigationPage;
  formLayoutPage : FormLayoutPage
}


export const test = baseTest.extend<MyFixtures>({
  navigationPage: async ({page}, use) =>
  {
    const navigationPage = new NavigationPage(page);
    //use this fixture in test directly like using page
    await use(navigationPage);
  },
  formLayoutPage: async ({page}, use) =>
    {
      const formLayoutPage = new FormLayoutPage(page);
  
      //use this fixture in test directly like using page
       await use(formLayoutPage);
    }
})