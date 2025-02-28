import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";

const devTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/dev/testData.json')));
const p7TestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/p7/testData.json')));
const productionTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/production/testData.json')));
const qaTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/qa/testData.json')));
const sandboxTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/sandbox/testData.json')));
const stagingTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/staging/testData.json')));

let webActions: WebActions;
let testData = qaTestData;
if (process.env.ENV == 'dev') {
    testData = devTestData;
}
else if (process.env.ENV == 'p7') {
    testData = p7TestData;
}
else if (process.env.ENV == 'production') {
    testData = productionTestData;
}
else if (process.env.ENV == 'qa') {
    testData = qaTestData;
}
else if (process.env.ENV == 'sandbox') {
    testData = sandboxTestData;
}
else if (process.env.ENV == 'staging') {
    testData = stagingTestData;
}

export class EluminaGradeBookPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly AUTHOR: Locator;
    readonly gradeBookMenu: Locator;
    readonly clickOnGradeId: Locator;
    readonly downloadButton: Locator;
    readonly validatingDownloadCompleted: Locator;


    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.gradeBookMenu = page.locator('//a[@data-tour="Gradebook"]')
        this.clickOnGradeId = page.locator('(//table[@class="table"]//tbody//tr//td[3])[2]')
        this.downloadButton = page.locator('//button[@class="theme-btn theme-primary-btn"]')
        this.validatingDownloadCompleted = page.locator('//span[contains(text(),"Downloading grade book report. Please check your computer for the completed download.")]')
    }

    async iAuthorPageNavigation() {
        const [newPage] = await Promise.all([
          this.context.waitForEvent('page'),
          await this.AUTHOR.click()
        ]);
        await newPage.waitForLoadState();
        return new exports.EluminaGradeBookPage(newPage);
      }

      async gradeBookNavigator(){
        await this.gradeBookMenu.click();
      }

      async downloadGradeDetails(){
        await this.clickOnGradeId.click();
        await this.downloadButton.click();
        await this.page.waitForTimeout(2000);
        console.log(await this.validatingDownloadCompleted.textContent());
        await this.page.waitForTimeout(3000);
         
      }


}