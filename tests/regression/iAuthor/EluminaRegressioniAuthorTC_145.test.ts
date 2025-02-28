import test from '@lib/BaseTest';
import { NewLineKind } from 'typescript';

/**Validation of Blueprint  Direct workflow*/

test(`iAU_TC_ID_145. @RegressionA Validation of Blueprint  Direct workflow`, async ({ eluminaLoginPage, eluminaBlueprintsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.searchDraftExam();
        await newtab.editDate()
        await newtab.clickOnSave()
        await newtab.editQuestion()
        await newtab.removeSections()
        await newtab.createSection()
        await newtab.clickOnSave()
        await newtab.clickOnSaveForEditQun()
        await newtab.addVSAQQuestionswithoutNextForEditQun()
        await newtab.clickOnSave()
        await newtab.validateQunApprovalWorkflowWithSubmitAndApprove()
        await newtab.logoutClick()
    });

});