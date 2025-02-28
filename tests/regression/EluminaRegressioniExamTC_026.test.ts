import test from '@lib/BaseTest';

//Validation of Browser Reload option after Exam Starts

test(`iEX_TC_ID_41. @iExamRegression Verify Validation of Browser Reload option after Exam Starts`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(15, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.verifyExamDashboardTimer();
        await eluminaCandPage.refreshPage();
        await eluminaCandPage.examSectionValidation()
    });


});