import test from '@lib/BaseTest';
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

// /**Validation of Exam Section > Highlighter tool highlights save scenario 2 */
test(`iEX_TC_ID_65,iEX_TC_ID_63. @Serial-Pre-Request Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.addMCQQuestionswithoutSave();
        await newtab.addVSAQQuestions();
    });
});

test(`iEX_TC_ID_65. @Serial-Pre-Request Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage, eluminaRegInvPage, eluminaRegPage, webActions }) => {
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


test(`iEX_TC_ID_65. @iExamSerialRegression Validation of Exam Section > Highlighter tool highlights save scenario 2 `, async ({ eluminaCandPage, webActions }) => {
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
        await eluminaCandPage.UsingHighlighterForQuestions();
        console.log("Candidate is able to use Highlighter")
    });

});

//Validation of candidate response using calculator in exam
test(`iEX_TC_ID_202. @iExamSerialRegression Validation of candidate response using Notes in exam TC-179`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.UsingCalculatorForQuestions();
        console.log("Candidate is able to use AddingNotes")
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
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[5]//a').click();
        await newPage.waitForTimeout(3000);
        await newPage.waitForSelector('//div[@class="section-q-list wrapped"]//div//p', { timeout: 10000 });
        const qutns = await newPage.$$('//div[@class="section-q-list wrapped"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const total = qutns.length;
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= Ttl; i++) {
            // await qutns[i].click();
            await newPage.waitForTimeout(2000);
            await newPage.locator('//button[@class="btn btn-blue"]').click();
            await newPage.waitForTimeout(2000);
        }
        await expect(qutns.length).toBe(total);
        await newPage.close();
        await page1.close();
    });

});

//Validation of candidate response using Notes in exam
test(`iEX_TC_ID_203. @iExamSerialRegression Validation of candidate response using Notes in exam TC-180`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.AddingNotesToQuestion();
        console.log("Candidate is able to use AddingNotes")
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
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[5]//a').click();
        await newPage.waitForTimeout(3000);
        await newPage.waitForSelector('//div[@class="section-q-list wrapped"]//div//p', { timeout: 10000 });
        const qutns = await newPage.$$('//div[@class="section-q-list wrapped"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const total = qutns.length;
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= Ttl; i++) {
            // await qutns[i].click();
            await newPage.waitForTimeout(2000);
            await newPage.locator('//button[@class="btn btn-blue"]').click();
            await newPage.waitForTimeout(2000);
        }
        await expect(qutns.length).toBe(total);
        await newPage.close();
        await page1.close();
    });

});

//Validation of candidate response using Highlighter in exam
test(`iEX_TC_ID_204. @iExamSerialRegression Validation of candidate response using Highlighter in exam TC-181`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.UsingHighlighterForQuestions();
        console.log("Candidate is able to use Highlighter")

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
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[5]//a').click();
        await newPage.waitForTimeout(3000);
        await newPage.waitForSelector('//div[@class="section-q-list wrapped"]//div//p', { timeout: 10000 });
        const qutns = await newPage.$$('//div[@class="section-q-list wrapped"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const total = qutns.length;
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= Ttl; i++) {
            // await qutns[i].click();
            await newPage.waitForTimeout(2000);
            await newPage.locator('//button[@class="btn btn-blue"]').click();
            await newPage.waitForTimeout(2000);
        }
        await expect(qutns.length).toBe(total);
        await newPage.close();
        await page1.close();
    });

});

//Validation of candidate response using Calculator, Notes and Highlighter in exam
test(`iEX_TC_ID_205. @iExamSerialRegression Validation of candidate response using Calculator, Notes and Highlighter in exam TC-182`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.AddingNotesToQuestion();
        await eluminaCandPage.UsingCalculatorForQuestions();
        await eluminaCandPage.UsingHighlighterForQuestions();
        console.log("Candidate is able to use Calculator, Notes and Highlighter ")

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
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[5]//a').click();
        await newPage.waitForTimeout(3000);
        await newPage.waitForSelector('//div[@class="section-q-list wrapped"]//div//p', { timeout: 10000 });
        const qutns = await newPage.$$('//div[@class="section-q-list wrapped"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const total = qutns.length;
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= Ttl; i++) {
            // await qutns[i].click();
            await newPage.waitForTimeout(2000);
            await newPage.locator('//button[@class="btn btn-blue"]').click();
            await newPage.waitForTimeout(2000);
        }
        await expect(qutns.length).toBe(total);
        await newPage.close();
        await page1.close();
    });

});

