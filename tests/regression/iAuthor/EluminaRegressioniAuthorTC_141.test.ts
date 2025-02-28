import test from '@lib/BaseTest';

/**"Validation of Choose Question

Scenario- 4 -
Add 4x sections (i.e Content + Exam 1 Section + Exam 2 Section + Exam 3 Section + Survey Section)"*/

test(`iAU_TC_ID_141. @RegressionA "Validation of Choose Question
Scenario- 4 -
Add 4x sections (i.e Content + Exam 1 Section + Exam 2 Section + Exam 3 Section + Survey Section)"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
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
        await newtab.createSection("1", "30")
        await newtab.settingPassPercentage()
        await newtab.clickOnSaveForEditQun()
        await newtab.addVSAQQuestionswithoutNextForEditQun()
        await newtab.createSection("1", "30")
        await newtab.settingPassPercentage()
        await newtab.clickOnSaveForEditQun()
        await newtab.addVSAQQuestionswithoutNextForEditQun2()
        await newtab.createSurveySectionWithoutSave("6");
        await newtab.clickOnSaveForEditQun()
        await newtab.createSurveyPageWithoutApprove();
        await newtab.logoutClick()
    });
});