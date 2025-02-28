import test from '@lib/BaseTest';

/**"Validation of Create Blueprint(Negative Scenarios)"*/

test(`iAU_TC_ID_110. @RegressionA "Validation of Create Blueprint(Negative Scenarios)"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.BlueprintMenuClick();
        await newtab.clickOnCreateBlueprint();
        await newtab.verifyMsgWithoutEnteringFildsAndClickOnNext()
    });
});
