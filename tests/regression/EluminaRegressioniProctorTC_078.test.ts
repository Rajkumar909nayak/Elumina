import test from '@lib/BaseTest';

/**Validation of Invigilator Dashboard after the Exam Completion by candidate (With in the specified time line) */

test(`iProc_TC_ID_74. @iProctorRegression Validation of Invigilator Dashboard after the Exam Completion by candidate (With in the specified time line)`, async ({ eluminaInvPage, webActions }) => {

    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.iProctorinvigilatorLogin();
    });

    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        await newtab.invDashboardValidations();
        await newtab.clickonexam();

    });
});