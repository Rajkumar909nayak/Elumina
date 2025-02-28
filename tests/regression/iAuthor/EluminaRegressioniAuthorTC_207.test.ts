import test from '@lib/BaseTest';

/**"Validation of Delivery
--> Live Dashboard filters"*/

test(`iAU_TC_ID_207. @RegressionA "Validation of Delivery--> Live Dashboard filters"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.clickOnDelivery();
        await newtab.logoutClick()
    });

});

/**
 * Validation of Delivery
--> Live Dashboard all exam status count
 */

test(`iAU_TC_ID_208. @RegressionA "Validation of Delivery--> Live Dashboard all exam status count"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.verifyLiveDashboardExamStatus();
        await newtab.logoutClick()
    });

});
