import test from '@lib/BaseTest';

/**"Validation of Choose Question

Scenario- 4 - Add 1x Session (i.e AM Session) and
Add 4x sections (i.e Content + Exam 1 Section + Exam 2 Section + Exam 3 Section + Survey Section)"*/

test(`iAU_TC_ID_135. @RegressionA "Validation of Choose Question Scenario- 4 - Add 1x Session (i.e AM Session) and
Add 4x sections (i.e Content + Exam 1 Section + Exam 2 Section + Exam 3 Section + Survey Section)"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
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
        await newtab.createContentSection("1");
        await newtab.createContentPage();
        await newtab.createSection("1", "30")
        await newtab.settingPassPercentage()
        await newtab.clickOnSave()
        await newtab.addVSAQQuestionswithoutNext()
        await newtab.createSection("1", "0")
        await newtab.settingPassPercentage()
        await newtab.clickOnSave()
        await newtab.addMCQuestionswithoutNext2()
        await newtab.createSection("1", "0")
        await newtab.settingPassPercentage()
        await newtab.clickOnSave()
        await newtab.addVSAQuestionswithoutNext3()
        await newtab.createSurveySection("6");
        await newtab.createSurveyPage();
        await newtab.logoutClick()
    });
});