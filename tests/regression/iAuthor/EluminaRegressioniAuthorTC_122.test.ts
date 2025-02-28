import test from '@lib/BaseTest';

/**Validation of Blueprint Save as New version  */

test(`iAU_TC_ID_122. @RegressionA Validation of Blueprint Save as New version `, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.BlueprintMenuClick();
        await newtab.SaveAsNewVersion();
        await newtab.logoutClick()
    });
});