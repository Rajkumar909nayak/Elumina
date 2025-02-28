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

/**Validation of Proctoring Exam Event > Microphone Verified*/

test(` iProc_TC_ID_110. @iProctorRegression Validation of Proctoring Exam Event > Microphone Verified`, async ({ eluminaProctorCand, eluminaLoginPage, eluminaProctorReg, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaProctorCand.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.candidateLoginToApplication();
    });

    await test.step('Admin logging into Application', async () => {
        await eluminaProctorCand.clickOnAllLinkForDiffExamZone();

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
        await newPage.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a').click();
        await newPage.locator('//a[text()="Live Monitor"]').click();
        await newPage.locator('//img[@class="proctoringImg"]').click();
        await newPage.locator('(//div[@class="candidate-name"]//div[1])[1]').click();
        await newPage.locator('(//div[contains(text(),"Microphone Verified")])[1]').isVisible();
        let MicrophoneVerified = await newPage.locator('(//div[contains(text(),"Microphone Verified")])[1]').textContent();
        console.log(MicrophoneVerified);
        await newPage.waitForTimeout(3000);
        await newPage.close();
        await page1.close();

    });
});
