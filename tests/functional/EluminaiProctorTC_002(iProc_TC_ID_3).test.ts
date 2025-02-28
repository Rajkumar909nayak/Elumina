import test from '@lib/BaseTest';
import { chromium } from '@playwright/test';

//Validation of Candidate App URL, Login Page 

test(`iProc_TC_ID_3. @Smoke Verify CandidatesInvExam`, async ({ eluminaCadInvPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplicationsByEnteringUsername(2);
        //await eluminaCadInvPage.logoutClick();
    });
});