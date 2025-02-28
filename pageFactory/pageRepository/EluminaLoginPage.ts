import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
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

export class EluminaLoginPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly HOMEPAGE: Locator;
    readonly AUTHOR: Locator;
    readonly EXAMSMENU: Locator;
    readonly InactiveUseralert: Locator;
    readonly RatelimitLogin: Locator;
    readonly UsernameAlert: Locator;
    readonly PasswordAlert: Locator;
    readonly EmptyFieldsAlert: Locator;
    readonly checklogo: Locator;
    readonly txtLogin: Locator;
    readonly txtUserIdPlaceholder: Locator;
    readonly txtPassword: Locator;
    readonly Forgot_Password: Locator;
    readonly InvaildUsernamePwd: Locator;
    readonly ClickOnForgotPswd: Locator;
    readonly ValidateErrorMessageInForgotPswd: Locator;
    readonly ClickonContinueBtn: Locator;
    readonly OfflineMessage: Locator;
    readonly sessionExpireMsg: Locator;
    readonly uneditableEmailTxt: Locator;
    readonly clickOnEditIcon: Locator;
    readonly verifyForgotPswTitle: Locator;



    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.USERNAME_EDITBOX = page.locator('(//input)[1]');
        this.PASSWORD_EDITBOX = page.locator('(//input)[2]');
        this.LOGIN_BUTTON = page.locator('//*[@class="submit-butn"]');
        this.HOMEPAGE = page.locator('//*[@title="Question Management System"]');
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.EXAMSMENU = page.locator('//a[text()="Exams"]')
        this.InactiveUseralert = page.locator('//div[text()="Your account has been deactivated, Kindly contact your system administrator to activate your account."]');
        this.RatelimitLogin = page.locator('//div[text()="Attempts exceeded the Limit"]');
        this.UsernameAlert = page.locator('//div[text()="Please enter username"]');
        this.PasswordAlert = page.locator('//div[text()="Please enter password"]');
        this.EmptyFieldsAlert = page.locator('//div[text()="Please enter user credentials"]');
        this.checklogo = page.locator('//div[@class="logo-container"]//div[@class="logo"]');
        this.txtLogin = page.locator('(//div[text()="Login"])[1]');
        this.txtUserIdPlaceholder = page.locator('//label[text()="Username"]')
        this.txtPassword = page.locator('//label[text()="Password"]');
        this.Forgot_Password = page.locator('//a[@class="forgot-pwd"]');
        this.InvaildUsernamePwd = page.locator('//div[text()="Invalid username or password."]');
        this.ClickOnForgotPswd = page.locator('//a[@class="forgot-pwd"]')
        this.ValidateErrorMessageInForgotPswd = page.locator('//div[contains(text(),"Please enter a valid Email ID")]')
        this.ClickonContinueBtn = page.locator('//div[@class="submit-btn"]')
        this.OfflineMessage = page.locator('//div[text()="You are offline!"]')
        this.sessionExpireMsg = page.locator('//div[@class="message-txt"]');
        this.uneditableEmailTxt = page.locator('(//div[@class="input-group"]//input)[1]');
        this.clickOnEditIcon = page.locator('//span[@class="editIcon"]');
        this.verifyForgotPswTitle = page.locator('//div[text()="Forgot Password"]')


    }

    /**Navigate to login URL */
    async navigateToURL(): Promise<void> {
        //await this.page.goto("/");
        await this.page.goto(stagingTestData.baseURL);
    }

    async enterModuleURL() {
        await this.page.goto(testData.ModuleURL);
        if ((await this.sessionExpireMsg.textContent()) == ("Session expired. Please login again")) {
            await this.loginToApplication()
            await expect(this.AUTHOR).toHaveText("iAuthor")
        }
        else {
            await expect(this.AUTHOR).toHaveText("iAuthor")
            await this.AUTHOR.click();
        }

    }

    async enterDashboardURL() {
        await this.page.goto(testData.DashboardURL);
        if ((await this.sessionExpireMsg.textContent()) != ("Session expired. Please login again")) {
            await this.loginToApplication()
            await this.page.waitForTimeout(15000);
            await expect(this.EXAMSMENU).toHaveText("Exams")
        }
        else {
            await expect(this.EXAMSMENU).toHaveText("Exams")
            await this.EXAMSMENU.click();
        }

    }

    /**Navigate to login URL Offline*/
    async navigateToURLOffline(): Promise<void> {
        await this.page.goto("/");
        await this.context.setOffline(true)
    }

    /**Navigate to Login Application */
    async loginToApplication(): Promise<void> {
        //const decipherPassword = await webActions.decipherPassword();
        await this.USERNAME_EDITBOX.fill(testData.UserEmail);
        await this.PASSWORD_EDITBOX.fill(testData.UserPassword);
        await this.LOGIN_BUTTON.click();
    }

    /**Navigate to Login Application */
    async loginToApplicationAsReviewer(): Promise<void> {
        //const decipherPassword = await webActions.decipherPassword();
        await this.USERNAME_EDITBOX.fill(testData.ReviewerUserID);
        await this.PASSWORD_EDITBOX.fill(testData.ReviewerPassword);
        await this.LOGIN_BUTTON.click();
    }

    /**Method to validate popup message */
    async validationOfOfflineMessage() {
        await expect(this.OfflineMessage).toBeVisible()
    }

    /**Method to validate Forgot Password */
    async clickOnForgotPassword() {
        await this.ClickOnForgotPswd.click()
        await this.USERNAME_EDITBOX.fill(testData.InvalidAdminUserEmail);
        await this.ClickonContinueBtn.click();
        await expect(this.ValidateErrorMessageInForgotPswd).toBeVisible()

    }

    /**Method to validate Forgot Password */
    async Validation_of_Forgot_Password_Email() {
        await this.ClickOnForgotPswd.click()
        await this.USERNAME_EDITBOX.fill(testData.InvalidAdminUserEmail);
        await this.ClickonContinueBtn.click();
        await expect(this.uneditableEmailTxt).toBeVisible();
        await this.clickOnEditIcon.click();
        await expect(this.verifyForgotPswTitle).toBeVisible()

    }

    /**Navigate to Login Application with password masked*/
    async loginToApplicationwithpasswordMasked(): Promise<void> {
        await this.USERNAME_EDITBOX.fill(testData.UserEmail);
        await this.PASSWORD_EDITBOX.fill(testData.UserPassword);
        await this.LOGIN_BUTTON.click();
        console.log("User can see that password has been masked!!")
    }
    /**Navigate to Login Application */
    async loginToApplicationwithInactiveId(): Promise<void> {
        //const decipherPassword = await webActions.decipherPassword();
        await this.USERNAME_EDITBOX.fill(testData.InactiveUsername);
        await this.PASSWORD_EDITBOX.fill(testData.InactivePassword);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        await this.InactiveUseralert.isVisible();
        console.log(await this.InactiveUseralert.textContent());
        await expect(this.InactiveUseralert).toHaveText("Your account has been deactivated, Kindly contact your system administrator to activate your account.");
    }

    /**Navigate to Login Application */
    async Rateloginattemptcheck(): Promise<void> {
        //const decipherPassword = await webActions.decipherPassword();
        for (let i = 1; i < 4; i++) {
            await this.USERNAME_EDITBOX.clear();
            await this.USERNAME_EDITBOX.fill(testData.UserEmail);
            await this.PASSWORD_EDITBOX.clear();
            await this.PASSWORD_EDITBOX.fill(testData.InactivePassword);
            await this.LOGIN_BUTTON.click();
        }
        await this.RatelimitLogin.isVisible();
        console.log(await this.RatelimitLogin.textContent());
    }

    /**Navigate to Login Application */
    async RateloginattemptcheckAsAdmin(): Promise<void> {
        //const decipherPassword = await webActions.decipherPassword();
        for (let i = 1; i <= 4; i++) {
            await this.USERNAME_EDITBOX.clear();
            await this.USERNAME_EDITBOX.fill(testData.InvalidAdminUsername);
            await this.PASSWORD_EDITBOX.clear();
            await this.PASSWORD_EDITBOX.fill(testData.InvalidAdminPassword);
            await this.LOGIN_BUTTON.click();
        }
        await this.RatelimitLogin.isVisible();
        console.log(await this.RatelimitLogin.textContent());
    }

    /**Method to Verify Profile page */
    async verifyProfilePage(): Promise<void> {
        await this.page.waitForTimeout(3000);
        await expect(this.HOMEPAGE).toBeVisible();
    }

    /**Method to Login to Asses app with empty feilds*/
    async logintoAppwithEmptyfields(): Promise<void> {
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(3000);
        await this.EmptyFieldsAlert.isVisible();
        console.log(await this.EmptyFieldsAlert.textContent());
    }

    /**Navigate to Login Application without username */
    async loginToApplicationwithoutUsername(): Promise<void> {
        await this.PASSWORD_EDITBOX.fill(testData.UserPassword);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        await this.UsernameAlert.isVisible();
        console.log(await this.UsernameAlert.textContent());
    }

    /**Navigate to Login Application without password */
    async loginToApplicationwithoutPassword(): Promise<void> {
        await this.USERNAME_EDITBOX.fill(testData.UserEmail);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        await this.PasswordAlert.isVisible();
        console.log(await this.PasswordAlert.textContent());
    }

    /**Method to validation of client logo */
    async validationOfLogo() {
        await expect(this.checklogo).toBeVisible();
        console.log(await this.checklogo.textContent());
        await expect(this.checklogo).toHaveCSS('display', 'inline-block');
        console.log("Login page title:", await this.txtLogin.textContent());
        await expect(this.txtLogin).toHaveCSS('font-size', '24px');
        console.log("User Id Placeholder:", await this.txtUserIdPlaceholder.textContent());
        console.log("Password Placeholder:", await this.txtPassword.textContent());
        console.log("Forgot Password:", await this.Forgot_Password.textContent());
        console.log("Login button:", await this.LOGIN_BUTTON.textContent());
        await expect(this.LOGIN_BUTTON).toHaveCSS('background-color', 'rgb(66, 133, 244)');
    }

    /**Navigate to Login Application with invaild username */
    async loginToApplicationwithInvaildUsername(): Promise<void> {
        await this.USERNAME_EDITBOX.fill(testData.UserEmail);
        await this.PASSWORD_EDITBOX.fill(testData.InvalidAdminPassword);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        await this.InvaildUsernamePwd.isVisible();
        console.log(await this.InvaildUsernamePwd.textContent());
        await expect(this.InvaildUsernamePwd).toHaveText("Invalid username or password.");
    }

    /**Navigate to Login Application with invaild username */
    async loginToApplicationwithInvaildPassword(): Promise<void> {
        await this.USERNAME_EDITBOX.fill(testData.InvalidAdminUsername);
        await this.PASSWORD_EDITBOX.fill(testData.UserPassword);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        await this.InvaildUsernamePwd.isVisible();
        console.log(await this.InvaildUsernamePwd.textContent());
        await expect(this.InvaildUsernamePwd).toHaveText("Invalid username or password.");
    }

    /**Navigate to Login Application */
    async loginToApplicationWithApprover(): Promise<void> {
        //const decipherPassword = await webActions.decipherPassword();
        await this.USERNAME_EDITBOX.fill(testData.ApproverUsername);
        await this.PASSWORD_EDITBOX.fill(testData.ApproverPassword);
        await this.LOGIN_BUTTON.click();
    }

    /**Navigate to Login Application */
    async loginToApplicationWithMarker(): Promise<void> {
        //const decipherPassword = await webActions.decipherPassword();
        await this.USERNAME_EDITBOX.fill(testData.MarkerUsername);
        await this.PASSWORD_EDITBOX.fill(testData.MarkerPassword);
        await this.LOGIN_BUTTON.click();
    }

    /**Navigate to Login Application */
    async loginToApplicationWithReviwerer(): Promise<void> {
        //const decipherPassword = await webActions.decipherPassword();
        await this.USERNAME_EDITBOX.fill(testData.ReviewerUserID);
        await this.PASSWORD_EDITBOX.fill(testData.ReviewerPassword);
        await this.LOGIN_BUTTON.click();
    }
}