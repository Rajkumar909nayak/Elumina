// import test from '@lib/BaseTest';

// /**Validation of Delivery--> Workflow (Reviewal Workflow) */

// test(` iAU_TC_ID_224. Exam_Prerequisit_for_iAU_TC_ID_224. @RegressionA Create iProctor exam with password`, async ({ eluminaLoginPage, eluminaExamPage, eluminaProctorExam, webActions }) => {
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
//         await newtab.addVSAQQuestion();
//         await newtab.submitApprove();
//     });
// });

// test(`iAU_TC_ID_224. Exam_Prerequisit_for_iAU_TC_ID_224. @RegressionA Verify Elumina Registration`, async ({ eluminaLoginPage, eluminaRegPage, eluminaProctorReg, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Navigate to exam Tab and Create New user`, async () => {
//         const newtab = await eluminaRegPage.iAuthorPageNavigations();
//         await newtab.registrationTabNavigation();
//         await newtab.addMultipleUserDetails(0);
//         await newtab.BulkDownloadUserDetails("bulk_user_details.xlsx");
//         await newtab.addMarker();
//         await newtab.logoutClick();
//     });
// });

// test(`iAU_TC_ID_224. @RegressionA candidate answering questions`, async ({ eluminaCandPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaCandPage.candidateNavigateToURL();
//         await eluminaCandPage.waitforTime();
//     });
//     await test.step(`Candidate Login to application`, async () => {
//         await eluminaCandPage.candidateLoginToApplication(2, "bulk_user_details.xlsx");
//         await eluminaCandPage.candidateStartVSAQWithoutNextButton(200);
//     });
// });

// test(`iAU_TC_ID_224. Exam_Prerequisit_for_iAU_TC_ID_224. @RegressionA Verify Elumina`, async ({ eluminaLoginPage, eluminaRegPage, eluminaProctorReg, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Navigate to exam Tab and Create New user`, async () => {
//         const newtab = await eluminaRegPage.iAuthorPageNavigations();
//         await newtab.registrationTabNavigation();
//         await newtab.searchCandidateforMarker();
//     });
// });

// test(`iAU_TC_ID_224. @RegressionA Verify Marker score card`, async ({ eluminaMarkerPage, eluminaLoginPage, eluminaRegPage, eluminaProctorReg, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplicationWithMarker();
//     });
//     await test.step(`Navigate to exam Tab and Create New user`, async () => {
//         const newtab = await eluminaMarkerPage.iAuthorPageNavigation();
//         await newtab.clickonexamId();
//         await newtab.validateScoreCard();
//         await newtab.feedBackIconClick();
//     });
// });

// test(`iAU_TC_ID_224. @RegressionA Verify Elumina`, async ({ eluminaLoginPage, eluminaRegPage, eluminaProctorReg, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Navigate to exam Tab and Create New user`, async () => {
//         const newtab = await eluminaRegPage.iAuthorPageNavigations();
//         await newtab.registrationTabNavigation();
//         await newtab.markersReports();
//     });
// });

// test(`iAU_TC_ID_224. @RegressionA Validation of Delivery--> Workflow (Reviewal Workflow)`, async ({ eluminaLoginPage, eluminaRegPage, eluminaCreateQuestionsPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Navigate to iAuthor`, async () => {
//         const newtab = await eluminaRegPage.iAuthorPageNavigations();
//         await newtab.clickOnCreatedExam();
//         await newtab.ReviewerWorkflow();
//         await newtab.logoutClick()
//     });
// });
