import test from '@lib/BaseTest';

/**Validation of Create Question (Type-B) - Negative Scenario.*/
test(`iAU_TC_ID_48. @RegressionA Validation of Create Question (Type-B) - Negative Scenario.`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.validationOfTypeB();
        await newtab.selectBank()
        await newtab.enterRemainingTypeBField();
        await newtab.validateWorkFlow()
        await newtab.logoutClick()


    });
});

/**Validation of Create Question (Spot Question)*/

test(`iAU_TC_ID_49. @RegressionA Validation of Create Question (Spot Question)`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.createSpotQuestion();
        await newtab.logoutClick()

    });

});

/**Validation of Create Question (Spot Question) - Negative Scenario.*/
test(`iAU_TC_ID_50. @RegressionA Validation of Create Question (Spot Question) - Negative Scenario.`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.validationOfSpot();
        await newtab.selectBank()
        await newtab.enterRemainingSpotField();
        await newtab.validateWorkFlow()
        await newtab.logoutClick()
    });
});

/**Validation of Create Question (ISAWE-CASE Question)*/

// test(`iAU_TC_ID_72. @RegressionA Validation of Create Question (ISAWE-CASE Question)`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Navigate to iAuthor`, async () => {
//         const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
//         await newtab.QuestionsMenuClick();
//         await newtab.createISAWE_CASEQuestion();
//         await newtab.logoutClick()
//     });
// });

/**Validation of Create ISAWE-CASE Question (Negative Scenario)*/
test(`iAU_TC_ID_72. @RegressionA Validation of Create ISAWE-CASE Question (Negative Scenario)`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.validationOfISAWE_CASEQuestion();
        await newtab.selectBank()
        await newtab.enterRemainingISAWE_CASEField();
        await newtab.validateWorkFlow()
        await newtab.logoutClick()
    });
});

/**Validation of Create ISAWE-CASE Question -Validation (Negative scenario)*/
test(`iAU_TC_ID_73. @RegressionA Validation of Create ISAWE-CASE Question -Validation (Negative scenario)`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.validationOfISAWE_CASEQuestion();
        await newtab.selectBank()
        await newtab.enterRemainingISAWE_CASEFieldWithoutSubQun();
        await newtab.logoutClick()
    });
});

/**Validation of Create ISAWE-CASE Question -Validation (Negative Scenario)*/
test(`iAU_TC_ID_74. @RegressionA Validation of Create ISAWE-CASE Question -Validation (Negative Scenario)`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.validationOfISAWE_CASEQuestion();
        await newtab.selectBank()
        await newtab.addSubQunWithoutMandatoryField();
        await newtab.logoutClick()
    });
});

/**Validation of Create ISAWE-CASE Question -> with MCQ-MSMG as Sub Question (Negative Scenario)*/
test(`iAU_TC_ID_76. @RegressionA Validation of Create ISAWE-CASE Question -> with MCQ-MSMG as Sub Question (Negative Scenario)`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.verifyISAWE_CASEQuestionerrormessage();
        await newtab.logoutClick()
    });
});

/**Validation of Create ISAWE-CASE Question -> with MCQ-MSMG as Sub Question (Negative Scenario)*/
test(`iAU_TC_ID_77. @RegressionA Validation of Create ISAWE-CASE Question -> with MCQ-MSMG as Sub Question (Negative Scenario)`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.verifyISAWE_CASEQuestionerrormessageForDistractor();
        await newtab.logoutClick()
    });
});

/**Validation of Create Question (OSCE Question)*/

test(`iAU_TC_ID_55. @RegressionA Validation of Create Question (OSCE Question)`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.createOSCEQuestion();
        await newtab.logoutClick()
    });
});

/**Validation of Create Question (OSCE Question)-Negative Scenario.*/
test(`iAU_TC_ID_56. @RegressionA Validation of Create Question (OSCE Question)-Negative Scenario.`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.validationOfOSCEuestion();
        await newtab.selectBank()
        await newtab.enterRemainingOSCEField();
        await newtab.validateWorkFlow()
        await newtab.logoutClick()
    });
});

/**Validation of Create Question (Scenario) - Negative Scenario.*/
test(`iAU_TC_ID_58. @RegressionA Validation of Create Question (Scenario) - Negative Scenario.`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.validationOfScenariouestion();
        await newtab.selectBank()
        await newtab.enterRemainingScenarioField();
        await newtab.validateWorkFlow()
        await newtab.logoutClick()
    });
});

/**Validation of Create Question (Long Answer)*/
test(`iAU_TC_ID_63. @RegressionA Validation of Create Question (Long Answer)`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.createLongAnswerQuestion();
        await newtab.logoutClick();
    });
});

/**Validation of Create Question (Ranking Question)*/
test(`iAU_TC_ID_65. @RegressionA Validation of Create Question (Ranking Question)`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.createRankingQuestion();
        await newtab.logoutClick();
    });
});

/**Validation of Create Question (Translation Question)*/
test(`iAU_TC_ID_67. @RegressionA Validation of Create Question (Translation Question)`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.createTranslationQuestion();
        await newtab.logoutClick();
    });
});

/**Validation of Create Question (Revision Question)*/
test(`iAU_TC_ID_69. @RegressionA Validation of Create Question (Revision Question)`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.createRevisionQuestion();
        await newtab.logoutClick();
    });
});