import test from '@lib/BaseTest';

/**Validation of Add Multiple cart in one blueprint */

test(`iAU_TC_ID_111. @RegressionA Validation of Add Multiple cart in one blueprint`, async ({ eluminaLoginPage, eluminaBlueprintsPage, webActions }) => {
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
        await newtab.workflowClick();
    });
});
