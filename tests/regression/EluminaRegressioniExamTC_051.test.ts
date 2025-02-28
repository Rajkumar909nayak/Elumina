import test from '@lib/BaseTest';

/**Validation of Exam section page.*/

// test(` . @iExamRegression  Verify Elumina Login and create exam `, async ({ eluminaLoginPage, eluminaCandPage, eluminaExamPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
//         await eluminaLoginPage.verifyProfilePage();
//     });
//     await test.step(`Navigate to exam Tab and Create New Exam and add MCQ Questions`, async () => {
//         const newtab = await eluminaExamPage.iAuthorPageNavigation();
//         await newtab.examTabNavigation();
//         await newtab.createCommonExam();
//         await newtab.selectAllTools();
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


// test(` . @iExamRegression Verify Elumina Registration`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
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
//         await newtab.addMultipleUserDetails(10);
//         await newtab.BulkDownloadUserDetails("bulkUserCredentialForAllTypeQutnExam.xlsx");
//         await newtab.addInv();
//         await newtab.searchUserForAddingInv(12, "bulkUserCredentialForAllTypeQutnExam.xlsx")
//     });
// });


test(`iEX_TC_ID_97,iEX_TC_ID_98,iEX_TC_ID_99,iEX_TC_ID_101,iEX_TC_ID_102,iEX_TC_ID_103,iEX_TC_ID_105. @iExamRegression Validation of each component for all type of questions in Candidate flow.`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "bulkUserCredentialForAllTypeQutnExam.xlsx");

    });

    await test.step('Validate each component in candidate Exam page for all Questions', async () => {
        await eluminaCandPage.AllQuestionPageValidation('MCQ');
        await eluminaCandPage.AllQuestionPageValidation('VSAQ');
        await eluminaCandPage.AllQuestionPageValidation('ISAWE');
        await eluminaCandPage.AllQuestionPageValidation('TYPEX');
        await eluminaCandPage.AllQuestionPageValidation('TYPEB');
        await eluminaCandPage.AllQuestionPageValidation('SAQ');
        await eluminaCandPage.AllQuestionPageValidation('SJT');
    });

});

test(`iEX_TC_ID_54. @iExamRegression Validation of Exam section page.`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(3, "bulkUserCredentialForAllTypeQutnExam.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateContentSectionValidation();
        await eluminaCandPage.verifyExamDashboardTimer();
        await eluminaCandPage.verifyColours();
        await eluminaCandPage.verifyNoOfQutn();
        await eluminaCandPage.validationOfReviewBtn();
        await eluminaCandPage.verifyFlagForReview();
        await eluminaCandPage.validationOfAllTools();
        await eluminaCandPage.validationOfNextBtn();
        await eluminaCandPage.UsingCalculatorForQuestions();
        await eluminaCandPage.AddingNotesToAllQuestion();
        await eluminaCandPage.increaseFontSize();
        await eluminaCandPage.decreaseFontSize();
        await eluminaCandPage.validatePreviousBtn();
    });

});

test(`iEX_TC_ID_61. @iExamRegression Validation of Exam Section > Font Size `, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(4, "bulkUserCredentialForAllTypeQutnExam.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.increaseFontSize();
        await eluminaCandPage.decreaseFontSize()
        await eluminaCandPage.verifyNoOfQutn()
    });

});

test(`iEX_TC_ID_64. @iExamRegression Validation of Exam Section > Highlighter tool highlights save scenario 1`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(5, "bulkUserCredentialForAllTypeQutnExam.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateAttendsAllQVSAQ(100);
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ(100);
        await eluminaCandPage.UsingHighlighterForQuestions();
        await eluminaCandPage.candidateStartSJT()
        await eluminaCandPage.clickonPrevious()
    });

});

test(`iEX_TC_ID_76. @iExamRegression Validation of Exam section > Candidate attend the exam in normal flow `, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(6, "bulkUserCredentialForAllTypeQutnExam.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateAttendsAllQVSAQ(100);
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ(100);
        await eluminaCandPage.candidateStartSJTReviewandSubmit()
        //await eluminaCandPage.confirmationOkBtn()
        await eluminaCandPage.clickOnLogoutBtn()
        //await eluminaCandPage.validationOfLogo();

    });

});
