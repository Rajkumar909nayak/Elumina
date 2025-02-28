//import { APIActions } from '@lib/APIActions';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { ValidationResponse } from '../../utils/validationUtiles/ResponseValidation';
import { jsonObject } from 'pageFactory/pageRepository/candidateApiPage';

let verifyResponse = new ValidationResponse;

//export let token;
var jsonpath;
jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
const baseURL = jsonpath.url

test("[T570] @API To verify the response when passing an invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/tttcommon/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    // token = res.access_token
})

test("[T571] @API To verify the response when an incorrect HTTP method is used for a request.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/common/v3/authenticationservice/v3/login')

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(405);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')


})


test("[T572] @API To verify the response on passing invalid webreferer in the header field.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.invalidheader
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("Unauthorized")

})


test("[T573] @API To verify the response on passing empty webreferer in the header field.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.emptyheader
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.message).toEqual("Unauthorized")

})

test("[T574] @API To verify the response on passing invalid username in the request field.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: {
                "username": "igsuser12345@mailinator.com",
                "password": "G97$phJ&",
                "rememberMe": ""
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(400);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.title).toEqual("Logon Failure")
    //Verify error message
    expect(res.error).toBe("invalidRequest")
})

test("[T575] @API To verify the response on passing empty username in the request field.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: {
                "username": " ",
                "password": "G97$phJ&",
                "rememberMe": ""
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(400);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.title).toEqual("Logon Failure")
    //Verify error message
    expect(res.error).toBe("invalidRequest")
})

test("[T576] @API To verify the response on passing invalid password in the request field.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: {
                "username": "igsuser@mailinator.com",
                "password": "G97$phJ&12131",
                "rememberMe": ""
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(400);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify error message
    expect(res.error).toBe("invalidRequest")
})

test("[T577] @API To verify the response on passing empty password in the request field.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: {
                "username": "igsuser@mailinator.com",
                "password": " ",
                "rememberMe": ""
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(400);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify error message
    expect(res.error).toBe("invalidRequest")
})    