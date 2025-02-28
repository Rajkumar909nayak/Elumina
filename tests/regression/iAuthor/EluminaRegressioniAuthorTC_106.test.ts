import test from '@lib/BaseTest';

/**Validation of Statistics */
/*test(`iAU_TC_ID_106. @RegressionA Validation of Statistics `, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.examTabNavigation();
        await newtab.createCommonExam();
        await newtab.selectAllTools();
        await newtab.createSection("1", "30");
        await newtab.addMCQQuestionswithoutSave();
        await newtab.addVSAQQuestions();
    });
});

test(`iAU_TC_ID_106B. @RegressionA Validation of Statistics`, async ({ eluminaLoginPage, eluminaRegInvPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.adminPageNavigation();
        await newtab.clickOnImportInAdmin();
        await newtab.csvFileDownload("CSVFile_details.xlsx")
        await newtab.modifyTheQuestions("CSVFile_details.xlsx")
        //await newtab.importExcel()
        // await newtab.BulkDownloadUserDetails("bulk_user_details.xlsx");
        // await newtab.addInv();
        // await newtab.searchUserForAddingInv(2, "bulk_user_details.xlsx")
    });
});*/