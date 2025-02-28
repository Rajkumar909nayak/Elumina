import test from '@lib/BaseTest';

/*"Validation of Choose Question

Scenario- 5 -
Add 2x sessions (with duplicate sections)"*/


/**AM */
test.describe(() => {
    test(`iAU_TC_ID_142. @RegressionA "Validation of Choose Question
Scenario- 5 -
Add 2x sessions (with duplicate sections)"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaCandPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Elumina application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
            await eluminaLoginPage.verifyProfilePage();
        });
        await test.step(`Navigate to exam Tab and Create New Exam and add MCQ Questions`, async () => {
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
            await newtab.createSurveySectionWithoutSave("6");
            await newtab.clickOnSaveForEditQun()
            await newtab.createSurveyPageWithoutApprove();
            await newtab.logoutClick()

        });
    });


    /**PM */
    test(`iAU_TC_ID_142B. @RegressionA "Validation of Choose Question
Scenario- 5 -
Add 2x sessions (with duplicate sections)"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaCandPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Elumina application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
            await eluminaLoginPage.verifyProfilePage();
        });
        await test.step(`Navigate to exam Tab and Create New Exam and add MCQ Questions`, async () => {
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
            await newtab.createSurveySectionWithoutSave("6");
            await newtab.clickOnSaveForEditQun()
            await newtab.createSurveyPageWithoutApprove();
            await newtab.logoutClick()

        });
    });
});