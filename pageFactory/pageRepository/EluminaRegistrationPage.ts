import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';
import { EluminaExamPage } from './EluminaExamPage';
import { EluminaMultipleExamsForPMPage } from './EluminaMultipleExamsForPMPage';
import { EluminaMultipleExamsForAMPage } from './EluminaMultipleExamsForAMPage';
import { EluminaMinimalTimeExamPage } from './EluminaMinimalTimeExamPage';
import { EluminaProctorExamPage } from './EluminaProctorExamPage';
const testENV = process.env.ENV;

const devTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/dev/testData.json')));
const p7TestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/p7/testData.json')));
const productionTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/production/testData.json')));
const qaTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/qa/testData.json')));
const sandboxTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/sandbox/testData.json')));
const stagingTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/staging/testData.json')));

let webActions: WebActions;
let testData = qaTestData;
if (process.env.ENV == 'dev') {
    testData = devTestData;
}
else if (process.env.ENV == 'p7') {
    testData = p7TestData;
}
else if (process.env.ENV == 'production') {
    testData = productionTestData;
}
else if (process.env.ENV == 'qa') {
    testData = qaTestData;
}
else if (process.env.ENV == 'sandbox') {
    testData = sandboxTestData;
}
else if (process.env.ENV == 'staging') {
    testData = stagingTestData;
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
let candClientID: string;

export class EluminaRegistrationPage {
    static CandiateClientID: string;
    readonly page: Page;
    readonly context: BrowserContext;
    readonly AUTHOR: Locator;
    readonly RegistrationMenu: Locator;
    readonly ClickOnCreatedExam: Locator;
    readonly ClickOnAddNewUsers: Locator;

    readonly EnterClientID: Locator;
    readonly ChooseTitle: Locator;
    readonly TypeUsername: Locator;
    readonly TypeFirstName: Locator;
    readonly TypeLastName: Locator;
    readonly TypeEmail: Locator;
    readonly TypePhone: Locator;
    readonly SelectRole: Locator;
    readonly SelectEligible: Locator;
    readonly SelectVenue: Locator;
    readonly SelectBookingStatus: Locator;
    readonly ClickOnSaveBtn: Locator;
    readonly LeftArrow: Locator;
    readonly ClickOnDropdown: Locator;
    readonly ClickOnDownloadUserDeatils: Locator;
    readonly searchExam: Locator;
    readonly clickbulkdropdown: Locator;
    readonly clickonbulkdownload: Locator;
    readonly ClickOnDropdown2: Locator;
    readonly ClickOnAssignInv: Locator;
    readonly ClickOnAddExistingUser: Locator;
    readonly SearchUsers: Locator;
    readonly CLickOnUser: Locator;
    readonly ChooseExistingRole: Locator;
    readonly SelectInvRole: Locator;
    readonly SelectExVenue: Locator;
    readonly SelectInvVenue: Locator;
    readonly SelectExEligible: Locator;
    readonly SelectInvEligible: Locator;
    readonly SelectExBookingStatus: Locator;
    readonly SelectInvBookingStatus: Locator;
    readonly AssignUsersToCand: Locator;
    readonly AssignInvToCand: Locator;
    readonly ClickOnInvSaveBtn: Locator;
    readonly captureUserClientID: Locator;
    readonly SelectCandRole: Locator;
    readonly MenuIconClick: Locator;
    readonly logoutbuttonClick: Locator;
    readonly bulkDownloadButton: Locator;
    readonly bulkdownloadbuttonclick: Locator;
    readonly SelectCadVenue: Locator;
    readonly DeliveryMenu: Locator;
    readonly SpecialArrangement: Locator;
    readonly BookingStatus1: Locator;
    readonly SelectBookingStatusExistinguser: Locator;
    readonly addMoreUsrs: Locator;
    readonly MarkingMenu: Locator;
    readonly AssignMarkers: Locator;
    readonly selectAllQuestions: Locator;
    readonly selectMarker: Locator;
    readonly arrowClick: Locator;
    readonly closeButton: Locator;
    readonly SelectMarkerRole: Locator;
    readonly DeleteUsers: Locator;
    readonly DeleteUsersPopup: Locator;
    readonly ClickOnDeleteUser: Locator;
    readonly clickOnYes: Locator;
    readonly DeleteUserPopUpfromOption: Locator;
    readonly editClientId: Locator;
    readonly editFirstName: Locator;
    readonly editLastName: Locator;
    readonly editEmail: Locator;
    readonly downloadUserDetailsPopUp: Locator;
    readonly bulkDownloadUserDetailsPopUp: Locator;
    readonly bulkDownloadPopUp: Locator;
    readonly GenerateTempid: Locator;
    readonly GenerateTempidUser: Locator;
    readonly generateTempIDPopUp: Locator;
    readonly AssignVenueBooking: Locator;
    readonly selectVenue: Locator;
    readonly selectBookingStatus: Locator;
    readonly saveButton: Locator;
    readonly selectVenueType: Locator;
    readonly selectBookingStatusType: Locator;
    readonly selectCheckBox: Locator;
    readonly invSuccessMessagePopup: Locator;
    readonly resetPassword: Locator;
    readonly resetPasswordCand: Locator;
    readonly resetPasswordPopup: Locator;
    readonly BulkCandResponse: Locator;
    readonly manageSpecialConsideration: Locator;
    readonly ManageSpecialConsiderationCheckbox: Locator;
    readonly manageSpecialConsiderationNotes: Locator;
    readonly manageSpecialConsiderationPopup: Locator;
    readonly AddUsersPopUp: Locator;
    readonly emailExistPopUp: Locator;
    readonly userNameExistPopup: Locator;
    readonly userAssignDifferentRolepopup: Locator;
    readonly okButtonClick: Locator;
    readonly VenueSummaryClick: Locator;
    readonly venueSummaryId: Locator;
    readonly venueSummaryName: Locator;
    readonly venueSummaryLocation: Locator;
    readonly venueSummaryAvailableSeats: Locator;
    readonly venueSummaryBookedSeats: Locator;
    readonly venueSummaryRemainingSeats: Locator;
    readonly selectCandidates: Locator;
    readonly users: Locator;
    readonly invCheckBox: Locator;
    readonly liveDashboardClick: Locator;
    readonly liveDashboardExamSession: Locator
    readonly liveDashboardTotalRegCandidates: Locator;
    readonly liveDashboardQuestionDownload: Locator;
    readonly liveDashboardNotYetStarted: Locator;
    readonly liveDashboardCompleted: Locator;
    readonly liveDashboardLocationClick: Locator;
    readonly liveDashboardVenueClick: Locator;
    readonly liveDashboardSubmit: Locator;
    readonly liveDashboardlocationselect: Locator;
    readonly liveDashboardvenueselect: Locator;
    readonly ClickOnEditUser: Locator;
    readonly ClickeditClientId: Locator;
    readonly clickeditUsername: Locator;
    readonly clickeditFirstname: Locator;
    readonly clickeditLastname: Locator;
    readonly clickeditemail: Locator;
    readonly clickeditphone: Locator;
    readonly selectRole: Locator;
    readonly closeXButton: Locator;
    readonly selectChooseRole: Locator;
    readonly spanX: Locator;
    readonly assignMarkerExamName: Locator;
    readonly assignMarkerSession: Locator;
    readonly assignMarkerCandidateName: Locator;
    readonly nomarkersAvailable: Locator;
    readonly liveDashboardOne: Locator;
    readonly liveDashboardZero: Locator
    readonly liveDashboradMoreOptions: Locator;
    readonly liveDashboardDisableCheck: Locator;
    readonly liveDashboradEnableCheck: Locator;
    readonly liveMonitorClick: Locator;
    readonly liveDashboradAutoRefresh: Locator;

    readonly StartExam: Locator;
    readonly PauseExam: Locator;
    readonly ResumeExam: Locator;
    readonly ExtendExam: Locator;
    readonly LockExam: Locator;
    readonly terminateExam: Locator;

    readonly Attendance: Locator;
    readonly clientId: Locator;
    readonly candidateId: Locator;
    readonly firstName: Locator
    readonly LastName: Locator;
    readonly ExamVenue: Locator;
    readonly Location: Locator;
    readonly specialConsideration: Locator;
    readonly ExamStatus: Locator;
    readonly questionDownloadStatus: Locator
    readonly currentSection: Locator;
    readonly examStatusandSection: Locator;
    readonly TimeRemaining: Locator;
    readonly DropDownToggle: Locator;
    readonly addNotes: Locator;
    readonly specialConsiderationNotes: Locator;
    readonly restoreExam: Locator;
    readonly downloadCandResponsePdf: Locator;
    readonly liveMonitorVenueselect: Locator;
    readonly liveMonitorExamStatusclick: Locator;
    readonly ClickOnBulkUploadUsers: Locator;
    readonly ClickOnInsertFile: Locator;
    readonly bulkUploadUsersErrorPopUp: Locator;
    readonly nextButtonClick: Locator;
    readonly fileUploadSuccessMessage: Locator;
    readonly uploadType: Locator;
    readonly newUserPassword: Locator;
    readonly forcePasswordChange: Locator;
    readonly emailRegistrationDetails: Locator;
    readonly addNewOnly: Locator;
    readonly feildRequiredInFile: Locator;
    readonly ForcePwdNone: Locator;
    readonly RegistrationDetails: Locator;
    readonly clickoncandidateId: Locator;
    readonly checkCandidateId: Locator;
    readonly clickOniProctorCandidate: Locator;
    readonly proctoringIconClick: Locator;
    readonly selectAll: Locator;
    readonly unselectAll: Locator;
    readonly searchLiveMonitor: Locator;
    readonly liveMonitorBackButton: Locator;
    readonly clickOnCadidateName: Locator;
    readonly videoStreaming: Locator;
    readonly Screenshots: Locator;
    readonly markingStatus: Locator;
    readonly MarkersReport: Locator;
    readonly chooseMarkers: Locator;
    readonly markerCheckbox: Locator;
    readonly ClickOnWorkFlow: Locator;
    readonly ClickOnApprove: Locator;
    readonly markingdropdown: Locator;
    readonly viewResponse: Locator;
    readonly candId: Locator;
    readonly candiId: Locator;
    readonly ExamMenu: Locator;
    readonly clickWorkflow: Locator;
    readonly workflowSuccessPopup: Locator;
    readonly examStatusClick: Locator;
    readonly checkExamClick: Locator;
    readonly NoRecordsFound: Locator;

    readonly workFlowFieldDropDown: Locator;
    readonly reviewerWorkflowDropdown: Locator;
    readonly chooseApproveWorkFlow: Locator;
    readonly reviewerDropDown: Locator;
    readonly chooseReviewer: Locator;
    readonly approverDropDown: Locator;
    readonly chooseApprover: Locator;
    readonly submitForReviewBtn: Locator;
    readonly morebtnOnWorkFlow: Locator;
    readonly selectReviewer: Locator;
    readonly triangleClick: Locator;
    readonly ValidateSuccessfulPopMessage: Locator;

    readonly clickOnAdminModule: Locator;
    readonly clickOnImport: Locator;
    readonly clickOnImportStatistics: Locator;
    readonly selectExam: Locator;
    readonly clickOncreatedExam: Locator;
    readonly clickCSVFileLink: Locator;
    readonly clickOnImportBtn: Locator;

    readonly viewResponses: Locator;
    readonly markersReporting: Locator;
    readonly doFinalMarking: Locator;
    readonly publishResults: Locator;
    readonly downloadResponse: Locator;
    readonly uploadResponse: Locator;
    readonly downloadGradeReport: Locator;
    readonly searchMarking: Locator;
    readonly tableContent: Locator;
    readonly moreOptionsInMarking: Locator;
    readonly assignMarkersFromMarkingOption: Locator;
    readonly swapMarkers: Locator;
    readonly totalCount: Locator;
    readonly showRowsDropdown: Locator;
    readonly manageDeliveryId: Locator;
    readonly manageDeliveryName: Locator;
    readonly manageDeliveryStartDate: Locator;
    readonly manageDeliveryEndDate: Locator;
    readonly manageDeliveryStatus: Locator;
    readonly manageDeliveryworkflowStatus: Locator;
    readonly manageDeliveryFullScreen: Locator;
    readonly addExamID: Locator;
    readonly Admin: Locator;
    readonly ClickOnGradeBook: Locator;
    readonly ClickOncreateGradeBook: Locator;
    readonly gradeBookName: Locator;
    readonly selectExamName: Locator;
    readonly selectSessionName: Locator;
    readonly selectSessionNamecheckBox: Locator
    readonly gradeScale: Locator;
    readonly gradeScaleMerit: Locator;
    readonly gradeScaleAggregate: Locator;
    readonly sessionWeight: Locator;
    readonly passpercent: Locator;
    readonly fromMarkFail: Locator;
    readonly fromMarkPass: Locator;
    readonly toMarkFail: Locator;
    readonly toMarkPass: Locator;
    readonly clickOnCompareExamResults: Locator;
    readonly failFinalResult: Locator;
    readonly passFinalResult: Locator;
    readonly failClick: Locator;
    readonly passClick: Locator;
    readonly ButtonSave: Locator;
    readonly gradebookSuccessMessage: Locator;
    readonly GradeBookMenu: Locator;
    readonly selectGradeBookName: Locator;
    readonly gradeBookCandId: Locator;
    readonly gradeBookClientId: Locator;
    readonly gradeBookpassfail: Locator;
    readonly gradeBookTotal: Locator;
    readonly gradeBookPercent: Locator;
    readonly gradeBookResult: Locator;
    readonly gradeBookapprove: Locator;
    readonly gradeBookSuccess: Locator;

    readonly BulkAssignInvigilatorDetails: Locator;
    readonly selectInvVenue: Locator;
    readonly selectInvVenueClick: Locator;
    readonly bulkassignInv: Locator;
    readonly selectCandidate1: Locator;
    readonly selectInv: Locator;
    readonly bulkAssignInvPopup: Locator;
    readonly clickongradebookId: Locator;
    readonly clickOnExistingUserDetails: Locator;
    readonly seletOverridefile: Locator;



    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.RegistrationMenu = page.locator('//a[text()="Registration"]');
        this.ClickOnCreatedExam = page.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a');
        this.ClickOnAddNewUsers = page.locator('//a[normalize-space()="Add New Users"]');
        this.clickongradebookId = page.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a')

        this.EnterClientID = page.locator('//table[@class="table"]//tbody//tr[1]//td[2]//input');
        this.ChooseTitle = page.locator('//table[@class="table"]//tbody//tr[1]//td[3]//select');
        this.TypeUsername = page.locator('//table[@class="table"]//tbody//tr[1]//td[4]//input');
        this.TypeFirstName = page.locator('//table[@class="table"]//tbody//tr[1]//td[5]//input');
        this.TypeLastName = page.locator('//table[@class="table"]//tbody//tr[1]//td[6]//input');
        this.TypeEmail = page.locator('//table[@class="table"]//tbody//tr[1]//td[7]//input');
        this.TypePhone = page.locator('//table[@class="table"]//tbody//tr[1]//td[8]//input');
        this.SelectRole = page.locator('//table[@class="table"]//tbody//tr[1]//td[9]//select');
        this.SelectEligible = page.locator('//table[@class="table"]//tbody//tr[1]//td[10]//select');
        this.SelectVenue = page.locator('//table[@class="table"]//tbody//tr[1]//td[11]//select');
        this.SpecialArrangement = page.locator('//table[@class="table"]//tbody//tr[1]//td[12]//select');
        this.BookingStatus1 = page.locator('//table[@class="table"]//tbody//tr[1]//td[14]//select');
        this.SelectBookingStatus = page.locator('//table[@class="table"]//tbody//tr[1]//td[14]//select');
        this.ClickOnSaveBtn = page.locator('//button[@class="theme-btn theme-primary-btn"]');
        this.LeftArrow = page.locator('//i[@class="iconBg leftArrow"]');
        this.searchExam = page.locator('//input[@placeholder="Search Exam(s)"]');

        this.clickbulkdropdown = page.locator('//button[@class="btn dotbutton btn-default"]');
        this.clickonbulkdownload = page.locator('//a[text()="Bulk Download User Details"]');

        this.ClickOnDropdown = page.locator('(//a[@class="icon dropdown-toggle"])[1]');
        this.ClickOnDropdown2 = page.locator('(//a[@class="icon dropdown-toggle"])[2]');
        this.ClickOnDownloadUserDeatils = page.locator('(//p[text()="Download User details"])[1]');
        this.ClickOnAssignInv = page.locator('(//p[text()="Assign Invigilator"])[1]');

        this.ClickOnAddExistingUser = page.locator('//a[normalize-space()="Add Existing Users"]');
        this.SearchUsers = page.locator('//input[@placeholder="Search User(s)"]');
        this.CLickOnUser = page.locator('//tbody/tr[1]/td[2]/input[1]');
        this.ChooseExistingRole = page.locator('//div[@class="btn-selected-list"]//div//ul');

        this.SelectInvRole = page.locator('//span[normalize-space()="Invigilator"]');
        this.SelectMarkerRole = page.locator('(//span[normalize-space()="Marker"])[2]');

        this.SelectExVenue = page.locator('//input[@placeholder="Select Venue"]');
        this.SelectInvVenue = page.locator('//span[text()="Elumina Chennai"]');
        this.SelectExEligible = page.locator('//input[@placeholder="Select Eligible"]');
        this.SelectInvEligible = page.locator('//span[text()="Yes"]');
        this.SelectExBookingStatus = page.locator('//input[@placeholder="Select Booking Status"]');
        this.SelectInvBookingStatus = page.locator('//span[text()="Booked"]');
        this.AssignUsersToCand = page.locator('//input[@placeholder="Select User(s)"]');
        this.AssignInvToCand = page.locator('(//span[@class="open"])[5]');
        this.ClickOnInvSaveBtn = page.locator('(//button[text()="Save"])[2]');

        this.SelectCandRole = page.locator('//span[text()="Candidate"]');
        this.captureUserClientID = page.locator('//table[@class="table"]//tbody//tr[1]//td[5]//div//div//span');
        this.searchExam = page.locator('//input[@placeholder="Search Exam(s)"]');
        this.bulkDownloadButton = page.locator('//button[normalize-space()="..."]');
        this.bulkdownloadbuttonclick = page.locator('//a[text()="Bulk Download User Details"]');
        this.SelectCadVenue = page.locator('//span[text()="Elumina Chennai"]')
        this.DeliveryMenu = page.locator('//a[text()="Delivery"]');
        this.GradeBookMenu = page.locator('//a[text()="Gradebook"]');
        this.SelectBookingStatusExistinguser = page.locator('//div[@class="dropdown-main"]//div//ul//li//div//span');

        this.addExamID = page.locator('//div[@class="userInfo userInfo__lable"][2]');
        const examId: string = String(EluminaExamPage.examID);
        console.log(examId);
        const examId1: string = String(EluminaMultipleExamsForPMPage.examID);
        const examId2: string = String(EluminaMultipleExamsForAMPage.examID);
        this.MenuIconClick = page.locator('//i[@class="menuIcons profileIcon"]');
        this.logoutbuttonClick = page.locator('//a[normalize-space()="Log out"]');
        this.addMoreUsrs = page.locator('//table[@class="table"]//thead//tr//th[14]//span');
        this.MarkingMenu = page.locator('//a[text()="Marking"]');
        this.MarkersReport = page.locator('//div[@class="leftColumn"]//div[5]//div[1]//ul//li[1]');
        this.AssignMarkers = page.locator('(//p[text()="Assign Markers"])[1]');
        this.selectAllQuestions = page.locator('//option[text()="All Questions"]');
        this.selectMarker = page.locator('//option[text()="Igs Marker"]');
        this.arrowClick = page.locator('//div[@class="showClass"]');
        this.closeButton = page.locator('//button[text()="Close"]');
        this.DeleteUsers = page.locator('//a[text()="Delete Users"]');
        this.GenerateTempid = page.locator('//a[text()="Generate Temp ID"]');
        this.GenerateTempidUser = page.locator('(//p[text()="Generate Temp ID"])[1]');
        this.resetPasswordCand = page.locator('(//p[text()="Reset Password"])[1]');
        this.DeleteUsersPopup = page.locator('//span[text()="Please select at least one user"]');
        this.ClickOnDeleteUser = page.locator('(//p[text()="Delete User"])[1]');
        this.clickOnYes = page.locator('(//button[text()="Yes"])[2]');
        this.DeleteUserPopUpfromOption = page.locator('//span[text()="Exam has already started. You cannot delete the user(s)"]');
        this.editClientId = page.locator('(//input[@class="textField ng-untouched ng-dirty ng-valid"])[1]');
        this.editFirstName = page.locator('(//input[@class="textField ng-untouched ng-dirty ng-valid"])[2]');
        this.editLastName = page.locator('(//input[@class="textField ng-untouched ng-dirty ng-valid"])[3]');
        this.editEmail = page.locator('(//input[@class="textField ng-untouched ng-dirty ng-valid"])[4]')
        this.downloadUserDetailsPopUp = page.locator('//span[text()="Downloading user details. Please check your computer for the completed download."]');
        this.bulkDownloadUserDetailsPopUp = page.locator('//span[text()="Your file is being currently prepared. Please wait ...."]');
        this.bulkDownloadPopUp = page.locator('//span[text()="File downloaded successfully."]');
        this.generateTempIDPopUp = page.locator('//span[text()="Exam id already generated for this User"]');
        this.AssignVenueBooking = page.locator('//a[text()="Assign Venue And Booking Status"]');
        this.selectVenue = page.locator('//input[@placeholder="Select Venue"]');
        this.selectBookingStatus = page.locator('//input[@placeholder="Select Booking Status"]');
        this.saveButton = page.locator('//button[normalize-space()="Save"]');
        this.selectVenueType = page.locator('(//div[@class="open container-left-padding"])[1]');
        this.selectBookingStatusType = page.locator('(//div[@class="open container-left-padding"])[2]');
        this.selectCheckBox = page.locator('//table[@class="table"]//thead//th[2]');
        this.invSuccessMessagePopup = page.locator('//span[text()="Invigilator has been assigned successfully"]');
        this.resetPassword = page.locator('//a[text()="Reset Password"]');
        this.resetPasswordPopup = page.locator('//span[text()="Password has been reset successfully"]');
        this.BulkCandResponse = page.locator('//a[text()="Bulk Candidate Response Download"]');
        this.manageSpecialConsideration = page.locator('(//p[text()="Manage Special Consideration"])[1]');
        this.ManageSpecialConsiderationCheckbox = page.locator('//input[@name="chkbx"]');
        this.manageSpecialConsiderationNotes = page.locator('//textarea[@name="txtara"]');
        this.manageSpecialConsiderationPopup = page.locator('//span[text()="Special Consideration has been updated successfully"]');
        this.AddUsersPopUp = page.locator('//span[text()="Please enter the details."]');
        this.emailExistPopUp = page.locator('//table[@class="table"]//tbody//tr[1]//td[7]//span[@class="error_msg"]');
        this.userNameExistPopup = page.locator('//table[@class="table"]//tbody//tr[1]//td[4]//span[@class="error_msg"]');
        this.userAssignDifferentRolepopup = page.locator('(//div[@class="modal-body"])[3]');
        this.okButtonClick = page.locator('(//button[@class="theme-button-blue"])[3]');
        this.VenueSummaryClick = page.locator('//a[normalize-space()="Venue Summary"]');
        this.venueSummaryId = page.locator('//table[@class="table"]//tbody//tr[1]//td[3]');
        this.venueSummaryName = page.locator('//table[@class="table"]//tbody//tr[1]//td[4]');
        this.venueSummaryLocation = page.locator('//table[@class="table"]//tbody//tr[1]//td[6]');
        this.venueSummaryAvailableSeats = page.locator('//table[@class="table"]//tbody//tr[1]//td[9]');
        this.venueSummaryBookedSeats = page.locator('//table[@class="table"]//tbody//tr[1]//td[10]');
        this.venueSummaryRemainingSeats = page.locator('//table[@class="table"]//tbody//tr[1]//td[11]');
        this.selectCandidates = page.locator('//select[@id="candidate0"]//option[1]');
        this.users = page.locator('//input[@placeholder="Select Users(s)"]');
        this.invCheckBox = page.locator('//input[@class="open"]');
        this.liveDashboardClick = page.locator('//a[normalize-space()="Live Dashboard"]');
        this.liveDashboardExamSession = page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]');
        this.liveDashboardTotalRegCandidates = page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[5]');
        this.liveDashboardQuestionDownload = page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[6]');
        this.liveDashboardNotYetStarted = page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[9]');
        this.liveDashboardCompleted = page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[11]');
        this.liveDashboardLocationClick = page.locator('//input[@placeholder="Select Location"]');
        this.liveDashboardVenueClick = page.locator('//input[@placeholder="Select Venue"]');
        this.liveDashboardSubmit = page.locator('//div[text()="Submit"]');
        this.liveDashboardlocationselect = page.locator('(//span[text()="Elumina Chennai"])[1]');
        this.liveDashboardvenueselect = page.locator('//div[@class="open"]//input');
        this.ClickOnEditUser = page.locator('(//p[text()="Edit User"])[2]');
        this.ClickeditClientId = page.locator('(//input[@name="inputbox"])[1]');
        this.clickeditUsername = page.locator('(//input[@name="inputbox"])[2]');
        this.clickeditFirstname = page.locator('(//input[@name="inputbox"])[3]')
        this.clickeditLastname = page.locator('(//input[@name="inputbox"])[4]');
        this.clickeditemail = page.locator('(//input[@name="inputbox"])[5]');
        this.clickeditphone = page.locator('(//input[@name="inputbox"])[6]');
        this.selectRole = page.locator('//input[@placeholder="Select Role"]');
        this.closeXButton = page.locator('(//button[text()="×"])[4]');
        this.selectChooseRole = page.locator('//input[@placeholder="Select Choose Role"]');
        this.spanX = page.locator('//span[text()="x"]');
        this.assignMarkerExamName = page.locator('(//span[@class="break-heading"])[1]');
        this.assignMarkerCandidateName = page.locator('(//span[@class="break-heading"])[2]');
        this.assignMarkerSession = page.locator('(//span[@class="break-heading"])[3]');
        this.nomarkersAvailable = page.locator('//option[text()="No markers available"]');
        this.liveDashboardOne = page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[8]');
        this.liveDashboardZero = page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[10]');
        this.liveDashboradMoreOptions = page.locator('//table[@class="table table-spacing"]//thead//th[1]');
        this.liveDashboardDisableCheck = page.locator('//input[@value="Exam Session"]');
        this.liveDashboradEnableCheck = page.locator('//input[@value="Exam - In Progress"]');
        this.liveDashboradAutoRefresh = page.locator('//div[@class="switch-value"]');
        this.liveMonitorClick = page.locator('//a[normalize-space()="Live Monitor"]');
        this.StartExam = page.locator('//div[normalize-space()="Start Exam"]');
        this.PauseExam = page.locator('//div[normalize-space()="Pause Exam"]');
        this.ResumeExam = page.locator('//div[normalize-space()="Resume Exam"]');
        this.ExtendExam = page.locator('//div[normalize-space()="Extend Exam"]');
        this.LockExam = page.locator('//div[normalize-space()="Lock Exam"]');
        this.terminateExam = page.locator('//div[normalize-space()="Terminate Exam"]');
        this.selectAll = page.locator('//div[normalize-space()="Select All"]');
        this.unselectAll = page.locator('//div[normalize-space()="Unselect All"]');
        this.Attendance = page.locator('//table[@class="table table-spacing"]//thead//th[3]');
        this.clientId = page.locator('//table[@class="table table-spacing"]//thead//th[4]');
        this.candidateId = page.locator('//table[@class="table table-spacing"]//thead//th[5]');
        this.firstName = page.locator('//table[@class="table table-spacing"]//thead//th[6]');
        this.LastName = page.locator('//table[@class="table table-spacing"]//thead//th[7]');
        this.ExamVenue = page.locator('//table[@class="table table-spacing"]//thead//th[8]');
        this.Location = page.locator('//table[@class="table table-spacing"]//thead//th[9]');
        this.specialConsideration = page.locator('//table[@class="table table-spacing"]//thead//th[10]');
        this.ExamStatus = page.locator('//table[@class="table table-spacing"]//thead//th[11]');
        this.questionDownloadStatus = page.locator('//table[@class="table table-spacing"]//thead//th[12]')
        this.currentSection = page.locator('//table[@class="table table-spacing"]//thead//th[1]');
        this.examStatusandSection = page.locator('//table[@class="table table-spacing"]//thead//th[14]');
        this.TimeRemaining = page.locator('//table[@class="table table-spacing"]//thead//th[15]');
        this.DropDownToggle = page.locator('(//a[@class="dropdown-toggle"])[1]');
        this.addNotes = page.locator('(//p[text()="Add Notes"])[1]');
        this.specialConsiderationNotes = page.locator('(//p[text()="Special Consideration Notes"])[1]');
        this.restoreExam = page.locator('(//p[text()="Restore Exam"])[1]');
        this.downloadCandResponsePdf = page.locator('(//p[text()="Download Candidate Response PDF"])[1]');
        this.liveMonitorVenueselect = page.locator('(//div[@class="input-wrap"])[3]//input');
        this.liveMonitorExamStatusclick = page.locator('//input[@placeholder="Select Exam Status"]');
        this.ClickOnBulkUploadUsers = page.locator('//a[normalize-space()="Bulk Upload Users"]');
        this.ClickOnInsertFile = page.locator('//label[@for="chooseFile"]');
        this.bulkUploadUsersErrorPopUp = page.locator('//p[normalize-space()="Client Id, User Name, First Name fields are missing in the uploaded file."]');
        this.nextButtonClick = page.locator('//button[text()="Next "]');
        this.fileUploadSuccessMessage = page.locator('//span[text()="File uploaded successfully"]');
        this.uploadType = page.locator('//input[@placeholder="Select Upload Type"]');
        this.newUserPassword = page.locator('//input[@placeholder="Select New User Password"]');
        this.forcePasswordChange = page.locator('//input[@placeholder="Select Force Password Change"]');
        this.emailRegistrationDetails = page.locator('//input[@placeholder="Select Email Registration Details"]');
        this.addNewOnly = page.locator('//span[text()="Add new and update existing users "]');
        this.feildRequiredInFile = page.locator('//span[text()="Field required in file"]');
        this.clickOnExistingUserDetails = page.locator('//input[@placeholder="Select Existing User Details"]')
        this.seletOverridefile = page.locator('//span[text()="Override with file"]')
        this.ForcePwdNone = page.locator('//span[text()="None"]');
        this.RegistrationDetails = page.locator('(//span[text()="No"])[2]');
        this.clickoncandidateId = page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[5]');
        this.checkCandidateId = page.locator('//span[@class="tex-dis-details"]//span[1]');
        this.clickOniProctorCandidate = page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[7]');
        this.proctoringIconClick = page.locator('//img[@title="Proctoring"]');
        this.searchLiveMonitor = page.locator('//input[@placeholder="Search live monitor"]');
        this.liveMonitorBackButton = page.locator('//div[@title="Live Monitor"]');
        this.clickOnCadidateName = page.locator('(//div[@class="candidate-name"]//div[1])[3]');
        this.videoStreaming = page.locator('//div[contains(text(),"Video(0)")]');
        this.Screenshots = page.locator('//div[normalize-space()="Screenshots (0)"]');
        this.markingStatus = page.locator('//table[@class="table"]//tbody//tr[1]//td[9]');
        this.chooseMarkers = page.locator('//input[@placeholder="Choose markers"]');
        this.markerCheckbox = page.locator('//div[@class="open"]//input[@type="checkbox"]');
        this.ExamMenu = page.locator('//a[text()="Exams"]');
        this.ClickOnWorkFlow = page.locator('//a[normalize-space()="Workflow"]')
        this.ClickOnApprove = page.locator('(//div[@class="sub--right-menu"]//button)[2]');
        this.markingdropdown = page.locator('//div[@class="dropdown closed more-btn--width"]//a');
        this.viewResponse = page.locator('//p[normalize-space()="View Response"]');
        this.candId = page.locator('(//table[@class="table"]//tbody//tr/td)[3]');
        this.candiId = page.locator('(//span[@class="tex-dis-details"])[2]')
        this.clickWorkflow = page.locator('//p[normalize-space()="Workflow"]');
        this.workflowSuccessPopup = page.locator('//span[text()="Status has been updated successfuly."]');
        this.examStatusClick = page.locator('//div[normalize-space()="Exam Status"]');
        this.checkExamClick = page.locator('//div[@class="marg-btm middleColumn"]//div[3]//single-multi-select[1]//div[1]//span[1]//div[1]//div[2]//div[1]//ul[1]//li[2]');
        this.NoRecordsFound = page.locator('//p[text()="No records found!"]');

        this.workFlowFieldDropDown = page.locator('//ul[@class="ng-star-inserted"]');
        this.triangleClick = page.locator('(//div[@class="msdd-triangle open msdd-triangle-down"])[1]');
        this.chooseApproveWorkFlow = page.locator('(//span[@class="open"])[1]')
        this.reviewerDropDown = page.locator('(//*[@class="input-wrap"])[2]')
        this.chooseReviewer = page.locator('//input[@type="checkbox"]')
        this.approverDropDown = page.locator('(//div[@class="input-wrap"])[3]')
        this.chooseApprover = page.locator('(//li[@class="open ng-star-inserted"])[4]')
        this.submitForReviewBtn = page.locator('(//button[@class="theme-btn theme-primary-btn"])[2]')
        this.morebtnOnWorkFlow = page.locator('//button[@class="btn btn-default dotbutton"]');
        this.reviewerWorkflowDropdown = page.locator('(//span[@class="open"])[2]');
        this.selectReviewer = page.locator('(//div[@class="open container-left-padding"])[3]');
        this.ValidateSuccessfulPopMessage = page.locator('//span[text()="Status has been updated successfully."]')

        this.clickOnAdminModule = page.locator('//div[text()="Assess App Admin"]')
        this.clickOnImport = page.locator('//span[text()="Import"]')
        this.clickOnImportStatistics = page.locator('//p[contains(text(),"Import Exam Statistics")]')
        this.selectExam = page.locator('//input[@placeholder="Select Exam"]')
        this.clickOncreatedExam = page.locator('(//div[@class="open container-left-padding"]//span)[1]')
        this.clickCSVFileLink = page.locator('//a[contains(text(),".xlsx,")]')
        this.clickOnImportBtn = page.locator('//button[text()="Import"]')


        this.viewResponses = page.locator('(//p[text()="View Responses"])[1]');
        this.markersReporting = page.locator('(//p[text()="Marker’s Report"])[1]');
        this.doFinalMarking = page.locator('(//p[text()="Do Final Marking"])[1]');
        this.publishResults = page.locator('(//p[text()="Publish Results"])[1]');
        this.downloadResponse = page.locator('(//p[text()="Download Response"])[1]');
        this.uploadResponse = page.locator('(//p[text()="Upload Response"])[1]');
        this.downloadGradeReport = page.locator('(//p[text()="Download Grade Report"])[1]');
        this.searchMarking = page.locator('//input[@placeholder="Search Marking"]');
        this.tableContent = page.locator('//table[@class="table"]//tbody//tr//td');
        this.moreOptionsInMarking = page.locator('//button[normalize-space()="..."]');
        this.assignMarkersFromMarkingOption = page.locator('//a[normalize-space()="Assign Markers"]');
        this.swapMarkers = page.locator('//a[normalize-space()="Swap Markers"]');
        this.totalCount = page.locator('//div[@class="tablefooter-left"]//span[1]');
        this.showRowsDropdown = page.locator('//button[@class="btn btn-default dropdown-toggle"]');
        this.manageDeliveryId = page.locator('(//div[@class="userInfo userInfo__lable"])[1]');
        this.manageDeliveryName = page.locator('(//div[@class="userInfo userInfo__lable"])[2]');
        this.manageDeliveryStartDate = page.locator('(//div[@class="userInfo userInfo__lable"])[3]');
        this.manageDeliveryEndDate = page.locator('(//div[@class="userInfo userInfo__lable"])[4]');
        this.manageDeliveryStatus = page.locator('(//div[@class="userInfo userInfo__lable"])[5]');
        this.manageDeliveryworkflowStatus = page.locator('(//div[@class="userInfo userInfo__lable"])[6]');
        this.manageDeliveryFullScreen = page.locator('(//div[@class="userInfo userInfo__lable"])[7]');
        this.Admin = page.locator('//div[contains(text(),"Assess App Admin")]');
        this.ClickOnGradeBook = page.locator('//span[contains(text(),"Grade Book")]');
        this.ClickOncreateGradeBook = page.locator('//button[normalize-space()="Create Grade Book"]');
        this.gradeBookName = page.locator('//input[@name="test"]');
        this.selectExamName = page.locator('//input[@placeholder="Select Exam(s)"]');
        this.selectGradeBookName = page.locator('//input[@placeholder="search"]')
        this.selectSessionName = page.locator('input[placeholder="Select Session(s)"]');
        this.selectSessionNamecheckBox = page.locator('//input[@type="checkbox"]');
        this.gradeScale = page.locator('//input[@placeholder="Select Grade Scale"]');
        this.gradeScaleMerit = page.locator('(//div[@class="open container-left-padding"]//span)[3]');
        this.gradeScaleAggregate = page.locator('//div[normalize-space()="Grade Aggregation"]');
        this.sessionWeight = page.locator('(//input[@type="number"])[1]');
        this.passpercent = page.locator('(//input[@type="number"])[3]');
        this.fromMarkFail = page.locator('(//input[@type="number"])[5]');
        this.toMarkFail = page.locator('(//input[@type="number"])[6]');
        this.fromMarkPass = page.locator('(//input[@type="number"])[7]');
        this.toMarkPass = page.locator('(//input[@type="number"])[8]');
        this.clickOnCompareExamResults = page.locator('(//input[@type="radio"])[1]');
        this.failFinalResult = page.locator('(//input[@placeholder="Select final result"])[1]');
        //this.passFinalResult = page.locator('(//input[@placeholder="Select final result"])[2]');
        this.failClick = page.locator('//div[@class="open container-left-padding"]');
        this.ButtonSave = page.locator('//button[text()="Save"]');
        this.gradebookSuccessMessage = page.locator('//span[text()="Grade Book saved successfully"]');
        this.gradeBookCandId = page.locator('(//table[@class="table"]//tbody//tr/td)[1]');
        this.gradeBookClientId = page.locator('(//table[@class="table"]//tbody//tr/td)[2]');
        this.gradeBookpassfail = page.locator('(//table[@class="table"]//tbody//tr/td)[3]');
        this.gradeBookTotal = page.locator('(//table[@class="table"]//tbody//tr/td)[4]');
        this.gradeBookPercent = page.locator('(//table[@class="table"]//tbody//tr/td)[5]');
        this.gradeBookResult = page.locator('(//table[@class="table"]//tbody//tr/td)[6]');
        this.gradeBookapprove = page.locator('//button[text()=" Approve "]');
        this.gradeBookSuccess = page.locator('//span[text()="Grade book approved & published successfully"]');


        this.BulkAssignInvigilatorDetails = page.locator('//a[text()="Bulk Assign Invigilator"]');
        this.selectInvVenue = page.locator('(//input[@placeholder="Select Venue"])[2]');
        this.selectInvVenueClick = page.locator('(//span[text()="Elumina Chennai"])[2]');
        this.bulkassignInv = page.locator('//li[normalize-space()="Assign By Invigilator"]');
        this.selectInv = page.locator('(//span[text()="IGS Invigilator Two"])[2]');
        this.bulkAssignInvPopup = page.locator('//span[text()="Please fill all the mandatory fields!"]');
        this.selectCandidate1 = page.locator('//select[@id="candidate1"]//option[2]');

    }

    /**Method for Page Navigation */
    async iAuthorPageNavigations() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.AUTHOR.click()
        ]);
        await newPage.waitForLoadState();
        return new exports.EluminaRegistrationPage(newPage);
    }

    /**Method for Page Navigation */
    async adminPageNavigation() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.clickOnAdminModule.click()
        ]);
        await newPage.waitForLoadState();
        return new exports.EluminaRegistrationPage(newPage);
    }


    /**Method of Admin Page Navigation */
    async AdminPageNavigation() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.Admin.click()

        ]);
        await newPage.waitForLoadState();
        return new exports.EluminaRegistrationPage(newPage);
    }


    /**
     * Method to click on import
     */
    async clickOnImportInAdmin() {
        await this.clickOnImport.click()
        await this.clickOnImportStatistics.click()
        await this.page.waitForTimeout(5000);
        let examid = EluminaExamPage.examID;
        await this.selectExam.click()
        await this.selectExam.type(examid)
        await this.clickOncreatedExam.click()
        await this.page.waitForTimeout(10000);
    }

    /**Method to register for the exam */
    async registrationTabNavigation(): Promise<void> {
        await this.DeliveryMenu.click();
        let examid = EluminaExamPage.examID;
        console.log(EluminaExamPage.examID);
        await this.searchExam.type(examid);
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreatedExam.click();
        await this.ClickOnAddNewUsers.click();
    }

    /**Method to register for the exam */
    async registrationTabNavigationforMarker(): Promise<void> {
        await this.DeliveryMenu.click();
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/MarkerExamID.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Sheet1');
            console.log("ExamId" + ws.getRow(1).getCell(1).value)
            await this.searchExam.type(ws.getRow(1).getCell(1).value);
            await this.page.waitForTimeout(5000);
        })
        await this.ClickOnCreatedExam.click();
    }

    /**Method to register for the exam */
    async registrationTabNavigationPMExamPage(): Promise<void> {

        await this.DeliveryMenu.click();
        let examid = EluminaMultipleExamsForPMPage.examID;
        console.log(EluminaMultipleExamsForPMPage.examID);
        await this.searchExam.type(examid);
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreatedExam.click();
        await this.ClickOnAddNewUsers.click();
    }

    async registrationTabNavigationAMExamPage(): Promise<void> {

        await this.DeliveryMenu.click();
        let examid = EluminaMultipleExamsForAMPage.examID;
        console.log(EluminaMultipleExamsForAMPage.examID);
        await this.searchExam.type(examid);
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreatedExam.click();
        await this.ClickOnAddNewUsers.click();
    }

    /**Method to register for the exam */
    async registrationTabNavigationforMinimaltime(): Promise<void> {

        await this.DeliveryMenu.click();
        let examid = EluminaMinimalTimeExamPage.examID;
        console.log(EluminaMinimalTimeExamPage.examID);
        await this.searchExam.type(examid);
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreatedExam.click();
        await this.ClickOnAddNewUsers.click();
    }

    /**Method to click on GradeBook in Admin section*/
    async clickOnGradeBookInAdmin(): Promise<void> {
        await this.ClickOnGradeBook.click();
    }

    /**Method to Add User Details */
    async addUserDetails(): Promise<string> {

        await this.EnterClientID.type(makeid(testData.clientId) + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(8000);
        await this.ChooseTitle.click();
        await this.ChooseTitle.selectOption('Mr');
        await this.TypeUsername.type(makeid(testData.clientUsername) + Math.floor(Math.random() * 89 + 10));
        await this.TypeFirstName.type(makeid(testData.clientFirstname));
        await this.TypeLastName.type(makeid(testData.clientLastname));
        await this.TypeEmail.type(makeid(testData.clientEmail) + Math.floor(Math.random() * 899 + 100) + '@yopmail.com');
        await this.TypePhone.type(testData.clientPhone + Math.floor(Math.random() * 899999999 + 100));
        await this.page.waitForTimeout(8000);
        await this.SelectRole.click();
        await this.SelectRole.selectOption('Candidate');
        await this.page.waitForTimeout(8000);
        await this.SelectEligible.click();
        await this.SelectEligible.selectOption('Yes');
        await this.page.waitForTimeout(8000);
        await this.SelectVenue.click();
        await this.SelectVenue.type('Elumina Chennai');
        await this.page.waitForTimeout(7000);
        if (testENV === "sandbox") {
            await this.SelectBookingStatus.click();
            await this.SelectBookingStatus.selectOption('Booked');
            await this.page.waitForTimeout(7000);
            await this.ClickOnSaveBtn.click();
            await this.page.waitForTimeout(8000);
            await this.LeftArrow.click();
            candClientID = await this.captureUserClientID.textContent()
            console.log("Cand-ID :" + candClientID);
            EluminaRegistrationPage.CandiateClientID = await this.captureUserClientID.textContent();
            await this.ClickOnDropdown.click();
        }
        else if (testENV === "qa") {
            await this.SpecialArrangement.click();
            await this.SpecialArrangement.selectOption('No');
            await this.page.waitForTimeout(7000);
            await this.BookingStatus1.click();
            await this.BookingStatus1.selectOption('Booked');
            await this.page.waitForTimeout(7000);
            await this.ClickOnSaveBtn.click();
            await this.page.waitForTimeout(8000);
            await this.LeftArrow.click();
            candClientID = await this.captureUserClientID.textContent()
            console.log("Cand-ID :" + candClientID);
            EluminaRegistrationPage.CandiateClientID = await this.captureUserClientID.textContent();
            await this.ClickOnDropdown.click();
        }
        return EluminaRegistrationPage.CandiateClientID;
    }

    /**Method to Download the User Details */
    async downloadUserDetails(): Promise<void> {
        const downloadPromise = this.page.waitForEvent('download');
        await this.ClickOnDownloadUserDeatils.click();
        const download = await downloadPromise;
        // Wait for the download process to complete.
        console.log(await download.path());
        const suggestedFileName = download.suggestedFilename();
        const filePath = 'download/' + suggestedFileName
        await download.saveAs(filePath)
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        await this.page.waitForTimeout(20000);
        await expect(this.downloadUserDetailsPopUp).toHaveText("Downloading user details. Please check your computer for the completed download.");
    }

    async clickaddMoreUsersIcon(addMoreUsers) {
        for (let i = 1; i <= addMoreUsers; i++) {
            await this.addMoreUsrs.click()
            await this.page.waitForTimeout(2000);

        }
    }

    /**Method to Add Multiple User Details */
    async addMultipleUserDetails(addUsers): Promise<void> {
        await this.page.waitForSelector('//table[@class="table"]//tbody//tr', { timeout: 10000 });
        let rowss = await this.page.$$('//table[@class="table"]//tbody//tr');
        for (let i = 0; i <= addUsers; i++) {

            await rowss[i].isVisible()
            await this.EnterClientID.clear();
            await this.EnterClientID.type(makeid(testData.clientId) + Math.floor(Math.random() * 899 + 100));
            await this.page.waitForTimeout(1000);
            await this.ChooseTitle.click();
            await this.ChooseTitle.selectOption('Mr');
            await this.TypeUsername.clear();
            await this.TypeUsername.type(makeid(testData.clientUsername) + Math.floor(Math.random() * 89 + 10));
            await this.TypeFirstName.clear();
            await this.TypeFirstName.type(makeid(testData.clientFirstname));
            await this.TypeLastName.clear();
            await this.TypeLastName.type(makeid(testData.clientLastname));
            await this.TypeEmail.clear();
            await this.TypeEmail.type(makeid(testData.clientEmail) + Math.floor(Math.random() * 899 + 100) + '@yopmail.com');
            await this.TypePhone.clear();
            await this.TypePhone.type('6' + Math.floor(Math.random() * 899999999 + 100));
            await this.page.waitForTimeout(1000);
            await this.SelectRole.click();
            await this.SelectRole.selectOption('Candidate');
            await this.page.waitForTimeout(1000);
            await this.SelectEligible.click();
            await this.SelectEligible.selectOption('Yes');
            await this.page.waitForTimeout(1000);
            await this.SelectVenue.click();
            await this.SelectVenue.selectOption('Chennai, India');
            await this.page.waitForTimeout(1000);
            await this.SelectBookingStatus.click();
            await this.SelectBookingStatus.selectOption('Booked');
            await this.page.waitForTimeout(1000);
            await this.ClickOnSaveBtn.click();
            await this.page.waitForTimeout(3000);
        }
        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');
        let Eexamid = await this.addExamID.textContent();
        let fetchExamID = Eexamid.split(':')[1];
        console.log("Inside Registration:" + fetchExamID);
        worksheet.getCell('A1').value = fetchExamID;
        await workbook.xlsx.writeFile('download/MarkerExamID.xlsx');
        await this.LeftArrow.click();
        // await this.ClickOnDropdown.click();

    }


    /**Method for Bulk Download the User Details */
    async csvFileDownload(file): Promise<void> {
        const downloadPromise = this.page.waitForEvent('download');
        await this.clickCSVFileLink.click();
        const download = await downloadPromise;
        // Wait for the download process to complete.
        console.log(await download.path());
        //const suggestedFileName = download.suggestedFilename();
        const filePath = 'download/' + file;
        await this.page.waitForTimeout(15000);
        await download.saveAs(filePath)
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        await this.page.waitForTimeout(3000);
    }

    /**Method to modify excel */
    async modifyTheQuestions(file): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/' + file;
        await this.page.waitForTimeout(5000);
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Import_statistics_template');
            await this.page.waitForTimeout(5000);
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(19).value)
            ws.getRow(2).getCell(4).clear()
            console.log(ws.getRow(2).getCell(4).type("NN").value)
        })
    }

    /**
     * Method to import excel
     */
    async importExcel() {
        await this.clickOnImportBtn.click()
        await this.clickOnImportBtn.setInputFiles('download/CSVFile_details.xlsx')
        await this.page.waitForTimeout(5000);
    }

    /**Method for Bulk Download the User Details */
    async BulkDownloadUserDetails(file): Promise<void> {
        const downloadPromise = this.page.waitForEvent('download');
        await this.bulkDownloadButton.click();
        await this.bulkdownloadbuttonclick.click();
        await expect(this.bulkDownloadUserDetailsPopUp).toHaveText("Your file is being currently prepared. Please wait ....");
        const download = await downloadPromise;
        // Wait for the download process to complete.
        console.log(await download.path());
        //const suggestedFileName = download.suggestedFilename();
        const filePath = 'download/' + file;
        await this.page.waitForTimeout(15000);
        await download.saveAs(filePath)
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        await expect(this.bulkDownloadPopUp).toHaveText("File downloaded successfully.");
        await this.page.waitForTimeout(15000);
    }

    /**Method to Add invigilator to the exam */
    async addExistingUsers(): Promise<void> {
        await this.ClickOnAddExistingUser.click();
        await this.SearchUsers.click();
        await this.SearchUsers.type(testData.invigilatorName);
        await this.page.waitForTimeout(6000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectInvRole.click();
        await this.SelectExVenue.click();
        await this.SelectInvVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(6000);
        await this.LeftArrow.click();
        await this.ClickOnDropdown2.click();
        await this.ClickOnAssignInv.click();
        await this.AssignUsersToCand.click();
        await this.AssignInvToCand.click();
        await this.ClickOnInvSaveBtn.click();
        await this.page.waitForTimeout(5000);
    }

    async addInv() {
        await this.ClickOnAddExistingUser.click();
        await this.SearchUsers.click();
        await this.SearchUsers.type(testData.invigilatorName);
        await this.page.waitForTimeout(6000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectInvRole.click();
        await this.SelectExVenue.click();
        await this.SelectInvVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(6000);
        await this.LeftArrow.click();
    }

    async searchUserForAddingInv(assignInv, file): Promise<void> {
        for (let i = 2; i <= assignInv; i++) {
            const ExcelJS = require('exceljs');
            const wb = new ExcelJS.Workbook();
            const fileName = './download/' + file;
            wb.xlsx.readFile(fileName).then(async () => {
                let data: any;
                const ws = wb.getWorksheet('users');
                console.log(ws.actualRowCount)
                console.log(ws.getRow(2).getCell(1).value)
                console.log(ws.getRow(2).getCell(4).value)
                await this.SearchUsers.click()
                await this.SearchUsers.clear()
                await this.SearchUsers.type(ws.getRow(i).getCell(1).value);
                await this.page.waitForTimeout(6000);
                // await this.ClickOnDropdown.click();
                // await this.ClickOnAssignInv.click();
                // await this.AssignUsersToCand.click();
                // await this.AssignInvToCand.click();
                // await this.ClickOnInvSaveBtn.click();
                // await expect(this.invSuccessMessagePopup).toHaveText("Invigilator has been assigned successfully");
                // await this.page.waitForTimeout(5000);

            })
            await this.page.waitForTimeout(5000);
            await this.ClickOnDropdown.click();
            await this.ClickOnAssignInv.click();
            await this.AssignUsersToCand.click();
            await this.AssignInvToCand.click();
            await this.ClickOnInvSaveBtn.click();
            await expect(this.invSuccessMessagePopup).toHaveText("Invigilator has been assigned successfully");
            await this.page.waitForTimeout(5000);
        }
    }

    /**Method to Add existing candidate to the exam */
    async addExistingUsers1(): Promise<void> {
        await this.ClickOnAddExistingUser.click();
        await this.SearchUsers.click();
        await this.SearchUsers.type(testData.UserEmail);
        await this.page.waitForTimeout(6000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectInvRole.click();
        await this.SelectExVenue.click();
        await this.SelectInvVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await this.userAssignDifferentRolepopup.isVisible();
        await this.page.waitForTimeout(3000);
        await this.okButtonClick.click();
        await this.page.waitForTimeout(5000);

        await this.LeftArrow.click();
        await this.ClickOnAddExistingUser.click();
        await this.SearchUsers.click();
        await this.SearchUsers.type('virat');
        await this.page.waitForTimeout(6000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectInvRole.click();
        await this.SelectExVenue.click();
        await this.SelectInvVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(5000);
    }

    /**add Existing Candid */
    async addExistingUsersforMultiple(): Promise<void> {
        await this.ClickOnAddExistingUser.click();
        await this.page.waitForTimeout(2000);
        await this.SearchUsers.click();
        await this.page.waitForTimeout(2000);
        await this.SearchUsers.type(candClientID);
        await this.page.waitForTimeout(4000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectCandRole.click();
        await this.SelectExVenue.click();
        await this.SelectInvVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(7000);
        await this.LeftArrow.click();
        await this.page.waitForTimeout(5000);
        await this.page.waitForTimeout(2000);
        await this.ClickOnDropdown.click();
    }


    /**Method for logout */
    async logoutClick() {
        await this.page.waitForTimeout(2000);
        await this.MenuIconClick.click();
        await this.logoutbuttonClick.click();

    }

    /**Method to Add User Details */
    async addUserDetailsdiffTime(): Promise<void> {
        await this.EnterClientID.type(makeid(testData.clientId) + Math.floor(Math.random() * 899 + 100));
        await this.ChooseTitle.click();
        await this.ChooseTitle.selectOption('Mr');
        await this.TypeUsername.type(makeid(testData.clientUsername) + Math.floor(Math.random() * 89 + 10));
        await this.TypeFirstName.type(makeid(testData.clientFirstname));
        await this.TypeLastName.type(makeid(testData.clientLastname));
        await this.TypeEmail.type(makeid(testData.clientEmail) + Math.floor(Math.random() * 899 + 100) + '@yopmail.com');
        await this.TypePhone.type(testData.clientPhone + Math.floor(Math.random() * 899999999 + 100));
        await this.page.waitForTimeout(5000);
        await this.SelectRole.click();
        await this.SelectRole.selectOption(testData.clientRole);
        await this.page.waitForTimeout(5000);
        await this.SelectEligible.click();
        await this.SelectEligible.selectOption(testData.clientEligableOption);
        await this.page.waitForTimeout(5000);
        await this.SelectVenue.click();
        await this.SelectVenue.type(testData.clientVenue);
        await this.page.waitForTimeout(5000);
        await this.SelectBookingStatus.click();
        await this.SelectBookingStatus.selectOption(testData.clientBookingStatus);
        await this.page.waitForTimeout(5000);
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(8000);
        await this.LeftArrow.click();
        candClientID = await this.captureUserClientID.textContent()
        console.log("Cand-ID :" + candClientID);
        //await this.ClickOnDropdown.click();
    }

    /**add Existing Cadidate In Diff Time Zone */
    async addExistingUsersdifftime(): Promise<void> {
        await this.ClickOnAddExistingUser.click();
        await this.page.waitForTimeout(2000);
        await this.SearchUsers.click();
        await this.page.waitForTimeout(2000);
        await this.SearchUsers.type(candClientID);
        await this.page.waitForTimeout(4000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectCandRole.click();
        await this.SelectExVenue.click();
        await this.SelectCadVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(3000);
        await this.LeftArrow.click();
        await this.ClickOnDropdown.click();
        await this.page.waitForTimeout(5000);
    }


    /**
     * add Existing Cadidate Booking status change to Not Booked
     * @param Bookingstatus 
     */
    async addExistingUserswithNotBooked(Bookingstatus): Promise<void> {
        await this.ClickOnAddExistingUser.click();
        await this.page.waitForTimeout(2000);
        await this.SearchUsers.click();
        await this.page.waitForTimeout(2000);
        await this.SearchUsers.type(candClientID);
        await this.page.waitForTimeout(4000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectCandRole.click();
        await this.SelectExVenue.click();
        await this.SelectCadVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectBookingStatusExistinguser.getByText(Bookingstatus).click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(3000);
        await this.LeftArrow.click();
        await this.ClickOnDropdown.click();
        await this.page.waitForTimeout(5000);
    }

    /**
     * Method to add Marker
     */
    async addMarker() {
        await this.ClickOnAddExistingUser.click();
        await this.SearchUsers.click();
        await this.SearchUsers.type(testData.MarkerUsername);
        await this.page.waitForTimeout(6000);
        await this.CLickOnUser.click();
        await this.page.waitForTimeout(2000);
        await this.spanX.click();
        await this.selectChooseRole.click();
        await this.selectChooseRole.type('Marker');
        await this.SelectMarkerRole.click();
        await this.page.waitForTimeout(6000);
        await this.SelectExVenue.click();
        await this.SelectInvVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(6000);
        await this.LeftArrow.click();
    }

    /**Method to click on cteated exam */
    async clickOnCreatedExam(): Promise<void> {
        await this.DeliveryMenu.click();
        let examid = EluminaExamPage.examID;
        console.log(EluminaExamPage.examID);
        await this.searchExam.type(examid);
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreatedExam.click();
    }

    /**Method to click on cteated exam */
    async clickOnCreatedExamProctoring(): Promise<void> {
        await this.DeliveryMenu.click();
        let examid = EluminaProctorExamPage.examID;
        console.log(EluminaProctorExamPage.examID);
        await this.searchExam.type(examid);
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreatedExam.click();
    }

    /**Method to click on Delete Users from more option */
    async DeleteUser() {
        await this.bulkDownloadButton.click();
        await this.DeleteUsers.click();
        await this.page.waitForTimeout(3000);
        await expect(this.DeleteUsersPopup).toHaveText("Please select at least one user");
        await this.page.waitForTimeout(3000);
    }

    /**Method to click on Delete Users from more option */
    async GenerateTempID() {
        await this.bulkDownloadButton.click();
        await this.GenerateTempid.click();
        await this.page.waitForTimeout(3000);
        await expect(this.DeleteUsersPopup).toHaveText("Please select at least one user");
        await this.page.waitForTimeout(5000);
        await this.ClickOnDropdown.click();
        await this.GenerateTempidUser.click();
        await this.clickOnYes.click();
        await expect(this.generateTempIDPopUp).toHaveText("Exam id already generated for this User");
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on more options from candidate and delete user */
    async DeleteUserFromMoreOption() {
        await this.ClickOnDropdown.click();
        await this.ClickOnDeleteUser.click();
        await this.clickOnYes.click();
        await this.page.waitForTimeout(3000);
        await this.DeleteUserPopUpfromOption.isVisible();
        await expect(this.DeleteUserPopUpfromOption).toHaveText("Exam has already started. You cannot delete the user(s)");
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on more options from candidate and delete user */
    async DeleteUserFromMoreOptionPositive() {
        await this.ClickOnDropdown.click();
        await this.ClickOnDeleteUser.click();
        await this.clickOnYes.click();
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on more options from candidate and delete user */
    async AssignVenueBookingFromMoreOption() {
        await this.selectCheckBox.click();
        await this.bulkDownloadButton.click();
        await this.AssignVenueBooking.click();
        await this.selectVenue.click();
        await this.selectVenue.type('Elumina Chennai');
        await this.page.waitForTimeout(5000);
        await this.selectVenueType.click();
        await this.page.waitForTimeout(5000);
        await this.selectBookingStatus.click();
        await this.selectBookingStatus.type('Booked');
        await this.page.waitForTimeout(5000);
        await this.selectBookingStatusType.click();
        await this.page.waitForTimeout(5000);
        await this.saveButton.click();
    }

    /**Method to click on dropdown button */
    async dropdownButton() {
        await this.ClickOnDropdown.click();
        await this.page.waitForTimeout(3000);
    }

    /**Method to click on Reset password from more option */
    async ResetPassword() {
        await this.bulkDownloadButton.click();
        await this.resetPassword.click();
        await this.page.waitForTimeout(3000);
        await expect(this.DeleteUsersPopup).toHaveText("Please select at least one user");
        await this.page.waitForTimeout(5000);
        await this.ClickOnDropdown.click();
        await this.resetPasswordCand.click();
        await expect(this.resetPasswordPopup).toHaveText("Password has been reset successfully");
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on Bulk Candidate Response Download from more option */
    async BulkCandResponseDownload() {
        await this.bulkDownloadButton.click();
        await this.BulkCandResponse.click();
        await expect(this.bulkDownloadUserDetailsPopUp).toHaveText("Your file is being currently prepared. Please wait ....");
        await this.page.waitForTimeout(3000);
        await expect(this.bulkDownloadPopUp).toHaveText("File downloaded successfully.");
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on Bulk Candidate Response Download from more option */
    async ManageSpecialConsideration() {
        await this.ClickOnDropdown.click();
        await this.manageSpecialConsideration.click();
        await this.page.waitForTimeout(2000);
        await this.ManageSpecialConsiderationCheckbox.click();
        await this.manageSpecialConsiderationNotes.click();
        await this.manageSpecialConsiderationNotes.type('Hello');
        await this.page.waitForTimeout(2000);
        await this.ClickOnInvSaveBtn.click();
        await expect(this.manageSpecialConsiderationPopup).toHaveText("Special Consideration has been updated successfully");
        await this.page.waitForTimeout(3000);
    }

    /**Method to click on save button */
    async saveButtonClick() {
        await this.ClickOnSaveBtn.click();
        await expect(this.AddUsersPopUp).toHaveText("Please enter the details.");
        await this.page.waitForTimeout(3000);
        await this.EnterClientID.type(makeid(testData.clientId) + Math.floor(Math.random() * 899 + 100));
        await this.ChooseTitle.click();
        await this.ChooseTitle.selectOption('Mr');
        await this.TypeUsername.clear();
        await this.TypeUsername.type("deep");
        await this.page.waitForTimeout(3000);
        await expect(this.userNameExistPopup).toHaveText("*Username already exist!");
        await this.TypeFirstName.type(makeid(testData.clientFirstname));
        await this.TypeLastName.type(makeid(testData.clientLastname));
        await this.TypeEmail.clear();
        await this.TypeEmail.type(testData.UserEmail);
        await this.page.waitForTimeout(3000);
        await expect(this.emailExistPopUp).toHaveText("*Email already exist!");
    }

    /**
     * Method to click on Venue summary page
     */
    async venueSummary() {
        await this.VenueSummaryClick.click();
        await this.page.waitForTimeout(3000);
        await this.venueSummaryId.isVisible();
        console.log(await this.venueSummaryId.textContent());
        await this.venueSummaryName.isVisible();
        console.log(await this.venueSummaryName.textContent());
        await this.venueSummaryLocation.isVisible();
        console.log(await this.venueSummaryLocation.textContent());
        await this.venueSummaryAvailableSeats.isVisible();
        console.log(await this.venueSummaryAvailableSeats.textContent());
        await this.venueSummaryBookedSeats.isVisible();
        console.log(await this.venueSummaryBookedSeats.textContent());
        await this.venueSummaryRemainingSeats.isVisible();
        console.log(await this.venueSummaryRemainingSeats.textContent());
        await this.page.waitForTimeout(3000);
        await this.ClickOnDropdown.click();
        await this.ClickOnAssignInv.click();
        await this.selectCandidates.click();
        await this.users.click();
        await this.page.waitForTimeout(5000);
        await this.invCheckBox.click();
        await this.page.waitForTimeout(5000);
        await this.selectCandidates.click();
        await this.saveButton.click();
    }

    /**
    * Method to click on live Dashboard page
    */
    async liveDashboard() {
        //205
        await this.liveDashboardClick.click();
        await this.liveDashboardLocationClick.click();
        await this.liveDashboardlocationselect.click();
        await this.page.waitForTimeout(3000);
        await this.liveDashboardSubmit.click();

        await this.liveDashboardExamSession.isVisible();
        console.log(await this.liveDashboardExamSession.textContent());
        await this.liveDashboardTotalRegCandidates.isVisible();
        console.log(await this.liveDashboardTotalRegCandidates.textContent());
        await this.liveDashboardQuestionDownload.isVisible();
        console.log(await this.liveDashboardQuestionDownload.textContent());
        await this.liveDashboardNotYetStarted.isVisible();
        console.log(await this.liveDashboardNotYetStarted.textContent());
        await this.liveDashboardCompleted.isVisible();
        console.log(await this.liveDashboardCompleted.textContent());

        //209
        await this.liveDashboradMoreOptions.click();
        await this.liveDashboardDisableCheck.isDisabled();
        await this.liveDashboradEnableCheck.isEnabled();

        //210
        await this.liveDashboardOne.isVisible();
        console.log(await this.liveDashboardOne.textContent());
        await expect(this.liveDashboardOne).toHaveCSS('background', 'rgb(251, 254, 214) none repeat scroll 0% 0% / auto padding-box border-box');
        await this.liveDashboardZero.isVisible();
        console.log(await this.liveDashboardZero.textContent());

        //211
        await this.liveDashboradAutoRefresh.isVisible();
        await this.page.waitForTimeout(61000);
        await this.liveDashboardVenueClick.isVisible();
        await this.liveDashboardOne.isVisible();
        console.log("Value after Auto Refresh:" + await this.liveDashboardOne.textContent());
        console.log('Autofreshed after 60secs')
    }

    /**
    * Method to Validate on live Monitor page
    */
    async liveMonitor() {
        await this.liveMonitorClick.click();
        await this.liveDashboardLocationClick.isVisible();
        await this.liveDashboardLocationClick.click();
        await this.liveDashboardlocationselect.click();
        await this.page.waitForTimeout(3000);
        await this.liveDashboardVenueClick.isVisible();
        await this.liveDashboardVenueClick.click();
        await this.liveMonitorVenueselect.click();
        await this.page.waitForTimeout(3000);

        await this.StartExam.isVisible();
        await this.PauseExam.isVisible();
        await this.ExtendExam.isVisible();
        await this.terminateExam.isVisible();
        await this.ResumeExam.isVisible();
        await this.ExtendExam.isVisible();

        //216
        await this.liveDashboradMoreOptions.click();
        await this.Attendance.isVisible();
        await this.Attendance.click();
        await this.page.waitForTimeout(2000);
        await this.Attendance.click();
        await this.clientId.isVisible();
        await this.firstName.isVisible();
        await this.LastName.isVisible();
        await this.candidateId.isVisible();
        await this.ExamVenue.isVisible();
        await this.Location.isVisible();
        await this.specialConsideration.isVisible();
        await this.ExamStatus.isVisible();
        await this.questionDownloadStatus.isVisible();
        await this.currentSection.isVisible();
        await this.examStatusandSection.isVisible();
        await this.TimeRemaining.isVisible();

        await this.DropDownToggle.click();
        await this.addNotes.isVisible();
        await this.specialConsiderationNotes.isVisible();
        await this.restoreExam.isVisible();
        await this.downloadCandResponsePdf.isVisible();
        await this.resetPasswordCand.isVisible();
        await this.page.waitForTimeout(5000);

        //213
        await this.liveDashboradAutoRefresh.isVisible();
        await this.page.waitForTimeout(61000);
        await this.liveDashboardVenueClick.isVisible();
        await this.liveDashboardOne.isVisible();
        console.log("Value after Auto Refresh:" + await this.liveDashboardOne.textContent());
        console.log('Autofreshed after 60secs')
    }

    /**
     * method to validate live monitor exam status
     */
    async liveMonitorExamStatus() {
        await this.liveMonitorClick.click();
        await this.liveMonitorExamStatusclick.click();
        await this.checkExamClick.isVisible();
        await this.checkExamClick.click();
        await this.page.waitForTimeout(2000);
        await this.examStatusClick.click();
        await this.liveDashboardSubmit.click();
        await this.page.waitForTimeout(2000);
        await this.NoRecordsFound.isVisible();
        await expect(this.NoRecordsFound).toHaveText("No records found!");
    }

    /**
     * Method to edit user
     */
    async editUser() {
        await this.ClickOnDropdown2.click();
        await this.ClickOnEditUser.click();
        await this.closeXButton.isVisible();
        await this.page.waitForTimeout(2000);
        await this.ClickeditClientId.click();
        await this.ClickeditClientId.clear();
        await this.ClickeditClientId.type('Demo111')
        await this.clickeditUsername.click();
        await this.clickeditUsername.clear();
        await this.clickeditUsername.type('Demo')
        await this.clickeditFirstname.click();
        await this.clickeditFirstname.clear();
        await this.clickeditFirstname.type('Dem')
        await this.clickeditLastname.click();
        await this.clickeditLastname.clear();
        await this.clickeditLastname.type('sad')
        await this.clickeditemail.click();
        await this.clickeditemail.clear();
        await this.clickeditemail.type('demosad@yopmail.com');
        await this.clickeditphone.isVisible();
        await this.ClickOnInvSaveBtn.click()
        await this.page.waitForTimeout(5000);
    }

    /**
     * Method to Assign Markers to candidate
     */
    async searchCandidateforMarker(): Promise<void> {
        await this.MarkingMenu.click();
        await this.markingStatus.isVisible();
        console.log(await this.markingStatus.textContent());
        await this.ClickOnDropdown.click();
        await this.AssignMarkers.click();
        await this.selectAllQuestions.click();
        await this.page.waitForTimeout(5000);
        await this.selectMarker.click();
        await this.page.waitForTimeout(5000);
        await this.arrowClick.click();
        await this.page.waitForTimeout(5000);
        await this.closeButton.click();
        await this.page.waitForTimeout(5000);
        await this.markingStatus.isVisible();
        console.log(await this.markingStatus.textContent());
        await this.page.waitForTimeout(5000);
        await this.LeftArrow.click();
        await this.page.waitForTimeout(5000);

    }

    /**
     * Method to Validate Markers 
     */
    async ValidateMarker(): Promise<void> {
        await this.MarkingMenu.click();
        await this.ClickOnDropdown.click();
        await this.AssignMarkers.click();
        await this.assignMarkerExamName.isVisible();
        console.log(await this.assignMarkerExamName.textContent());
        await this.assignMarkerSession.isVisible();
        console.log(await this.assignMarkerSession.textContent());
        await this.assignMarkerCandidateName.isVisible();
        console.log(await this.assignMarkerCandidateName.textContent());
        await this.selectAllQuestions.isVisible();
        await this.page.waitForTimeout(5000);
        await this.selectMarker.isVisible();
        await this.page.waitForTimeout(5000);
        await this.arrowClick.isVisible();
        await this.nomarkersAvailable.isVisible();
        await expect(this.nomarkersAvailable).toHaveText("No markers available");
        await this.page.waitForTimeout(5000);
        await this.closeButton.isVisible();
        await this.closeButton.click();
        await this.page.waitForTimeout(5000);
        await this.LeftArrow.click();
        await this.page.waitForTimeout(5000);
    }

    /**
     * method to upload bulk users with invaild feilds
     */
    async bulkUploadUserswithinvalidfeilds() {
        await this.ClickOnBulkUploadUsers.click();
        await this.ClickOnInsertFile.setInputFiles('lib/Images/sample_users_invaild_feilds.csv');
        await this.page.waitForTimeout(5000);
        await this.nextButtonClick.click();
        await this.page.waitForTimeout(8000);
        await expect(this.bulkUploadUsersErrorPopUp).toHaveText("Client Id, User Name, First Name fields are missing in the uploaded file.");
    }

    /**
    * method to upload bulk users with vaild feilds
    */
    async bulkUploadUserswithvalidfeilds(bulkusers) {
        await this.ClickOnBulkUploadUsers.click();
        await this.ClickOnInsertFile.setInputFiles(bulkusers);
        await this.page.waitForTimeout(5000);
        await this.nextButtonClick.click();
        await this.page.waitForTimeout(8000);
        await expect(this.fileUploadSuccessMessage).toHaveText("File uploaded successfully");
        await this.uploadType.click();
        await this.page.waitForTimeout(1000);
        await this.addNewOnly.click();
        await this.page.waitForTimeout(1000);
        await this.newUserPassword.click();
        await this.page.waitForTimeout(1000);
        await this.feildRequiredInFile.click();
        await this.page.waitForTimeout(1000);
        await this.clickOnExistingUserDetails.click()
        await this.page.waitForTimeout(1000);
        await this.seletOverridefile.click()
        await this.page.waitForTimeout(1000);
        await this.forcePasswordChange.click();
        await this.page.waitForTimeout(1000);
        await this.ForcePwdNone.click();
        await this.page.waitForTimeout(1000);
        await this.emailRegistrationDetails.click();
        await this.page.waitForTimeout(1000);
        await this.RegistrationDetails.click();
        await this.page.waitForTimeout(1000);
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(1000);
        await this.LeftArrow.click();
        await this.page.waitForTimeout(1000);
        await this.LeftArrow.click();
    }

    /**
     * Method to check on live monitor candidate response validation
     */
    async LiveMonitorCandidateResponse() {
        await this.liveMonitorClick.click();
        let candidateId = await this.clickoncandidateId.textContent();
        console.log(candidateId);
        await this.clickoncandidateId.click();
        await this.page.waitForTimeout(2000);
        await this.checkCandidateId.isVisible();
        await expect(this.checkCandidateId).toHaveText(candidateId);
        await this.page.waitForTimeout(2000);
    }

    /**
     * method to validate live monitor for proctoring
     */
    async liveMonitorProctoring() {
        await this.liveMonitorClick.click();
        await this.liveDashboardLocationClick.isVisible();
        await this.liveDashboardLocationClick.click();
        await this.liveDashboardlocationselect.click();
        await this.page.waitForTimeout(3000);
        await this.liveDashboardVenueClick.isVisible();
        await this.liveDashboardSubmit.isVisible();
        await this.page.waitForTimeout(3000);

        await this.liveDashboradAutoRefresh.isVisible();
        await this.page.waitForTimeout(61000);
        await this.liveDashboardVenueClick.isVisible();
        await this.liveDashboardOne.isVisible();
        console.log("Value after Auto Refresh:" + await this.liveDashboardOne.textContent());
        console.log('Autofreshed after 60secs');

        await this.searchLiveMonitor.isVisible();
        await this.proctoringIconClick.click();
        await this.StartExam.isVisible();
        await this.PauseExam.isVisible();
        await this.ExtendExam.isVisible();
        await this.terminateExam.isVisible();
        await this.ResumeExam.isVisible();
        await this.ExtendExam.isVisible();
        await this.selectAll.isVisible();
        await this.unselectAll.isVisible();

        await this.liveMonitorBackButton.click();
        let candidateId = await this.clickOniProctorCandidate.textContent();
        console.log(candidateId);
        await this.clickOniProctorCandidate.click();
        await this.page.waitForTimeout(2000);
        await this.checkCandidateId.isVisible();
        await expect(this.checkCandidateId).toHaveText(candidateId);
        await this.page.waitForTimeout(2000);
    }

    /**
     * 
     Metods to click on Image and candidateName Monitor as a Admin 
     */
    async clickOnImageandCadidate() {
        await this.liveMonitorClick.click();
        await this.proctoringIconClick.click();
        await this.clickOnCadidateName.click();
        await this.videoStreaming.isVisible();
        await this.Screenshots.isVisible();
    }

    /**
     * method to validate markers report
     */
    async markersReports() {
        await this.MarkersReport.click();
        await this.page.waitForTimeout(2000);
        await this.chooseMarkers.click();
        await this.markerCheckbox.click();
        await this.page.waitForTimeout(2000);
        await this.candId.isVisible();
        await this.markingdropdown.click();
        await this.viewResponse.click();
        await this.page.waitForTimeout(2000);
        await this.candiId.isVisible();
    }


    /**
    * Method for workflow approve
    */
    async clickonWorkflow() {
        await this.ClickOnWorkFlow.click()
        await this.page.waitForTimeout(2000);
        await this.saveButton.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(2000);
    }

    /**
   * Method for workflow approve
   */
    async clickonWorkflowExamTab() {
        await this.clickWorkflow.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(5000);
        await this.workflowSuccessPopup.isVisible();
        await expect(this.workflowSuccessPopup).toHaveText('Status has been updated successfuly.');
    }

    /**Method to register for the exam */
    async ExamTabNavigation(): Promise<void> {
        await this.ExamMenu.click();
        let examid = EluminaExamPage.examID;
        console.log(EluminaExamPage.examID);
        await this.searchExam.type(examid);
        await this.page.waitForTimeout(5000);
        await this.candId.click();
    }

    /**
     * Method to check on Reviewer Workflow
     */
    async ReviewerWorkflow() {
        await this.ClickOnWorkFlow.click();
        await this.page.waitForTimeout(3000);

        await this.triangleClick.click();
        await this.page.waitForTimeout(2000);
        await this.reviewerWorkflowDropdown.click();
        await this.page.waitForTimeout(3000);
        await this.reviewerDropDown.click();
        await this.page.waitForTimeout(2000);
        await this.selectReviewer.click();
        await this.page.waitForTimeout(2000);
        await this.submitForReviewBtn.click();
        await this.page.waitForTimeout(5000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
        await this.page.waitForTimeout(5000);
    }

    /**
    * Method to Validate Marker Menu
    */
    async validateMarkerMenu(): Promise<void> {
        await this.MarkingMenu.click();
        await this.ClickOnDropdown.click();
        await this.AssignMarkers.isVisible();
        await this.viewResponses.isVisible();
        await this.markersReporting.isVisible();
        await this.doFinalMarking.isVisible();
        await this.publishResults.isVisible();
        await this.downloadResponse.isVisible();
        await this.uploadResponse.isVisible();
        await this.downloadGradeReport.isVisible();
        await this.page.waitForTimeout(5000);
        await this.searchMarking.isVisible();
        await this.page.waitForSelector('//table[@class="table"]//thead//tr//th', { timeout: 10000 });
        let rowss = await this.page.$$('//table[@class="table"]//thead//tr//th');
        for (let i = 3; i <= 10; i++) {
            await rowss[i].isVisible();
            console.log(await rowss[i].textContent());
            await this.page.waitForTimeout(2000);
        }

        await this.moreOptionsInMarking.click();
        await this.assignMarkersFromMarkingOption.isVisible();
        await this.swapMarkers.isVisible();

        await this.totalCount.isVisible();
        console.log(await this.totalCount.textContent());
        await this.showRowsDropdown.isVisible();
        await this.showRowsDropdown.click();

        await this.manageDeliveryId.isVisible();
        console.log(await this.manageDeliveryId.textContent());
        await this.manageDeliveryName.isVisible();
        console.log(await this.manageDeliveryName.textContent());
        await this.manageDeliveryStartDate.isVisible();
        console.log(await this.manageDeliveryStartDate.textContent());
        await this.manageDeliveryEndDate.isVisible();
        console.log(await this.manageDeliveryEndDate.textContent());
        await this.manageDeliveryStatus.isVisible();
        console.log(await this.manageDeliveryStatus.textContent());
        await this.manageDeliveryworkflowStatus.isVisible();
        console.log(await this.manageDeliveryworkflowStatus.textContent());
        await this.manageDeliveryFullScreen.isVisible();
        console.log(await this.manageDeliveryFullScreen.textContent());
    }

    /**
     * method to create grade Book
     */
    async createGradeBook() {
        await this.ClickOncreateGradeBook.click();
        await this.page.waitForTimeout(5000);
        await this.gradeBookName.click();
        await this.gradeBookName.type('Marking Exam' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.selectExamName.click();
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/MarkerExamID.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Sheet1');
            console.log("ExamId" + ws.getRow(1).getCell(1).value)
            await this.selectExamName.type(ws.getRow(1).getCell(1).value);
            await this.page.waitForTimeout(20000);
            await this.selectSessionNamecheckBox.click();
            await this.page.waitForTimeout(10000);
        })
        await this.page.waitForTimeout(10000);
        await this.gradeScaleAggregate.click();
        await this.selectSessionName.click();
        await this.selectSessionNamecheckBox.click();
        await this.page.waitForTimeout(10000);
        await this.gradeScaleAggregate.click();
        await this.gradeScale.click();
        await this.gradeScaleMerit.click();
        await this.page.waitForTimeout(10000);
        await this.sessionWeight.click();
        await this.sessionWeight.type('100');
        await this.page.waitForTimeout(5000);
        await this.passpercent.click();
        await this.passpercent.type('6');
        await this.page.waitForTimeout(5000);
        await this.fromMarkFail.click();
        await this.fromMarkFail.type('0');
        await this.page.waitForTimeout(5000);
        await this.toMarkFail.click();
        await this.toMarkFail.type('3');
        await this.page.waitForTimeout(5000);
        await this.fromMarkPass.click();
        await this.fromMarkPass.type('4');
        await this.page.waitForTimeout(5000);
        await this.toMarkPass.click();
        await this.toMarkPass.type('6');
        await this.page.waitForTimeout(5000);
        await this.clickOnCompareExamResults.click();
        await this.failFinalResult.click();
        await this.failFinalResult.type('Fail');
        await this.failClick.click();
        await this.page.waitForTimeout(5000);
        await this.failFinalResult.click();
        await this.failFinalResult.type('Pass');
        await this.failClick.click();
        await this.page.waitForTimeout(5000);
        await this.saveButton.click();
        await this.page.waitForTimeout(5000);
        await this.gradebookSuccessMessage.isVisible();

    }

    /**
     * Method to check gradebook
     */
    async gradeBookCheck() {
        await this.GradeBookMenu.click();
        await this.clickongradebookId.click()
        await this.page.waitForTimeout(5000);
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/MarkerExamID.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Sheet1');
            console.log("ExamId" + ws.getRow(1).getCell(1).value)
            await this.selectGradeBookName.type(ws.getRow(1).getCell(1).value);
            await this.page.waitForTimeout(5000);
        })
        await this.gradeBookCandId.isVisible();
        await this.gradeBookClientId.isVisible();
        await this.gradeBookpassfail.isVisible();
        await this.gradeBookTotal.isVisible();
        await this.gradeBookPercent.isVisible();
        await this.gradeBookResult.isVisible();
        await this.page.waitForTimeout(5000);
        await this.gradeBookapprove.click();
        await this.page.waitForTimeout(5000);
        await this.gradeBookSuccess.isVisible();

    }

    /**
 * Method for Bulk Assign Invigilator By Candidate
 */
    async BulkAssignInvigilatorbycand(): Promise<void> {
        await this.bulkDownloadButton.click();
        await this.BulkAssignInvigilatorDetails.click();
        await this.selectInvVenue.click();
        await this.selectInvVenueClick.click();
        await this.page.waitForTimeout(2000);
        await this.selectCandidates.click();
        await this.users.click();
        await this.page.waitForTimeout(5000);
        await this.invCheckBox.click();
        await this.page.waitForTimeout(5000);
        await this.selectCandidates.click();
        await this.ClickOnInvSaveBtn.click();
        await expect(this.invSuccessMessagePopup).toHaveText("Invigilator has been assigned successfully");
        await this.page.waitForTimeout(20000);
    }

    /**
     * Method for Bulk Assign Invigilator by Invigilator
     */
    async BulkAssignInvigilatorbyInv(): Promise<void> {
        await this.bulkDownloadButton.click();
        await this.BulkAssignInvigilatorDetails.click();
        await this.selectInvVenue.click();
        await this.selectInvVenueClick.click();
        await this.page.waitForTimeout(2000);
        await this.bulkassignInv.click();
        await this.page.waitForTimeout(2000);
        await this.users.click();
        await this.selectInv.click();
        await this.page.waitForTimeout(5000);
        await this.selectCandidate1.click();
        await this.ClickOnInvSaveBtn.click();
        await expect(this.invSuccessMessagePopup).toHaveText("Invigilator has been assigned successfully");
        await this.page.waitForTimeout(20000);
    }

    /**
     * Method to check without entering mandtory feilds(negative scenerio)
     */
    async BulkAssignInvempty() {
        await this.bulkDownloadButton.click();
        await this.BulkAssignInvigilatorDetails.click();
        await this.ClickOnInvSaveBtn.click();
        await this.page.waitForTimeout(10000);
        await expect(this.bulkAssignInvPopup).toHaveText("Please fill all the mandatory fields!");
        await this.closeXButton.click();
        await this.page.waitForTimeout(20000);
    }


}
