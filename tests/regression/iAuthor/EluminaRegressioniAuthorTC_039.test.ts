import test from '@lib/BaseTest';

/**Validation of Create Question (SAQ / Essay) */

test(`iAU_TC_ID_39. @RegressionA Validation of Create Question (SAQ / Essay)`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.createSAQQuestion();
        await newtab.logoutClick()

    });

});
