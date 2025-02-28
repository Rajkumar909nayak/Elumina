import test from '@lib/BaseTest';

//Validation of Browser back button on Candidate Dashboard

test(`iEX_TC_ID_31. @iExamRegression Verify Validation of Browser back button on Candidate Dashboard`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard(8, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.navigateBack();
        await eluminaCandPage.validationOfDashboardTitleInCandPage()
    });

});
