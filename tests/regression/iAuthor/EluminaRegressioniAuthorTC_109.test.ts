import test from '@lib/BaseTest';

/**Validation of Blueprints list page*/

test(`iAU_TC_ID_107. @RegressionA Validation of Blueprints list page`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.BlueprintMenuClick();
        await newtab.createBluePrint();
        await newtab.workflowClick()
        await newtab.logoutClick()

    });
});
