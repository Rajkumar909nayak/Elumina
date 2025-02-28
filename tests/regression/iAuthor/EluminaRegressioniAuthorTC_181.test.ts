import test from '@lib/BaseTest';

/**Validation of Manage Delivery --> Delete Users*/

test(` iAU_TC_ID_181. @RegressionA Pre-Request Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.logoutClick()
    });
});

test(` iAU_TC_ID_181.,iAU_TC_ID_183.,iAU_TC_ID_199. @RegressionA Pre-Request "Validation of Delivery --> Add New Users"`, async ({ eluminaLoginPage, eluminaRegInvPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addMultipleUserDetails(1);
        await newtab.BulkDownloadUserDetails("bulk_user_details.xlsx");
        await newtab.DeleteUserFromMoreOptionPositive();
        await newtab.logoutClick()
    });
});

test(`iAU_TC_ID_181. @RegressionA Validation of Manage Delivery --> Delete Users `, async ({ eluminaRegPage, eluminaLoginPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.clickOnCreatedExam();
        await newtab.DeleteUser();
        await newtab.logoutClick()
    });
});


test(` iAU_TC_ID_190. @RegressionA Validation of Manage Delivery--> Assign Venue and Booking Details`, async ({ eluminaLoginPage, eluminaRegInvPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.clickOnCreatedExam();
        await newtab.AssignVenueBookingFromMoreOption();
        await newtab.logoutClick()
    });
});

test(`iAU_TC_ID_182.,iAU_TC_ID_184. @RegressionA Validation of Manage Delivery--> Delete Users (Negative Scenario) `, async ({ eluminaRegPage, eluminaLoginPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.clickOnCreatedExam();
        await newtab.DeleteUserFromMoreOption();
        await newtab.logoutClick()
    });
});

test(` iAU_TC_ID_185.,iAU_TC_ID_186. @RegressionA Validation of Manage Delivery --> Download User Details`, async ({ eluminaLoginPage, eluminaRegInvPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.clickOnCreatedExam();
        await newtab.dropdownButton();
        await newtab.downloadUserDetails();
        await newtab.logoutClick()
    });
});

test(` iAU_TC_ID_189. @RegressionA Validation of Manage Delivery--> Generate Temp ID`, async ({ eluminaLoginPage, eluminaRegInvPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        await test.step(`Navigate to exam Tab and Create New user`, async () => {
            const newtab = await eluminaRegPage.iAuthorPageNavigations();
            await newtab.clickOnCreatedExam();
            await newtab.GenerateTempID();
            await newtab.logoutClick()
        });
    });
});

test(` iAU_TC_ID_196. @RegressionA Validation of Manage Delivery--> Reset Password`, async ({ eluminaLoginPage, eluminaRegInvPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.clickOnCreatedExam();
        await newtab.ResetPassword();
    });
});

test(` iAU_TC_ID_198. @RegressionA Validation of Manage Delivery --  Exam Administrator Manages Special Consideration`, async ({ eluminaLoginPage, eluminaRegInvPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.clickOnCreatedExam();
        await newtab.ManageSpecialConsideration();
    });
});

test(` iAU_TC_ID_187.,iAU_TC_ID_195.,iAU_TC_ID_200. @RegressionA Validation of Manage Delivery --> Bulk Download User Details , Validation of Delivery --> Add New Users(Negative scenario) `, async ({ eluminaLoginPage, eluminaRegInvPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.saveButtonClick();
        await newtab.addMultipleUserDetails(0);
        await newtab.BulkDownloadUserDetails("bulk_user_details.xlsx");
        await newtab.addInv();
        await newtab.searchUserForAddingInv(2, "bulk_user_details.xlsx");
        await newtab.logoutClick();
    });
});

test(` iAU_TC_ID_201. @RegressionA Validation of Delivery --> Add Existing Users`, async ({ eluminaLoginPage, eluminaRegInvPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.clickOnCreatedExam();
        await newtab.addExistingUsers1();
        await newtab.logoutClick()
    });
});


test(` iAU_TC_ID_197. @RegressionA Validation of Manage Delivery --> Bulk Candidate Response Download`, async ({ eluminaLoginPage, eluminaRegInvPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.clickOnCreatedExam();
        await newtab.BulkCandResponseDownload();
    });
});

