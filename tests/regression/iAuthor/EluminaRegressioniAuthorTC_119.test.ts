import test from '@lib/BaseTest';

/**"Validation of Blueprint  Archive Negative scenario(only for Approved Blueprints)
Archive Blueprint used in up coming exam"*/

test(`iAU_TC_ID_119. @RegressionA "Validation of Blueprint  Archive Negative scenario (only for Approved Blueprints)
Archive Blueprint used in up coming exam"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.clickOnCreateExam();
        await newtab.searchAndSelectBlueprintQtn();
        await newtab.createExam()
        await newtab.selectAllTools()
        await newtab.createSection("1", "30")
        await newtab.clickOnSave()
        await newtab.addVSAQQuestions()
        await newtab.BlueprintMenuClick();
        await newtab.blueprintArchiveErrorMsg()
        await newtab.logoutClick()

    });

});
