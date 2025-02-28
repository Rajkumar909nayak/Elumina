import test from '@lib/BaseTest';

/**Validation of multiple candidate trying to login to same Exam*/

test(`iEX_TC_ID_220. @LowPriorityiExamCases Validation of Candidate Recovery Sync Page Validation`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step('Candidate Atted the Exam in Offline', async () => {
        await eluminaCandPage.candidateSyncPageValidation();
    });

});