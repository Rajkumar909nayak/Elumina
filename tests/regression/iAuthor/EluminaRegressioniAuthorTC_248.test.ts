import test from '@lib/BaseTest';
import { EluminaApproverPage } from '@pages/EluminaApproverPage';

/**Validation Question Approve*/

test(`iAU_TC_ID_248. @RegressionA Prerequisite Validation of Create Question (MCQ-SBA)`, async ({ eluminaApproverPage, eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.createMCQQuestionswithoutApprove();
    });
});


test(`iAU_TC_ID_248. @RegressionA Validation Question Approve`, async ({ eluminaLoginPage, eluminaApproverPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplicationWithApprover();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaApproverPage.iAuthorPageNavigation();
        await newtab.QuestionMenuClick();
        await newtab.workflowApprove();
    });
});
