import test from '@lib/BaseTest';

/**Validation of Delivery->Manage Delivery page via Exam name link.    */

test(`iAU_TC_ID_176. @RegressionA Validation of Delivery->Manage Delivery page via Exam name link.`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
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
        await newtab.validateCandidatedashboradinManageDelivery();
        await newtab.logoutClick()

    });
});