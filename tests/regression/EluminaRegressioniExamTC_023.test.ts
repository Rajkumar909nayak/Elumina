import test from '@lib/BaseTest';

//Validation of the "Timer" - After clicking on "Start Exam" Button

test(`iEX_TC_ID_45. @iExamRegression Verify Validation of the "Timer" - After clicking on "Start Exam" Button`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(13, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.verifyExamDashboardTimer();
    });
});