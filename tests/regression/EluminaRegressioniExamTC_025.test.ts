import test from '@lib/BaseTest';

//Validation of Browser back button after Exam Starts

test(`iEX_TC_ID_32,iEX_TC_ID_42. @iExamRegression Verify Validation of Browser back button after Exam Starts`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(14, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.verifyExamDashboardTimer();
        await eluminaCandPage.navigateBack();
        await eluminaCandPage.examSectionValidation()
    });

});