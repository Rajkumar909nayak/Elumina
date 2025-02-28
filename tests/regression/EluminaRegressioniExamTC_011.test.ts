import test from '@lib/BaseTest';

/**Validation of Candidate Start Exam*/

test(`iEX_TC_ID_20. @iExamRegression Validation of Candidate Start Exam`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application with and start exam`, async () => {
        await eluminaCandPage.candidateLoginToApplication(4, "bulk_user_details.xlsx");
        await eluminaCandPage.examSectionValidation();
    });

});