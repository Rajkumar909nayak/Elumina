import test from '@lib/BaseTest';

/**"Validation of Choose Question

Scenario- 2 -
Add 2x Sessions ( i.e. Content + Exam 1 Section)""*/

test(`iAU_TC_ID_139. @RegressionA "Validation of Choose Question
Scenario- 2 -
Add 2x Sessions ( i.e. Content + Exam 1 Section)"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.clickOnCreateExam();
        await newtab.clickOnCopyExistingExam()
        await newtab.clickOnMore()
        await newtab.editDateForDuplicateExam()
        await newtab.clickOnSave()
        await newtab.clickOnQuestion()
        await newtab.removeSectionsAll()
        await newtab.createContentSectionwithoutSave("1");
        await newtab.clickOnSaveForEditQun()
        await newtab.createContentPagewithoutSave();
        await newtab.clickOnSaveForEditQun()
        await newtab.createSection("1", "0")
        await newtab.settingPassPercentage()
        await newtab.clickOnSaveForEditQun()
        await newtab.addVSAQQuestionswithoutNextForEditQun()
        await newtab.logoutClick()
    });
});