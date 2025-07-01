import { type Page } from "@playwright/test";

export class FormLayoutPage{

  readonly page: Page

  constructor(page: Page)
  {
    this.page = page;
  }

  async submitUsingtheGridForm(email: string, password: string, optionSelect: string)
  {
    const usingGridForm = this.page.locator('nb-card').filter({hasText: "Using the Grid"});
    await usingGridForm.getByRole('textbox', {name: "Email"}).fill(email);
    await usingGridForm.getByRole('textbox', {name: "Password"}).fill(password);
    await usingGridForm.getByRole('radio', {name: optionSelect}).check({force: true});
    await usingGridForm.getByRole('button', {name: "Sign in"}).click();

  }
  /**
   * 
   * @param username 
   * @param email 
   * @param rememberMe - set as true when required to check rememberMe checkbox
   */

  async submitInLineFomr(username: string, email: string, rememberMe: boolean)
  {
    const inLineForm = this.page.locator('nb-card').filter({hasText: "Inline form"});
    await inLineForm.getByRole('textbox', {name: "Jane Doe"}).fill(username);
    await inLineForm.getByRole('textbox', {name: "Email"}).fill(email);
    if(rememberMe)
    {
      await inLineForm.getByRole('checkbox').check({force:true})
    }

  }
}