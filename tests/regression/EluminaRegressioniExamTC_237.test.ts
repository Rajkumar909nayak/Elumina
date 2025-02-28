// import test from '@lib/BaseTest';
// import { EluminaCandidatePage } from '@pages/EluminaCandidatePage';
// import { chromium, expect } from '@playwright/test';
// const devTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/dev/testData.json')));
// const p7TestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/p7/testData.json')));
// const productionTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/production/testData.json')));
// const qaTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/qa/testData.json')));
// const sandboxTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/sandbox/testData.json')));
// const stagingTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/staging/testData.json')));

// let testData = qaTestData;
// if (process.env.ENV == 'dev') {
//     testData = devTestData;
// }
// else if (process.env.ENV == 'p7') {
//     testData = p7TestData;
// }
// else if (process.env.ENV == 'production') {
//     testData = productionTestData;
// }
// else if (process.env.ENV == 'qa') {
//     testData = qaTestData;
// }
// else if (process.env.ENV == 'sandbox') {
//     testData = sandboxTestData;
// }
// else if (process.env.ENV == 'staging') {
//     testData = stagingTestData;
// }
// /** Validation of Exam content section page not auto downloading video, audio, images  */

// test(`Exam_Prerequisit_for_iEX_TC_ID_237. @iExamRegression Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
//         await newtab.createContentSection("1");
//         await newtab.createContentPage();
//         await newtab.createSection("1", "30");
//         await newtab.addMCQQuestion();
//         await newtab.addVSAQQuestion();
//         await newtab.addISAWEQuestion();
//         await newtab.addTypeXQuestion();
//         await newtab.addTypeBQuestion();
//         await newtab.addSAQQuestion();
//         await newtab.addSJTQuestion();

//     });
// });

// // test(`Exam_Prerequisit_for_iEX_TC_ID_237. @iExamRegression Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
// //     await test.step(`Navigate to Application`, async () => {
// //         await eluminaLoginPage.navigateToURL();
// //     });
// //     await test.step(`Login to Elumina application`, async () => {
// //         await eluminaLoginPage.loginToApplication();
// //     });
// //     await test.step(`Navigate to exam Tab and Create New user`, async () => {
// //         const newtab = await eluminaRegPage.iAuthorPageNavigations();
// //         await newtab.registrationTabNavigation();
// //         await newtab.addUserDetails();
// //         await newtab.downloadUserDetails();
// //         await newtab.addExistingUsers();
// //         await newtab.logoutClick();
// //     });
// // });


// // test(`iEX_TC_ID_237. @iExamRegression Validation of Exam content section page not auto downloading video, audio, images `, async ({ eluminaCandPage, webActions }) => {
// //     await test.step(`Navigate to Application`, async () => {
// //         await eluminaCandPage.candidateNavigateToURL();
// //         await eluminaCandPage.waitforTime();
// //         await eluminaCandPage.waitforTime3();
// //         await eluminaCandPage.waitforTime3();
// //     });

// //     await test.step(`Candidate Login to application`, async () => {
// //         await eluminaCandPage.candidateLoginToApplication();
// //         await eluminaCandPage.candidateContentSectionVerifications();


// // await eluminaCandPage.candidateStartMCQwithflagforreviewandnotes();
// // await eluminaCandPage.candidateAttendsAllQVSAQ(100);
// // await eluminaCandPage.candidateStartISAWE();
// // await eluminaCandPage.candidateStartTypeX();
// // await eluminaCandPage.candidateStartTypeB();
// // await eluminaCandPage.candidateStartSAQ(100);
// // await eluminaCandPage.candidateStartSJTValidationofReviewPage();
// // await eluminaCandPage.waitforTime2();
// //     });
// // });





