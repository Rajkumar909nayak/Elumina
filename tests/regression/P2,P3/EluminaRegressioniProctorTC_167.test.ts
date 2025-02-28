import test from '@lib/BaseTest';


/**Validation of Candidate Dashboard page - Chat App */


test(` iProc_TC_ID_159. @LowPriorityiProctorCases Validation of Candidate Dashboard page - Chat App`, async ({ eluminaProctorCand, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaProctorCand.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.candidateLoginToApplications(2);
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaProctorCand.validationOfChatApp();
    });
});
