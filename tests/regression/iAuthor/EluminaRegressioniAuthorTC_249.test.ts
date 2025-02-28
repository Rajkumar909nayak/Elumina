import test from '@lib/BaseTest';
import { EluminaApproverPage } from '@pages/EluminaApproverPage';

/**Validation of Blueprint Approve*/
test.describe(() => {
    test(`iAU_TC_ID_249. @RegressionA "Validation of Create Blueprint(Negative Scenarios)"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to iAuthor blueprint`, async () => {
            const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
            await newtab.BlueprintMenuClick();
            await newtab.createBluePrint();
        });
    });



    test(`iAU_TC_ID_249. @RegressionA Validation of Blueprint Approve`, async ({ eluminaLoginPage, eluminaApproverPage, eluminaExamPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Application`, async () => {
            await eluminaLoginPage.loginToApplicationWithApprover();
        });
        await test.step(`Navigate to iAuthor`, async () => {
            const newtab = await eluminaApproverPage.iAuthorPageNavigation();
            await newtab.BlueprintMenuClick();
            await newtab.clickOnQutnId()
            await newtab.workflowApprove();
        });
    });
});