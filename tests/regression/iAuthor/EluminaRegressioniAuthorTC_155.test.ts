import test from '@lib/BaseTest';

/**"Validation of Choose Question

Scenario- 2 -
Add 2x Sessions ( i.e. Content + Exam 1 Section)"*/

test(`iAU_TC_ID_155. @RegressionA "Validation of Choose Question Scenario- 2 -
Add 2x Sessions ( i.e. Content + Exam 1 Section)"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
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
        await newtab.addVSAQQuestions()
        await newtab.logoutClick()

    });

});
