import test from '@lib/BaseTest';

//Login as an invigilator - Validation of UN, PWD & the URL

test(`iEX_TC_ID_126. @Smoke Login as an invigilator - Validation of UN, PWD & the URL`, async ({ eluminaInvPage, webActions }) => {

    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.invigilatorLogin();
    });

    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        await newtab.iAuthorPageVerification();
        await newtab.logoutClick();

    });
});