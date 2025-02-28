import test from '@lib/BaseTest';

//Validation of Invigilator Dashboard (Proctor)

test(`iProc_TC_ID_56. @Smoke Verify Validation of Invigilator Dashboard Proctor`, async ({ eluminaInvPage, webActions }) => {

    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.iProctorinvigilatorLogin();
    });

    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        await newtab.iAuthorPageVerification();
        await newtab.invDashboardValidations();
        //await newtab.validateExamStatus();
        await newtab.logoutClick();

    });
});