import test from '@lib/BaseTest';

/**Validation of Centralize Login page */
test(` iAU_TC_ID_17. @RegressionA Validation of Centralize Login page`, async ({ eluminaLoginPage, eluminaCandPage, eluminaProctorCand, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
        await eluminaLoginPage.verifyProfilePage();
    });
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaExamPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.logoutClick()
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaProctorCand.againCandidateLogin();
        await eluminaCandPage.refreshPage();
        await eluminaCandPage.validationOfLogo()
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.questionTabNavigation();
        await newtab.adminLogout()
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaProctorCand.againCandidateLogin();
        await eluminaCandPage.refreshPage();
        await eluminaCandPage.validationOfLogo()
    });
});