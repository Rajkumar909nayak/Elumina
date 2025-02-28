import test from '@lib/BaseTest';

//Validation of Candidate App URL, Login Page 


test(`iEX_TC_ID_2. @Smoke Verify Validation of Candidate App URL, Login Page`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard(2, "bulk_user_details.xlsx");
        await eluminaCandPage.logoutClick();
    });

});