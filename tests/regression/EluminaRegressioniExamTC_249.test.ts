import test from '@lib/BaseTest';
import { EluminaCandidatePage } from '@pages/EluminaCandidatePage';
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
/** Validation of Candidate Attending Exam in Online - Offline (Submit Offline and Resume Synch in Online) */

test(`Exam_Prerequisit_for_iEX_TC_ID_109. @Serial-Pre-Request Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.createContentSection("1");
        await newtab.createContentPage();
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

test(`Exam_Prerequisit_for_iEX_TC_ID_109. @Serial-Pre-Request Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
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


test(`iEX_TC_ID_81. @iExamSerialRegression Validation of Exam Review Exam page. (Offline)`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
        await eluminaCandPage.waitforTime();
        await eluminaCandPage.waitforTime();
        await eluminaCandPage.waitforTime();

    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
        await eluminaCandPage.candidateContentSectionVerifications();
        await eluminaCandPage.candidateStartMCQwithflagforreviewandnotes();
        await eluminaCandPage.candidateAttendsAllQVSAQ(100);
        await eluminaCandPage.setOffline(true);
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ(100);
        await eluminaCandPage.candidateStartSJTValidationofReviewPage();
        await eluminaCandPage.waitforTime2();
    });
});

test(`iEX_TC_ID_144. @iExamSerialRegression Validation of Check Individual Candidate Timer is in Sync  (Individual Candidate)`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.McqPageValidations();

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

        let AfterTime = await newPage.locator('//div[@class="timer-box timer-icon"]').textContent();

        let HourBeforeSplit = AfterTime.split(':')[0];
        console.log("Hr:" + HourBeforeSplit);
        var HrB: number = +HourBeforeSplit;

        let HourAfterSplit = EluminaCandidatePage.Time.split(':')[0];
        console.log("HrA:" + HourAfterSplit);
        var HrA: number = +HourAfterSplit;

        expect(HrA).toEqual(HrB);

        await newPage.waitForTimeout(3000);
        await newPage.close();
        await page1.close();
    });

});


test(`iEX_TC_ID_109. @iExamSerialRegression Validation of Candidate attending Exam in Online - Offline and submit in Offline Mode`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.setOffline(true);
        await eluminaCandPage.candidateAttendsAllQVSAQ(100);
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ(100);
        await eluminaCandPage.candidateStartSJTReviewandSubmit();
        await eluminaCandPage.waitforTime4();
        await eluminaCandPage.setOffline(false);
        await eluminaCandPage.waitforTime4();

    });
});