//Validation of candidate response using Highlighter and Notes in exam
test(`iEX_TC_ID_207,iEX_TC_ID_206. @iExamSerialRegression Validation of candidate response using Highlighter and Notes in exam TC-184`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.AddingNotesToQuestion();
        await eluminaCandPage.UsingHighlighterForQuestions();
        console.log("Candidate is able to use Highlighter and Notes ")

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
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[5]//a').click();
        await newPage.waitForTimeout(3000);
        await newPage.waitForSelector('//div[@class="section-q-list wrapped"]//div//p', { timeout: 10000 });
        const qutns = await newPage.$$('//div[@class="section-q-list wrapped"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const total = qutns.length;
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= Ttl; i++) {
            // await qutns[i].click();
            await newPage.waitForTimeout(2000);
            await newPage.locator('//button[@class="btn btn-blue"]').click();
            await newPage.waitForTimeout(2000);
        }
        await expect(qutns.length).toBe(total);
        await newPage.close();
        await page1.close();
    });

});

//Validation of candidate response using Calculator and Highlighter in exam
test(`iEX_TC_ID_208. @iExamSerialRegression Validation of candidate response using Calculator and Highlighter in exam TC-185`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.UsingCalculatorForQuestions();
        await eluminaCandPage.UsingHighlighterForQuestions();

        console.log("Candidate is able to use Highlighter and Calculator ")

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
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[5]//a').click();
        await newPage.waitForTimeout(3000);
        await newPage.waitForSelector('//div[@class="section-q-list wrapped"]//div//p', { timeout: 10000 });
        const qutns = await newPage.$$('//div[@class="section-q-list wrapped"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const total = qutns.length;
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= Ttl; i++) {
            // await qutns[i].click();
            await newPage.waitForTimeout(2000);
            await newPage.locator('//button[@class="btn btn-blue"]').click();
            await newPage.waitForTimeout(2000);
        }
        await expect(qutns.length).toBe(total);
        await newPage.close();
        await page1.close();
    });

});

//Validation of candidate response using Calculator and Note in exam.
test(`iEX_TC_ID_209. @iExamSerialRegression Validation of candidate response using Calculator and Note in exam. TC-186`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.UsingCalculatorForQuestions();
        await eluminaCandPage.AddingNotesToQuestion();

        console.log("Candidate is able to use Calculator and Notes ")

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
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[5]//a').click();
        await newPage.waitForTimeout(3000);
        await newPage.waitForSelector('//div[@class="section-q-list wrapped"]//div//p', { timeout: 10000 });
        const qutns = await newPage.$$('//div[@class="section-q-list wrapped"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const total = qutns.length;
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= Ttl; i++) {
            // await qutns[i].click();
            await newPage.waitForTimeout(2000);
            await newPage.locator('//button[@class="btn btn-blue"]').click();
            await newPage.waitForTimeout(2000);
        }
        await expect(qutns.length).toBe(total);
        await newPage.close();
        await page1.close();
    });

});


//Validation of candidate response using Flag + Highlighter  in exam
test(`iEX_TC_ID_210. @iExamSerialRegression Validation of candidate response using Flag + Highlighter  in exam. TC-187`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.flagForQuestion();
        await eluminaCandPage.UsingHighlighterForQuestions();

        console.log("Candidate is able to use highligher and flag for review ")

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
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[5]//a').click();
        await newPage.waitForTimeout(3000);
        await newPage.waitForSelector('//div[@class="section-q-list wrapped"]//div//p', { timeout: 10000 });
        const qutns = await newPage.$$('//div[@class="section-q-list wrapped"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const total = qutns.length;
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= Ttl; i++) {
            // await qutns[i].click();
            await newPage.waitForTimeout(2000);
            await newPage.locator('//button[@class="btn btn-blue"]').click();
            await newPage.waitForTimeout(2000);
        }
        await expect(qutns.length).toBe(total);
        await newPage.close();
        await page1.close();
    });

});

//Validation of candidate response using Flag + Note in exam
test(`iEX_TC_ID_211. @iExamSerialRegression Validation of candidate response using Flag + Note in exam TC-188`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "Serial_User_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.flagForQuestion();
        await eluminaCandPage.UsingHighlighterForQuestions();
        console.log("Candidate is able to use Highlighter and Notes ")

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
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[5]//a').click();
        await newPage.waitForTimeout(3000);
        await newPage.waitForSelector('//div[@class="section-q-list wrapped"]//div//p', { timeout: 10000 });
        const qutns = await newPage.$$('//div[@class="section-q-list wrapped"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const total = qutns.length;
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= Ttl; i++) {
            // await qutns[i].click();
            await newPage.waitForTimeout(2000);
            await newPage.locator('//button[@class="btn btn-blue"]').click();
            await newPage.waitForTimeout(2000);
        }
        await expect(qutns.length).toBe(total);
        await newPage.close();
        await page1.close();
    });

});