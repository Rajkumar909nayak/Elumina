import test from '@lib/BaseTest';


/**Validation of Exam content page ->Timer verification in all pages */

// test(` . @iExamRegression Verify Elumina Login and create exam `, async ({ eluminaLoginPage, eluminaCandPage, eluminaExamPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
//         await eluminaLoginPage.verifyProfilePage();
//     });
//     await test.step(`Navigate to exam Tab and Create New Exam and add MCQ Questions`, async () => {
//         const newtab = await eluminaExamPage.iAuthorPageNavigation();
//         await newtab.examTabNavigation();
//         await newtab.createCommonExam();
//         await newtab.selectAllTools();
//         await newtab.createContentSection("1");
//         await newtab.createContentPageWithMoreDescription();
//         await newtab.createSection("1", "30");
//         await newtab.addMCQQuestions();
//     });
// });


// test(` . @iExamRegression Verify Elumina Registration`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Navigate to exam Tab and Create New user`, async () => {
//         const newtab = await eluminaRegPage.iAuthorPageNavigations();
//         await newtab.registrationTabNavigation();
//         await newtab.clickaddMoreUsersIcon(1)
//         await newtab.addMultipleUserDetails(10);
//         await newtab.BulkDownloadUserDetails("bulkUserCredentialForMcqExamwithContentSection.xlsx");
//         await newtab.addInv();
//         await newtab.searchUserForAddingInv(12, "bulkUserCredentialForMcqExamwithContentSection.xlsx")
//     });
// });

test(`iEX_TC_ID_49. @iExamRegression Validation of Exam content page ->Timer verification in all pages `, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "bulkUserCredentialForMcqExamwithContentSection.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.verifyContentSectionTimer()
        await eluminaCandPage.candidateContentSection();
        await eluminaCandPage.candidateStartMCQ();
        await eluminaCandPage.verifyExamDashboardTimer()
    });

});
