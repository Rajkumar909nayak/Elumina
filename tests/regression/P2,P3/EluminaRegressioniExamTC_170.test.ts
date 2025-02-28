import test from '@lib/BaseTest';


//Validation of Exam content section >  Chat App

test(`iEX_TC_ID_193. @LowPriorityiExamCases Validation of Exam content section >  Chat App`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(24, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.chatApp();

    });

});