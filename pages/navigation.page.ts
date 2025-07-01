import { Locator, type Page } from "@playwright/test";

//create a github account using gmail

//always follow camel-casing

//class access modifier
//private, public, protected, readonly
export class NavigationPage
{
  readonly page: Page
  readonly formLayoutButton: Locator
  readonly formLayouts: Locator
  readonly datePicker: Locator
  readonly table: Locator
  readonly tooltip: Locator
  readonly dialog: Locator
  readonly dragAndDrop: Locator
  readonly tableAndData: Locator
  readonly modalOverlays: Locator

  constructor(page: Page)
  {
    this.page = page
    this.formLayoutButton = page.getByText("Forms");
    this.formLayouts = page.getByText("Form Layouts");
    this.datePicker = page.getByText("Datepicker");
    this.table = page.getByText("Smart Table");
    this.tooltip = page.getByText("Tooltip");
    this.dialog = page.getByText("Dialog");
    this.dragAndDrop = page.getByText("Drag & Drop");
    this.tableAndData = page.getByText("Tables & Data");
    this.modalOverlays = page.getByText("Modal & Overlays");
  }

  async formLayoutPage(): Promise<void>
  {
    await this.formLayoutButton.click();
    await this.formLayouts.click();
  }
  async datePickerPage(): Promise<void>
  { 
    await this.formLayoutButton.click();
    await this.datePicker.click();
  }

  async SmartTable(): Promise<void>
  { 
    await this.tableAndData.click();
    await this.table.click();
  }

  async tooltipPage(): Promise<void>
  {
    await this.modalOverlays.click();
    await this.tooltip.click();
  }

}