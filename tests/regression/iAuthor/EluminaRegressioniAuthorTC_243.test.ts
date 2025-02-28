import test from '@lib/BaseTest';

/**Validation Question of Submit for Approval */

test.describe(() => {
    test(`iAU_TC_ID_243. @RegressionA Validation Question of Submit for Approval`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to iAuthor`, async () => {
            const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
            await newtab.QuestionsMenuClick();
            await newtab.createMCQQuestionswithoutWorkFlow();
            await newtab.validateQunApprovalWorkflow()
            await newtab.logoutClick()
        });
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Application`, async () => {
            await eluminaLoginPage.loginToApplicationAsReviewer();
        });
        await test.step(`Navigate to iAuthor`, async () => {
            const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
            await newtab.QuestionsMenuClick();
            await newtab.clickOnIDAndclickOnApproval();
            await newtab.logoutClick()
        });

        // test(`iAU_TC_ID_243B. @RegressionA Validation Question of Submit for Approval`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
        //     await test.step(`Navigate to Application`, async () => {
        //         await eluminaLoginPage.navigateToURL();
        //     });
        //     await test.step(`Login to Application`, async () => {
        //         await eluminaLoginPage.loginToApplicationAsReviewer();
        //     });
        //     await test.step(`Navigate to iAuthor`, async () => {
        //         const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        //         await newtab.QuestionsMenuClick();
        //         await newtab.clickOnIDAndclickOnApproval();
        //         await newtab.logoutClick()
        //     });
    });
});