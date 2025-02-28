import test from '@lib/BaseTest';

/** Validate candidate attending All Question type */

//EluminaRegressioniExamTC_042(iEX_TC_ID_69,79,95).test

// test(` . @iExamRegression Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
//         await newtab.clickonNextBtnInExam();
//         await newtab.createContentSection("1");
//         await newtab.createContentPage();
//         await newtab.createSection("1", "30");
//         await newtab.addMCQQuestion();
//         await newtab.addVSAQQuestion();
//         await newtab.addISAWEQuestion();
//         await newtab.addTypeXQuestion();
//         await newtab.addTypeBQuestion();
//         await newtab.addSAQQuestion();
//         await newtab.addSJTQuestions();
//         await newtab.createSurveySection("10");
//         await newtab.createSurveyPage();

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
//         await newtab.registrationTabNavigation();
//         await newtab.clickaddMoreUsersIcon(1)
//         await newtab.addMultipleUserDetails(8);
//         await newtab.BulkDownloadUserDetails("bulkUserCredentialForSurveyExam.xlsx");
//         await newtab.addInv();
//         await newtab.searchUserForAddingInv(10, "bulkUserCredentialForSurveyExam.xlsx")
//     });
// });


test(`iEX_TC_ID_68. @iExamRegression Verify Validation of Candidate attends All Question type`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();

    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "bulkUserCredentialForSurveyExam.xlsx");
        await eluminaCandPage.candidateContentSectionVerifications();
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateAttendsAllQVSAQ(100);
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ(100);
        await eluminaCandPage.candidateStartSJT();
    });

});


test(`iEX_TC_ID_69,iEX_TC_ID_240. @iExamRegression Validation of Exam Section > Question and Answer save navigation validation using Previous / Next buttons.`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(3, "bulkUserCredentialForSurveyExam.xlsx");
        await eluminaCandPage.candidateContentSectionVerifications();
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.clickOnPrevious();
        await eluminaCandPage.candidateAttendsAllQVSAQ(100);
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.clickOnPrevious();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ(100);
        await eluminaCandPage.candidateStartSJT();
    });
});


test(`iEX_TC_ID_79. @iExamRegression Verify Validation of Candidate attends All Question type in offline`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(4, "bulkUserCredentialForSurveyExam.xlsx");
        await eluminaCandPage.candidateContentSectionVerifications();
        await eluminaCandPage.setOffline(true);
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateAttendsAllQVSAQ(100);
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ(100);
        await eluminaCandPage.candidateStartSJT();
    });
});


test(`iEX_TC_ID_95. @iExamRegression Verify Validation of Candidate attends All Question type in offline`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(5, "bulkUserCredentialForSurveyExam.xlsx");
        await eluminaCandPage.candidateContentSectionVerifications();
        await eluminaCandPage.setOffline(true);
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateAttendsAllQVSAQ(100);
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ(100);
        await eluminaCandPage.candidateStartSJTAns();
        await eluminaCandPage.candidateSurveyStartOneMCQ();
        await eluminaCandPage.candidateAnsSurveyQuestion();

    });
});       
