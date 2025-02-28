import test from '@lib/BaseTest';
import { EluminaIGLiveMonitorPage } from '@pages/EluminaIGLiveMonitorPage';
import { testConfig } from '../../testConfig';

/** Validation of Invigilator marks attendance for All candidates */

test(`iEX_TC_ID_152. @iExamRegression Verify Invigilator marks attendance for All candidates`, async ({ eluminaInvPage, webActions }) => {
    await test.step('Invigilator logging into application', async () => {
        await eluminaInvPage.invigilatorLogin();
    });

    await test.step('Invigilator marks attendance for all candidate', async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        await newtab.ClickOnExamLink();
        await newtab.markAllAttendance();
        //await newtab.isPresentYes();

    });
});