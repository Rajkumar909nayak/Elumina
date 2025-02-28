import test from '@lib/BaseTest';
import { commonPages } from '@pages/commonPages';

//Create the Exams, Users and Invigilators with the combinations mentioned in Summary tab 

test(`iEX_TC_ID_1. @Smoke Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, eluminExamianvPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
        await eluminaLoginPage.verifyProfilePage();
    });
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaExamPage.iAuthorPageNavigation();
        await newtab.createExam();
        await newtab.createSection("1", "30");
        await newtab.addMCQQuestions();

    });
});

test(`iEX_TC_ID_1A. @Smoke Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        //await newtab.clickaddMoreUsersIcon(25)
        await newtab.addMultipleUserDetails(0);
        await newtab.BulkDownloadUserDetails("bulk_user_details.xlsx");
        await newtab.addInv();
        await newtab.searchUserForAddingInv(2, "bulk_user_details.xlsx")
    });
});