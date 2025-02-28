import test from '@lib/BaseTest';

/**Validation of Create Exam – How do you want to get started ?: */
test(`iAU_TC_ID_129. @RegressionA Validation of Create Exam – How do you want to get started ?:`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.clickOnCreateExam();
        await newtab.verifyExamPage();
        await newtab.logoutClick()

    });
});