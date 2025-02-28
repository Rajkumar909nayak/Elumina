import test from '@lib/BaseTest';


/**Validation of Exam content page -> Questions download at content section-> Browser shut down */


test(`iEX_TC_ID_52. @LowPriorityiExamCases Validation of Exam content page -> Questions download at content section-> Browser shut down`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplicationwithoutclickingLogin(16, "bulk_user_details.xlsx");
        await eluminaCandPage.HotKeyPress();
    });

});


