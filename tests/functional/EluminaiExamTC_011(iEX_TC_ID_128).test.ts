import test from '@lib/BaseTest';

//Validation of Invigilator Dashboard

test(`iEX_TC_ID_128,iEX_TC_ID_159. @Smoke Verify Validation of Invigilator Dashboard`, async ({ eluminaInvPage, webActions }) => {

    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.invigilatorLogin();
    });

    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        await newtab.invDashboardValidations();
        await newtab.logoutClick();
    });
});