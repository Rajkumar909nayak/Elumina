import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';
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


//Validation of "Time Remaining" pop-up when the just before the exam time runs out(Proctor)

test(`Exam_Prerequisit_ID_01. @iProctorlink Verify Create Exam With Content Section and Content Section Page`, async ({ eluminaLoginPage, eluminaProctorExam, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaProctorExam.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createExam();
        await newtab.createContentSection("1");
        await newtab.createContentPage();
        await newtab.createSections("1", "30");
        await newtab.addMCQQuestions();
    });
});

test(`Reg_Prerequisit_ID_01A. @iProctorlink Verify Elumina Registration`, async ({ eluminaLoginPage, eluminaProctorReg, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });

    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaProctorReg.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addMultipleUserDetails();
        await newtab.BulkDownloadUserDetails();
        await newtab.addExistingUsers();
        await newtab.searchCandidate();
    });
});

test(`iProc_TC_ID_40. @iProctorlink Verify Elumina Invigilator Dashboard`, async ({ eluminaProctorCand, eluminaCandPage, webActions }) => {
    await test.step('Candidate logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications(2);
        await eluminaCandPage.waitforTime3();
    });
    await test.step('Invigilator  logging into Application', async () => {
        await eluminaProctorCand.clickOnAllLink();

        const browser = await chromium.launch();
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
        await page1.goto('/');
        await page1.waitForLoadState();
        await page1.locator('(//input)[1]').type(testData.iProctorinvigilatorUsername);
        await page1.locator('(//input)[2]').type(testData.iProctorinvigilatorPassword);
        await page1.locator('//*[@class="submit-butn"]').click();
        const [newPage] = await Promise.all([
            context1.waitForEvent('page'),
            await page1.locator('//div[text()="iAuthor"]').click()
        ]);


        await newPage.locator('(//table[@class="table"]//tbody//tr[1]//td[2]//span)[1]').click();
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
        await newPage.locator('(//a[@class="dropdown-toggle"])[3]').click();
        await newPage.locator('//p[text()="Verify Identity"]').click();
        await newPage.locator('(//button[text()="Yes"])[1]').click();
        await newPage.waitForTimeout(3000);

        await newPage.close();
        await page1.close();
    });
    await test.step('Validation of Time Remaining pop-up when the just before the exam time runs out', async () => {
        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaCandPage.candidateContentSection();
        await eluminaCandPage.candidateStartMCQ();
        await eluminaCandPage.clickonPrevious();
    });

});


