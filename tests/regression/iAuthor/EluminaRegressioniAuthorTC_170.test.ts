import test from '@lib/BaseTest';

/**Validation of Exam Delete */

test(`iAU_TC_ID_170. @RegressionA Validation of Exam Delete `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.ValidationOfExamDelete();
        await newtab.logoutClick()
    });
});