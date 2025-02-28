import test from '@lib/BaseTest';

/**Validation of Blueprint Approval Workflow */

test(`iAU_TC_ID_125.  Validation of Blueprint Approval Workflow`, async ({ eluminaLoginPage, eluminaBlueprintsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.BlueprintMenuClick();
        await newtab.reviewToReviewer();
        await newtab.logoutClick()

    });
});
