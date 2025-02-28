import test from '@lib/BaseTest';

//Validation of Exam content section page contents and details

/*test(` . @iExamRegression Create a Exam and add MCQ Questions`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
        await eluminaLoginPage.verifyProfilePage();
    });
    await test.step(`Navigate to exam Tab and Create New Exam and add MCQ Questions`, async () => {
        const newtab = await eluminaExamPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createCommonExam();
        await newtab.clickonNextBtnInExam();
        await newtab.createContentSection("1");
        await newtab.createContentPageWithMoreDescription();
        await newtab.createSection("1", "30");
        await newtab.addMCQQuestions();
    });
});


test(` . @iExamRegression add user and download user details`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
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

test(`iEX_TC_ID_39. @iExamRegression Verify Validation of Exam content section page contents and details`, async ({ eluminaCandPage, eluminaProctorCand, webActions }) => {
    await test.step('Candidate logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaCandPage.candidateLoginToApplication(8, "bulkUserCredentialForMcqExamwithContentSection.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateContentSectionValidation();

    });

});