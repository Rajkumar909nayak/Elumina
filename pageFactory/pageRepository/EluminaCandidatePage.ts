import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { EluminaRegistrationPage } from './EluminaRegistrationPage';

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

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;

    }
    return result;
}



export class EluminaCandidatePage {
    static Time: any;
    static answer: any;
    readonly page: Page;
    readonly context: BrowserContext;
    readonly CandidateUsername: Locator;
    readonly CandidatePassword: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly ClickStartExamLink: Locator;
    readonly ClickOnStartExamBtn: Locator;
    readonly ClickOnNextBtn: Locator;
    readonly ClickOnRevieweBtn: Locator;
    readonly ClickOnSubmitBtn: Locator;
    readonly verifyExamName: Locator;
    readonly verifyCandidateName: Locator;
    readonly verifyCandidateID: Locator;
    readonly verifyClientID: Locator;
    readonly verifyExamTimer: Locator;
    readonly verifyRecord: Locator;

    readonly verifyCloud: Locator;
    readonly ansVSAQQuestion: Locator;
    readonly ansSingleVSAQQuestion: Locator;
    readonly ansISAWEQuestion: Locator;
    readonly ans2ISAWEQuestion: Locator;
    readonly ansTypeXQuestion: Locator;
    readonly ans2TypeXQuestion: Locator;

    readonly ansTypeBQuestion: Locator;
    readonly ansSAQQuestion: Locator;
    readonly ansSJTQuestion: Locator;

    readonly ClickOnCalculator: Locator;
    readonly ClickOnHighlighter: Locator;
    readonly HighlightQuestion: Locator;

    readonly EnternumberOne: Locator;
    readonly EnterPlus: Locator;
    readonly EnternumberTwo: Locator;
    readonly EnterEqualto: Locator;
    readonly CloseCalculator: Locator;
    readonly CloseNotepad: Locator;
    readonly ansMCQQuestions: Locator;
    readonly flagForReviewQuestions: Locator;
    readonly clickOnTermAndCondition: Locator;
    readonly popupOK: Locator;
    readonly clickonNextBtn: Locator;
    readonly clickOnPreviousBtn: Locator;
    readonly InvalidDetailsAlert: Locator;
    readonly inceaseSize: Locator;
    readonly decreaseSize: Locator;
    readonly decreaseSizePro: Locator;
    readonly signOutBtn: Locator;
    readonly ViewResult: Locator;
    readonly flagForReviewColor: Locator;
    readonly notAnweredQuestion: Locator;
    readonly ClickOnNotepad: Locator;
    readonly ClickOnNotepadOne: Locator;
    readonly textareafill: Locator;
    readonly saveButton: Locator;
    readonly noteQuestions: Locator;
    readonly verifyContentSectionTime: Locator;
    readonly inProgressColor: Locator;
    readonly ConfirmationToSubmit: Locator;
    readonly CandidateLogout: Locator;
    readonly clickOnAutoOkPopup: Locator;
    readonly cloudUpdatedIcon: Locator;
    readonly clickOnLastVSAQ: Locator;
    readonly clearButton: Locator;
    readonly clickOnVSAQQuestions: Locator;
    readonly checklogo: Locator;
    readonly txtLogin: Locator;
    readonly txtUserIdPlaceholder: Locator;
    readonly txtPassword: Locator;

    readonly clickChatApp: Locator;
    readonly chatAppTxtArea: Locator;
    readonly clickOnSendicon: Locator;

    readonly clickOnOptionsInChatApp: Locator;
    readonly enterNameInChatApp: Locator;
    readonly clickOnNextChatApp: Locator;
    readonly enterExamInChatApp: Locator;
    readonly clickOnSendInChatApp: Locator;
    readonly EnterExaPassword: Locator;
    readonly RatelimitLogin: Locator;
    readonly HighlightQuestions: Locator;
    readonly ZoominIconClick: Locator;
    readonly ZoomOutIconClick: Locator;
    readonly RotateRight: Locator;
    readonly RotateLeft: Locator;
    readonly FullScreenClick: Locator;
    readonly FullScreenExit: Locator;
    readonly CloseIconClick: Locator;
    readonly offlineMessage: Locator;
    readonly validatingExamSection: Locator;
    readonly verifyExamNameInStartExamPage: Locator;
    readonly verifyExamDescInStartExamPage: Locator;

    readonly clickOnOptionInChatApp: Locator;
    readonly examPwd: Locator;
    readonly clickOnOk: Locator;
    readonly DownloadRecoveryFile: Locator;
    readonly DownloadButtonClick: Locator;
    readonly DownloadSuccessMessage: Locator;
    readonly LogoutButtonClick: Locator;
    readonly StartExameTimer: Locator;
    readonly UserIDText: Locator;
    readonly PasswordIDText: Locator;

    readonly flagForReviewValidation: Locator;
    readonly AddedNotesValidation: Locator;
    readonly incompleteQuestionValidation: Locator;
    readonly submitSuccessMessage: Locator;
    readonly marks1: Locator;
    readonly marks2: Locator;
    readonly totalMarks: Locator;
    readonly answerCorrect: Locator;
    readonly answerIncorrect: Locator;
    readonly clickQuestion1: Locator;
    readonly clickQuestion5: Locator;

    readonly mousehoverOnColourMoreIcon: Locator;
    readonly NoOfQutn: Locator;
    readonly QuestionDescription: Locator;
    readonly SectionName: Locator;
    readonly imageView: Locator;
    readonly imageViewPreview: Locator;
    readonly Panicon: Locator;
    readonly Closeicon: Locator;
    readonly Reseticon: Locator;
    readonly IsaweQuestion: Locator;
    readonly IsaweSubQuestion: Locator;
    readonly TypexQuestion: Locator;
    readonly TypebQuestionStatment: Locator;
    readonly imageViewForTypeX: Locator;
    readonly fiveMinPopInSurveyPage: Locator;
    readonly VSAQQuestion1Click: Locator;
    readonly validationDashboardTitle: Locator;
    readonly DownloadingIconInCloud: Locator;
    readonly IncompleteDownloadIcon: Locator;
    readonly VSAQQuestion6Click: Locator;
    readonly imagePreview: Locator;



    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.CandidateUsername = page.locator('//input[@id="username"]');
        this.CandidatePassword = page.locator('//input[@id="password"]');
        this.LOGIN_BUTTON = page.locator('(//div[contains(text(),"Login")])[2]');
        this.ClickStartExamLink = page.locator('//table[@class="table-container"]//tr[2]//td[6]');
        this.ClickOnStartExamBtn = page.locator('//div[@class="btn parent-body-container btn-primary"]');
        this.ClickOnNextBtn = page.locator('(//div[text()=" Next "])[1]');
        this.ClickOnRevieweBtn = page.locator('(//div[text()=" Review "])[1]');
        this.ClickOnSubmitBtn = page.locator('(//div[text()=" Submit "])[1]');
        this.verifyExamName = page.locator('(//div[@class="txt"])[1]');
        this.verifyCandidateName = page.locator('(//div[@class="txt"])[2]//label[1]');
        this.verifyCandidateID = page.locator('(//div[@class="txt"])[2]//label[3]');
        this.verifyClientID = page.locator('(//div[@class="txt"])[2]//label[4]');
        this.verifyExamTimer = page.locator('//div[@class="clock-text"]');
        this.verifyRecord = page.locator('id="cameraRecIcon"');
        this.verifyCloud = page.locator('//div[@title="All data updated."]');
        this.ansMCQQuestions = page.locator('(//label[@class="labelEmpty"])[1]');
        this.ansVSAQQuestion = page.frameLocator('//iframe[@class="tox-edit-area__iframe"]').locator('html');
        this.ansSingleVSAQQuestion = page.locator('(//div[@class="question-number-container"]//div//p)[2]');
        this.ansISAWEQuestion = page.frameLocator('(//iframe[@class="tox-edit-area__iframe"])[1]').locator('//html[@data-mce-style="height: auto;"]');
        this.ans2ISAWEQuestion = page.frameLocator('(//iframe[@class="tox-edit-area__iframe"])[2]').locator('//html[@data-mce-style="height: auto;"]');
        this.ansTypeXQuestion = page.locator('(//div[@class="inputGroup question-preview--mc"]//label[@class="labelEmpty"])[1]');
        this.ans2TypeXQuestion = page.locator('(//div[@class="inputGroup question-preview--mc"]//label[@class="labelEmpty"])[4]');
        this.ansTypeBQuestion = page.locator('(//label[@class="labelEmpty"])[2]');
        this.ansSAQQuestion = page.frameLocator('//iframe[@class="tox-edit-area__iframe"]').locator('html');
        this.ansSJTQuestion = page.locator('(//label[@class="labelEmpty"])[1]');
        this.flagForReviewQuestions = page.locator('//div[text()="Flag for Review"]');
        this.clickOnTermAndCondition = page.locator('//input[@id="terms"]');
        this.popupOK = page.locator('//div[text()="OK"]');
        this.clickonNextBtn = page.locator('(//div[text()=" Next "])[1]');
        this.clickOnPreviousBtn = page.locator('//div[@class="btn parent-body-container btn-primary"][normalize-space()="Previous"]');
        this.InvalidDetailsAlert = page.locator('//*[@class="container error-bg"]//div[text()="Invalid User Id and Password."]');
        this.inceaseSize = page.locator('//em[@title="Increase Font Size"]');
        this.decreaseSize = page.locator('//em[@title="Decrease Font Size"]');
        this.decreaseSizePro = page.locator('//em[@class="zoomOut"]');
        this.signOutBtn = page.locator('//div[@class="signout"]');
        this.ViewResult = page.locator('//div[@class="logout practiceBtn parent-body-container"]//label');
        this.flagForReviewColor = page.locator('(//p[@class="parent-body-container menuColor3"])[3]');
        this.notAnweredQuestion = page.locator('//p[@class="parent-body-container menuColor1"]');

