import test from '@lib/BaseTest';

/**"Validation of Exam Preview(PDF) " */

test(`iAU_TC_ID_165. @RegressionA "Validation of Exam Preview(PDF) " `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.ValidationOfExamPreview();

    });
});