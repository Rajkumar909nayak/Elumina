import test from '@lib/BaseTest';
import { EluminaApproverPage } from '@pages/EluminaApproverPage';

/**Validation of Exam Approve*/

test.describe(() => {
    test(`iAU_TC_ID_247. @RegressionA Prerequisite Validation of Exam Approve"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
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
            await newtab.saveDraft();
        });
    });


    test(`iAU_TC_ID_247. @RegressionA Validation of Blueprint  Approval Workflow `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to iAuthor`, async () => {
            const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
            await newtab.ExamsMenuClick();
            await newtab.validateExamApprovalWorkflow();
            await newtab.logoutClick()
        });

    });


    test(`iAU_TC_ID_250. @RegressionA Validation of Exam Approve`, async ({ eluminaLoginPage, eluminaReviewerPage, eluminaExamPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Application`, async () => {
            await eluminaLoginPage.loginToApplicationWithReviwerer();
        });
        await test.step(`Navigate to iAuthor`, async () => {
            const newtab = await eluminaReviewerPage.iAuthorPageNavigation();
            await newtab.todoList();
        });
    });

    test(`iAU_TC_ID_250. @RegressionA Exam Reject`, async ({ eluminaLoginPage, eluminaApproverPage, eluminaExamPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Application`, async () => {
            await eluminaLoginPage.loginToApplicationWithApprover();
        });
        await test.step(`Navigate to iAuthor`, async () => {
            const newtab = await eluminaApproverPage.iAuthorPageNavigation();
            await newtab.todoListApprover();
        });
    });
});
