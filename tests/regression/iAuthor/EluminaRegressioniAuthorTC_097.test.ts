import test from '@lib/BaseTest';

/**Validation of Question Save as New version */

test(`iAU_TC_ID_97. @RegressionA Validation of Question Save as New version  `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.validateEditQuestion();
        await newtab.validateVersionInQunPage();
    });

});