import test from '@lib/BaseTest';

/**"Validation of Exam Preview
( Reviewer, Approver, Examiner) "*/

test(`iAU_TC_ID_167. @RegressionA "Validation of Exam Preview
( Reviewer, Approver, Examiner) "`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplicationAsReviewer();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.ValidationOfExamPreview();

    });
});