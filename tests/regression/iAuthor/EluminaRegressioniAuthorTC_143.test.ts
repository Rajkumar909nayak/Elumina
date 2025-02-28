import test from '@lib/BaseTest';

/**Validation of Blueprint No Workflow */

test(`iAU_TC_ID_143  Validation of Blueprint No Workflow`, async ({ eluminaLoginPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaExamPage.iAuthorPageNavigation();
        await newtab.searchDraftExamQuestionToApprove();
        await newtab.logoutClick()
    });
});
