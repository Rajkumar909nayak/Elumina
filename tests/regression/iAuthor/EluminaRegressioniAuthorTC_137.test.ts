import test from '@lib/BaseTest';

/**Validation of Create Exam – Copy an existing exam  */

test(`iAU_TC_ID_137. @RegressionA Validation of Create Exam – Copy an existing exam `, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.clickOnCreateExam();
        await newtab.clickOnCopyExistingExam()
        await newtab.clickOnMore()
        await newtab.editDateForDuplicateExam()
        await newtab.clickOnSave()
        await newtab.logoutClick()
    });
});