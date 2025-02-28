import test from '@lib/BaseTest';

/**Validation of Exam section page  > Chat App*/

/*test(` . @LowPriorityiExamCases Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.clickonNextBtnInExam();
        await newtab.createSection("1", "30");
        await newtab.addMCQQuestions();
    });
});

test(` . @LowPriorityiExamCases Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addUserDetails();
        await newtab.downloadUserDetails();
    });
});     */

test(`iEX_TC_ID_194. @LowPriorityiExamCases Verify Validation of Exam section page  > Chat App`, async ({ eluminaCandPage, webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();

    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(25, "bulk_user_details.xlsx");
    });
    await test.step('Candidate uses chat app in Exam page', async () => {
        await eluminaCandPage.enterFieldsInChatApp(false);
    });
});

test(`iEX_TC_ID_198. @LowPriorityiExamCases Validate when user go offline while using chat app.`, async ({ eluminaCandPage, webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(26, "bulk_user_details.xlsx");
    });
    await test.step('Candidate uses chat app in Exam page', async () => {
        await eluminaCandPage.enterFieldsInChatApp(true);
    });
});

//EluminaRegressioniExamTC_171(iEX_TC_ID_198).test