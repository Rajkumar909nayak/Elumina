import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';

export let zephyrTc = test.afterEach("@API zephyr testcase updation", async ({ request }, testInfo) => {
    let zephyrData = JSON.parse(fs.readFileSync(path.resolve('utils/api/zephyr_Integration_Data.json'), 'utf-8'))
    const testcaseTitle = testInfo.title
    const testcaseId = testcaseTitle.split('. ')[0].toString();
    let testcasestatus = testInfo.status
    let tc_status = '';
    if (testcasestatus == "passed") {
        tc_status = "Pass"
    }
    else if (testcasestatus == "failed") {
        tc_status = "Fail"
    }
    console.log("title is-", testcaseTitle, " and status is-", testcasestatus, " and id is-", testcaseId)
    const response = await request.post('https://api.zephyrscale.smartbear.com/v2/testexecutions',
        {
            data: {
                "projectKey": zephyrData.projectKey,
                "testCaseKey": testcaseId,
                "testCycleKey": zephyrData.testCycleKey,
                "statusName": tc_status
            },
            headers: {
                "accept": "application/json",
                "webreferer": zephyrData.webreferer,
                'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb250ZXh0Ijp7ImJhc2VVcmwiOiJodHRwczovL2VsdW1pbmFlbGVhcm5pbmcuYXRsYXNzaWFuLm5ldCIsInVzZXIiOnsiYWNjb3VudElkIjoiNWViOTJlMTBjNWM2MjMwYmFhNWFlMjNiIn19LCJpc3MiOiJjb20ua2Fub2FoLnRlc3QtbWFuYWdlciIsInN1YiI6ImE1M2Q4NDA3LWZhNDEtMzU5Yi04YTU0LTdlOTAwOTkwYjc5YyIsImV4cCI6MTczODQwMTQ2MSwiaWF0IjoxNzA2ODY1NDYxfQ.Q3JtUnjus06TiFSL1Cu22uCx8QNjGoGkG5Vjv2RG7uk',
            }
        });
    console.log(response)
});