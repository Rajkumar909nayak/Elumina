import test from '@lib/BaseTest';

/**Validation of Blueprint  Approval Workflow  */

test(`iAU_TC_ID_144. @RegressionA Validation of Blueprint  Approval Workflow `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.ExamsMenuClick();
        await newtab.validateExamApprovalWorkflow();
        await newtab.logoutClick()
    });

});