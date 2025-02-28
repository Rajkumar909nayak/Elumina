//import { APIActions } from '@lib/APIActions';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
//import { token } from './adminToken.test';
import { ValidationResponse } from '../../utils/validationUtiles/ResponseValidation';
import { jsonObject } from '@pages/api_questionPage';

let verifyResponse = new ValidationResponse;

//const apiActions = new APIActions();

const Ajv = require('ajv')
const avj = new Ajv()

//var token;
var jsonpath;
var jsonpath1;
var mcqID: any;
var schemajsonpath;

export let token;
var jschemasonpath;
jsonpath1 = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))
jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
const baseURL = jsonpath.url

test("AL_001. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("QS_099. @API Validation of OSCE -Question Schema", async ({ request }) => {
    schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/mcqSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/createQuestion?bank=1&type=22',
        {
            data: jsonpath1.OSCE_question.OSCE_question_schema,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
})

test("QS_100. @API Validation of OSCE question successfull message.", async ({ request }) => {
    schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/mcqSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/question',
        {
            data: jsonObject.OSCE_question.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    mcqID = res.Response.QuestionID
    console.log("Question id is:", mcqID)
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Question created successfully")

    //Schema validation
    const schema = schemajsonpath.createmcq
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("QS_101. @API Validation of edit OSCE question successfull message.", async ({ request }) => {
    schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/mcqSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/editquestion/' + mcqID + '/?type=typea',
        {
            data: jsonObject.OSCE_question.editoscebody,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Question updated successfully")

    //Schema validation
    const schema = schemajsonpath.editmcq
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("QS_102. @API Validation of OSCE question Approved message.", async ({ request }) => {
    schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/mcqSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/question/workflow/save/' + mcqID,
        {
            data: jsonpath1.mcq.approvequestion,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Status has been updated successfully.")

    //Schema validation
    const schema = schemajsonpath.approve
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})


test("QS_103. @API Validation of OSCE question checkout message.", async ({ request }) => {
    schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/mcqSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question/workflow/checkout/' + mcqID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Question has been checked out")

    //Schema validation
    const schema = schemajsonpath.checkout
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("QS_102A. @API Validation of OSCE question Approved message (again).", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/question/workflow/save/' + mcqID,
        {
            data: jsonpath1.mcq.approvequestion,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Status has been updated successfully.")
})


test("QS_104. @API OSCE question endpoint validation", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/tttquestion-api/v1/question',
        {
            data: jsonObject.OSCE_question.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);
    expect(response.statusText()).toBe("Not Found");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
})

test("QS_105. @API OSCE question Method validation-  incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);
    expect(response.statusText()).toBe("Method Not Allowed");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("QS_106. @API Validation of empty title field for OSCE question", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/question',
        {
            data: jsonObject.OSCE_question.empty_title_body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status).toBe(401);
    expect(response.statusText()).toBe("Unauthorized");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Question topic is required.")
})  
