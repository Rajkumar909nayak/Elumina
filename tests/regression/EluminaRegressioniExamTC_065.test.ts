import test from '@lib/BaseTest';

//Validation of Exam content page  - Check box
test(`iEX_TC_ID_47. @iExamRegression Verify Validation of Exam content page  - Check box`, async ({ eluminaCandPage, eluminaProctorCand, webActions }) => {
    await test.step('Candidate logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaCandPage.candidateLoginToApplication(11, "bulkUserCredentialForMcqExamwithContentSection.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.clickOnContentSectionCheckBox();
    });
});