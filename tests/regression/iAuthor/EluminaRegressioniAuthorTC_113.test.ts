import test from '@lib/BaseTest';

/**"Validation of Edit Blueprint(Negative Scenarios)"*/
test(`iAU_TC_ID_113. @RegressionA "Validation of Edit Blueprint(Negative Scenarios)".`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
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
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.BlueprintMenuClick();
        await newtab.searchBlueprintQuestion();
        await newtab.clickOnCancelBtn()
        await newtab.validationOfClickOnOtherModule();
        await newtab.validationOfBackArrowBtn()
        await newtab.closeTabValidation()

    });
});