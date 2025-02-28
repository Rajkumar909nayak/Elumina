import test from '@lib/BaseTest';

/**Validation of Blueprint No Workflow */

test(`iAU_TC_ID_124.  Validation of Blueprint No Workflow`, async ({ eluminaLoginPage, eluminaBlueprintsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.BlueprintMenuClick();
        await newtab.searchDraftBlueprintQuestionToApprove();
        await newtab.approveBluePrintId();
        await newtab.logoutClick()

    });
});
