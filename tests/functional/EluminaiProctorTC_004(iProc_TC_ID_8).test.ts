import test from '@lib/BaseTest';
/*Validation of candidate choosing proctoring exam in dashboard*/

test(`iProc_TC_ID_8. @Smoke Validation of candidate choosing proctoring exam in dashboard`, async ({ eluminaCadInvPage, eluminaProctorCand, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.candidateLoginToApplications(2);
        await eluminaCadInvPage.logoutClick();
    });

});