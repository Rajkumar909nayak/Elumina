import test from '@lib/BaseTest';

/**Validation of Exam Submit for Approval*/
test(`iAU_TC_ID_245. @RegressionA Validation of Exam Submit for Approval`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.clickOnCreateExam();
        await newtab.searchAndSelectBlueprintQtn();
        await newtab.createExam()
        await newtab.selectAllToolsAndVerifyMsg()
        await newtab.createSection("1", "30")
        await newtab.clickOnSave()
        await newtab.addVSAQQuestionswithoutApprove()
        await newtab.validateQunApprovalWorkflow()
        await newtab.logoutClick()
        // await newtab.againCandidateLogin()
        // await newtab.refreshPage()
    });
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplicationAsReviewer();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.ExamsMenuClick();
        await newtab.clickOnIDAndclickOnApproval();
        await newtab.logoutClick()
    });
});

// test(`iAU_TC_ID_245B. @RegressionA Validation of Exam Submit for Approval`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Application`, async () => {
//         await eluminaLoginPage.loginToApplicationAsReviewer();
//     });
//     await test.step(`Navigate to iAuthor`, async () => {
//         const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
//         await newtab.ExamsMenuClick();
//         await newtab.clickOnIDAndclickOnApproval();
//         await newtab.logoutClick()
//     });
// });   