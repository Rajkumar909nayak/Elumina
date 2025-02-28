import test from '@lib/BaseTest';

/**Validation of Client Logo and name, color, font size and font type of different elements in the login page */

test(`[T2784] @RegressionA Validation of Client Logo and name, color, font size and font type of different elements in the login page`, async ({ eluminaLoginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Validation of logo`, async () => {
        await eluminaLoginPage.validationOfLogo();
    });
});
