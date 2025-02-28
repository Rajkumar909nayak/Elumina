import test from '@lib/BaseTest';

/**Validation of Question Checkout and delete which is attached to the Approved / Archived Exam. */
test(`iAU_TC_ID_96. @RegressionA Validation of Question Checkout and delete which is attached to the Approved / Archived Exam. `, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
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
        await newtab.createSection("1", "30")
        await newtab.clickOnSave()
        await newtab.addVSAQQuestions()
        await newtab.clickOnQuestionMenuTab()
        await newtab.searchApprovedQuestions()
        await newtab.validateFilter()
        await newtab.clickOnQuestionID()
        await newtab.tryToDeleteTheExamAddedQutn()
        await newtab.logoutClick()

    });
});