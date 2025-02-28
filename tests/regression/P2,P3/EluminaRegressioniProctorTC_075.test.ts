import test1 from '@lib/Fixtures';
import test from '@lib/BaseTest';
import { chromium } from '@playwright/test';
const devTestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/dev/testData.json')));
const p7TestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/p7/testData.json')));
const productionTestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/production/testData.json')));
const qaTestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/qa/testData.json')));
const sandboxTestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/sandbox/testData.json')));
const stagingTestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/staging/testData.json')));

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

//Validation of Microphone Troubleshoot link validation.     

test(` iProc_TC_ID_144A. @LowPriorityiProctorCases Validation of Microphone Troubleshoot link validation.`, async ({ eluminaProctorCand, webActions }) => {
    await test.step('Candidate logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications(2);

    });

    await test.step('Invigilator  logging into Application', async () => {
        await eluminaProctorCand.clickOnStartExamLink();
        await eluminaProctorCand.clickOnUnderstandBtn();
        await eluminaProctorCand.troubleshootMicroPhone();
    });

});

test1(` iProc_TC_ID_144B. @LowPriorityiProctorCases Validation of Microphone Troubleshoot link`, async ({ eluminaProctorCand, webActions }) => {
    await test1.step('Candidate logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications(2);
    });
    await test1.step('Invigilator  logging into Application', async () => {
        await eluminaProctorCand.clickOnAllLink();
    });
});