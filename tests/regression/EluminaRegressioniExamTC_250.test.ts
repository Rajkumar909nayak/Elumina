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

test(`Exam_Prerequisit_for_iEX_TC_ID_122., iEX_TC_ID_123. @Serial-Pre-Request Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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

test(`Exam_Prerequisit_for_iEX_TC_ID_122., iEX_TC_ID_123. @Serial-Pre-Request Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
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

test(`iEX_TC_ID_239'. @iExamSerialRegression Verify Validation of Browser back button on Candidate Dashboard`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
        await eluminaCandPage.waitforTime();
        await eluminaCandPage.waitforTime();
        await eluminaCandPage.waitforTime();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.navigateBackFromExamattendPage();
    });
});


test(`iEX_TC_ID_130. @iExamSerialRegression Validation of Exam Invigilator Live monitor`, async ({ eluminaInvPage, webActions }) => {
    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.invigilatorLogin();
    });
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        await newtab.invDashboardValidations();
    });
});


test(`iEX_TC_ID_146. @iExamSerialRegression Validation of Long Essay Response (more than 200 lines)`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateAttendsOneVSAQ(20000);
        await eluminaCandPage.waitforTime2();
    });
    await test.step('Invigilator Login start the exam', async () => {

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
        await newPage.waitForTimeout(3000);
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[5]//a').click();
        await newPage.waitForTimeout(2000);

        await newPage.close();
        await page1.close();

    });
});

test('iEX_TC_ID_154,iEX_TC_ID_155,iEX_TC_ID_156,iEX_TC_ID_157. @iExamSerialRegression Validation of Refresh Live Monitor and status Auto update ', async ({ eluminaCandPage, eluminaCadInvPage, eluminaProctorCand, webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Tap on Refresh button and check the Time update', async () => {
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
        await newPage.waitForTimeout(3000);
        let time = await newPage.locator('(//tbody[@class="tableBody"]//tr//td//span)[11]').textContent();
        let a = time.split(':')[0];
        var Hrs: number = +a;
        console.log(Hrs)
        let b = time.split(':')[2];
        var Mins: number = +b;
        console.log(Mins)
        await newPage.locator('//div[@class="action-item refresh"]//div').click();
        await newPage.waitForTimeout(1000);
        let time1 = await newPage.locator('(//tbody[@class="tableBody"]//tr//td//span)[11]').textContent();
        let c = time1.split(':')[0];
        var HrsAfterRefresh: number = +c;
        console.log(HrsAfterRefresh)
        let d = time1.split(':')[2];
        var MinsAfterRefresh: number = +d;
        console.log(MinsAfterRefresh);
        expect(HrsAfterRefresh).toBe(Hrs);
        expect(MinsAfterRefresh).toBeLessThan(Mins);
        let status = await newPage.locator('(//tbody[@class="tableBody"]//tr//td//span)[7]').textContent();
        expect(status).toEqual('In Progress');
        await newPage.locator('(//div[@class="msdd-triangle open msdd-triangle-down"])[3]').click();
        await newPage.locator('//span[text()="Exam Paused"]').click();
        await newPage.locator('(//div[@class="msdd-triangle open msdd-triangle-up"])').click();
        await newPage.locator('//div[@class="action-item"]').click();
        await newPage.waitForTimeout(2000);
        const locator = newPage.locator('(//tbody[@class="tableBody"]//tr//td//span)[7]');
        await expect(locator).toBeHidden();
        await newPage.locator('(//div[@class="msdd-triangle open msdd-triangle-down"])[3]').click();
        await newPage.locator('//span[text()="Exam Paused"]').click();
        await newPage.locator('//span[text()="In Progress"]').click();
        await newPage.locator('(//div[@class="msdd-triangle open msdd-triangle-up"])').click();
        await newPage.locator('//div[@class="action-item"]').click();
        await newPage.waitForTimeout(2000);
        let status1 = await newPage.locator('(//tbody[@class="tableBody"]//tr//td//span)[7]').textContent();
        expect(status1).toEqual('In Progress');
        await newPage.close();
        await page1.close();
    });

});


