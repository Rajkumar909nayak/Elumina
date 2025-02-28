import test from '@lib/BaseTest';

/**Validation of Login using valid credentials in browser offline */
test(`[iAU_TC_ID_13] @RegressionA Validation of Login using valid credentials in browser offline. `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURLOffline();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
        await eluminaLoginPage.validationOfOfflineMessage()
    });

});