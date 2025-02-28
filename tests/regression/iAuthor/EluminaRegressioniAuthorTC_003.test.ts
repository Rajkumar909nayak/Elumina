import test from '@lib/BaseTest';

/**Validation of Empty Field validation */

test(`[T2785] @RegressionA Validation of Empty Field validation`, async ({ eluminaLoginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.logintoAppwithEmptyfields();
    });
});
