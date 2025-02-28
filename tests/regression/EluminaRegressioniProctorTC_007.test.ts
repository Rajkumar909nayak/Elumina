import test from '@lib/BaseTest';

/**Validation of Candidate App Dashboard*/

test(` iProc_TC_ID_7. @iProctorRegression Verify Validation of Candidate App Dashboard`, async ({ eluminaProctorCand, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaProctorCand.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.candidateLoginToApplications(2);
    });

});