//import { APIActions } from '@lib/APIActions';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
//import { token } from './adminToken.test';
import { jsonObject } from 'pageFactory/pageRepository/ApiPage'
import { log } from 'winston';
import { ValidationResponse } from '../../utils/validationUtiles/ResponseValidation';

let verifyResponse = new ValidationResponse;

// function makeid(length) {
//     let result = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//     const charactersLength = characters.length;
//     let counter = 0;
//     while (counter < length) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//         counter += 1;
//     }
//     return result;
// }
const Ajv = require('ajv')
const avj = new Ajv()

var jsonpath;
var schemajsonpath;
export let exam_ID;
export let token;
var jschemasonpath;
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

test("ES_001. @API Validation of Exam creation successfull message.", async ({ request }) => {
    schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
    const response = await request.post(baseURL + '/exam-api/v1.2/exam/save-details',
        {
            data: jsonObject.createExam,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    console.log(await response.json())
    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    var res1 = res.Response
    var resarry = [];
    for (var i in res1)
        resarry.push([i, res1[i]]);

    exam_ID = (resarry[2])[1];
    console.log("Exam id is:", exam_ID)

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Exam created successfully")

    //Schema validation
    const schema = schemajsonpath.createExam
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("ES_002. @API Validation of Exam section and add questions successfull message.", async ({ request }) => {
    schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
    const response = await request.post(baseURL + '/exam-api/v1.2/exam/save-sessions/' + exam_ID,
        {
            data: jsonObject.addQuestions,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    console.log(await response.json())
    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.message).toEqual("Session(s) Updated successfully")

    //Schema validation
    const schema = schemajsonpath.editExam
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("ES_003. @API Validation of Approved Exam  successfull message.", async ({ request }) => {
    schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
    const response = await request.post(baseURL + '/exam-api/v1/exam/workflow/save/' + exam_ID,
        {
            data: jsonObject.approveexam,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    console.log(await response.json())
    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Status has been updated successfuly.")

    //Schema validation
    const schema = schemajsonpath.approveexam
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

// test("Delivery_0077. @API To verify  the New User Save", async ({ request }) => {
//     jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
//     verifyResponse.fetchrequestTime();
//     console.log(exam_ID)
//     const response = await request.post(baseURL + '/exam-registration-api/v2/saveuser',
//         {
//             data: {
//                 "data": [

//                     {
//                         "client_id": makeid(8),
//                         "title": "MR",
//                         "user_name": makeid(12),
//                         "first_name": "Shiva",
//                         "last_name": "J",
//                         "email": makeid(5) + "cd121@test.com",
//                         "phone": "9986600567",
//                         "role": "9",
//                         "eligible": "1",
//                         "venue_id": "3",
//                         "booking_status_id": "1",
//                         "profile_image": ""
//                     },

//                     {
//                         "client_id": makeid(9),
//                         "title": "MR",
//                         "user_name": makeid(13),
//                         "first_name": makeid(7),
//                         "last_name": "d",
//                         "email": makeid(4) + "cd121@yopmail.com",
//                         "phone": "9876543210",
//                         "role": "10",
//                         "eligible": "1",
//                         "venue_id": "3",
//                         "booking_status_id": "1",
//                         "profile_image": ""
//                     }
//                 ],
//                 "userId": "28",
//                 "examId": exam_ID
//             },
//             headers: {
//                 "accept": "application/json",
//                 "webreferer": jsonpath.webreferer,
//                 "authorization": token
//             }
//         });
//     //Validation of response time
//     verifyResponse.validateTime(jsonpath.responseDuration);
//     console.log(await response.json())

//     //Status code validation
//     expect(response.status()).toBe(200);
//     expect(response.ok()).toBeTruthy()
//     expect(response.statusText()).toBe("OK");

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('application/json')

//     var res = await response.json()
//     //Verify Response Payload
//     expect(await res.Response.Message).toEqual("User(s) added to the Automation Feasibility successfully")
// })

test("ES_004. @API Validation of add user successful message.", async ({ request }) => {
    schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
    const response = await request.post(baseURL + '/exam-registration-api/v2/existingusersexam',
        {
            data: {
                "selectedRecord": [
                    {
                        "id": "45",
                        "upload image": {
                            "imgURL": "",
                            "isUploading": false,
                            "columnName": "upload image",
                            "isExisting": true,
                            "placeholder": "upload image",
                            "isUploadingEnable": true
                        },
                        "client id": "123008",
                        "first name": "Shiva",
                        "last name": "J",
                        "email": "abcd@test.com",
                        "phone": "",
                        "selected": true
                    }
                ],
                "roleId": 9,
                "eligible": "1",
                "examId": exam_ID,
                "userId": "28",
                "booking_status_id": [
                    {
                        "id": 1,
                        "name": "Booked"
                    }
                ],
                "venue_id": [
                    {
                        "id": 3,
                        "name": "Elumina Chennai"
                    }
                ]
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    console.log(await response.json())
    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Users have been added to the Automation Feasibility Successfully")

    //Schema validation
    const schema = schemajsonpath.addUser
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("ES_005. @API Validation of Empty Exam name field in Exam Page.", async ({ request }) => {
    const response = await request.post(baseURL + '/exam-api/v1.2/exam/save-details',
        {
            data: jsonObject.emptyExamname,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    console.log(await response.json())
    //Status code validation
    expect(response.status).toBe(401);
    expect(response.statusText()).toBe("Unauthorized");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("The exam name field is required.")
})

test("ES_006. @API Exam creation-endpoint validation", async ({ request }) => {
    const response = await request.post(baseURL + '/IGSexam-api/v1.2/exam/save-details',
        {
            data: jsonObject.createExam,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    console.log(await response.json())
    //Status code validation
    expect(response.status).toBe(404);
    expect(response.statusText()).toBe("Not Found");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
})

test("ES_007. @API Exam creation-Method validation-  incorrect HTTP method", async ({ request }) => {
    const response = await request.get(baseURL + '/IGSexam-api/v1.2/exam/save-details',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    console.log(await response.json())
    //Status code validation
    expect(response.status()).toBe(405);
    expect(response.statusText()).toBe("Method Not Allowed");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("ES_008. @API Exam creation-Header field validation - invalid", async ({ request }) => {
    const response = await request.post(baseURL + '/exam-api/v1.2/exam/save-details',
        {
            data: jsonObject.createExam,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    console.log(await response.json())
    //Status code validation
    expect(response.status).toBe(401);
    expect(response.statusText()).toBe("Unauthorized");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})






