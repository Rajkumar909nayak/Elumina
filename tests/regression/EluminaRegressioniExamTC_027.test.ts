import test from '@lib/BaseTest';

//Validation of  function keys after Exam Starts

test(`iEX_TC_ID_43. @iExamRegression Verify Validation of  function keys after Exam Starts`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(16, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.verifyExamDashboardTimer();
        await eluminaCandPage.functionKey(false, 'F7');
        await eluminaCandPage.examSectionValidation()
    });


});