import test from '@lib/BaseTest';

/**AM */
test(`iEX_TC_ID_25. @Pre-Request Validation of Candidate dashboard > With No Actions in AM and PM Exams`, async ({ eluminaLoginPage, eluminaMultipleExamsForAMPage, eluminaRegPage, webActions }) => {
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
        const newtab = await eluminaMultipleExamsForAMPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createAMExam();
        await newtab.createSection("1", "30");
        await newtab.addMCQQuestions();
        const newtab1 = await eluminaRegPage.iAuthorPageNavigations();
        await newtab1.registrationTabNavigationAMExamPage();
        await newtab1.addUserDetailsdiffTime();
        await newtab1.logoutClick()
    });
});


// test(`iEX_TC_ID_25A. @Pre-Request Verify Elumina Registration for AM`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Navigate to exam Tab and Create New user`, async () => {
//         const newtab = await eluminaRegPage.iAuthorPageNavigations();
//         await newtab.registrationTabNavigationAMExamPage();
//         await newtab.addUserDetailsdiffTime();
//     });
// });


/**PM */
test(`iEX_TC_ID_25B. @Pre-Request Validation of Candidate dashboard > With No Actions in PM`, async ({ eluminaLoginPage, eluminaMultipleExamsForPMPage, eluminaRegPage, webActions }) => {
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
        const newtab = await eluminaMultipleExamsForPMPage.iAuthorPageNavigation();
        await newtab.createPMExam();
        await newtab.createSection("0", "58");
        await newtab.addMCQQuestions();
        const newtab1 = await eluminaRegPage.iAuthorPageNavigations();
        await newtab1.registrationTabNavigationPMExamPage();
        await newtab1.addExistingUsersdifftime();
        await newtab1.BulkDownloadUserDetails("bulkUserCredentialForAMandPMExam.xlsx");
        await newtab1.logoutClick()
    });
});

// test(`iEX_TC_ID_25C. @Pre-Request Verify Elumina Registration for PM`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Navigate to exam Tab and Create New user`, async () => {
//         const newtab = await eluminaRegPage.iAuthorPageNavigations();
//         await newtab.registrationTabNavigationPMExamPage();
//         await newtab.addExistingUsersdifftime();
//         await newtab.BulkDownloadUserDetails("bulkUserCredentialForAMandPMExam.xlsx");
//     });
// });
/////////////////////////////////////////////////////////////////////////////////////////////////
test(`Exam_Prerequisit_for_iEX_TC_ID_235A. @Pre-Request Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaRegPage, eluminaExamPage, eluminExamianvPage, webActions }) => {
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
        await newtab.createExam();
        await newtab.createSection("2", "58");
        await newtab.addMCQQuestions();
        const newtab1 = await eluminaRegPage.iAuthorPageNavigations();
        await newtab1.registrationTabNavigation();
        await newtab1.addExistingUserswithNotBooked('Not Booked');
        await newtab1.BulkDownloadUserDetails("bulkUserCredentialForNotBookedExam.xlsx");
        await newtab1.logoutClick()
    });
});
