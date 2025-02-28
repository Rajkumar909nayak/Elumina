import test from '@lib/BaseTest';
import { chromium } from '@playwright/test';


/**Validation of Login page (Negative Scenario 2)*/
test(`iAU_TC_ID_19. @RegressionA Validation of Login page (Negative Scenario 2) `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.enterDashboardURL();
        await eluminaCreateQuestionsPage.logoutClick()
    });
});