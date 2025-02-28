import test from '@lib/BaseTest';

/**Validation of Blueprint  Direct workflow*/

test(`iAU_TC_ID_126. @RegressionA Validation of Blueprint  Direct workflow`, async ({ eluminaLoginPage, eluminaBlueprintsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.BlueprintMenuClick();
        await newtab.createDraftBluePrint()
        await newtab.searchDraftBlueprintQuestionToApprove();
        await newtab.addQuestionsToCartWithoutApprove()
        await newtab.validateQunApprovalWorkflow1()
        await newtab.logoutClick()
    });
});
