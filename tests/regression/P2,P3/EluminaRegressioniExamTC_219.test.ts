// import test from '@lib/BaseTest';


// /** Validation of internet disconnection while Resume Candidate Answer Sync by Invigilator or Exam Technician*/

// test(`Exam_Prerequisit_for_iEX_TC_ID_219. @RegressionP Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
//         const newtab = await eluminaExamPage.iAuthorPageNavigation();
//         await newtab.examTabNavigation();
//         await newtab.createCommonExam();
//         await newtab.selectAllTools();
//         await newtab.createSection("1", "30");
//         await newtab.addMCQQuestion();
//         await newtab.addVSAQQuestion();
//         await newtab.addISAWEQuestion();
//         await newtab.addSJTQuestion();
//     });
// });
// test(`Exam_Prerequisit_for_iEX_TC_ID_219. @RegressionP Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Navigate to exam Tab and Create New user`, async () => {
//         const newtab = await eluminaRegPage.iAuthorPageNavigations();
//         await newtab.registrationTabNavigation();
//         await newtab.addUserDetails();
//         await newtab.downloadUserDetails();
//         await newtab.addExistingUsers();
//         await newtab.logoutClick();
//     });
// });

// test(`iEX_TC_ID_219. @RegressionP Validation of internet disconnection while Resume Candidate Answer Sync by Invigilator or Exam Technician`, async ({ eluminaCandPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaCandPage.candidateNavigateToURL();
//         await eluminaCandPage.waitforTime3();
//         await eluminaCandPage.waitforTime3();
//     });
//     await test.step(`Candidate Login to application`, async () => {
//         await eluminaCandPage.candidateLoginToApplication();
//         await eluminaCandPage.candidateStartOneMCQ();
//         await eluminaCandPage.setOffline(true);
//         await eluminaCandPage.candidateAttendsAllQVSAQ(100);
//         await eluminaCandPage.submitButtonClick();
//         // await eluminaCandPage.HotKeyPress();
//         // await eluminaCandPage.examRecoveryPassword();
//     });
// });

// // test(`iEX_TC_ID_219. @RegressionP Validation of internet disconnection while Resume Candidate Answer Sync by Invigilator`, async ({ eluminaCandPage, webActions }) => {
// //     await test.step(`Navigate to Application`, async () => {
// //         await eluminaCandPage.candidateNavigateToURL();
// //         await eluminaCandPage.candidateLoginToApplicationwithoutclickingLogin();
// //         await eluminaCandPage.HotKeyPress();
// //         await eluminaCandPage.examRecoveryPassword();
// //     });
// // }); 
