import test from '@lib/BaseTest';

/**Validation of Manage Delivery page Left side Panel. */

test(`iAU_TC_ID_178. @RegressionA Validation of Manage Delivery page Left side Panel. `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.deliveryMenuClick();
        await newtab.examLinkClick();
        await newtab.manageDeliveries();
        await newtab.logoutClick()
    });
});