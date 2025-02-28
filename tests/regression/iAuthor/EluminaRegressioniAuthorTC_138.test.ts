import test from '@lib/BaseTest';

/**"Validation of Choose Question

Scenario- 1 -
Add 1x Session (i.e Exam Section Only)"*/

test(`iAU_TC_ID_138. @RegressionA "Validation of Choose Question Scenario- 1 - Add 1x Session (i.e Exam Section Only)"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
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
        await newtab.createSection("1", "30")
        await newtab.settingPassPercentage()
        await newtab.clickOnSaveForEditQun()
        await newtab.addVSAQQuestionswithoutNextForEditQun()
        await newtab.logoutClick()
    });
});