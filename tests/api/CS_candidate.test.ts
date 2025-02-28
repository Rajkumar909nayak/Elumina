//import { APIActions } from '@lib/APIActions';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { jsonObject } from 'pageFactory/pageRepository/candidateApiPage';
import { ValidationResponse } from '../../utils/validationUtiles/ResponseValidation';

const JSEncrypt = require('node-jsencrypt');
let utcTime;

function apiKeyEncrypt(): string {
    var utcTime = new Date();
    let currentTime = utcTime.getUTCFullYear() + "-" + (utcTime.getUTCMonth() + 1) + "-" + utcTime.getUTCDate() + " " + utcTime.getUTCHours() + ":" + utcTime.getUTCMinutes() + ":" + utcTime.getUTCSeconds()
    // Define the public key (replace with your actual public key)
    const publicKey = "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCazzOD7DHaA1JQugT5Mp44jKaT\nHsGb0nlticr1dUhzRx4pK1rdF9DLDiBIVXWeBqGZQtM/Tgc+aRu7HGPbXtRji+id\nl7A+RqchjpFQkyoJQRrsW+I7oFJLqxa7AFFC6JfIAVgs0LyM0gxdC+mAkwX8yS8L\nvRAle6cPopmgeefUjQIDAQAB\n-----END PUBLIC KEY-----";
    // Data to encrypt
    const dataToEncrypt = '482B4D6251655468576D5A7133743677397A24432646294A404E635266556A58' + '*' + currentTime;

    //Create a new instance of JSEncrypt
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);  //2024-04-25 09:59:46   2024-3-25 10:23:31   2024-04-25 10:25:25

    // Encrypt the data
    let encryptedData = encryptor.encrypt(dataToEncrypt).toString();
    console.log('Encrypted data:', encryptedData, "and", currentTime, "and", typeof currentTime);
    return encryptedData;
}
const Ajv = require('ajv')
const avj = new Ajv()

let verifyResponse = new ValidationResponse;
let candidatetoken;
var jsonpath;
var jschemasonpath;
export let activeExamID;
export let activeSessionID;
export let pageID;
export let examIdInvCheck;
export let sectionIdInvCheck;
export let pageIdInvCheck;
export let questionIdInvcheck;
//verifyResponse: ValidationResponse;
jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
const baseURL = jsonpath.url

test("CS_001. @API Candidate Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v2/candidate/login',
        {
            data: jsonpath.candidateLogin.body,
            headers: jsonpath.candidateLogin.header
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    candidatetoken = res.data.access_token
    activeExamID = res.data.activeExams[0].examId
    activeSessionID = res.data.activeExams[0].sessionId
    //Verify Response Payload
    console.log("Access token is:", candidatetoken, " and Exam ID is:", activeExamID, " and Session ID is:", activeSessionID)
    expect(await res.data.message).toEqual("Login Successful")

    //Schema validation
    // const schema = jschemasonpath
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()

})

test("CS_013. @API candidate dashboard Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/dashboard',
        {
            data: jsonObject.candidateDashboard,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": candidatetoken
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_002. @API Canidate Login endpoint validation", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/IGScommon/v3/authenticationservice/v2/candidate/login',
        {
            data: jsonpath.candidateLogin.body,
            headers: jsonpath.candidateLogin.header
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);
    expect(response.statusText()).toBe("Not Found");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

})

test("CS_003. @API Canidate Login-Method validation-  incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/common/v3/authenticationservice/v2/candidate/login')
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);
    expect(response.statusText()).toBe("Method Not Allowed");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

})

test("CS_004. @API Canidate Login Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v2/candidate/login',
        {
            data: jsonpath.candidateLogin.body,
            headers: jsonpath.candidateLogin.invalidheader
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

})

test("CS_005. @API Canidate Login Header field validation - empty", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v2/candidate/login',
        {
            data: jsonpath.candidateLogin.body,
            headers: jsonpath.candidateLogin.emptyheader
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

})

test("CS_006. @API Canidate Login Username validation- invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v2/candidate/login',
        {
            data: jsonpath.candidateLogin.invaliUsernamebody,
            headers: jsonpath.candidateLogin.header
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(400);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.data.message).toEqual("Invalid User Id and Password.")
})

