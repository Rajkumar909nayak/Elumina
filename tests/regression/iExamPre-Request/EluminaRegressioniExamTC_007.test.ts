import test from '@lib/BaseTest';

test(` . @Pre-Request  Verify Elumina Login and create exam1P `, async ({ eluminaLoginPage, eluminaRegPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    // await test.step(`Login to Elumina application with Inactive Userid and password TC-12`, async () => {
    //     await eluminaLoginPage.loginToApplicationwithInactiveId();
    // });
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
        await newtab.selectAllToolswithInvPwd();
        await newtab.createContentSection("1");
        await newtab.createContentPage();
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
        await newtab1.bulkUploadUserswithvalidfeilds('lib/Images/Sample User_92-100.csv')
        //await newtab.addMultipleUserDetails(20);
        await newtab1.BulkDownloadUserDetails("bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
        await newtab1.addInv();
        await newtab1.searchUserForAddingInv(2, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx")
        await newtab1.logoutClick()
    });
});


// test(` . @Pre-Request  Verify Elumina Registration1P`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Navigate to exam Tab and Create New user`, async () => {
//         const newtab = await eluminaRegPage.iAuthorPageNavigations();
//         await newtab.registrationTabNavigation();
//         await newtab.bulkUploadUserswithvalidfeilds('lib/Images/Sample User_92-100.csv')
//         //await newtab.addMultipleUserDetails(20);
//         await newtab.BulkDownloadUserDetails("bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
//         await newtab.addInv();
//         await newtab.searchUserForAddingInv(2, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx")
//     });
// });
/////////////////////////////////////////////////////////////////////////////////////////////////
