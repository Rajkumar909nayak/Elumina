import test from '@lib/BaseTest';

//Validation of login for invigilator for valid credential

test(`iEX_TC_ID_126. @iExamRegression Verify Validation of login for invigilator for valid credential`, async ({ eluminaInvPage, webActions }) => {

    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.invigilatorLogin();
    });

    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        await newtab.invDashboardValidations();

    });
});