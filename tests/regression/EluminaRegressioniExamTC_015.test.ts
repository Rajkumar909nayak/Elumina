import test from '@lib/BaseTest';

/**Password will not be asked after clicking on "Start Exam"*/

test(`iEX_TC_ID_22,iEX_TC_ID_78. @iExamRegression Password will not be asked after clicking on "Start Exam"`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application with inactive user`, async () => {
        await eluminaCandPage.candidateLoginToApplication(6, "bulk_user_details.xlsx");
        await eluminaCandPage.examSectionValidation();
    });

});