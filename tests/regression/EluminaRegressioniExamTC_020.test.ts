import test from '@lib/BaseTest';

//Validation of  function keys on Candidate Dashboard

test(`iEX_TC_ID_34. @iExamRegression Verify Validation of  function keys on Candidate Dashboard`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard(10, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.functionKey(false, 'F4');
        await eluminaCandPage.validationOfDashboardTitleInCandPage()

    });

});