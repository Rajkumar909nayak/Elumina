import test from '@lib/BaseTest';

/**Validation of copy paste in password field*/
test(`[iAU_TC_ID_16] @RegressionA Validation of copy paste in password field `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });

});