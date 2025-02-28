import test from '@lib/BaseTest';

/**"Validation of Choose Question

Scenario- 4 -
Add 4x sections (i.e Content + Exam 1 Section + Exam 2 Section + Exam 3 Section + Survey Section)"*/

test(`iAU_TC_ID_150. @RegressionA "Validation of Choose Question
Scenario- 4 -
Add 4x sections (i.e Content + Exam 1 Section + Exam 2 Section + Exam 3 Section + Survey Section)"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.clickOnCreateExam();
        await newtab.clickOncopyTemplate()
        await newtab.clickOnAddandclickOnNext()
        await newtab.selectAllToolswithCreated()
        await newtab.editTime()
        await newtab.clickOnSave()
        await newtab.createContentSection("1");
        await newtab.createContentPage();
        await newtab.createSection("1", "30")
        await newtab.clickOnSave()
        await newtab.addVSAQQuestionswithoutNext()
        await newtab.createSection("1", "0")
        await newtab.clickOnSave()
        await newtab.addMCQuestionswithoutNext2()
        await newtab.createSection("1", "0")
        await newtab.clickOnSave()
        await newtab.addVSAQuestionswithoutNext3()
        await newtab.createSurveySection("6");
        await newtab.createSurveyPage();
        await newtab.logoutClick()
    });

});