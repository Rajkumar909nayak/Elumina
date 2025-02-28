import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';
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

/*Elumina login page with create exam with Practice exam button and attending practice exam  EluminaRegression iProctorTC_057*/

test(` Exam_Prerequisit_for_iProc_TC_ID_54A. @iProctorRegression Verify Elumina Login`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam, webActions }) => {
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
        const newtab = await eluminaProctorExam.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createPracticeExam();
        await newtab.createSections("1", "30");
        await newtab.addMCQQuestions();
    });
});

test(` Exam_Prerequisit_for_iProc_TC_ID_54B. @iProctorRegression Verify Elumina Registration`, async ({ eluminaLoginPage, eluminaProctorReg, webActions }) => {
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

test(` iProc_TC_ID_54. @iProctorRegression Candidate Attend practice exam EluminaRegressionProctorTC_057`, async ({ eluminaProctorCand, eluminaCandPage, webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaCandPage.waitforTime();
        await eluminaCandPage.waitforTime();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.candidateLoginToApplications(2);
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
        await newPage.locator('(//a[@class="dropdown-toggle"])[3]').click();
        await newPage.locator('//p[text()="Verify Identity"]').click();
        await newPage.locator('(//button[text()="Yes"])[1]').click();
        await newPage.waitForTimeout(3000);

        await newPage.close();
        await page1.close();
    });

    await test.step('Candidate start the exam', async () => {
        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.clickOnStartExamBtn();
        await eluminaProctorCand.candidateStartMCQ();
    });

});

/*Validation of Proctoring Exam Events > Exam In Progress, Exam started for candidate, 
Candidate entered into exam section & Entered into question: 1(#IQID).*/


test(` iProc_TC_ID_118. @iProctorRegression Validation of Proctoring Exam Events In Admin Section EluminaRegressioniProctorTC_124`, async ({ eluminaCandPage, eluminaLoginPage, eluminaProctorCand, eluminaProctorReg, webActions }) => {
    await test.step('Candidate logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications(2);
    });
    await test.step(`Navigate to Application`, async () => {
        await eluminaProctorCand.clickOnAllLink();
        const browser = await chromium.launch();
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
        await page1.goto('/');
        await page1.waitForLoadState();
        await page1.locator('(//input)[1]').type(testData.UserEmail);
        await page1.locator('(//input)[2]').type(testData.UserPassword);
        await page1.locator('//*[@class="submit-butn"]').click();
        const [newPage] = await Promise.all([
            context1.waitForEvent('page'),
            await page1.locator('//div[text()="iAuthor"]').click()
        ]);
        await newPage.locator('//a[text()="Delivery"]').click();

        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/ExamID.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Sheet1');
            console.log("ExamId" + ws.getRow(1).getCell(1).value)
            await newPage.locator('//input[@placeholder="Search Exam(s)"]').type(ws.getRow(1).getCell(1).value);
            await newPage.waitForTimeout(3000);
        })

        await newPage.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a').click();
        await newPage.locator('//a[text()="Live Monitor"]').click();
        await newPage.locator('(//a[@class="dropdown-toggle"])[3]').click();
        await newPage.locator('//p[text()="Verify Identity"]').click();
        await newPage.locator('(//button[text()="Yes"])[1]').click();
        await newPage.waitForTimeout(3000);

        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.clickOnStartExamBtn();
        await eluminaProctorCand.candidateCliclkOnSingleMCQ();

        await newPage.locator('//img[@class="proctoringImg"]').click();
        await newPage.locator('(//div[@class="candidate-name"]//div[1])[3]').click();
        await newPage.waitForTimeout(3000);
        let status = await newPage.locator('//div[@class="status"]').textContent();
        await newPage.waitForTimeout(3000);
        console.log("Candidate status:" + status);

        let events = await newPage.$$('//div[@class="event-item"]');
        const Ttl = events.length - 1;
        for (let i = 0; i <= events.length - 1; i++) {
            let event = await events[i].textContent();
            console.log(event);
        }
        await newPage.close();
        await page1.close();
    });

});