test('iEX_TC_ID_153. @iExamSerialRegression Validation of Add Notes in Live Monitor ', async ({ eluminaCandPage, eluminaCadInvPage, eluminaProctorCand, webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Invigilator enters the note and save the save', async () => {
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
        await newPage.waitForTimeout(3000);
        await newPage.locator('//span[@class="thtext"]//input[@type="checkbox"]').click();
        await newPage.waitForTimeout(2000);
        await newPage.locator('//a[@class="dropdown-toggle"]').click();
        await newPage.waitForTimeout(2000);
        await newPage.locator('(//p[@class="more-dropdown small-line-height"])[5]').click();
        await newPage.locator('(//div[@class="modal-footer"]//button)[2]').click();
        await newPage.waitForTimeout(2000);
        await newPage.locator('//div[@class="labelVal-Create reqLabel"]//textarea').type(testData.Note);
        await newPage.waitForTimeout(2000);
        await newPage.locator('//div[@class="form-footer"]//button[text()="Save"]').click();
        await newPage.waitForTimeout(2000);
        let saveMessage = await newPage.locator('//div[@class="content-side"]//span');
        await expect(saveMessage).toContainText('Notes has been updated successfully');
        await newPage.close();
        await page1.close();
    })
});

test(`iEX_TC_ID_122. @iExamSerialRegression Validation of exam paused for Candidate `, async ({ eluminaCandPage, eluminaCadInvPage, eluminaProctorCand, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {

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
        await newPage.waitForTimeout(3000);
        await newPage.locator('//span[@class="thtext"]//input[@type="checkbox"]').click();
        await newPage.locator('//div[@class="action-item control-item pause-exam"]').click();
        await newPage.locator('(//button[text()="Yes"])[3]').click();
        await newPage.waitForTimeout(2000);

        let pauseExamSuccessMessage = await newPage.locator('//div[@class="content-side"]//span').textContent();
        let successMessage = pauseExamSuccessMessage.split('(s)')[0].toString();
        console.log(successMessage);
        expect(successMessage).toEqual(expect.stringContaining("Exam paused successfully for candidate"));

        await newPage.close();
        await page1.close();

    });
    await test.step(`Redirected to Candidate page`, async () => {
        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.pauseExamValidation();
        await eluminaCandPage.waitforTime4();
    });
});


test(`iEX_TC_ID_142,iEX_TC_ID_143. @iExamSerialRegression Validation of Exam Invigilator Live monitor > Extend Timer.  (Individual Candidate)  Extend Candidate Exam beyond session end date/time `, async ({ eluminaCandPage, webActions }) => {
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
        await newPage.waitForTimeout(3000);
        await newPage.locator('//div[@class="main-fx--container fx-left action-list"]//div[7]//div').click();
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr//td[2]//input').click();
        await newPage.locator('//div[@title="Extend Exam for all Candidates"]').click();
        await newPage.locator('(//button[text()="Yes"])[2]').click();
        await newPage.waitForTimeout(3000);

        await newPage.locator('//div[@class="col-12 nested"]//span[@class="col-8"]//div[@class="btn-selected-list"]').click();
        await newPage.locator('(//li[@class="open"]//div[@class="open container-left-padding"]//span[@class="open"])[3]').click();
        await newPage.locator('//div[@class="col-12 nested"]//span[@class="col-8"]//input[2]').click();
        await newPage.locator('//div[@class="col-12 nested"]//span[@class="col-8"]//input[1]').type('20');
        await newPage.waitForTimeout(5000);
        await newPage.locator('//button[@class="theme-btn theme-primary-btn"]').click();
        await newPage.waitForTimeout(5000);
        let extendExamSuccessMessage = await newPage.locator('//div[@class="content-side"]//span').textContent();
        let successMessage = extendExamSuccessMessage.split('(s)')[0].toString();
        console.log(successMessage);
        expect(successMessage).toEqual(expect.stringContaining("Time extended successfully for candidate"));

        await newPage.close();
        await page1.close();

    });
    await test.step(`again navigate to candidate page`, async () => {
        await eluminaCandPage.againCandidateLogin();
        await eluminaCandPage.verifyExamDashboardTimer();
    });
});

