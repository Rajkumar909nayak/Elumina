import test from '@lib/BaseTest';

/**Validation of Gradebook list page*/

test(`iAU_TC_ID_226. @RegressionA Validation of Gradebook list page`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.gradeBookMenu();
        await newtab.verifyListOfBlueprint();
        await newtab.verifyMoreOption()
        await newtab.clickOnUpAndDown()
        await newtab.verifyRowAndPageAndCandCounts()
        await newtab.logoutClick()

    });

});
