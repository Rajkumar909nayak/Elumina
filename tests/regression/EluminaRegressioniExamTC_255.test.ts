import test from '@lib/BaseTest';
import { EluminaInvPage } from '@pages/EluminaInvPage';
import { EluminaLoginPage } from '@pages/EluminaLoginPage';
import { EluminaRegistrationPage } from '@pages/EluminaRegistrationPage';
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

// /**Validation of Exam Section > Candidate and Live Monitor Time Sync */

test(`iEX_TC_ID_145. @iExamSerialRegression Validation of Candidate Login to Exam and getting Candidate Timing`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
        await eluminaCandPage.getCandidateClockText();
    });
});
test('iEX_TC_ID_145B. @iExamSerialRegression Validation of invigilator Livemonitor Timing ', async ({ eluminaCandPage, webActions }) => {
    await test.step('Navigate to Application', async () => {
        const browser = await chromium.launch();
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
        await page1.goto('/');
        await page1.waitForLoadState();
        // Type username and password
        await page1.locator('(//input)[1]').type(testData.invigilatorUsername);
        await page1.locator('(//input)[2]').type(testData.invigilatorPassword);
        // Click the submit button
        await page1.locator('//*[@class="submit-butn"]').click();
        // Click on the "iAuthor" div
        const [newPage] = await Promise.all([
            context1.waitForEvent('page'),
            page1.locator('//div[text()="iAuthor"]').click()
        ]);
        // Navigate to Exam and Candidate
        await newPage.locator('(//tbody//tr//td//span)[1]').click();
        await newPage.locator('//tbody//tr//td[5]//a').click();
        // Get and log the Live Monitor clock time
        const livemonitorclock = await newPage.locator('//div[@class="timer-box timer-icon"]//span').textContent();
        console.log("Live Monitor clock time: " + livemonitorclock);
    });
});

