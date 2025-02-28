import test from '@lib/BaseTest';

/**Validate the Exam sheet where the Question numbers are displayed in Orange when In Progress*/

test(`iEX_TC_ID_72. @iExamRegression Validate the Exam sheet where the Question numbers are displayed in Orange when In Progress`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(6, "bulkUserCredentialForMcqExamwithContentSection.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateContentSection();
        await eluminaCandPage.InProgressQuestions();
    });

});
