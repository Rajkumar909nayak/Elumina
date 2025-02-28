import test from '@lib/BaseTest';


/**Validation of Exam content page -> (Terms & Conditions) Font size validation */

test(`iEX_TC_ID_11. @LowPriorityiExamCases Validation of Login using Invalid credentials Scenario 1 TC-09`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateInvalidLoginUsername();
    });
});

test(`iEX_TC_ID_12,iEX_TC_ID_13. @LowPriorityiExamCases Validation of Login using Invalid credentials Scenario 2 TC-10`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateInvalidLoginPassword();
    });
});

test(`iEX_TC_ID_229. @LowPriorityiExamCases Verify Validation of Login using valid credentials in browser offline`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate try to Login for application in offline`, async () => {
        await eluminaCandPage.candidateLoginToApplicationoffline(2, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
    });
});


test(`iEX_TC_ID_17. @LowPriorityiExamCases Validation of Sign out at Candidate Dashboard Page TC-14`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAppandSignout(2, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
    });
});

test(`iEX_TC_ID_17. @LowPriorityiExamCases Validation of Sign out at Exam Start Page TC-15`, async ({ eluminaCandPage, eluminaCadInvPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(2, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
        await eluminaCadInvPage.logoutClick();
    });
});

test(`iEX_TC_ID_36. @LowPriorityiExamCases Validation of Candidate dashboard > Exam Start page Font size validation. TC-27`, async ({ eluminaCandPage, eluminaCadInvPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(2, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.increaseFontSize();
        await eluminaCandPage.popup();
        await eluminaCandPage.decreaseFontSize();
    });
});

test(`iEX_TC_ID_44. @LowPriorityiExamCases Validation of Exam content page -> (Terms & Conditions) Font size validation TC-33`, async ({ eluminaCadInvPage, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(2, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.termsandconditionsclick();
    });
});


test(`iEX_TC_ID_52. @LowPriorityiExamCases Validation of Exam content page -> Questions download at content section-> Browser shut down TC-40`, async ({ eluminaCadInvPage, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(2, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateContentSectionVerificationwithoutnext();
    });
});

test(`iEX_TC_ID_197. @LowPriorityiExamCases Validation of textbox capabilities of chat app. TC-174`, async ({ eluminaCadInvPage, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(2, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateContentSectionVerifications();
        await eluminaCandPage.chatApp();
    });

});

test(`iEX_TC_ID_114. @LowPriorityiExamCases Verify Validation of Candidate attends All Question type`, async ({ eluminaCadInvPage, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(2, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateAttendsAllQVSAQ(100);
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.refreshPage();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ(100);
        await eluminaCandPage.candidateStartSJT();
    });

});

/**Validation of Submit Exam page  > Chat App*/

test(`iEX_TC_ID_196. @LowPriorityiExamCases Verify Validation of Submit Exam page  > Chat App TC-173`, async ({ eluminaCadInvPage, eluminaCandPage, webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(2, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateAttendsAllQVSAQ(100);
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ(100);
        await eluminaCandPage.candidateStartSJT();
    });
    await test.step('Candidate uses chat app in Submit exam page', async () => {
        // await eluminaCandPage.enterFieldsInChatApp(false);
        await eluminaCandPage.chatApp();

    });
});  