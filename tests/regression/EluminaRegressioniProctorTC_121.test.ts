import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';

//Validation of Proctoring Exam Event > Candidate Authentication Fail

test(` iProc_TC_ID_115. @iProctorRegression Validation of Proctoring Exam Event > Candidate Authentication Fail`, async ({ eluminaCandPage, eluminaProctorCand, webActions }) => {
    await test.step('Candidate logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplication();
    });

    await test.step('Invigilator  logging into Application', async () => {
        await eluminaProctorCand.clickOnAllLinkForDiffExamZone();
    });

});