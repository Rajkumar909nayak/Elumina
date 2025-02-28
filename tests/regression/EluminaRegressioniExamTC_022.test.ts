import test from '@lib/BaseTest';

//Validation of Changing Font Size to Decrease on the Dashboard

test(`iEX_TC_ID_36B. @iExamRegression Verify Validation of Changing Font Size to Decrease on the Dashboard`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard(12, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.clickOnStartExam();
        await eluminaCandPage.decreaseFontSize();
        await eluminaCandPage.validationOfDashboardTitleInCandPage()

    });

});