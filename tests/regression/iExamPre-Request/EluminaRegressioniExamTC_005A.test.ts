import test from '@lib/BaseTest';

test(` . @Pre-Request  Verify Elumina Login and create exam5 `, async ({ eluminaLoginPage, eluminaRegPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
        await eluminaLoginPage.verifyProfilePage();
    });
    await test.step(`Navigate to exam Tab and Create New Exam and add MCQ Questions`, async () => {
        const newtab = await eluminaExamPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createCommonExam();
        await newtab.selectAllTools();
        await newtab.createSection("1", "30");
        await newtab.addMCQQuestion();
        await newtab.addVSAQQuestion();
        await newtab.addISAWEQuestion();
        await newtab.addTypeXQuestion();
        await newtab.addTypeBQuestion();
        await newtab.addSAQQuestion();
        await newtab.addSJTQuestion();
        const newtab1 = await eluminaRegPage.iAuthorPageNavigations();
        await newtab1.registrationTabNavigation();
        await newtab1.bulkUploadUserswithvalidfeilds('lib/Images/Sample User_72-82.csv')
        // await newtab.addMultipleUserDetails(13);
        await newtab1.BulkDownloadUserDetails("bulkUserCredentialForAllTypeQutnExam.xlsx");
        await newtab1.addInv();
        await newtab1.searchUserForAddingInv(2, "bulkUserCredentialForAllTypeQutnExam.xlsx")
        await newtab1.logoutClick()
    });
});


// test(` . @Pre-Request Verify Elumina Registration5`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Navigate to exam Tab and Create New user`, async () => {
//         const newtab = await eluminaRegPage.iAuthorPageNavigations();
//         await newtab.registrationTabNavigation();
//         await newtab.bulkUploadUserswithvalidfeilds('lib/Images/Sample User_72-82.csv')
//         // await newtab.addMultipleUserDetails(13);
//         await newtab.BulkDownloadUserDetails("bulkUserCredentialForAllTypeQutnExam.xlsx");
//         await newtab.addInv();
//         await newtab.searchUserForAddingInv(2, "bulkUserCredentialForAllTypeQutnExam.xlsx")
//     });
// });
////////////////////////////////////////////////////////////////////////////////////////////

