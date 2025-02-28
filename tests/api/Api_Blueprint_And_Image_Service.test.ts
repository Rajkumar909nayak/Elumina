import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { ValidationResponse } from '../../utils/validationUtiles/ResponseValidation';
import { jsonObject } from 'pageFactory/pageRepository/api_blueprintPage';

let verifyResponse = new ValidationResponse;

const Ajv = require('ajv')
const avj = new Ajv()

var jsonpath;
let token;
let BlueprintID;
let CartId;
let ImageID;
let FileName;
let FilePath;
let FileExtension;
let QunFileName;
let QunFilePath;
let QunFileExtension;
let CartDetails;
var jschemasonpath;
jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
const baseURL = jsonpath.url

test("AL_001. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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

test("[BL_001] @API To verify the blueprint-form-page response", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprintform',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
})

test("[BL_002] @API To verify the response when passing an invalid endpoint for blueprint-form-page.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprintformIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_003] @API To verify the response when passing empty access token for blueprint-form-page.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprintform',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("[BL_005] @API To verify  the blueprint- create response", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprint',
        {
            data: jsonpath.BluePrintCreate.blueprintcreate_body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
    BlueprintID = res.Response.BlueprintID
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Blueprint Created Successfully")

    //Schema validation
    const schema = jschemasonpath.create_Blueprint
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("[BL_006] @API To  verify  the blueprint- create of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_007] @API To  verify  the blueprint- create  of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprintIGS',
        {
            data: jsonpath.BluePrintCreate.blueprintcreate_body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_008] @API To verify  the blueprint-workflow-create-form response", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprint/workflow/create',
        {
            data: {
                "blueprint_id": BlueprintID,
                "Authorization": "{\"COPEM Module 1\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"LIV Test Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"QA Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"banks\":{\"1\":[\"Administrator\"],\"5\":[\"Administrator\"],\"42\":[\"Administrator\"]},\"user\":\"2638\"}"
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[BL_009] @API To verify  the blueprint-workflow-create-form of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/workflow/create',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_010] @API To verify  the blueprint-workflow-create-form  of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprint/workflow/createIGS',
        {
            data: {
                "blueprint_id": BlueprintID,
                "Authorization": "{\"COPEM Module 1\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"LIV Test Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"QA Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"banks\":{\"1\":[\"Administrator\"],\"5\":[\"Administrator\"],\"42\":[\"Administrator\"]},\"user\":\"2638\"}"
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_011] @API To verify  the blueprint-workflow-save response", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprint/workflow/save/' + BlueprintID,
        {
            data:
            {
                "workflow": {
                    "id": "2",
                    "name": "No Workflow"
                },
                "blueprint_id": BlueprintID,
                "transition": "Save",
                "create": "",
                "Authorization": "{\"Practice Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Submit & Review\":\"TRUE\"},{\"Submit & Approve\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Download Question Paper\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Submit & Review\":\"TRUE\"},{\"Submit & Approve\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Save Draft\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Reset All Marking\":\"FALSE\"},{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Open All Marking\":\"FALSE\"},{\"Open Marking\":\"FALSE\"},{\"Reset Marking\":\"FALSE\"},{\"Un Assign All Markers\":\"FALSE\"},{\"Search\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Download User Details\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Reset Password\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Reports\":[{\"View\":\"TRUE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"FALSE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"QA Test Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Submit & Review\":\"TRUE\"},{\"Submit & Approve\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Download Question Paper\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Submit & Review\":\"TRUE\"},{\"Submit & Approve\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Save Draft\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Reset All Marking\":\"FALSE\"},{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Open All Marking\":\"FALSE\"},{\"Open Marking\":\"FALSE\"},{\"Reset Marking\":\"FALSE\"},{\"Un Assign All Markers\":\"FALSE\"},{\"Search\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Download User Details\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Reset Password\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Reports\":[{\"View\":\"TRUE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"FALSE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"banks\":{\"1\":[\"Exam Administrator\"],\"3\":[\"Exam Administrator\"]},\"user\":\"28\"}"
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Workflow has been created successfuly")

    //Schema validation
    const schema = jschemasonpath.Blueprint_workflow_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("[BL_012] @API To verify  the blueprint-workflow-save of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/workflow/save/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_013] @API To  verify  the  blueprint-workflow-save  of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprint/workflow/save/' + BlueprintID + '/IGS',
        {
            data:
            {
                "workflow": {
                    "id": "2",
                    "name": "No Workflow"
                },
                "blueprint_id": BlueprintID,
                "transition": "Save",
                "create": "",
                "Authorization": "{\"Practice Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Submit & Review\":\"TRUE\"},{\"Submit & Approve\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Download Question Paper\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Submit & Review\":\"TRUE\"},{\"Submit & Approve\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Save Draft\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Reset All Marking\":\"FALSE\"},{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Open All Marking\":\"FALSE\"},{\"Open Marking\":\"FALSE\"},{\"Reset Marking\":\"FALSE\"},{\"Un Assign All Markers\":\"FALSE\"},{\"Search\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Download User Details\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Reset Password\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Reports\":[{\"View\":\"TRUE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"FALSE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"QA Test Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Submit & Review\":\"TRUE\"},{\"Submit & Approve\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Download Question Paper\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Submit & Review\":\"TRUE\"},{\"Submit & Approve\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Save Draft\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Reset All Marking\":\"FALSE\"},{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Open All Marking\":\"FALSE\"},{\"Open Marking\":\"FALSE\"},{\"Reset Marking\":\"FALSE\"},{\"Un Assign All Markers\":\"FALSE\"},{\"Search\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Download User Details\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Reset Password\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Reports\":[{\"View\":\"TRUE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"FALSE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"banks\":{\"1\":[\"Exam Administrator\"],\"3\":[\"Exam Administrator\"]},\"user\":\"28\"}"
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_014] @API To verify the blueprint-edit-form-page response", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint-edit/' + BlueprintID + '/1',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
    CartId = res.data.cartdetails[0].cart_slug
    CartDetails = res.data.cartdetails[0]
})

test("[BL_015] @API To verify the response when passing an invalid endpoint for blueprint-edit-form-page", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint-edit/' + BlueprintID + '/1/IGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_016] @API To verify the response when passing empty access token for blueprint-edit-form-page", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint-edit/' + BlueprintID + '/1',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("[BL_019] @API To verify  the blueprint-cart-lock of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/cart/lock',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_020] @API To  verify  the  blueprint-cart-lock  of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/cart/lockIGS',
        {
            data: {
                "blueprint_id": BlueprintID,
                "cart_id": CartId
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_021] @API To verify  the blueprint-cart-question-list response", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/questions/' + BlueprintID + '/0',
        {
            data: {
                "allCartQuestions": [], "cartdetails": [CartDetails], "filterArray": [], "cartTitle": "Add Question(s)"
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[BL_022] @API To verify  the blueprint-cart-question-list of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/questions/' + BlueprintID + '/0',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_023] @API To  verify  the  blueprint-cart-question-list  of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/questions/' + BlueprintID + '/0/IGS',
        {
            data: {
                "allCartQuestions": [], "cartdetails": [CartDetails], "filterArray": [], "cartTitle": "Add Question(s)"
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_024] @API To verify the blueprint-cart-filters response", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint-cart-filters',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
})

test("[BL_025] @API To verify the response when passing an invalid endpoint for blueprint-cart-filters", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint-cart-filtersIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_026] @API To verify the response when passing empty access token for blueprint-cart-filters", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint-cart-filters',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("[BL_028] @API To verify  the blueprint-cart-questions-filter-search", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/questions/' + BlueprintID + '/0',
        {
            data: jsonpath.BluePrintCreate.blueprint_cart_questions_filter_search,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[BL_029] @API To verify  the blueprint-cart-questions-filter-search of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/questions/' + BlueprintID + '/0',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_030] @API To  verify  the  blueprint-cart-questions-filter-search  of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/questions/' + BlueprintID + '/0/IGS',
        {
            data: jsonpath.BluePrintCreate.blueprint_cart_questions_filter_search,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_031] @API To verify  the blueprint-cart-questions-select-addcart", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/questions/' + BlueprintID + '/0',
        {
            data: jsonpath.BluePrintCreate.blueprint_cart_questions_select_addcart,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[BL_032] @API To verify  the blueprint-cart-questions-select-addcart of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/questions/' + BlueprintID + '/0',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_033] @API To  verify  the  blueprint-cart-questions-select-addcart  of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/questions/' + BlueprintID + '/0/IGS',
        {
            data: jsonpath.BluePrintCreate.blueprint_cart_questions_select_addcart,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_034] @API To verify  the blueprint-cart-question-save", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/saveeditblueprint/' + BlueprintID,
        {
            data: jsonpath.BluePrintCreate.blueprint_cart_question_save,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[BL_035] @API To verify  the blueprint-cart-question-save of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/saveeditblueprint/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_036] @API To  verify  the blueprint-cart-question-save  of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/saveeditblueprint/' + BlueprintID + '/IGS',
        {
            data: jsonpath.BluePrintCreate.blueprint_cart_question_save,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_037] @API To verify  the blueprint-cart-questions-edit", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/questions/' + BlueprintID + '/0',
        {
            data: jsonpath.BluePrintCreate.blueprint_cart_questions_edit,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[BL_038] @API To verify  the blueprint-cart-questions-edit of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/questions/' + BlueprintID + '/0',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_039] @API To  verify  the blueprint-cart-questions-edit  of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/questions/' + BlueprintID + '/0/IGS',
        {
            data: jsonpath.BluePrintCreate.blueprint_cart_questions_edit,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_040] @API To verify  the blueprint-cart-edit-autofill", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprint/autofillcart/' + BlueprintID,
        {
            data: jsonpath.BluePrintCreate.blueprint_cart_edit_autofill,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[BL_041] @API To verify  the blueprint-cart-edit-autofill of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/autofillcart/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_042] @API To  verify  the blueprint-cart-edit-autofill of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprint/autofillcart/' + BlueprintID + '/IGS',
        {
            data: jsonpath.BluePrintCreate.blueprint_cart_edit_autofill,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_043] @API To verify  the blueprint-cart-edit-autofill", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprint/autofillcart/' + BlueprintID,
        {
            data: jsonpath.BluePrintCreate.blueprint_cart_edit_autofill,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[BL_044] @API To verify  the blueprint-cart-edit-autofill of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/autofillcart/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_045] @API To  verify  the blueprint-cart-edit-autofill of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprint/autofillcart/' + BlueprintID + '/IGS',
        {
            data: jsonpath.BluePrintCreate.blueprint_cart_edit_autofill,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_046] @API To verify  the blueprint-workflow-edit-page", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprint/workflow/edit',
        {
            data: {
                "blueprint_id": BlueprintID,
                "Authorization": "{\"COPEM Module 1\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"LIV Test Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"QA Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"banks\":{\"1\":[\"Administrator\"],\"5\":[\"Administrator\"],\"42\":[\"Administrator\"]},\"user\":\"28\"}"
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[BL_047] @API To verify  the blueprint-workflow-edit-page of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/workflow/edit',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_048] @API To  verify  the blueprint-workflow-edit-page of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprint/workflow/editIGS',
        {
            data: {
                "blueprint_id": BlueprintID,
                "Authorization": "{\"COPEM Module 1\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"LIV Test Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"QA Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"banks\":{\"1\":[\"Administrator\"],\"5\":[\"Administrator\"],\"42\":[\"Administrator\"]},\"user\":\"28\"}"
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_049] @API To verify  the blueprint-workflow-save", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprint/workflow/save/' + BlueprintID,
        {
            data: { "workflow": { "id": "2", "name": "No Workflow" }, "blueprint_id": BlueprintID, "transition": "Save", "Authorization": "{\"COPEM Module 1\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"LIV Test Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"QA Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"banks\":{\"1\":[\"Administrator\"],\"5\":[\"Administrator\"],\"42\":[\"Administrator\"]},\"user\":\"28\"}" },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Workflow has been created successfuly")

    //Schema validation
    const schema = jschemasonpath.blueprint_workflow_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("[BL_050] @API To verify  the blueprint-workflow-save of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/workflow/save/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_051] @API To  verify  the blueprint-workflow-save of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprint/workflow/save/' + BlueprintID + '/IGS',
        {
            data: { "workflow": { "id": "2", "name": "No Workflow" }, "blueprint_id": BlueprintID, "transition": "Save", "Authorization": "{\"COPEM Module 1\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"LIV Test Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"QA Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"banks\":{\"1\":[\"Administrator\"],\"5\":[\"Administrator\"],\"42\":[\"Administrator\"]},\"user\":\"28\"}" },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_052] @API To verify the blueprint-version-history-page response", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/version-history/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
})

test("[BL_053] @API To verify the response when passing an invalid endpoint for blueprint-version-history-page", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/version-history/' + BlueprintID + '/IGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_054] @API To verify the response when passing empty access token for blueprint-version-history-page", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/version-history/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("[BL_056] @API To verify  the blueprint-compare_version-history-view", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprint/compare_version/' + BlueprintID + '/1,1',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[BL_057] @API To verify  the blueprint-compare_version-history-view of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/compare_version/' + BlueprintID + '/1,1',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_058] @API To  verify  the blueprint-compare_version-history-view of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprint/compare_version/' + BlueprintID + '/1,1/IGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_059] @API To verify  the blueprints-list", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprints',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[BL_060] @API To verify  the blueprints-list of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprints',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_061] @API To  verify  the blueprints-list of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprintsIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_062] @API To verify the blueprint-filters response", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint-filters',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
})

test("[BL_063] @API To verify the response when passing an invalid endpoint for blueprint-filters", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint-filtersIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_064] @API To verify the response when passing empty access token for blueprint-filters", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint-filters',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("[BL_066] @API To verify  the blueprints-list-search", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprints',
        {
            data: jsonpath.BluePrintCreate.blueprints_list_search,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[BL_067] @API To verify  the blueprints-list-search of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprints',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_068] @API To  verify  the blueprints-list-search of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprintsIGS',
        {
            data: jsonpath.BluePrintCreate.blueprints_list_search,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_069] @API To verify  the blueprints-list-filter-search", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprints',
        {
            data: jsonpath.BluePrintCreate.blueprints_list_filter_search,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[BL_070] @API To verify  the blueprints-list-filter-search of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprints',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_071] @API To  verify  the blueprints-list-filter-search of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprintsIGS',
        {
            data: jsonpath.BluePrintCreate.blueprints_list_filter_search,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_072] @API To verify  the blueprint-list-custom-filter save public or privet", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/custom-filter',
        {
            data: jsonObject.blueprint_list_custom_filter_save_public_or_privet,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Filter saved successfully!")

    //Schema validation
    const schema = jschemasonpath.blueprint_list_custom_filter_save_public_or_privet
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("[BL_073] @API To verify  the blueprint-list-custom-filter save public or privet of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/custom-filter',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_074] @API To  verify  the blueprint-list-custom-filter save public or privet of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/custom-filterIGS',
        {
            data: jsonObject.blueprint_list_custom_filter_save_public_or_privet,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_075] @API To verify  the blueprints-list-show-column", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprints',
        {
            data: jsonpath.BluePrintCreate.blueprints_list_show_column,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[BL_076] @API To verify  the blueprints-list-show-column of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprints',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_077] @API To  verify  the blueprints-list-show-column of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprintsIGS',
        {
            data: jsonpath.BluePrintCreate.blueprints_list_show_column,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_078] @API To verify  the blueprints-pagination", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprints?page=2',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[BL_079] @API To verify  the blueprints-pagination of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprints?page=2',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_080] @API To  verify  the blueprints-pagination of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/blueprintsIGS?page=2',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_081] @API To verify the blueprint-dublicate-form-page", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
})

test("[BL_082] @API To verify the response when passing an invalid endpoint for blueprint-dublicate-form-page", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/' + BlueprintID + '/IGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_083] @API To verify the response when passing empty access token for blueprint-dublicate-form-page", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("[BL_085] @API To verify the blueprint-duplicate-save", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/duplicate/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
})

test("[BL_086] @API To verify the response when passing an invalid endpoint for blueprint-duplicate-save", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/duplicate/' + BlueprintID + '/IGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_087] @API To verify the response when passing empty access token for blueprint-duplicate-save", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/duplicate/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("[BL_089] @API To verify the blueprint-delete", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/blueprint-api/v1/blueprint/' + BlueprintID + '/delete',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
})

test("[BL_090] @API To verify the response when passing an invalid endpoint for blueprint-delete", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/blueprint-api/v1/blueprint/' + BlueprintID + '/deleteIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_091] @API To verify the response when passing empty access token for blueprint-delete", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/blueprint-api/v1/blueprint/' + BlueprintID + '/delete',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("[BL_093] @API To verify the blueprint-web-preview", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/web-preview/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
})

test("[BL_094] @API To verify the response when passing an invalid endpoint for blueprint-web-preview", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/web-preview/' + BlueprintID + '/IGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_095] @API To verify the response when passing empty access token for blueprint-web-preview", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/web-preview/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("[BL_101] @API To verify the blueprint-unlock", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/unlock/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Blueprint has been unlocked")

    //Schema validation
    const schema = jschemasonpath.blueprint_unlock
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("[BL_102] @API To verify the response when passing an invalid endpoint for blueprint-unlock", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/unlock/' + BlueprintID + '/IGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_103] @API To verify the response when passing empty access token for blueprint-unlock", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/unlock/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("[BL_097] @API To verify the blueprint-archive", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/blueprint-api/v1/blueprint/' + BlueprintID + '/archive',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();

    //Schema validation
    const schema = jschemasonpath.blueprint_unlock
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("[BL_098] @API To verify the response when passing an invalid endpoint for blueprint-archive", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/blueprint-api/v1/blueprint/' + BlueprintID + '/archiveIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[BL_099] @API To verify the response when passing empty access token for blueprint-archive", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/blueprint-api/v1/blueprint/' + BlueprintID + '/archive',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("[IS_001] @API To verify  the image-gallery-list", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image-gallery',
        {
            data: { "banks": [] },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[IS_002] @API To verify  the image-gallery-list of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image-gallery',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_003] @API To  verify  the image-gallery-list of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image-galleryIGS',
        {
            data: { "banks": [] },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_004] @API To verify the banks-list", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/get-image/banks',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
})

test("[IS_005] @API To verify the response when passing an invalid endpoint for banks-list", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/get-image/banksIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_008] @API To verify the tags", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/get-image/banks',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
})

test("[IS_009] @API To verify the response when passing an invalid endpoint for tags", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/get-image/banksIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_042] @API To verify  the upload-image-name", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const file = path.resolve("lib/Images/Sunil.jpeg");
    const image = fs.readFileSync(file);
    const response = await request.post(baseURL + '/file-api/v1/upload',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            },
            multipart: {
                file: {
                    name: "Sunil.jpeg",
                    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    buffer: image
                }

            }
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
    FileName = res.Response.ImageDetails.filename
    FilePath = res.Response.ImageDetails.destination_path
    FileExtension = res.Response.ImageDetails.extension
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Image Uploaded Successfully")

    //Schema validation
    const schema = jschemasonpath.upload_image_name
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("[IS_043] @API To verify  the upload-image-name of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/upload',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_044] @API To  verify  the upload-image-name of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const file = path.resolve("lib/Images/kohli.jpeg");
    const image = fs.readFileSync(file);
    const response = await request.post(baseURL + '/file-api/v1/uploadIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            },
            multipart: {
                file: {
                    name: "testFile.jpeg",
                    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    buffer: image
                }

            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_012] @API To verify  the bank-select-image-list", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image-gallery',
        {
            data: jsonpath.Image_Service.bank_select_image_list,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
    ImageID = res.images.data[0].id
    console.log("Image id is", ImageID)
})

test("[IS_013] @API To verify  the bank-select-image-list of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image-gallery',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_014] @API To  verify  the bank-select-image-list of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image-galleryIGS',
        {
            data: jsonpath.Image_Service.bank_select_image_list,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_015] @API To verify  the search-image-list", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image-gallery',
        {
            data: {
                "freeText": [FileName],
                "banks": []
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[IS_016] @API To verify  the search-image-list of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image-gallery',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_017] @API To  verify  the search-image-list of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image-galleryIGS',
        {
            data: {
                "freeText": [FileName],
                "banks": []
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_018] @API To verify the image-filters", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/filters/image',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
})

test("[IS_019] @API To verify the response when passing an invalid endpoint for image-filters", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/filters/imageIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_022] @API To verify  the image-filter-search", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image-gallery',
        {
            data: jsonpath.Image_Service.image_filter_search,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[IS_023] @API To verify  the image-filter-search of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image-gallery',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_024] @API To  verify  the image-filter-search of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image-galleryIGS',
        {
            data: jsonpath.Image_Service.image_filter_search,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_025] @API To verify  the image-custome-filter save public or privet", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/custom-filter',
        {
            data: jsonObject.image_custome_filter_save_public_or_privet,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Filter saved successfully!")

    //Schema validation
    const schema = jschemasonpath.image_custome_filter_save_public_or_privet
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("[IS_026] @API To verify  the image-custome-filter save public or privet of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/custom-filter',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_027] @API To  verify  the image-custome-filter save public or privet of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/custom-filterIGS',
        {
            data: jsonObject.image_custome_filter_save_public_or_privet,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_028] @API To verify  the image-pagination", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image-gallery?page=2',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[IS_029] @API To verify  the image-pagination of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image-gallery?page=2',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_030] @API To  verify  the image-pagination of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image-galleryIGS?page=2',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_031] @API To verify the image-upload-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/upload/form',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
})

test("[IS_032] @API To verify the response when passing an invalid endpoint for image-upload-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/upload/formIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_035] @API To verify the image-upload-bank-select-tag-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/upload/form/1',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
})

test("[IS_036] @API To verify the response when passing an invalid endpoint for image-upload-bank-select-tag-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/upload/form/1/IGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_039] @API To verify  the tags-select -tagtype show", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/tags',
        {
            data: jsonpath.Image_Service.tags_select_tagtype_show,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[IS_040] @API To verify  the tags-select -tagtype show of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/tags',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_041] @API To  verify  the tags-select -tagtype show of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/tagsIGS',
        {
            data: jsonpath.Image_Service.tags_select_tagtype_show,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_045] @API To verify  the image-file-save", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image',
        {
            data: {
                "file_name": FileName,
                "upload_path": FilePath,
                "extension": FileExtension,
                "tags": [],
                "banks": [
                    {
                        "id": 1,
                        "name": "Practice Bank"
                    }
                ]
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Image Saved Successfully")

    //Schema validation
    const schema = jschemasonpath.blueprint_unlock
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("[IS_046] @API To verify  the image-file-save of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_047] @API To  verify  the image-file-save of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/imageIGS',
        {
            data: {
                "file_name": FileName,
                "upload_path": FilePath,
                "extension": FileExtension,
                "tags": [],
                "banks": [
                    {
                        "id": 1,
                        "name": "Practice Bank"
                    }
                ]
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_048] @API To verify the images-edit-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/images/' + ImageID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
})

test("[IS_049] @API To verify the response when passing an invalid endpoint for images-edit-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/images/' + ImageID + '/IGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_052] @API To verify  the image-edit-save", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image/' + ImageID,
        {
            data: {
                "banks": [
                    {
                        "id": 1,
                        "name": "Practice Bank"
                    }
                ],
                "tags": [],
                "questions": [], "file_name": jsonObject.EditFileName, "file_name_old": FileName, "upload_path": FilePath, "extension": FileExtension
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Image Updated Successfully")

    //Schema validation
    const schema = jschemasonpath.image_edit_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("[IS_053] @API To verify  the image-edit-save of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/' + ImageID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_054] @API To  verify  the image-edit-save of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image/' + ImageID + '/IGS',
        {
            data: {
                "banks": [
                    {
                        "id": 1,
                        "name": "Practice Bank"
                    }
                ],
                "tags": [],
                "questions": [], "file_name": jsonObject.EditFileName, "file_name_old": FileName, "upload_path": FilePath, "extension": FileExtension
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_055] @API To verify  the image-versioning", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image/' + ImageID + '/versioning',
        {
            data: {
                "file_name": jsonObject.EditFileName,
                "upload_path": FilePath,
                "extension": "png"
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Image Versioned Successfully")

    //Schema validation
    const schema = jschemasonpath.blueprint_unlock
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("[IS_056] @API To verify  the image-versioning of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/' + ImageID + '/versioning',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_057] @API To  verify  the image-versioning of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image/' + ImageID + '/versioningIGS',
        {
            data: {
                "file_name": jsonObject.EditFileName,
                "upload_path": FilePath,
                "extension": "png"
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_058] @API To verify the image-deleted", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/file-api/v1/image/' + ImageID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Image Deleted Successfully")

    //Schema validation
    const schema = jschemasonpath.blueprint_unlock
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("[IS_059] @API To verify the response when passing an invalid endpoint for image-deleted", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/file-api/v1/image/' + ImageID + '/IGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_062] @API To verify  the image-list-search", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image-gallery',
        {
            data: jsonpath.Image_Service.image_list_search,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[IS_063] @API To verify  the image-list-search of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image-gallery',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_064] @API To  verify  the image-list-search of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image-galleryIGS',
        {
            data: jsonpath.Image_Service.image_list_search,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_065] @API To verify  the question-image-gallery-list", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image-gallery',
        {
            data: jsonpath.Image_Service.image_list_search,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
})

test("[IS_066] @API To verify  the question-image-gallery-list of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image-gallery',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_067] @API To  verify  the question-image-gallery-list of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image-galleryIGS',
        {
            data: jsonpath.Image_Service.question_image_gallery_list,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_068] @API To verify the image-upload-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/upload/form?showImages=true',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("[IS_069] @API To verify the response when passing an invalid endpoint for image-upload-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/upload/formIGS?showImages=true',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_072] @API To verify  the upload-image-name", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const file = path.resolve("lib/Images/kohli.jpeg");
    const image = fs.readFileSync(file);
    const response = await request.post(baseURL + '/file-api/v1/upload',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            },
            multipart: {
                file: {
                    name: "kohli.jpeg",
                    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    buffer: image
                }

            }
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

    var res = await response.json();
    QunFileName = res.Response.ImageDetails.filename
    QunFilePath = res.Response.ImageDetails.destination_path
    QunFileExtension = res.Response.ImageDetails.extension
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Image Uploaded Successfully")

    //Schema validation
    const schema = jschemasonpath.question_upload_image_name
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("[IS_073] @API To verify  the upload-image-name of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/upload',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_074] @API To  verify  the upload-image-name of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const file = path.resolve("lib/Images/kohli.jpeg");
    const image = fs.readFileSync(file);
    const response = await request.post(baseURL + '/file-api/v1/uploadIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            },
            multipart: {
                file: {
                    name: "kohli.jpeg",
                    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    buffer: image
                }
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_075] @API To verify the image-upload-select-bank-tag", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/upload/form/1',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("[IS_076] @API To verify the response when passing an invalid endpoint for image-upload-select-bank-tag", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/upload/form/1/IGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_079] @API To verify  the image-upload-tags-to-tagtype", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/tags',
        {
            data: jsonpath.Image_Service.image_upload_tags_to_tagtype,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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

    var res = await response.json();

    //Schema validation
    const schema = jschemasonpath.image_upload_tags_to_tagtype
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("[IS_080] @API To verify  the image-upload-tags-to-tagtype of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/tags',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_081] @API To  verify  the image-upload-tags-to-tagtype of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/tagsIGS',
        {
            data: jsonpath.Image_Service.image_upload_tags_to_tagtype,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_082] @API To verify  the question-image-save", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image',
        {
            data: {
                "file_name": QunFileName,
                "upload_path": QunFilePath,
                "extension": QunFileExtension,
                "tags": [],
                "banks": [
                    {
                        "id": 1,
                        "name": "Practice Bank"
                    }
                ]
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Image Saved Successfully")

    //Schema validation
    const schema = jschemasonpath.blueprint_unlock
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("[IS_083] @API To verify  the question-image-save of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_084] @API To  verify  the question-image-save of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/imageIGS',
        {
            data: {
                "file_name": QunFileName,
                "upload_path": QunFilePath,
                "extension": QunFileExtension,
                "tags": [],
                "banks": [
                    {
                        "id": 1,
                        "name": "Practice Bank"
                    }
                ]
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("[IS_077] @API To verify the response when passing empty access token for image-upload-select-bank-tag", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/upload/form/1',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("AL_001Ac. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_078] @API To verify the response on passing invalid 'webreferer' in the header field for image-upload-select-bank-tag", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/upload/form/1',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001ZAb. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_070] @API To verify the response when passing empty access token for image-upload-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/upload/form?showImages=true',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("AL_001Aa. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_071] @API To verify the response on passing invalid 'webreferer' in the header field for image-upload-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/upload/form?showImages=true',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001Z. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_060] @API To verify the response when passing empty access token for image-deleted", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/file-api/v1/image/' + ImageID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("AL_001Y. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_061] @API To verify the response on passing invalid 'webreferer' in the header field for image-deleted", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/file-api/v1/image/' + ImageID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001X. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_050] @API To verify the response when passing empty access token for images-edit-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/images/' + ImageID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("AL_001W. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_051] @API To verify the response on passing invalid 'webreferer' in the header field for images-edit-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/images/' + ImageID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001V. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_037] @API To verify the response when passing empty access token for image-upload-bank-select-tag-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/upload/form/1',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("AL_001U. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_038] @API To verify the response on passing invalid 'webreferer' in the header field for image-upload-bank-select-tag-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/upload/form/1',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001T. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_033] @API To verify the response when passing empty access token for image-upload-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/upload/form',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("AL_001S. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_034] @API To verify the response on passing invalid 'webreferer' in the header field for image-upload-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image/upload/form',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001R. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_020] @API To verify the response when passing empty access token for image-filters", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/filters/image',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("AL_001Q. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_021] @API To verify the response on passing invalid 'webreferer' in the header field for image-filters", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/filters/image',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001P. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_010] @API To verify the response when passing empty access token for tags", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/get-image/banks',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("AL_001O. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_011] @API To verify the response on passing invalid 'webreferer' in the header field for tags", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/get-image/banks',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001N. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_006] @API To verify the response when passing empty access token for banks-list", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/get-image/banks',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("AL_001M. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[IS_007] @API To verify the response on passing invalid 'webreferer' in the header field for banks-list", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/get-image/banks',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001L. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[BL_100] @API To verify the response on passing invalid 'webreferer' in the header field for blueprint-archive", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/blueprint-api/v1/blueprint/' + BlueprintID + '/archive',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001K. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[BL_104] @API To verify the response on passing invalid 'webreferer' in the header field for blueprint-unlock", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/unlock/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001J. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[BL_096] @API To verify the response on passing invalid 'webreferer' in the header field for blueprint-web-preview", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/web-preview/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001I. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[BL_092] @API To verify the response on passing invalid 'webreferer' in the header field for blueprint-delete", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/blueprint-api/v1/blueprint/' + BlueprintID + '/delete',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001H. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[BL_088] @API To verify the response on passing invalid 'webreferer' in the header field for blueprint-duplicate-save", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/duplicate/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001G. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[BL_084] @API To verify the response on passing invalid 'webreferer' in the header field for blueprint-dublicate-form-page", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001F. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[BL_065] @API To verify the response on passing invalid 'webreferer' in the header field for blueprint-filters", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint-filters',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001E. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[BL_055] @API To verify the response on passing invalid 'webreferer' in the header field for blueprint-version-history-page", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint/version-history/' + BlueprintID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001D. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[BL_027] @API To verify the response on passing invalid 'webreferer' in the header field for blueprint-cart-filters", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint-cart-filters',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001C. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[BL_018] @API To verify  the blueprint-cart-lock response", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/blueprintAndImageData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/blueprintAndImageSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/cart/lock',
        {
            data: {
                "blueprint_id": BlueprintID,
                "cart_id": CartId
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
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
    BlueprintID = res.Response.BlueprintID
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Blueprint Cart Lock Successfully")

    //Schema validation
    const schema = jschemasonpath.blueprint_cart_lock
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("AL_001B. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[BL_017] @API To verify the response on passing invalid 'webreferer' in the header field for blueprint-edit-form-page", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprint-edit/' + BlueprintID + '/1',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001A. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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
})

test("[BL_004] @API To verify the response on passing invalid 'webreferer' in the header field for blueprint-form-page.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/blueprintform',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})
