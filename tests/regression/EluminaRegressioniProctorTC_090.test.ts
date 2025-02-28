import test from '@lib/BaseTest';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';

//Validation of Admin > Proctoring > Browser Check Link

test(` iProc_TC_ID_85A. @iProctorRegression Validation of Enable iProctor Extension`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam, webActions }) => {
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
        const newtab = await eluminaProctorExam.AdminPageNavigation();
        await newtab.clickOnProctoringInAdmin();
        await newtab.enterBrowserLink();
    });
});

test(` iProc_TC_ID_85B. @iProctorRegression Validation of Admin > Proctoring > Browser Check Link`, async ({ eluminaLoginPage, eluminaProctorReg, eluminaProctorCand, webActions }) => {
    await test.step('Candidate logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplication();
        await eluminaProctorCand.clickOnStartExamLink1();
        await eluminaProctorCand.troubleshootBrowserLink();
    });

});