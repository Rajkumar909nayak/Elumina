import test from '@lib/BaseTest';

/**Validation of Delivery --> Venue Summary*/

test.describe(() => {
    test(` iAU_TC_ID_205. @RegressionA Pre-Request Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
            await newtab.addMCQQuestionswithoutSave();
            await newtab.addVSAQQuestions();
            await newtab.logoutClick()

        });
    });

    test(` iAU_TC_ID_205. @RegressionA Pre-Request "Validation of Delivery --> Add New Users"`, async ({ eluminaLoginPage, eluminaRegInvPage, eluminaRegPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Elumina application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to exam Tab and Create New user`, async () => {
            const newtab = await eluminaRegPage.iAuthorPageNavigations();
            await newtab.registrationTabNavigation();
            await newtab.addMultipleUserDetails(1);
            await newtab.BulkDownloadUserDetails("bulk_user_details.xlsx");
            await newtab.addInv();
            await newtab.searchUserForAddingInv(2, "bulk_user_details.xlsx");
            await newtab.logoutClick();
        });
    });

    test(`iAU_TC_ID_180. @RegressionA Validation of Manage Delivery --> Edit user `, async ({ eluminaRegPage, eluminaLoginPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to iAuthor`, async () => {
            const newtab = await eluminaRegPage.iAuthorPageNavigations();
            await newtab.clickOnCreatedExam();
            await newtab.editUser();
        });
    });


    test(`iAU_TC_ID_205. @RegressionA Validation of Delivery --> Venue Summary `, async ({ eluminaRegPage, eluminaLoginPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to iAuthor`, async () => {
            const newtab = await eluminaRegPage.iAuthorPageNavigations();
            await newtab.clickOnCreatedExam();
            await newtab.venueSummary();
            await newtab.logoutClick()

        });
    });


    test(`iAU_TC_ID_206.,iAU_TC_ID_210.,iAU_TC_ID_209.,iAU_TC_ID_211 @RegressionA Validation of Delivery --> Live Dashboard `, async ({ eluminaRegPage, eluminaLoginPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to iAuthor`, async () => {
            const newtab = await eluminaRegPage.iAuthorPageNavigations();
            await newtab.clickOnCreatedExam();
            await newtab.liveDashboard();
            await newtab.logoutClick()

        });
    });
});
