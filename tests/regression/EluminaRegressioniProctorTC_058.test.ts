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

/**Validate Candidate while attending exam - Candidate abruptly closed the browser*/

test(` iProc_TC_ID_55A. @iProctorRegression Candidate while attending exam - Candidate abruptly closed the browser`, async ({ eluminaProctorCand, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplication();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.clickOnAllLinkForDiffExamZone();

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
        await newPage.locator('//table[@class="table table-spacing"]//thead//tr//th[2]//div//input').click();
        await newPage.locator('//a[@class="dropdown-toggle"]').click();
        await newPage.locator('//p[text()="Verify Identity"]').click();
        await newPage.locator('(//button[text()="Yes"])[1]').click();
        await newPage.waitForTimeout(3000);

        await newPage.close();
        await page1.close();

    });

    await test.step('Candidate starts and closes the page after attending two questions in the exam', async () => {
        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaCandPage.candidateStartTwoMCQ();
    });
});

test(` iProc_TC_ID_55B. @iProctorRegression Verify Elumina candidate attends the exam after abrupt closure of browser`, async ({ eluminaProctorCand, eluminaCandPage, webActions }) => {
    await test.step(`Candidate Login to application`, async () => {

        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplication();
        await eluminaProctorCand.clickOnAllLinkForDiffExamZone();

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
        await newPage.locator('//table[@class="table table-spacing"]//thead//tr//th[2]//div//input').click();
        await newPage.locator('//a[@class="dropdown-toggle"]').click();
        await newPage.locator('//p[text()="Verify Identity"]').click();
        await newPage.locator('(//button[text()="Yes"])[1]').click();
        await newPage.waitForTimeout(3000);

        await newPage.close();
        await page1.close();


    });

    await test.step('Candidate completes the exam', async () => {

        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaProctorCand.candidateStartMCQ();
        console.log("Candidate is able to close the broswer and answered questions are saved after logging in again")

    });

});