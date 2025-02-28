import test from '@lib/BaseTest';

/**Validation of Candidate App Dashboard Details*/

test(`iEX_TC_ID_19. @iExamRegression Validation of Candidate App Dashboard Details`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application with inactive user`, async () => {
        await eluminaCandPage.candidateLoginToApplication(5, "bulk_user_details.xlsx");
        await eluminaCandPage.candidateContentSectionValidation();
    });

});