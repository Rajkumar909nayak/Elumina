import test from '@lib/BaseTest';

/**Validation of login for invigilator for valid credential */

test(` iProc_TC_ID_73. @iProctorRegression Validation of login for invigilator for valid credential`, async ({ eluminaInvPage, webActions }) => {

    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.iProctorinvigilatorLogin();
    });

    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
    });
});