        this.ClickOnNotepad = page.locator('(//div[@class="toolIcon"])[2]//em');
        this.ClickOnCalculator = page.locator('(//div[@class="toolIcon"])[1]');
        this.ClickOnHighlighter = page.locator('(//div[@class="toolIcon"])[3]');

        this.ClickOnNotepadOne = page.locator('(//div[@class="toolIcon"])[2]//em');
        this.HighlightQuestion = page.locator('//div[@class="question-content clearfix"]');
        this.HighlightQuestions = page.locator('//p[@class="earseM-0 inner-question-section marker highlighter-context"]')
        this.textareafill = page.locator('//div[@class="notepad-content"]//textarea');
        this.EnternumberOne = page.locator('//button[@value="7"]');
        this.EnterPlus = page.locator('//button[@value="+"]');
        this.EnternumberTwo = page.locator('//button[@value="7"]');
        this.EnterEqualto = page.locator('//button[@value="="]');
        this.CloseCalculator = page.locator('//label[@class="closeIcon"]');
        this.CloseNotepad = page.locator('//label[@class="closeIcon"]');
        this.saveButton = page.locator('//div[@class="action-btn-container"]//div[text()="Save"]');
        this.noteQuestions = page.locator('//p[@class="parent-body-container menuColor1 menuColor5"]');
        this.verifyContentSectionTime = page.locator('//div[@class="clock-text timer-icon-red"]');
        this.ConfirmationToSubmit = page.locator('//div[text()="OK"]');
        this.CandidateLogout = page.locator('//label[text()="Logout"]');
        this.clickOnAutoOkPopup = page.locator('//div[@title="OK"]');
        this.inProgressColor = page.locator('//p[@class="parent-body-container menuActive menuColor1"]');
        this.cloudUpdatedIcon = page.locator('//div[@class="cloud"]//div');
        this.clickOnLastVSAQ = page.locator('//div[@class="question-number-container"]//div//p').last();
        this.clearButton = page.locator('//div[@class="action-btn-container"]//div[text()="Clear"]');
        this.clickOnVSAQQuestions = page.locator('(//div[@class="question-number"])[6]');
        this.checklogo = page.locator('//div[@class="logo-container"]//div[@class="logo"]');
        this.txtLogin = page.locator('(//div[contains(text(),"Login")])[1]');
        this.txtUserIdPlaceholder = page.locator('//label[text()="Username"]')
        this.txtPassword = page.locator('//label[text()="Password"]');

        this.clickChatApp = page.frameLocator('(//iframe[@title="Button to launch messaging window"])[1]').locator('html');
        this.chatAppTxtArea = page.frameLocator('iframe[name="Messaging window"]').getByPlaceholder('Type a message');
        this.clickOnSendicon = page.frameLocator('iframe[name="Messaging window"]').getByRole('button', { name: 'Send message' });

        this.clickOnOptionsInChatApp = page.frameLocator('iframe[name="Messaging window"]').locator('//button[normalize-space()="Hardware checks not working"]');
        this.clickOnOptionInChatApp = page.frameLocator('iframe[name="Messaging window"]').locator('(//button[@class="sc-as5ded-1 kreHQj sc-htpNat kbREso"])[2]');
        this.enterNameInChatApp = page.frameLocator('iframe[name="Messaging window"]').getByLabel('Name');
        this.clickOnNextChatApp = page.frameLocator('iframe[name="Messaging window"]').getByRole('button', { name: 'Next' })
        this.enterExamInChatApp = page.frameLocator('iframe[name="Messaging window"]').getByLabel('Exam Name');
        this.clickOnSendInChatApp = page.frameLocator('iframe[name="Messaging window"]').getByRole('button', { name: 'Send' })
        this.EnterExaPassword = page.locator('//input[@placeholder="Enter Invigilator Password"]');
        this.RatelimitLogin = page.locator('//div[text()="Attempts exceeded the Limit"]');
        this.ZoominIconClick = page.locator('//div[@class="zoom-in icon"]');
        this.ZoomOutIconClick = page.locator('//div[@class="zoom-out icon"]');
        this.RotateRight = page.locator('//div[@class="rotate-right icon"]');
        this.RotateLeft = page.locator('//div[@class="rotate-left icon"]');
        this.FullScreenClick = page.locator('//div[@class="fullview icon"]');
        this.FullScreenExit = page.locator('//div[@class="full-close icon"]');
        this.CloseIconClick = page.locator('//label[@class="closeIcon"]');
        this.offlineMessage = page.locator('//div[@class="message-txt"]');
        this.validatingExamSection = page.locator('//h4[@class="question-info question--id"]')
        this.verifyExamNameInStartExamPage = page.locator('//div[normalize-space()="Exam Main Session"]')
        this.verifyExamDescInStartExamPage = page.locator('//div[normalize-space()="Exam Main Session Description"]')

        this.examPwd = page.locator('//input[@placeholder="Enter Password"]');
        this.clickOnOk = page.locator('//div[text()="OK"]');
        this.DownloadRecoveryFile = page.locator('//label[text()="Download Recovery File"]');
        this.DownloadButtonClick = page.locator('//button[normalize-space()="Download"]');
        this.DownloadSuccessMessage = page.locator('//div[normalize-space()="Download Completed"]');
        this.LogoutButtonClick = page.locator('//div[normalize-space()="Log Out"]');
        this.StartExameTimer = page.locator('(//div[@class="exam-list"]//table//tr[@class="body-row"]//td//div//div)[2]');
        this.UserIDText = page.locator('//*[@class="container error-bg"]//div[text()="User Id is required."]');
        this.PasswordIDText = page.locator('//*[@class="container error-bg"]//div[text()="Password is required."]');

        this.flagForReviewValidation = page.locator('//div[text()="Flagged for review"]');
        this.AddedNotesValidation = page.locator('//div[text()="Added Notes"]');
        this.incompleteQuestionValidation = page.locator('(//div[text()=" incomplete"])[1]');
        this.submitSuccessMessage = page.locator('//div[text()="Exam Responses have been successfully synced to the server."]');
        this.marks1 = page.locator('(//div[normalize-space()="1"])[1]');
        this.marks2 = page.locator('(//div[normalize-space()="N/A"])[1]');
        this.totalMarks = page.locator('(//div[@class="total-marks"])[2]');

