import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { parseForESLint } from '@typescript-eslint/parser';


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
let Title: string;
let fetchBlueprintId: string;

export class EluminaBlueprintsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly AUTHOR: Locator;
    readonly Blueprint: Locator;
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
    readonly workflowSuccessMessage: Locator;
    readonly editBlueprint: Locator;
    readonly cartButtonClick: Locator;
    readonly addToCart: Locator;
    readonly saveButton: Locator;
    readonly saveSuccessMessage: Locator;
    readonly workflowclick: Locator;
    readonly approveButtonClick: Locator;
    readonly SearchDraftQuestions: Locator;
    readonly ClickOnQuestionID: Locator;
    readonly ClickOnAddCartBtn: Locator;
    readonly ClickOnAddCartBtn2: Locator;
    readonly ClickOnToCart: Locator;
    readonly ClickOnSaveBtn: Locator;
    readonly ClickOnMoreIcon: Locator;
    readonly EnterCartItem: Locator;
    readonly EnterNumberReq: Locator;
    readonly ClickOnAddFilter: Locator;
    readonly SaveButtonClick: Locator;
    readonly ClickOnVersionHistory: Locator;
    readonly ClickOnWorkFlow: Locator;
    readonly ClickOnApprove: Locator;
    readonly ValidateSuccessfulPopMessage: Locator;
    readonly removeCartButtonClick: Locator;
    readonly cancelButtonClick: Locator;
    readonly moreOptionClick: Locator;
    readonly convertToExam: Locator;

    readonly ClickOnCancelButton: Locator;
    readonly previewButtonClick: Locator;
    readonly previewCloseButtonClick: Locator;
    readonly clickFirstBluePrint: Locator;
    readonly DuplicateButtonClick: Locator;
    readonly DeleteButtonClick: Locator;
    readonly yesButtonClick: Locator;
    readonly submitButtonClick: Locator;
    readonly yesButtonClicks: Locator;
    readonly saveDropdownButton: Locator;
    readonly saveAsNewVersion: Locator;
    readonly textAreaType: Locator;
    readonly saveClick: Locator;
    readonly saveNewVersionSuccessMessage: Locator;

    readonly saveButtonOnModify: Locator;
    readonly saveDraftOnWorkFlow: Locator;
    readonly editNumRequired: Locator;
    readonly removeFromCart: Locator;
    readonly clickOnRemoveCartBtn: Locator;
    readonly saveBtnOnRemoveCart: Locator;
    readonly cancelBtnOnRemoveCart: Locator;
    readonly cartItemIsZero: Locator;
    readonly saveDraftText: Locator;



    readonly EXAMSMENU: Locator;
    readonly CREATEEXAMS: Locator;
    readonly STARTFROMSCRATCH: Locator;
    readonly SELECTBANK: Locator;
    readonly TESTBANK: Locator;
    readonly EXAMNAME: Locator;
    readonly EXAMCODE: Locator;
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
    readonly ClickOnExamVenue: Locator;
    readonly ChooseExamVenue: Locator;
    readonly ClickOnAdd: Locator;
    readonly EnterNoOfCandidates: Locator;
    readonly ClickOnNextBtn: Locator;
    readonly VerifyExam_details: Locator;
    readonly VerifyChoose_Question: Locator;
    readonly VerifyChoose_Workflow: Locator;
    readonly VerifyChoose_Confirmation: Locator;
    readonly CliCKOnCreateSection: Locator;
    readonly ClickOnCreateExamSection: Locator;
    readonly ClickOnCreateSurveySection: Locator;
    readonly ClickOnAddSurveyQuestion: Locator;
    readonly EnterSectionName: Locator;
    readonly DescriptionMessage: Locator;
    readonly SelectTime: Locator;
    readonly ClickOnSave: Locator;
    readonly ChooseBookingStartSessions: Locator;
    readonly nextButton: Locator;
    readonly Oneclick: Locator;
    readonly checkBoxClick: Locator;

    readonly workFlowFieldDropDown: Locator;
    readonly chooseApproveWorkFlow: Locator;
    readonly reviewerDropDown: Locator;
    readonly chooseReviewer: Locator;
    readonly approverDropDown: Locator;
    readonly chooseApprover: Locator;
    readonly submitForReviewBtn: Locator;
    readonly morebtnOnWorkFlow: Locator;

    readonly clickonQuestion: Locator;
    readonly ClickOnCancelBtn: Locator;
    readonly confirmationPopUp: Locator;
    readonly ClickOnNoBtn: Locator;
    readonly ClickOnBackArrowBtn: Locator;
    readonly btnAutofill: Locator;
    readonly btnRemoveFromCart: Locator;
    readonly btnCancel: Locator;
    readonly qutnsRemovedMsgPopup: Locator;
    readonly clickOnMoreOption: Locator;
    readonly clickOnArchive: Locator;
    readonly clickOnArchiveYes: Locator;
    readonly verifyArchivePopup: Locator;
    readonly fetchTitle: Locator;
    readonly searchBlueprint: Locator;
    readonly clickOnSelectBtn: Locator;
    readonly Choosehrs: Locator;
    readonly ClickOnAddQuestion: Locator;
    readonly ClickOnAddQuestion2: Locator;
    readonly ClickOnAddQuestion3: Locator;
    readonly ClickOnSearchQuestion: Locator;
    readonly ClickOnAddBtn: Locator;
    readonly ClickOnSubmitAndApproveBtn: Locator;
    readonly clickOnViewBtn: Locator;
    readonly fetchblueprintTitle: Locator;
    readonly clickOnLeftArrow: Locator;
    readonly previewPageTitle: Locator;
    readonly clickOnComparisionBtn: Locator;
    readonly comparisionPageTitle: Locator;
    readonly copyExisting: Locator;
    readonly copyTemplate: Locator;
    readonly examPageTitle: Locator;
    readonly ExamTools: Locator;
    readonly SelectNotepad: Locator;
    readonly SelectCalculator: Locator;
    readonly SelectHighlighter: Locator;
    readonly EnterInvigilatorPswd: Locator;
    readonly clickOnCloseIcon: Locator;
    readonly clickOnMinusicon: Locator;
    readonly clickOnPlusIcon: Locator;
    readonly selectitem: Locator;
    readonly enterId: Locator;
    readonly clickTikIcon: Locator;
    readonly ClickOnCreateContentSection: Locator;
    readonly selectMinutes: Locator;
    readonly ClickonCreateContentPage: Locator;
    readonly ClickOnAddContent: Locator;
    readonly enterContentTitle: Locator;
    readonly ClickOnContentLayout: Locator;
    readonly ClickOnTermAndCondition: Locator;
    readonly searchFieldOnExam: Locator;
    readonly clickOnQuestions: Locator;
    readonly clickOnSaveButton: Locator;
    readonly DeliveryMenu: Locator;
    readonly clickOnLiveDashboard: Locator;
    readonly viewTheExamSession: Locator;
    readonly viewTheLocation: Locator;
    readonly viewTheVenue: Locator;
    readonly clickOnLocation: Locator;
    readonly selectLocation: Locator;
    readonly clickOnVenue: Locator;
    readonly selectVenue: Locator;
    readonly clickOnSubmit: Locator;
    readonly candTotalCount: Locator;
    readonly clickOnWorkflowInDelivery: Locator;
    readonly EndBoookingHRS: Locator;
    readonly clickOnGradeBook: Locator;
    readonly searchInGradeBook: Locator;
    readonly verifyViewGradebook: Locator;
    readonly clickOnUpIconColumn: Locator;
    readonly clickOnDownIconColumn: Locator;
    readonly viewRowsCount: Locator;
    readonly viewPageNo: Locator;
    readonly clickOnPassSection: Locator;
    readonly clickOnSelectYes: Locator;
    readonly enterPassPercentage: Locator;
    readonly MenuIconClick: Locator;
    readonly logoutbuttonClick: Locator;
    readonly clickOnSaveForDfatExam: Locator;
    readonly clickOnEditQuestion: Locator;

    readonly closeIcon: Locator;
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
    readonly submitAndReviewBtn: Locator;
    readonly selectExamTemplate: Locator;
    readonly clickOnEdit: Locator;
    readonly clickOnStartTime: Locator;
    readonly selecStarttDate: Locator;
    readonly enterStartHours: Locator;
    readonly enterStartMins: Locator;
    readonly clickOnPM: Locator;
    readonly clickOnOK: Locator;
    readonly clickOnEndDate: Locator;
    readonly selectEndDate: Locator;
    readonly clickOnAM: Locator;
    readonly ClickOnCheckedAndUncheckedIcon: Locator;
    readonly clickUpArrowBtnInTable: Locator;
    readonly clickDownArrowBtnInTable: Locator;
    readonly clickOnShowRowsBtn: Locator;
    readonly selectNoOfRows: Locator;
    readonly clickOnPaginationNext: Locator;
    readonly clickOnPaginationPrevious: Locator;
    readonly verifyDuplicate: Locator;
    readonly verifyDelete: Locator;
    readonly verifyPreview: Locator;
    readonly clickOnSubmitBtn: Locator;
    readonly clickOnQuestionMenu: Locator;
    readonly ClickOnPlusIcon: Locator;
    readonly ClickOnSelectOne: Locator;
    readonly ClickOnGreenIcon: Locator;
    readonly ValidateMessage: Locator;
    readonly clickOnCheckOut: Locator;
    readonly clickOnYes: Locator;
    readonly closeBtn: Locator;
    readonly clickOnCloseInVersion: Locator;
    readonly blueprintmsg: Locator;




    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.Blueprint = page.locator('//a[@data-tour="Blueprints"]');
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
        this.SaveButtonClicks = page.locator('(//button[text()="Save"])[1]');
        this.FilterSuccessMessage = page.locator('//div[text()="Filter Saved Successfully"]');
        this.closeButton = page.locator('(//button[@type="button"][normalize-space()="×"])[1]');
        this.closeBtn = page.locator('(//div[@class="subMenu"])[4]//button')
        this.nextButtonClick = page.locator('//button[text()="Next"]');
        this.clickOnSaveDraft = page.locator('//button[text()="Save Draft"]');
        this.workflowSuccessMessage = page.locator('//span[text()="Workflow has been created successfuly"]');
        this.editBlueprint = page.locator('//button[text()="Edit this Blueprint"]');
        this.cartButtonClick = page.locator('//div[@class="cartAdd-btn ng-star-inserted"]');
        this.removeCartButtonClick = page.locator('//div[@class="cartMinus-btn ng-star-inserted"]');
        this.addToCart = page.locator('//button[text()="Add to cart"]');
        this.saveButton = page.locator('(//button[text()="Save"])[2]');
        this.saveSuccessMessage = page.locator('//span[text()="Cart Details updated successfully"]');
        this.workflowclick = page.locator('//p[text()="Workflow"]');
        this.approveButtonClick = page.locator('//button[contains(text(),"Approve")]');
        this.SearchDraftQuestions = page.locator('//input[@placeholder="Search Blueprint(s)"]')
        this.ClickOnQuestionID = page.locator('//table[@class="table"]//tbody//tr[1]//td[2]//a')
        this.ClickOnAddCartBtn = page.locator('(//div[@class="cartAdd-btn ng-star-inserted"])[1]');
        this.ClickOnAddCartBtn2 = page.locator('(//div[@class="cartAdd-btn ng-star-inserted"])[2]')
        this.ClickOnToCart = page.locator('//button[contains(text(),"Add to cart")]')
        this.ClickOnSaveBtn = page.locator('(//button[contains(text(),"Save")])[2]')
        this.ClickOnCancelButton = page.locator('(//button[text()="Cancel"])[2]')
        this.ClickOnMoreIcon = page.locator('//div[@class="plus-btn"]')
        this.EnterCartItem = page.locator('(//input[@class="inputtxt ng-untouched ng-pristine ng-valid ng-star-inserted"])[3]')
        this.EnterNumberReq = page.locator('(//div[@class="custom-tbdata item-required"]//input)[2]')
        this.ClickOnAddFilter = page.locator('(//button[@class="btn btn-blue"])[2]')
        this.SaveButtonClick = page.locator('(//button[text()="Save"])[3]');
        this.ClickOnWorkFlow = page.locator('//p[normalize-space()="Workflow"]')
        this.ClickOnApprove = page.locator('(//div[@class="sub--right-menu ng-star-inserted"]//button)[2]')
        this.ValidateSuccessfulPopMessage = page.locator('//span[contains(text(),"Status has been updated successfuly")]')
        this.ClickOnVersionHistory = page.locator('//p[normalize-space()="Version History"]')
        this.cancelButtonClick = page.locator('(//button[text()="Cancel"])[2]');
        this.moreOptionClick = page.locator('//button[normalize-space()="..."]');
        this.convertToExam = page.locator('//a[normalize-space()="Convert to exam"]');

        this.previewButtonClick = page.locator('//a[text()="Preview"]');
        this.previewCloseButtonClick = page.locator('(//button[@type="button"][normalize-space()="×"])[11]');
        this.clickFirstBluePrint = page.locator('(//table[@class="table"]//tbody//tr//td[3])[1]');
        this.DuplicateButtonClick = page.locator('//a[text()="Duplicate"]');
        this.DeleteButtonClick = page.locator('//a[text()="Delete"]');
        this.yesButtonClick = page.locator('(//button[text()="Yes"])[3]');
        this.yesButtonClicks = page.locator('(//button[text()="Yes"])[2]');
        this.submitButtonClick = page.locator('//button[text()="Submit"]');
        this.saveDropdownButton = page.locator('//span[@class="arrow-after"]');
        this.saveAsNewVersion = page.locator('//a[normalize-space()="Save as New Version"]');
        this.textAreaType = page.locator('//textarea[@name="comments"]');
        this.saveClick = page.locator('(//button[text()="Save"])[3]');
        this.saveNewVersionSuccessMessage = page.locator('//span[text()="Blueprint has been saved as new version"]');

        this.EXAMSMENU = page.locator('//a[text()="Exams"]')
        this.CREATEEXAMS = page.locator('//button[normalize-space()="Create Exam"]')
        this.STARTFROMSCRATCH = page.locator('//p[normalize-space()="Start from Scratch"]')
        this.copyExisting = page.locator('//p[normalize-space()="Copy an Existing Exam"]')
        this.copyTemplate = page.locator('//p[normalize-space()="Copy from Template"]')
        this.examPageTitle = page.locator('//div[@class="exams-title"]')

        this.SELECTBANK = page.locator('//input[@placeholder="Select Bank"]');
        this.TESTBANK = page.locator('(//div[@class="dropdown-main"])[1]//li//span[@class="open"]')
        this.EXAMNAME = page.locator('(//input[@name="inputbox"])[1]')
        this.EXAMCODE = page.locator('(//input[@name="inputbox"])[2]')
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

        this.ClickOnExamVenue = page.getByPlaceholder('Select Exam Venue');
        this.ChooseExamVenue = page.getByRole('listitem').filter({ hasText: testData.ChooseChennaiVenue }).locator('div');
        this.ClickOnAdd = page.getByRole('button', { name: 'Add' });
        this.EnterNoOfCandidates = page.getByRole('spinbutton');

        this.ClickOnNextBtn = page.locator('//button[normalize-space()="Next"]');
        this.VerifyExam_details = page.locator('//label[normalize-space()="1. Exam Details"]');
        this.VerifyChoose_Question = page.locator('//label[normalize-space()="2. Choose Questions"]');
        this.VerifyChoose_Workflow = page.locator('//label[normalize-space()="3. Choose Workflow"]');
        this.VerifyChoose_Confirmation = page.locator('//label[normalize-space()="4. Confirmation"]');

        this.CliCKOnCreateSection = page.locator('//i[@title="Create Section"]');
        this.ClickOnCreateExamSection = page.getByText('Create Exam Section');
        this.EnterSectionName = page.locator('#section_name').getByRole('textbox');
        this.DescriptionMessage = page.frameLocator('iframe[title="Rich Text Area\\. Press ALT-F9 for menu\\. Press ALT-F10 for toolbar\\. Press ALT-0 for help"]').locator('html');
        this.SelectTime = page.getByRole('combobox').nth(1);
        this.ClickOnSave = page.locator('(//button[normalize-space()="Save"])[1]');
        this.nextButton = page.locator('//li[@class="next"]');
        this.Oneclick = page.locator('(//li//span[text()="1"])[1]');
        this.checkBoxClick = page.locator('((//table[@class="table"])[2]//tbody//tr//td[1])[1]')

        this.saveButtonOnModify = page.locator('//div[@class="dropdownbtn"]');
        this.saveDraftOnWorkFlow = page.locator('(//div[@class="sub--right-menu ng-star-inserted"]//button)[1]')
        this.saveDraftText = page.locator('//button[text()="Save Draft"]')
        this.editNumRequired = page.locator('(//div[@class="ngx-dnd-item custom-trow ng-star-inserted"]//div)[5]//input')
        this.removeFromCart = page.locator('(//div//button[@class="btn primarybtn"])[2]')
        this.clickOnRemoveCartBtn = page.locator('//div[@class="cartMinus-btn ng-star-inserted"]')
        this.saveBtnOnRemoveCart = page.locator('(//div//button[@class="btn primarybtn"])[3]')
        this.cancelBtnOnRemoveCart = page.locator('(//button[@class="btn btn-default"])[1]')
        this.cartItemIsZero = page.locator('(//table//tbody//tr//td)[2]')
        this.ClickOnAddQuestion2 = page.locator('(//i[@title="Create Exam Question"])[2]');
        this.ClickOnAddQuestion3 = page.locator('(//i[@title="Create Exam Question"])[3]');

        this.workFlowFieldDropDown = page.locator('//ul[@class="ng-star-inserted"]')
        this.chooseApproveWorkFlow = page.locator('(//span[@class="open"])[1]')
        this.reviewerDropDown = page.locator('(//*[@class="input-wrap"])[2]')
        this.chooseReviewer = page.locator('//input[@type="checkbox"]')
        this.approverDropDown = page.locator('(//div[@class="input-wrap"])[3]')
        this.chooseApprover = page.locator('(//li[@class="open ng-star-inserted"])[4]')
        this.submitForReviewBtn = page.locator('//button[@class="theme-btn theme-primary-btn ng-star-inserted"]')
        this.morebtnOnWorkFlow = page.locator('//button[@class="btn btn-default dotbutton"]')

        this.clickonQuestion = page.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a');
        this.ClickOnCancelBtn = page.locator('//button[@class="theme-btn theme-default-btn"]')
        this.confirmationPopUp = page.locator('//div[normalize-space()="Are you sure you want to discard your changes?"]')
        this.ClickOnNoBtn = page.locator('//div[@class="modal-dialog cancel-confirmation"]//button[normalize-space()="No"]')
        this.ClickOnBackArrowBtn = page.locator('//i[@class="iconBg leftArrow"]')
        this.btnAutofill = page.locator('//button[normalize-space()="Auto fill"]')
        this.btnRemoveFromCart = page.locator('//button[normalize-space()="Remove from cart"]')
        this.btnCancel = page.locator('//button[@class="btn btn-default"][normalize-space()="Cancel"]')
        this.qutnsRemovedMsgPopup = page.locator('//div[@class="content-side"]//span')
        this.clickOnMoreOption = page.locator('//table[@class="table"]//tbody//tr[1]//td[1]//a')
        this.clickOnArchive = page.locator('(//p[contains(text(),"Archive")])[1]')
        this.clickOnArchiveYes = page.locator('//div[@id="archiveModal"]//button[@type="button"][normalize-space()="Yes"]')
        this.verifyArchivePopup = page.locator('//div[@class="content-side"]//span')
        this.fetchTitle = page.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a')
        this.clickOnSelectBtn = page.locator('(//button[@class="btn btn-blue"])[1]')
        this.Choosehrs = page.locator('//body//app-root//select[1]');
        this.ClickOnAddQuestion = page.locator('//i[@title="Create Exam Question"]');
        this.ClickOnSearchQuestion = page.locator('//input[@placeholder="Search Question(s)"]');
        this.ClickOnAddBtn = page.locator('//button[normalize-space()="Add"]');
        this.ClickOnSubmitAndApproveBtn = page.locator('//button[normalize-space()="Submit & Approve"]');
        this.clickOnViewBtn = page.locator('(//button[@class="btn btn-default"])[1]')
        this.fetchblueprintTitle = page.locator('//input[@class="textField ng-touched ng-dirty ng-valid"]')
        this.clickOnLeftArrow = page.locator('//i[@class="iconBg leftArrow"]')
        this.previewPageTitle = page.locator('(//h4[text()="Preview"])[2]')
        this.clickOnComparisionBtn = page.locator('//button[@class="theme-btn theme-primary-btn"]')
        this.comparisionPageTitle = page.locator('(//div[@class="modal-header"])[3]//h4')
        this.ExamTools = page.locator('(//div[@class="input-wrap"])[6]');
        this.SelectNotepad = page.locator('(//div[@class="dropdown-main"])[6]//ul//li[2]//span[text()="Notepad"]');
        this.SelectCalculator = page.locator('(//div[@class="dropdown-main"])[6]//ul//li[1]//span[text()="Calculator"]');
        this.SelectHighlighter = page.locator('(//div[@class="dropdown-main"])[6]//ul//li[3]//span[text()="Highlighter"]');
        this.EnterInvigilatorPswd = page.locator('//input[@name="examInviglator"]');
        this.clickOnCloseIcon = page.locator('(//span[@class="msdd-close"])[1]')
        this.clickOnMinusicon = page.locator('//div[@class="minus-btn"]')
        this.clickOnPlusIcon = page.locator('//button[@class="add-filter-button"]')
        this.selectitem = page.locator('(//div[@class="filter-menu"]//select)[2]')
        this.enterId = page.locator('//div[@class="filter-menu"]//input')
        this.clickTikIcon = page.locator('//i[@class="tick-icon"]')
        this.ClickOnCreateContentSection = page.getByText('Create Content Section');
        this.selectMinutes = page.getByRole('combobox').nth(1);
        this.ClickonCreateContentPage = page.locator('//i[@title="Create Content Page"]');
        this.ClickOnAddContent = page.locator('//div[contains(text()," Add Content")]');
        this.enterContentTitle = page.locator('//input[@name="inputbox"]');
        this.ClickOnContentLayout = page.locator('//input[@placeholder="Select Content Layout"]');
        this.ClickOnTermAndCondition = page.locator('//span[text()="Terms & Conditions"]');
        this.ClickOnCreateSurveySection = page.getByText('Create Survey Section');
        this.ClickOnAddSurveyQuestion = page.locator('//i[@title="Create Survey Question"]');
        this.searchFieldOnExam = page.locator('//input[@placeholder="Search Exam(s)"]')
        this.clickOnQuestions = page.locator('//p[contains(text(),"Questions")]')
        this.clickOnSaveButton = page.locator('(//button[text()="Save"])[1]')
        this.DeliveryMenu = page.locator('//a[text()="Delivery"]');
        this.clickOnLiveDashboard = page.locator('//a[text()="Live Dashboard"]')
        this.viewTheExamSession = page.locator('//div[@class="msdd-label newmandatory button-main-half"]')
        this.viewTheLocation = page.locator('(//div[@class="msdd-label button-main-half"])[1]')
        this.viewTheVenue = page.locator('(//div[@class="msdd-label button-main-half"])[2]')
        this.clickOnLocation = page.locator('//input[@placeholder="Select Location"]')
        this.selectLocation = page.locator('((//div[@class="open container-left-padding"])[2]//span)[1]')
        this.clickOnVenue = page.locator('//input[@placeholder="Select Venue"]')
        this.selectVenue = page.locator('//input[@class="open"]')
        this.clickOnSubmit = page.locator('//div[@class="action-item"]')
        this.candTotalCount = page.locator('//div[@class="tablefooter-left"]//label')
        this.clickOnWorkflowInDelivery = page.locator('//a[contains(text(),"Workflow")]')
        this.EndBoookingHRS = page.locator('(//div[@class="dtp-main reqLabel dtp-main-half"])[2]');
        this.clickOnGradeBook = page.locator('//a[text()="Gradebook"]')
        this.searchInGradeBook = page.locator('//input[@placeholder="search"]')
        this.verifyViewGradebook = page.locator('(//p[text()="View Gradebook"])[1]')
        this.clickOnUpIconColumn = page.locator('(//table[@class="table"]//thead//tr[1]//th[3]//span)[2]//span[1]')
        this.clickOnDownIconColumn = page.locator('(//table[@class="table"]//thead//tr[1]//th[3]//span)[2]//span[2]')
        this.viewRowsCount = page.locator('//button[@class="btn btn-default dropdown-toggle"]')
        this.viewPageNo = page.locator('//li[@class="current"]')
        this.clickOnPassSection = page.locator('//input[@placeholder="Select Pass Section"]')
        this.clickOnSelectYes = page.locator('((//div[@class="open container-left-padding"])[1]//span)[1]')
        this.enterPassPercentage = page.locator('(//input[@class="textField"])[2]')
        this.MenuIconClick = page.locator('//i[@class="menuIcons profileIcon"]');
        this.logoutbuttonClick = page.locator('//a[normalize-space()="Log out"]');
        this.clickOnSaveForDfatExam = page.locator('(//button[contains(text(),"Save")])[1]')
        this.clickOnEditQuestion = page.locator('//p[contains(text(),"Questions")]')

        this.closeIcon = page.locator('//span[@class="msdd-close"]')
        this.workflowDropdown = page.locator('(//div[@class="btn-selected-list"])[1]');
        this.approvalWorkflowclick = page.locator('//span[text()="Approval Workflow"]');
        this.selectReviwer = page.locator('//input[@placeholder="Select Reviewer"]');
        this.selectApprover = page.locator('//input[@placeholder="Select Approver"]');
        this.checkReviwerQA = page.locator('//span[text()="Reviewer QA"]');
        this.approverQA = page.locator('//span[text()="approver QA"]');
        this.submitandreviewclick = page.locator('//button[text()="Submit For Review"]');
        this.workflowsuccessmessage = page.locator('//div[@class="content-side"]//span');
        this.saveButtonClick = page.locator('//button[text()="Save"]');
        this.approverclick = page.locator('//div[normalize-space()="Approver"]');
        this.submitAndReviewBtn = page.locator('//button[text()="Submit & Review"]')
        this.selectExamTemplate = page.locator('//select[@name="exam"]')
        this.clickOnEdit = page.getByTitle('Edit Session');
        this.clickOnStartTime = page.locator('date-time-picker').filter({ hasText: 'Start Time ×' }).locator('i')
        this.selecStarttDate = page.locator('span').getByText(StartBookingDate, { exact: true })
        this.enterStartHours = page.getByRole('spinbutton').first()
        this.enterStartMins = page.getByRole('spinbutton').nth(1);
        this.clickOnPM = page.getByLabel(period)
        this.clickOnOK = page.locator('.dtpc-ok-svg')
        this.clickOnEndDate = page.locator('date-time-picker').filter({ hasText: 'End Time ×' }).locator('i')
        this.selectEndDate = page.locator('span').getByText(EndExamDate, { exact: true })
        this.clickOnAM = page.getByLabel('AM')
        this.ClickOnCheckedAndUncheckedIcon = page.locator('//table[@class="table"]//thead//tr//th[1]//a')
        this.clickUpArrowBtnInTable = page.locator('//div[@class="sh-icon-top sh--top"]')
        this.clickDownArrowBtnInTable = page.locator('//div[@class="sh-icon-top sh--bottom"]')
        this.clickOnShowRowsBtn = page.locator('//button[@class="btn btn-default dropdown-toggle"]')
        this.selectNoOfRows = page.locator('//ul[@class="dropdown-menu dropdown-color"]//li[1]')
        this.clickOnPaginationNext = page.locator('//li[@class="pagination-next"]//a')
        this.clickOnPaginationPrevious = page.locator('//li[@class="pagination-previous"]//a')
        this.verifyDuplicate = page.locator('((//ul[@class="dropdown-menu more-btn pull-right"])[1]//p)[1]')
        this.verifyDelete = page.locator('((//ul[@class="dropdown-menu more-btn pull-right"])[1]//p)[2]')
        this.verifyPreview = page.locator('((//ul[@class="dropdown-menu more-btn pull-right"])[1]//p)[3]')
        this.clickOnSubmitBtn = page.locator('//button[text()="Submit"]')
        this.clickOnQuestionMenu = page.locator('//a[text()="Questions"]')
        this.ClickOnPlusIcon = page.locator('//button[@class="add-filter-button"]')
        this.ClickOnSelectOne = page.locator('(//select[@class="theme-dropdown ng-untouched ng-pristine ng-valid"])[2]')
        this.ClickOnGreenIcon = page.locator('//i[@class="tick-icon"]')
        this.ValidateMessage = page.locator('//span[contains(text(),"Please Choose or Enter Value")]')
        this.clickOnCheckOut = page.locator('//a[text()="Check Out"]')
        this.clickOnYes = page.locator('(//button[text()="Yes"])[6]')
        this.clickOnCloseInVersion = page.locator('(//button[@id="addProductCloseButton"])[3]');
        this.blueprintmsg = page.locator('//div[@class="txtBox"]');

    }
    /**Method for Exam Tab Navigation */
    async examTabNavigation(): Promise<void> {
        await this.EXAMSMENU.click();
    }

    /**Method for Question Tab Navigation */
    async clickOnQuestionMenuTab() {
        await this.clickOnQuestionMenu.click()
    }

    /**
     * Method to click on Gradebook
     */
    async gradeBookMenu() {
        await this.clickOnGradeBook.click()
    }

    /**Method to unchecked the all question columns  */
    async uncheckAllQutnColumns() {
        await this.ClickOnCheckedAndUncheckedIcon.click();
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector('//ul[@class="dropdown-menu dropdown-menu-columns"]//li//input')
        const allcheckbox = await this.page.$$('//ul[@class="dropdown-menu dropdown-menu-columns"]//li//input')
        console.log(allcheckbox.length)
        for (let i = 1; i < 2; i++) {
            await allcheckbox[i].click()
            await this.page.waitForTimeout(5000);
        }
        // await this.SearchDraftQuestions.type('Long Question')
        await this.page.waitForTimeout(3000);
        // await expect(this.ValidateNorecordText).toBeVisible()
    }

    /**
     * Method to select a Rows
     */
    async clickOnRowsAndSelectRows() {
        await this.clickOnShowRowsBtn.click()
        await expect(this.selectNoOfRows).toBeVisible()
        await this.selectNoOfRows.click()
    }

    /**
     * Method to click On Pagination
     */
    async clickOnPagination() {
        await this.clickOnPaginationNext.click()
        await this.page.waitForTimeout(5000);
        await this.clickOnPaginationPrevious.click()
        await expect(this.clickOnPaginationNext).toBeVisible()
    }

    /**Method for Page Navigation */
    async iAuthorPageNavigation() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.AUTHOR.click()
        ]);
        await newPage.waitForLoadState();
        return new exports.EluminaBlueprintsPage(newPage);
    }

    /**Method to click on refresh page */
    async refreshPage() {
        await this.page.reload();
        console.log("Page Refreshed");
        await this.page.waitForTimeout(5000);
    }

    async againCandidateLogin(): Promise<void> {
        await this.page.waitForTimeout(1000);
        await this.page.bringToFront();
        await this.page.waitForTimeout(1000);
        //await this.page.close();
    }


    /**Method to validate Filter */
    async validateFilter() {
        await this.ClickOnPlusIcon.click()
        await this.ClickOnSelectOne.click()
        await this.ClickOnSelectOne.selectOption('Type')
        await this.page.waitForTimeout(3000);
        await this.selectFilter2.click();
        await this.selectFilter2.selectOption('VSAQ');
        await this.page.waitForTimeout(2000);
        await this.ClickOnGreenIcon.click()
        await this.page.waitForTimeout(3000);
    }
    /**
     * Method to try to delete the question and verify proper message
     */
    async tryToDeleteTheExamAddedQutn() {
        await this.moreOptionClick.click()
        await this.clickOnCheckOut.click()
        await this.clickOnYes.click()
        await this.page.waitForTimeout(3000);
        await this.SaveButtonClicks.click()
        await this.page.waitForTimeout(10000);
        await this.moreOptionClick.click()
        await this.DeleteButtonClick.click()
        await this.yesButtonClick.click()
        await this.page.waitForTimeout(3000);
        await expect(this.verifyArchivePopup).toHaveText('Question can not be deleted since its used in some exam')
    }

    /**Method for Blueprint Menu click on Menu bar */
    async BlueprintMenuClick(): Promise<void> {
        await this.Blueprint.click();
    }

    /**
    * Method to edit time while creating exam section
    */
    async editTime() {
        let currentDate = new Date();
        let datecurrent = currentDate.getDate();
        console.log(datecurrent);
        let pm = currentDate.getHours() >= 12;
        let hour12 = currentDate.getHours() % 12;
        if (!hour12)
            hour12 += 12;
        let minute = currentDate.getMinutes();
        console.log(`${hour12}:${minute} ${pm ? 'pm' : 'am'}`);

        let StartBookingMin = currentDate.getMinutes() - 2;
        // let EndBookingMin = currentDate.getMinutes() + 3;
        // let StartExamMin = currentDate.getMinutes() + 4;
        let EndExamMin = currentDate.getMinutes() + 15;

        await this.clickOnEdit.click()
        await this.clickOnStartTime.click()
        await this.selecStarttDate.click()
        await this.enterStartHours.click()
        await this.enterStartHours.clear()
        await this.enterStartHours.fill(hour12.toString())
        await this.enterStartMins.click()
        await this.enterStartMins.clear()
        await this.enterStartMins.fill(EndExamMin.toString())
        await this.clickOnPM.click()
        await this.clickOnOK.click()
        await this.clickOnEndDate.click()
        await this.selectEndDate.click()
        await this.enterStartHours.click()
        await this.enterStartHours.clear()
        await this.enterStartHours.fill(hour12.toString())
        await this.enterStartMins.click()
        await this.enterStartMins.clear()
        await this.enterStartMins.fill(StartBookingMin.toString())
        await this.clickOnAM.click()
        await this.clickOnOK.click()

    }

    /**
     * Method for Logout 
     */
    async logoutClick() {
        await this.MenuIconClick.click();
        await this.logoutbuttonClick.click();
        await this.page.waitForTimeout(5000);
    }

    /**
     *  Method to Create Content Section 
     */
    async createContentSection(time): Promise<void> {
        await this.CliCKOnCreateSection.click();
        await this.ClickOnCreateContentSection.click();
        await this.EnterSectionName.type('Content-' + Math.floor(Math.random() * 899 + 10));
        await this.page.waitForTimeout(5000);
        await this.DescriptionMessage.click();
        await this.DescriptionMessage.type('Hello World.....');
        await this.page.waitForTimeout(5000);
        await this.selectMinutes.selectOption(time);
        await this.ClickOnSave.click();

    }

    /**
*  Method to Create Content Section 
*/
    async createContentSectionwithoutSave(time): Promise<void> {
        await this.CliCKOnCreateSection.click();
        await this.ClickOnCreateContentSection.click();
        await this.EnterSectionName.type('Content-' + Math.floor(Math.random() * 899 + 10));
        await this.page.waitForTimeout(5000);
        await this.DescriptionMessage.click();
        await this.DescriptionMessage.type('Hello World.....');
        await this.page.waitForTimeout(5000);
        await this.selectMinutes.selectOption(time);

    }

    /** 
     * Method to Create a Content Section Page
     */
    async createContentPage(): Promise<void> {
        await this.ClickonCreateContentPage.click();
        await this.ClickOnAddContent.click();
        await this.enterContentTitle.type('Content-A' + Math.floor(Math.random()) * 89 + 10);
        await this.page.waitForTimeout(5000);
        await this.DescriptionMessage.click();
        await this.DescriptionMessage.type('Hello World.....');
        await this.page.waitForTimeout(5000);
        await this.ClickOnContentLayout.click();
        await this.ClickOnTermAndCondition.click();
        await this.ClickOnSave.click();

    }

    /** 
     * Method to Create a Content Section Page
     */
    async createContentPagewithoutSave(): Promise<void> {
        await this.ClickonCreateContentPage.click();
        await this.ClickOnAddContent.click();
        await this.enterContentTitle.type('Content-A' + Math.floor(Math.random()) * 89 + 10);
        await this.page.waitForTimeout(5000);
        await this.DescriptionMessage.click();
        await this.DescriptionMessage.type('Hello World.....');
        await this.page.waitForTimeout(5000);
        await this.ClickOnContentLayout.click();
        await this.ClickOnTermAndCondition.click();
    }

    /**
     * Method to verify list of blueprint items
     */
    async verifyListOfBlueprint() {
        await this.page.waitForTimeout(2000)
        await this.page.waitForSelector('//table[@class="table"]//thead//tr//th//div//span[@class="thtext"]')
        const items = await this.page.$$('//table[@class="table"]//thead//tr//th//div//span[@class="thtext"]')
        for (let i = 0; i < items.length; i++) {
            let item = await items[i].textContent();
            console.log(item)
        }
    }

    /**
    * Method to verify list of blueprint items
    */
    async verifyMoreOption() {
        await this.page.waitForTimeout(5000)
        await this.searchInGradeBook.type('Published')
        await this.page.waitForTimeout(5000)
        await this.clickOnMoreOption.click()
        await expect(this.verifyViewGradebook).toBeVisible()
    }
    /**
     * Method to reverse the gradebook name
     */
    async clickOnUpAndDown() {
        await this.searchInGradeBook.clear()
        await this.page.waitForTimeout(5000)
        await this.clickOnUpIconColumn.click()
        await this.page.waitForTimeout(2000)
        await this.clickOnDownIconColumn.click()
        await this.page.waitForTimeout(2000)

    }

    /**
    * Method to up and down to respective column
    */
    async clickOnUpAndDownForRespectiveColumn() {
        await this.clickOnUpIconColumn.click()
        await this.page.waitForTimeout(2000)
        await this.clickOnDownIconColumn.click()
        await this.page.waitForTimeout(2000)

    }

    /**
     * Method to click On Up and Down Arrow Icon
     */
    async clickOnUpAndDownArrowInTable() {
        await this.clickUpArrowBtnInTable.click()
        await this.clickDownArrowBtnInTable.click()
    }

    /**
     * Method to verify Rows, Page and User count
     */
    async verifyRowAndPageAndCandCounts() {
        await expect(this.candTotalCount).toBeVisible()
        await expect(this.viewRowsCount).toBeVisible()
        await expect(this.viewPageNo).toBeVisible()

    }

    /**
     * Method to search text in search field
     */
    async searchtext() {
        await this.SearchDraftQuestions.click()
        await this.SearchDraftQuestions.clear()
        await this.SearchDraftQuestions.fill('Draft')
        await this.page.waitForTimeout(2000)
        await this.clickOnPlusIcon.click()
        await this.selectitem.click()
        await this.selectitem.selectOption("ID")
        await this.enterId.fill("70")
        await this.clickTikIcon.click()
    }

    /**
     * Create Survey Section
     */
    async createSurveySection(surveyTime) {
        await this.page.waitForTimeout(5000);
        await this.CliCKOnCreateSection.click();
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreateSurveySection.click();
        await this.EnterSectionName.type('Survey-' + Math.floor(Math.random()) * 89 + 10);
        await this.page.waitForTimeout(5000);
        await this.DescriptionMessage.click();
        await this.DescriptionMessage.type('Hello World.....');
        await this.page.waitForTimeout(5000);
        await this.selectMinutes.selectOption(surveyTime);
        await this.ClickOnSave.click();

    }


    /**
     * Create Survey Section
     */
    async createSurveySectionWithoutSave(surveyTime) {
        await this.page.waitForTimeout(5000);
        await this.CliCKOnCreateSection.click();
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreateSurveySection.click();
        await this.EnterSectionName.type('Survey-' + Math.floor(Math.random()) * 89 + 10);
        await this.page.waitForTimeout(5000);
        await this.DescriptionMessage.click();
        await this.DescriptionMessage.type('Hello World.....');
        await this.page.waitForTimeout(5000);
        await this.selectMinutes.selectOption(surveyTime);
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
        await this.submitAndReviewBtn.click();
        await this.page.waitForTimeout(10000)
        await expect(this.workflowsuccessmessage).toHaveText('Workflow has been created successfuly.');
        await this.page.waitForTimeout(2000)
        //await this.saveButtonClick.click();
    }

    /*
*Method to Validate Exam Approval Workflow with submit and approve button
*/
    async validateQunApprovalWorkflowWithSubmitAndApprove() {
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
        await this.ClickOnSubmitAndApproveBtn.click();
        await this.page.waitForTimeout(10000)
        await expect(this.workflowsuccessmessage).toHaveText('Workflow has been created successfuly.');
        await this.page.waitForTimeout(2000)
        //await this.saveButtonClick.click();
    }

    /*
*Method to Validate Exam Approval Workflow
*/
    async validateQunApprovalWorkflow1() {
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
        await this.submitandreviewclick.click();
        await this.page.waitForTimeout(10000)
        await expect(this.workflowsuccessmessage).toHaveText('Status has been updated successfuly');
        await this.page.waitForTimeout(2000)
        await this.saveButtonClick.click();
    }



    /**
     * Method to Create Exam 
     */
    async createAMExam(): Promise<void> {

        await this.SELECTBANK.click();
        await this.SELECTBANK.type(testData.TestBank2);
        await this.TESTBANK.click();
        await this.EXAMNAME.type('DEMO' + Math.floor(Math.random() * 899999 + 100000));

        await this.EXAMCODE.type('D' + Math.floor(Math.random() * 89 + 100));

        await this.BookingStartCalender.click();
        if (EndExamDate >= "30") {
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else if (EndExamDate >= "31") {
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }


        else {
            await this.BookingStartDate.click();
        }
        // await this.BookingStartDate.click();
        await this.BookingStartHrs.click();
        await this.BookingStartHrs.clear();
        await this.BookingStartHrs.type(testData.StartBookingHr);
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        await this.BooingStartMins.type(testData.EndBookingmin);
        await this.ChooseBookingStartSession.check();
        await this.BookingOK.click();
        await this.BookingEndCalender.click();
        if (EndExamDate >= "30") {
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else if (EndExamDate >= "31") {
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else {
            await this.BookingEndDate.click();
        }
        await this.BookingStartHrs.click();
        await this.BookingStartHrs.clear();
        await this.BookingStartHrs.type(testData.StartBookingHr);
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        await this.BooingStartMins.type(testData.EndBookingmins);
        await this.ChooseBookingStartSession.check();
        await this.BookingOK.click();
        await this.ExamStartCalender.click();
        if (EndExamDate >= "30") {
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else if (EndExamDate >= "31") {
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }

        else {
            await this.ExamStartDate.click();
        }
        await this.BookingStartHrs.click();
        await this.BookingStartHrs.clear();
        await this.BookingStartHrs.type(testData.StartBookingHr);
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        await this.BooingStartMins.type(testData.StartExamMin);
        await this.ChooseBookingStartSession.check();
        await this.BookingOK.click();
        await this.ExamEndCalender.click();
        if (EndExamDate >= "30") {
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else if (EndExamDate >= "31") {
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else {
            await this.ExamEndDate.click();
        }
        await this.BookingStartHrs.click();
        await this.BookingStartHrs.clear();
        await this.BookingStartHrs.type(testData.EndExamhr);
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        await this.BooingStartMins.type(testData.EndExamMin);

        console.log(await this.EndBoookingHRS.textContent());

        await this.ChooseBookingStartSession.check();
        await this.BookingOK.click();
        await this.ClickOnExamVenue.click();
        await this.ChooseExamVenue.click();
        await this.ClickOnAdd.click();
        await this.EnterNoOfCandidates.click();
        await this.EnterNoOfCandidates.clear();
        await this.EnterNoOfCandidates.type('001');
        await this.ClickOnAdd.click();
    }

    /**Method to Create Exam */
    async createPMExam(): Promise<void> {

        await this.SELECTBANK.click();
        await this.SELECTBANK.type(testData.TestBank2);
        await this.TESTBANK.click();
        await this.EXAMNAME.type('DEMO' + Math.floor(Math.random() * 899999 + 100000));

        await this.EXAMCODE.type('D' + Math.floor(Math.random() * 89 + 100));

        await this.BookingStartCalender.click();
        if (EndExamDate >= "30") {
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else if (EndExamDate >= "31") {
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }


        else {
            await this.BookingStartDate.click();
        }
        // await this.BookingStartDate.click();
        await this.BookingStartHrs.click();
        await this.BookingStartHrs.clear();
        await this.BookingStartHrs.type(testData.StartBookingHr);
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        await this.BooingStartMins.type(testData.EndBookingmin);
        await this.ChooseBookingStartSession.check();
        await this.BookingOK.click();
        await this.BookingEndCalender.click();
        if (EndExamDate >= "30") {
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else if (EndExamDate >= "31") {
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else {
            await this.BookingEndDate.click();
        }
        await this.BookingStartHrs.click();
        await this.BookingStartHrs.clear();
        await this.BookingStartHrs.type(testData.StartBookingHr);
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        await this.BooingStartMins.type(testData.EndBookingmins);
        await this.ChooseBookingStartSession.check();
        await this.BookingOK.click();
        await this.ExamStartCalender.click();
        if (EndExamDate >= "30") {
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else if (EndExamDate >= "31") {
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }

        else {
            await this.ExamStartDate.click();
        }
        await this.BookingStartHrs.click();
        await this.BookingStartHrs.clear();
        await this.BookingStartHrs.type(testData.StartBookingHr);
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        await this.BooingStartMins.type(testData.StartExamMin);
        await this.ChooseBookingStartSession.check();
        await this.BookingOK.click();
        await this.ExamEndCalender.click();
        if (EndExamDate >= "30") {
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else if (EndExamDate >= "31") {
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else {
            await this.ExamEndDate.click();
        }
        await this.BookingStartHrs.click();
        await this.BookingStartHrs.clear();
        await this.BookingStartHrs.type(testData.EndExamhr);
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        await this.BooingStartMins.type(testData.EndExamMin);
        await this.ChooseBookingStartSession.check();
        await this.BookingOK.click();
        await this.ClickOnExamVenue.click();
        await this.ChooseExamVenue.click();
        await this.ClickOnAdd.click();
        await this.EnterNoOfCandidates.click();
        await this.EnterNoOfCandidates.clear();
        await this.EnterNoOfCandidates.type('001');
        await this.ClickOnAdd.click();

    }


    /**
    * Create Survey Section Page
    */
    async createSurveyPage(): Promise<void> {
        await this.ClickOnAddSurveyQuestion.click();
        await this.ClickOnSearchQuestion.click()
        await this.ClickOnSearchQuestion.type('MCQ');
        await this.page.waitForTimeout(5000);
        await this.page.locator('(//input[@type="checkbox"])[2]').click();
        await this.ClickOnAddBtn.click()
        await this.ClickOnSave.click();
        await this.ClickOnNextBtn.click();
        await this.page.waitForTimeout(5000);
        await this.ClickOnSubmitAndApproveBtn.click();
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        await this.page.waitForTimeout(10000);
        //await expect(this.verifyArchivePopup).toHaveText("Status has been updated successfuly.");
        await this.page.waitForTimeout(10000);
    }

    /**
    * Create Survey Section Page
    */
    async createSurveyPageWithoutApprove(): Promise<void> {
        await this.ClickOnAddSurveyQuestion.click();
        await this.ClickOnSearchQuestion.click()
        await this.ClickOnSearchQuestion.type('MCQ');
        await this.page.waitForTimeout(5000);
        await this.page.locator('(//input[@type="checkbox"])[2]').click();
        await this.ClickOnAddBtn.click()
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(5000);
        await this.ClickOnSave.click();
    }


    /**Method to  click on Create Exam button */
    async clickOnCreateExam() {
        await this.EXAMSMENU.click();
        await expect(this.CREATEEXAMS).toBeVisible();
        await this.CREATEEXAMS.click();
    }

    async searchAndSelectBlueprintQtn() {
        //await this.searchBlueprint.fill(blueprintTitle)
        //await this.page.waitForTimeout(2000)
        await this.clickOnViewBtn.click()
        await this.page.waitForTimeout(2000)
        Title = await this.fetchblueprintTitle.textContent();
        console.log(Title);
        await this.clickOnLeftArrow.click()
        await this.page.waitForTimeout(2000)
        await this.clickOnSelectBtn.click()
        await this.page.waitForTimeout(2000)
    }

    /**Method to click on scratch from exam */
    async clickOnScratchFromExam() {
        await this.STARTFROMSCRATCH.click();
        await this.ClickOnNextBtn.click();
        await expect(this.verifyArchivePopup).toHaveText("Please fill all the mandatory fields!")
        await this.page.waitForTimeout(5000)
    }
    /*Create a Exam*/
    async createExam() {
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

        await this.SELECTBANK.click();
        await this.SELECTBANK.type(testData.TestBank2);
        await this.TESTBANK.click();
        await this.EXAMNAME.type('DEMO' + Math.floor(Math.random() * 899999 + 100000));
        await this.EXAMCODE.type('D' + Math.floor(Math.random() * 89 + 100));


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
            await this.ChooseBookingStartSession.check();
        }
        await this.BookingOK.click();

        await this.ExamEndCalender.click();
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
        await this.ChooseBookingStartSession.check();
        await this.BookingOK.click();
        await this.ClickOnExamVenue.click();
        await this.ChooseExamVenue.click();
        await this.ClickOnAdd.click();
        await this.EnterNoOfCandidates.click();
        await this.EnterNoOfCandidates.clear();
        await this.EnterNoOfCandidates.type('30');
        await this.ClickOnAdd.click();
    }

    /**
     * Edit date in Exam
     */
    async editDate() {
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
            await this.ChooseBookingStartSession.check();
        }
        await this.BookingOK.click();

        await this.ExamEndCalender.click();
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
        await this.ChooseBookingStartSession.check();
        await this.BookingOK.click();
        await this.clickOnSaveForDfatExam.click();
        await expect(this.verifyArchivePopup).toHaveText("Exam updated successfully")

    }

    /**
   * Edit date for duplicate  Exam
   */
    async editDateForDuplicateExam() {
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
            await this.ChooseBookingStartSession.check();
        }
        await this.BookingOK.click();

        await this.ExamEndCalender.click();
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
        await this.ChooseBookingStartSession.check();
        await this.BookingOK.click();
    }


    /**
     * Edit Question in Exam
     */
    async editQuestion() {
        await this.clickOnEditQuestion.click()
    }


    /*Method to without selecting Date*/
    async withoutSelectingDate() {
        await this.SELECTBANK.click();
        await this.SELECTBANK.type(testData.TestBank2);
        await this.TESTBANK.click();
        await this.EXAMNAME.clear();
        await this.EXAMNAME.type('DEMO' + Math.floor(Math.random() * 899999 + 100000));
        await this.EXAMCODE.clear();
        await this.EXAMCODE.type('D' + Math.floor(Math.random() * 89 + 100));
        await this.ClickOnExamVenue.click();
        await this.ChooseExamVenue.click();
        await this.ClickOnAdd.click();
        await this.EnterNoOfCandidates.click();
        await this.EnterNoOfCandidates.clear();
        await this.EnterNoOfCandidates.type('30');
        await this.ClickOnAdd.click();
        await this.ClickOnNextBtn.click();
        await expect(this.verifyArchivePopup).toHaveText("Exam End Date/Time should be greater than Exam Start Date/Time")
    }

    /*Method to without click on add button*/
    async withoutClickOnAdd() {
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

        await this.clickOnCloseIcon.click()
        await this.SELECTBANK.click();
        await this.SELECTBANK.type(testData.TestBank2);
        await this.TESTBANK.click();
        await this.EXAMNAME.type('DEMO' + Math.floor(Math.random() * 899999 + 100000));
        await this.EXAMCODE.type('D' + Math.floor(Math.random() * 89 + 100));


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
            await this.ChooseBookingStartSession.check();
        }
        await this.BookingOK.click();

        await this.ExamEndCalender.click();
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
        await this.ChooseBookingStartSession.check();
        await this.BookingOK.click();
        await this.ClickOnAdd.click();
        await this.clickOnMinusicon.click()
        await this.ClickOnExamVenue.click();
        await this.ChooseExamVenue.click();
        await this.ClickOnNextBtn.click();
        await expect(this.verifyArchivePopup).toHaveText("The exam venue field is required.")
    }

    /**
     * Method to close the popup
     */
    async closeIconInExam() {
        await this.clickOnCloseIcon.click()

    }

    /*Method to click on add*/
    async clickOnAddandclickOnNext() {
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
        let EndExamMin = currentDate.getMinutes() + 4;

        await this.clickOnCloseIcon.click()
        await this.SELECTBANK.click();
        await this.SELECTBANK.type(testData.TestBank2);
        await this.TESTBANK.click();
        await this.EXAMNAME.clear();
        await this.EXAMNAME.type('DEMO' + Math.floor(Math.random() * 899999 + 100000));
        await this.EXAMCODE.clear();
        await this.EXAMCODE.type('D' + Math.floor(Math.random() * 89 + 100));


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
            await this.ChooseBookingStartSession.check();
        }
        await this.BookingOK.click();

        await this.ExamEndCalender.click();
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
        await this.ChooseBookingStartSession.check();
        await this.BookingOK.click();
        // await this.ClickOnAdd.click();
        // await this.clickOnMinusicon.click()
        // await this.ClickOnExamVenue.click();
        // await this.ChooseExamVenue.click();
        // await this.ClickOnAdd.click();
        await this.EnterNoOfCandidates.click();
        await this.EnterNoOfCandidates.clear();
        await this.EnterNoOfCandidates.type('30');
        await this.ClickOnAdd.click();
    }


    /*Create a Exam with All Tools*/
    async selectAllTools() {
        await this.EnterInvigilatorPswd.click();
        await this.EnterInvigilatorPswd.type(testData.EnterInvigilatorPassword);
        await this.page.waitForTimeout(5000);
        await this.ExamTools.click();
        await this.SelectCalculator.click();
        await this.SelectNotepad.click();
        await this.SelectHighlighter.click();
        await this.ClickOnNextBtn.click();
        await this.page.waitForTimeout(3000);
        await expect(this.verifyArchivePopup).toHaveText("Exam updated successfully")
        await this.page.waitForTimeout(3000);
        await expect(this.VerifyExam_details).toBeVisible();
        await expect(this.VerifyChoose_Question).toBeVisible();
        await expect(this.VerifyChoose_Workflow).toBeVisible();
        await expect(this.VerifyChoose_Confirmation).toBeVisible();
        await this.page.waitForTimeout(5000);
    }

    /*Create a Exam with All Tools*/
    async selectAllToolswithCreated() {
        await this.EnterInvigilatorPswd.click();
        await this.EnterInvigilatorPswd.type(testData.EnterInvigilatorPassword);
        await this.page.waitForTimeout(5000);
        await this.ExamTools.click();
        await this.SelectCalculator.click();
        await this.SelectNotepad.click();
        await this.SelectHighlighter.click();
        await this.ClickOnNextBtn.click();
        await this.page.waitForTimeout(3000);
        await expect(this.verifyArchivePopup).toHaveText("Exam created successfully")
        await this.page.waitForTimeout(3000);
        await expect(this.VerifyExam_details).toBeVisible();
        await expect(this.VerifyChoose_Question).toBeVisible();
        await expect(this.VerifyChoose_Workflow).toBeVisible();
        await expect(this.VerifyChoose_Confirmation).toBeVisible();
        await this.page.waitForTimeout(5000);
    }

    /**
* Method to remove All sections and questions
*/
    async removeSectionsAll() {
        await this.page.waitForSelector('//i[@class="close"]')
        const closeIcons = await this.page.$$('//i[@class="close"]')
        for (let i = 0; i < 2; i++) {
            await this.page.waitForTimeout(5000);
            await closeIcons[i].click()
            await this.page.locator('(//button[text()="Yes"])[5]').click()
            await this.page.waitForTimeout(3000);
        }
    }

    /*Create a Exam with All Tools*/
    async selectAllToolsAndVerifyMsg() {
        await this.EnterInvigilatorPswd.click();
        await this.EnterInvigilatorPswd.type(testData.EnterInvigilatorPassword);
        await this.page.waitForTimeout(5000);
        await this.ExamTools.click();
        await this.SelectCalculator.click();
        await this.SelectNotepad.click();
        await this.SelectHighlighter.click();
        await this.ClickOnNextBtn.click();
        await expect(this.verifyArchivePopup).toHaveText("Exam updated successfully")
        await expect(this.VerifyExam_details).toBeVisible();
        await expect(this.VerifyChoose_Question).toBeVisible();
        await expect(this.VerifyChoose_Workflow).toBeVisible();
        await expect(this.VerifyChoose_Confirmation).toBeVisible();
        await this.page.waitForTimeout(5000);
    }

    /**Create Exam Section */
    async createSection(hr, mins): Promise<void> {
        await this.CliCKOnCreateSection.click();
        await this.ClickOnCreateExamSection.click();
        await this.EnterSectionName.type('Exam-' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(5000);
        await this.DescriptionMessage.click();
        await this.DescriptionMessage.type(testData.DescriptionMessage);
        await this.page.waitForTimeout(5000);
        await this.Choosehrs.selectOption(hr);
        await this.SelectTime.selectOption(mins);
        await this.page.waitForTimeout(5000);

    }
    /**
     * Method to click on Save
     */
    async clickOnSave() {
        await this.ClickOnSave.click();
        await this.page.waitForTimeout(5000);
    }

    /**
    * Method to click on Save for edit question
    */
    async clickOnSaveForEditQun() {
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(5000);
    }

    /**
     * Method to setting of pass percentage
     */
    async settingPassPercentage() {
        await this.clickOnCloseIcon.click()
        await this.clickOnPassSection.click()
        await this.clickOnSelectYes.click()
        await this.enterPassPercentage.fill("35")
    }

    /**
    * Method to add question without click on approve button
    */
    async addVSAQQuestionswithoutApprove(): Promise<void> {
        await this.ClickOnAddQuestion.click();
        await this.ClickOnSearchQuestion.click()
        await this.ClickOnSearchQuestion.type('VSAQ');
        await this.page.waitForTimeout(10000);
        await this.page.locator('(//input[@type="checkbox"])[2]').click();
        await this.ClickOnAddBtn.click()
        await this.ClickOnSave.click();
        await this.ClickOnNextBtn.click();
        await this.page.waitForTimeout(5000);
    }

    /**
    * Method to search for approved questions
    */
    async searchApprovedQuestions() {
        await this.ClickOnSearchQuestion.type('Approved')
        await this.page.waitForTimeout(10000);
    }

    async addVSAQQuestions(): Promise<void> {
        await this.ClickOnAddQuestion.click();
        await this.ClickOnSearchQuestion.click()
        await this.ClickOnSearchQuestion.type('VSAQ');
        await this.page.waitForTimeout(10000);
        await this.page.locator('(//input[@type="checkbox"])[2]').click();
        await this.ClickOnAddBtn.click()
        await this.ClickOnSave.click();
        await this.ClickOnNextBtn.click();
        await this.page.waitForTimeout(5000);
        await this.ClickOnSubmitAndApproveBtn.click();
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        await this.page.waitForTimeout(20000);
        await expect(this.verifyArchivePopup).toHaveText("Status has been updated successfuly.")
        await this.page.waitForTimeout(5000);
    }


    async addVSAQQuestionswithoutNext(): Promise<void> {
        await this.ClickOnAddQuestion.click();
        await this.ClickOnSearchQuestion.click()
        await this.ClickOnSearchQuestion.type('VSAQ');
        await this.page.waitForTimeout(10000);
        await this.page.locator('(//input[@type="checkbox"])[2]').click();
        await this.ClickOnAddBtn.click()
        await this.ClickOnSave.click();
        await this.page.waitForTimeout(5000);
    }

    /**
     * Method to add question
     */
    async addVSAQQuestionswithoutNextForEditQun(): Promise<void> {
        await this.page.waitForTimeout(10000);
        await this.ClickOnAddQuestion.click();
        await this.ClickOnSearchQuestion.click()
        await this.ClickOnSearchQuestion.type('VSAQ');
        await this.page.waitForTimeout(10000);
        await this.page.locator('(//input[@type="checkbox"])[2]').click();
        await this.ClickOnAddBtn.click()
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(5000);
        await this.clickOnSaveForDfatExam.click();
    }

    /**
   * Method to add question
   */
    async addVSAQQuestionswithoutNextForEditQun2(): Promise<void> {
        await this.page.waitForTimeout(10000);
        await this.ClickOnAddQuestion2.click();
        await this.ClickOnSearchQuestion.click()
        await this.ClickOnSearchQuestion.type('VSAQ');
        await this.page.waitForTimeout(10000);
        await this.page.locator('(//input[@type="checkbox"])[2]').click();
        await this.ClickOnAddBtn.click()
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(5000);
        await this.clickOnSaveForDfatExam.click();
    }

    /**
    * Add MCQ question in Exam2
    */
    async addMCQuestionswithoutNext2(): Promise<void> {
        await this.ClickOnAddQuestion2.click();
        await this.ClickOnSearchQuestion.click()
        await this.ClickOnSearchQuestion.type('MCQ');
        await this.page.waitForTimeout(10000);
        await this.page.locator('(//input[@type="checkbox"])[2]').click();
        await this.ClickOnAddBtn.click()
        await this.ClickOnSave.click();
        await this.page.waitForTimeout(5000);
    }

    /**
    * Add Type-B question in Exam3
   */
    async addVSAQuestionswithoutNext3(): Promise<void> {
        await this.ClickOnAddQuestion3.click();
        await this.ClickOnSearchQuestion.click()
        await this.ClickOnSearchQuestion.type('VSAQ');
        await this.page.waitForTimeout(10000);
        await this.page.locator('(//input[@type="checkbox"])[2]').click();
        await this.ClickOnAddBtn.click()
        await this.ClickOnSave.click();
        await this.page.waitForTimeout(5000);
    }
    /**
     * Method to search draft exam and remove all sessions
     */
    async searchExam() {
        await this.page.waitForTimeout(5000);
        await this.searchFieldOnExam.type('Draft')
        await this.page.waitForTimeout(5000);
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(5000);
        await this.clickOnQuestions.click()
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector('//i[@class="close"]')
        const closeIcons = await this.page.$$('//i[@class="close"]')
        for (let i = 0; i < closeIcons.length; i++) {
            await closeIcons[i].click()
            await this.page.locator('(//button[text()="Yes"])[5]').click()
        }
        await this.clickOnSaveButton.click();
        await this.page.waitForTimeout(5000)
        await this.ClickOnWorkFlow.click()
        await this.page.waitForTimeout(3000);
        await this.ClickOnSubmitAndApproveBtn.click();
        await this.page.waitForTimeout(3000);
        await expect(this.verifyArchivePopup).toHaveText("Exam can not be approved since it doesn't have any question(s)")

    }

    /**
     * Method to remove sections and questions
     */
    async removeSections() {
        await this.page.waitForSelector('//i[@class="close"]')
        const closeIcons = await this.page.$$('//i[@class="close"]')
        for (let i = 0; i < closeIcons.length; i++) {
            await closeIcons[i].click()
            await this.page.locator('(//button[text()="Yes"])[5]').click()
        }
    }

    /**
     * Method to search draft exam
     */
    async searchDraftExam() {
        await this.page.waitForTimeout(5000);
        await this.searchFieldOnExam.type('Draft')
        await this.page.waitForTimeout(5000);
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(5000);
    }

    /**
    * Method to search draft exam
    */
    async clickOnQuestionID() {
        await this.page.waitForTimeout(5000);
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(5000);
    }


    /**
     * Method to verify More Options and verify
     */
    async verifyMoreOptionInBlueprint() {
        await this.clickOnMoreOption.click()
        await expect(this.verifyDuplicate).toBeVisible()
        await expect(this.verifyDelete).toBeVisible()
        await expect(this.verifyPreview).toBeVisible()
    }

    /**
    * Method to verify More Options
    */
    async clickOnMore() {
        await this.clickOnMoreOption.click()
        await this.verifyDuplicate.click()
        await this.yesButtonClick.click()
        await this.page.waitForTimeout(5000);
        await this.clickOnSubmitBtn.click()
        await this.page.waitForTimeout(5000);
    }

    /**
     * Method to click on question
     */
    async clickOnQuestion() {
        await this.clickOnQuestions.click()
    }


    /**
     * Method to click on delivery
     */
    async clickOnDelivery() {
        await this.DeliveryMenu.click();
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(5000);
        await this.clickOnLiveDashboard.click()
        await expect(this.viewTheExamSession).toBeVisible()
        await expect(this.viewTheLocation).toBeVisible()
        await expect(this.viewTheVenue).toBeVisible()
        await this.clickOnLocation.click()
        await this.selectLocation.click()
        await this.clickOnVenue.click()
        await this.selectVenue.click()
        await this.clickOnSubmit.click()
        await expect(this.candTotalCount).toBeVisible()

    }


    /**
     * Method to click on delivery with workflow
     */
    async clickOnDeliveryWithWorkFlow() {
        await this.DeliveryMenu.click();
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(5000);
        await this.clickOnWorkflowInDelivery.click()
        await this.ClickOnSave.click()
        await this.page.waitForTimeout(5000);
        await this.approveButtonClick.click()
        await this.page.waitForTimeout(5000);
        await expect(this.workflowSuccessMessage).toHaveText("Workflow has been created successfuly");
    }

    /**
     * Method to verify Live Dashboard all exam status count
     */
    async verifyLiveDashboardExamStatus() {
        await this.DeliveryMenu.click();
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(5000);
        await this.clickOnLiveDashboard.click()
        await this.page.waitForTimeout(2000);
        let liveDashboardItems = await this.page.$$('//table[@class="table table-spacing"]//thead//tr//th//div');
        for (let i = 1; i <= liveDashboardItems.length - 1; i++) {
            let itemstext = await liveDashboardItems[i].textContent();
            console.log(itemstext);
        }
    }

    async searchDraftBlueprintQueation() {
        // await this.SearchDraftQuestions.type('Draft')
        // await this.page.waitForTimeout(3000)
        // await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)
        await this.ClickOnAddCartBtn.click()
        await this.page.waitForTimeout(3000)
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        for (let i = 0; i < 2; i++) {
            await checks[i].click()
        }
        await this.ClickOnToCart.click()
        await this.page.waitForTimeout(3000)
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(5000)
    }

    /**Method to Blueprint archive */
    async blueprintArchive() {
        await this.SearchDraftQuestions.type(fetchBlueprintId);
        await this.page.waitForTimeout(10000)
        // blueprintTitle = await this.fetchTitle.textContent();
        await this.clickOnMoreOption.click()
        await this.clickOnArchive.click()
        await this.clickOnArchiveYes.click()
        await this.page.waitForTimeout(5000)
        await expect(this.verifyArchivePopup).toHaveText('Blueprint has been archived')
    }

    /**Method to Blueprint archive */
    async blueprintArchiveErrorMsg() {
        await this.page.waitForTimeout(10000)
        await this.SearchDraftQuestions.type('Approved')
        await this.page.waitForTimeout(10000)
        await this.clickOnMoreOption.click()
        await this.clickOnArchive.click()
        await this.clickOnArchiveYes.click()
        await this.page.waitForTimeout(5000)
        await expect(this.verifyArchivePopup).toHaveText('Blueprint can not be archived since its used in upcoming exam')
    }


    async searchDraftBlueprintQuestionToApprove() {
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(3000)
        //removeQuesOnCart
        await this.clickOnRemoveCartBtn.click()
        await this.page.waitForTimeout(2000);
        if (await this.cartItemIsZero.textContent() == "0") {
            console.log('dfsss:', 'noo');
            await this.page.waitForTimeout(3000);
            await this.cancelBtnOnRemoveCart.click();
        }
        else {
            console.log('SSSSSSSSSS: ', 'yesss');
            await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
            const checksToDelete = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
            for (let i = 0; i < checksToDelete.length; i++) {
                await checksToDelete[i].click()
            }
            await this.removeFromCart.click()
            await this.saveBtnOnRemoveCart.click()
        }
        await this.editNumRequired.click()
        await this.editNumRequired.clear()
        await this.editNumRequired.fill('1')
        await this.page.waitForTimeout(3000)
        await this.ClickOnAddCartBtn.click()
        await this.page.waitForTimeout(3000)
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        for (let i = 0; i < 1; i++) {
            await checks[i].click()
        }
        await this.ClickOnToCart.click()
        await this.page.waitForTimeout(3000)
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(4000)
    }

    /**
     * Method to search BluePrint Draft Questions
     */
    async searchBluePrintDraftQutn() {
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
    }

    /**Method to verify Version */
    async verifyVersion() {
        await this.page.waitForSelector('//div[@class="verticalStepperCard verticalStepperCard__circle verticalStepperCard__circle--defualt"]')
        const circles = await this.page.$$('//div[@class="verticalStepperCard verticalStepperCard__circle verticalStepperCard__circle--defualt"]')
        for (let i = 0; i < 2; i++) {
            await circles[i].click()
        }
        await this.clickOnComparisionBtn.click();
        await this.page.waitForTimeout(5000);
        await expect(this.comparisionPageTitle).toBeVisible()
        await this.clickOnCloseInVersion.click()
        await this.page.waitForTimeout(2000);

    }

    /**Method to verify Exam Page */
    async verifyExamPage() {
        await expect(this.STARTFROMSCRATCH).toBeVisible()
        await expect(this.copyExisting).toBeVisible()
        await expect(this.copyTemplate).toBeVisible()
        await expect(this.examPageTitle).toHaveText("How do you want to get started?")


    }

    /**
     * Method to click On Existing Exam
     */
    async clickOnCopyExistingExam() {
        await this.copyExisting.click()
    }

    /**
     * Method to click on Copy from template
     */
    async clickOncopyTemplate() {
        await this.copyTemplate.click()
        await this.selectExamTemplate.selectOption('Elumina TestTemplate')
        await this.nextButtonClick.click()
    }


    async addQuestionsToCart() {
        await this.ClickOnMoreIcon.click()
        await this.EnterCartItem.click()
        await this.EnterCartItem.type('Item4')
        await this.page.waitForTimeout(5000)
        await this.EnterNumberReq.click()
        await this.EnterNumberReq.type("1")
        await this.ClickOnAddFilter.click()
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
        await this.page.waitForTimeout(2000);
        await this.SaveButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.closeBtn.click();
        await this.page.waitForTimeout(2000)
        await this.ClickOnAddCartBtn2.click()
        await this.page.waitForTimeout(3000)
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        for (let i = 0; i < 1; i++) {
            await checks[i].click()
        }
        await this.ClickOnToCart.click()
        await this.page.waitForTimeout(3000)
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(5000)
        await this.ClickOnWorkFlow.click()
        await this.page.waitForTimeout(3000);
        await this.ClickOnApprove.click();
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
        await this.ClickOnVersionHistory.click()
    }

    async addQuestionsToCartWithoutApprove() {
        await this.ClickOnMoreIcon.click()
        await this.EnterCartItem.click()
        await this.EnterCartItem.type('Item4')
        await this.page.waitForTimeout(5000)
        await this.EnterNumberReq.click()
        await this.EnterNumberReq.type("1")
        await this.ClickOnAddFilter.click()
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
        await this.page.waitForTimeout(2000);
        await this.SaveButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.closeBtn.click();
        await this.page.waitForTimeout(2000)
        await this.ClickOnAddCartBtn2.click()
        await this.page.waitForTimeout(3000)
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        for (let i = 0; i < 1; i++) {
            await checks[i].click()
        }
        await this.ClickOnToCart.click()
        await this.page.waitForTimeout(3000)
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(5000)
        await this.ClickOnWorkFlow.click()
        await this.page.waitForTimeout(3000);
        // await this.ClickOnApprove.click();
        // await this.page.waitForTimeout(3000);
        // console.log(await this.ValidateSuccessfulPopMessage.textContent());
        // await this.ClickOnVersionHistory.click()
    }


    /**Method to search a question */
    async searchBlueprintQuestion() {
        await this.SearchDraftQuestions.click();
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.clickonQuestion.click();
        await this.typeTitle.click();
        await this.typeTitle.clear();
        await this.page.waitForTimeout(3000)
        await this.typeTitle.type("8");
        await this.page.waitForTimeout(3000)
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

    async approveBluePrintId() {
        await this.ClickOnWorkFlow.click();
        await this.page.waitForTimeout(4000);
        if (await this.saveDraftText.textContent() == "Save Draft") {
            this.saveDraftOnWorkFlow.click()
        }
        await this.page.waitForTimeout(3000);
        await this.ClickOnApprove.click();
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
        await this.page.waitForTimeout(5000);

    }

    /**
     * Method to create blueprint
     */
    async clickOnCreateBlueprint() {
        await this.clickCreateBlueprint.click();
    }

    /**
     * Method to verify appropriate message
     */
    async verifyMsgWithoutEnteringFildsAndClickOnNext() {
        await this.nextButtonClick.click();
        await expect(this.verifyArchivePopup).toHaveText('Please fill all the mandatory fields!')


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
        console.log(await this.workflowSuccessMessage.textContent());
        await expect(this.workflowSuccessMessage).toHaveText("Workflow has been created successfuly");

        let url = await this.page.url();
        console.log("URL", url);
        fetchBlueprintId = url.split('/')[5];
        console.log("ID", fetchBlueprintId);

        await this.page.waitForTimeout(2000);
        await this.editBlueprint.click();
        await this.page.waitForTimeout(2000);
        await this.cartButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        for (let i = 0; i < 1; i++) {
            await checks[i].click()
        }
        await this.addToCart.click();
        await this.page.waitForTimeout(2000);
        await this.saveButton.click();
        await this.page.waitForTimeout(2000);
        await expect(this.saveSuccessMessage).toHaveText("Cart Details updated successfully");
    }

    /**Method to create blueprint */
    async createDraftBluePrint() {
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
        await this.page.waitForTimeout(5000);
        await this.ClickOnBackArrowBtn.click()
        await this.page.waitForTimeout(5000);
        await this.Blueprint.click()
        await this.page.waitForTimeout(2000);
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

    /**
     * 
     */
    async workflowClick() {
        await this.workflowclick.click();
        await this.page.waitForTimeout(2000);
        await this.approveButtonClick.click();
    }

    /**Method to edit blueprint */
    async EditBlueprintQuestion() {

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

        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)
        await this.ClickOnAddCartBtn.click()
        await this.page.waitForTimeout(3000)
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        for (let i = 0; i < 4; i++) {
            await checks[i].click()
        }
        await this.ClickOnToCart.click()
        await this.page.waitForTimeout(3000)
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(5000)
        await this.removeCartButtonClick.click();
        await this.cancelButtonClick.click();
        await this.workflowclick.click();
        await this.page.waitForTimeout(2000);
        await this.approveButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(2000);
        await this.convertToExam.click();
        await this.page.waitForTimeout(2000);

        await this.SELECTBANK.click();
        await this.SELECTBANK.type(testData.TestBank2);
        await this.TESTBANK.click();
        await this.EXAMNAME.type('DEMO' + Math.floor(Math.random() * 899999 + 100000));

        await this.EXAMCODE.type('D' + Math.floor(Math.random() * 89 + 100));

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
        await this.ChooseBookingStartSession.check();
        await this.BookingOK.click();

        await this.ClickOnExamVenue.click();
        await this.ChooseExamVenue.click();
        await this.ClickOnAdd.click();
        await this.EnterNoOfCandidates.click();
        await this.EnterNoOfCandidates.clear();
        await this.EnterNoOfCandidates.type('10');
        await this.ClickOnAdd.click();
        await this.page.waitForTimeout(5000);
        await this.ClickOnNextBtn.click();
    }

    /**Method to edit blueprint with preview */
    async EditBlueprintQuestionwithPreview() {
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)

        await this.ClickOnAddCartBtn.click();
        await this.page.waitForTimeout(3000)
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        //const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        await this.checkBoxClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnToCart.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnCancelButton.click();
        await this.page.waitForTimeout(2000);
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(2000);
        await this.previewButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.previewCloseButtonClick.click();
        await this.page.waitForTimeout(2000)
    }

    /**Method to verify Preview Page */
    async verifyPreviewPage() {
        await this.page.waitForTimeout(5000)
        await expect(this.previewPageTitle).toHaveText("Preview")
        await this.page.waitForTimeout(2000)
    }

    /**Method to remove questions from cart*/
    async removeQutnsFromCart() {
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(10000)

        await this.removeCartButtonClick.click();
        await this.page.waitForTimeout(10000)
        await expect(this.btnAutofill).toBeVisible()
        await expect(this.btnRemoveFromCart).toBeVisible()
        await expect(this.btnCancel).toBeVisible()
        await this.btnAutofill.click()
        await this.page.waitForTimeout(3000)
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        for (let i = 0; i < checks.length; i++) {
            await checks[i].click()
        }
        await this.btnRemoveFromCart.click()
        await expect(this.qutnsRemovedMsgPopup).toHaveText("Question(s) removed from cart")
        await this.page.waitForTimeout(2000)
    }


    /**Method to Delete the blueprint */
    async DeleteBluePrint() {
        await this.clickFirstBluePrint.click();
        await this.page.waitForTimeout(2000);
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(2000);
        await this.DeleteButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.yesButtonClicks.click();
        await this.page.waitForTimeout(2000);
    }

    /**Method to Duplicate the blueprint */
    async DuplicateBluePrint() {
        await this.clickFirstBluePrint.click();
        await this.page.waitForTimeout(2000);
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(2000);
        await this.DuplicateButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.yesButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.submitButtonClick.click();
        await this.page.waitForTimeout(2000);

    }

    /**Method to save as a new version */
    async SaveAsNewVersion() {
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)
        await this.saveDropdownButton.click();
        await this.page.waitForTimeout(2000)
        await this.saveAsNewVersion.click();
        await this.page.waitForTimeout(2000)
        await this.textAreaType.type("New Verison");
        await this.page.waitForTimeout(2000)
        await this.saveClick.click();
        await this.page.waitForTimeout(2000)
        await expect(this.saveNewVersionSuccessMessage).toHaveText("Blueprint has been saved as new version");
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

    }





}