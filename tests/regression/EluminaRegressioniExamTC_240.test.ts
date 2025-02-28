import test from '@lib/BaseTest';

//import test from '@lib/BaseTest';

//Validation of Exam section > After Exam Time Expires

/*test(` . @iExamRegression Validation of "Time Remaining" pop-up when the just before the exam time runs out`, async ({ eluminaLoginPage, eluminaMinimalTimeExamPage, eluminaExamPage, webActions }) => {
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
        await newtab.createSection("0", "1");
        await newtab.addMCQQuestion();
        await newtab.addVSAQQuestion();
        await newtab.addISAWEQuestion();
        await newtab.addTypeXQuestion();
        await newtab.addTypeBQuestion();
        await newtab.addSAQQuestion();
        await newtab.addSJTQuestion();
    });
});

test(` . @iExamRegression Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
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
        await newtab.addExistingUsers();
    });
});        */

test(`iEX_TC_ID_89. @iExamRegression Validation of Exam section > After Exam Time Expires`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();

    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(5, "bulkUserCredentialForMinimalTimeExam.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.waitforTime3();
        await eluminaCandPage.clickOnAutoSubmitOKPopup();
        await eluminaCandPage.candidateStartOneMCQ();
        //await eluminaCandPage.candidateAttendsAllQVSAQ(100);
        await eluminaCandPage.clickOnAutoSubmitOKPopup();

    });
});

test(`iEX_TC_ID_89A. @iExamRegression Validation of Exam section > After Exam Time Expires `, async ({ eluminaInvPage, webActions }) => {

    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.invigilatorLogin();
    });

    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        await newtab.invDashboardValidations();
        await newtab.ClickOnExamLink()
        await newtab.clickOnLivemonitorID()
        await newtab.verifyAnsAsInv()


    });
});


