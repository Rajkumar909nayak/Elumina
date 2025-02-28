import test from '@lib/BaseTest';

/**Validation of multiple candidate trying to login to same Exam*/

test(`iEX_TC_ID_18. @iExamRegression Validation of multiple candidate trying to login to same Exam`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(7, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.examSectionValidation();
    });

});
