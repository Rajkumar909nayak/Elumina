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

//Validation of Proctoring Exam > Completed

test(` iProc_TC_ID_137. @iProctorRegression Validation of Proctoring Exam > Completed`, async ({ eluminaCandPage, eluminaLoginPage, eluminaProctorCand, eluminaProctorReg, webActions }) => {
    await test.step('Candidate logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications(3);
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
        })

        await newPage.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a').click();
        await newPage.locator('//a[text()="Live Monitor"]').click();

        //await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
        await newPage.locator('(//a[@class="dropdown-toggle"])[2]').click();
        await newPage.locator('//p[text()="Verify Identity"]').click();
        await newPage.locator('(//button[text()="Yes"])[1]').click();
        await newPage.waitForTimeout(3000);

        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaCandPage.candidateStartMCQAndSubmit();
        await eluminaCandPage.clickOnAutoSubmitOKPopup();


        await newPage.locator('//div[@class="main-fx--container fx-left action-list"]//div[7]//div').click();
        await newPage.waitForTimeout(3000);
        await newPage.locator('//img[@class="proctoringImg"]').click();
        await newPage.locator('(//div[@class="candidate-name"]//div[1])[2]').click();
        await newPage.waitForTimeout(3000);
        let status = await newPage.locator('//div[@class="status"]').textContent();
        await newPage.waitForTimeout(3000);
        console.log("Candidate status:" + status);

        await newPage.close();
        await page1.close();
    });

});