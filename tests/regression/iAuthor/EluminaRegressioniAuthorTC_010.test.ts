import test from '@lib/BaseTest';

/**Validation of Login using Invalid credentials Scenario 3 */

test(`[T2792] @RegressionA Validation of Login using Invalid credentials Scenario 3`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaCreateQuestionsPage.invalidloginCredential();
    });
    await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
        await eluminaCreateQuestionsPage.verifyInvalidUserPopup();
    });

});