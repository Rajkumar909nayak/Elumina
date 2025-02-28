import test from '@lib/BaseTest';

/**Validation of Create Exam – Start from scratch(Negative Scenario)*/
test(`iAU_TC_ID_131. @RegressionA Validation of Create Exam – Start from scratch(Negative Scenario)`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
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
        await newtab.withoutSelectingDate()
        await newtab.withoutClickOnAdd()
        await newtab.clickOnAddandclickOnNext()
        await newtab.selectAllToolswithCreated()
        await newtab.logoutClick()

    });
});