import test from '@lib/BaseTest';

/**Validation of Delivery list page   */

test(`iAU_TC_ID_174. @RegressionA Validation of Delivery list page`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.deliveryMenuClick();
        await newtab.validationDelivery();
        await newtab.logoutClick()
    });
});