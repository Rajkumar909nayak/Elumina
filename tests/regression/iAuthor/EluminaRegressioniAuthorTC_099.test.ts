import test from '@lib/BaseTest';

/**Validation of Question  No Workflow */

test(`iAU_TC_ID_99. @RegressionA Validation of Question  No Workflow  `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        // await newtab.BlueprintMenuClick()
        // await newtab.createBluePrint()
        await newtab.QuestionsMenuClick();
        await newtab.clickOnDraft();
        await newtab.validateEditQuestion();
    });

});