import test from '@lib/BaseTest';

/**"Validation of Edit Question(Negative Scenarios)"*/
test(`iAU_TC_ID_94. @RegressionA "Validation of Edit Question(Negative Scenarios)".`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
        await eluminaLoginPage.verifyProfilePage();
    });
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.searchQuestion();
        await newtab.clickOnCancelBtn()
        await newtab.validationOfClickOnOtherModule();
        await newtab.validationOfBackArrowBtn()
        await newtab.closeTabValidation()

    });
});