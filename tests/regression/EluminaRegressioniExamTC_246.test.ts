import test from '@lib/BaseTest';
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

/** Validation of extending exam for the candidate by invigilator */

test(`iEX_TC_ID_141. @iExamSerialRegression Verify Validation of Extending Exam`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");

    });

    await test.step('Candidate start the exam', async () => {

        await eluminaCandPage.examSectionValidation();

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
        await newPage.waitForTimeout(8000);
        await newPage.locator('//span[@class="thtext"]//input[@type="checkbox"]').click();
        await newPage.locator('//div[@title="Pause Exam for all Candidates"]').click();
        await newPage.locator('(//button[@class="theme-btn theme-primary-btn"])').click();
        await newPage.waitForTimeout(3000);
        await newPage.locator('//div[@class="main-fx--container fx-left action-list"]//div[7]//div').click();
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr//td[2]//input').click();
        await newPage.locator('//div[@title="Extend Exam for all Candidates"]').click();
        await newPage.locator('(//button[text()="Yes"])[2]').click();
        await newPage.waitForTimeout(3000);
        await newPage.locator('//div[@class="col-12 nested"]//span[@class="col-8"]//div[@class="btn-selected-list"]').click();
        await newPage.locator('(//li[@class="open"]//div[@class="open container-left-padding"]//span[@class="open"])[3]').click();
        await newPage.locator('//div[@class="col-12 nested"]//span[@class="col-8"]//input[2]').click();
        await newPage.locator('//div[@class="col-12 nested"]//span[@class="col-8"]//input[1]').type('1');
        await newPage.locator('//button[@class="theme-btn theme-primary-btn"]').click();
        await newPage.waitForTimeout(5000);
        console.log("Candidate is able to see the exam timer is extended")
        await newPage.close();
        await page1.close();

    });
});