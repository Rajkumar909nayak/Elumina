import test from '@lib/BaseTest';
import { chromium } from '@playwright/test';


/**Validation of Centralize Login page (Negative Scenario 1)*/
test(`iAU_TC_ID_18. @RegressionA Validation of Centralize Login page (Negative Scenario 1) `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.enterModuleURL();
    });
});