        this.answerCorrect = page.locator('//div[text()="Your answer is correct"]');
        this.answerIncorrect = page.locator('//div[text()="Your answer is incorrect"]');
        this.clickQuestion1 = page.locator('//div[normalize-space()="Question 1"]');
        this.clickQuestion5 = page.locator('(//div[@class="question-number-container"]//div//p)[5]');
        this.VSAQQuestion1Click = page.locator('//div[@class="question-number"]//p');
        this.VSAQQuestion6Click = page.locator('(//div[@class="question-number"]//p)[6]')

        this.mousehoverOnColourMoreIcon = page.locator('//p[@class="infoIcon status-icon-id"]//span')
        this.NoOfQutn = page.locator('(//div[@class="main-title"]//h4)[1]')
        this.QuestionDescription = page.locator('//p[@class="inner-question-section"]');
        this.SectionName = page.locator('//div[@class="part-name"]//div');
        this.imageView = page.locator('//div[@class="imagepreview-container"]//img');
        this.imageViewPreview = page.locator('//div[@class="title"]');
        this.Panicon = page.locator('//div[@class="pan icon"]');
        this.Closeicon = page.locator('//div[@class="close-btn"]');
        this.Reseticon = page.locator('//div[@class="reset icon"]');
        this.IsaweQuestion = page.locator('//div[@class="ques-title-container qp-title"]//div[@class="isawe-question-sub-section"]//p//p');
        this.IsaweSubQuestion = page.locator('//div[@class="sub-ques-title"]//p');
        this.TypexQuestion = page.locator('//div[@class="main-title highlighterdiv"]//p//p');
        this.TypebQuestionStatment = page.locator('(//p[@class="inner-question-section"])[1]');
        this.imageViewForTypeX = page.locator('(//div[@class="imagepreview-container"]//img)[1]');
        const ID: string = String(EluminaRegistrationPage.CandiateClientID);
        this.fiveMinPopInSurveyPage = page.locator('//div[@class="msg-text"]')
        this.validationDashboardTitle = page.locator('//div[@class="menu-item"]')
        this.DownloadingIconInCloud = page.locator('//div[@class="status downloading"]')
        this.IncompleteDownloadIcon = page.locator('//div[@class="status offline"]')
        this.imagePreview = page.locator('//div[@class="imagepreview-container"]');


    }

    /**Method to Navigate to candidate dashboard */
    async candidateNavigateToURL(): Promise<void> {
        await this.page.goto(testData.cadidateURL);
    }

    /**Method to Enter Candidate Credentials and to verify if start exam link is visible */
    async candidateLoginToApplication(row, file): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/' + file;
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('users');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(row).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(row).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        if (this.ClickStartExamLink.isVisible()) {
            await this.ClickStartExamLink.click();
        }
        await this.ClickOnStartExamBtn.click();
        await this.page.waitForTimeout(5000);

    }

    async getCandidateClockText(): Promise<void> {
        try {
            const candidateClockText = await this.page.locator('//div[@class="clock-text"]').textContent();
            console.log("Candidate Clock Timeing : " + candidateClockText);
        } catch (error) {
        }
    }

    async canddiateRecovery(): Promise<void> {
        try {
            await this.ClickOnStartExamBtn.click();
        } catch (error) {
        }
        await this.page.waitForTimeout(10000);
        // await this.context.setOffline(true);
        const questioncount = await this.page.$$('//div[@class="question-number"]');
        for (let index = 0; index < 5; index++) {
            try {
                await this.ansMCQQuestions.click();
                await this.clickonNextBtn.click()
                // await this.context.setOffline(true);
                await this.ansMCQQuestions.click();
                await this.clickonNextBtn.click()
                await this.ansMCQQuestions.click();
                await this.clickonNextBtn.click()
                await this.ansMCQQuestions.click();
                await this.clickonNextBtn.click()
                // await this.context.setOffline(false);
                await this.ansVSAQQuestion.click();
                await this.ansVSAQQuestion.type(makeid(100));
                await this.page.waitForTimeout(2000);
            } catch (error) {
            }
            await this.ClickOnRevieweBtn.click();
            await this.ClickOnSubmitBtn.click();
            await this.page.waitForTimeout(30000);
            await this.page.locator('//label[@class="parent-body-container"]').click();
            await this.page.waitForTimeout(10000);
            await this.page.keyboard.press('Alt+Shift+q');
            await this.page.locator('//input[@type="password"]').type("123456");
            await this.clickOnOk.click();
            await this.page.locator('//label[contains(text(),"Download Recovery File")]').click();
            const recoverymessage = await this.page.locator('//div[@class="recover-noresponse-description"]').textContent();
            if (recoverymessage.startsWith("No recovery file")) {
                await this.page.screenshot();
                console.log("No Recovey file message ");
            }
        }

    }

    /**Method to set offline */
    async setOffline(offlineValue) {
        await this.context.setOffline(offlineValue);
        await this.page.waitForTimeout(5000);
    }

    /**Method to Enter Invaild Candidate Credentials */
    async candidateInvalidLoginCredential(): Promise<void> {
        // const ExcelJS = require('exceljs');
        // const wb = new ExcelJS.Workbook();
        // const fileName = './download/User_details.xlsx';
        // wb.xlsx.readFile(fileName).then(async () => {
        //     let data: any;
        //     const ws = wb.getWorksheet('Worksheet');
        //     console.log(ws.actualRowCount)
        //     console.log(ws.getRow(2).getCell(1).value)
        //     console.log(ws.getRow(2).getCell(4).value)
        await this.CandidateUsername.fill(testData.InvalidCandidateUsername);
        await this.CandidatePassword.fill(testData.InvalidCandidatePassword);
        // })

        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        await this.InvalidDetailsAlert.isVisible();
        console.log(await this.InvalidDetailsAlert.textContent());

    }


    /**Method to Enter Invaild Username Candidate Credentials */
    async candidateInvalidLoginUsername(): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Worksheet');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(testData.InvalidCandidateUsername);
            await this.CandidatePassword.fill(ws.getRow(2).getCell(4).value);
        })

        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        await this.InvalidDetailsAlert.isVisible();
        console.log(await this.InvalidDetailsAlert.textContent());

    }


    async validationOfPopessageInCandLoginPage() {
        await expect(this.offlineMessage).toHaveText("User Id and Password are required")
    }

    /**Method to Enter Invaild Password Candidate Credentials */
    async candidateInvalidLoginPassword(): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Worksheet');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(2).getCell(1).value);
            await this.CandidatePassword.fill(testData.InvalidCandidatePassword);
        })

        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        await this.InvalidDetailsAlert.isVisible();
        console.log(await this.InvalidDetailsAlert.textContent());

    }


    /**
     * Method to Enter Candidate Credentials and to verify the offline message
     */
    async candidateLoginToApplicationoffline(row, file): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/' + file;
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('users');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(row).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(row).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
        await this.context.setOffline(true);
        await this.LOGIN_BUTTON.click();
        await this.offlineMessage.isVisible();
    }

    /**Method to validation of client logo */
    async validationOfLogo() {
        await expect(this.checklogo).toBeVisible();
        console.log(await this.checklogo.textContent());
        console.log("Login page title:", await this.txtLogin.textContent());
        console.log("User Id Placeholder:", await this.txtUserIdPlaceholder.textContent())
        console.log("Password Placeholder:", await this.txtPassword.textContent())
        console.log("Login button:", await this.LOGIN_BUTTON.textContent())
    }
    /**Method to validation of client logo */
    async validationOfLogoInCand() {
        await expect(this.checklogo).toBeVisible();
        console.log(await this.checklogo.textContent());
        console.log("Login page title:", await this.txtLogin.textContent());
    }

    /**Method to Enter Candidate Credentials */
    async candidateLoginToAndValidateDashboard(row, file): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/' + file;
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('users');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(row).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(row).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.validationOfDashboardTitleInCandPage()
    }
    /**Method to validate Dashboard title */
    async validationOfDashboardTitleInCandPage() {
        await expect(this.validationDashboardTitle).toHaveText("Dashboard ")
    }

    /**
     * Method to Enter Candidate Credentials
     */
    async enterCandidateCredetial(row, file) {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/' + file;
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('users');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(row).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(row).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        await this.page.waitForTimeout(20000);
    }


    /**Method to Enter Candidate Credentials only*/
    async enterCandidateCredetialonly(row, file) {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/' + file;
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('users');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(row).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(row).getCell(4).value);
        })
        await this.page.waitForTimeout(3000);
    }

    /**Method to Click on Start Exam */
    async clickOnStartExam() {
        await this.ClickStartExamLink.click();
    }

    /**Method to Increase Font Size */
    async increaseFontSize() {
        await this.inceaseSize.click();
        await this.inceaseSize.click();
        await this.inceaseSize.click();
        await this.page.waitForTimeout(5000);
    }
    /**method to handle pop up */
    async popup() {
        await this.popupOK.click();
        await this.page.waitForTimeout(3000);
    }
    /**Method to Decrease font size */
    async decreaseFontSize() {
        await this.decreaseSize.click();
        await this.decreaseSize.click();
        await this.decreaseSize.click();
        await this.page.waitForTimeout(1000);
    }
    /**Methods to decrease font size in proctor */
    async decreaseFontSizePro() {
        await this.page.waitForTimeout(5000);
        await this.decreaseSizePro.click();
        await this.decreaseSizePro.click();
        await this.decreaseSizePro.click();
        await this.page.waitForTimeout(1000);
    }

    /**Method to click on content section checkbox */
    async clickOnContentSectionCheckBox() {
        await this.clickOnTermAndCondition.click();
    }

    // Methode for go to Recovery File download page
    async candidateSyncPageValidation(): Promise<void> {
        await this.page.waitForTimeout(10000);
        await this.page.keyboard.press('Alt+Shift+q');
        await this.page.locator('(//input[@type="password"])[2]').click()
        await this.page.locator('(//input[@type="password"])[2]').type("123456");
        await this.clickOnOk.click();
        await this.page.locator('//label[contains(text(),"Sync Remaining Responses")]').click();
        const recoverymessage = await this.page.locator('//div[@class="recover-noresponse-description"]').textContent();
        if (recoverymessage.startsWith("No recovery file")) {
            await this.page.screenshot();
            console.log("No Recovey file message ");
        }
    }

    /**Method to verify the candidate section if all the headers and values are displayed */
    async candidateContentSectionValidation() {
        await expect(this.verifyExamName).toBeVisible();
        console.log('Exam Name-' + await this.verifyExamName.textContent());
        await expect(this.verifyCandidateName).toBeVisible();
        console.log('Candidate Name-' + await this.verifyCandidateName.textContent());
        await expect(this.verifyCandidateID).toBeVisible();
        console.log('Candidate ID-' + await this.verifyCandidateID.textContent());
        await expect(this.verifyClientID).toBeVisible();
        console.log('Client ID-' + await this.verifyClientID.textContent());
        global.ClientID = this.verifyClientID.textContent();
    }

    /**Method to do horizontal scroll action */
    async HorizontalScrollAction() {
        let hor = await this.page.locator('//div[@class="contentWrapper"]');
        await hor.click();
        for (let i = 1; i <= 100; i++) {
            await this.page.keyboard.press("ArrowRight")[i];
        }
        await this.page.waitForTimeout(3000);

    }

    /**Method to Verify the the Candidate content section */

    async candidateContentSection() {
        await this.clickOnTermAndCondition.click();
        await this.page.waitForTimeout(60000);
        await this.popupOK.click();
        await this.clickonNextBtn.click();
    }

    /**Method to verify the exam section if all the headers and values are displayed */
    async examSectionValidation() {
        console.log('Exam Name-' + await this.verifyExamName.textContent());
        await expect(this.verifyCandidateName).toBeVisible();
        console.log('Candidate Name-' + await this.verifyCandidateName.textContent());
        await expect(this.verifyCandidateID).toBeVisible();
        console.log('Candidate ID-' + await this.verifyCandidateID.textContent());
        await expect(this.verifyClientID).toBeVisible();
        console.log('Client ID-' + await this.verifyClientID.textContent());
    }

    /**Validation of popup in survey page */
    async validationOfPopupInSurveyPage() {
        await expect(this.fiveMinPopInSurveyPage).toBeVisible()
    }

    /**Method to send message in chat app */
    async chatAppMessageSent() {
        await this.page.waitForTimeout(8000);
        await this.clickChatApp.click();
        await this.chatAppTxtArea.click();
        await this.chatAppTxtArea.fill("Hi Chatbot");
        await this.clickOnSendicon.click();
        await this.page.waitForTimeout(5000);
    }

    async waitforTime() {
        await this.page.waitForTimeout(60000);
    }

    async waitforTime1() {
        await this.page.waitForTimeout(17000);
    }

    async waitforTime2() {
        await this.page.waitForTimeout(12000);
    }
    async waitforTime4() {
        await this.page.waitForTimeout(5000);
    }

    async waitforTime3() {
        await this.page.waitForTimeout(19000);
    }

    async updatedCloudIcon() {
        await this.page.waitForTimeout(5000);
        await expect(this.cloudUpdatedIcon).toBeVisible();
        console.log("Status Updated")
    }

    async downloadingCloudIcon() {
        await expect(this.DownloadingIconInCloud).toBeVisible()
    }

    async incompleteQuestionDownloadingIcon() {
        await expect(this.IncompleteDownloadIcon).toBeVisible()
    }

    /**Method to Verify the the Dashboard timer */
    async verifyExamDashboardTimer() {
        await this.page.waitForTimeout(5000);
        await expect(this.verifyExamTimer).toBeVisible();
        await this.page.waitForTimeout(5000);
        console.log('Exam Timer-' + await this.verifyExamTimer.textContent());
    }

    /**Method to verify colour */
    async verifyColours() {
        await this.mousehoverOnColourMoreIcon.hover();
        console.log(await this.mousehoverOnColourMoreIcon.textContent())
        await this.NoOfQutn.hover()

    }

    /*Method to verify No. Of Qutns*/
    async verifyNoOfQutn() {
        await expect(this.NoOfQutn).toBeVisible()
        console.log(await this.NoOfQutn.textContent())
    }
    /**Method to veroify Flag For Revew Option  */
    async verifyFlagForReview() {
        await expect(this.flagForReviewQuestions).toBeVisible()
    }
    /**Method to validate all tools */
    async validationOfAllTools() {
        await expect(this.ClickOnCalculator).toBeVisible();
        await expect(this.ClickOnNotepad).toBeVisible();
        await expect(this.ClickOnHighlighter).toBeVisible();
    }

    /**Method to validate Next Button */
    async validationOfNextBtn() {
        await expect(this.ClickOnNextBtn).toBeEnabled()
    }

    /**Method to validate Previous Button */
    async validatePreviousBtn() {
        await expect(this.clickOnPreviousBtn).toBeEnabled()
    }

    /**Method to Verify the Exam Vailability */
    async verifyExamDashboard() {
        await this.page.waitForTimeout(5000);
        if (expect(this.verifyExamTimer).toBeHidden()) {
            console.log('Exam is not displayed to the candidate');
        } else {
            await expect(this.verifyExamTimer).toBeHidden();
            console.log('Exam is displayed for the user');
        }
    }

    /**Method to Verify the content section timer */
    async verifyContentSectionTimer() {
        // await this.page.waitForTimeout(5000);
        const contentpageTimer = await this.verifyContentSectionTime.textContent()
        console.log('Exam Timer-' + await this.verifyContentSectionTime.textContent());
    }

    /**Method to Navigate to back */
    async navigateBack() {
        await this.page.goBack();
        console.log("Clicked on Back Navigation icon");
    }

    /**Method to click on refresh page */
    async refreshPage() {
        await this.page.reload();
        console.log("Page Refreshed");
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on function keys */
    async functionKey(Offlinevalue, keyword) {
        await this.context.setOffline(Offlinevalue);
        await this.page.keyboard.press(keyword);
        console.log("Key Pressed");
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on function keys */
    async functionKeyWithControl_Shift_R() {
        await this.page.keyboard.press('Control+Shift+R');
        console.log("Key Pressed");
        await this.page.waitForTimeout(5000);
    }

    /**Method to Enter Candidate Credentials and to verify if start exam link is visible */
    async candidateLoginToApplicationwithoutclickingLogin(row, file): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/' + file;
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('users');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(row).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(row).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on function keys */
    async HotKeyPress() {
        await this.page.keyboard.press('Alt+Shift+Q');
        console.log("Key Pressed");
        await this.page.waitForTimeout(5000);
    }

    async ansVsaqQuestionCandidate(): Promise<void> {
        await this.ansVSAQQuestion.click();
        await this.ansVSAQQuestion.type(makeid(100));
        const QuestiontextCandidate = await this.ansVSAQQuestion.textContent();
        console.log("Candidate Answer Question " + QuestiontextCandidate);
    }

    /**Method to type Exam recovery Pwd */
    async examRecoveryPassword() {
        await this.examPwd.click();
        await this.examPwd.type('123456');
        await this.clickOnOk.click();
        await this.DownloadRecoveryFile.click();
        await this.DownloadButtonClick.click();
        await this.page.waitForTimeout(5000);
        await expect(this.DownloadSuccessMessage).toHaveText("Download Completed");
        await this.LogoutButtonClick.click();
    }

    async examSectionCloudValidation() {
        await this.page.waitForTimeout(30000);
        await expect(this.verifyCloud).toBeVisible();
        console.log('cloud symbol is Updated');
    }

    /**Method to Navigate to all questions without answering*/
    async candidateStartExam(): Promise<void> {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 2; i++) {
            await qutns[i].click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
    }

    async clickOnAutoSubmitOKPopup() {
        await this.clickOnAutoOkPopup.click();
        await this.page.waitForTimeout(5000);
    }

    async submitButtonClick() {
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
        await this.page.waitForTimeout(5000);
    }

    /**Method to Answer the MCQ questions and click on review button */
    async candidateStartMCQ() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i < 2; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[3]').click();
        await this.flagForReviewQuestions.click();
        await this.ClickOnNextBtn.click();
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();

    }

    /**Method to Answer the Ranking questions and click on review button */
    async candidateStartRankingQuestion() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i < 2; i++) {
            await qutns[i].click();
            //await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[3]').click();
        await this.flagForReviewQuestions.click();
        await this.ClickOnNextBtn.click();
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();

    }

    /**Method to Answer the MCQ questions and click on review & submit button */
    async candidateStartMCQAndSubmit() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[3]').click();
        await this.flagForReviewQuestions.click();
        await this.ClickOnNextBtn.click();
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
        await this.page.waitForTimeout(3000);
    }

    /**Method to Answer the MCQ Quetions */
    async candidateStartMCQwithoutReviewe() {

        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 2; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        // await this.page.locator('(//div[@class="question-number-container"]//div//p)[4]').click();
        // await this.flagForReviewQuestions.click();
        // await this.ClickOnNextBtn.click();
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        //await this.ClickOnRevieweBtn.click();
        await this.ansVSAQQuestion.click();
        await this.ansVSAQQuestion.type(makeid(100));
        await this.page.waitForTimeout(2000);
        // await this.ClickOnRevieweBtn.click();
        // await this.ClickOnSubmitBtn.click();
    }


    /**Method to Answer the MCQ Quetions */
    async candidateStartMCQandSAQ_RevieweandSubmit() {

        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 2; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        // await this.page.locator('(//div[@class="question-number-container"]//div//p)[4]').click();
        // await this.flagForReviewQuestions.click();
        // await this.ClickOnNextBtn.click();
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        //await this.ClickOnRevieweBtn.click();
        await this.ansVSAQQuestion.click();
        await this.ansVSAQQuestion.type(makeid(100));
        await this.page.waitForTimeout(2000);
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
    }

    async candidateStartTwoMCQ() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();

        }
        await this.page.close();
    }
    async clickOnPrevious() {
        await this.clickOnPreviousBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async candidateStartOneMCQ() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 0; i < 5; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();
        }
    }

    async candidateStartMCQwithflagforreviewandnotes() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 0; i < 2; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[3]').click();
        await this.flagForReviewQuestions.click();
        await this.ClickOnNextBtn.click();
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[4]').click();
        await this.ClickOnNotepad.click();
        await this.page.waitForTimeout(1000);
        await this.textareafill.type('abc');
        await this.page.waitForTimeout(1000);
        await this.saveButton.click();
        await this.page.waitForTimeout(1000);
        await this.CloseNotepad.click();
        await this.ClickOnNextBtn.click();
        //await this.ClickOnNextBtn.click();

    }

    async candAnsFirstQustAsMCQ() {
        await this.page.locator('//div[@class="question-number-container"]//div//p').first().click()
        await this.ansMCQQuestions.click();
        await this.ClickOnNextBtn.click();
    }

    async candidateSurveyStartOneMCQ() {
        await this.page.waitForTimeout(2000);
        await this.ansMCQQuestions.click();
        await this.page.waitForTimeout(20000);
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
    }

    async candSubmitExam() {
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
    }

    async candidateAnsSurveyQuestion() {
        await this.page.waitForTimeout(2000);
        await this.ansMCQQuestions.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSubmitBtn.click();


    }

    async validatecandidateFlagForReviewSurveyQuestion() {
        await this.page.waitForTimeout(2000);
        await this.flagForReviewQuestions.click();
        await this.page.waitForTimeout(2000);
        await this.flagForReviewColor.isVisible();
        await this.ClickOnSubmitBtn.click();


    }

    async candidateStartVSAQ() {
        await this.page.waitForTimeout(2000);
        await this.clickOnLastVSAQ.click();
        await this.ansVSAQQuestion.click();
        await this.ansVSAQQuestion.type(makeid(100));
        await this.page.waitForTimeout(2000);
        await this.ClickOnRevieweBtn.click();
        // await this.ClickOnSubmitBtn.click();
    }

    async candidateAttendsAllQVSAQ(lines) {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 5; i < 8; i++) {
            await qutns[i].click();
            await this.ansVSAQQuestion.click();
            await this.ansVSAQQuestion.type(makeid(lines));
            await this.ClickOnNextBtn.click();
        }
        await this.page.waitForTimeout(2000);
    }

    async candidateAttendsOneVSAQ(lines) {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 5; i < 6; i++) {
            await qutns[i].click();
            await this.ansVSAQQuestion.click();
            EluminaCandidatePage.answer = await this.ansVSAQQuestion.type(makeid(lines));
        }
        await this.page.waitForTimeout(2000);
    }

    async candAns7thQutnAsVSAQ(lines) {
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[7]').click();
        await this.ansVSAQQuestion.type(makeid(lines));
        await this.ClickOnNextBtn.click();
    }

    async candidateStartISAWE() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 8; i < 10; i++) {
            await qutns[i].click();
            await this.ansISAWEQuestion.click();
            await this.ansISAWEQuestion.type(makeid(100));
            await this.ClickOnNextBtn.click();

        }
        await this.page.waitForTimeout(2000);
    }


    async candidateStartTypeX() {

        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 10; i < 15; i++) {
            await qutns[i].click();
            await this.ansTypeXQuestion.click();
            await this.ans2TypeXQuestion.click();
            await this.ClickOnNextBtn.click();

        }
        await this.page.waitForTimeout(2000);

    }

    async candAns13thQutnAsTypeX() {
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[13]').click();
        await this.ansTypeXQuestion.click();
        await this.ans2TypeXQuestion.click();
        await this.ClickOnNextBtn.click();
    }

    async candidateStartTypeB() {

        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 15; i < 20; i++) {
            await qutns[i].click();
            await this.ansTypeBQuestion.click();
            await this.ClickOnNextBtn.click();

        }
        await this.page.waitForTimeout(2000);

    }

    async candAns17thQutnAsTypeB() {
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[17]').click();
        await this.ansTypeBQuestion.click();
        await this.ClickOnNextBtn.click();
    }

    /**
     * Method to Enter the Answer in SAQ questions 
     * @param lines 
     */
    async candidateStartSAQ(lines) {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 20; i < 25; i++) {
            await qutns[i].click();
            //await this.page.waitForTimeout(2000);
            await this.ansSAQQuestion.click();
            await this.ansSAQQuestion.type(makeid(lines));
            await this.ClickOnNextBtn.click();

        }
        await this.page.waitForTimeout(2000);

    }

    async candidateStartSJTValidationofReviewPage() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 25; i < 28; i++) {
            await qutns[i].click();
            await this.ansSJTQuestion.click();
            await this.ClickOnNextBtn.click();

        }
        await this.page.waitForTimeout(2000);
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[28]').click()
        await this.ansSJTQuestion.click();
        await this.ClickOnNextBtn.click();
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();
        await this.page.waitForTimeout(5000);
        await expect(this.flagForReviewValidation).toHaveText("Flagged for review");
        await expect(this.AddedNotesValidation).toHaveText("Added Notes");
        await expect(this.incompleteQuestionValidation).toHaveText("incomplete");
    }

    async candidateStartSJT() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 25; i < 28; i++) {
            await qutns[i].click();
            await this.ansSJTQuestion.click();
            await this.ClickOnNextBtn.click();

        }
        await this.page.waitForTimeout(2000);
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[28]').click()
        await this.ansSJTQuestion.click();
        await this.ClickOnNextBtn.click();
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await expect(this.ClickOnRevieweBtn).toBeEnabled()
        await this.ClickOnRevieweBtn.click();
        await expect(this.clickOnPreviousBtn).toBeEnabled()
        await this.page.waitForTimeout(5000);
    }

    async validationOfReviewBtn() {
        await expect(this.ClickOnRevieweBtn).toBeEnabled()
    }

    async candAnsLastQutnAsSJT() {
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[29]').click();
        await this.ansSJTQuestion.click();
        await this.ClickOnNextBtn.click();
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
    }

    async candidateStartSJTAns() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 25; i < 28; i++) {
            await qutns[i].click();
            await this.ansSJTQuestion.click();
            await this.ClickOnNextBtn.click();

        }
        await this.page.waitForTimeout(2000);
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[28]').click()
        await this.ansSJTQuestion.click();
        await this.ClickOnNextBtn.click();
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[29]').click();
        await this.ansSJTQuestion.click();
        await this.ClickOnNextBtn.click();
    }

    async candidateStartSJTReviewandSubmit() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 25; i < 28; i++) {
            await qutns[i].click();
            await this.ansSJTQuestion.click();
            await this.ClickOnNextBtn.click();

        }
        await this.page.waitForTimeout(2000);
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[28]').click()
        await this.ansSJTQuestion.click();
        await this.ClickOnNextBtn.click();
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[29]').click();
        await this.ansSJTQuestion.click();
        await this.ClickOnNextBtn.click();
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
    }


    async candidateFlagForReviewAllQuestions() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            // await this.ansMCQQuestions.click();
            await this.flagForReviewQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[3]').click();
        await this.flagForReviewQuestions.click();
        await this.ClickOnNextBtn.click();
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.flagForReviewQuestions.click();
        await this.ClickOnRevieweBtn.click();
        //await this.ClickOnSubmitBtn.click();

    }


    /**Method to Confirmation Submit popup */
    async confirmationOkBtn() {
        await this.ConfirmationToSubmit.click();
    }
    /**Method to Candidate  Logout */
    async clickOnLogoutBtn() {
        await this.page.waitForTimeout(2000);
        await this.CandidateLogout.isVisible();
    }

    /**Method to navigate from review page to candidate exam page */
    async clickonPrevious() {
        await this.clickOnPreviousBtn.isEnabled()
        await this.clickOnPreviousBtn.click();
        await this.page.waitForTimeout(1000);
    }


    async againCandidateLogin(): Promise<void> {
        await this.page.bringToFront();
        await this.page.waitForTimeout(1000);
        //await this.page.close();
    }

    /**
     * Method to add note to VSAQ Question
     */
    async AddingNotesToQuestion() {
        {
            await this.ansVSAQQuestion.click();
            await this.ClickOnNotepad.click();
            await this.page.waitForTimeout(1000);
            await this.textareafill.type('abc');
            await this.page.waitForTimeout(1000);
            await this.saveButton.click();
            await this.page.waitForTimeout(1000);
            await this.CloseNotepad.click();
        }

    }
    /**
     * Method to add Notes to all questions
     */
    async AddingNotesToAllQuestion() {
        {
            await this.page.waitForTimeout(1000);
            await this.ClickOnNotepad.click();
            await this.page.waitForTimeout(1000);
            await this.textareafill.type('abc');
            await this.page.waitForTimeout(1000);
            await this.saveButton.click();
            await this.page.waitForTimeout(1000);
            await this.CloseNotepad.click();
        }

    }
    /**
     * Method for using the Calculator for all Question types
     */
    async UsingCalculatorForQuestions() {
        {
            await this.ClickOnCalculator.click();
            await this.page.waitForTimeout(1000);
            await this.EnternumberOne.click();
            await this.page.waitForTimeout(1000);
            await this.EnterPlus.click();
            await this.page.waitForTimeout(1000);
            await this.EnternumberTwo.click();
            await this.page.waitForTimeout(1000);
            await this.EnterEqualto.click();
            await this.page.waitForTimeout(1000);
            await this.CloseCalculator.click();
        }
    }

    /**
     * Method to use Highlighter for Last VSAQ question
     */
    async UsingHighlighterForQuestions() {
        {
            await this.clickOnLastVSAQ.click();
            await this.page.waitForTimeout(3000);
            await this.ClickOnHighlighter.click();
            await this.page.waitForTimeout(3000);
            await this.HighlightQuestions.dblclick()
            await this.HighlightQuestions.click()
            await this.page.waitForTimeout(1000);
        }
    }


    /**
     * Method to use Highlighter tool for All questions type
     * @param Highlighter 
     */
    async UsingHighlighterForAllQuestions(Highlighter) {
        await this.ClickOnHighlighter.click();
        if (Highlighter == 'ISWE') {
            await this.page.waitForTimeout(1000);
            await this.IsaweQuestion.dblclick()
            await this.IsaweQuestion.click()
        } else if (Highlighter == 'TYPEB') {
            await this.page.waitForTimeout(1000);
            await this.TypebQuestionStatment.dblclick();
            await this.TypebQuestionStatment.click();
        } else if (Highlighter == 'Other') {
            await this.page.waitForTimeout(1000);
            await this.HighlightQuestions.dblclick()
            await this.HighlightQuestions.click()

        }
        await this.page.waitForTimeout(1000);
    }


    async UsingHighlighterForQuestions1() {
        await this.ClickOnHighlighter.click();
        await this.page.waitForTimeout(1000);
        await this.HighlightQuestions.dblclick()
        await this.HighlightQuestions.click()
        await this.page.waitForTimeout(1000);
    }


    async flagForQuestion() {
        await this.clickOnLastVSAQ.click();
        await this.flagForReviewQuestions.click();

    }


    /**Method to Login to candidate app without vaild username and pwd */
    async logintoAppwithoutUserPwd(): Promise<void> {
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(2000);
    }

    /**Method to signout of the exam after candidate logged in and clicked on start exam */
    async candidateLoginToAppStartExamandSignout(): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Worksheet');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(2).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(2).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        if (this.ClickStartExamLink.isVisible()) {
            await this.ClickStartExamLink.click();
        }
        await this.ClickOnStartExamBtn.click();
        await this.signOutBtn.click();
        await this.page.waitForTimeout(2000);
    }

    /**Method to signout of the exam after candidate logged in and clicked on start exam */
    async candidateLoginToAppStartExam(row, file): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/' + file;
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('users');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(row).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(row).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        if (this.ClickStartExamLink.isVisible()) {
            await this.ClickStartExamLink.click();
        }
    }


    async validateExamSectionPage(): Promise<void> {
        await this.ClickOnStartExamBtn.click();
        // validatingExamSection
        if (this.validatingExamSection.isVisible()) {
            console.log(await this.validatingExamSection.textContent())
            console.log("Navigating to Exam Screen Successfully")
        }
    }


    /**Method to Enter Invigilator Password */
    async enterInvigilatorPassword() {
        await this.page.bringToFront();
        await this.EnterExaPassword.click();
        await this.page.waitForTimeout(1000);
        await this.EnterExaPassword.type('ABC09');
        await this.ClickOnStartExamBtn.click();
        await this.page.waitForTimeout(3000);
    }

    /**Method to Enter Invigilator Password multiple times*/
    async enterInvigilatorPasswordMultipletimes() {
        for (let i = 0; i <= 9; i++) {
            await this.page.bringToFront();
            await this.EnterExaPassword.click();
            await this.page.waitForTimeout(1000);
            await this.EnterExaPassword.type('ABC08');
            await this.ClickOnStartExamBtn.click();
            await this.page.waitForTimeout(3000);
        }
        await this.RatelimitLogin.isVisible();
        console.log(await this.RatelimitLogin.textContent());
    }


    /**Method to add MCQ Questions for Practise exam */
    async candidatePractisePageView() {
        await this.page.waitForTimeout(5000);
        await this.ClickOnSubmitBtn.click();
        await this.page.waitForTimeout(5000);
        await expect(this.submitSuccessMessage).toHaveText("Exam Responses have been successfully synced to the server.");
        await this.page.waitForTimeout(5000);
        await this.ViewResult.click();
        await this.page.waitForTimeout(5000);
        await expect(this.marks1).toHaveText("1");
        await expect(this.marks2).toHaveText("N/A");
        await expect(this.totalMarks).toBeVisible();
        console.log("Total Marks:" + this.totalMarks.textContent());

        // await this.clickQuestion1.click();
        // await expect(this.answerCorrect).toHaveText("Your answer is correct");

        // await this.clickQuestion5.click();
        // await expect(this.answerIncorrect).toHaveText("Your answer is incorrect");

    }

    /**Method to signout of the exam after candidate logged in */
    async candidateLoginToAppandSignout(row, file): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/' + file;
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('users');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(row).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(row).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        await this.signOutBtn.click();
        await this.page.waitForTimeout(2000);
    }

    /**Method to check if Red colour is displayed for questions which is marked for Falg for review */
    async flagForReview() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[3]').click();
        await this.flagForReviewQuestions.click();
        await this.flagForReviewColor.isVisible();
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        console.log("Red Color is Displayed when Flagged for Review")
    }

    /**Method to check if Gray colour is displayed for questions while taking the exam */
    async NotAnsweringQuestions() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();
        await this.notAnweredQuestion.isVisible();
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        console.log("Gray Color is Displayed When Questions are Not Answered")
    }

    /**Method to Add notes to the question during exam */
    async AddingNotesToQuestions() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            await this.ClickOnNotepad.click();
            await this.page.waitForTimeout(1000);
            await this.textareafill.type('abc');
            await this.page.waitForTimeout(1000);
            await this.saveButton.click();
            await this.page.waitForTimeout(1000);
            await this.ClickOnNextBtn.click();
        }
        await this.noteQuestions.isVisible();
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        console.log("Pink Color is Displayed When added Notes to the Questions")
    }

    async AddingNotesToQuestionandclickNext() {
        await this.ansVSAQQuestion.click();
        await this.ClickOnNotepad.click();
        await this.page.waitForTimeout(1000);
        await this.textareafill.type('abc');
        await this.page.waitForTimeout(1000);
        await this.saveButton.click();
        await this.page.waitForTimeout(1000);
        await this.CloseNotepad.click();
        await this.ClickOnNextBtn.click();
    }

    async AddingNotesToQuestionSingle() {
        await this.ansVSAQQuestion.click();
        await this.ClickOnNotepad.click();
        await this.page.waitForTimeout(1000);
        await this.textareafill.type('abc');
        await this.page.waitForTimeout(1000);
        await this.saveButton.click();
        await this.page.waitForTimeout(1000);
        await this.CloseNotepad.click();
    }


    async AddingNotesToQuestionSinglelast() {
        await this.clickOnLastVSAQ.click();
        // await this.ansVSAQQuestion.click();
        await this.ClickOnNotepad.click();
        await this.page.waitForTimeout(1000);
        await this.textareafill.type('abc');
        await this.page.waitForTimeout(1000);
        await this.saveButton.click();
        await this.page.waitForTimeout(1000);
        await this.CloseNotepad.click();
    }

    async AddingNotesToQuestionSinglelastandclickPrevious() {
        await this.clickOnVSAQQuestions.click();
        await this.ansVSAQQuestion.click();
        await this.ClickOnNotepad.click();
        await this.page.waitForTimeout(1000);
        await this.textareafill.type('abc');
        await this.page.waitForTimeout(1000);
        await this.saveButton.click();
        await this.page.waitForTimeout(1000);
        await this.clearButton.click();
        await this.page.waitForTimeout(1000);
        await this.CloseNotepad.click();
        await this.clickOnPreviousBtn.click()
        await this.ClickOnNextBtn.click();
        await this.ClickOnNotepadOne.click();
        await this.page.waitForTimeout(1000);
    }

    async AddingNotesValidate() {
        await this.ansMCQQuestions.click();
        await this.ClickOnNotepadOne.click();
        await this.page.waitForTimeout(1000);
        await this.textareafill.type('abc');
        await this.page.waitForTimeout(1000);
        await this.saveButton.click();
        await this.page.waitForTimeout(1000);
        await this.CloseNotepad.click();
    }


    async NotAnsweringQuestion() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
        await this.notAnweredQuestion.isVisible();
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        console.log("Exam is submitted When Questions are Not Answered")
    }

    /**Method to check if Orange colour is displayed for questions when it is in progress */
    async InProgressQuestions() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            //await this.page.waitForTimeout(5000);
            //await this.ClickOnNextBtn.click();
        }
        await this.inProgressColor.isVisible();
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        console.log("Orange Color is Displayed When Questions are in Progress")
    }

    /**Method to click on start exam for Minial time */
    async candidateStartExamforMinimalTime(): Promise<void> {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        await this.page.waitForTimeout(5000);
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
    }

    /**Method for Logout */
    async logoutClick(): Promise<void> {
        await this.signOutBtn.click();
        await this.page.waitForTimeout(2000);
    }

    /**Method to click on terms & condtion */
    async termsandconditionsclick() {
        await this.clickOnTermAndCondition.click();
        await this.inceaseSize.click();
        await this.inceaseSize.click();
        await this.inceaseSize.click();
        await this.page.waitForTimeout(5000);
        await this.popupOK.click();
        await this.page.waitForTimeout(2000);
        await this.decreaseSize.click();
        await this.decreaseSize.click();
        await this.decreaseSize.click();
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on terms & condtion in content section */
    async candidateContentSectionVerification() {
        await this.popupOK.click();
        await this.page.waitForTimeout(25000);
        await this.clickOnTermAndCondition.click();
        await expect(this.verifyCloud).toBeVisible();
        console.log('cloud symbol is Updated');
        await this.clickonNextBtn.click();
        await this.page.waitForTimeout(2000);

    }

    async candidateContentSectionVerificationwithoutnext() {
        await this.clickOnTermAndCondition.click();
        await this.page.waitForTimeout(2000);
        await this.popupOK.click();
        await this.page.waitForTimeout(2000);
    }

    async candidateContentSectionVerifications() {
        await this.clickOnTermAndCondition.click();
        await this.page.waitForTimeout(2000);
        await this.popupOK.click();
        await this.clickonNextBtn.click();
    }

    async validsationOfChatApp() {
        await expect(this.clickChatApp).toBeVisible();
    }

    async chatApp() {
        await this.clickChatApp.click();
        await this.chatAppTxtArea.click();
        await this.chatAppTxtArea.fill("Hello");
        await this.clickOnSendicon.click();
        await this.page.waitForTimeout(5000);
    }

    async enterFieldsInChatApp(setOffline) {
        await this.clickChatApp.click();
        await this.clickOnOptionsInChatApp.click();
        await this.enterNameInChatApp.type('Raghu')
        await this.clickOnNextChatApp.click();
        await this.context.setOffline(setOffline);
        await this.enterExamInChatApp.type('Rag123')
        await this.clickOnSendInChatApp.click();
        await this.page.waitForTimeout(5000);
    }

    async enterFieldsInChatAppForOutOfOfficeHours(setOffline) {
        await this.clickChatApp.click();
        await this.clickOnOptionInChatApp.click();
        await this.enterNameInChatApp.type('Raghu')
        await this.clickOnNextChatApp.click();
        await this.context.setOffline(setOffline);
        await this.enterExamInChatApp.type('Rag123')
        await this.clickOnSendInChatApp.click();
        await this.page.waitForTimeout(5000);
    }

    /**Method to Answer the MCQ questions and Abort in middle */
    async candidateStartMCQandAbort() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[3]').click();
        await this.flagForReviewQuestions.click();
    }

    async candidateStartOneVSAQwithViewer() {
        await this.VSAQQuestion1Click.click();
        await this.page.waitForTimeout(2000);
    }

    async candidateStartSixVSAQwithViewer() {
        await this.VSAQQuestion6Click.click();
        await this.imagePreview.isVisible();
        await this.page.waitForTimeout(2000);
    }

    async candidateStartWithVSAQwithViewer() {
        await this.VSAQQuestion1Click.click();
        await this.page.waitForTimeout(2000);
    }

    async candidateStartOneMCQwithMultipleViewerOptions() {
        await this.page.waitForTimeout(2000);
        await this.VSAQQuestion1Click.click();
        await this.page.waitForTimeout(2000);
        await this.ZoominIconClick.click();
        await this.page.waitForTimeout(2000);
        await this.ZoomOutIconClick.click();
        await this.page.waitForTimeout(2000);
        await this.RotateRight.click();
        await this.page.waitForTimeout(2000);
        await this.RotateLeft.click();
        await this.page.waitForTimeout(2000);
        await this.FullScreenClick.click();
        await this.page.waitForTimeout(2000);
        await this.FullScreenExit.click();
        await this.page.waitForTimeout(2000);
        await this.CloseIconClick.click();
        await this.page.waitForTimeout(5000);
    }


    /**
     * To Validate the Exam availability in Candidate page by checking the exam start time xpath
     */
    async ExamAvailabilityCheck() {
        await expect(this.StartExameTimer).toBeHidden();
        console.log('Exam is not visiable after time ends');
    }


    /**
     * To check the User name pop up mesage in candidate screen
     */
    async candidateUserNamePopUp(): Promise<void> {
        await this.CandidatePassword.fill(testData.InvalidCandidatePassword);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(2000);
        await this.UserIDText.isVisible();
    }

    /**
     * To check the User name pop up message in candidate screen
     */
    async candidatePasswordPopUp(): Promise<void> {
        await this.CandidateUsername.fill(testData.InvalidCandidateUsername);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(2000);
        await this.PasswordIDText.isVisible();
    }

    /**
     * Method to check user not Navigated back and check the assertion
     */

    async navigateBackFromExamattendPage() {
        await this.page.waitForTimeout(5000);
        await this.page.goBack();
        console.log("Clicked on Back Navigation icon");
        await this.ClickOnRevieweBtn.isVisible();
    }

    /**
     * Method to validate the Multiple choice Options for MCQ question
     */
    async MCQMultipleOptions() {
        await this.page.waitForSelector('//label[@class="labelEmpty"]', { timeout: 10000 });
        const quants = await this.page.$$('//label[@class="labelEmpty"]');
        for (let i = 0; i < 5; i++) {
            await quants[i].click();
            await this.page.waitForTimeout(1000);
        }
    }


    /**
     * Image View Validation in candidate page if the Question is added with Image
     * @param ImageView 
     */
    async ImageViewValidation(ImageView) {

        if (ImageView == 'Typex') {
            await this.imageViewForTypeX.click();
        } else if (ImageView == 'all') {
            await this.imageView.click();
        }
        await this.page.waitForTimeout(2000);
        await this.imageViewPreview.isVisible();
        await this.ZoominIconClick.click();
        await this.page.waitForTimeout(2000);
        await this.ZoomOutIconClick.click();
        await this.page.waitForTimeout(2000);
        await this.RotateRight.click();
        await this.page.waitForTimeout(2000);
        await this.RotateLeft.click();
        await this.page.waitForTimeout(2000);
        await this.RotateRight.click();
        await this.page.waitForTimeout(2000);
        await this.Reseticon.click();
        await this.page.waitForTimeout(2000);
        await this.Panicon.click();
        await this.page.waitForTimeout(2000);
        await this.Closeicon.click();
        await this.page.waitForTimeout(2000);

    }

    /**
     * To Validate each component displayed in the All Question type Section
     * @param page 
     */
    async AllQuestionPageValidation(page): Promise<void> {
        await this.candidateContentSectionValidation();
        let ID = EluminaRegistrationPage.CandiateClientID;
        console.log('ID from Registration page' + ID);
        await this.page.waitForTimeout(5000);
        let ClientID1 = await this.page.locator('(//div[@class="txt"])[2]//label[4]').textContent();
        console.log('ID from Candiate exam page' + ClientID1);
        expect(ClientID1).toBe(ID);
        await this.verifyExamDashboardTimer();
        await this.verifyColours();
        await this.verifyNoOfQutn();
        await this.validationOfReviewBtn();
        await this.SectionName.isVisible();
        await this.verifyFlagForReview();
        await this.validationOfAllTools();
        await this.validationOfNextBtn();
        await this.UsingCalculatorForQuestions();
        await this.AddingNotesToAllQuestion();
        await this.increaseFontSize();
        await this.decreaseFontSize();
        if (page == 'MCQ') {
            await this.QuestionDescription.isVisible();
            let a = await this.NoOfQutn.textContent()
            expect(a).toBe(' Question #1 of 30 ');
            await this.UsingHighlighterForAllQuestions('Other');
            await this.MCQMultipleOptions();
            await this.candidateStartOneMCQ();
            await this.validatePreviousBtn();
        } else if (page == 'VSAQ') {
            await this.QuestionDescription.isVisible();
            let a = await this.NoOfQutn.textContent();
            expect(a).toBe(' Question #6 of 30 ');
            await this.UsingHighlighterForAllQuestions('Other');
            await this.ImageViewValidation('all');
            await this.candidateAttendsAllQVSAQ(100);
            await this.validatePreviousBtn();
        } else if (page == 'ISAWE') {
            await this.IsaweQuestion.isVisible();
            await this.IsaweSubQuestion.isVisible();
            let a = await this.NoOfQutn.textContent();
            expect(a).toBe(' Question #9 of 30 ');
            await this.UsingHighlighterForAllQuestions('ISAWE');
            await this.ImageViewValidation('all');
            await this.candidateStartISAWE();
            await this.validatePreviousBtn();
        } else if (page == 'TYPEX') {
            await this.TypexQuestion.isVisible();
            let a = await this.NoOfQutn.textContent();
            expect(a).toBe(' Question #11 of 30 ');
            await this.UsingHighlighterForAllQuestions('Other');
            await this.ImageViewValidation('Typex');
            await this.candidateStartTypeX();
            await this.validatePreviousBtn();
        } else if (page == 'TYPEB') {
            await this.TypebQuestionStatment.isVisible();
            let a = await this.NoOfQutn.textContent();
            expect(a).toBe(' Question #16 of 30 ');
            //  await this.UsingHighlighterForAllQuestions('TYPEB');
            await this.ImageViewValidation('all');
            await this.candidateStartTypeB();
            await this.validatePreviousBtn();
        } else if (page == 'SAQ') {
            await this.QuestionDescription.isVisible();
            let a = await this.NoOfQutn.textContent()
            expect(a).toBe(' Question #21 of 30 ');


            // await this.UsingHighlighterForAllQuestions('Other');

            await this.UsingHighlighterForAllQuestions('Other');

            await this.candidateStartSAQ(2000);

            await this.validatePreviousBtn();
        } else if (page == 'SJT') {
            await this.QuestionDescription.isVisible();
            let a = await this.NoOfQutn.textContent();
            expect(a).toBe(' Question #26 of 30 ');
            //  await this.UsingHighlighterForAllQuestions('TYPEB');
            await this.candidateStartSJT();
            await this.validatePreviousBtn();
        }

    }

    /**
    * To Validate each component displayed in the MCQ Section
    */
    async McqPageValidations() {
        await expect(this.verifyExamTimer).toBeVisible();
        EluminaCandidatePage.Time = await this.verifyExamTimer.textContent();
        console.log('Time display' + EluminaCandidatePage.Time);
    }

    /**
     * method to start MCQ without next button
     */
    async candidateStartVSAQWithoutNextButton(lines) {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 0; i < 2; i++) {
            await qutns[i].click();
            await this.ansVSAQQuestion.click();
            await this.ansVSAQQuestion.type(makeid(lines));
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
    }

}


