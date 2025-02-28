import test from '@lib/BaseTest';

test(`Exam_Prerequisit_for_iEX_TC_ID_57. @Pre-Request Verify Elumina Login and Create Exam6`, async ({ eluminaLoginPage, eluminaRegPage, eluminaExamPage, webActions }) => {
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
        await newtab.createCommonExamWithViewer();
        await newtab.clickonNextBtnInExam();
        await newtab.createSection("1", "30");
        await newtab.addImageQuestion();
        const newtab1 = await eluminaRegPage.iAuthorPageNavigations();
        await newtab1.registrationTabNavigation();
        //await newtab.clickaddMoreUsersIcon(1)
        await newtab1.addMultipleUserDetails(1);
        await newtab1.BulkDownloadUserDetails("bulkUserCredentialForImageViewerExam.xlsx");
        await newtab1.logoutClick()
    });
});

// test(`Exam_Prerequisit_for_iEX_TC_ID_57. @Pre-Request Verify Elumina RegistrationInv and add User and Invigilator6`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Navigate to exam Tab and Create New user`, async () => {
//         const newtab = await eluminaRegPage.iAuthorPageNavigations();
//         await newtab.registrationTabNavigation();
//         //await newtab.clickaddMoreUsersIcon(1)
//         await newtab.addMultipleUserDetails(1);
//         await newtab.BulkDownloadUserDetails("bulkUserCredentialForImageViewerExam.xlsx");
//         //await newtab.addInv();
//         //await newtab.searchUserForAddingInv(2, "bulkUserCredentialForImageViewerExam.xlsx")

//     });
// });
////////////////////////////////////////////////////////////////////////////////////////////////