test("CS_007. @API Canidate Login Username validation - empty", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v2/candidate/login',
        {
            data: jsonpath.candidateLogin.emptyUseramebody,
            headers: jsonpath.candidateLogin.header
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(400);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.data.message).toEqual("Invalid User Id and Password.")
})

test("CS_008. @API Canidate Login Password validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v2/candidate/login',
        {
            data: jsonpath.candidateLogin.invalidPasswordbody,
            headers: jsonpath.candidateLogin.header
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(400);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.data.message).toEqual("Invalid User Id and Password.")
})

test("CS_009. @API Canidate Login Password validation- empty", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v2/candidate/login',
        {
            data: jsonpath.candidateLogin.emptyPasswordbody,
            headers: jsonpath.candidateLogin.header
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(400);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.data.message).toEqual("Invalid User Id and Password.")
})

test("CS_011. @API candidate dashboard endpoint validation", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/IGSiexam/candidate-api/v2/candidate/dashboard',
        {
            data: jsonObject.candidateDashboard,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_012. @API candidate dashboard Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/candidate/dashboard');

    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})
test("CS_001A. @API Candidate Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v2/candidate/login',
        {
            data: jsonpath.candidateLogin.body,
            headers: jsonpath.candidateLogin.header
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    candidatetoken = res.data.access_token
    activeExamID = res.data.activeExams[0].examId
    activeSessionID = res.data.activeExams[0].sessionId

    //Verify Response Payload
    console.log("Access token is:", candidatetoken, " and Exam ID is:", activeExamID, " and Session ID is:", activeSessionID)
    expect(await res.data.message).toEqual("Login Successful")


    //Schema validation
    // const schema = jschemasonpath
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()

})

test("CS_010. @API Validate candidate dashboard.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/dashboard',
        {
            data: jsonObject.candidateDashboard,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")
})

