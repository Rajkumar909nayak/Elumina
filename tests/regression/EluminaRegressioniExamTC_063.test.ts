import test from '@lib/BaseTest';

//Validation of Exam content page - Timer Validation (Before Timer Expires)

test(`iEX_TC_ID_45. @iExamRegression Verify Validation of Exam content page - Timer Validation (Before Timer Expires)`, async ({ eluminaCandPage, eluminaProctorCand, webActions }) => {
    await test.step('Candidate logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaCandPage.candidateLoginToApplication(9, "bulkUserCredentialForMcqExamwithContentSection.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.verifyContentSectionTimer();
    });

});