import { Page, BrowserContext, Locator, expect, ElementHandle } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { EluminaProctorExamPage } from "./EluminaProctorExamPage";
import { EluminaExamPage } from "./EluminaExamPage";

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

export class EluminaReviewerPage {

    readonly page: Page;
    readonly context: BrowserContext;
    readonly AUTHOR: Locator;
    readonly questionIdClick: Locator;
    readonly ClickOnWorkFlow: Locator;
    readonly clickOnSubmitForApproval: Locator;
    readonly successPopupMessage: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.questionIdClick = page.locator('(//table[@class="table"]//tbody[@class="tableBody"]//tr//td[2])[1]//span//a');
        this.ClickOnWorkFlow = page.locator('//p[normalize-space()="Workflow"]');
        this.clickOnSubmitForApproval = page.locator('//button[text()="Submit For Approval"]');
        this.successPopupMessage = page.locator('//span[text()="Status has been updated successfully."]');
    }

    /**Method for page navigation */
    async iAuthorPageNavigation() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.AUTHOR.click()
        ]);
        await newPage.waitForLoadState();
        return new exports.EluminaReviewerPage(newPage);
    }

    /**
     * Method for Questions Menu click on Menu bar
     */
    async todoList(): Promise<void> {
        await this.questionIdClick.click();
        await this.page.waitForTimeout(2000)
        await this.ClickOnWorkFlow.click();
        await this.page.waitForTimeout(2000)
        await this.clickOnSubmitForApproval.click();
        await this.page.waitForTimeout(3000)
        await this.successPopupMessage.isVisible();
        await this.page.waitForTimeout(2000)
    }

}