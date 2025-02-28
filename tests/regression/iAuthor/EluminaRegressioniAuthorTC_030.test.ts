import test from '@lib/BaseTest';

/**Validation of Questions list page(Negative Scenario) */
test(`iAU_TC_ID_30. @RegressionA Validation of Questions list page(Negative Scenario) `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.questionTabNavigation();
        await newtab.enterInvalidQutn();
        await newtab.validateFilter()
        // await newtab.uncheckAllQutnColumns()
        await newtab.clickOnApproved()
        await newtab.validateQuestionDelete()
        await newtab.logoutClick()

    });
});