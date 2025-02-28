import test from '@lib/BaseTest';

//Validation of user authentication by invalid Candidate Creadentials

test(`iEX_TC_ID_13. @Smoke Verify Validation of user authentication by invalid Candidate Creadentials`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application with wrong password`, async () => {
        await eluminaCandPage.candidateInvalidLoginCredential();
    });

});