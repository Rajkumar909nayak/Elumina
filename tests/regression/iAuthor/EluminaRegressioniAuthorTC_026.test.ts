import test from '@lib/BaseTest';

/**Validation of Rate Limit Login */
test(` iAU_TC_ID_26. @RegressionA Validation of Rate Limit Login`, async ({ eluminaLoginPage, eluminaCandPage, eluminaProctorCand, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.RateloginattemptcheckAsAdmin();
    });

});