import test from '@lib/BaseTest';

/**Validation of Exam Version History  */

test(`iAU_TC_ID_163. @RegressionA Validation of Exam Version History `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.ExamsMenuClick();
        await newtab.ValidationOfCompareVersion();
        await newtab.validationOfVersionHistory();
        await newtab.logoutClick()
    });

});