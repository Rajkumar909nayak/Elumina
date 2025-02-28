import test from '@lib/BaseTest';

/**Validate the Exam sheet where the Question numbers are displayed in Pink, when Notes are added while answering */

test(`iEX_TC_ID_73. @iExamRegression Verify Validate the Exam sheet where the Question numbers are displayed in Pink, when Notes are added while answering `, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(7, "bulkUserCredentialForMcqExamwithContentSection.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateContentSection();
        await eluminaCandPage.AddingNotesValidate();
    });

});
