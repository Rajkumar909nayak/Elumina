import test from '@lib/BaseTest';


/**Validation of Candidate Login page. > Chat App */


test(`iEX_TC_ID_191. @LowPriorityiExamCases Validation of Candidate Login page. > Chat App`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard(23, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.chatApp();
    });
});
