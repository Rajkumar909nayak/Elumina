import test from '@lib/BaseTest';
import { EluminaProctorCandidatePage } from '@pages/EluminaProctorCandidatePage';
import { chromium, expect } from '@playwright/test';
const devTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/dev/testData.json')));
const p7TestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/p7/testData.json')));
const productionTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/production/testData.json')));
const qaTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/qa/testData.json')));
const sandboxTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/sandbox/testData.json')));
const stagingTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/staging/testData.json')));

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
/** Validation of exam paused for Candidate & Validation of exam extended for Candidate  */

test(`Exam_Prerequisit_for_iEX_TC_ID_137. @Serial-Pre-Request  Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
        await eluminaLoginPage.verifyProfilePage();
    });
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaExamPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createCommonExam();
        await newtab.selectAllTools();
        await newtab.createSection("1", "30");
        await newtab.addMCQQuestion();
        await newtab.addVSAQQuestion();
        await newtab.addISAWEQuestion();
        await newtab.addTypeXQuestion();
        await newtab.addTypeBQuestion();
        await newtab.addSAQQuestion();
        await newtab.addSJTQuestion();

    });
});

test(`Exam_Prerequisit_for_iEX_TC_ID_137. @Serial-Pre-Request  Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addMultipleUserDetails(0);
        await newtab.BulkDownloadUserDetails("Serial_User_details.xlsx");
        await newtab.addInv();
        await newtab.searchUserForAddingInv(2, "Serial_User_details.xlsx")
    });
});

test(`iEX_TC_ID_150. @iExamSerialRegression  Validation of Exam Invigilator Live monitor (View Response based on candidate) Negative scenario `, async ({ eluminaCandPage, eluminaCadInvPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
        await eluminaCandPage.waitforTime();
        await eluminaCandPage.waitforTime();
        await eluminaCandPage.waitforTime();

    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateStartOneMCQ();

        const browser = await chromium.launch();
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
        await page1.goto('/');
        await page1.waitForLoadState();
        await page1.locator('(//input)[1]').type(testData.invigilatorUsername);
        await page1.locator('(//input)[2]').type(testData.invigilatorPassword);
        await page1.locator('//*[@class="submit-butn"]').click();
        const [newPage] = await Promise.all([
            context1.waitForEvent('page'),
            await page1.locator('//div[text()="iAuthor"]').click()
        ]);
        await newPage.locator('(//table[@class="table"]//tbody//tr[1]//td[2]//span)[1]').click();
        await newPage.waitForTimeout(5000);
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[5]//a').click();
        await newPage.locator('//div[@class="question-section"]').isDisabled();
        await newPage.waitForTimeout(5000);
        await newPage.locator('(//div[@class="question-number-container"]//div//p)[6]').click();
        await newPage.locator('(//div[@class="answer-text-editor"])[1]').isDisabled();
        await newPage.waitForTimeout(5000);
        await newPage.close();
        await page1.close();

    });

});


test(`iEX_TC_ID_137. @iExamSerialRegression  Validation of Exam Invigilator Live monitor > Terminate exam.  (All Candidate)"  `, async ({ eluminaCandPage, eluminaCadInvPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateStartMCQ();

        const browser = await chromium.launch();
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
        await page1.goto('/');
        await page1.waitForLoadState();
        await page1.locator('(//input)[1]').type(testData.invigilatorUsername);
        await page1.locator('(//input)[2]').type(testData.invigilatorPassword);
        await page1.locator('//*[@class="submit-butn"]').click();
        const [newPage] = await Promise.all([
            context1.waitForEvent('page'),
            await page1.locator('//div[text()="iAuthor"]').click()
        ]);
        await newPage.locator('(//table[@class="table"]//tbody//tr[1]//td[2]//span)[1]').click();
        await newPage.waitForTimeout(5000);
        await newPage.locator('//table[@class="table table-spacing"]//thead//tr//th[2]//input').click();;
        await newPage.locator('//div[@class="action-item control-item terminate-exam"]').click();;
        await newPage.locator('(//button[text()="Yes"])[2]').click();
        await newPage.waitForTimeout(5000);
        let terminateExamSuccessMessage = await newPage.locator('//div[@class="content-side"]//span').textContent();
        let successMessage = terminateExamSuccessMessage.split('(s)')[0].toString();
        console.log(successMessage);
        expect(successMessage).toEqual(expect.stringContaining("Exam terminated successfully for candidate"));
        await newPage.close();
        await page1.close();

    });

    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard(2, "Serial_User_details.xlsx");
        await eluminaCadInvPage.terminateCandidateValidation();
        await eluminaCandPage.waitforTime4();
    });
});