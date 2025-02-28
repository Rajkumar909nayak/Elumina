import test from '@lib/BaseTest';

/*test(`Exam_Prerequisit_for_iEX_TC_ID_236. @iExamRegression Verify Elumina Login and create exam `, async ({ eluminaLoginPage, eluminaMinimalTimeExamPage, webActions }) => {
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
        const newtab = await eluminaMinimalTimeExamPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createExam(0);
        await newtab.createSection("0", "1");
        await newtab.addMCQQuestions();
    });
});

test(`Exam_Prerequisit_for_iEX_TC_ID_236. @iExamRegression Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigationforMinimaltime();
        await newtab.addUserDetails();
        await newtab.downloadUserDetails();
    });
});                 */

test(`iEX_TC_ID_236. @iExamRegression Validation of Candidate dashboard > Exam scheduled Date / Time is over.`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.enterCandidateCredetial(4, "bulkUserCredentialForMinimalTimeExam.xlsx");
    });
    await test.step('validate Exam not Available in the Dashboard', async () => {
        await eluminaCandPage.ExamAvailabilityCheck();
    });

});
