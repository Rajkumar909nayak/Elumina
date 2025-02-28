import test from '@lib/BaseTest';

/**Validate login with inactive user */

test(`iEX_TC_ID_14. @iExamRegression Validate login with inactive user`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application with inactive user`, async () => {
        await eluminaCandPage.candidateInvalidLoginCredential();
    });

});