import test from '@lib/BaseTest';

/**Validation of Exam Save as New version  */

test(`iAU_TC_ID_162. @RegressionA Validation of Exam Save as New version `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.ExamsMenuClick();
        await newtab.ValidationOfExamDuplicate();
        await newtab.ValidationOfExamSaveNewVersion();
        await newtab.logoutClick()
    });

});