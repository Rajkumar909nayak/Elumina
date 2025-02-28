import test from '@lib/BaseTest';

/**Validation of Empty Field validation */
test(` . @Pre-Request Verify Elumina Login and Create Exam1`, async ({ eluminaLoginPage, eluminaRegPage, eluminaExamPage, webActions }) => {
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
        await newtab.createCommonExam();
        await newtab.selectAllTools();
        await newtab.createSection("1", "30");
        await newtab.addMCQQuestionswithoutSave();
        await newtab.addVSAQQuestions();
        const newtab1 = await eluminaRegPage.iAuthorPageNavigations();
        await newtab1.registrationTabNavigation();
        await newtab1.bulkUploadUserswithvalidfeilds('lib/Images/Sample User_1-32.csv')
        // await newtab.addMultipleUserDetails(34);
        await newtab1.BulkDownloadUserDetails("bulk_user_details.xlsx");
        await newtab1.addInv();
        await newtab1.searchUserForAddingInv(2, "bulk_user_details.xlsx")
        await newtab1.logoutClick()
    });
});

// // test(` . @Pre-Request Verify Elumina RegistrationInv and add User and Invigilator1`, async ({ eluminaLoginPage, eluminaRegInvPage, eluminaRegPage, webActions }) => {
// //     await test.step(`Navigate to Application`, async () => {
// //         await eluminaLoginPage.navigateToURL();
// //     });
// //     await test.step(`Login to Elumina application`, async () => {
// //         await eluminaLoginPage.loginToApplication();
// //     });
// //     await test.step(`Navigate to exam Tab and Create New user`, async () => {
// //         const newtab = await eluminaRegPage.iAuthorPageNavigations();
// //         await newtab.registrationTabNavigation();
// //         await newtab.bulkUploadUserswithvalidfeilds('lib/Images/Sample User_1-32.csv')
// //         // await newtab.addMultipleUserDetails(34);
// //         await newtab.BulkDownloadUserDetails("bulk_user_details.xlsx");
// //         await newtab.addInv();
// //         await newtab.searchUserForAddingInv(2, "bulk_user_details.xlsx")
// //     });
// // });
// ///////////////////////////////////////////////////////////////////////////////////////////////////

