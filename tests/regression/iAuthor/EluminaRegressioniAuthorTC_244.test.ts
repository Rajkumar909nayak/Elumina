import test from '@lib/BaseTest';

/**Validation of Blueprint Submit for Approval */

test.describe(() => {
    test(`iAU_TC_ID_244. @RegressionA Validation of Blueprint Submit for Approval`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to iAuthor`, async () => {
            const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
            await newtab.BlueprintMenuClick();
            await newtab.createDraftBluePrint()
            await newtab.searchDraftBlueprintQuestionToApprove();
            await newtab.addQuestionsToCartWithoutApprove()
            await newtab.validateQunApprovalWorkflow1()
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
            await newtab.BlueprintMenuClick();
            await newtab.clickOnIDAndclickOnApproval();
            await newtab.logoutClick()
        });
    });

    // test(`iAU_TC_ID_244B. @RegressionA Validation of Blueprint Submit for Approval`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
    //     await test.step(`Navigate to Application`, async () => {
    //         await eluminaLoginPage.navigateToURL();
    //     });
    //     await test.step(`Login to Application`, async () => {
    //         await eluminaLoginPage.loginToApplicationAsReviewer();
    //     });
    //     await test.step(`Navigate to iAuthor`, async () => {
    //         const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
    //         await newtab.BlueprintMenuClick();
    //         await newtab.clickOnIDAndclickOnApproval();
    //         await newtab.logoutClick()
    //     });
    // });   
});