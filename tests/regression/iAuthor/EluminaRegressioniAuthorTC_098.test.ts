import test from '@lib/BaseTest';

/**Validation of Question  Version Histroy */

test(`iAU_TC_ID_98. @RegressionA Validation of Question  Version Histroy `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.validateEditQuestion();
        await newtab.validationOfVersionHistory();
    });

});