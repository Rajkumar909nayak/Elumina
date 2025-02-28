import test from '@lib/BaseTest';
import { EluminaProctorExamPage } from '@pages/EluminaProctorExamPage';
import { chromium } from '@playwright/test';

//Validation of Login using no bank access admin user credentials

// test(` iAU_TC_ID_12. @RegressionA Validation of Login using no bank access admin user credentials`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam, webActions }) => {
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
//         const newtab = await eluminaProctorExam.AdminPageNavigation();
//         await newtab.clickOnUsersInAdmin();
//         await newtab.clickOnEditorIconInAdmin();
//         await newtab.clickOnAssignRolesInAdmin();
//         await newtab.removeAllRoles()
//         await newtab.logoutClick()
//     });
// });

// /**Validation of Question > Choose question */
// test(`iAU_TC_ID_12A. @RegressionA Validation of Login using no bank access admin user credentials`, async ({ eluminaLoginPage, eluminaProctorExam, eluminaHomePage, eluminaExamPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//         await eluminaProctorExam.verifyPopupoMessage()
//     });
// });        