import test from '@lib/BaseTest';

/**Validation of user authentication by valid Candidate Creadentials */

test(`iEX_TC_ID_9. @iExamRegression Validation of user authentication by valid Candidate Creadentials`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard(2, "bulk_user_details.xlsx");
    });
});

test(`iEX_TC_ID_4. @iExamRegression Validation of Empty Field validation`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Click on Login without Username and Password`, async () => {
        await eluminaCandPage.logintoAppwithoutUserPwd();
        await eluminaCandPage.validationOfPopessageInCandLoginPage();

    });
});
