import test from '@lib/BaseTest';

/**Validation of Edit an Exam Section ( Previleges: Applicable only for Exam Admin)*/

test(`iAU_TC_ID_160. @RegressionA Validation of Edit an Exam Section ( Previleges: Applicable only for Exam Admin)`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.searchDraftExam();
        await newtab.editDate()
        await newtab.editQuestion()
        await newtab.removeSections()
        await newtab.createSection("1", "30")
        await newtab.clickOnSaveForEditQun()
        await newtab.addVSAQQuestionswithoutNextForEditQun()
        await newtab.logoutClick()
    });
});
