import test from '@lib/BaseTest';

/**Validation of Edit Exam (Negative Scenario)t*/

test(`iAU_TC_ID_161. @RegressionA Validation of Edit Exam (Negative Scenario)`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.searchExam();
        await newtab.logoutClick()
        // await newtab.searchAndSelectBlueprintQtn();
        // await newtab.createExam()
        // await newtab.selectAllToolsAndVerifyMsg()

    });

});
