import test from '@lib/BaseTest';

test(`iEX_TC_ID_225. @iExamRegression Verify Candidate while attending exam - Offline - try to press any F1 to F12 keys`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(17, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.verifyExamDashboardTimer();
        await eluminaCandPage.functionKey(true, 'F8');
        await eluminaCandPage.examSectionValidation()
    });

});