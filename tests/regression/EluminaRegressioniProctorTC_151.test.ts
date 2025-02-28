import test from '@lib/Fixtures';
import test1 from '@lib/BaseTest';
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


/** Validation of different Question types - Able to Answer all types EluminaRegressioniProctorTC_036*/

test(` Exam_Prerequisit_for_iProc_TC_ID_35. @iProctorRegression Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.createProctorExam();
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

test(` Exam_Prerequisit_for_iProc_TC_ID_35. @iProctorRegression Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage, eluminaProctorReg, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaProctorReg.iAuthorPageNavigations();
        await newtab.registrationTabNavigationfromIExamPage();
        await newtab.addMultipleUserDetails();
        await newtab.BulkDownloadUserDetails();
        await newtab.addExistingUsers();
        await newtab.searchCandidate();
    });
});


test(` iProc_TC_ID_35. @iProctorRegression Validation of different Question types - Able to Answer all types EluminaRegressioniProctorTC_036`, async ({ eluminaCandPage, eluminaProctorCand, webActions }) => {
    await test.step('logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaCandPage.waitforTime();
        await eluminaCandPage.waitforTime();
        await eluminaProctorCand.candidateLoginToApplications(2);
    });

    await test.step(`Candidate Login to application`, async () => {
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
        await newPage.close();
        await page1.close();

        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateAttendsAllQVSAQ(100);
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ(100);
        await eluminaCandPage.candidateStartSJT();

    });


});

test(`iProc_TC_ID_33. @iProctorRegression Validation of Exam Section > Highlighter tool highlights save scenario 1`, async ({ eluminaCandPage, eluminaProctorCand, webActions }) => {
    await test.step('logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications(2);
    });

    await test.step(`Candidate Login to application`, async () => {
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
        await newPage.close();
        await page1.close();

        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateAttendsAllQVSAQ(100);
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ(100);
        await eluminaCandPage.UsingHighlighterForQuestions();
        await eluminaCandPage.candidateStartSJT()
        await eluminaCandPage.clickonPrevious()

    });
});

test(`iProc_TC_ID_36. @iProctorRegression Validating of VSAQ - Maximum number of lines that can be written`, async ({ eluminaCandPage, eluminaProctorCand, webActions }) => {
    await test.step('logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications(2);
    });

    await test.step(`Candidate Login to application`, async () => {
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
        await newPage.close();
        await page1.close();

        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateAttendsAllQVSAQ(2000);

    });
});

test(`iProc_TC_ID_104. @iProctorRegression Validation of Candidate > Peripheral verification > Verify Identity > PASS`, async ({ eluminaCandPage, eluminaProctorCand, webActions }) => {
    await test.step('logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications(2);
    });

    await test.step(`Candidate Login to application`, async () => {
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
        await newPage.close();
        await page1.close();

        await eluminaProctorCand.againCandidateLogin();
    });
});

test1(`iProc_TC_ID_142A. @iProctorRegression Validation of iProctor Extension Troubleshoot link validation.TC-73`, async ({ eluminaProctorCand, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaProctorCand.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.candidateLoginToApplications(2);
        await eluminaProctorCand.clickOnStartExamLink1();
        await eluminaProctorCand.clickOniProctorExtensionTroubleshoot()
        await eluminaCandPage.waitforTime3();
    });
});

test(`iProc_TC_ID_142B. @iProctorRegression Validation of iProctor Extension Troubleshoot link validation`, async ({ eluminaProctorCand, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaProctorCand.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.candidateLoginToApplications(2);
        await eluminaProctorCand.clickOnStartExamLink1();
    });
});

test(`iProc_TC_ID_30. @iProctorRegression Validation of Exam Section> Image Inline viewer `, async ({ eluminaProctorCand, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaProctorCand.candidateNavigateToURL();
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
        let candId = await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[7]').textContent();
        console.log(candId);
        await newPage.waitForTimeout(3000);
        await newPage.close();
        await page1.close();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaCandPage.candidateStartSixVSAQwithViewer();
    });

});


test(`iProc_TC_ID_44. @iProctorRegression Validation of  Cloud indication -  (Status is InCompleted)`, async ({ eluminaCandPage, eluminaProctorCand, webActions }) => {
    await test.step('logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications(2);
    });

    await test.step(`Candidate Login to application`, async () => {
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
        await newPage.close();
        await page1.close();

        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.downloadingCloudIcon()
        await eluminaCandPage.setOffline(true);
        await eluminaCandPage.incompleteQuestionDownloadingIcon();

    });

});


