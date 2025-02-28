import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { isArrayEqual } from 'pdfjs-dist-es5/types/src/shared/util';
import { TextHighlighter } from 'pdfjs-dist-es5/types/web/text_highlighter';
import path = require('path')

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

let currentDate = new Date();
let StartBookingDate = currentDate.getDate().toString();
let EndExamDate = (currentDate.getDate() + 1).toString();

let hour = currentDate.getHours();
let period = '';

if (hour >= 12) {
    period = 'PM';
    if (hour > 12) {
        hour -= 12;
    }
} else {
    period = 'AM';
    if (hour === 0) {
        hour = 12;
    }
}

export class EluminaCreateQuestionsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly AUTHOR: Locator;
    readonly Questions: Locator;
    readonly CreateQuestion: Locator;
    readonly MCQQuestionsClick: Locator;
    readonly NextButtonClick: Locator;
    readonly SelectQuestionBank: Locator;
    readonly SelectTestBank: Locator;
    readonly QuestionTopic: Locator;
    readonly QuestionAims: Locator;
    readonly Question: Locator;
    readonly ControlIndicator: Locator;
    readonly OptionA: Locator;
    readonly OptionB: Locator;
    readonly OptionC: Locator;
    readonly OptionD: Locator;
    readonly OptionE: Locator;
    readonly SubmitAndApprove: Locator;
    readonly SuccessMessage: Locator;
    readonly ClickOnQuestionTab: Locator;
    readonly VerifyquestionID: Locator;
    readonly VerifyquestioTitle: Locator;
    readonly VerifyquestionText: Locator;
    readonly VerifyquestionType: Locator;
    readonly VerifyquestionDescription: Locator;
    readonly VerifyquestionBank: Locator;
    readonly VerifyquestionCreatedBy: Locator;
    readonly VerifyquestionLastmodifiedBy: Locator;
    readonly VerifyquestionStatus: Locator;
    readonly VerifyquestionCreatedDate: Locator;
    readonly VerifyquestionLastDateUpdated: Locator;
    readonly VerifyquestionUsedInExams: Locator;
    readonly VerifyquestionUsedInBlueprints: Locator;
    readonly VerifyquestionMore: Locator;
    readonly ClickOnCreateQuestion: Locator;
    readonly SearchQuestion: Locator;
    readonly ClickOnSearchedQuestion: Locator;
    readonly ValidateCreateQuestionPage: Locator;
    readonly VerifyPopupWtoutselctQuestion: Locator;
    readonly VerifyNoRecordsFoundStatus: Locator;
    readonly ClickOnProfile: Locator;
    readonly ClickOnLogout: Locator;
    readonly ClickOnNextBtn: Locator;
    readonly Invalidpopupmessage: Locator;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly HOMEPAGE: Locator;
    readonly ClickOnVSAQ: Locator;
    readonly ClickOnSAQ: Locator;
    readonly EnterMarks: Locator;
    readonly EnterMarksInAns: Locator;
    readonly AddImage: Locator;
    readonly ClickOnUploadImageBtn: Locator;
    readonly ClickOnInsertImageFile: Locator;
    readonly EnterAnsKey: Locator;
    readonly ClickOnSaveDraft: Locator;
    readonly ClickOnEditQuestion: Locator;
    readonly ClickOnWorkFlow: Locator;
    readonly ClickOnApprove: Locator;
    readonly ValidateSuccessfulPopMessage: Locator;
    readonly ClickOnTypeB: Locator;
    readonly ClickOnTypeX: Locator;
    readonly Optional: Locator;
    readonly ClickOnOptionBRadioBtn: Locator;
    readonly ClickOnSJT: Locator;
    readonly ClickOnAppropriateRadioBtn: Locator;
    readonly EnterMarksInSJT: Locator;
    readonly ISAWEQuestionsClick: Locator;
    readonly QuestionsText: Locator;
    readonly Answer: Locator;
    readonly AnswerKey: Locator;
    readonly AnswerKeys: Locator;
    readonly QuestionSuccessMessage: Locator;
    readonly Marks: Locator;
    readonly correctAnswerMarks: Locator;
    readonly MarkMarks: Locator;
    readonly SaveDraft: Locator
    readonly clickImage: Locator;
    readonly InsertImageClick: Locator;

    readonly ControlIndicator1: Locator;
    readonly ClickOnRadioButton1: Locator;
    readonly ClickOnRadioButton2: Locator;
    readonly ClickOnRadioButton3: Locator;
    readonly ClickOnRadioButton4: Locator;
    readonly ClickOnRadioButton5: Locator;
    readonly clickQuestionId: Locator;
    readonly clickMoreOption: Locator;
    readonly clickCheckout: Locator;
    readonly clickYes: Locator;
    readonly clickDelete: Locator;
    readonly clickYesDuplicate: Locator;
    readonly clickonDuplicate: Locator;
    readonly clickSubmit: Locator;
    readonly DuplicateSuccessMessgae: Locator;
    readonly clickonArchive: Locator;
    readonly ArchiveSuccessMessage: Locator;
    readonly clickonPreview: Locator;

    readonly ClickOnMoreOption: Locator;
    readonly ClickOnPreview: Locator;
    readonly ValidatePreviewPage: Locator;
    readonly ClickOnDuplicate: Locator;
    readonly ClickOnYesBtn: Locator;
    readonly ClickOnSubmitBtn: Locator;
    readonly ClickOnInappropriateRadioBtn: Locator;
    readonly ClickOnSaveBtn: Locator;
    readonly ClickOnVersionHistory: Locator;
    readonly ClickOnCheckout: Locator;
    readonly ClickOnYesBtnForCheckout: Locator;
    readonly ClickOnQuestionID: Locator;

    readonly Exams: Locator;
    readonly EXAMSMENU: Locator;
    readonly CREATEEXAMS: Locator;
    readonly copyExistingExam: Locator;
    readonly clickonQuestion: Locator;

    readonly ValidateVersion: Locator;
    readonly ClickOnDraftQuestion: Locator;
    readonly SearchDraftQuestions: Locator;

    readonly BookingStartCalender: Locator;
    readonly BookingStartDate: Locator;
    readonly BookingStartHrs: Locator;
    readonly BooingStartMins: Locator;
    readonly ChooseBookingStartSession: Locator;
    readonly BookingOK: Locator;
    readonly BookingEndCalender: Locator;
    readonly BookingEndDate: Locator;
    readonly ExamStartCalender: Locator;
    readonly ExamStartDate: Locator;
    readonly ExamEndCalender: Locator;
    readonly ExamEndDate: Locator;
    readonly ChooseBookingStartSessions: Locator;
    readonly nextButton: Locator;
    readonly Oneclick: Locator;
    readonly moreOptionClick: Locator;
    readonly DuplicateButtonClick: Locator;
    readonly settingsButtonClick: Locator;
    readonly QuestionsButtonClick: Locator;
    readonly duplicateSuccessMessage: Locator;
    readonly PrintButtonClick: Locator;
    readonly clickDeleteYes: Locator;
    readonly DeleteExamSuccessMessage: Locator;
    readonly SearchDraftExams: Locator;
    readonly clickArchiveYes: Locator;
    readonly ArchiveExamSuccessMessage: Locator;
    readonly clickonExport: Locator;
    readonly selectFileFormat: Locator;
    readonly selectZip: Locator;
    readonly DownloadButtonclick: Locator;

    readonly clickOnCheckout: Locator;
    readonly dropArrowclick: Locator;
    readonly saveAsNewVersion: Locator;
    readonly ClickOnComment: Locator;
    readonly ClickOnSaveBtn2: Locator;
    readonly clickOnVersionHistory: Locator;
    readonly moreoptionClick: Locator;
    readonly clickOnClose: Locator;
    readonly versionCheck1: Locator;
    readonly versionCheck2: Locator;
    readonly CompareVersion: Locator;
    readonly clickclose2: Locator;
    readonly workflowDropdown: Locator;
    readonly approvalWorkflowclick: Locator;
    readonly selectReviwer: Locator;
    readonly selectApprover: Locator;
    readonly checkReviwerQA: Locator;
    readonly approverQA: Locator;
    readonly submitandreviewclick: Locator;
    readonly workflowsuccessmessage: Locator;
    readonly saveButtonClick: Locator;
    readonly approverclick: Locator;

    readonly ClickOnPreviewPDF: Locator;
    readonly ClickOnPreviewWeb: Locator;
    readonly ValidationOfPreviewPDFTitle: Locator;
    readonly ValidateNorecordText: Locator;
    readonly ClickOnPlusIcon: Locator;
    readonly ClickOnCheckedAndUncheckedIcon: Locator;
    readonly ClickOnSelectOne: Locator;
    readonly ClickOnGreenIcon: Locator;
    readonly ValidateMessage: Locator;
    readonly EmptyFieldErrorMessage: Locator;
    readonly ClickOnMarkinGuide: Locator;
    readonly ValidatedefaultWorkFlow: Locator;
    readonly ClickOnCancelBtn: Locator;
    readonly confirmationPopUp: Locator;
    readonly ClickOnNoBtn: Locator;
    readonly ClickOnBackArrowBtn: Locator;
    readonly DeliveryMenu: Locator;
    readonly IDMenu: Locator;
    readonly ExamName: Locator;
    readonly Bank: Locator;
    readonly DelExamStartDate: Locator;
    readonly DelExamEndDate: Locator;
    readonly createdDate: Locator;
    readonly sortButtonClick: Locator;
    readonly sortButtonDownClick: Locator;
    readonly addFilter: Locator;
    readonly selectStatusFilter: Locator;
    readonly selectApproved: Locator;
    readonly tickIcon: Locator;
    readonly clearAll: Locator;
    readonly clickfilter: Locator;
    readonly statusClick: Locator;
    readonly dropdownclick: Locator;
    readonly examNamecheckbox: Locator;
    readonly TotalCount: Locator;
    readonly pageNumber: Locator;
    readonly moreOption: Locator;
    readonly downloadExam: Locator;
    readonly ErrorMessage: Locator;
    readonly examClick: Locator;
    readonly manageDeliveryId: Locator;
    readonly manageDeliveryName: Locator;
    readonly manageDeliveryStartDate: Locator;
    readonly manageDeliveryEndDate: Locator;
    readonly manageDeliveryStatus: Locator;
    readonly manageDeliveryworkflowStatus: Locator;
    readonly manageDeliveryFullScreen: Locator;
    readonly moreButtonClick: Locator;
    readonly bulkdownloadbuttonclick: Locator;
    readonly DeleteUsers: Locator;
    readonly DownloadUserDetails: Locator;
    readonly GenerateTempId: Locator;
    readonly AssignVenue: Locator;
    readonly MarkerReportDownload: Locator;
    readonly examMoreOptionsClick: Locator;
    readonly manageDeliveryoption: Locator;
    readonly validateCandIdheader: Locator;
    readonly validateCandUploadImageheader: Locator;
    readonly validateCandClientIdheader: Locator;
    readonly validateCandCandidateIdheader: Locator;
    readonly validateCandName: Locator;
    readonly validateCandRoleheader: Locator;
    readonly validateCandStatusheader: Locator;
    readonly validateCandEligibleheader: Locator;
    readonly validateCandInviheader: Locator;
    readonly closeIcon: Locator;
    readonly MenuIconClick: Locator;
    readonly logoutbuttonClick: Locator;
    readonly clickOnApprovalBtn: Locator;
    readonly Blueprint: Locator;
    readonly SearchDraftBluePrintQuestions: Locator;

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
    readonly moreOptionDropDown: Locator;
    readonly markersReport: Locator;
    readonly clickCreateBlueprint: Locator;
    readonly typeTitle: Locator;
    readonly SelectBank: Locator;
    readonly cartName: Locator;
    readonly cartItemsRequired: Locator;
    readonly AddFilter: Locator;
    readonly selectFilter: Locator;
    readonly selectFilter1: Locator;
    readonly selectFilter2: Locator;
    readonly tickIconClick: Locator;
    readonly SaveButtonClicks: Locator;
    readonly FilterSuccessMessage: Locator;
    readonly closeButton: Locator;
    readonly nextButtonClick: Locator;
    readonly TestBank: Locator;
    readonly clickOnSaveDraft: Locator;
    readonly clickOnStatusTitle: Locator;
    readonly clickOnApprovalButton: Locator;
    readonly clickOnCloseIcon: Locator;
    readonly moreOptionClick2: Locator;
    readonly clickYesDelete: Locator;
    readonly clickOnYes: Locator;
    readonly YesBtnClick: Locator;
    readonly clickOnSpotQtn: Locator
    readonly enterAnsKeyForSpot: Locator;
    readonly clickOnScenarioQtn: Locator;
    readonly clickOn_ISAWE_CASE_Qun: Locator;
    readonly clickOnPlusIcon: Locator;
    readonly subQunTopic: Locator;
    readonly clickOnsubQun: Locator;
    readonly Optional2: Locator;
    readonly clickRightIcon: Locator;
    readonly clickOnSelectAns: Locator;
    readonly selectAnsFromDrpdown: Locator;
    readonly verifyErrorSubQunMsg: Locator;
    readonly clickOnOSCEQun: Locator;
    readonly stationTitletxtField: Locator;
    readonly stationTypetxtField: Locator;
    readonly clickOnExamination: Locator;
    readonly clickOnMarkingCheckList: Locator;
    readonly headingTxtField: Locator;
    readonly titleTxtField: Locator;
    readonly clickOnProcessQun: Locator;
    readonly processQunTitle: Locator;
    readonly clickOnLongAnswerQun: Locator;
    readonly clickOnRankingQun: Locator;
    readonly defaultMarktxtField: Locator;
    readonly clickOnTranslationQun: Locator;
    readonly clickOnSourceLanguage: Locator;
    readonly chooseEnglishLanguage: Locator;
    readonly clickOnTranslationLanguage: Locator;
    readonly chooseKannadaLanguage: Locator;
    readonly clickOnRevisionQun: Locator;
    readonly clickOnImageIcon: Locator;
    readonly searchImagestxtfield: Locator;
    readonly filterButton: Locator;
    readonly uploadImageBtn: Locator;
    readonly verifytotalCount: Locator;
    readonly filterPlusIcon: Locator;
    readonly selectfilterID: Locator;
    readonly enterIDtxtfield: Locator;
    readonly clickOnRightMark: Locator;
    readonly clearAllBtn: Locator;
    readonly clickOnImageForPriview: Locator;
    readonly clickOnCloseIconForPreview: Locator;
    readonly clickOnQaTestBank: Locator;
    readonly clickOnLeftrArrow: Locator;
    readonly clickOnUploadImageBtn: Locator;
    readonly clickOnInsertImageBtn: Locator;
    readonly clickOnSelectBank: Locator;
    readonly verifyImageSavedMessage: Locator;
    readonly deleteImageBtn: Locator;
    readonly clickOnImageYesBtn: Locator;
    readonly verifyDeleteImageMessage: Locator;
    readonly editImageBtn: Locator;
    readonly editFileName: Locator;
    readonly clickEditIcon: Locator;
    readonly clickOnExpandIcon: Locator;
    readonly clickEditYesBtn: Locator;
    readonly verifyUpdateMessage: Locator;
    readonly clickOnMoreOption: Locator;
    readonly clickOnDownload: Locator;
    readonly clickOnDuplicate: Locator;
    readonly clickDuplicateYesBtn: Locator;
    readonly verifyDuplicateImageMessage: Locator;
    readonly clickOnUploadNewVesionBtn: Locator;
    readonly verifyUploadMessage: Locator;
    readonly selectFiveAnsFromDropdown: Locator;
    readonly verifyisawecaseerrormessage: Locator;
    readonly clickOnDistractorPlusIcon: Locator;
    readonly verifydistractorErrorMessage: Locator;


    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.ClickOnQuestionTab = page.locator('//a[@data-tour="Questions"]')
        this.Questions = page.locator('//a[@data-tour="Questions"]');
        this.Exams = page.locator('//a[@data-tour="Exams"]')
        this.EXAMSMENU = page.locator('//a[text()="Exams"]')
        this.CreateQuestion = page.locator('//button[text()="Create Question"]');
        this.MCQQuestionsClick = page.locator('//p[text()="MCQ"]');
        this.ISAWEQuestionsClick = page.locator('//p[text()="ISAWE"]');
        this.NextButtonClick = page.locator('//button[text()="Next"]');
        this.SelectQuestionBank = page.locator('//input[@placeholder="Select Question Bank"]');
        this.SelectTestBank = page.locator('(//div[@class="dropdown-main"])[1]//li//span[@class="open"]');
        this.QuestionTopic = page.locator('(//input[@name="inputbox"])[1]')
        this.QuestionAims = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[1]').locator('html');
        this.Question = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[2]').locator('html');
        this.OptionA = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[3]').locator('html');
        this.OptionB = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[4]').locator('html');
        this.OptionC = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[5]').locator('html');
        this.OptionD = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[6]').locator('html');
        this.OptionE = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[7]').locator('html');
        this.Optional = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[8]').locator('html');
        this.Optional2 = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[9]').locator('html');
        this.ControlIndicator = page.locator('(//div[@class="control__indicator"])[2]');
        this.ControlIndicator1 = page.locator('(//div[@class="control__indicator"])[3]');
        this.SubmitAndApprove = page.locator('//button[text()="Submit & Approve"]');
        this.SuccessMessage = page.locator('//div[@class="txtBox"]')
        this.ClickOnNextBtn = page.locator('//button[normalize-space()="Next"]');
        this.VerifyquestionID = page.locator('(//table[@class="table"]//thead//tr//th[2]//div//span[1])[1]')
        this.VerifyquestioTitle = page.locator('(//table[@class="table"]//thead//tr//th[3]//div//span[1])[1]')
        this.VerifyquestionText = page.locator('(//table[@class="table"]//thead//tr//th[4]//div//span[1])[1]')
        this.VerifyquestionType = page.locator('(//table[@class="table"]//thead//tr//th[5]//div//span[1])[1]')
        this.VerifyquestionDescription = page.locator('(//table[@class="table"]//thead//tr//th[6]//div//span[1])[1]')
        this.VerifyquestionBank = page.locator('(//table[@class="table"]//thead//tr//th[7]//div//span[1])[1]')
        this.VerifyquestionCreatedBy = page.locator('(//table[@class="table"]//thead//tr//th[8]//div//span[1])[1]')
        this.VerifyquestionLastmodifiedBy = page.locator('(//table[@class="table"]//thead//tr//th[9]//div//span[1])[1]')
        this.VerifyquestionStatus = page.locator('(//table[@class="table"]//thead//tr//th[10]//div//span[1])[1]')
        this.VerifyquestionCreatedDate = page.locator('(//table[@class="table"]//thead//tr//th[11]//div//span[1])[1]')
        this.VerifyquestionLastDateUpdated = page.locator('(//table[@class="table"]//thead//tr//th[12]//div//span[1])[1]')
        this.VerifyquestionUsedInExams = page.locator('(//table[@class="table"]//thead//tr//th[13]//div//span[1])[1]')
        this.VerifyquestionUsedInBlueprints = page.locator('(//table[@class="table"]//thead//tr//th[14]//div//span[1])[1]')
        this.VerifyquestionMore = page.locator('//table[@class="table"]//thead//tr//th[1]')
        this.ClickOnCreateQuestion = page.locator('//button[normalize-space()="Create Question"]')
        this.SearchQuestion = page.locator('//input[@placeholder="Search Question Type"]')
        this.ClickOnSearchedQuestion = page.locator('//div[@class="card-container"]//p')
        this.ValidateCreateQuestionPage = page.locator('//h4[@class="subMenu-txt"]')
        this.VerifyquestionID = page.locator('(//table[@class="table"]//thead//tr//th[2]//div//span[1])[1]')
        this.VerifyquestioTitle = page.locator('(//table[@class="table"]//thead//tr//th[3]//div//span[1])[1]')
        this.VerifyquestionText = page.locator('(//table[@class="table"]//thead//tr//th[4]//div//span[1])[1]')
        this.VerifyquestionType = page.locator('(//table[@class="table"]//thead//tr//th[5]//div//span[1])[1]')
        this.VerifyquestionDescription = page.locator('(//table[@class="table"]//thead//tr//th[6]//div//span[1])[1]')
        this.VerifyquestionBank = page.locator('(//table[@class="table"]//thead//tr//th[7]//div//span[1])[1]')
        this.VerifyquestionCreatedBy = page.locator('(//table[@class="table"]//thead//tr//th[8]//div//span[1])[1]')
        this.VerifyquestionLastmodifiedBy = page.locator('(//table[@class="table"]//thead//tr//th[9]//div//span[1])[1]')
        this.VerifyquestionStatus = page.locator('(//table[@class="table"]//thead//tr//th[10]//div//span[1])[1]')
        this.VerifyquestionCreatedDate = page.locator('(//table[@class="table"]//thead//tr//th[11]//div//span[1])[1]')
        this.VerifyquestionLastDateUpdated = page.locator('(//table[@class="table"]//thead//tr//th[12]//div//span[1])[1]')
        this.VerifyquestionUsedInExams = page.locator('(//table[@class="table"]//thead//tr//th[13]//div//span[1])[1]')
        this.VerifyquestionUsedInBlueprints = page.locator('(//table[@class="table"]//thead//tr//th[14]//div//span[1])[1]')
        this.VerifyquestionMore = page.locator('//table[@class="table"]//thead//tr//th[1]')

        this.ClickOnCreateQuestion = page.locator('//button[normalize-space()="Create Question"]')
        this.SearchQuestion = page.locator('//input[@placeholder="Search Question Type"]')
        this.ClickOnSearchedQuestion = page.locator('//div[@class="card-container"]//p')
        this.ValidateCreateQuestionPage = page.locator('//h4[@class="subMenu-txt"]')
        this.VerifyPopupWtoutselctQuestion = page.locator('//span[normalize-space()="Kindly choose any question type"]')
        this.VerifyNoRecordsFoundStatus = page.locator('//p[normalize-space()="No Record(s) found"]');
        this.ClickOnProfile = page.locator('//i[@class="menuIcons profileIcon"]')
        this.ClickOnLogout = page.locator('//a[normalize-space()="Log out"]')
        this.Invalidpopupmessage = page.locator('//div[text()="Invalid username or password."]');
        this.USERNAME_EDITBOX = page.locator('(//input)[1]');
        this.PASSWORD_EDITBOX = page.locator('(//input)[2]');
        this.LOGIN_BUTTON = page.locator('//*[@class="submit-butn"]');
        this.HOMEPAGE = page.locator('//*[@title="Question Management System"]');
        this.ClickOnVSAQ = page.locator('//p[normalize-space()="VSAQ"]');
        this.EnterMarks = page.locator('(//span[@class="input-mark"])[1]//input')
        this.EnterMarksInAns = page.locator('(//span[@class="input-mark"])[2]//input')

        this.AddImage = page.locator('(//div[@class="btn-addimg"])[1]')
        this.ClickOnUploadImageBtn = page.locator('//button[normalize-space()="Upload Image/File"]')
        this.ClickOnInsertImageFile = page.locator('//div[@class="dz-text"]');
        this.InsertImageClick = page.locator('(//button[@class="btn primarybtn"])[2]');

        this.EnterAnsKey = page.locator('//div[@class="midcontent"]//input')
        this.ClickOnSaveDraft = page.locator('//button[normalize-space()="Save Draft"]')
        this.ClickOnEditQuestion = page.locator('//button[normalize-space()="Edit this Question"]')
        this.ClickOnWorkFlow = page.locator('//p[normalize-space()="Workflow"]')
        this.ClickOnApprove = page.locator('//button[normalize-space()="Approve"]')
        this.ValidateSuccessfulPopMessage = page.locator('//span[text()="Status has been updated successfully."]')
        this.ClickOnTypeB = page.locator('//p[normalize-space()="Type B"]');
        this.ClickOnTypeX = page.locator('//p[normalize-space()="Type X"]');
        this.ClickOnSJT = page.locator('//p[normalize-space()="SJT"]')
        this.ClickOnAppropriateRadioBtn = page.locator('//div[@class="col-5 col-xlg-6 ng-star-inserted"]//div[2]//qms-radio-button[1]//label[1]//div[1]');
        this.ClickOnInappropriateRadioBtn = page.locator('//div[@class="col-5 col-xlg-6 ng-star-inserted"]//div[3]//qms-radio-button[1]//label[1]//div[1]')
        this.EnterMarksInSJT = page.locator('//div[@class="mark-input-box ng-star-inserted"]//input[@type="number"]')
        this.ClickOnOptionBRadioBtn = page.locator('(//div[@class="control__indicator"])[3]');
        this.ClickOnRadioButton1 = page.locator('(//span[@class="radio-check--image"])[1]');
        this.ClickOnRadioButton2 = page.locator('(//span[@class="radio-check--image"])[3]');
        this.ClickOnRadioButton3 = page.locator('(//span[@class="radio-check--image"])[6]');
        this.ClickOnRadioButton4 = page.locator('(//span[@class="radio-check--image"])[7]');
        this.ClickOnRadioButton5 = page.locator('(//span[@class="radio-check--image"])[9]');
        this.QuestionsText = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[3]').locator('html');
        this.Answer = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[4]').locator('html');
        this.QuestionSuccessMessage = page.locator('//span[text()="Question created successfully"]');
        this.Marks = page.locator('//div[@id="parentAccord0"]//input[@type="number"]');
        this.correctAnswerMarks = page.locator('//div[@id="childAccord00"]//app-correct-answer-editor//input[@type="number"]');
        this.MarkMarks = page.locator('//div[@class="da--container"]//input');
        this.SaveDraft = page.locator('//button[text()="Save Draft"]');
        this.clickImage = page.locator('(//img[@class="block-img"])[4]');

        this.ClickOnSAQ = page.locator('//p[normalize-space()="SAQ"]');
        this.clickQuestionId = page.locator('//table[@class="table"]//tbody//tr[1]//td[2]//a');
        this.clickMoreOption = page.locator('//button[normalize-space()="..."]');
        this.clickCheckout = page.locator('//a[text()="Check Out"]');
        this.clickDelete = page.locator('//a[text()="Delete"]');
        this.clickYes = page.locator('(//div[@class="modal-footer"])[6]//button[2]');
        this.clickOnYes = page.locator('(//button[@type="button"][normalize-space()="Yes"])[5]')
        this.YesBtnClick = page.locator('(//button[@type="button"][normalize-space()="Yes"])[7]')
        this.clickYesDuplicate = page.locator('(//button[@type="button"][normalize-space()="Yes"])[4]');
        this.clickonDuplicate = page.locator('//a[text()="Duplicate"]');
        this.clickonArchive = page.locator('//a[text()="Archive"]')
        this.clickSubmit = page.locator('//button[text()="Submit"]');
        this.DuplicateSuccessMessgae = page.locator('//span[text()="Question duplicated successfully"]')
        this.ArchiveSuccessMessage = page.locator('//span[text()="Question has been archived successfully"]');
        this.clickonPreview = page.locator('//a[text()="Preview"]')

        this.ClickOnMoreOption = page.locator('//table[@class="table"]//tbody//tr[1]//td[1]//a');
        this.ClickOnQuestionID = page.locator('//table[@class="table"]//tbody//tr[1]//td[2]//a')
        this.ClickOnPreview = page.locator('(//p[normalize-space()="Preview"])[1]');
        this.ValidatePreviewPage = page.locator('//h4[text()="Preview"]')
        this.ClickOnDuplicate = page.locator('(//p[normalize-space()="Duplicate"])[1]')
        this.ClickOnYesBtn = page.locator('//div[@id="duplicateModal"]//button[normalize-space()="Yes"]')
        this.ClickOnSubmitBtn = page.locator('//button[normalize-space()="Submit"]')
        this.ClickOnSaveBtn = page.locator('(//button[normalize-space()="Save"])[1]')
        this.ClickOnSaveBtn2 = page.locator('(//button[normalize-space()="Save"])[2]')
        this.ClickOnVersionHistory = page.locator('//p[normalize-space()="Version History"]')
        this.ClickOnCheckout = page.locator('(//p[normalize-space()="Check Out"])[1]')
        this.ClickOnYesBtnForCheckout = page.locator('//div[@id="checkoutModal"]//button[@type="button"][normalize-space()="Yes"]')

        this.CREATEEXAMS = page.locator('//button[normalize-space()="Create Exam"]');
        this.copyExistingExam = page.locator('//p[normalize-space()="Copy an Existing Exam"]');
        this.clickonQuestion = page.locator('//table[@class="table"]//tbody//tr[1]//td[3]');
        this.ClickOnDraftQuestion = page.locator('(//table[@class="table"]//tbody//tr/td[10]//span[contains(text(),"Draft")])[1]')
        this.ValidateVersion = page.locator('//div[@class="userInfo userInfo--defualt"]')
        this.SearchDraftQuestions = page.locator('//input[@placeholder="Search Question(s)"]')
        this.SearchDraftExams = page.locator('//input[@placeholder="Search Exam(s)"]')
        this.BookingStartCalender = page.locator('//div[@id="exam_booking_start_date_time"]//i[@class="glyphicon glyphicon-calendar"]');
        this.BookingStartDate = page.locator('#exam_booking_start_date_time').getByText(StartBookingDate, { exact: true });
        this.BookingStartHrs = page.getByRole('spinbutton').first();
        this.BooingStartMins = page.getByRole('spinbutton').nth(1);
        this.ChooseBookingStartSession = page.getByLabel(period);
        this.ChooseBookingStartSessions = page.getByLabel('PM');
        this.BookingOK = page.locator('.dtpc-ok-svg');
        this.BookingEndCalender = page.locator('#exam_booking_end_date_time i');
        this.BookingEndDate = page.locator('#exam_booking_end_date_time').getByText(StartBookingDate, { exact: true });
        this.ExamStartCalender = page.locator('#exam_start_date_time i');
        this.ExamStartDate = page.locator('#exam_start_date_time').getByText(StartBookingDate, { exact: true });
        this.ExamEndCalender = page.locator('#exam_end_date_time i');
        this.ExamEndDate = page.locator('#exam_end_date_time').getByText(EndExamDate, { exact: true });
        this.nextButton = page.locator('//li[@class="next"]');
        this.Oneclick = page.locator('(//li//span[text()="1"])[1]');
        this.moreOptionClick = page.locator('//button[normalize-space()="..."]');
        this.DuplicateButtonClick = page.locator('//a[text()="Duplicate"]');
        this.PrintButtonClick = page.locator('//a[normalize-space()="Print"]');
        this.settingsButtonClick = page.locator('(//i[@class="setting"])[1]');
        this.QuestionsButtonClick = page.locator('//p[normalize-space()="Questions"]');
        this.duplicateSuccessMessage = page.locator('//span[text()="Exam duplicated successfully"]');
        this.clickDeleteYes = page.locator('(//button[normalize-space()="Yes"])[1]');
        this.clickArchiveYes = page.locator('(//button[normalize-space()="Yes"])[2]');
        this.DeleteExamSuccessMessage = page.locator('//span[text()="Exam deleted successfully."]')
        this.ArchiveExamSuccessMessage = page.locator('//span[text()="Exam archived successfully."]')
        this.clickonExport = page.locator('//a[text()="Export"]');
        this.selectFileFormat = page.locator('//input[@placeholder="Select File Format"]');
        this.selectZip = page.locator('//span[text()="ZIP"]');
        this.DownloadButtonclick = page.locator('//button[text()="Download"]');

        this.clickOnCheckout = page.locator('//a[normalize-space()="Check Out"]')
        this.dropArrowclick = page.locator('//button[@class="btn btn-primary dropdown-toggle"]');
        this.saveAsNewVersion = page.locator('//a[normalize-space()="Save as New Version"]');
        this.ClickOnComment = page.locator('//textarea[@name="comments"]');
        this.clickOnVersionHistory = page.locator('//p[normalize-space()="Version History"]');
        this.moreOptionClick2 = page.locator('(//a[text()="more"])[1]');
        this.clickOnClose = page.locator('(//button[@type="button"][normalize-space()="×"])[1]');
        this.clickclose2 = page.locator('(//button[@type="button"][normalize-space()="×"])[4]');
        this.versionCheck1 = page.locator('//body/app-root/div/app-exam-history[@class="ng-star-inserted"]/div[@class="question-historyPage pageTop--div"]/div[@class="main-content-alt no-filter"]/div/div[@class="main"]/div[@class="middleColumn"]/div[@class="timeline--container"]/div[@class="history-column"]/app-vertical-stepper-exam[1]/div[1]/div[2]');
        this.versionCheck2 = page.locator('//body/app-root/div/app-exam-history[@class="ng-star-inserted"]/div[@class="question-historyPage pageTop--div"]/div[@class="main-content-alt no-filter"]/div/div[@class="main"]/div[@class="middleColumn"]/div[@class="timeline--container"]/div[@class="history-column"]/app-vertical-stepper-exam[2]/div[1]/div[2]');
        this.CompareVersion = page.locator('//button[normalize-space()="Compare Version"]');
        this.workflowDropdown = page.locator('(//div[@class="btn-selected-list"])[1]');
        this.approvalWorkflowclick = page.locator('//span[text()="Approval Workflow"]');
        this.selectReviwer = page.locator('//input[@placeholder="Select Reviewer"]');
        this.selectApprover = page.locator('//input[@placeholder="Select Approver"]');
        this.checkReviwerQA = page.locator('(//span[@class="open"])[3]');
        this.approverQA = page.locator('(//span[@class="open"])[4]');
        this.submitandreviewclick = page.locator('//button[text()="Submit & Review"]');
        this.workflowsuccessmessage = page.locator('//div[@class="content-side"]//span');
        this.saveButtonClick = page.locator('//button[text()="Save"]');
        this.approverclick = page.locator('//div[normalize-space()="Approver"]');

        this.ClickOnPreviewPDF = page.locator('//a[contains(text(),"Preview (PDF)")]')
        this.ClickOnPreviewWeb = page.locator('//a[contains(text(),"Preview (WEB)")]')
        this.ValidationOfPreviewPDFTitle = page.locator('//div[@id="previewModal"]//h4[@class="modal-title"][normalize-space()="Preview"]')
        this.ValidateNorecordText = page.locator('//p[@class="no-record"]')
        this.ClickOnCheckedAndUncheckedIcon = page.locator('//table[@class="table"]//thead//tr//th[1]//a')
        this.ClickOnPlusIcon = page.locator('//button[@class="add-filter-button"]')
        this.ClickOnSelectOne = page.locator('(//select[@class="theme-dropdown ng-untouched ng-pristine ng-valid"])[2]')
        this.ClickOnGreenIcon = page.locator('//i[@class="tick-icon"]')
        this.ValidateMessage = page.locator('//span[contains(text(),"Please Choose or Enter Value")]')
        this.EmptyFieldErrorMessage = page.locator('//span[contains(text(),"Please fill all the mandatory fields!")]')
        this.ClickOnMarkinGuide = page.locator('(//label[@class="accordian ng-star-inserted"])[2]')
        this.ValidatedefaultWorkFlow = page.locator('//li[contains(text(),"No Workflow")]')
        this.ClickOnCancelBtn = page.locator('//button[@class="theme-btn theme-default-btn"]')
        this.confirmationPopUp = page.locator('//div[normalize-space()="Are you sure you want to discard your changes?"]')
        this.ClickOnNoBtn = page.locator('//div[@class="modal-dialog cancel-confirmation"]//button[normalize-space()="No"]')
        this.ClickOnBackArrowBtn = page.locator('//i[@class="iconBg leftArrow"]');
        this.DeliveryMenu = page.locator('//a[text()="Delivery"]');
        this.IDMenu = page.locator('//table[@class="table"]//thead//tr//th[2]');
        this.ExamName = page.locator('//table[@class="table"]//thead//tr//th[3]');
        this.Bank = page.locator('//table[@class="table"]//thead//tr//th[4]');
        this.DelExamStartDate = page.locator('//table[@class="table"]//thead//tr//th[5]');
        this.DelExamEndDate = page.locator('//table[@class="table"]//thead//tr//th[6]');
        this.createdDate = page.locator('//table[@class="table"]//thead//tr//th[7]');
        this.sortButtonClick = page.locator('(//span[@class="etspinbtn up"])[1]');
        this.sortButtonDownClick = page.locator('(//span[@class="etspinbtn down"])[1]');
        this.addFilter = page.locator('//button[@class="add-filter-button"]');
        this.clickfilter = page.locator('//select[@class="theme-dropdown ng-valid ng-dirty ng-touched"]');
        this.selectStatusFilter = page.locator('//option[normalize-space()="Status"]');
        this.selectApproved = page.locator('//option[normalize-space()="Approved"]');
        this.tickIcon = page.locator('//i[@class="tick-icon"]');
        this.clearAll = page.locator('//button[text()="Clear All"]');
        this.statusClick = page.locator('(//select[@class="theme-dropdown ng-untouched ng-pristine ng-valid"])[3]');
        this.dropdownclick = page.locator('//table[@class="table"]//thead//tr//th[1]');
        this.examNamecheckbox = page.locator('(//input[@type="checkbox"])[2]');
        this.TotalCount = page.locator('//div[@class="tablefooter-left"]');
        this.pageNumber = page.locator('//span[text()="2"]');
        this.moreOption = page.locator('//table[@class="table"]//tbody//tr[1]//td[1]');
        this.downloadExam = page.locator('(//p[text()="Download Exam"])[1]');
        this.ErrorMessage = page.locator('//p[text()="No records found!"]');
        this.examClick = page.locator('//table[@class="table"]//tbody//tr[1]//td[3]');
        this.manageDeliveryId = page.locator('(//div[@class="userInfo userInfo__lable"])[1]');
        this.manageDeliveryName = page.locator('(//div[@class="userInfo userInfo__lable"])[2]');
        this.manageDeliveryStartDate = page.locator('(//div[@class="userInfo userInfo__lable"])[3]');
        this.manageDeliveryEndDate = page.locator('(//div[@class="userInfo userInfo__lable"])[4]');
        this.manageDeliveryStatus = page.locator('(//div[@class="userInfo userInfo__lable"])[5]');
        this.manageDeliveryworkflowStatus = page.locator('(//div[@class="userInfo userInfo__lable"])[6]');
        this.manageDeliveryFullScreen = page.locator('(//div[@class="userInfo userInfo__lable"])[6]');
        this.moreButtonClick = page.locator('//button[normalize-space()="..."]');
        this.bulkdownloadbuttonclick = page.locator('//a[text()="Bulk Download User Details"]');
        this.DeleteUsers = page.locator('//a[text()="Delete Users"]');
        this.DownloadUserDetails = page.locator('//a[text()="Download User details"]');
        this.GenerateTempId = page.locator('//a[text()="Generate Temp ID"]');
        this.AssignVenue = page.locator('//a[text()="Assign Venue And Booking Status"]');
        this.MarkerReportDownload = page.locator('//a[text()="Markers Report Download"]');
        this.examMoreOptionsClick = page.locator('//table[@class="table"]//tbody//tr[1]//td[1]//a');
        this.manageDeliveryoption = page.locator('(//p[text()="Manage Deliveries"])[1]');

        this.validateCandIdheader = page.locator('//table[@class="table"]//thead//tr//th[3]');
        this.validateCandUploadImageheader = page.locator('//table[@class="table"]//thead//tr//th[4]');
        this.validateCandClientIdheader = page.locator('//table[@class="table"]//thead//tr//th[5]');
        this.validateCandCandidateIdheader = page.locator('//table[@class="table"]//thead//tr//th[6]');
        this.validateCandName = page.locator('//table[@class="table"]//thead//tr//th[7]');
        this.validateCandRoleheader = page.locator('//table[@class="table"]//thead//tr//th[8]');
        this.validateCandStatusheader = page.locator('//table[@class="table"]//thead//tr//th[9]');
        this.validateCandEligibleheader = page.locator('//table[@class="table"]//thead//tr//th[10]');
        this.validateCandInviheader = page.locator('//table[@class="table"]//thead//tr//th[11]');
        this.closeIcon = page.locator('//span[@class="msdd-close"]')
        this.MenuIconClick = page.locator('//i[@class="menuIcons profileIcon"]');
        this.logoutbuttonClick = page.locator('//a[normalize-space()="Log out"]');
        this.clickOnApprovalBtn = page.locator('(//div[@class="sub--right-menu"]//button)[2]')
        this.clickOnApprovalButton = page.locator('(//div[@class="sub--right-menu ng-star-inserted"]//button)[2]')
        this.Blueprint = page.locator('//a[@data-tour="Blueprints"]');
        this.SearchDraftBluePrintQuestions = page.locator('//input[@placeholder="Search Blueprint(s)"]')

        this.workFlowFieldDropDown = page.locator('//ul[@class="ng-star-inserted"]');
        this.triangleClick = page.locator('(//div[@class="msdd-triangle open msdd-triangle-down"])[1]');
        this.chooseApproveWorkFlow = page.locator('(//span[@class="open"])[1]')
        this.reviewerDropDown = page.locator('(//*[@class="input-wrap"])[2]')
        this.chooseReviewer = page.locator('//input[@type="checkbox"]')
        this.approverDropDown = page.locator('(//div[@class="input-wrap"])[3]')
        this.chooseApprover = page.locator('(//li[@class="open ng-star-inserted"])[4]')
        this.submitForReviewBtn = page.locator('//button[@class="theme-btn theme-primary-btn checkout-btn ng-star-inserted"]')
        this.morebtnOnWorkFlow = page.locator('//button[@class="btn btn-default dotbutton"]');
        this.reviewerWorkflowDropdown = page.locator('(//span[@class="open"])[2]');
        this.selectReviewer = page.locator('(//div[@class="open container-left-padding"])[3]');
        this.moreOptionDropDown = page.locator('//button[normalize-space()="..."]');
        this.markersReport = page.locator('//a[normalize-space()="Markers Report Download"]');
        this.clickCreateBlueprint = page.locator('//button[text()="Create Blueprint"]');
        this.typeTitle = page.locator('//input[@name="inputbox"]');
        this.SelectBank = page.locator('//input[@placeholder="Select Bank"]');
        this.TestBank = page.locator('(//div[@class="dropdown-main"])[1]//li//span[@class="open"]')
        this.cartName = page.locator('//input[@placeholder="Cart"]');
        this.cartItemsRequired = page.locator('(//input[@placeholder="0"])[2]');
        this.AddFilter = page.locator('(//button[@class="btn btn-blue"])[1]');
        this.selectFilter = page.locator('//body//app-root//select[2]');
        this.selectFilter1 = page.locator('//body//app-root//select[3]');
        this.selectFilter2 = page.locator('//body//app-root//select[4]');
        this.tickIconClick = page.locator('//i[@class="tick-icon ng-star-inserted"]');
        this.SaveButtonClicks = page.locator('(//button[contains(text(),"Save")])[1]');
        this.FilterSuccessMessage = page.locator('//div[text()="Filter Saved Successfully"]');
        this.closeButton = page.locator('(//button[@type="button"][normalize-space()="×"])[1]');
        this.nextButtonClick = page.locator('//button[text()="Next"]');
        this.clickOnSaveDraft = page.locator('//button[text()="Save Draft"]');
        this.clickOnStatusTitle = page.locator('(//label[@class="accordian-none"])[2]')
        this.clickOnCloseIcon = page.locator('(//button[@class="close"])[1]');
        this.clickYesDelete = page.locator('(//button[@class="theme-button-blue"])[9]')
        this.clickOnSpotQtn = page.locator('//p[normalize-space()="Spot Question"]');
        this.enterAnsKeyForSpot = page.locator('//div[@class="rich-text--container"]//input');
        this.clickOnScenarioQtn = page.locator('//p[normalize-space()="Scenario"]');
        this.clickOn_ISAWE_CASE_Qun = page.locator('//p[text()="ISAWE-CASE"]');
        this.clickOnPlusIcon = page.locator('(//span[@class="plus-btn"])[1]');
        this.subQunTopic = page.locator('(//input[@name="inputbox"])[2]');
        this.clickOnsubQun = page.locator('(//div[@class="icwc-list-item ng-star-inserted"])[1]');
        this.clickRightIcon = page.locator('(//span[@class="checkmark"])[2]');
        this.clickOnSelectAns = page.locator('(//div[@class="btn-selected-list"])[3]');
        this.selectAnsFromDrpdown = page.locator('(//li[@class="open ng-star-inserted"]//div)[5]');
        this.selectFiveAnsFromDropdown = page.locator('(//li[@class="open ng-star-inserted"]//div)[9]');
        this.verifyErrorSubQunMsg = page.locator('//div[@class="content-side"]//span');
        this.clickOnOSCEQun = page.locator('//p[text()="OSCE Question"]');
        this.stationTitletxtField = page.locator('//div[@id="station_title"]//input');
        this.stationTypetxtField = page.locator('(//div[@class="input-wrap"]//input)[1]');
        this.clickOnExamination = page.locator('//span[text()="Examination"]');
        this.clickOnMarkingCheckList = page.locator('//label[text()="Marking Checklist"]');
        this.headingTxtField = page.locator('//span[@class="txtLbl"]//input');
        this.titleTxtField = page.locator('//span[@class="txtLbl ng-star-inserted"]//input');
        this.clickOnProcessQun = page.locator('//label[text()="Process Question"]');
        this.processQunTitle = page.locator('(//span[@class="txtLbl"]//input)[2]')
        this.clickOnRankingQun = page.locator('//p[text()="Ranking Question"]');
        this.defaultMarktxtField = page.locator('//div[@id="question_mark"]//input');
        this.clickOnTranslationQun = page.locator('//p[text()="Translation Question"]');
        this.clickOnSourceLanguage = page.locator('//input[@placeholder="Select Source Language"]');
        this.chooseEnglishLanguage = page.locator('(//span[text()="English"])[1]');
        this.clickOnTranslationLanguage = page.locator('//input[@placeholder="Select Translation Language"]');
        this.chooseKannadaLanguage = page.locator('(//span[text()="Kannada"])[2]');
        this.clickOnRevisionQun = page.locator('//p[text()="Revision Question"]');
        this.clickOnImageIcon = page.locator('//i[@class="menuIcons image-Icon"]');
        this.searchImagestxtfield = page.locator('//input[@placeholder=" Search Image(s)/File(s)"]');
        this.filterButton = page.locator('//span[@class="filtertext"]');
        this.uploadImageBtn = page.locator('//button[contains(text(),"Upload Image/File")] ');
        this.verifytotalCount = page.locator('(//div[@class="tablefooter-left"])[2]');
        this.filterPlusIcon = page.locator('//button[@class="add-filter-button"]');
        this.selectfilterID = page.locator('(//select[@name="operation"])[2]');
        this.enterIDtxtfield = page.locator('//input[@type="number"]');
        this.clickOnRightMark = page.locator('//i[@class="tick-icon"]');
        this.clearAllBtn = page.locator('//button[text()="Clear All"]');
        this.clickOnImageForPriview = page.locator('(//div[@class="image-block"])[1]');
        this.clickOnCloseIconForPreview = page.locator('(//button[@class="close"])[6]');
        this.clickOnQaTestBank = page.locator('(//input[@type="checkbox"])[2]');
        this.clickOnLeftrArrow = page.locator('//div[@class="sh-icon sh--left"]');
        this.clickOnUploadImageBtn = page.locator('//button[contains(text(),"Upload Image/File ")]');
        this.clickOnInsertImageBtn = page.locator('//div[@class="dz-text"]');
        this.clickOnSelectBank = page.locator('//input[@placeholder="Select Bank"]');
        this.verifyImageSavedMessage = page.locator('//span[text()="Image Saved Successfully"]');
        this.deleteImageBtn = page.locator('(//div[@class="image-block--bottom"]//div[2]//qms-button[2]//button)[1]');
        this.clickOnImageYesBtn = page.locator('(//button[text()="Yes"])[3]');
        this.verifyDeleteImageMessage = page.locator('//span[text()="Image Deleted Successfully"]');
        this.editImageBtn = page.locator('(//div[@class="image-block--bottom"]//div[2]//qms-button[1]//button)[1]');
        this.editFileName = page.locator('//input[@name="imgNameInput"]');
        this.clickEditIcon = page.locator('//i[@class="editIcon"]');
        this.clickOnExpandIcon = page.locator('//i[@class="fullScreen"]');
        this.clickEditYesBtn = page.locator('(//button[text()="Yes"])[2]');
        this.verifyUpdateMessage = page.locator('//span[text()="Image Updated Successfully"]');
        this.clickOnMoreOption = page.locator('(//button[@type="button"])[5]');
        this.clickOnDownload = page.locator('//a[text()="Download"]');
        this.clickOnDuplicate = page.locator('//a[text()="Duplicate"]');
        this.clickDuplicateYesBtn = page.locator('(//button[text()="Yes"])[1]');
        this.verifyDuplicateImageMessage = page.locator('//span[text()="Image Duplicated Successfully"]');
        this.clickOnUploadNewVesionBtn = page.locator('//button[contains(text(),"New Version")]');
        this.verifyUploadMessage = page.locator('//span[text()="Image Updated Successfully"]');
        this.verifyisawecaseerrormessage = page.locator('//span[text()="Correct Answers Should be Equal or greater than answer Selection"]');
        this.clickOnDistractorPlusIcon = page.locator('(//span[@class="plus-btn"])[2]');
        this.verifydistractorErrorMessage = page.locator('//span[text()="Maximum 10 Answer Key allowed"]');
        this.clickOnLongAnswerQun = page.locator('//p[text()="Long Answer"]');

    }

    /**Method for Page Navigation */
    async iAuthorPageNavigation() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.AUTHOR.click()
        ]);
        await newPage.waitForLoadState();
        return new exports.EluminaCreateQuestionsPage(newPage);
    }

    /**
    * Method for Logout 
    */
    async logoutClick() {
        await this.page.waitForTimeout(5000);
        await this.MenuIconClick.click();
        await this.logoutbuttonClick.click();
        await this.page.waitForTimeout(5000);
    }


    /**Method for Blueprint Menu click on Menu bar */
    async BlueprintMenuClick(): Promise<void> {
        await this.Blueprint.click();
    }

    /**Method to click on Delivery Menu */
    async deliveryMenuClick() {
        await this.DeliveryMenu.click();
        await this.page.waitForTimeout(3000);
    }

    /**Method to validate delivery tab */
    async validationDelivery() {
        await this.IDMenu.isVisible();
        console.log(await this.IDMenu.textContent());
        await this.ExamName.isVisible();
        console.log(await this.ExamName.textContent());
        await this.Bank.isVisible();
        console.log(await this.Bank.textContent());
        await this.DelExamStartDate.isVisible();
        console.log(await this.DelExamStartDate.textContent());
        await this.DelExamEndDate.isVisible();
        console.log(await this.DelExamEndDate.textContent());
        await this.createdDate.isVisible();
        console.log(await this.createdDate.textContent());
        await this.sortButtonClick.isVisible();
        await this.sortButtonClick.click();
        await this.page.waitForTimeout(3000);
        await this.sortButtonDownClick.isVisible();
        await this.sortButtonDownClick.click();
        await this.page.waitForTimeout(3000);
        await this.ClickOnPlusIcon.click()
        await this.page.waitForTimeout(2000);
        await this.selectFilter.click();
        await this.selectFilter.selectOption('Status');
        await this.page.waitForTimeout(2000);
        await this.selectFilter1.click();
        await this.selectFilter1.selectOption('is equal to');
        await this.page.waitForTimeout(2000);
        await this.selectFilter2.click();
        await this.selectFilter2.selectOption('Approved');
        await this.page.waitForTimeout(2000);
        await this.ClickOnGreenIcon.click();
        await this.SaveButtonClicks.click();
        await this.clickOnCloseIcon.click()
        await this.page.waitForTimeout(2000);
        await this.dropdownclick.click();
        await this.examNamecheckbox.click();
        await this.page.waitForTimeout(3000);
        await this.examNamecheckbox.click();
        await this.page.waitForTimeout(3000);
        await this.dropdownclick.click();
        await this.TotalCount.isVisible();
        console.log(await this.TotalCount.textContent());
        await this.moreOption.click();
        await this.downloadExam.click();
        await this.page.waitForTimeout(3000);
        await this.pageNumber.click();
    }

    /**Method to check search exam negative scenerio */
    async searchExamNegativeScenerio() {
        await this.SearchDraftExams.type('ABC10');
        console.log(await this.ErrorMessage.textContent());
        await expect(this.ErrorMessage).toHaveText("No records found!");
        await this.page.waitForTimeout(3000);
    }

    /**method to click on exam link */
    async examLinkClick() {
        await this.examClick.click();
        await this.page.waitForTimeout(3000);
    }

    /**Method to click on more options in exam link */
    async moreOptionsClickinExam() {
        await this.page.waitForTimeout(3000);
        // await this.SearchDraftExams.type('Approved');
        await this.examMoreOptionsClick.click();
        await this.page.waitForTimeout(3000);
        await this.manageDeliveryoption.click();
    }

    /**Method to create blueprint */
    async createBluePrint() {
        await this.clickCreateBlueprint.click();
        await this.typeTitle.click();
        await this.page.waitForTimeout(2000);
        await this.typeTitle.type(testData.BluePrintTitle + currentDate);
        await this.page.waitForTimeout(2000);
        await this.SelectBank.click();
        await this.SelectBank.type(testData.TestBank2);
        await this.TestBank.click();
        await this.page.waitForTimeout(2000);
        await this.cartName.click();
        await this.cartName.type(testData.cartName);
        await this.cartItemsRequired.click();
        await this.cartItemsRequired.type(testData.cartItems);
        await this.AddFilter.click();
        await this.page.waitForTimeout(2000);
        await this.selectFilter.click();
        await this.selectFilter.selectOption('Status');
        await this.page.waitForTimeout(2000);
        await this.selectFilter1.click();
        await this.selectFilter1.selectOption('is equal to');
        await this.page.waitForTimeout(2000);
        await this.selectFilter2.click();
        await this.selectFilter2.selectOption('Approved');
        await this.page.waitForTimeout(2000);
        await this.tickIconClick.click();
        await this.SaveButtonClicks.click();
        await this.page.waitForTimeout(2000);
        await this.closeButton.click();
        await this.page.waitForTimeout(2000);
        await this.nextButtonClick.click();
        await this.page.waitForTimeout(3000);
        await this.clickOnSaveDraft.click();
        await this.page.waitForTimeout(3000);
        // console.log(await this.workflowSuccessMessage.textContent());
        // await expect(this.workflowSuccessMessage).toHaveText("Workflow has been created successfuly");
        // await this.editBlueprint.click();
        // await this.page.waitForTimeout(2000);
        // await this.cartButtonClick.click();
        // await this.page.waitForTimeout(2000);
        // await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        // const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        // for (let i = 0; i < 1; i++) {
        //     await checks[i].click()
        // }
        // await this.addToCart.click();
        // await this.page.waitForTimeout(2000);
        // await this.saveButton.click();
        // await this.page.waitForTimeout(2000);
        // await expect(this.saveSuccessMessage).toHaveText("Cart Details updated successfully");
    }

    /**method to validate manage delivery */
    async manageDeliveries() {
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
        // await this.manageDeliveryworkflowStatus.isVisible();
        // console.log(await this.manageDeliveryworkflowStatus.textContent());
        await this.manageDeliveryFullScreen.isVisible();
        console.log(await this.manageDeliveryFullScreen.textContent());
    }

    /**Method to validate on more option in manage delivery page */
    async moreOptionValidation() {
        await this.moreButtonClick.click();
        await this.bulkdownloadbuttonclick.isVisible();
        console.log(await this.bulkdownloadbuttonclick.textContent());
        await this.DeleteUsers.isVisible();
        console.log(await this.DeleteUsers.textContent());
        await this.DownloadUserDetails.isVisible();
        console.log(await this.DownloadUserDetails.textContent());
        await this.GenerateTempId.isVisible();
        console.log(await this.GenerateTempId.textContent());
        await this.AssignVenue.isVisible();
        console.log(await this.AssignVenue.textContent());
        await this.MarkerReportDownload.isVisible();
        console.log(await this.MarkerReportDownload.textContent());
    }

    /**Method to enter invalid text in search field  */
    async enterInvalidBluePrintQutn() {
        await this.SearchDraftBluePrintQuestions.click();
        await this.SearchDraftBluePrintQuestions.type('Long Question')
        await this.page.waitForTimeout(3000);
        await expect(this.ValidateNorecordText).toBeVisible()
    }

    /**Method to validateCandidatedashboradinManageDelivery */
    async validateCandidatedashboradinManageDelivery() {
        await this.validateCandIdheader.isVisible();
        await expect(this.validateCandIdheader).toHaveText("ID");
        await this.validateCandUploadImageheader.isVisible();
        await expect(this.validateCandUploadImageheader).toHaveText("UPLOAD IMAGE");
        await this.validateCandClientIdheader.isVisible();
        await expect(this.validateCandClientIdheader).toHaveText("CLIENT ID");
        await this.validateCandCandidateIdheader.isVisible();
        await expect(this.validateCandCandidateIdheader).toHaveText("CANDIDATE ID");
        await this.validateCandName.isVisible();
        await expect(this.validateCandName).toHaveText("NAME");
        await this.validateCandRoleheader.isVisible();
        await expect(this.validateCandRoleheader).toHaveText("ROLE");
        await this.validateCandStatusheader.isVisible();
        await expect(this.validateCandStatusheader).toHaveText("STATUS");
        await this.validateCandEligibleheader.isVisible();
        await expect(this.validateCandEligibleheader).toHaveText("ELIGIBLE");
        await this.validateCandInviheader.isVisible();
        await expect(this.validateCandInviheader).toHaveText("INVIGILATOR");
    }

    async clickOnDraft() {
        await this.SearchDraftQuestions.click();
        await this.SearchDraftQuestions.clear()
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000);
    }

    async clickOnApproved() {
        await this.SearchDraftQuestions.click();
        await this.SearchDraftQuestions.clear()
        await this.SearchDraftQuestions.type('Approved')
        await this.page.waitForTimeout(3000);
    }

    /**
     * Method to search approved question
     */
    async clickOnBluePrintApproved() {
        await this.SearchDraftBluePrintQuestions.click();
        await this.SearchDraftBluePrintQuestions.clear()
        await this.SearchDraftBluePrintQuestions.type('Approved')
        await this.page.waitForTimeout(3000);
    }

    /**Method to enter invalid text in search field  */
    async enterInvalidQutn() {
        await this.SearchDraftQuestions.click();
        await this.SearchDraftQuestions.type('Long Question')
        await this.page.waitForTimeout(3000);
        await expect(this.ValidateNorecordText).toBeVisible()
    }

    /**Method to validate Filter */
    async validateFilter() {
        await this.ClickOnPlusIcon.click()
        await this.ClickOnSelectOne.click()
        await this.ClickOnSelectOne.selectOption('ID')
        await this.page.waitForTimeout(3000);
        await this.ClickOnGreenIcon.click()
        await this.page.waitForTimeout(3000);
        await expect(this.ValidateMessage).toBeVisible()
    }

    /**Method to unchecked the all question columns  */
    async uncheckAllQutnColumns() {
        await this.ClickOnCheckedAndUncheckedIcon.click();
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector('//ul[@class="dropdown-menu dropdown-menu-columns"]//li//input')
        const allcheckbox = await this.page.$$('//ul[@class="dropdown-menu dropdown-menu-columns"]//li//input')
        console.log(allcheckbox.length)
        for (let i = 1; i < allcheckbox.length; i++) {
            try {
                await allcheckbox[i].click()
                await this.page.waitForTimeout(8000);
            }
            catch (error) {
                console.log(error.ErrorMessage)
            }

        }
        // await this.SearchDraftQuestions.type('Long Question')
        await this.page.waitForTimeout(3000);
        // await expect(this.ValidateNorecordText).toBeVisible()
    }

    /**Method to validate Version,date in Question page */
    async validateVersionInQunPage() {
        await expect(this.ValidateVersion).toBeVisible();
        console.log(await this.ValidateVersion.textContent())
    }
    /**Method to validate Version Historey */
    async validationOfVersionHistory() {
        await this.ClickOnVersionHistory.click()
        await this.page.waitForSelector('//h5[@class="verticalStepperCard__list--title"]')
        const versions = await this.page.$$('//h5[@class="verticalStepperCard__list--title"]')
        for (let i = 0; i < versions.length; i++) {
            console.log(await versions[i].textContent());
        }

    }

    /**Method to validate Admin pop */
    async verifyInvalidUserPopup() {
        await expect(this.Invalidpopupmessage).toBeVisible();
    }

    /**Method to search a question */
    async searchQuestion() {
        await this.SearchDraftQuestions.click();
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.clickonQuestion.click()
        await this.QuestionTopic.click()
        await this.QuestionTopic.type("8");
    }

    /**Method to click on cancel Button Validation */
    async clickOnCancelBtn() {
        await this.ClickOnCancelBtn.click()
        await expect(this.confirmationPopUp).toBeVisible()
        await this.ClickOnNoBtn.click()
    }

    /**Method to click on other module validation */
    async validationOfClickOnOtherModule() {
        await this.EXAMSMENU.click();
        await expect(this.confirmationPopUp).toBeVisible()
        await this.ClickOnNoBtn.click()
    }
    /**Method to click on Back button validation */
    async validationOfBackArrowBtn() {
        await this.ClickOnBackArrowBtn.click();
        await expect(this.confirmationPopUp).toBeVisible()
        await this.ClickOnNoBtn.click()
    }

    /**Mrthod to validate close tab */
    async closeTabValidation() {
        await this.page.keyboard.press('Control+KeyW')
        await this.page.waitForTimeout(8000)
    }

    /**Navigate to Invalid Login Application */
    async invalidloginCredential(): Promise<void> {
        await this.USERNAME_EDITBOX.fill(testData.InvalidAdminUserEmail);
        await this.PASSWORD_EDITBOX.fill(testData.InvalidAdminUserPassword);
        await this.LOGIN_BUTTON.click();
    }


    /**Method for Question Menu click on Menu bar */
    async QuestionsMenuClick(): Promise<void> {
        await this.Questions.click();
        await this.page.waitForTimeout(3000);
    }

    /**Method for Click on Image icon*/
    async ImageIconClick(): Promise<void> {
        await this.clickOnImageIcon.click();
        await this.page.waitForTimeout(3000);
        await expect(this.searchImagestxtfield).toBeVisible();
        await expect(this.filterButton).toBeVisible();
        await expect(this.uploadImageBtn).toBeVisible();
        await expect(this.verifytotalCount).toBeVisible();
    }

    /**Method for Click on Image icon*/
    async verifyImage(): Promise<void> {
        await this.clickOnImageIcon.click();
        await this.page.waitForTimeout(6000);
        await this.searchImagestxtfield.type("iAuthor");
        await this.page.waitForTimeout(6000);
        await this.searchImagestxtfield.clear();
        await this.page.waitForTimeout(6000);
        await this.filterPlusIcon.click();
        await this.page.waitForTimeout(1000);
        await this.selectfilterID.selectOption('ID');
        await this.enterIDtxtfield.type('446');
        await this.clickOnRightMark.click();
        await this.page.waitForTimeout(3000);
        await this.clearAllBtn.click();
        await this.page.waitForTimeout(6000);
        await this.clickOnImageForPriview.click();
        await this.page.waitForTimeout(3000);
        await this.clickOnCloseIconForPreview.click();
        await this.page.waitForTimeout(3000);
        await this.clickOnQaTestBank.check();
        await this.page.waitForTimeout(5000);
        await this.clickOnLeftrArrow.click()
        await this.page.waitForTimeout(1000);
    }

    /**Method for upload Image*/
    async uploadImage(): Promise<void> {
        await this.clickOnImageIcon.click();
        await this.page.waitForTimeout(6000);
        await this.clickOnUploadImageBtn.click();
        await this.page.waitForTimeout(6000);
        const fileChooserPromise = this.page.waitForEvent('filechooser')
        await this.clickOnInsertImageBtn.click()
        const fileChooser = await fileChooserPromise
        await fileChooser.setFiles('lib/Images/Capture.png');
        await this.page.waitForTimeout(6000);
        await this.clickOnSelectBank.click();
        await this.clickOnSelectBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.saveButtonClick.click();
        await this.page.waitForTimeout(3000);
        await expect(this.verifyImageSavedMessage).toBeVisible();
    }

    /**Method for delete Image*/
    async deleteImage(): Promise<void> {
        await this.clickOnImageIcon.click();
        await this.page.waitForTimeout(6000);
        await this.deleteImageBtn.click();
        await this.page.waitForTimeout(3000);
        await this.clickOnImageYesBtn.click();
        await this.page.waitForTimeout(1000);
        await expect(this.verifyDeleteImageMessage).toBeVisible()
    }

    /**Method for Edit Image*/
    async editImage(): Promise<void> {
        await this.clickOnImageIcon.click();
        await this.page.waitForTimeout(6000);
        await this.editImageBtn.click();
        await this.page.waitForTimeout(3000);
        await this.editFileName.clear();
        await this.editFileName.type('Image' + Math.floor(Math.random() * 899 + 100));
        await this.clickEditIcon.click();
        await this.page.waitForTimeout(1000);
        await this.clickOnExpandIcon.click();
        await this.page.waitForTimeout(1000);
        await this.clickOnCloseIcon.click();
        await this.saveButtonClick.click();
        await this.page.waitForTimeout(3000);
        await this.clickEditYesBtn.click();
        await this.page.waitForTimeout(30000);
        await expect(this.verifyUploadMessage).toBeVisible()
    }

    /**Method for click download and duplicate*/
    async clickOnDownloadAndDuplicate(): Promise<void> {
        await this.clickOnImageIcon.click();
        await this.page.waitForTimeout(6000);
        await this.editImageBtn.click();
        await this.page.waitForTimeout(3000);
        await this.clickOnMoreOption.click();
        await this.clickOnDownload.click();
        await this.page.waitForTimeout(2000);
        await this.clickOnMoreOption.click();
        await this.clickOnDuplicate.click();
        await this.page.waitForTimeout(1000);
        await this.clickDuplicateYesBtn.click();
        await this.page.waitForTimeout(1000);
        await expect(this.verifyDuplicateImageMessage).toBeVisible()
    }

    /**Method for Image upload new version*/
    async verifyImageVersion(): Promise<void> {
        await this.clickOnImageIcon.click();
        await this.page.waitForTimeout(6000);
        await this.editImageBtn.click();
        await this.page.waitForTimeout(3000);
        await this.editFileName.clear();
        await this.editFileName.type('Image' + Math.floor(Math.random() * 899 + 100));
        await this.saveButtonClick.click();
        await this.page.waitForTimeout(1000);
        await this.clickOnUploadNewVesionBtn.click();
        await this.page.waitForTimeout(1000);
        const fileChooserPromise = this.page.waitForEvent('filechooser')
        await this.clickOnInsertImageBtn.click()
        const fileChooser = await fileChooserPromise
        await fileChooser.setFiles('lib/Images/Capture.png');
        await this.page.waitForTimeout(3000);
        await this.saveButtonClick.click();
        await this.page.waitForTimeout(2000);
    }

    /**Method for Exams Menu click on Menu bar */
    async ExamsMenuClick(): Promise<void> {
        await this.EXAMSMENU.click();
    }

    /**Method to validate Preview Page */
    async validatePreviewPage() {
        await this.ClickOnMoreOption.click();
        await this.ClickOnPreview.click();
        await expect(this.ValidatePreviewPage).toBeVisible();
    }

    /**Method to validate Edit Question */
    async validateEditQuestion() {
        await this.ClickOnMoreOption.click();
        await this.ClickOnDuplicate.click();
        await this.ClickOnYesBtn.click();
        // await this.ClickOnSaveBtn.click();
        // await this.ClickOnInappropriateRadioBtn.click();
        await this.ClickOnSubmitBtn.click();
        await this.ClickOnSaveBtn.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click();
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
        //await this.ClickOnVersionHistory.click()
    }


    /**Method to validate Question Checkout */
    async validateQuestionCheckout() {
        await this.ClickOnMoreOption.click();
        await this.ClickOnCheckout.click();
        await this.ClickOnYesBtnForCheckout.click();
        await this.ClickOnQuestionID.click()
        await this.ClickOnSaveBtn.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click();
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
        await this.ClickOnVersionHistory.click()
    }

    /**Method for Question Tab Navigation */
    async questionTabNavigation(): Promise<void> {
        await this.ClickOnQuestionTab.click();
    }

    /** Method to verify question page */
    async validateQuestionPageDetails() {
        await expect(this.VerifyquestionID).toBeVisible();
        console.log(await this.VerifyquestionID.textContent())
        await expect(this.VerifyquestioTitle).toBeVisible();
        console.log(await this.VerifyquestioTitle.textContent())
        await expect(this.VerifyquestionText).toBeVisible();
        console.log(await this.VerifyquestionText.textContent())
        await expect(this.VerifyquestionType).toBeVisible();
        console.log(await this.VerifyquestionType.textContent())
        await expect(this.VerifyquestionDescription).toBeVisible();
        console.log(await this.VerifyquestionDescription.textContent())
        await expect(this.VerifyquestionBank).toBeVisible();
        console.log(await this.VerifyquestionBank.textContent())
        await expect(this.VerifyquestionCreatedBy).toBeVisible();
        console.log(await this.VerifyquestionCreatedBy.textContent())
        await expect(this.VerifyquestionLastmodifiedBy).toBeVisible();
        console.log(await this.VerifyquestionLastmodifiedBy.textContent())
        await expect(this.VerifyquestionStatus).toBeVisible();
        console.log(await this.VerifyquestionStatus.textContent())
        await expect(this.VerifyquestionCreatedDate).toBeVisible();
        console.log(await this.VerifyquestionCreatedDate.textContent())
        await expect(this.VerifyquestionLastDateUpdated).toBeVisible();
        console.log(await this.VerifyquestionLastDateUpdated.textContent())
        await expect(this.VerifyquestionUsedInExams).toBeVisible();
        console.log(await this.VerifyquestionUsedInExams.textContent())
        await expect(this.VerifyquestionUsedInBlueprints).toBeVisible();
        console.log(await this.VerifyquestionUsedInBlueprints.textContent())
        // await expect(this.VerifyquestionMore).toBeVisible();
        // console.log(await this.VerifyquestionMore.textContent());
    }

    /**Method to create Question and Search */
    async createQuestionAndSearch() {
        await this.ClickOnCreateQuestion.click()
        await this.SearchQuestion.click()
        await this.SearchQuestion.type(testData.SearchQuestion)
        await this.page.waitForTimeout(5000);
        await this.ClickOnSearchedQuestion.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnNextBtn.click();
        await expect(this.ValidateCreateQuestionPage).toBeVisible();
        await this.page.waitForTimeout(3000);
    }

    /**Method to create Question and Search to validate popup */
    async validatePopupWithoutSelctAQuestion() {
        await this.ClickOnCreateQuestion.click()
        await this.ClickOnNextBtn.click();
        await expect(this.VerifyPopupWtoutselctQuestion).toBeVisible();
        await this.page.waitForTimeout(3000);
    }

    async searchValidValue() {
        await this.SearchQuestion.click()
        await this.SearchQuestion.type(testData.SearchQuestion)
        await this.page.waitForTimeout(2000);
        console.log("Valid text:", await this.ClickOnSearchedQuestion.textContent());
        await this.SearchQuestion.clear();
        await this.SearchQuestion.type("ABC")
        await this.page.waitForTimeout(2000);
        console.log("Invalid text", await this.VerifyNoRecordsFoundStatus.textContent())
        await this.SearchQuestion.clear();
        await this.SearchQuestion.type(testData.SearchQuestion)
        await this.page.waitForTimeout(2000);
        await this.ClickOnSearchedQuestion.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnNextBtn.click();
        await expect(this.ValidateCreateQuestionPage).toBeVisible();
        await this.page.waitForTimeout(3000);
    }


    /**Methods to logout as a admin */
    async adminLogout() {
        await this.ClickOnProfile.click();
        await this.ClickOnLogout.click()
        await this.page.waitForTimeout(5000);
        await this.page.close()
    }

    /**Method to create MCQ Questions */
    async createMCQQuestions(): Promise<void> {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.MCQQuestionsClick.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample MCQ Questions' + Math.floor(Math.random() * 8999 + 1000));
        await this.page.waitForTimeout(2000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.QuestionAims);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.OptionA);
        await this.page.waitForTimeout(2000);
        await this.ControlIndicator1.click();
        await this.page.waitForTimeout(2000);
        await this.OptionB.click();
        await this.OptionB.type(testData.OptionB);
        await this.page.waitForTimeout(2000);
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionC);
        await this.page.waitForTimeout(2000);
        await this.OptionD.click();
        await this.OptionD.type(testData.OptionD);
        await this.page.waitForTimeout(2000);
        await this.OptionE.click();
        await this.OptionE.type(testData.OptionE);
        await this.page.waitForTimeout(2000);
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
    }

    /**Method to create MCQ Questions without workflow*/
    async createMCQQuestionswithoutWorkFlow(): Promise<void> {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.MCQQuestionsClick.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample MCQ Questions' + Math.floor(Math.random() * 8999 + 1000));
        await this.page.waitForTimeout(2000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.QuestionAims);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.OptionA);
        await this.page.waitForTimeout(2000);
        await this.ControlIndicator1.click();
        await this.page.waitForTimeout(2000);
        await this.OptionB.click();
        await this.OptionB.type(testData.OptionB);
        await this.page.waitForTimeout(2000);
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionC);
        await this.page.waitForTimeout(2000);
        await this.OptionD.click();
        await this.OptionD.type(testData.OptionD);
        await this.page.waitForTimeout(2000);
        await this.OptionE.click();
        await this.OptionE.type(testData.OptionE);
        await this.page.waitForTimeout(2000);
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()

    }

    /**Method to create VSAQ */
    async createVSAQQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ClickOnVSAQ.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample VSAQ Questions' + Math.floor(Math.random() * 8999 + 1000));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        await this.EnterMarks.click()
        await this.EnterMarks.clear()
        await this.EnterMarks.type('2')
        await this.page.waitForTimeout(2000);
        // await this.AddImage.click();
        // await this.ClickOnUploadImageBtn.click()
        // await this.page.waitForTimeout(5000);
        // await this.ClickOnInsertImageFile.setInputFiles('lib/Images/kohli.jpeg');
        // await this.page.waitForTimeout(2000);
        await this.EnterAnsKey.type(testData.AnswerKey)
        await this.OptionB.click();
        await this.OptionB.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        await this.EnterMarksInAns.click()
        await this.EnterMarksInAns.clear()
        await this.EnterMarksInAns.type("2")
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());

    }

    /**Methods to create Type-B Question */
    async createTypeBQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ClickOnTypeB.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample TypeB Questions' + Math.floor(Math.random() * 8999 + 1000));
        await this.page.waitForTimeout(2000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.TypeBStatement);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        // await this.EnterMarks.click()
        // await this.EnterMarks.clear()
        // await this.EnterMarks.type('2')
        // await this.page.waitForTimeout(2000);
        // await this.AddImage.click();
        // await this.ClickOnUploadImageBtn.click()
        // await this.page.waitForTimeout(5000);
        // await this.ClickOnInsertImageFile.setInputFiles('lib/Images/kohli.jpeg');
        // await this.page.waitForTimeout(2000);
        await this.OptionB.click();
        await this.OptionB.type(testData.OptionA);
        await this.page.waitForTimeout(2000);
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionB);
        await this.page.waitForTimeout(2000);
        await this.OptionD.click();
        await this.OptionD.type(testData.OptionC);
        await this.page.waitForTimeout(2000);
        await this.OptionE.click();
        await this.OptionE.type(testData.OptionD);
        await this.page.waitForTimeout(2000);
        await this.Optional.click();
        await this.Optional.type(testData.OptionE);
        await this.page.waitForTimeout(2000);
        await this.ClickOnOptionBRadioBtn.click()
        // await this.EnterMarksInAns.click()
        // await this.EnterMarksInAns.clear()
        // await this.EnterMarksInAns.type("2")
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());

    }

    /**Methods to create SJT Question */
    async createSJTQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ClickOnSJT.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample SJT Questions' + Math.floor(Math.random() * 8999 + 1000));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.TypeBStatement);
        await this.page.waitForTimeout(2000);
        await this.AddImage.click();
        await this.page.waitForTimeout(2000);
        await this.clickImage.click()
        await this.page.waitForTimeout(2000);
        await this.InsertImageClick.click();
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        await this.ClickOnAppropriateRadioBtn.click();
        await this.page.waitForTimeout(2000);
        await this.EnterMarksInSJT.click();
        await this.EnterMarksInSJT.clear();
        await this.EnterMarksInSJT.type("2");
        await this.page.waitForTimeout(2000);
        // await this.EnterMarksInAns.click()
        // await this.EnterMarksInAns.clear()
        // await this.EnterMarksInAns.type("2")
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
    }


    /**Method to create ISAWEQuestions */
    async createISAWEQuestions(): Promise<void> {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ISAWEQuestionsClick.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Renewable Energy ISAWE' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.Question.click();
        await this.Question.type(testData.Scenario);
        await this.page.waitForTimeout(2000);
        await this.AddImage.click();
        await this.page.waitForTimeout(2000);
        await this.clickImage.click()
        await this.page.waitForTimeout(2000);
        await this.InsertImageClick.click();
        await this.page.waitForTimeout(2000);
        await this.Marks.click();
        await this.Marks.type('2');
        await this.QuestionsText.click();
        await this.QuestionsText.type(testData.ISAWEQuestion);
        await this.page.waitForTimeout(2000);
        await this.Answer.click();
        await this.Answer.type(testData.AnswerISAWE);
        await this.page.waitForTimeout(2000);
        await this.correctAnswerMarks.click();
        await this.correctAnswerMarks.type('2');
        await this.page.waitForTimeout(2000);
        await this.EnterAnsKey.type(testData.AnswerKeyISAWE)
        await this.page.waitForTimeout(2000);
        await this.OptionC.click();
        await this.OptionC.type(testData.AnswerKeyISAWE);
        await this.page.waitForTimeout(2000);
        await this.MarkMarks.click();
        await this.MarkMarks.type('2');
        await this.page.waitForTimeout(2000);
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(3000);
        await expect(this.QuestionSuccessMessage).toHaveText('Question created successfully');
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(2000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
        await expect(this.ValidateSuccessfulPopMessage).toHaveText('Status has been updated successfully.');
        await this.page.waitForTimeout(3000);
    }

    /**Method to create SAQ */
    async createSAQQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ClickOnSAQ.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample SAQ Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        await this.EnterMarks.click()
        await this.EnterMarks.clear()
        await this.EnterMarks.type('2')
        await this.page.waitForTimeout(2000);
        await this.EnterAnsKey.type(testData.AnswerKey)
        await this.OptionB.click();
        await this.OptionB.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        await this.EnterMarksInAns.click()
        await this.EnterMarksInAns.clear()
        await this.EnterMarksInAns.type("2")
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
    }

    /**Methods to create Type-X Question */
    async createTypeXQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ClickOnTypeX.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample TypeX Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.OptionA);
        await this.ClickOnRadioButton1.click();
        await this.page.waitForTimeout(2000);
        await this.OptionB.click();
        await this.OptionB.type(testData.OptionB);
        await this.ClickOnRadioButton2.click();
        await this.page.waitForTimeout(2000);
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionC);
        await this.ClickOnRadioButton3.click();
        await this.page.waitForTimeout(2000);
        await this.OptionD.click();
        await this.OptionD.type(testData.OptionD);
        await this.ClickOnRadioButton4.click();
        await this.page.waitForTimeout(2000);
        await this.OptionE.click();
        await this.OptionE.type(testData.OptionE);
        await this.ClickOnRadioButton5.click();
        await this.page.waitForTimeout(2000);
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
    }

    /**Methods to create Spot Question */
    async createSpotQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.clickOnSpotQtn.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample Spot Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.QuestionsText.click();
        await this.QuestionsText.type(testData.OptionA);
        await this.EnterMarks.click()
        await this.EnterMarks.clear()
        await this.EnterMarks.type('2');
        await this.page.waitForTimeout(2000);
        await this.enterAnsKeyForSpot.click();
        await this.enterAnsKeyForSpot.type(testData.AnswerKey);
        await this.page.waitForTimeout(2000);
        await this.EnterMarksInAns.click()
        await this.EnterMarksInAns.clear()
        await this.EnterMarksInAns.type("2");
        await this.page.waitForTimeout(2000);
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
    }

    /**Method to validate Spot Question */
    async validationOfSpot() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.clickOnSpotQtn.click();
        await this.NextButtonClick.click();
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(1000);
        await expect(this.EmptyFieldErrorMessage).toBeVisible()
    }

    /**Method to validate Spot fields */
    async enterRemainingSpotField() {
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample Spot Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.QuestionsText.click();
        await this.QuestionsText.type(testData.OptionA);
        await this.EnterMarks.click()
        await this.EnterMarks.clear()
        await this.EnterMarks.type('2');
        await this.page.waitForTimeout(2000);
        await this.enterAnsKeyForSpot.click();
        await this.enterAnsKeyForSpot.type(testData.AnswerKey);
        await this.page.waitForTimeout(2000);
        await this.EnterMarksInAns.click()
        await this.EnterMarksInAns.clear()
        await this.EnterMarksInAns.type("2");
        await this.ClickOnMarkinGuide.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
    }

    /**Methods to create ISAWE-CASE Question */
    async createISAWE_CASEQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.clickOn_ISAWE_CASE_Qun.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample ISAWE-CASE Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.clickOnPlusIcon.click();
        await this.clickOnsubQun.click();
        await this.subQunTopic.type('Sample MCQ-MSMG Questions' + Math.floor(Math.random() * 899 + 100));
        await this.QuestionsText.click();
        await this.QuestionsText.type(testData.OptionA);
        await this.Answer.click();
        await this.Answer.type(testData.AnswerISAWE);
        await this.clickOnSelectAns.click();
        await this.selectAnsFromDrpdown.click();
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionC);
        await this.clickRightIcon.click();
        await this.page.waitForTimeout(2000);
        await this.OptionD.click();
        await this.OptionD.type(testData.OptionD);
        await this.page.waitForTimeout(2000);
        await this.OptionE.click();
        await this.OptionE.type(testData.OptionE);
        await this.page.waitForTimeout(2000);
        await this.Optional.click();
        await this.Optional.type(testData.OptionE);
        await this.page.waitForTimeout(2000);
        await this.Optional2.click();
        await this.Optional2.type(testData.OptionE);
        await this.page.waitForTimeout(2000);
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
    }

    /**Methods to verify ISAWE-CASE Question error message */
    async verifyISAWE_CASEQuestionerrormessage() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.clickOn_ISAWE_CASE_Qun.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample ISAWE-CASE Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.clickOnPlusIcon.click();
        await this.clickOnsubQun.click();
        await this.subQunTopic.type('Sample MCQ-MSMG Questions' + Math.floor(Math.random() * 899 + 100));
        await this.QuestionsText.click();
        await this.QuestionsText.type(testData.OptionA);
        await this.Answer.click();
        await this.Answer.type(testData.AnswerISAWE);
        await this.clickOnSelectAns.click();
        await this.selectFiveAnsFromDropdown.click();
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionC);
        await this.clickRightIcon.click();
        await this.page.waitForTimeout(2000);
        await this.OptionD.click();
        await this.OptionD.type(testData.OptionD);
        await this.page.waitForTimeout(2000);
        await this.OptionE.click();
        await this.OptionE.type(testData.OptionE);
        await this.page.waitForTimeout(2000);
        await this.Optional.click();
        await this.Optional.type(testData.OptionE);
        await this.page.waitForTimeout(2000);
        await this.Optional2.click();
        await this.Optional2.type(testData.OptionE);
        await this.page.waitForTimeout(2000);
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(1000);
        await expect(this.verifyisawecaseerrormessage).toBeVisible();
    }

    /**Methods to verify ISAWE-CASE Question error message For Distractor */
    async verifyISAWE_CASEQuestionerrormessageForDistractor() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.clickOn_ISAWE_CASE_Qun.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample ISAWE-CASE Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.clickOnPlusIcon.click();
        await this.clickOnsubQun.click();
        await this.subQunTopic.type('Sample MCQ-MSMG Questions' + Math.floor(Math.random() * 899 + 100));
        for (let i = 1; i <= 10; i++) {
            await this.clickOnDistractorPlusIcon.click()
        }
        await expect(this.verifydistractorErrorMessage).toBeVisible();
    }

    /**Method to validate ISAWE_CASE Question */
    async validationOfISAWE_CASEQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.clickOn_ISAWE_CASE_Qun.click();
        await this.NextButtonClick.click();
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(1000);
        await expect(this.EmptyFieldErrorMessage).toBeVisible()
    }

    /**Method to validate ISAWE_CASE fields */
    async enterRemainingISAWE_CASEField() {
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample ISAWE-CASE Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.clickOnPlusIcon.click();
        await this.clickOnsubQun.click();
        await this.subQunTopic.type('Sample MCQ-MSMG Questions' + Math.floor(Math.random() * 899 + 100));
        await this.QuestionsText.click();
        await this.QuestionsText.type(testData.OptionA);
        await this.Answer.click();
        await this.Answer.type(testData.AnswerISAWE);
        await this.clickOnSelectAns.click();
        await this.selectAnsFromDrpdown.click();
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionC);
        await this.clickRightIcon.click();
        await this.page.waitForTimeout(2000);
        await this.OptionD.click();
        await this.OptionD.type(testData.OptionD);
        await this.page.waitForTimeout(2000);
        await this.OptionE.click();
        await this.OptionE.type(testData.OptionE);
        await this.page.waitForTimeout(2000);
        await this.Optional.click();
        await this.Optional.type(testData.OptionE);
        await this.page.waitForTimeout(2000);
        await this.Optional2.click();
        await this.Optional2.type(testData.OptionE);
        await this.ClickOnMarkinGuide.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
    }

    /**Method to validate ISAWE_CASE fields without sub qun */
    async enterRemainingISAWE_CASEFieldWithoutSubQun() {
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample ISAWE-CASE Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(1000);
        await expect(this.verifyErrorSubQunMsg).toBeVisible()
    }

    /**Method to validate ISAWE_CASE fields */
    async addSubQunWithoutMandatoryField() {
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample ISAWE-CASE Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.clickOnPlusIcon.click();
        await this.clickOnsubQun.click();
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(1000);
        await expect(this.verifyErrorSubQunMsg).toBeVisible()
    }

    /**Methods to create OSCE Question */
    async createOSCEQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.clickOnOSCEQun.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample OSCE Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.stationTitletxtField.type('OSCE Question');
        await this.stationTypetxtField.click();
        await this.page.waitForTimeout(1000);
        await this.clickOnExamination.click();
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.QuestionsText.click();
        await this.QuestionsText.type(testData.OptionA);
        await this.Answer.click();
        await this.Answer.type(testData.AnswerISAWE);
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionC);
        await this.page.waitForTimeout(2000);
        await this.OptionD.click();
        await this.OptionD.type(testData.OptionD);
        await this.page.waitForTimeout(2000);
        await this.clickOnMarkingCheckList.click()
        await this.headingTxtField.fill('question');
        await this.titleTxtField.fill('oscequestion');
        await this.EnterMarks.click()
        await this.EnterMarks.clear()
        await this.EnterMarks.type("2")
        await this.page.waitForTimeout(2000);
        await this.clickOnProcessQun.click();
        await this.processQunTitle.type('process question')
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
    }

    /**Method to validate OSCE Question */
    async validationOfOSCEuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.clickOnOSCEQun.click();
        await this.NextButtonClick.click();
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(1000);
        await expect(this.EmptyFieldErrorMessage).toBeVisible()
    }

    /**Method to validate OSCE fields */
    async enterRemainingOSCEField() {
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample OSCE Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.stationTitletxtField.type('OSCE Question');
        await this.stationTypetxtField.click();
        await this.page.waitForTimeout(1000);
        await this.clickOnExamination.click();
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.QuestionsText.click();
        await this.QuestionsText.type(testData.OptionA);
        await this.Answer.click();
        await this.Answer.type(testData.AnswerISAWE);
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionC);
        await this.page.waitForTimeout(2000);
        await this.OptionD.click();
        await this.OptionD.type(testData.OptionD);
        await this.page.waitForTimeout(2000);
        await this.clickOnMarkingCheckList.click()
        await this.headingTxtField.fill('question');
        await this.titleTxtField.fill('oscequestion');
        await this.EnterMarks.click()
        await this.EnterMarks.clear()
        await this.EnterMarks.type("2")
        await this.page.waitForTimeout(2000);
        await this.clickOnProcessQun.click();
        await this.processQunTitle.type('process question')
        await this.ClickOnMarkinGuide.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
    }

    /**Method to validate OSCE Question */
    async validationOfScenariouestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.clickOnScenarioQtn.click();
        await this.NextButtonClick.click();
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(1000);
        await expect(this.EmptyFieldErrorMessage).toBeVisible()
    }

    /**Method to validate OSCE fields */
    async enterRemainingScenarioField() {
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample Scenario Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.QuestionsText.click();
        await this.QuestionsText.type(testData.OptionA);
        await this.Answer.click();
        await this.Answer.type(testData.AnswerISAWE);
        await this.EnterMarks.click()
        await this.EnterMarks.clear()
        await this.EnterMarks.type("2")
        await this.EnterAnsKey.type('Marking Guide')
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionC);
        await this.EnterMarksInAns.click()
        await this.EnterMarksInAns.clear()
        await this.EnterMarksInAns.type("2")
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
    }

    /**Methods to create Long Answer Question */
    async createLongAnswerQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.page.waitForTimeout(2000);
        await this.clickOnLongAnswerQun.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample Long Answer Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.QuestionsText.click();
        await this.QuestionsText.type(testData.OptionA);
        await this.EnterMarks.click()
        await this.EnterMarks.clear()
        await this.EnterMarks.type("2")
        await this.EnterAnsKey.type('Long Answer')
        await this.Answer.click();
        await this.Answer.type(testData.AnswerISAWE);
        await this.EnterMarksInAns.click()
        await this.EnterMarksInAns.clear()
        await this.EnterMarksInAns.type("2")
        await this.page.waitForTimeout(2000);
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
    }

    /**Methods to create Ranking Question */
    async createRankingQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.clickOnRankingQun.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample Ranking Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.defaultMarktxtField.click()
        await this.page.waitForTimeout(1000);
        try {
            await this.defaultMarktxtField.fill('question');
            await this.page.waitForTimeout(2000);
        } catch (error) {
            console.log(error);
        };
        await this.QuestionsText.click();
        await this.QuestionsText.type(testData.OptionA);
        await this.page.waitForTimeout(2000);
        await this.Answer.click();
        await this.Answer.type(testData.AnswerISAWE);
        await this.page.waitForTimeout(2000);
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionC);
        await this.page.waitForTimeout(2000);
        await this.OptionD.click();
        await this.OptionD.type(testData.OptionD);
        await this.page.waitForTimeout(2000);
        await this.OptionE.click();
        await this.OptionE.type(testData.OptionE);
        await this.page.waitForTimeout(2000);;
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
    }

    /**Methods to create Translation Question */
    async createTranslationQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.clickOnTranslationQun.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample Translation Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.clickOnSourceLanguage.click();
        await this.chooseEnglishLanguage.click();
        await this.page.waitForTimeout(1000);
        await this.clickOnTranslationLanguage.click();
        await this.chooseKannadaLanguage.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionsText.click();
        await this.QuestionsText.type(testData.OptionA);
        await this.Answer.click();
        await this.Answer.type(testData.AnswerISAWE);
        await this.EnterMarks.click()
        await this.EnterMarks.clear()
        await this.EnterMarks.type("2")
        await this.EnterAnsKey.type(testData.AnswerKeyISAWE)
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionC);
        await this.page.waitForTimeout(2000);
        await this.EnterMarksInAns.click()
        await this.EnterMarksInAns.clear()
        await this.EnterMarksInAns.type("2")
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
    }

    /**Methods to create Revision Question */
    async createRevisionQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.clickOnRevisionQun.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample Revision Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.clickOnSourceLanguage.click();
        await this.chooseEnglishLanguage.click();
        await this.page.waitForTimeout(1000);
        await this.clickOnTranslationLanguage.click();
        await this.chooseKannadaLanguage.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionsText.click();
        await this.QuestionsText.type(testData.OptionA);
        await this.Answer.click();
        await this.Answer.type(testData.AnswerISAWE);
        await this.OptionC.click();
        await this.page.waitForTimeout(2000);
        await this.OptionC.type(testData.OptionC);
        await this.EnterMarks.click()
        await this.EnterMarks.clear()
        await this.EnterMarks.type("2")
        await this.EnterAnsKey.type(testData.AnswerKeyISAWE)
        await this.OptionD.click();
        await this.OptionD.type(testData.OptionD);
        await this.page.waitForTimeout(2000);
        await this.EnterMarksInAns.click()
        await this.EnterMarksInAns.clear()
        await this.EnterMarksInAns.type("2")
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
    }

    /**Method tp validate question delete */
    async validateQuestionDelete() {
        await this.SearchDraftQuestions.clear();
        await this.page.waitForTimeout(2000)
        await this.SearchDraftQuestions.type('Approved')
        await this.page.waitForTimeout(3000)
        await this.clickQuestionId.click();
        await this.clickMoreOption.click();
        await this.clickCheckout.click();
        await this.YesBtnClick.click();
        await this.page.waitForTimeout(5000);
        await this.clickMoreOption.click();
        await this.clickDelete.click();
        await this.clickYesDelete.click();
    }

    /**Method to validate blueprint question delete */
    async validateBlueprintQuestionDelete() {
        await this.clickQuestionId.click();
        await this.clickMoreOption.click();;
        await this.clickDelete.click();
        await this.clickArchiveYes.click();
    }

    /**Method to validate duplicate question */
    async ValidationQuestionDuplicate() {
        await this.clickQuestionId.click();
        await this.clickMoreOption.click();
        await this.clickonDuplicate.click();
        await this.page.waitForTimeout(2000);
        await this.clickYesDuplicate.click();
        await this.page.waitForTimeout(2000);
        await this.clickSubmit.click();
        await this.page.waitForTimeout(2000);
        console.log(await this.DuplicateSuccessMessgae.textContent());
    }

    /**Method to Validation of Question Archive */
    async ValidationQuestionArchive() {
        await this.SearchDraftQuestions.type('Approved')
        await this.page.waitForTimeout(3000)
        await this.clickQuestionId.click();
        await this.clickMoreOption.click();
        await this.clickonArchive.click();
        await this.page.waitForTimeout(2000);
        await this.clickYesDuplicate.click();
        console.log(await this.ArchiveSuccessMessage.textContent());
    }

    /**Method to Validation of Question Preview */
    async ValidationQuestionPreview() {
        await this.clickQuestionId.click();
        await this.clickMoreOption.click();
        await this.clickonPreview.click();
        await this.page.waitForTimeout(2000);
    }

    /**Method to validate MCQ Question */
    async validationOfMCQ() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.MCQQuestionsClick.click();
        await this.NextButtonClick.click();
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(1000);
        await expect(this.EmptyFieldErrorMessage).toBeVisible()
    }

    /**Method to validate VSAQ Question */
    async validationOfVSAQ() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ClickOnVSAQ.click();
        await this.NextButtonClick.click();
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(1000);
        await expect(this.EmptyFieldErrorMessage).toBeVisible()
    }


    /**Method to validate ISAWE Question */
    async validationOfISAWE() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ISAWEQuestionsClick.click();
        await this.NextButtonClick.click();
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(1000);
        await expect(this.EmptyFieldErrorMessage).toBeVisible()
    }

    /**Method to validate SAQ Question */
    async validationOfSAQ() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ClickOnSAQ.click();
        await this.NextButtonClick.click();
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(1000);
        await expect(this.EmptyFieldErrorMessage).toBeVisible()
        await this.page.waitForTimeout(1000);
    }

    /**Method to validate TypeB Question */
    async validationOfTypeB() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ClickOnTypeB.click();
        await this.NextButtonClick.click();
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(1000);
        await expect(this.EmptyFieldErrorMessage).toBeVisible()
    }

    /**Method to validate SJT Question */
    async validationOfTSJT() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ClickOnSJT.click();
        await this.NextButtonClick.click();
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await expect(this.EmptyFieldErrorMessage).toBeVisible()
    }

    /**Method to select a Bank */
    async selectBank() {
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
    }

    /**Method to validate MCQ fields */
    async enterRemainingMCQField() {
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample MCQ Questions' + Math.floor(Math.random() * 8999 + 1000));
        await this.page.waitForTimeout(2000);
        await this.QuestionAims.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionAims.type(testData.QuestionAims);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.OptionA);
        await this.page.waitForTimeout(2000);
        await this.ControlIndicator1.click();
        await this.page.waitForTimeout(2000);
        await this.OptionB.click();
        await this.OptionB.type(testData.OptionB);
        await this.page.waitForTimeout(2000);
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionC);
        await this.page.waitForTimeout(2000);
        await this.OptionD.click();
        await this.OptionD.type(testData.OptionD);
        await this.page.waitForTimeout(2000);
        await this.OptionE.click();
        await this.OptionE.type(testData.OptionE);
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
    }

    /**Method to validate VSAQ fields */
    async enterRemainingVSAQField() {
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample VSAQ Questions' + Math.floor(Math.random() * 8999 + 1000));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        await this.EnterMarks.click()
        await this.EnterMarks.clear()
        await this.EnterMarks.type('2')
        await this.page.waitForTimeout(2000);
        await this.EnterAnsKey.type(testData.AnswerKey)
        await this.OptionB.click();
        await this.OptionB.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        await this.EnterMarksInAns.click()
        await this.EnterMarksInAns.clear()
        await this.EnterMarksInAns.type("2")
        await this.ClickOnMarkinGuide.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
    }

    /**Method to validate ISAWE fields */
    async enterRemainingISAWEField() {
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Renewable Energy ISAWE' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.Question.click();
        await this.Question.type(testData.Scenario);
        await this.page.waitForTimeout(2000);
        await this.AddImage.click();
        await this.page.waitForTimeout(2000);
        await this.clickImage.click()
        await this.page.waitForTimeout(2000);
        await this.InsertImageClick.click();
        await this.page.waitForTimeout(2000);
        await this.Marks.click();
        await this.Marks.type('2');
        await this.QuestionsText.click();
        await this.QuestionsText.type(testData.ISAWEQuestion);
        await this.page.waitForTimeout(2000);
        await this.Answer.click();
        await this.Answer.type(testData.AnswerISAWE);
        await this.page.waitForTimeout(2000);
        await this.correctAnswerMarks.click();
        await this.correctAnswerMarks.type('2');
        await this.page.waitForTimeout(2000);
        await this.EnterAnsKey.type(testData.AnswerKeyISAWE)
        await this.page.waitForTimeout(2000);
        await this.OptionC.click();
        await this.OptionC.type(testData.AnswerKeyISAWE);
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
    }

    /**Method to validate SAQ fields */
    async enterRemainingSAQField() {
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample SAQ Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        await this.EnterMarks.click()
        await this.EnterMarks.clear()
        await this.EnterMarks.type('2')
        await this.page.waitForTimeout(2000);
        await this.EnterAnsKey.type(testData.AnswerKey)
        await this.OptionB.click();
        await this.OptionB.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        await this.EnterMarksInAns.click()
        await this.EnterMarksInAns.clear()
        await this.EnterMarksInAns.type("2")
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
    }

    /**Method to validate TypeB fields */
    async enterRemainingTypeBField() {
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample TypeB Questions' + Math.floor(Math.random() * 8999 + 1000));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.TypeBStatement);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        await this.AddImage.click();
        await this.page.waitForTimeout(2000);
        await this.clickImage.click()
        await this.page.waitForTimeout(2000);
        await this.InsertImageClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnOptionBRadioBtn.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
    }

    /**Method to validate SJT fields */
    async enterRemainingSJTField() {
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample SJT Questions' + Math.floor(Math.random() * 8999 + 1000));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.TypeBStatement);
        await this.page.waitForTimeout(2000);
        await this.AddImage.click();
        await this.page.waitForTimeout(2000);
        await this.clickImage.click()
        await this.page.waitForTimeout(2000);
        await this.InsertImageClick.click();
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        await this.ClickOnAppropriateRadioBtn.click();
        await this.page.waitForTimeout(2000);
        await this.EnterMarksInSJT.click();
        await this.EnterMarksInSJT.clear();
        await this.EnterMarksInSJT.type("2");
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnMarkinGuide.click()
    }

    /**Method to validate default workflow */
    async validateWorkFlow() {
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await expect(this.ValidatedefaultWorkFlow).toBeVisible()
    }

    /**Method to choose a question and create a type */
    async chooseQuetionType(QuestionType) {
        if (QuestionType == "TypeB") {
            await expect(this.CreateQuestion).toBeVisible();
            await this.CreateQuestion.click();
            await this.ClickOnTypeB.click();
            await this.NextButtonClick.click();
            await this.SelectQuestionBank.click();
            await this.SelectQuestionBank.type(testData.TestBank2);
            await this.SelectTestBank.click();
            await this.page.waitForTimeout(2000);
            await this.QuestionTopic.type('Sample TypeB Questions' + Math.floor(Math.random() * 8999 + 1000));
            await this.page.waitForTimeout(5000);
            await this.QuestionAims.click();
            await this.QuestionAims.type(testData.Question);
            await this.page.waitForTimeout(2000);
            await this.Question.click();
            await this.Question.type(testData.TypeBStatement);
            await this.page.waitForTimeout(2000);
            await this.OptionA.click();
            await this.OptionA.type(testData.Answer);
            await this.page.waitForTimeout(2000);
            await this.AddImage.click();
            await this.page.waitForTimeout(2000);
            await this.clickImage.click()
            await this.page.waitForTimeout(2000);
            await this.InsertImageClick.click();
            await this.page.waitForTimeout(2000);
            await this.ClickOnOptionBRadioBtn.click()
            await this.NextButtonClick.click();
            await this.page.waitForTimeout(2000);
            await this.ClickOnSaveDraft.click();
            await this.ClickOnEditQuestion.click();
            await this.ClickOnWorkFlow.click()
            await this.ClickOnApprove.click()
            await this.page.waitForTimeout(3000);
            console.log(await this.ValidateSuccessfulPopMessage.textContent());
        }
        else if (QuestionType == "SJT") {
            await expect(this.CreateQuestion).toBeVisible();
            await this.CreateQuestion.click();
            await this.ClickOnSJT.click();
            await this.NextButtonClick.click();
            await this.SelectQuestionBank.click();
            await this.SelectQuestionBank.type(testData.TestBank2);
            await this.SelectTestBank.click();
            await this.page.waitForTimeout(2000);
            await this.QuestionTopic.type('Sample SJT Questions' + Math.floor(Math.random() * 8999 + 1000));
            await this.page.waitForTimeout(2000);
            await this.QuestionAims.click();
            await this.QuestionAims.type(testData.Question);
            await this.page.waitForTimeout(2000);
            await this.Question.click();
            await this.Question.type(testData.TypeBStatement);
            await this.page.waitForTimeout(2000);
            await this.OptionA.click();
            await this.page.waitForTimeout(2000);
            await this.AddImage.click();
            await this.page.waitForTimeout(2000);
            await this.clickImage.click()
            await this.page.waitForTimeout(2000);
            await this.InsertImageClick.click();
            await this.page.waitForTimeout(2000);
            await this.OptionA.type(testData.Answer);
            await this.page.waitForTimeout(2000);
            await this.ClickOnAppropriateRadioBtn.click();
            await this.page.waitForTimeout(2000);
            await this.EnterMarksInSJT.click();
            await this.EnterMarksInSJT.clear();
            await this.EnterMarksInSJT.type("2");
            await this.NextButtonClick.click();
            await this.page.waitForTimeout(2000);
            await this.ClickOnSaveDraft.click();
            await this.ClickOnEditQuestion.click();
            await this.ClickOnWorkFlow.click()
            await this.ClickOnApprove.click()
            await this.page.waitForTimeout(3000);
            console.log(await this.ValidateSuccessfulPopMessage.textContent());
        }
        else if (QuestionType == "TypeX") {
            await expect(this.CreateQuestion).toBeVisible();
            await this.CreateQuestion.click();
            await this.ClickOnTypeX.click();
            await this.NextButtonClick.click();
            await this.SelectQuestionBank.click();
            await this.SelectQuestionBank.type(testData.TestBank2);
            await this.SelectTestBank.click();
            await this.page.waitForTimeout(2000);
            await this.QuestionTopic.type('Sample TypeX Questions' + Math.floor(Math.random() * 899 + 100));
            await this.page.waitForTimeout(2000);
            await this.QuestionAims.click();
            await this.QuestionAims.type(testData.Question);
            await this.page.waitForTimeout(2000);
            await this.Question.click();
            await this.Question.type(testData.Subquestion);
            await this.page.waitForTimeout(2000);
            await this.OptionA.click();
            await this.OptionA.type(testData.OptionA);
            await this.ClickOnRadioButton1.click();
            await this.page.waitForTimeout(2000);
            await this.OptionB.click();
            await this.OptionB.type(testData.OptionB);
            await this.ClickOnRadioButton2.click();
            await this.page.waitForTimeout(2000);
            await this.OptionC.click();
            await this.OptionC.type(testData.OptionC);
            await this.ClickOnRadioButton3.click();
            await this.page.waitForTimeout(2000);
            await this.OptionD.click();
            await this.OptionD.type(testData.OptionD);
            await this.ClickOnRadioButton4.click();
            await this.page.waitForTimeout(2000);
            await this.OptionE.click();
            await this.OptionE.type(testData.OptionE);
            await this.ClickOnRadioButton5.click();
            await this.page.waitForTimeout(2000);
            await this.NextButtonClick.click();
            await this.page.waitForTimeout(2000);
            await this.ClickOnSaveDraft.click();
            await this.ClickOnEditQuestion.click();
            await this.ClickOnWorkFlow.click()
            await this.ClickOnApprove.click()
            await this.page.waitForTimeout(3000);
            console.log(await this.ValidateSuccessfulPopMessage.textContent());
        }
        else if (QuestionType == "SAQ") {
            await expect(this.CreateQuestion).toBeVisible();
            await this.CreateQuestion.click();
            await this.ClickOnSAQ.click();
            await this.NextButtonClick.click();
            await this.SelectQuestionBank.click();
            await this.SelectQuestionBank.type(testData.TestBank2);
            await this.SelectTestBank.click();
            await this.page.waitForTimeout(2000);
            await this.QuestionTopic.type('Sample SAQ Questions' + Math.floor(Math.random() * 899 + 100));
            await this.page.waitForTimeout(2000);
            await this.QuestionAims.click();
            await this.QuestionAims.type(testData.Question);
            await this.page.waitForTimeout(2000);
            await this.Question.click();
            await this.Question.type(testData.Subquestion);
            await this.page.waitForTimeout(2000);
            await this.OptionA.click();
            await this.OptionA.type(testData.Answer);
            await this.page.waitForTimeout(2000);
            await this.EnterMarks.click()
            await this.EnterMarks.clear()
            await this.EnterMarks.type('2')
            await this.page.waitForTimeout(2000);
            await this.EnterAnsKey.type(testData.AnswerKey)
            await this.OptionB.click();
            await this.OptionB.type(testData.Answer);
            await this.page.waitForTimeout(2000);
            await this.EnterMarksInAns.click()
            await this.EnterMarksInAns.clear()
            await this.EnterMarksInAns.type("2")
            await this.NextButtonClick.click();
            await this.page.waitForTimeout(2000);
            await this.ClickOnSaveDraft.click();
            await this.ClickOnEditQuestion.click();
            await this.ClickOnWorkFlow.click()
            await this.ClickOnApprove.click()
            await this.page.waitForTimeout(3000);
            console.log(await this.ValidateSuccessfulPopMessage.textContent());
        }
        else if (QuestionType == "ISAWE") {
            await expect(this.CreateQuestion).toBeVisible();
            await this.CreateQuestion.click();
            await this.ISAWEQuestionsClick.click();
            await this.NextButtonClick.click();
            await this.SelectQuestionBank.click();
            await this.SelectQuestionBank.type(testData.TestBank2);
            await this.SelectTestBank.click();
            await this.page.waitForTimeout(2000);
            await this.QuestionTopic.type('Renewable Energy ISAWE' + Math.floor(Math.random() * 899 + 100));
            await this.page.waitForTimeout(2000);
            await this.Question.click();
            await this.Question.type(testData.Scenario);
            await this.page.waitForTimeout(2000);
            await this.AddImage.click();
            await this.page.waitForTimeout(2000);
            await this.clickImage.click()
            await this.page.waitForTimeout(2000);
            await this.InsertImageClick.click();
            await this.page.waitForTimeout(2000);
            await this.Marks.click();
            await this.Marks.type('2');
            await this.QuestionsText.click();
            await this.QuestionsText.type(testData.ISAWEQuestion);
            await this.page.waitForTimeout(2000);
            await this.Answer.click();
            await this.Answer.type(testData.AnswerISAWE);
            await this.page.waitForTimeout(2000);
            await this.correctAnswerMarks.click();
            await this.correctAnswerMarks.type('2');
            await this.page.waitForTimeout(2000);
            await this.EnterAnsKey.type(testData.AnswerKeyISAWE)
            await this.page.waitForTimeout(2000);
            await this.OptionC.click();
            await this.OptionC.type(testData.AnswerKeyISAWE);
            await this.page.waitForTimeout(2000);
            await this.MarkMarks.click();
            await this.MarkMarks.type('2');
            await this.page.waitForTimeout(2000);
            await this.NextButtonClick.click();
            await expect(this.QuestionSuccessMessage).toHaveText('Question created successfully');
            await this.page.waitForTimeout(2000);
            await this.ClickOnSaveDraft.click();
            await this.ClickOnEditQuestion.click();
            await this.ClickOnWorkFlow.click()
            await this.ClickOnApprove.click()
            await this.page.waitForTimeout(3000);
            console.log(await this.ValidateSuccessfulPopMessage.textContent());
            await expect(this.QuestionSuccessMessage).toHaveText('Status has been updated successfully.');
        }
        else if (QuestionType == "VSAQ") {
            await expect(this.CreateQuestion).toBeVisible();
            await this.CreateQuestion.click();
            await this.ClickOnVSAQ.click();
            await this.NextButtonClick.click();
            await this.SelectQuestionBank.click();
            await this.SelectQuestionBank.type(testData.TestBank2);
            await this.SelectTestBank.click();
            await this.page.waitForTimeout(2000);
            await this.QuestionTopic.type('Sample VSAQ Questions' + Math.floor(Math.random() * 8999 + 1000));
            await this.page.waitForTimeout(2000);
            await this.QuestionAims.click();
            await this.QuestionAims.type(testData.Question);
            await this.page.waitForTimeout(2000);
            await this.Question.click();
            await this.Question.type(testData.Subquestion);
            await this.page.waitForTimeout(2000);
            await this.OptionA.click();
            await this.OptionA.type(testData.Answer);
            await this.page.waitForTimeout(2000);
            await this.EnterMarks.click()
            await this.EnterMarks.clear()
            await this.EnterMarks.type('2')
            await this.page.waitForTimeout(2000);
            // await this.AddImage.click();
            // await this.ClickOnUploadImageBtn.click()
            // await this.page.waitForTimeout(5000);
            // await this.ClickOnInsertImageFile.setInputFiles('lib/Images/kohli.jpeg');
            // await this.page.waitForTimeout(2000);
            await this.EnterAnsKey.type(testData.AnswerKey)
            await this.OptionB.click();
            await this.OptionB.type(testData.Answer);
            await this.page.waitForTimeout(2000);
            await this.EnterMarksInAns.click()
            await this.EnterMarksInAns.clear()
            await this.EnterMarksInAns.type("2")
            await this.NextButtonClick.click();
            await this.page.waitForTimeout(2000);
            await this.ClickOnSaveDraft.click();
            await this.ClickOnEditQuestion.click();
            await this.ClickOnWorkFlow.click()
            await this.ClickOnApprove.click()
            await this.page.waitForTimeout(3000);
            console.log(await this.ValidateSuccessfulPopMessage.textContent());
        }

        else if (QuestionType == "MCQ") {
            await expect(this.CreateQuestion).toBeVisible();
            await this.CreateQuestion.click();
            await this.MCQQuestionsClick.click();
            await this.NextButtonClick.click();
            await this.SelectQuestionBank.click();
            await this.SelectQuestionBank.type(testData.TestBank2);
            await this.SelectTestBank.click();
            await this.page.waitForTimeout(2000);
            await this.QuestionTopic.type('Sample MCQ Questions' + Math.floor(Math.random() * 8999 + 1000));
            await this.page.waitForTimeout(2000);
            await this.QuestionAims.click();
            await this.QuestionAims.type(testData.QuestionAims);
            await this.page.waitForTimeout(2000);
            await this.Question.click();
            await this.Question.type(testData.Question);
            await this.page.waitForTimeout(2000);
            await this.OptionA.click();
            await this.OptionA.type(testData.OptionA);
            await this.page.waitForTimeout(2000);
            await this.ControlIndicator1.click();
            await this.page.waitForTimeout(2000);
            await this.OptionB.click();
            await this.OptionB.type(testData.OptionB);
            await this.page.waitForTimeout(2000);
            await this.OptionC.click();
            await this.OptionC.type(testData.OptionC);
            await this.page.waitForTimeout(2000);
            await this.OptionD.click();
            await this.OptionD.type(testData.OptionD);
            await this.page.waitForTimeout(2000);
            await this.OptionE.click();
            await this.OptionE.type(testData.OptionE);
            await this.page.waitForTimeout(2000);
            await this.NextButtonClick.click();
            await this.page.waitForTimeout(2000);
            await this.ClickOnSaveDraft.click();
            await this.ClickOnEditQuestion.click();
            await this.ClickOnWorkFlow.click()
            await this.ClickOnApprove.click()
            await this.page.waitForTimeout(3000);
            console.log(await this.ValidateSuccessfulPopMessage.textContent());
        }
    }


    /**Method for Exam Tab Navigation */
    async examTabNavigation(): Promise<void> {
        await this.EXAMSMENU.click();
    }

    /*Create a Exam*/
    async CopyExistingExams() {

        let currentDate = new Date();
        let datecurrent = currentDate.getDate();
        console.log(datecurrent);
        let pm = currentDate.getHours() >= 12;
        let hour12 = currentDate.getHours() % 12;
        if (!hour12)
            hour12 += 12;
        let minute = currentDate.getMinutes();
        console.log(`${hour12}:${minute} ${pm ? 'pm' : 'am'}`);

        let StartBookingMin = currentDate.getMinutes() + 2;
        let EndBookingMin = currentDate.getMinutes() + 3;
        let StartExamMin = currentDate.getMinutes() + 4;
        let EndExamMin = currentDate.getMinutes() + 15;

        await this.EXAMSMENU.click();
        await expect(this.CREATEEXAMS).toBeVisible();
        await this.CREATEEXAMS.click();
        await this.copyExistingExam.click();
        await this.page.waitForTimeout(3000);
        await this.ClickOnQuestionID.click();
        await this.page.waitForTimeout(3000);
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(3000);
        await this.DuplicateButtonClick.click();
        await this.page.waitForTimeout(3000);
        await this.clickYesDuplicate.click();
        await this.page.waitForTimeout(3000);
        await this.clickSubmit.click();
        await this.page.waitForTimeout(3000);

        await this.BookingStartCalender.click();
        await this.BookingStartDate.click();
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        if (StartBookingMin >= 60) {
            let SBM = StartBookingMin.toString();
            SBM = "02";
            await this.BooingStartMins.type(SBM);
            //hrs+1
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            let BSH = hour12 + 1;
            if (BSH == 12) {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSessions.check();
            }
            else if (BSH >= 13) {
                BSH = 1;
                await this.BookingStartHrs.type(BSH.toString());
            }
            else {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSession.check();
            }
        }
        else {
            await this.BooingStartMins.type(StartBookingMin.toString());
            //hrs
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            await this.BookingStartHrs.type(hour12.toString());
            await this.ChooseBookingStartSession.check();
        }
        await this.BookingOK.click();

        await this.BookingEndCalender.click();
        await this.BookingEndDate.click();
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        if (EndBookingMin >= 60) {
            let EBM = EndBookingMin.toString();
            EBM = "03";
            await this.BooingStartMins.type(EBM);
            //Hrs+1
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            let BSH = hour12 + 1;
            if (BSH == 12) {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSessions.check();
            }
            else if (BSH >= 13) {
                BSH = 1;
                await this.BookingStartHrs.type(BSH.toString());
            }
            else {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSession.check();
            }
        }
        else {
            await this.BooingStartMins.type(EndBookingMin.toString());
            //hrs
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            await this.BookingStartHrs.type(hour12.toString());
            await this.ChooseBookingStartSession.check();
        }

        await this.BookingOK.click();
        await this.ExamStartCalender.click();
        await this.ExamStartDate.click();
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        if (StartExamMin >= 60) {
            let SEM = StartExamMin.toString();
            SEM = "04"
            await this.BooingStartMins.type(SEM);
            //hrs+1
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            let BSH = hour12 + 1;
            if (BSH == 12) {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSessions.check();

            }
            else if (BSH >= 13) {
                BSH = 1;
                await this.BookingStartHrs.type(BSH.toString());
            }
            else {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSession.check();
            }
        }
        else {
            await this.BooingStartMins.type(StartExamMin.toString());
            //hrs
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            await this.BookingStartHrs.type(hour12.toString());
            //BSET = await this.BookingStartHrs.type(hour12.toString());
            console.log(hour12.toString());
            console.log(StartExamMin.toString())
            await this.ChooseBookingStartSession.check();
        }
        await this.BookingOK.click();
        await this.ExamEndCalender.click();

        if (EndExamDate >= "30") {
            console.log("Exam end date:" + EndExamDate);
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else if (EndExamDate >= "31") {
            console.log("Exam end date:" + EndExamDate);
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else {
            console.log("Exam end date:" + EndExamDate);
            await this.ExamEndDate.click();
        }
        await this.BookingStartHrs.click();
        await this.BookingStartHrs.clear();
        await this.BookingStartHrs.type(hour12.toString());
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        if (EndExamMin >= 60) {
            EndExamMin = 1;
            await this.BooingStartMins.type(EndExamMin.toString());
        }
        else {
            await this.BooingStartMins.type(EndExamMin.toString());
        }
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(5000);
        await this.QuestionsButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.settingsButtonClick.click();
        console.log("aaa " + hour12.toString());
        console.log("bbb " + StartExamMin.toString())
    }

    /**Method to Validate Exam Duplicate*/
    async ValidationOfExamDuplicate() {
        await this.EXAMSMENU.click();
        await this.page.waitForTimeout(3000);
        await this.ClickOnQuestionID.click();
        await this.page.waitForTimeout(3000);
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(3000);
        await this.DuplicateButtonClick.click();
        await this.page.waitForTimeout(3000);
        await this.clickYesDuplicate.click();
        await this.page.waitForTimeout(3000);
        await this.ClickOnSubmitBtn.click();
        await this.page.waitForTimeout(3000);
        await expect(this.duplicateSuccessMessage).toHaveText("Exam duplicated successfully");
    }

    /**Method to Validate Exam Preview*/
    async ValidationOfExamPreview() {
        await this.EXAMSMENU.click();
        await this.page.waitForTimeout(3000);
        await this.ClickOnQuestionID.click();
        await this.page.waitForTimeout(3000);
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(3000);
        await this.ClickOnPreviewPDF.click()
        await this.page.waitForTimeout(3000);
        await expect(this.ValidationOfPreviewPDFTitle).toBeVisible();

    }

    /**Method to Validate Exam Preview WEB*/
    async ValidationOfExamPreviewWEB() {
        await this.EXAMSMENU.click();
        await this.page.waitForTimeout(3000);
        await this.ClickOnQuestionID.click();
        await this.page.waitForTimeout(3000);
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(3000);
        await this.ClickOnPreviewWeb.click();
        await this.page.waitForTimeout(8000);
        //await expect(this.ValidationOfPreviewPDFTitle).toBeVisible();

    }

    /**Method to Validate Exam Print*/
    async ValidationOfExamPrint() {
        await this.EXAMSMENU.click();
        await this.page.waitForTimeout(3000);
        await this.ClickOnQuestionID.click();
        await this.page.waitForTimeout(3000);
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(3000);
        await this.PrintButtonClick.click();
        await this.page.waitForTimeout(5000);
    }

    /**Method to Validate Exam Delete*/
    async ValidationOfExamDelete() {
        await this.EXAMSMENU.click();
        await this.page.waitForTimeout(3000);
        await this.SearchDraftExams.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(3000);
        await this.clickDelete.click();
        await this.page.waitForTimeout(3000);
        await this.clickDeleteYes.click();
        await this.page.waitForTimeout(3000);
        await expect(this.DeleteExamSuccessMessage).toHaveText("Exam deleted successfully.");
    }

    /**Method to Validation of Exam Archive  */
    async ValidationOfExamArchive() {
        await this.EXAMSMENU.click();
        await this.page.waitForTimeout(3000);
        await this.SearchDraftExams.type('Approved')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(3000);
        await this.clickonArchive.click();
        await this.page.waitForTimeout(3000);
        await this.clickArchiveYes.click();
        await this.page.waitForTimeout(3000);
        await expect(this.ArchiveExamSuccessMessage).toHaveText("Exam archived successfully.");
    }

    /**Method to Validation of Exam Export  */
    async ValidationOfExamExport() {
        await this.EXAMSMENU.click();
        await this.page.waitForTimeout(3000);
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(3000);
        await this.clickonExport.click();
        await this.page.waitForTimeout(3000);
        await this.selectFileFormat.click();
        await this.page.waitForTimeout(3000);
        await this.selectZip.click();
        await this.page.waitForTimeout(3000);
        await this.DownloadButtonclick.click();
        await this.page.waitForTimeout(3000);
    }

    /**Method to Validation of Exam Checkout  */
    async ValidationOfExamCheckout() {
        await this.EXAMSMENU.click();
        await this.page.waitForTimeout(3000);
        await this.SearchDraftExams.type('Approved')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(3000);
        await this.clickOnCheckout.click();
        await this.page.waitForTimeout(3000);
        await this.clickYes.click();
        await this.page.waitForTimeout(3000);
    }

    /**Method to Validation of Exam New Version  */
    async ValidationOfExamSaveNewVersion() {

        let currentDate = new Date();
        let datecurrent = currentDate.getDate();
        console.log(datecurrent);
        let pm = currentDate.getHours() >= 12;
        let hour12 = currentDate.getHours() % 12;
        if (!hour12)
            hour12 += 12;
        let minute = currentDate.getMinutes();
        console.log(`${hour12}:${minute} ${pm ? 'pm' : 'am'}`);

        let StartBookingMin = currentDate.getMinutes() + 2;
        let EndBookingMin = currentDate.getMinutes() + 3;
        let StartExamMin = currentDate.getMinutes() + 4;
        let EndExamMin = currentDate.getMinutes() + 15;

        await this.BookingStartCalender.click();
        await this.BookingStartDate.click();
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        if (StartBookingMin >= 60) {
            let SBM = StartBookingMin.toString();
            SBM = "02";
            await this.BooingStartMins.type(SBM);
            //hrs+1
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            let BSH = hour12 + 1;
            if (BSH == 12) {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSessions.check();
            }
            else if (BSH >= 13) {
                BSH = 1;
                await this.BookingStartHrs.type(BSH.toString());
            }
            else {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSession.check();
            }
        }
        else {
            await this.BooingStartMins.type(StartBookingMin.toString());
            //hrs
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            await this.BookingStartHrs.type(hour12.toString());
            await this.ChooseBookingStartSession.check();
        }
        await this.BookingOK.click();

        await this.BookingEndCalender.click();
        await this.BookingEndDate.click();
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        if (EndBookingMin >= 60) {
            let EBM = EndBookingMin.toString();
            EBM = "03";
            await this.BooingStartMins.type(EBM);
            //Hrs+1
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            let BSH = hour12 + 1;
            if (BSH == 12) {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSessions.check();
            }
            else if (BSH >= 13) {
                BSH = 1;
                await this.BookingStartHrs.type(BSH.toString());
            }
            else {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSession.check();
            }
        }
        else {
            await this.BooingStartMins.type(EndBookingMin.toString());
            //hrs
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            await this.BookingStartHrs.type(hour12.toString());
            await this.ChooseBookingStartSession.check();
        }

        await this.BookingOK.click();
        await this.ExamStartCalender.click();
        await this.ExamStartDate.click();
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        if (StartExamMin >= 60) {
            let SEM = StartExamMin.toString();
            SEM = "04"
            await this.BooingStartMins.type(SEM);
            //hrs+1
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            let BSH = hour12 + 1;
            if (BSH == 12) {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSessions.check();

            }
            else if (BSH >= 13) {
                BSH = 1;
                await this.BookingStartHrs.type(BSH.toString());
            }
            else {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSession.check();
            }
        }
        else {
            await this.BooingStartMins.type(StartExamMin.toString());
            //hrs
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            await this.BookingStartHrs.type(hour12.toString());
            //BSET = await this.BookingStartHrs.type(hour12.toString());
            console.log(hour12.toString());
            console.log(StartExamMin.toString())
            await this.ChooseBookingStartSession.check();
        }
        await this.BookingOK.click();
        await this.ExamEndCalender.click();

        if (EndExamDate >= "30") {
            console.log("Exam end date:" + EndExamDate);
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else if (EndExamDate >= "31") {
            console.log("Exam end date:" + EndExamDate);
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else {
            console.log("Exam end date:" + EndExamDate);
            await this.ExamEndDate.click();
        }
        await this.BookingStartHrs.click();
        await this.BookingStartHrs.clear();
        await this.BookingStartHrs.type(hour12.toString());
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        if (EndExamMin >= 60) {
            EndExamMin = 1;
            await this.BooingStartMins.type(EndExamMin.toString());
        }
        else {
            await this.BooingStartMins.type(EndExamMin.toString());
        }
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(2000);
        await this.dropArrowclick.click();
        await this.page.waitForTimeout(2000);
        await this.saveAsNewVersion.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnComment.click();
        await this.ClickOnComment.type("New Version");
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveBtn2.click();
        await this.page.waitForTimeout(2000);
    }

    /**Method to Validation of Compare Version  */
    async ValidationOfCompareVersion() {
        await this.EXAMSMENU.click();
        await this.page.waitForTimeout(3000);
        await this.SearchDraftExams.type('Approved')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)
        await this.clickOnVersionHistory.click();
        await this.page.waitForTimeout(2000)
        await this.moreOptionClick2.click();
        await this.page.waitForTimeout(2000)
        await this.clickOnClose.click();
        await this.page.waitForTimeout(2000)
    }

    /**Method to Validate Exam Approval Workflow*/
    async validateExamApprovalWorkflow() {
        await this.EXAMSMENU.click();
        await this.page.waitForTimeout(3000);
        await this.SearchDraftExams.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)
        await this.ClickOnWorkFlow.click();
        await this.page.waitForTimeout(2000)
        await this.workflowDropdown.click();
        await this.page.waitForTimeout(2000)
        await this.approvalWorkflowclick.click();
        await this.page.waitForTimeout(2000)
        await this.selectReviwer.click();
        await this.page.waitForTimeout(2000)
        await this.selectReviwer.type(testData.ReviewerQA);
        await this.checkReviwerQA.click();
        await this.page.waitForTimeout(3000)
        await this.clickOnStatusTitle.click();
        await this.page.waitForTimeout(2000)
        await this.selectApprover.click();
        await this.page.waitForTimeout(2000)
        await this.selectApprover.type(testData.ApproverQA);
        await this.approverQA.click();
        await this.page.waitForTimeout(2000)
        await this.submitandreviewclick.click();
        await this.page.waitForTimeout(5000)
        await expect(this.workflowsuccessmessage).toHaveText('Workflow has been created successfuly.');
        await this.page.waitForTimeout(5000)
        await this.saveButtonClick.click();
    }


    /**Method to create MCQ Questions */
    async createMCQQuestionswithoutApprove(): Promise<void> {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.MCQQuestionsClick.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample MCQ Questions' + Math.floor(Math.random() * 8999 + 1000));
        await this.page.waitForTimeout(5000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.QuestionAims);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.OptionA);
        await this.page.waitForTimeout(2000);
        await this.ControlIndicator1.click();
        await this.page.waitForTimeout(2000);
        await this.OptionB.click();
        await this.OptionB.type(testData.OptionB);
        await this.page.waitForTimeout(2000);
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionC);
        await this.page.waitForTimeout(2000);
        await this.OptionD.click();
        await this.OptionD.type(testData.OptionD);
        await this.page.waitForTimeout(2000);
        await this.OptionE.click();
        await this.OptionE.type(testData.OptionE);
        await this.page.waitForTimeout(2000);
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.page.waitForTimeout(3000);
    }

    /*
    *Method to Validate Exam Approval Workflow
    */
    async validateQunApprovalWorkflow() {
        await this.page.waitForTimeout(2000)
        await this.closeIcon.click()
        await this.workflowDropdown.click();
        await this.page.waitForTimeout(2000)
        await this.approvalWorkflowclick.click();
        await this.page.waitForTimeout(2000)
        await this.selectReviwer.click();
        await this.page.waitForTimeout(2000)
        await this.checkReviwerQA.click();
        await this.page.waitForTimeout(2000)
        await this.approverclick.click();
        await this.page.waitForTimeout(1000)
        await this.selectApprover.click();
        await this.page.waitForTimeout(2000)
        await this.approverQA.click();
        await this.page.waitForTimeout(2000)
        await this.clickOnApprovalButton.click()
        await this.page.waitForTimeout(5000)
        await expect(this.workflowsuccessmessage).toHaveText('Status has been updated successfully.');
        await this.page.waitForTimeout(2000)
        await this.saveButtonClick.click();
    }

    /**
     * Method to approve question as Reviewer
     */
    async clickOnIDAndclickOnApproval() {
        await this.clickonQuestion.click()
        await this.page.waitForTimeout(5000);
        await this.ClickOnWorkFlow.click()
        await this.page.waitForTimeout(3000);
        await this.clickOnApprovalButton.click()
        await this.page.waitForTimeout(7000);
        await expect(this.workflowsuccessmessage).toHaveText('Status has been updated successfuly');
        await this.page.waitForTimeout(5000);
    }

    async reviewToReviewer() {
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)

        await this.ClickOnWorkFlow.click();
        await this.page.waitForTimeout(3000);

        await this.workFlowFieldDropDown.click();
        await this.page.waitForTimeout(2000);
        await this.chooseApproveWorkFlow.click();
        await this.page.waitForTimeout(3000);
        await this.reviewerDropDown.click();
        await this.page.waitForTimeout(2000);
        await this.chooseReviewer.click();
        await this.page.waitForTimeout(2000);
        await this.morebtnOnWorkFlow.click();
        await this.page.waitForTimeout(2000);
        await this.approverDropDown.click();
        await this.page.waitForTimeout(2000);
        await this.chooseApprover.click();
        await this.page.waitForTimeout(2000);
        await this.submitForReviewBtn.click();
        await this.page.waitForTimeout(5000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
        await this.page.waitForTimeout(5000);
        await this.MenuIconClick.click();
        await this.logoutbuttonClick.click();
        await this.page.waitForTimeout(5000);

    }

    async ReviewerWorkflow() {
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)

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
     * Method for marker's report download
     */
    async markersReportDownload(file) {
        await this.moreOptionDropDown.click();
        await this.page.waitForTimeout(5000);
        await this.markersReport.click();
        await this.page.waitForTimeout(5000);
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/' + file;
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Manual Marking');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            // await this.SearchUsers.click()
            // await this.SearchUsers.clear()
            // await this.SearchUsers.type(ws.getRow(i).getCell(1).value);
        })

    }

}