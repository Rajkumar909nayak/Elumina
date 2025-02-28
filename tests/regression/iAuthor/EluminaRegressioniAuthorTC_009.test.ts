import test from '@lib/BaseTest';

/**Validation of Login using Invalid credentials Scenario 1 */

test(`[T2791] @RegressionA Validation of Login using Invalid credentials Scenario 1`, async ({ eluminaLoginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.loginToApplicationwithInvaildPassword();
    });
});
