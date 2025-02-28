import test from '@lib/BaseTest';

/*Validation of user authentication by valid Candidate Creadentials*/

test(`iProc_TC_ID_5. @SmokeValidation of user authentication by valid Candidate Creadentials
`, async ({ eluminaCadInvPage, eluminaProctorCand, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.candidateLoginToApplications(2);
        await eluminaCadInvPage.logoutClick();
    });
});