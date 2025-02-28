import test from '@lib/BaseTest';

/**Validation of Login using Invalid credentials Scenario 1 */

test(`iAU_TC_ID_21. @RegressionA Validation of Login using Invalid credentials Scenario 1`, async ({ eluminaLoginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.clickOnForgotPassword();
    });
});

test(`iAU_TC_ID_23. @RegressionA Validation of Forgot Password Page Email field.`, async ({ eluminaLoginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.Validation_of_Forgot_Password_Email();
    });
});
