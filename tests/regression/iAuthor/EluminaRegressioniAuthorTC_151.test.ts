import test from '@lib/BaseTest';

/*"Validation of Choose Question

Scenario- 5 -
Add 2x sessions (with duplicate sections)"*/


/**AM */
test(`iAU_TC_ID_151. @RegressionA "Validation of Choose Question
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
        await newtab.createSurveySection("6");
        await newtab.createSurveyPage();
        await newtab.logoutClick()

    });
});


/**PM */
test(`iAU_TC_ID_151B. @RegressionA "Validation of Choose Question
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
        await newtab.createSurveySection("6");
        await newtab.createSurveyPage();
        await newtab.logoutClick()

    });
});