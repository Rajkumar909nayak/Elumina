import test from '@lib/BaseTest';

/**Validation of Sign out at Candidate Dashboard Page*/

test(`iEX_TC_ID_16. @iExamRegression Validation of Sign out at Candidate Dashboard Page`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application with inactive user`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard(2, "bulk_user_details.xlsx");
        await eluminaCandPage.logoutClick()
        await eluminaCandPage.validationOfLogoInCand()
    });

});