import test from '@lib/BaseTest';

/**Validation of Create Exam – Start from scratch */
test(`iAU_TC_ID_130. @RegressionA Validation of Create Exam – Start from scratch`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
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
        await newtab.verifyExamPage()
        await newtab.clickOnScratchFromExam()
        await newtab.createExam()
        await newtab.selectAllToolswithCreated()
        await newtab.logoutClick()

    });
});