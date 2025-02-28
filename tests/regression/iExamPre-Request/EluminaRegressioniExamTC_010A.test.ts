import test from '@lib/BaseTest';

test(` . @Pre-Request Verify Elumina Login and Create Exam for Ranking question`, async ({ eluminaLoginPage, eluminaRegPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
        await eluminaLoginPage.verifyProfilePage();
    });
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaExamPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createCommonExam();
        await newtab.selectAllTools();
        await newtab.createSection("1", "30");
        await newtab.addRankingQuestions();
        const newtab1 = await eluminaRegPage.iAuthorPageNavigations();
        await newtab1.registrationTabNavigation();
        await newtab1.addMultipleUserDetails('1')
        await newtab1.BulkDownloadUserDetails("rankingquestion_user_details.xlsx");
        await newtab1.logoutClick()
    });
});