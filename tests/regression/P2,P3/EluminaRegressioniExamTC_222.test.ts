import test from '@lib/BaseTest';

/**"Validation of 
exam response recovery page with no recovery file available in Download offline recovery file"*/

test(`iEX_TC_ID_222. @LowPriorityiExamCases "Validation of 
exam response recovery page with no recovery file available in Download offline recovery file"`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(27, "bulk_user_details.xlsx");
    });
    await test.step('Candidate Atted the Exam in Offline', async () => {
        await eluminaCandPage.canddiateRecovery();
    });

});

