import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';

//Validation of Internet Connection Check

test(` iProc_TC_ID_89. @iProctorRegression Validation of Internet Connection Check`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam, webActions }) => {
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
        await newtab.clickOnInternetConnectionCheck();

    });
});  