test("CS_014. @API candidate dashboard Header field validation - empty", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/dashboard',
        {
            data: jsonObject.candidateDashboard,
            headers: {
                "accept": "application/json",
                "webreferer": "",
                "authorization": candidatetoken
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_001B. @API Candidate Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v2/candidate/login',
        {
            data: jsonpath.candidateLogin.body,
            headers: jsonpath.candidateLogin.header
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    candidatetoken = res.data.access_token
    activeExamID = res.data.activeExams[0].examId
    activeSessionID = res.data.activeExams[0].sessionId
    //Verify Response Payload
    console.log("Access token is:", candidatetoken, " and Exam ID is:", activeExamID, " and Session ID is:", activeSessionID)
    expect(await res.data.message).toEqual("Login Successful")
    //Schema validation
    // const schema = jschemasonpath
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()

})

test("CS_010A. @API Validate candidate dashboard.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/dashboard',
        {
            data: jsonObject.candidateDashboard,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")
})

test("CS_015. @API Validation of successful message for invigilator password.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/checkInvigilatorPassword',
        {
            data: {
                "examId": activeExamID,
                "sessionId": activeSessionID,
                "password": "eyJjdCI6IjRONlFEc2FYZ3k2L2RvZGVuZDBFRWc9PSIsIml2IjoiNTJlNjIyYTYyZGY1MmUxOWNmMmM4MmM4NTRhZDRjZmYiLCJzIjoiMjg5NmZkYTk3MTMzNmFhYiJ9",
                "preview": 0,
                "timestamp": "2024-2-28 10:7:12.400"
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
                //'X-Exam-Signature': 'your_signature_here'
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")
    pageID = res.data.afterSubmits.exam.pageId
    examIdInvCheck = res.data.examId
    sectionIdInvCheck = res.data.pages.parts[0].data[0].sectionId
    pageIdInvCheck = res.data.pages.parts[0].data[0].pageId
    questionIdInvcheck = res.data.pages.parts[0].data[0].questionId
    console.log("PageID:", pageID, "and examidinv:", examIdInvCheck, "and sectionidinv:", sectionIdInvCheck, "and pageIdInvCheck:", pageIdInvCheck, "and questionIdCheck:", questionIdInvcheck)
})

test("CS_016. @API Validation of invalid invigilator password.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/checkInvigilatorPassword',
        {
            data: {
                "examId": activeExamID,
                "sessionId": activeSessionID,
                "password": "eyJjdCI6IlRRK1hvczhRUWwwV0NGd3NXYVZxZ1E9PSIsIml2IjoiMTgxMjMyYWFiZGNhMjA4NGRjNDQwNWJlMjM4MDBkOTQiLCJzIjoiMzliYWViYTE4MWM1YWNmOCJ9IGS",
                "preview": 0,
                "timestamp": "2023-8-7 13:25:8.300"
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),

            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(400);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_017. @API Validation of empty invigilator password.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/checkInvigilatorPassword',
        {
            data: {
                "examId": activeExamID,
                "sessionId": activeSessionID,
                "password": "",
                "preview": 0,
                "timestamp": "2023-8-7 13:25:8.300"
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),

            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(400);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_001C. @API Candidate Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v2/candidate/login',
        {
            data: jsonpath.candidateLogin.body,
            headers: jsonpath.candidateLogin.header
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    candidatetoken = res.data.access_token
    activeExamID = res.data.activeExams[0].examId
    activeSessionID = res.data.activeExams[0].sessionId
    //Verify Response Payload
    console.log("Access token is:", candidatetoken, " and Exam ID is:", activeExamID, " and Session ID is:", activeSessionID)
    expect(await res.data.message).toEqual("Login Successful")
    //Schema validation
    // const schema = jschemasonpath
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()

})

test("CS_010B. @API Validate candidate dashboard.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/dashboard',
        {
            data: jsonObject.candidateDashboard,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")
})

test("CS_015A. @API Validation of successful message for invigilator password.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/checkInvigilatorPassword',
        {
            data: {
                "examId": activeExamID,
                "sessionId": activeSessionID,
                "password": "eyJjdCI6IlRRK1hvczhRUWwwV0NGd3NXYVZxZ1E9PSIsIml2IjoiMTgxMjMyYWFiZGNhMjA4NGRjNDQwNWJlMjM4MDBkOTQiLCJzIjoiMzliYWViYTE4MWM1YWNmOCJ9",
                "preview": 0,
                "timestamp": "2023-8-7 13:25:8.300"
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),

            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")
    pageID = res.data.afterSubmits.exam.pageId
    examIdInvCheck = res.data.examId
    sectionIdInvCheck = res.data.pages.parts[0].data[0].sectionId
    pageIdInvCheck = res.data.pages.parts[0].data[0].pageId
    questionIdInvcheck = res.data.pages.parts[0].data[0].questionId
    console.log("PageID:", pageID, "and examidinv:", examIdInvCheck, "and sectionidinv:", sectionIdInvCheck, "and pageIdInvCheck:", pageIdInvCheck, "and questionIdCheck:", questionIdInvcheck)
})

test("CS_018. @API Validation of Candiate Exam status- Before exam start", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/candidateSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/checkexamstatus',
        {
            data: jsonObject.beforeExamStart,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")

    //Schema validation
    const schema = jschemasonpath.beforeExamStartStatus
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("CS_019. @API Before exam star-Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/candidate/checkexamstatus',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_020. @API Validation of Candiate Exam status- After exam start", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/candidateSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/checkexamstatus',
        {
            data: jsonObject.afterExamStart,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")

    //Schema validation
    const schema = jschemasonpath.afterExamStartStatus
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("CS_021. @API After exam star-Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/candidate/checkexamstatus',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_024. @API Validation of Candiate info.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/candidateSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/info',
        {
            data: jsonObject.candidateInfo,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")

    //Schema validation
    const schema = jschemasonpath.candidateInfo
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("CS_025. @API  Candiate info-Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/iexam/candidate-api/v2/candidate/info',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_026. @API  Candiate info-endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/IGSiexam/candidate-api/v2/candidate/info',
        {
            data: jsonObject.candidateInfo,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_027. @API Validation of candidate events.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/candidateSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/proctoring-api/v1/candidate/events',
        {
            data: {
                "event": "dashboard_accessed",
                "sessionId": activeSessionID,
                "examId": activeExamID,
                "preview": 0,
                "timestamp": null
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.response).toEqual("success")

    //Schema validation
    const schema = jschemasonpath.candidateEvents
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("CS_028. @API candidate events-Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/proctoring-api/v1/candidate/events',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_029. @API candidate events-endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/IGSproctoring-api/v1/candidate/events',
        {
            data: jsonObject.candidateEvents,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_030. @API Validation of candidate instruction.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/candidateSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/instruction',
        {
            data: {
                "event": "dashboard_accessed",
                "sessionId": activeSessionID,
                "examId": activeExamID,
                "preview": 0,
                "timestamp": null
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")

    //Schema validation
    const schema = jschemasonpath.candidateInstruction
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("CS_031. @API  candidate instruction-Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/candidate/instruction',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_032. @API  candidate instruction-endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/IGSiexam/candidate-api/v2/candidate/instruction',
        {
            data: jsonObject.candidateInstruction,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_033. @API Validation of download exam content page.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/candidateSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/content/page',
        {
            data: {
                "examId": activeExamID,
                "sessionId": activeSessionID,
                "pageId": pageID,
                "type": "content",
                "preview": 0
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")

    //Schema validation
    const schema = jschemasonpath.downloadExamContentPage
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("CS_034. @API exam content page-Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/candidate/content/page',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_035. @API exam content page-endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/IGSiexam/candidate-api/v2/candidate/content/page',
        {
            data: jsonObject.downloadExamContentPage,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt(),
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_036. @API Validation of Candidate exam page download.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/candidateSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/exam/page',
        {
            data: {
                "examId": activeExamID,
                "sessionId": activeSessionID,
                "pageId": pageID,
                "sectionType": "exam",
                "location": 0,
                "preview": 0
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")

    // //Schema validation
    // const schema = jschemasonpath.candidateExamPageDownload
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()
})

test("CS_037. @API  Candidate exam page download-Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/candidate/exam/page',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_038. @API  Candidate exam page download-endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/IGSiexam/candidate-api/v2/candidate/exam/page',
        {
            data: jsonObject.candidateExamPageDownload,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_039. @API Validation of candidate all notes.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/candidateSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/getallnotes',
        {
            data: {
                "examId": activeExamID,
                "sessionId": activeSessionID,
                "preview": 0
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")

    //Schema validation
    const schema = jschemasonpath.getAllNotes
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})


test("CS_040. @API candidate all notes-Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/candidate/getallnotes',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_041. @API candidate all notes-endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/IGSiexam/candidate-api/v2/candidate/getallnotes',
        {
            data: jsonObject.candidateAllNotes,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_042. @API Validation of question download status.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/candidateSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/questionDownloadStatus',
        {
            data: {
                "examId": activeExamID,
                "sessionId": activeSessionID,
                "sectionType": "content",
                "preview": 0,
                "questionStatusSlug": "downloading"
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")

    //Schema validation
    const schema = jschemasonpath.questionDownloadStatus
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("CS_043. @API question download status-Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/candidate/questionDownloadStatus',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_044. @API question download status-endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/IGSiexam/candidate-api/v2/candidate/questionDownloadStatus',
        {
            data: jsonObject.questionsDownloadStatus,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_045. @API Validation of candidate save notes.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/candidateSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/savenotes',
        {
            data: {
                "examId": examIdInvCheck,
                "sessionId": activeSessionID,
                "sectionId": sectionIdInvCheck,
                "questionId": questionIdInvcheck,
                "notes": "Testing for candiate notes",
                "uploaded": false,
                "preview": 0
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")

    //Schema validation
    const schema = jschemasonpath.candidateSaveNotes
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("CS_046. @API candidate save notes-Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/candidate/savenotes',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_047. @API candidate save notes-endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/IGSiexam/candidate-api/v2/candidate/savenotes',
        {
            data: jsonObject.candidateSaveNotes,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_048. @API Validaton of Save highlight text.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/candidateSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/savehighlight',
        {
            data: {
                "highlightedText": "<p>&nbsp;Many deskto<span class=\"highlighted\" data-timestamp=\"1691471552986\" style=\"background-color: rgb(255, 255, 123);\" data-highlighted=\"true\">p publishing packages and web page </span>editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>",
                "slug": "text",
                "questionId": questionIdInvcheck,
                "sessionId": activeSessionID,
                "pageId": pageID,
                "examId": examIdInvCheck,
                "preview": 0
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")

    //Schema validation
    const schema = jschemasonpath.saveHighlightNotes
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("CS_049. @API Save highlight text-Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/candidate/savehighlight',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_050. @API Save highlight text-endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/IGSiexam/candidate-api/v2/candidate/savehighlight',
        {
            data: jsonObject.saveHighlightnoyes,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_051. @API Validaton of remove saved highlight text.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/candidateSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/removehighlight',
        {
            data: {
                "pageId": pageID,
                "examId": activeExamID,
                "preview": 0
            }
            ,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")

    //Schema validation
    const schema = jschemasonpath.removeHighlight
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("CS_052. @API remove saved highlight text-Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/candidate/removehighlight',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_053. @API remove saved highlight text-endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/IGSiexam/candidate-api/v2/candidate/removehighlight',
        {
            data: jsonObject.removeHighlight,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_054. @API Validation of Exam survey page.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/survey/page',
        {
            data: {
                "examId": activeExamID,
                "sessionId": activeSessionID,
                "pageId": pageID,
                "type": "survey",
                "preview": 0
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_055. @API Exam survey page-Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/candidate/survey/page',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_056. @API Exam survey page-endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/IGSiexam/candidate-api/v2/candidate/survey/page',
        {
            data: {
                "examId": activeExamID,
                "sessionId": activeSessionID,
                "pageId": pageID,
                "type": "survey",
                "preview": 0
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_057. @API Validation of Exam Practice Result", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/candidateSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/exam/result',
        {
            data: {
                "examId": activeExamID,
                "sessionId": activeSessionID,
                "preview": 0,
                "timestamp": "2023-8-8 6:30:14.700"
            }
            ,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")

    //Schema validation
    // const schema = jschemasonpath.removeHighlight
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()
})

test("CS_058. @API  Exam Practice Result-Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/candidate/exam/result',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_059. @API  Exam Practice Result-endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/IGSiexam/candidate-api/v2/candidate/exam/result',
        {
            data: jsonObject.practiceExamResult,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_060. @API Validation of Exam Practice Question Result", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/candidateSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/candidate/exam/page/result',
        {
            data: {
                "examId": activeExamID,
                "sessionId": activeSessionID,
                "pageId": pageID,
                "type": "exam",
                "preview": 0
            }
            ,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")

    //Schema validation
    // const schema = jschemasonpath.removeHighlight
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()
})

test("CS_061. @API Exam Practice Question Result-Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/candidate/exam/page/result',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_062. @API Exam Practice Question Result-endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/IGSiexam/candidate-api/v2/candidate/exam/page/result',
        {
            data: jsonObject.practiceQuestionResultPage,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_066. @API Validation of Candidate question response save.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/candidateSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/questionresponsesave',
        {
            data: {
                "examId": activeExamID,
                "sessionId": activeSessionID,
                "syncSource": "API",
                "data": [
                    {
                        "examId": activeExamID,
                        "sessionId": activeSessionID,
                        "syncType": "response",
                        "pageId": pageIdInvCheck,
                        "questionId": 432,
                        "queNo": 1,
                        "questionStatus": 4,
                        "timestamp": "2023-11-30 8:11:25.600",
                        "data": 2540,
                        "sectionType": "exam",
                        "preview": 0
                    }
                ],
                // "token": "KJKk8kIGqY2sEImtmNkIEVeaCTtrrhiI",
                "candidateId": "2012322"
            }
            ,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("success")

    //Schema validation
    // const schema = jschemasonpath.removeHighlight
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()
})

test("CS_067. @API Candidate question response save-Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/questionresponsesave',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_068. @API Candidate question response save-endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/IGSiexam/candidate-api/v2/questionresponsesave',
        {
            data: jsonObject.questionResponseSave,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    console.log(await response.json())
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_069. @API Validation of candidate current time.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/current-datetime',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("currentUTC")
})

test("CS_070. @API candidate current time-endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/IGSiexam/candidate-api/v2/current-datetime',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})

test("CS_071. @API Validation of candidate chat setting.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/chat-settings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("CS_072. @API candidate chat setting endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/IGSiexam/candidate-api/v2/chat-settings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": candidatetoken,
                "X-Exam-Signature": apiKeyEncrypt()
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonObject.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
})













