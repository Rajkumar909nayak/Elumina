import test from '@lib/BaseTest';

/**Validation of "Flag for Review" option */

test(`iEX_TC_ID_74. @iExamRegression Verify Validation of Flag for Review`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(20, "bulk_user_details.xlsx");
    });
    await test.step('Candidate marks flag for review to all questions in the exam', async () => {
        await eluminaCandPage.candidateFlagForReviewAllQuestions();
    });

});

/**Validation of Adding & Saving notes */
test(`iEX_TC_ID_59. @iExamRegression Verify candidate adds and saves Notes EluminaRegressioniExamTC_038`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(2, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.AddingNotesToQuestionSinglelast();
        console.log("Candidate is able to use Notepad")
    });

});

/**Validate Candidate using Calculator in Exam */
test(`iEX_TC_ID_62. @iExamRegression Verify Validation of using Calculator EluminaRegressioniExamTC_039 `, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(3, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.UsingCalculatorForQuestions();
        console.log("Candidate is able to use Calculator")
    });

});

/**Validate Candidate using Highlighter in Exam */

test(`iEX_TC_ID_64. @iExamRegression Verify Validation of using Highlighter EluminaRegressioniExamTC_040 `, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(4, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.UsingHighlighterForQuestions();
        console.log("Candidate is able to use Highlighter")
    });

});

test(`iEX_TC_ID_99. @iExamRegression Verify Validation of VSAQ Question type EluminaRegressioniExamTC_043`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(5, "bulk_user_details.xlsx");
        await eluminaCandPage.candidateStartVSAQ();
    });

});

//Validation of Candidate dashboard - Exam scheduled Date / Time is over.

test(`iEX_TC_ID_30. @iExamRegression Verify Validation of Candidate dashboard - Exam scheduled Date / Time is over EluminaRegressioniExamTC_024`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(6, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateStartMCQandSAQ_RevieweandSubmit();
        await eluminaCandPage.confirmationOkBtn();
        //await eluminaCandPage.clickOnLogoutBtn();
    });

});

test(`iEX_TC_ID_30B. @iExamRegression Verify Validation of Candidate dashboard - Exam scheduled Date / Time is over EluminaRegressioniExamTC_024A`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard(6, "bulk_user_details.xlsx");
    });
});