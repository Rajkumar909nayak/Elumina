import test from '@lib/BaseTest';

/**Validation of Blueprint Preview*/

test(`iAU_TC_ID_121. @RegressionA Validation of Blueprint Preview`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
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
        await newtab.EditBlueprintQuestionwithPreview();
        await newtab.verifyPreviewPage()
    });
});
