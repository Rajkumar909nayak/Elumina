import test from '@lib/BaseTest';
import { EluminaApproverPage } from '@pages/EluminaApproverPage';

/**Validation of Dashboard Widget*/
/** */

test.describe(() => {
    test(` iAU_TC_ID_239. Exam_Prerequisit_for_iAU_TC_ID_239. @RegressionA Create iProctor exam with password`, async ({ eluminaLoginPage, eluminaExamPage, eluminaProctorExam, webActions }) => {
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
            await newtab.addVSAQQuestion();
            await newtab.submitApprove();
        });
    });

    test(`iAU_TC_ID_239. Exam_Prerequisit_for_iAU_TC_ID_239. @RegressionA Verify Elumina Registration`, async ({ eluminaLoginPage, eluminaRegPage, eluminaProctorReg, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Elumina application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to exam Tab and Create New user`, async () => {
            const newtab = await eluminaRegPage.iAuthorPageNavigations();
            await newtab.registrationTabNavigation();
            await newtab.addMultipleUserDetails(0);
            await newtab.BulkDownloadUserDetails("bulk_user_details.xlsx");
            await newtab.addMarker();
            await newtab.logoutClick();
        });
    });

    test(`iAU_TC_ID_239. @RegressionA candidate answering questions`, async ({ eluminaCandPage, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaCandPage.candidateNavigateToURL();
            await eluminaCandPage.waitforTime();
            await eluminaCandPage.waitforTime();
            await eluminaCandPage.waitforTime();
        });
        await test.step(`Candidate Login to application`, async () => {
            await eluminaCandPage.candidateLoginToApplication(2, "bulk_user_details.xlsx");
            await eluminaCandPage.candidateStartVSAQWithoutNextButton(200);
        });
    });

    test(`iAU_TC_ID_239. Exam_Prerequisit_for_iAU_TC_ID_239. @RegressionA Verify Elumina`, async ({ eluminaLoginPage, eluminaRegPage, eluminaProctorReg, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Elumina application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to exam Tab and Create New user`, async () => {
            const newtab = await eluminaRegPage.iAuthorPageNavigations();
            await newtab.registrationTabNavigationforMarker();
            await newtab.searchCandidateforMarker();
            //await newtab.markersReports();
        });
    });

    test(`iAU_TC_ID_218A. @RegressionA "Validation of Delivery--> Marking"`, async ({ eluminaLoginPage, eluminaRegPage, eluminaProctorReg, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Elumina application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to exam Tab and Create New user`, async () => {
            const newtab = await eluminaRegPage.iAuthorPageNavigations();
            await newtab.registrationTabNavigationforMarker();
            await newtab.validateMarkerMenu();
        });
    });

    test(`iAU_TC_ID_240.,iAU_TC_ID_241. @RegressionA Verify Marker score card`, async ({ eluminaMarkerPage, eluminaLoginPage, eluminaRegPage, eluminaProctorReg, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Elumina application`, async () => {
            await eluminaLoginPage.loginToApplicationWithMarker();
        });
        await test.step(`Navigate to exam Tab and Create New user`, async () => {
            const newtab = await eluminaMarkerPage.iAuthorPageNavigation();
            await newtab.clickonexamId();
            await newtab.validateScoreCard();
            await newtab.feedBackIconClick();
        });
    });

    test(`iAU_TC_ID_221.,iAU_TC_ID_222. @RegressionA Verify Elumina`, async ({ eluminaLoginPage, eluminaRegPage, eluminaProctorReg, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Elumina application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to exam Tab and Create New user`, async () => {
            const newtab = await eluminaRegPage.iAuthorPageNavigations();
            await newtab.registrationTabNavigationforMarker();
            await newtab.markersReports();
        });
    });

    test(`iAU_TC_ID_242,iAU_TC_ID_223. @RegressionA Verify Elumina Markers`, async ({ eluminaLoginPage, eluminaRegPage, eluminaProctorReg, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Elumina application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to exam Tab and Create New user`, async () => {
            const newtab = await eluminaRegPage.iAuthorPageNavigations();
            await newtab.registrationTabNavigationforMarker();
            await newtab.clickonWorkflow();
        });
    });

    test(`iAU_TC_ID_227. @RegressionA Verify Elumina GradeBook`, async ({ eluminaProctorExam, eluminaLoginPage, eluminaRegPage, eluminaProctorReg, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Elumina application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
            const newtab = await eluminaRegPage.AdminPageNavigation();
            await newtab.clickOnGradeBookInAdmin();
            await newtab.createGradeBook();
        });
    });

    test(`iAU_TC_ID_228. @RegressionA Verify Elumina GradeBook`, async ({ eluminaProctorExam, eluminaLoginPage, eluminaRegPage, eluminaProctorReg, webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Elumina application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
            const newtab = await eluminaRegPage.iAuthorPageNavigations();
            await newtab.gradeBookCheck();
        });
    });

});