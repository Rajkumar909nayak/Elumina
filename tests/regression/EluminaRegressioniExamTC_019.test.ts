import test from '@lib/BaseTest';

//Validation of Browser Reload option on Candidate Dashboard

test(`iEX_TC_ID_33. @iExamRegression Verify Validation of Browser Reload option on Candidate Dashboard`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard(9, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.refreshPage();
        await eluminaCandPage.validationOfDashboardTitleInCandPage()

    });

});