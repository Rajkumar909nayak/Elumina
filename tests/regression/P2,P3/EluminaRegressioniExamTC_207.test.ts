import test from '@lib/BaseTest';

//Validation of copy paste in password field

test(`iEX_TC_ID_230. @LowPriorityiExamCases Validation of copy paste in password field`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.enterCandidateCredetialonly(8, "bulk_user_details.xlsx");
    });
});