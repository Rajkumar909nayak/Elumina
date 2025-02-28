import test from '@lib/BaseTest';

/**"Validation of Choose Question

Scenario- 3 -
Add 3 sections (i.e. Content + Exam 1 Section + Exam 2 Section with Survey)"*/

test(`iAU_TC_ID_156. @RegressionA "Validation of Choose Question Scenario- 3 -
Add 3 sections (i.e. Content + Exam 1 Section + Exam 2 Section with Survey)"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
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
        await newtab.searchAndSelectBlueprintQtn();
        await newtab.createExam()
        await newtab.selectAllToolsAndVerifyMsg()
        await newtab.createContentSection("1");
        await newtab.createContentPage();
        await newtab.createSection("1", "30")
        await newtab.clickOnSave()
        await newtab.addVSAQQuestionswithoutNext()
        await newtab.createSurveySection("6");
        await newtab.createSurveyPage();
        await newtab.logoutClick()

    });

});
