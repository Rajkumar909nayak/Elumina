import test from '@lib/BaseTest';

/**Validate the Exam sheet where the Question numbers are displayed are Gray by Default*/

test(`iEX_TC_ID_70. @iExamRegression Validate the Exam sheet where the Question numbers are displayed are Gray by Default`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(4, "bulkUserCredentialForMcqExamwithContentSection.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateContentSection();
        await eluminaCandPage.NotAnsweringQuestions();
    });

});
