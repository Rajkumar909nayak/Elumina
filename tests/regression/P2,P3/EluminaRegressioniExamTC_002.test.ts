import test from '@lib/BaseTest';

/**Validation of Client Logo and name, color, font size and font type of different elements in the login page*/


test(`iEX_TC_ID_3. @LowPriorityiExamCases Validation of Client Logo and name, color, font size and font type of different elements in the login page`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Click on Login without Username and Password`, async () => {
        await eluminaCandPage.validationOfLogoInCand();
    });
});

test('iEX_TC_ID_5. @LowPriorityiExamCases Verify Validation of User Id Field', async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step('Candiate enter the Password and click on Login button', async () => {
        await eluminaCandPage.candidateUserNamePopUp();
    });
});

test('iEX_TC_ID_6. @LowPriorityiExamCases Verify Validation of Password popup Field', async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step('Candiate enter the Password and click on Login button', async () => {
        await eluminaCandPage.candidatePasswordPopUp();
    });
});