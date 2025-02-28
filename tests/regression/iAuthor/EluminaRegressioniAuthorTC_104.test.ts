import test from '@lib/BaseTest';

/**Validation of Question Duplicate */
test.describe(() => {
    test(`iAU_TC_ID_104. @RegressionA Create Question`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to iAuthor`, async () => {
            const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
            await newtab.QuestionsMenuClick();
            await newtab.createMCQQuestions();
            await newtab.logoutClick()

        });
    });

    test(`iAU_TC_ID_104A. @RegressionA Validation of Question Duplicate`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to iAuthor`, async () => {
            const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
            await newtab.QuestionsMenuClick();
            await newtab.ValidationQuestionArchive();
        });
    });
});