test(`iEX_TC_ID_123,iEX_TC_ID_140. @iExamSerialRegression Verify Validation of Extending Exam`, async ({ eluminaCandPage, webActions }) => {
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
        await newPage.waitForTimeout(3000);
        await newPage.locator('//div[@class="main-fx--container fx-left action-list"]//div[7]//div').click();
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr//td[2]//input').click();
        await newPage.locator('//div[@title="Extend Exam for all Candidates"]').click();
        await newPage.locator('(//button[text()="Yes"])[2]').click();
        await newPage.waitForTimeout(3000);

        await newPage.locator('//div[@class="col-12 nested"]//span[@class="col-8"]//div[@class="btn-selected-list"]').click();
        await newPage.locator('(//li[@class="open"]//div[@class="open container-left-padding"]//span[@class="open"])[3]').click();
        await newPage.locator('//div[@class="col-12 nested"]//span[@class="col-8"]//input[2]').type('1');
        await newPage.waitForTimeout(3000);
        await newPage.locator('(//div[@class="col-12 nested"]//span[@class="col-8"]//input)[2]').click();
        await newPage.locator('(//div[@class="col-12 nested"]//span[@class="col-8"]//input)[2]').type('2');
        await newPage.locator('//button[@class="theme-btn theme-primary-btn"]').click();
        await newPage.waitForTimeout(8000);
        let extendExamSuccessMessage = await newPage.locator('//div[@class="content-side"]//span').textContent();
        let successMessage = extendExamSuccessMessage.split('(s)')[0].toString();
        console.log(successMessage);
        expect(successMessage).toEqual(expect.stringContaining("Time extended successfully for candidate"));

        await newPage.close();
        await page1.close();

    });
});

test(`iEX_TC_ID_138. @iExamSerialRegression Validation of Exam Invigilator Live monitor > Resume exam.  (Individual Candidate) `, async ({ eluminaCandPage, eluminaProctorCand, eluminaCadInvPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {

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
        await newPage.waitForTimeout(3000);
        await newPage.locator('//table[@class="table table-spacing"]//thead//tr//th[2]//input').click();
        await newPage.locator('//div[@title="Resume Exam for all Candidates"]').click();
        await newPage.locator('(//button[text()="Yes"])[2]').click();
        await newPage.waitForTimeout(8000);
        let resumeExamSuccessMessage = await newPage.locator('//div[@class="content-side"]//span').textContent();
        let successMessage = resumeExamSuccessMessage.split('(s)')[0].toString();
        console.log(successMessage);
        expect(successMessage).toEqual(expect.stringContaining("Exam resumed successfully for candidate"));

        await newPage.close();
        await page1.close();

    });

    await test.step(`Redirected to Candidate page`, async () => {
        await eluminaCadInvPage.againCandidateLogin();
        await eluminaProctorCand.resumeExamValidation();
        await eluminaCandPage.waitforTime4();

    });
});

test(`iEX_TC_ID_124,iEX_TC_ID_134. @iExamSerialRegression Verify Validation of "Lock Exam" from Live monitor Proctor `, async ({ eluminaCandPage, eluminaCadInvPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
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
        await newPage.locator('//table[@class="table table-spacing"]//thead//tr//th[2]//input').click();
        await newPage.locator('//div[@class="main-fx--container fx-left action-list"]//div[5]').click();
        await newPage.locator('(//button[text()="Yes"])[2]').click();
        await newPage.waitForTimeout(5000);
        let lockExamSuccessMessage = await newPage.locator('//div[@class="content-side"]//span').textContent();
        let successMessage = lockExamSuccessMessage.split('(s)')[0].toString();
        console.log(successMessage);
        expect(successMessage).toEqual(expect.stringContaining("Exam locked successfully for candidate"));

        await newPage.close();
        await page1.close();

    });

    await test.step(`Redirected to Candidate page`, async () => {
        await eluminaCadInvPage.againCandidateLogin();
        await eluminaCadInvPage.lockCandidateValidation();
        await eluminaCandPage.waitforTime4();
    });
});


test(`iEX_TC_ID_136. @iExamSerialRegression Validation of Exam Invigilator Live monitor > Terminate exam.  (Individual Candidate)"  `, async ({ eluminaCandPage, eluminaCadInvPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");

    });
    await test.step('Candidate start the exam', async () => {
        //await eluminaCandPage.candidateStartMCQ();
        await eluminaCandPage.examSectionValidation()

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
        await newPage.locator('//table[@class="table table-spacing"]//thead//tr//th[2]//input').click();
        await newPage.locator('//div[@title="Resume Exam for all Candidates"]').click();
        await newPage.locator('(//button[text()="Yes"])[2]').click();
        await newPage.waitForTimeout(8000);
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
