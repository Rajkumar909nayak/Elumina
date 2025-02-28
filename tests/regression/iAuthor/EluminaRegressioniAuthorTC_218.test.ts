import test from '@lib/BaseTest';

/**Validation of Delivery --> Live Monitor*/

test.describe(() => {
    test(` iAU_TC_ID_218. @RegressionA Pre-Request Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaProctorExam, eluminaHomePage, eluminaExamPage, webActions }) => {
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
            const newtab = await eluminaProctorExam.iAuthorPageNavigation();
            await newtab.examTabNavigation();
            await newtab.createExam();
            await newtab.createSections("1", "30");
            await newtab.addMCQQuestions();
        });
    });

    test(` iAU_TC_ID_218. @RegressionA Pre-Request "Validation of Delivery --> Add New Users"`, async ({ eluminaLoginPage, eluminaProctorReg, eluminaRegInvPage, eluminaRegPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Elumina application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to exam Tab and Create New user`, async () => {
            const newtab = await eluminaProctorReg.iAuthorPageNavigations();
            await newtab.registrationTabNavigation();
            await newtab.addMultipleUserDetails();
            await newtab.BulkDownloadUserDetails();
            await newtab.addExistingUsers();
            await newtab.searchCandidate();
            await newtab.logoutClick();
        });
    });

    test(`iAU_TC_ID_218. @RegressionA Validation of Delivery--> Live Monitor - Candidate answer response Validation`, async ({ eluminaRegPage, eluminaLoginPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to iAuthor`, async () => {
            const newtab = await eluminaRegPage.iAuthorPageNavigations();
            await newtab.clickOnCreatedExamProctoring();
            await newtab.liveMonitorProctoring();
        });
    });

    test(`iAU_TC_ID_219A. @RegressionA Validation of Delivery--> Live Monitor - Live Streaming page`, async ({ eluminaCandPage, eluminaRegPage, eluminaLoginPage, eluminaProctorExam, eluminaProctorCand, eluminaProctorReg, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await test.step(`Navigate to Application`, async () => {
                await eluminaLoginPage.navigateToURL();
            });
            await test.step(`Login to Elumina application`, async () => {
                await eluminaLoginPage.loginToApplication();
            });
            await test.step(`Navigate to exam Tab and Create New user`, async () => {
                const newtab = await eluminaRegPage.iAuthorPageNavigations();
                await newtab.clickOnCreatedExamProctoring();
                await newtab.clickOnImageandCadidate();
            });
        });
    });
});