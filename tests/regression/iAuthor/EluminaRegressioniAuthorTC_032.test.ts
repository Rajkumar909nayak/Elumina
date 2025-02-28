import test from '@lib/BaseTest';

/**Validation of Create Question (MCQ-SBA) */

test(`iAU_TC_ID_32. @RegressionA Validation of Create Question (MCQ-SBA)`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
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
