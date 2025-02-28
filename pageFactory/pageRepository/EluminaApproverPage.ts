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

export class EluminaApproverPage {

    readonly page: Page;
    readonly context: BrowserContext;
    readonly AUTHOR: Locator;
    readonly QuestionMenu: Locator;
    readonly ClickOnCreatedExam: Locator;
    readonly ClickOnWorkFlow: Locator;
    readonly ClickOnApprove: Locator;
    readonly ValidateSuccessfulPopMessage: Locator;
    readonly Blueprint: Locator;
    readonly EXAMSMENU: Locator;
    readonly ClickOnSubmitAndApproveBtn: Locator;
    readonly questionIdClick: Locator;
    readonly clickOnSubmitForApproval: Locator;
    readonly rejectButtonClick: Locator;
    readonly successPopup: Locator;
    readonly ClickOnQuestionID: Locator;
    readonly ClickOnMoreOption: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.QuestionMenu = page.locator('//a[@data-tour="Questions"]');
        this.ClickOnCreatedExam = page.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a');
        this.ClickOnWorkFlow = page.locator('//p[normalize-space()="Workflow"]')
        this.ClickOnApprove = page.locator('//button[normalize-space()="Approve"]')
        this.ValidateSuccessfulPopMessage = page.locator('//div[@class="content-side"]//span')
        this.Blueprint = page.locator('//a[@data-tour="Blueprints"]');
        this.EXAMSMENU = page.locator('//a[text()="Exams"]');
        this.ClickOnSubmitAndApproveBtn = page.locator('//button[normalize-space()="Submit & Approve"]');
        this.questionIdClick = page.locator('(//table[@class="table"]//tbody[@class="tableBody"]//tr//td[2])[1]//span//a');
        this.ClickOnWorkFlow = page.locator('//p[normalize-space()="Workflow"]');
        this.clickOnSubmitForApproval = page.locator('//button[text()="Submit For Approval"]');
        this.rejectButtonClick = page.locator('//button[text()="Reject"]');
        this.successPopup = page.locator('//span[text()="Status has been updated successfuly."]');
        this.ClickOnMoreOption = page.locator('//table[@class="table"]//tbody//tr[1]//td[1]//a');
        this.ClickOnQuestionID = page.locator('//table[@class="table"]//tbody//tr[1]//td[2]//a')
    }

    /**Method for page navigation */
    async iAuthorPageNavigation() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.AUTHOR.click()
        ]);
        await newPage.waitForLoadState();
        return new exports.EluminaApproverPage(newPage);
    }

    async clickOnQutnId() {
        //await this.ClickOnMoreOption.click();
        await this.ClickOnQuestionID.click()
    }

    /**
     * Method for Questions Menu click on Menu bar
     */
    async QuestionMenuClick(): Promise<void> {
        await this.QuestionMenu.click();
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreatedExam.click();
    }

    /**
     * Method for workflow approve
     */
    async workflowApprove() {
        await this.ClickOnWorkFlow.click()
        await this.page.waitForTimeout(3000);
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(2000);
        await expect(this.ValidateSuccessfulPopMessage).toBeVisible();
    }

    /**Method for Blueprint Menu click on Menu bar */
    async BlueprintMenuClick(): Promise<void> {
        await this.Blueprint.click();
    }

    /**Method for Exam Tab Navigation */
    async examTabNavigation(): Promise<void> {
        await this.EXAMSMENU.click();
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreatedExam.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnSubmitAndApproveBtn.click();
        await this.page.waitForTimeout(3000);
    }

    /**
     * Method for Questions Menu click on Menu bar
     */
    async todoListApprover(): Promise<void> {
        await this.questionIdClick.click();
        await this.page.waitForTimeout(2000)
        await this.ClickOnWorkFlow.click();
        await this.page.waitForTimeout(2000)
        await this.rejectButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.successPopup.isVisible();
        await this.page.waitForTimeout(2000);

    }
}