import test from '@lib/BaseTest';

/**Validation of Login using valid credentials with Client Id and  Password*/

test(`iEX_TC_ID_10. @iExamRegression Validation of Sign out at Exam Start Page`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application with inactive user`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard(3, "bulk_user_details.xlsx");
    });

});