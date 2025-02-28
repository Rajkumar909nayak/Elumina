import test from '@lib/BaseTest';

/**Validation of "Time Remaining" pop-up when the just before the exam time runs out */
// test(` . @iExamRegression Verify Elumina Login and create exam `, async ({ eluminaLoginPage, eluminaMinimalTimeExamPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
//         await eluminaLoginPage.verifyProfilePage();
//     });
//     await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
//         const newtab = await eluminaMinimalTimeExamPage.iAuthorPageNavigation();
//         await newtab.examTabNavigation();
//         await newtab.createExam(1);
//         await newtab.createSection("0", "1");
//         await newtab.addMCQQuestions();
//     });
// });

// test(` . @iExamRegression Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Navigate to exam Tab and Create New user`, async () => {
//         const newtab = await eluminaRegPage.iAuthorPageNavigations();
//         await newtab.registrationTabNavigationforMinimaltime();
//         await newtab.clickaddMoreUsersIcon(1)
//         await newtab.addMultipleUserDetails(8);
//         await newtab.BulkDownloadUserDetails("bulkUserCredentialForMinimalTimeExam.xlsx");
//         await newtab.addInv();
//         await newtab.searchUserForAddingInv(10, "bulkUserCredentialForMinimalTimeExam.xlsxx")
//     });
// });

test(`iEX_TC_ID_88. @iExamRegression Validation of "Time Remaining" pop-up when the just before the exam time runs out`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "bulkUserCredentialForMinimalTimeExam.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateStartExamforMinimalTime();
        await eluminaCandPage.validationOfPopupInSurveyPage()
    });
});
