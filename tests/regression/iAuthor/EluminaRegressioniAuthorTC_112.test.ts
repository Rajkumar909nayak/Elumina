import test from '@lib/BaseTest';

/**Validation of Edit Blueprint */

test(`iAU_TC_ID_112A. @RegressionA Validation of Question  No Workflow  `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.BlueprintMenuClick()
        await newtab.createBluePrint()
    });

});

test(`iAU_TC_ID_112. @RegressionA Validation of Edit Blueprint`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.BlueprintMenuClick();
        await newtab.EditBlueprintQuestion();
    });
});
