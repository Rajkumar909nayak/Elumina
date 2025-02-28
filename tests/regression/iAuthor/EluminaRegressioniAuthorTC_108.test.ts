import test from '@lib/BaseTest';

/**Validation of Blueprints list page(Negative Scenario)*/

test(`iAU_TC_ID_108. @RegressionA Validation of Blueprints list page(Negative Scenario)`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.BlueprintMenuClick();
        await newtab.enterInvalidBluePrintQutn();
        await newtab.validateFilter()
        // await newtab.uncheckAllQutnColumns()
        await newtab.clickOnBluePrintApproved()
        await newtab.validateBlueprintQuestionDelete()
        await newtab.logoutClick()



    });
});
