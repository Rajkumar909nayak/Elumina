import test from '@lib/BaseTest';

/**Validate Candidate while attending exam - Candidate abruptly closed the browser */


test(`iEX_TC_ID_56,iEX_TC_ID_212. @iExamRegression Verify Validation of abrupt closure of browser`, async ({ eluminaCandPage, webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(19, "bulk_user_details.xlsx");
    });
    await test.step('Candidate starts and closes the page after attending two questions in the exam', async () => {
        await eluminaCandPage.candidateStartTwoMCQ();
    });
});


test(`iEX_TC_ID_56B. @iExamRegression Verify Candidate is able to close the broswer and answered questions are saved after logging in again`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
        await eluminaCandPage.candidateLoginToApplication(19, "bulk_user_details.xlsx");
        await eluminaCandPage.candidateStartMCQwithoutReviewe();
        console.log("Candidate is able to close the broswer and answered questions are saved after logging in again")

    });
});
