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

export class EluminaMarkerPage {

    readonly page: Page;
    readonly context: BrowserContext;
    readonly AUTHOR: Locator;
    readonly examIdClick: Locator;
    readonly examId: Locator;
    readonly candidateName: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;
    readonly status: Locator;
    readonly candidateId: Locator;
    readonly notYetStarted: Locator;
    readonly inProgress: Locator;
    readonly marked: Locator;
    readonly flagForReview: Locator;
    readonly question1: Locator;
    readonly question2: Locator;
    readonly question3: Locator;
    readonly mark1: Locator;
    readonly mark2: Locator;
    readonly notSatisfactory: Locator;
    readonly leftArrowClick: Locator;
    readonly finishButton: Locator;
    readonly feedBack: Locator;
    readonly percentage: Locator;
    readonly markingStatus: Locator;
    readonly saveButton: Locator;
    readonly ClickOnWorkFlow: Locator;
    readonly ClickOnApprove: Locator;
    readonly AllCandCheckBox: Locator;
    readonly dropDownToggle: Locator;
    readonly submitAsFinal: Locator;
    readonly YesButton: Locator;
    readonly MarksSubmit: Locator;
    readonly feedBackIcon: Locator;
    readonly enterFeedBack: Locator;
    readonly feedbackSuccessMessage: Locator;


    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.examIdClick = page.locator('(//table[@class="table"]//tbody//tr//td[2]//span//span//span)[1]');
        this.examId = page.locator('//div[@class="userInfo userInfo__lable userInfo__lable--title"]');
        this.candidateName = page.locator('//div[@class="userInfo userInfo__lable"][1]');
        this.candidateId = page.locator('(//table[@class="table"]//tbody//tr//td//a)[2]');
        this.startDate = page.locator('//div[@class="userInfo userInfo__lable"][2]');
        this.endDate = page.locator('//div[@class="userInfo userInfo__lable"][3]');
        this.status = page.locator('//div[@class="userInfo userInfo__lable"][4]');
        this.notYetStarted = page.locator('(//span[@class="indication-dot"])[1]');
        this.inProgress = page.locator('(//span[@class="indication-dot"])[2]');
        this.marked = page.locator('(//span[@class="indication-dot"])[3]');
        this.flagForReview = page.locator('(//span[@class="indication-dot"])[4]');
        this.question1 = page.locator('(//span[@class="indication-dot"])[5]');
        this.question2 = page.locator('(//span[@class="indication-dot"])[6]');
        this.question3 = page.locator('(//span[@class="indication-dot"])[7]');
        this.mark1 = page.locator('//input[@type="text"]');
        this.mark2 = page.locator('//input[@class="score-input ng-untouched ng-pristine ng-invalid"]');
        this.notSatisfactory = page.locator('//span[text()="Not Satisfactory"]');
        this.leftArrowClick = page.locator('//i[@class="iconBg leftArrow"]');
        this.finishButton = page.locator('//button[text()=" Finish "]');
        this.feedBack = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[4]').locator('html');
        this.percentage = page.locator('(//table[@class="table"]//tbody//tr//td)[9]');
        this.markingStatus = page.locator('(//table[@class="table"]//tbody//tr//td)[10]');
        this.saveButton = page.locator('//button[@class="theme-btn theme-primary-btn"]');
        this.ClickOnWorkFlow = page.locator('//a[normalize-space()="Workflow"]')
        this.ClickOnApprove = page.locator('//button[normalize-space()="Approve"]');
        this.AllCandCheckBox = page.locator('(//input[@class="ng-untouched ng-pristine ng-valid"])[1]');
        this.dropDownToggle = page.locator('//a[@class="dropdown-toggle"]');
        this.submitAsFinal = page.locator('//p[text()="Submit as Final"]');
        this.YesButton = page.locator('(//button[text()="Yes"])[3]');
        this.MarksSubmit = page.locator('//span[text()="Final marks submitted sucessfully"]');
        this.feedBackIcon = page.locator('(//img[@class="cohort-image"])[1]');
        this.enterFeedBack = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])').locator('html');
        this.feedbackSuccessMessage = page.locator('//span[text()="Cohort feedback updated"]');
    }

    /**Method for page navigation */
    async iAuthorPageNavigation() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.AUTHOR.click()
        ]);
        await newPage.waitForLoadState();
        return new exports.EluminaMarkerPage(newPage);
    }

    /**
     * Method to click on ExamId
     */
    async clickonexamId() {
        await this.examIdClick.click();
        await this.page.waitForTimeout(2000);
    }

    /**
     * Method to validate score card
     */
    async validateScoreCard() {
        await this.examId.isVisible();
        await this.candidateName.isVisible();
        await this.startDate.isVisible();
        await this.endDate.isVisible();
        await this.status.isVisible();

        await this.notYetStarted.isVisible();
        await expect(this.notYetStarted).toHaveCSS('background', 'rgb(128, 128, 128) none repeat scroll 0% 0% / auto padding-box border-box');
        await this.marked.isVisible();
        await expect(this.marked).toHaveCSS('background', 'rgb(0, 128, 0) none repeat scroll 0% 0% / auto padding-box border-box');
        await this.inProgress.isVisible();
        await expect(this.inProgress).toHaveCSS('background', 'rgb(255, 165, 0) none repeat scroll 0% 0% / auto padding-box border-box');
        await this.flagForReview.isVisible();
        await expect(this.flagForReview).toHaveCSS('background', 'rgb(255, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box');

        await this.question1.click();
        await this.page.waitForTimeout(2000);
        await this.mark1.click();
        await this.mark1.type('1');
        await this.page.waitForTimeout(2000);
        await this.feedBack.click();
        await this.page.waitForTimeout(2000);
        await this.feedBack.type('Not Satisfied');
        await this.page.waitForTimeout(2000);
        await this.notSatisfactory.click();
        await this.page.waitForTimeout(2000);
        await this.finishButton.click();
        console.log(await this.question1.textContent());

        await this.question1.click();
        await this.page.waitForTimeout(2000);
        await this.mark1.click();
        await this.mark1.type('1');
        await this.page.waitForTimeout(2000);
        await this.feedBack.click();
        await this.page.waitForTimeout(2000);
        await this.feedBack.type('Not Satisfied');
        await this.page.waitForTimeout(2000);
        await this.notSatisfactory.click();
        await this.page.waitForTimeout(2000);
        await this.finishButton.click();
        console.log(await this.question1.textContent());

        await this.question1.click();
        await this.page.waitForTimeout(2000);
        await this.mark1.click();
        await this.mark1.type('1');
        await this.page.waitForTimeout(2000);
        await this.feedBack.click();
        await this.page.waitForTimeout(2000);
        await this.feedBack.type('Not Satisfied');
        await this.page.waitForTimeout(2000);
        await this.notSatisfactory.click();
        await this.page.waitForTimeout(2000);
        await this.finishButton.click();
        await this.page.waitForTimeout(2000);

        await this.percentage.isVisible();
        console.log(await this.percentage.textContent());
        await this.markingStatus.isVisible();
        console.log(await this.markingStatus.textContent());
        await this.page.waitForTimeout(2000);
        await this.AllCandCheckBox.click();
        await this.dropDownToggle.click();
        await this.submitAsFinal.click();
        await this.YesButton.click();
        await this.MarksSubmit.isVisible();
        await expect(this.MarksSubmit).toHaveText("Final marks submitted sucessfully");
    }

    async feedBackIconClick() {
        this.feedBackIcon.click();
        this.enterFeedBack.click();
        this.enterFeedBack.type('Good');
        await this.page.waitForTimeout(2000);
        this.saveButton.click();
        await this.page.waitForTimeout(2000);
        this.feedbackSuccessMessage.isVisible();
        await expect(this.feedbackSuccessMessage).toHaveText("Cohort feedback updated");
        await this.page.waitForTimeout(2000);
    }

}