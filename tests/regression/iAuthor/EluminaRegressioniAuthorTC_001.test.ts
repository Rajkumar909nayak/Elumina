import test from '@lib/BaseTest';
import { zephyrTc } from '@pages/api_zephyrPage'


/**Validation of Assess App URL*/

test(`[T2783]. @RegressionA Validation of Assess App URL iAU_TC_ID_01`, async ({ eluminaLoginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
});
