//import { APIActions } from '@lib/APIActions';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { jsonObject } from 'pageFactory/pageRepository/Api_iAuthorPage';
import { ValidationResponse } from '../../utils/validationUtiles/ResponseValidation';
import { Console } from 'winston/lib/winston/transports';
//import { exam_ID } from './Api_ES_exam.test';



function makeid(length) {
    let result = '';
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    let counter = 0;

    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


let verifyResponse = new ValidationResponse;
//const apiActions = new APIActions();

const Ajv = require('ajv')
const avj = new Ajv()



export let activeExamID1;
export let activeSessionID1;
let candidatetoken1
export let exam_ID1;


var schemajsonpath;
export let token;
//var jsonpath;
var jschemasonpath;
var BankId;
var TagId;
var LocationId;
var QuestionId;
var SpecialityId
let bankName = makeid(8);
var NotificationId;
var VenueId;
var iExamId
var examlistId
var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
const baseURL = jsonpath.url
var exam_ID;

var examTest;
var sessionId;
var userId;
var examIdNum;
var candidateId;
var sessID


test("AL_001m. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

/*
test("Admin_333. @API Admin create the Bank-list information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Admin_334. @API Admin add  the bank-list of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/banks',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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


test("Admin_335. @API Admin add the bank-list  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


/////////////////Create Bank///////////////////////

test("Admin_359. @API Admin add the Banks-Save information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/bank',
        {
            data: {
                "name": bankName,
                "description": "<p>bank</p>",
                "workflow": "No Workflow",
                "tags": "[{\"id\":9,\"name\":\"LIV Test\"}]",
                "question_types": "[{\"id\":1,\"name\":\"MCQ\",\"slug\":\"typea\",\"distractor_count\":\"2\",\"mark\":\"1\",\"readonly\":\"\",\"max_limit\":10}]"
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Bank created successfully")

    //Schema validation
    const schema = jschemasonpath.BankCreate_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_360. @API Admin add the  Banks-Save _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/banks',
        {
            data: jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_361. @API Admin add the Banks-Save _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/banks/IGS',
        {
            data: jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


/////////////Search Bank////////////////////

test("Admin_340. @API Admin add the Bank search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks',
        {
            data: {

                "freeText": [
                    bankName
                ]

            },
            //jsonObject.Admin_Bank_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    BankId = res.banks.data[0].id
    console.log("BankId is" + BankId)


    //Schema validation
    const schema = jschemasonpath.BankSearch_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_341. @API Admin add the Bank search _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/banks',
        {
            data: jsonObject.Admin_Bank_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_342. @API Admin add the Bank search _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/banks/IGS',
        {
            data: jsonObject.Admin_Bank_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


//////////////////Edit Bank////////////////////

test("Admin_373. @API Admin fetch the bank-edit-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/bank/' + BankId,
        {
            data: {
                "name": bankName,
                "description": "<p>bank</p>",
                "workflow": "No Workflow",
                "tags": "[{\"id\":9,\"name\":\"LIV Test\"}]",
                "question_types": "[{\"id\":1,\"name\":\"MCQ\",\"mark\":\"1\",\"distractor_count\":\"2\",\"max_limit\":10,\"readonly\":\"\",\"tags\":[]}]"
            },
            //jsonObject.Admin_Bank_Edit_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Bank updated successfully")

    //Schema validation
    const schema = jschemasonpath.Bank_Edit_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_374. @API Admin add the bank-edit-update _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/bank/',
        {
            data: jsonObject.Admin_Bank_Edit_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_375. @API Admin add the bank-edit-update _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/bank/58/IGS',
        {
            data: jsonObject.Admin_Bank_Edit_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


/////Create Question Type////////////


test("Admin_481. @API Admin create the question-type-save information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/question-type',
        {
            data: {
                "question_types": [
                    {
                        "id": 12,
                        "name": "Type B"
                    }
                ],
                "banks": [
                    {
                        "id": BankId,
                        "name": bankName,
                    }
                ],
                "description": "<p>test description</p>",
                "distractor": [
                    {
                        "enter_distrator_text": 1,
                        "values": [
                            {
                                "header": "Distractor 1",
                                "value": "A is more than B",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 2",
                                "value": "B is more than C",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 3",
                                "value": "C is more than D",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 4",
                                "value": "D is more than A",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 5",
                                "value": "D is more than B",
                                "required": "required"
                            }
                        ]
                    }
                ]
            },
            // jsonObject.Admin_question_type_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Question type added successfully")

    //Schema validation
    const schema = jschemasonpath.Question_Type_Create_Form
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_482. @API Admin add  the question-type-save of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/question-type',
        {
            data: jsonObject.Admin_question_type_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_483. @API Admin add the question-type-save  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/question-typeIGS',
        {
            data: jsonObject.Admin_question_type_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


/////////////Search Question-Type/////////////////

test("Admin_498. @API Admin create the question-types-search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/questiontypes',
        {
            data: {
                "freeText": [
                    bankName
                ]
            },

            //jsonObject.Question_type_Search_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    console.log(res)
    QuestionId = res.questiontypes.data[0].id
    console.log("QuestionId is" + QuestionId)

    //Schema validation
    const schema = jschemasonpath.Question_type_Search
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()


})


test("Admin_499. @API Admin add  the question-types-search  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/questiontypes',
        {
            data: jsonObject.Question_type_Search_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_500. @API Admin add the question-types-search   of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/questiontypes/IGS',
        {
            data: jsonObject.Question_type_Search_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


////////////Edit Question Type////////////////////

test("Admin_488. @API Admin create the question-type-update information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/question-type/' + QuestionId,
        {
            data: {
                "question_types": [
                    {
                        "id": 12,
                        "name": "Type B"
                    }
                ],
                "banks": [
                    {
                        "id": BankId,
                        "name": bankName
                    }
                ],
                "description": "<p>testt</p>",
                "distractor": [
                    {
                        "enter_distrator_text": 1,
                        "values": [
                            {
                                "header": "Distractor 1",
                                "value": "one",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 2",
                                "value": "two",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 3",
                                "value": "three",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 4",
                                "value": "four",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 5",
                                "value": "five",
                                "required": "required"
                            }
                        ]
                    }
                ]
            },
            //jsonObject.Question_Type_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Question type updated successfully")

    //Schema validation
    const schema = jschemasonpath.Question_type_Edit_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_489. @API Admin add  the question-type-update of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/question-type/' + QuestionId,
        {
            data: jsonObject.Question_Type_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_490. @API Admin add the question-type-update  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/question-type/' + QuestionId + '/IGS',
        {
            data: jsonObject.Question_Type_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_517. @API Admin create the question-type-duplicate-save information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/question-type?duplicate=true',
        {
            data: {
                "question_types": [
                    {
                        "id": 24,
                        "name": "Type B"
                    }
                ],
                "banks": [
                    {
                        "id": BankId,
                        "name": bankName
                    }
                ],
                "description": "<p>Test Bank&nbsp;</p>",
                "distractor": [
                    {
                        "enter_distrator_text": 1,
                        "values": [
                            {
                                "header": "Distractor 1",
                                "value": "statement is correct",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 2",
                                "value": "reason is correct",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 3",
                                "value": "statement is wrong",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 4",
                                "value": "reason is wrong",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 5",
                                "value": "both statement and reason is correct",
                                "required": "required"
                            }
                        ]
                    }
                ]
            },

            //jsonObject.Admin_Question_type_duplicate.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

    // Verify Response Payload
    expect(await res.Response.Message).toEqual("Question type duplicated successfully")


    //     //Schema validation
    const schema = jschemasonpath.Question_Type_Duplicate_Form
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_518. @API Admin add  the question-type-duplicate-save  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/question-type?duplicate=true',
        {
            data: jsonObject.Admin_Question_type_duplicate.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_519. @API Admin add the question-type-duplicate-save  of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/question-typeIGS?duplicate=true',
        {
            data: jsonObject.Admin_Question_type_duplicate.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Admin_510. @API Admin fetch the Question type delete-role", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/question-type/' + QuestionId,
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

    var res = await response.json()


    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Question type deleted successfully")


    //Schema validation
    const schema = jschemasonpath.Question_Type_Delete_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})


test("Admin_511. @API Endpoint validation for delete-question-type", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/question-type/' + QuestionId + '/IGS',
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//get method for edit bank

test("Admin_369. @API Admin fetch the bank-edit-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank/' + BankId,
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})

test("Admin_370. @API Endpoint validation for bank-edit-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank/IGS/' + BankId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_371. @API Access token validation for bank-edit-form_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank/' + BankId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})




//Get Method

test("Admin_365. @API Admin fetch the bank-duplicate -form information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank/' + BankId + '/duplicate',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


    // Verify Response Payload
    expect(await res.Response.Message).toEqual("Bank duplicated successfully")

    //Schema validation
    const schema = jschemasonpath.Bank_duplicate_form_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_366. @API Endpoint validation for -bank-duplicate-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank/' + BankId + '/duplicateIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_367. @API Access token validation for bank-duplicate-form_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank/' + BankId + '/duplicate',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})


test("Admin_512. @API Admin delete-question-type_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/question-type/6',
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("AL_001eah. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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




test("Admin_372. @API Admin bank-edit-form-Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank/' + BankId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //console.log(res);


})

test("AL_001abcd. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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



test("Admin_368. @API Admin bank-duplicate-form-Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank/' + BankId + '/duplicate',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001abc. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

//get method

test("Admin_336. @API Admin fetch the bank-filter-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/banks',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



    //Schema validation
    const schema = jschemasonpath.Bank_Filter_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_337. @API Endpoint validation for -bank-filter  information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/banks/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_338. @API Access token validation for bank-filter_information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/banks',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_339. @API Admin bank-filter-Header field validation - invalid.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/banks',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})


test("AL_001a. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

})


test("Admin_343. @API Admin add the Bank Pagination information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks?page=2',
        {
            data: jsonObject.Bank_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Admin_344. @API Admin add the Bank Pagination _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/banks?page=2',
        {
            data: jsonObject.Bank_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_345. @API Admin add the Bank Pagination _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks/IGS?page=2',
        {
            data: jsonObject.Bank_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



test("Admin_346. @API Admin add the Banks-Filter-search  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks',
        {
            data: jsonObject.Banks_Filter_search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Admin_347. @API Admin add the  Banks-Filter-search _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/banks',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_348. @API Admin add the  Banks-Filter-search _validation of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})




test("Admin_349. @API Admin add the Bank-custom-filter-public or private information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Bank_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Filter saved successfully")

    //Schema validation
    const schema = jschemasonpath.Bank_custom_filter
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})



test("Admin_350. @API Admin add the  Bank-custom-filter-public or private _validation of incorrect HTTP method", async ({ request }) => {

    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Bank_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_351. @API Admin add the  Bank-custom-filter-public or private  _validation of invalid endpoint", async ({ request }) => {

    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter/IGS',
        {
            data: jsonObject.Bank_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_352. @API Admin add the Bank-show-column-list information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks?page=1',
        {
            data: jsonObject.Bank_show_column.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Admin_353. @API Admin add the  Bank-show-column-list _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/banks?page=1',
        {
            data: jsonObject.Bank_show_column.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_354. @API Admin add the Bank-show-column-list_validation of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banksIGS?page=1',
        {
            data: jsonObject.Bank_show_column.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//Get method

test("Admin_355. @API Admin fetch the bank-create-form information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})

test("Admin_356. @API Endpoint validation for -bank-create-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bankIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_357. @API Access token validation for bank-create-form_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_358. @API Admin bank-create-form-Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})


test("AL_001ab. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

/////////create Bank////////////////

test("Admin_aaa. @API Admin add the Banks-Save information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/bank',
        {
            data: {
                "name": bankName,
                "description": "<p>bank</p>",
                "workflow": "No Workflow",
                "tags": "[{\"id\":9,\"name\":\"LIV Test\"}]",
                "question_types": "[{\"id\":1,\"name\":\"MCQ\",\"slug\":\"typea\",\"distractor_count\":\"2\",\"mark\":\"1\",\"readonly\":\"\",\"max_limit\":10}]"
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Bank created successfully")

    //Schema validation
    const schema = jschemasonpath.BankCreate_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

/////////////Search Bank////////////////////

test("Admin_bbb. @API Admin add the Bank search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks',
        {
            data: {

                "freeText": [
                    bankName
                ]

            },
            //jsonObject.Admin_Bank_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    BankId = res.banks.data[0].id
    console.log("BankId is" + BankId)


    //Schema validation
    const schema = jschemasonpath.BankSearch_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_362. @API Admin fetch the bank-Delete", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/bank/' + BankId,
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

    var res = await response.json()


    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Bank deleted successfully")


    // //Schema validation
    const schema = jschemasonpath.Bank_Delete_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_363. @API Endpoint validation for bank-Delete", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/bank/' + BankId + '/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_364. @API Admin bank-Delete -Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/bank/' + BankId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("AL_001amc. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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



//////////////////////////////Question Type////////////////////////////////


test("Admin_491. @API Admin create the question-types-list information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/questiontypes',
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



    //     //Schema validation
    //     const schema = jschemasonpath.Question_Type_Create_Form
    //     const validate = avj.compile(schema)
    //     const isValid = validate(res)
    //     expect(isValid).toBeTruthy()

})


test("Admin_492. @API Admin add  the question-types-list  of incorrect HTTP method", async ({ request }) => {
   
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/questiontypes',
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_493. @API Admin add the question-types-list  of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/questiontypes/IGS',
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Admin_501. @API Admin create the question-types-filter-search  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/questiontypes',
        {
            data: jsonObject.Admin_question_type_filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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


test("Admin_502. @API Admin add  the question-types-filter-search  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/questiontypes',
        {
            data: jsonObject.Admin_question_type_filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_503. @API Admin add the question-types-filter-search  of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/questiontypes/IGS',
        {
            data: jsonObject.Admin_question_type_filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Admin_504. @API Admin create the question-type custom-filter-save information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Admin_question_type_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Filter saved successfully")

    //Schema validation
    const schema = jschemasonpath.Question_Type_Custom_Filter_Form
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_505. @API Admin add  the question-type custom-filter-save of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Admin_question_type_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_506. @API Admin add the question-type custom-filter-save  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter/IGS',
        {
            data: jsonObject.Admin_question_type_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Admin_507. @API Admin create the question-types-field-column-show-hide information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/questiontypes',
        {
            data: jsonObject.Admin_Question_type_column_Show.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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


test("Admin_508. @API Admin add  the question-types-field-column-show-hide  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/questiontypes',
        {
            data: jsonObject.Admin_Question_type_column_Show.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



test("Admin_509. @API Admin add the question-types-field-column-show-hide  of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/questiontypes/IGS',
        {
            data: jsonObject.Admin_Question_type_column_Show.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



//Get method

test("Admin_494. @API Admin fetch the question-type-filter -information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/questiontypes',
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})

test("Admin_495. @API Endpoint validation for -question-type-filter  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/questiontypesIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_496. @API Access token validation for question-type-filter_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/questiontypes',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_497. @API Admin question-type-filter-Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/questiontypes',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001bgz. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

//Get method

test("Admin_513. @API Admin fetch the question-type-duplicate-form -information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type/' + QuestionId,
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})

test("Admin_514. @API Endpoint validation for -question-type-duplicate-form   information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type/' + QuestionId + '/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_515. @API Access token validation for question-type-duplicate-form_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type/' + QuestionId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_516. @API Admin question-type-duplicate-form-Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type/4',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001bqj. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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



//Get method

test("Admin_477. @API Admin fetch the question-type-create-form-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type',
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    // Verify Response Payload
    //  expect(await res.Response.Message).toEqual("Bank created successfully")

    //Schema validation
    // const schema = jschemasonpath.Bank_Filter_Schema
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()

})

test("Admin_478. @API Endpoint validation for -question-type-create-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-typeIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_479. @API Access token validation for question-type-create-form_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})

//Get method

test("Admin_484. @API Admin fetch the question-type-edit-form-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type/' + QuestionId,
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})

test("Admin_485. @API Endpoint validation for -question-type-edit-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type/' + QuestionId + '/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_486. @API Access token validation for question-type-edit-form_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type/' + QuestionId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_487. @API Admin question-type-edit-form-Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type/' + QuestionId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001bqz. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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




test("Admin_480. @API Admin question-type-create-formr-Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001bz. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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




///////////////TAG LIST INFORMATION////////////////////////////


/////Create tag////////////

test("Admin_402. @API Admin fetch the tag-save form information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tag',
        {
            data: jsonObject.Admin_Tag_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Tag created successfully")

    //Schema validation
    const schema = jschemasonpath.Tag_Create_Form
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_403. @API Admin add the tag-save _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/tag',
        {
            data: jsonObject.Admin_Tag_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_404. @API Admin add the tag-save _validation of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tagIGS',
        {
            data: jsonObject.Admin_Tag_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


/////////////Search Tag/////////////////

test("Admin_379. @API Admin add the tags-search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tags',
        {
            data: jsonObject.Tag_Search_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    TagId = res.tags.data[0].id
    console.log("Tag id is ", TagId)


})

test("Admin_380. @API Admin add the tags-search _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags',
        {
            data: jsonObject.Admin_Bank_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_381. @API Admin add the tags-search_validation of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tagsIGS',
        {
            data: jsonObject.Admin_Bank_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


////////////Edit Tag////////////////////

test("Admin_409. @API Admin fetch the tag-edit-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tag/' + TagId,
        {
            data: jsonObject.Tag_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Tag updated successfully")

    //Schema validation
    const schema = jschemasonpath.Tag_Edit_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_410. @API Admin add the tag-edit-update _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/tag/' + TagId,
        {
            data: jsonObject.Tag_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_411. @API Admin add the tag-edit-update _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tag/3/IGS',
        {
            data: jsonObject.Tag_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//Get method fot edit tag


test("Admin_405. @API Admin fetch the tag-edit-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tag/' + TagId,
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

})



test("Admin_406. @API Endpoint validation for -tag-edit-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tag/IGS/' + TagId,

        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_407. @API Access token validatio tag-edit-form_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tag/64',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})

//Get method

test("Admin_415. @API Admin fetch the tag-duplicate -form information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags/' + TagId + '/duplicate',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    // Verify Response Payload
    expect(await res.Response.Message).toEqual("Tag duplicated successfully")

    //Schema validation
    const schema = jschemasonpath.Tag_Duplicate_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_416. @API Endpoint validation for tag-duplicate-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags/' + TagId + '/duplicateIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_417. @API Access token validation for tag-duplicate-form_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags/6/duplicate',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})

test("Admin_412. @API Admin add the tag-delete  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/tags/' + TagId,
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

    var res = await response.json()


    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Tag deleted successfully")


    //Schema validation
    const schema = jschemasonpath.Tag_Delete_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})


test("Admin_413. @API Endpoint validation for tag-Delete", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/tags/6/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_414. @API Admin tag-Delete -Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/tags/3',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("AL_001ea. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


test("Admin_418. @API Admin tag-duplicate-form-Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags/' + TagId + '/duplicate',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})


test("AL_001e. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


test("Admin_408. @API Admin add the tag-edit-form information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tag/64',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})


test("AL_001de. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


test("Admin_376. @API Admin create the tag-list information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tags',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Admin_377. @API Admin add  the tag-list of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_378. @API Admin add the tag-list  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tagsIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_382. @API Admin add the Tags-Filter-search  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tags',
        {
            data: jsonObject.Tag_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Admin_383. @API Admin add the  Tags-Filter-search_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags',
        {
            data: jsonObject.Tag_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_384. @API Admin add the  Tags-Filter-search _validation of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tagsIGS',
        {
            data: jsonObject.Tag_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//Get method

test("Admin_385. @API Admin fetch the tags-filters-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/tags',
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})

test("Admin_386. @API Endpoint validation for tags-filters  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/tagsIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_387. @API Access token validation for tags-filters_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/tags',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_388. @API Admin  tags-filters-Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/tags',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})


test("AL_001bc. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


test("Admin_389. @API Admin add the tag-custom-filter-save public or privet information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tags',
        {
            data: jsonObject.Tag_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Admin_390. @API Admin add the tag-custom-filter-save public or privet_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags',
        {
            data: jsonObject.Tag_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_391. @API Admin add the  Tags-Filter-search _validation of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tagsIGS',
        {
            data: jsonObject.Tag_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



test("Admin_392. @API Admin add the tags-pagination information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tags?page=2',
        {
            data: jsonObject.Tag_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Admin_393. @API Admin add the tags-pagination_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags?page=2',
        {
            data: jsonObject.Tag_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_394. @API Admin add the tags-pagination _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tagsIGS?page=2',
        {
            data: jsonObject.Tag_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



test("Admin_395. @API Admin add the tags-show-column information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tags?page=1',
        {
            data: jsonObject.Tag_Show_Column.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Admin_396. @API Admin add the tags-show-column _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags?page=1',
        {
            data: jsonObject.Tag_Show_Column.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_397. @API Admin add the  tags-show-column _validation of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tagsIGS?page=1',
        {
            data: jsonObject.Tag_Show_Column.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



//Get method

test("Admin_398. @API Admin fetch the tag-create-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tag',
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})


test("Admin_399. @API Endpoint validation for -tag-create-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tagIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_400. @API Access token validatio tag-create-form for _information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tag',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_401. @API Admin   tag-create-form field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tag',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001cd. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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



/////////////////Location Information/////////////////////////


///////Create Location//////////////


test("Admin_445. @API Admin fetch the location-save form information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/location',
        {
            data: jsonObject.Location_Save_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Location added successfully")

    //Schema validation
    const schema = jschemasonpath.Location_save_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_446. @API Admin add the location-save _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/location',
        {
            data: jsonObject.Location_Save_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_447. @API Admin add the location-save _validation of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locationIGS',
        {
            data: jsonObject.Location_Save_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


/////////////Search Location/////////////////


test("Admin_426. @API Admin add the Location-search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locations',
        {
            data: jsonObject.Location_Search_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    LocationId = res.locations.data[0].id
    console.log("Location id is ", LocationId)



})

test("Admin_427. @API Admin add the Location-search _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/locations',
        {
            data: jsonObject.Location_Search_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_428. @API Admin add the Location-search_validation of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locationsIGS',
        {
            data: jsonObject.Location_Search_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


////////////Edit Location////////////////////

test("Admin_452. @API Admin fetch the Location-edit-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/location/' + LocationId,
        {
            data: jsonObject.Location_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Location updated successfully")

    //Schema validation
    const schema = jschemasonpath.Location_Edit_schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_453. @API Admin add the location-edit-update _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/location/' + LocationId,
        {
            data: jsonObject.Location_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_454. @API Admin add the location-edit-update _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locationIGS/' + LocationId,
        {
            data: jsonObject.Location_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_419. @API Admin create the location-list information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locations',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Admin_420. @API Admin add  the location-list of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/locations',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_421. @API Admin add the location-list  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locationsIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Admin_429. @API Admin add the Locations-Filter-search  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locations',
        {
            data: jsonObject.Location_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Admin_430. @API Admin add the  Locations-Filter-search_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/locations',
        {
            data: jsonObject.Location_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_431. @API Admin add the  Locations-Filter-search _validation of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locationsIGS',
        {
            data: jsonObject.Location_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//Get method

test("Admin_422. @API Admin fetch the location-filters-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/locations',
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})

test("Admin_423. @API Endpoint validation for locations-filters  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/locationsIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_424. @API Access token validation for locations-filters_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/locations',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_425. @API Admin  locations-filters-Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/locations',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001bc9. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_432. @API Admin add the location-custom-filter-save public or privet information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/location-custom-filter',
        {
            data: jsonObject.Location_Filters_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Admin_433. @API Admin add the location-custom-filter-save public or privet_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/location-custom-filter',
        {
            data: jsonObject.Location_Filters_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_434. @API Admin add the  locations-Filter-search _validation of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/location-custom-filterIGS',
        {
            data: jsonObject.Location_Filters_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



test("Admin_438. @API Admin add the locations-pagination information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locations?page=2',
        {
            data: jsonObject.Tag_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Admin_439. @API Admin add the locations-pagination_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/locations?page=2',
        {
            data: jsonObject.Tag_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_440. @API Admin add the locations-pagination _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locationsIGS?page=2',
        {
            data: jsonObject.Tag_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_435. @API Admin add the location-show-column information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locations',
        {
            data: jsonObject.Location_Show_Column.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Admin_436. @API Admin add the locations-show-column _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/locations',
        {
            data: jsonObject.Location_Show_Column.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_437. @API Admin add the  locations-show-column _validation of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locations/IGS',
        {
            data: jsonObject.Location_Show_Column.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//Get method

test("Admin_441. @API Admin fetch the location-create-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/location',
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})


test("Admin_442. @API Endpoint validation for -location-create-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/locationIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_443. @API Access token validatio location-create-form for _information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/location',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_444. @API Admin   location-create-form field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/location',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001dc8. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Admin_448. @API Admin fetch the location-edit-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/location/' + LocationId,
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()




})


test("Admin_449. @API Endpoint validation for -location-edit-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/location/67/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_450. @API Access token validatio location-edit-form_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/location/64',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_451. @API Admin add the location-edit-form information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/location/64',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})


test("AL_001fty. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Admin_455. @API Admin fetch the duplicate-location information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatelocation/6',
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //  Verify Response Payload
    expect(await res.Response.Message).toEqual("Location duplicated successfully")


    //Schema validation
    const schema = jschemasonpath.Location_Duplicate_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_456. @API Endpoint validation for -duplicate-location  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatelocation/7/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_457. @API Access token validation for duplicate-location _information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatelocation/7',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_458. @API Admin duplicate-location -Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatelocation/7',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //console.log(res);


})


test("AL_001ef4. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Admin_459. @API Admin fetch the deactivate-location-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_location/4',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //  Verify Response Payload
    expect(await res.Response.Message).toEqual("Location deactivated successfully")


    //Schema validation
    const schema = jschemasonpath.Location_Deactivate_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_460. @API Endpoint validation for -deactivate-location  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_location/4/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_461. @API Access token validation for deactivate-location_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_location/4',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_462. @API Admin deactivate-location-Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_location/4',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})


test("AL_001fq. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

////////////////////Checkout timings///////////////////////////



//Get method

test("Admin_463. @API Admin fetch the checkout-settings-form-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-checkout-settings',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})


test("Admin_464. @API Endpoint validation for -checkout-settings-form information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-checkout-settingsIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_465. @API Access token validation for checkout-settings-form_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-checkout-settings',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_466. @API Admin checkout-settings-form-Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-checkout-settings',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})


test("AL_001fa. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


test("Admin_467. @API Admin create the save-checkout-settings information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-checkout-settings',
        {
            data: jsonObject.Save_Checkout.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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

    // Verify Response Payload
    expect(await res.Response.Message).toEqual("Checkout time updated successfully")

    //  Schema validation
    const schema = jschemasonpath.Save_Checkout_Settings_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})



test("Admin_468. @API Admin add  the save-checkout-settings of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/save-checkout-settings',
        {
            data: jsonObject.Save_Checkout.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_469. @API Admin add the save-checkout-settings  of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-checkout-settingsIGS',
        {
            data: jsonObject.Save_Checkout.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


///////////////////////Proctoring/////////////////////////////////



//Get method

test("Admin_470. @API Admin fetch the proctoring-form-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/proctoring',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})


test("Admin_471. @API Endpoint validation for proctoring-form information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/proctoringIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_472. @API Access token validation for proctoring-form_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/proctoring',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_473. @API Admin proctoring-form-Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/proctoring',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})


test("AL_001fl. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


test("Admin_474. @API Admin create the save-proctoring information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/proctoring',
        {
            data: jsonObject.Save_Proctoring.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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

    //  Verify Response Payload
    expect(await res.Response.Message).toEqual("Proctoring Settings Updated  successfully")

    //  Schema validation
    const schema = jschemasonpath.Save_Proctoring_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})



test("Admin_475. @API Admin add  the save-proctoring of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/proctoring',
        {
            data: jsonObject.Save_Proctoring.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_476. @API Admin add the save-proctoring  of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/proctoring/IGS',
        {
            data: jsonObject.Save_Proctoring.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})




/////////////Specilaity ///////////////////////////


///////create Specilaity//////


test("Admin_626. @API Admin add the Specilaity-Save information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/specialty',
        {
            data: jsonObject.Admin_Create_Specilaity.body,

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Specialty created successfully")

    //Schema validation
    const schema = jschemasonpath.Create_Specilaity
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_627. @API Admin add the  Specilaity-Save _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/specialty',
        {
            data: jsonObject.Admin_Create_Specilaity.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_628. @API Admin add the Specilaity-Save _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialtyIGS',
        {
            data: jsonObject.Admin_Create_Specilaity.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


/////////////Search Specilaity////////////////////

test("Admin_647. @API Admin add the Specilaity search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty',
        {
            data: jsonObject.Admin_Specilaity_Search_form.body,

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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
    SpecialityId = res.getspecialty.data[0].id
    console.log("SpecialityId is" + SpecialityId)


    //Schema validation
    const schema = jschemasonpath.Specilaity_Search_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_648. @API Admin add the Specilaity search _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialty',
        {
            data: jsonObject.Admin_Specilaity_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_649. @API Admin add the Specilaity search _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialty/IGS',
        {
            data: jsonObject.Admin_Specilaity_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})

//Get Method

test("Admin_662. @API Admin fetch the duplicate-specialty  -information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatespecialty/' + SpecialityId,
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Specialty duplicated successfully")


    //Schema validation
    const schema = jschemasonpath.Specilaity_Duplicate_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_663. @API Endpoint validation for duplicate-specialty  information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatespecialty/' + SpecialityId + '/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_664. @API Access token validation for duplicate-specialty _information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatespecialty' + SpecialityId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



//////////////////Edit Specilaity////////////////////

test("Admin_637. @API Admin fetch the Specilaity-edit-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/specialty/' + SpecialityId,
        {
            data: jsonObject.Admin_Specilaity_Edit_form.body,

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Specialty updated successfully")

    //Schema validation
    const schema = jschemasonpath.Specilaity_Edit_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_638. @API Admin add the Specilaity-edit-update _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/specialty/' + SpecialityId,
        {
            data: jsonObject.Admin_Specilaity_Edit_form.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_639. @API Admin add the Specilaity-edit-update _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/specialty/' + SpecialityId + '/IGS',
        {
            data: jsonObject.Admin_Specilaity_Edit_form.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

//delete_speciality

test("Admin_666. @API Admin fetch the delete-specialty-role", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deletespecialty/' + SpecialityId,
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

    var res = await response.json()


    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Specialty deleted successfully")


    //Schema validation
    const schema = jschemasonpath.Specilaity_Delete_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_667. @API Admin delete-specilaity_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deletespecialty/' + SpecialityId,
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_668. @API Endpoint validation for delete-specialty ", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deletespecialty/' + SpecialityId + '/IGS',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//Get Method

test("Admin_629. @API Admin fetch the specialty-form-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialty',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_630. @API Endpoint validation for specialty-form   information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialtyIGS',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_631. @API Access token validation for specialty-form _information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialty',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})

//Get Method

test("Admin_633. @API Admin fetch the specialty-edit-form-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialty/' + SpecialityId,
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_634. @API Endpoint validation for specialty-edit-form  information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialty/' + SpecialityId + '/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_635. @API Access token validation for specialty-edit-form_information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialty/' + SpecialityId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_636. @API Admin specialty-edit-form-Header field validation - invalid.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialty/' + SpecialityId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})


test("AL_001an. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

})



test("Admin_632. @API Admin specialty-form-Header field validation - invalid.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialty',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})


test("AL_001az. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

})

test("Admin_665. @API Admin duplicate-specialty-Header field validation - invalid.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatespecialty' + SpecialityId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token

            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})



test("AL_001aw. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

})


test("Admin_640. @API Admin create the specialty-list  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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



test("Admin_641. @API Admin add  the specialty-list  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialty',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_642. @API Admin add the specialty-list   of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//Get Method

test("Admin_643. @API Admin fetch the specialty-filter -information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialtyfilter',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


    //Schema validation
    const schema = jschemasonpath.Specilaity_Filter_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_644. @API Endpoint validation for specialty-filter  information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialtyfilter/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_645. @API Access token validation for specialty-filter_information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialtyfilter',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_646. @API Admin specialty-filter-Header field validation - invalid.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialtyfilter',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})


test("AL_001ax. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

})


test("Admin_650. @API Admin create the specialty-list-filter-search  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty',
        {
            data: jsonObject.Admin_specialty_filter_search.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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



test("Admin_651. @API Admin add  the specialty-list-filter-search  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialty',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_652. @API Admin add the specialty-list-filter-search  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty/IGS',
        {
            data: jsonObject.Admin_specialty_filter_search.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_653. @API Admin create the specialty-custom-filter-save  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Admin_specialty_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Filter saved successfully")


    //Schema validation
    const schema = jschemasonpath.Specialty_custom_filter
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})



test("Admin_654. @API Admin add  the specialty-custom-filter-save  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/custom-filter',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_655. @API Admin add the specialty-custom-filter-save  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter/IGS',
        {
            data: jsonObject.Admin_specialty_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);



    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_656. @API Admin create the specialty-list-field-cloumn-hide and show  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty',
        {
            data: jsonObject.Admin_specialty_field_cloumn_hide_show.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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



test("Admin_657. @API Admin add  the specialty-list-field-cloumn-hide and show  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialty',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_658. @API Admin add the specialty-list-field-cloumn-hide and show  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty/IGS',
        {
            data: jsonObject.Admin_specialty_filter_search.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_659. @API Admin create the specialty-pagination  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty?page=1',
        {
            data: jsonObject.Admin_specialty_pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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



test("Admin_660. @API Admin add  the specialty-pagination  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialty?page=1',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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


test("Admin_661. @API Admin add the specialty-pagination of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty/IGS?page=1',
        {
            data: jsonObject.Admin_specialty_pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


////////////WBA Settings/////////////////////

//////create WBA Settings////////


test("Admin_715. @API Admin add the notificationemail-save information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notificationemail',
        {
            data: jsonObject.Admin_Create_notificationemail.body,

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Email Id has been created successfully")

    //Schema validation
    const schema = jschemasonpath.Create_notificationemail
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_716. @API Admin add the  notificationemail-save _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/notificationemail',
        {
            data: jsonObject.Admin_Create_notificationemail.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_717. @API Admin add the notificationemail-save_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemailIGS',
        {
            data: jsonObject.Admin_Create_notificationemail.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


/////////////Search WBA Settings////////////////////

test("Admin_732. @API Admin add the  notification_emails-search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notification_emails',
        {
            data: jsonObject.Admin_notification_emails_Search_form.body,

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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
    NotificationId = res.notification_emails.data[0].id
    console.log("NotificationId is" + NotificationId)


    //Schema validation
    // const schema = jschemasonpath.Specilaity_Search_Schema
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()

})


test("Admin_733. @API Admin add the  notification_emails-search_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notification_emails',
        {
            // data: jsonObject.Admin_notification_emails_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_734 . @API Admin add the  notification_emails-search _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notification_emails/IGS',
        {
            data: jsonObject.Admin_notification_emails_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})

//Get Method

test("Admin_744. @API Admin fetch the notification-email-list-status-update-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail/status/' + NotificationId + '/1',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Email status has been changed")


    //Schema validation
    const schema = jschemasonpath.Notification_Duplicate_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_745. @API Endpoint validation for notification-email-list-status-update  information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail/status/' + NotificationId + '/1/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_746. @API Access token validation for notification-email-list-status-update _information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail/status/' + NotificationId + '/1',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})


//////////////////Edit WBA Settings////////////////////

test("Admin_722. @API Admin fetch the notification-email-update  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notificationemail/' + NotificationId,
        {
            data: jsonObject.Admin_notification_email_update.body,

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Email Id has been updated successfully")

    //Schema validation
    const schema = jschemasonpath.notification_Edit_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_723. @API Admin add the notification-email-update _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/notificationemail/' + NotificationId,
        {
            data: jsonObject.Admin_notification_email_update.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_724. @API Admin add the notification-email-update_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notificationemail/' + NotificationId + '/IGS',
        {
            data: jsonObject.Admin_notification_email_update.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//delete_notification

test("Admin_748. @API Admin fetch the delete-notification-emai-role", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deletenotificationemail/' + NotificationId,
        {
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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

    var res = await response.json()


    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Email deleted successfully")


    //Schema validation
    const schema = jschemasonpath.Notification_Email_Delete_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_749. @API Admin delete-notification-emai_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deletenotificationemail/' + NotificationId,
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_750. @API Endpoint validation for delete-notification-emai ", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deletenotificationemail/' + NotificationId + '/IGS',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



//Get Method

test("Admin_711. @API Admin fetch the notificationemail-form-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_712. @API Endpoint validation for notificationemail-form  information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemailIGS',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_713. @API Access token validation for notificationemail-form _information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})

//Get Method

test("Admin_718. @API Admin fetch the notification-email-edit-form-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail/' + NotificationId,
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_719. @API Endpoint validation for notification-email-edit-form  information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail/' + NotificationId + '/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_720. @API Access token validation for notification-email-edit-form_information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail/' + NotificationId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_721. @API Admin notification-email-edit-form-Header field validation - invalid.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail/' + NotificationId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})


test("AL_001ac. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

})



test("Admin_714. @API Admin notificationemail-form-Header field validation - invalid.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})


test("AL_001av. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

})


test("Admin_747. @API Admin notification-email-list-status-update-Header field validation - invalid.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail/status/' + NotificationId + '/1',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})



test("AL_001as. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

})

test("Admin_725. @API Admin create the notification_emails-list information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notification_emails',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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



test("Admin_726. @API Admin add  the notification_emails-list  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notification_emails',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_727. @API Admin add the notification_emails-list   of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notification_emails/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//Get Method

test("Admin_728. @API Admin fetch the notification-email-filter-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getnotificationemailfilter',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


    //Schema validation
    const schema = jschemasonpath.Specilaity_Filter_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_729. @API Endpoint validation for notification-email-filter  information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getnotificationemailfilter/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_730. @API Access token validation for notification-email-filter_information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getnotificationemailfilter',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_731. @API Admin notification-email-filter-Header field validation - invalid.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getnotificationemailfilter',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})


test("AL_001ak. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

})


test("Admin_735. @API Admin create the  notification_emails-filter-search  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notification_emails',
        {
            data: jsonObject.Admin_notification_emails_filter_search.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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
    // notificationID = res.notification_emails.data[0].id
    //  console.log("notificationID is" +notificationID)

})



test("Admin_736. @API Admin add  the  notification_emails-filter-search  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notification_emails',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_737. @API Admin add the  notification_emails-filter-search  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notification_emails/IGS',
        {
            data: jsonObject.Admin_notification_emails_filter_search.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_738. @API Admin create the notification custom-filter-save public or private information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Admin_notification_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Filter saved successfully")


    //Schema validation
    const schema = jschemasonpath.Specialty_custom_filter
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})



test("Admin_739. @API Admin add  the notification- custom-filter-save public or private  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/custom-filter',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_740. @API Admin add the notification- custom-filter-save public or private  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter/IGS',
        {
            data: jsonObject.Admin_notification_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);



    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_741. @API Admin create the notification-list-field-cloumn-hide and show  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notification_emails',
        {
            data: jsonObject.Admin_notification_field_cloumn_hide_show.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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



test("Admin_742. @API Admin add  the notification-list-field-cloumn-hide and show  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notification_emails',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_743. @API Admin add the notification-list-field-cloumn-hide and show  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notification_emails/IGS',
        {
            data: jsonObject.Admin_notification_field_cloumn_hide_show.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



/////////////////////Data Adminitration////////////////////




test("Admin_669. @API Admin verify  the xlsx file download  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1/import-statistics-template',
        {
            data: jsonObject.Xlsx_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/vnd.ms-excel')




})



test("Admin_670. @API  Admin verify  the xlsx file download  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/exam-api/v1/import-statistics-template',
        {
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_671. @API Admin verify  the xlsx file download of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1/import-statistics-template/IGS',
        {
            data: jsonObject.Xlsx_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_672. @API Admin verify  the csv-file-download format  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1/import-statistics-template-csv',
        {
            data: jsonObject.csv_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token,
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/csv')


    //  var res = await response.json()


})



test("Admin_673. @API Admin verify  the csv-file-download   of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/exam-api/v1/import-statistics-template-csv',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_674. @API Admin verify  the csv-file-download  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1/import-statistics-template-csv/IGS',
        {
            data: jsonObject.csv_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()   

})



test("Admin_675. @API Admin verify  the exam-statistics-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/import/exam-statistics',
        {
            data: jsonObject.exam_statistics_form.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token,
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



test("Admin_676. @API Admin verify  the exam-statistics-form   of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/import/exam-statistics',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_677. @API Admin verify  the exam-statistics-form  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/import/exam-statisticsIGS',
        {
            data: jsonObject.exam_statistics_form.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_678. @API Admin verify  the exam-import-statistics-save  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();

    const file = path.resolve("./utils/api/Import_statistics_template.xlsx");
    const image = fs.readFileSync(file);

    const response = await request.post(baseURL + '/exam-api/v1/exam/import-statistics',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token,

            },
            multipart: {
                file: {
                    name: "testFile.xlsx",
                    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    buffer: image
                },
                exams: '[{"id":3,"name":"Proctoring Exam 1"}]',
                version: '[{"id":2,"name":"2"}]'

            },

        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");


    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Exam statistics imported successfully")


    //Schema validation
    const schema = jschemasonpath.Exam_Statistics
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

});



test("Admin_679. @API Admin verify  the exam-import-statistics-save  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1/exam/import-statistics',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_680. @API Admin verify  the exam-import-statistics-save of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1/exam/import-statisticsIGS',
        {
            // data: jsonObject.csv_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


///Question Import

test("Admin_681. @API Admin verify  the xlsx file download  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/import-question-template',
        {
            data: jsonObject.xlsx_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token,
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/vnd.ms-excel')


})



test("Admin_682. @API Admin verify  the xlsx file download   of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/import-question-template',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_683. @API Admin verify  the xlsx file download   of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/import-question-templateIGS',
        {
            data: jsonObject.xlsx_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})




test("Admin_684. @API Admin verify  the csv-file-download format  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/import-question-template-csv',
        {
            data: jsonObject.Question_csv_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token,
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/zip')





})



test("Admin_685. @API Admin verify  the csv-file-download   of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/import-question-template-csv',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_686. @API Admin verify  the csv-file-download  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/import-question-template-csvIGS',
        {
            data: jsonObject.csv_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_687. @API Admin verify  the import-module-type-forms  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/import',
        {
            data: jsonObject.import_module_type.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token,
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



test("Admin_688. @API Admin verify  the import-module-type-forms  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/import',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_689. @API Admin verify  the import-module-type-forms  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/importIGS',
        {
            data: jsonObject.import_module_type.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



test("Admin_690. @API Admin verify  the Question-import-statistics-save  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();

    const file = path.resolve("./utils/api/Import_question_template.xlsx");
    const image = fs.readFileSync(file);

    const response = await request.post(baseURL + '/question-api/v1/import',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token,

            },
            multipart: {
                file: {
                    name: "testFile.xlsx",
                    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    buffer: image
                },
                "bank_id": '[{"id":1,"name":"Practice Bank"}]',

            },


        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");


    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Question import in progress.")


    //Schema validation
    const schema = jschemasonpath.Question_File_Import
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

});



test("Admin_691. @API Admin verify  the Question-import-statistics-save  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1/exam/import-statistics',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_692. @API Admin verify  the Question-import-statistics-save of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1/exam/import-statisticsIGS',
        {
            // data: jsonObject.csv_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})




test("Admin_697. @API Admin verify  the exam-export-download format  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exam/export',
        {
            data: jsonObject.exam_export_download.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token,
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/zip')





})



test("Admin_698. @API Admin verify  the exam-export-download   of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/exam-api/v1.2/exam/export',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_699. @API Admin verify  the exam-export-download of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exam/export/IGS',
        {
            data: jsonObject.exam_export_download.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_704. @API Admin verify  the export-questions-download  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/export-questions',
        {
            data: jsonObject.export_questions_download.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token,
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    // var res = await response.json()


})



test("Admin_705. @API Admin verify  the export-questions-download   of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/export-questions',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_706. @API Admin verify  the export-questions-download of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/export-questionsIGS',
        {
            data: jsonObject.export_questions_download.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



//Get Method

test("Admin_693. @API Admin fetch the question_import-success -information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question_import_log/4',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Message).toEqual("Question imported successfully")


    //Schema validation
    const schema = jschemasonpath.Question_Import
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_694. @API Endpoint validation for question_import-success  information.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question_import_log/4/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_695. @API Access token validation for question_import-success _information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question_import_log/4',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})




//Get Method

test("Admin_700. @API Admin fetch the export-questions-form -information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/export-questions',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_701. @API Endpoint validation for export-questions-form   information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/export-questionsIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_702. @API Access token validation for export-questions-form _information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/export-questions',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



//Get Method

test("Admin_707 @API Admin fetch the export-exams-form-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/export-exams',
        {

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})


test("Admin_708. @API Endpoint validation for export-exams-form    information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/export-examsIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_709. @API Access token validation for export-exams-form   _information.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/export-exams',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_710. @API Admin export-exams-form-Header field validation - invalid.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/export-exams',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})



test("AL_001aok. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

})

test("Admin_703. @API Admin export-questions-form -Header field validation - invalid.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/export-questions',
        {

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})



test("AL_001alk. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

})



test("Admin_696. @API Admin question_import-success -Header field validation - invalid.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question_import_log/4',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})



test("AL_001ask. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

})


////////VENUE//////////////////

//Create Venue

test("Admin_785. @API Admin add the Venue-Save information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/racp_venue',
        {
            data: jsonObject.Admin_Venue_Create.body,
            
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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
  expect(await res.Response.Message).toEqual("Venue added successfully")

    //Schema validation
    const schema = jschemasonpath.Create_Specilaity
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_786. @API Admin add the  Venue-Save _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/racp_venue',
        {
            data: jsonObject.Admin_Venue_Create.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})

test("Admin_787. @API Admin add the Venue-Save _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/racp_venueIGS',
        {
            data: jsonObject.Admin_Venue_Create.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


/////////////Search Venue////////////////////

test("Admin_758. @API Admin add the Venue search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/racp_venues',
        {
            data: jsonObject.Admin_Venue_Search_form.body,
            
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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
    VenueId = res.venues.data[0].id
    console.log("VenueId is" +VenueId)
  
    
    // //Schema validation
    // const schema = jschemasonpath.Specilaity_Search_Schema
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()

})


test("Admin_759. @API Admin add the Venue search _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/racp_venues',
        {
            data: jsonObject.Admin_Venue_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_760. @API Admin add the Venue search _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/racp_venues/IGS',
        {
            data: jsonObject.Admin_Venue_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})

///Edit Location

////////////Edit Location////////////////////
    
test("Admin_792. @API Admin fetch the Venue-edit-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/racp_venue/' +VenueId,
        {
            data: jsonObject.Venue_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
 
    //Verify Response Payload
  expect(await res.Response.Message).toEqual("Venue updated successfully")

//Schema validation
const schema = jschemasonpath.Venue_Edit
const validate = avj.compile(schema)
const isValid = validate(res)
expect(isValid).toBeTruthy()

})

test("Admin_793. @API Admin add the venue-edit-update _validation of incorrect HTTP method", async ({ request }) => {
jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
verifyResponse.fetchrequestTime();
const response = await request.put(baseURL + '/admin-api/v1/racp_venue/'+VenueId,
    {
        data: jsonObject.Venue_Edit_Form.body,
        headers: {
            "accept": "application/json",
            "webreferer":  jsonpath.webreferer,
            "authorization": token
        }
    });
//Validation of response time
verifyResponse.validateTime(jsonpath.responseDuration);


//Status code validation
expect(response.status()).toBe(405);


//Verify Response Headers
expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

// var res = await response.json()


})


test("Admin_794. @API Admin add the Venue-edit-update _validation of invalid endpoint", async ({ request }) => {
jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
verifyResponse.fetchrequestTime();
const response = await request.post(baseURL + '/admin-api/v1/racp_venueIGS/'+VenueId,
    {
        data: jsonObject.Venue_Edit_Form.body,
        headers: {
            "accept": "application/json",
            "webreferer":  jsonpath.webreferer,
            "authorization": token
        }
    });
//Validation of response time
verifyResponse.validateTime(jsonpath.responseDuration);


//Status code validation
expect(response.status()).toBe(404);


//Verify Response Headers
expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

// var res = await response.json()


})


//Get method

test("Admin_773. @API Admin fetch the duplicate-venue information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicateracp_venue/'+VenueId,
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    
     //  Verify Response Payload
     expect(await res.Response.Message).toEqual("Venue duplicated successfully")


    //Schema validation
    const schema = jschemasonpath.duplicate_venue
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_774. @API Endpoint validation for duplicate-venue  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicateracp_venue/'+VenueId+'/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_775. @API Access token validation for duplicate-venue_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicateracp_venue/'+VenueId,
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})

//Get method

test("Admin_777. @API Admin fetch the deactivate-Venue-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_racp_venue/'+VenueId,
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    
    //  Verify Response Payload
    expect(await res.Response.Message).toEqual("Venue deactivated successfully")


    //Schema validation
    const schema = jschemasonpath.Venue_Deactivate_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_778. @API Endpoint validation for -deactivate-venue information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_racp_venue/'+VenueId+'/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_779. @API Access token validation for deactivate-venue_information", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_racp_venue/'+VenueId,
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
        
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_780. @API Admin deactivate-Venue-Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_racp_venue/'+VenueId,
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001efo. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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




test("Admin_776. @API Admin duplicate-Venue -Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicateracp_venue/'+VenueId,
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     //console.log(res);
    

})


test("AL_001ef. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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



test("Admin_751. @API Admin create the Venues-list information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/racp_venues',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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



test("Admin_752. @API Admin add  the venues-list of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/racp_venues',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_753. @API Admin add the Venues-list  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/racp_venuesIGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    
})


test("Admin_761. @API Admin add the Venue-Filter-search  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/racp_venues',
        {
            data: jsonObject.Venue_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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



test("Admin_762. @API Admin add the  Venue-Filter-search_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/racp_venues',
        {
            data: jsonObject.Venue_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_763. @API Admin add the  Venue-Filter-search _validation of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/racp_venuesIGS',
        {
            data: jsonObject.Venue_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


//Get method

test("Admin_754. @API Admin fetch the Venue-filters-information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getvenuefilter',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
   // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    

})


test("Admin_755. @API Endpoint validation for Venue-filters  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getvenuefilterIGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_756. @API Access token validation for venue-filters_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getvenuefilter',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})


test("Admin_757. @API Admin  venues-filters-Header field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getvenuefilter',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})

test("AL_001bcy. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


test("Admin_764. @API Admin add the Venue-custom-filter-save public or privet information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Venue_Custom_Filters_public.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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
   expect(await res.Response.Message).toEqual("Filter saved successfully")

   //Schema validation
   const schema = jschemasonpath.Venue_cutom_filter_schema
   const validate = avj.compile(schema)
   const isValid = validate(res)
   expect(isValid).toBeTruthy()
  
})



test("Admin_765. @API Admin add the venue-custom-filter-save public or privet_validation of incorrect HTTP method", async ({ request }) => {

    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Venue_Custom_Filters_public.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_766. @API Admin add the  venue-custom-filter-save public or privet_validation of invalid endpoint.", async ({ request }) => {

    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filterIGS',
        {
            data: jsonObject.Venue_Custom_Filters_public.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})



test("Admin_767. @API Admin add the venue-pagination information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/racp_venues?page=2',
        {
            data: jsonObject.Venue_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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



test("Admin_768. @API Admin add the Venue-pagination_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/racp_venues?page=2',
        {
            data: jsonObject.Venue_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_769. @API Admin add the Venue-pagination _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/racp_venuesIGS?page=2',
        {
            data: jsonObject.Venue_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_770. @API Admin add the Venues-show-column information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/racp_venues?page=1',
        {
            data: jsonObject.Venue_Show_Column.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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



test("Admin_771. @API Admin add the Venues-show-column _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/racp_venues?page=1',
        {
            data: jsonObject.Venue_Show_Column.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_772. @API Admin add the  Venues-show-column _validation of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/racp_venuesIGS?page=1',
        {
            data: jsonObject.Venue_Show_Column.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


//Get method

test("Admin_781. @API Admin fetch the Venue-create-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/racp_venue',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
   // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    

})


test("Admin_782. @API Endpoint validation for Venue-create-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/racp_venueIGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_783. @API Access token validatio Venue-create-form for _information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/racp_venue',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_784. @API Admin venue-create-form field validation - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/racp_venue',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})

test("AL_001dcd. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Admin_788. @API Admin fetch the venue-edit-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/racp_venue/'+VenueId,
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    

    

})


test("Admin_789. @API Endpoint validation for venue-edit-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/racp_venue/'+VenueId+'/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_790. @API Access token validatio venue-edit-form_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/racp_venue/'+VenueId,
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_791. @API Admin add the Venue-edit-form information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/racp_venue/'+VenueId,
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fj. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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




////////////iExam  Settings//////


//////Create iExam /////////////


test("Admin_818. @API Admin add the iExam-Templete  Save information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exam/save-details',
        {
            data: jsonObject.Admin_iExam_Create.body,
            
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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

    var res1 = res.Response
    var resarry = [];
    for (var i in res1)
        resarry.push([i, res1[i]]);

    iExamId = (resarry[2])[1];
    console.log("Exam id is:", iExamId) 
       
       
       //Verify Response Payload
  expect(await res.Response.Message).toEqual("Exam template created successfully")

    //Schema validation
    const schema = jschemasonpath.Create_iExam_Template
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_819. @API Admin add the  iExam-Template Save _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/exam-api/v1.2/template-exam/save-details',
        {
            data: jsonObject.Admin_iExam_Create.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})

test("Admin_820. @API Admin add the iExam-template Save _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/save-detailsIGS',
        {
            data: jsonObject.Admin_iExam_Create.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Admin_802. @API Admin add the template-exam-create-exam-section-form information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exam/layout/'+iExamId+'/session/0/section/exam/form',
        {
            data: jsonObject.Admin_template_exam_Create.body,
            
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
   // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    

})


test("Admin_803. @API Admin add the template-exam-create-exam-section-form _validation of incorrect HTTP method", async ({ request }) => {

    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/exam-api/v1.2/template-exam/layout/'+iExamId+'/session/0/section/exam/form',
        {
            data: jsonObject.Admin_template_exam_Create.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})

test("Admin_804. @API Admin add the template-exam-create-exam-section-form  validation of invalid endpoint", async ({ request }) => {

    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exam/layout/'+iExamId+'/session/0/section/exam/formIGS',
        {
            data: jsonObject.Admin_template_exam_Create.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Admin_805. @API Admin add the template-exam-section-content-form information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exam/layout/'+iExamId+'/session/0/section/content/form',
        {
            data: jsonObject.Admin_template_exam_section.body,
            
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_806. @API Admin add the template-exam-section-content-form_validation of incorrect HTTP method", async ({ request }) => {

    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/exam-api/v1.2/template-exam/layout/'+iExamId+'/session/0/section/content/form',
        {
            data: jsonObject.Admin_template_exam_section.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})

test("Admin_807. @API Admin add the template-exam-section-content-form  validation of invalid endpoint", async ({ request }) => {

    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exam/layout/'+iExamId+'/session/0/section/content/formIGS',
        {
            data: jsonObject.Admin_template_exam_section.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Admin_808. @API Admin add the template-exam-section-survey-form information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exam/layout/'+iExamId+'/session/0/section/survey/form',
        {
            data: jsonObject.Admin_template_exam_survey.body,
            
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_809. @API Admin add the template-exam-section-survey-form_validation of incorrect HTTP method", async ({ request }) => {

    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/exam-api/v1.2/template-exam/layout/'+iExamId+'/session/0/section/survey/form',
        {
            data: jsonObject.Admin_template_exam_survey.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})

test("Admin_810. @API Admin add the template-exam-section-survey-form  validation of invalid endpoint", async ({ request }) => {

    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exam/layout/'+iExamId+'/session/0/section/survey/formIGS',
        {
            data: jsonObject.Admin_template_exam_survey.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



/////////////Search iExam////////////////////

test("Admin_841. @API Admin add the iExam-Template search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exams',
        {
            data: jsonObject.Admin_iExam_Search_form.body,
            
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_842. @API Admin add the iExam-template search _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exams',
        {
            data: jsonObject.Admin_iExam_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_843. @API Admin add the iExam-Template search _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exams/IGS',
        {
            data: jsonObject.Admin_iExam_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



//Edit Iexam Template


test("Admin_811 @API Admin add the template-exam-save-form information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exam/save-sessions/'+iExamId,
        {
            data: jsonObject.Admin_template_exam_save.body,
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
  expect(await res.message).toEqual("Session(s) Updated successfully")

  //Schema validation
  const schema = jschemasonpath.Create_template_Exam
  const validate = avj.compile(schema)
  const isValid = validate(res)
  expect(isValid).toBeTruthy()
    

})


test("Admin_812. @API Admin add the template-exam-save_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/exam-api/v1.2/template-exam/save-sessions/'+ iExamId,
        {
            data: jsonObject.Admin_template_exam_save.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})

test("Admin_813. @API Admin add the template-exam-save  validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exam/save-sessions/2/IGS',
        {
            data: jsonObject.Admin_template_exam_save.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})

    
test("Admin_795. @API Admin fetch the exam-templates-edit-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exam-templates/layout/'+iExamId+'/form',
        {
            data: jsonObject.iExam_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
 
    

})

test("Admin_796. @API Admin add the exam-templates-edit-form _validation of incorrect HTTP method", async ({ request }) => {
jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
verifyResponse.fetchrequestTime();
const response = await request.get(baseURL + '/exam-api/v1.2/exam-templates/layout/'+iExamId+'/form',
    {
        
        headers: {
            "accept": "application/json",
            "webreferer":  jsonpath.webreferer,
            "authorization": token
        }
    });
//Validation of response time
verifyResponse.validateTime(jsonpath.responseDuration);


//Status code validation
expect(response.status()).toBe(405);


//Verify Response Headers
expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

// var res = await response.json()


})


test("Admin_797. @API Admin add the exam-templates-edit-form_validation of invalid endpoint", async ({ request }) => {
jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
verifyResponse.fetchrequestTime();
const response = await request.post(baseURL + '/exam-api/v1.2/exam-templates/layout/'+iExamId+'/form/IGS',
    {
        data: jsonObject.iExam_Edit_Form.body,
        headers: {
            "accept": "application/json",
            "webreferer":  jsonpath.webreferer,
            "authorization": token
        }
    });

//Validation of response time
verifyResponse.validateTime(jsonpath.responseDuration);


//Status code validation
expect(response.status()).toBe(404);


//Verify Response Headers
expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

// var res = await response.json()

})




    
test("Admin_825. @API Admin fetch the template-exam-update  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exam/update-details/'+iExamId,
        {
            data: jsonObject.template_exam_update.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
 
    //Verify Response Payload
  expect(await res.Response.Message).toEqual("Exam template updated successfully")

  //Schema validation
  const schema = jschemasonpath.template_exam_update
  const validate = avj.compile(schema)
  const isValid = validate(res)
  expect(isValid).toBeTruthy()

})

test("Admin_826. @API Admin add the template-exam-update_validation of incorrect HTTP method", async ({ request }) => {
jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
verifyResponse.fetchrequestTime();
const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/update-details/'+iExamId,
    {
        
        headers: {
            "accept": "application/json",
            "webreferer":  jsonpath.webreferer,
            "authorization": token
        }
    });
//Validation of response time
verifyResponse.validateTime(jsonpath.responseDuration);


//Status code validation
expect(response.status()).toBe(405);


//Verify Response Headers
expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

// var res = await response.json()


})


test("Admin_827. @API Admin add the template-exam-update_validation of invalid endpoint", async ({ request }) => {
jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
verifyResponse.fetchrequestTime();
const response = await request.post(baseURL + '/exam-api/v1.2/template-exam/update-details/'+iExamId+'/IGS',
    {
        data: jsonObject.template_exam_update.body,

        headers: {
            "accept": "application/json",
            "webreferer":  jsonpath.webreferer,
            "authorization": token
        }
    });

//Validation of response time
verifyResponse.validateTime(jsonpath.responseDuration);


//Status code validation
expect(response.status()).toBe(404);


//Verify Response Headers
expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

// var res = await response.json()

})


    
test("Admin_828. @API Admin fetch the exam-templates-editsection-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exam-templates/layout/'+iExamId+'/form',
        {
            data: jsonObject.iExam_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
 
    

})

test("Admin_829. @API Admin add the exam-templates-editsection-form_validation of incorrect HTTP method", async ({ request }) => {

jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
verifyResponse.fetchrequestTime();
const response = await request.get(baseURL + '/exam-api/v1.2/exam-templates/layout/'+iExamId+'/form',
    {
        
        headers: {
            "accept": "application/json",
            "webreferer":  jsonpath.webreferer,
            "authorization": token
        }
    });
//Validation of response time
verifyResponse.validateTime(jsonpath.responseDuration);


//Status code validation
expect(response.status()).toBe(405);


//Verify Response Headers
expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

// var res = await response.json()


})


test("Admin_830. @API Admin add the exam-templates-editsection-form_validation of invalid endpoint", async ({ request }) => {

jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
verifyResponse.fetchrequestTime();
const response = await request.post(baseURL + '/exam-api/v1.2/exam-templates/layout/'+iExamId+'/form/IGS',
    {
        data: jsonObject.iExam_Edit_Form.body,
        headers: {
            "accept": "application/json",
            "webreferer":  jsonpath.webreferer,
            "authorization": token
        }
    });

//Validation of response time
verifyResponse.validateTime(jsonpath.responseDuration);


//Status code validation
expect(response.status()).toBe(404);


//Verify Response Headers
expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

// var res = await response.json()

})

    
test("Admin_831. @API Admin fetch the template-exam-save-sessions  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exam/save-sessions/'+iExamId,
        {
            data: jsonObject.template_exam_save_sessions.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

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
  const schema = jschemasonpath.template_exam_save
  const validate = avj.compile(schema)
  const isValid = validate(res)
  expect(isValid).toBeTruthy()
    

})

test("Admin_832. @API Admin add the template-exam-save-sessions_validation of incorrect HTTP method", async ({ request }) => {
jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
verifyResponse.fetchrequestTime();
const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/save-sessions/'+iExamId,
    {
        
        headers: {
            "accept": "application/json",
            "webreferer":  jsonpath.webreferer,
            "authorization": token
        }
    });
//Validation of response time
verifyResponse.validateTime(jsonpath.responseDuration);


//Status code validation
expect(response.status()).toBe(405);


//Verify Response Headers
expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

// var res = await response.json()


})


test("Admin_833. @API Admin add the template-exam-save-sessions_validation of invalid endpoint", async ({ request }) => {
jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
verifyResponse.fetchrequestTime();
const response = await request.post(baseURL + '/exam-api/v1.2/template-exam/save-sessions/'+iExamId+'/IGS',
    {
        data: jsonObject.template_exam_save_sessions.body,

        headers: {
            "accept": "application/json",
            "webreferer":  jsonpath.webreferer,
            "authorization": token
        }
    });

//Validation of response time
verifyResponse.validateTime(jsonpath.responseDuration);


//Status code validation
expect(response.status()).toBe(404);


//Verify Response Headers
expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

// var res = await response.json()

})


//Get method

test("Admin_853. @API Admin fetch the template-exam-duplicate  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/duplicate/'+iExamId,
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
  expect(await res.Response.Message).toEqual("Exam duplicated successfully")

  //Schema validation
  const schema = jschemasonpath.template_exam_duplicate
  const validate = avj.compile(schema)
  const isValid = validate(res)
  expect(isValid).toBeTruthy()
    

})


test("Admin_854. @API Endpoint validation for template-exam-duplicate  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/duplicate/'+iExamId+'/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_855. @API Access token validatio template-exam-duplicate_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/duplicate/'+iExamId,
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})


//Delete Exam Template

test("Admin_857. @API Admin fetch the deactive-template-exams", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/exam-api/v1.2/template-exams/'+iExamId+'/delete',
        {   
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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

    var res = await response.json()
  
    
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Exam deactivated successfully.")


    //Schema validation
    const schema = jschemasonpath.Exam_Deactivated 
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_858. @API Admin deactive-emplate-exams_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exams/'+iExamId+'/delete',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})

test("Admin_859. @API Endpoint validation for deactive-emplate-exams ", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/exam-api/v1.2/template-exams/'+iExamId+'/delete/IGS',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})



test("Admin_860. @API Admin fetch the template-exams-active", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/exam-api/v1.2/template-exams/'+iExamId+'/active',
        {   
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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

    var res = await response.json()
  
    
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Exam activated successfully.")


    //Schema validation
    const schema = jschemasonpath.Exam_Activated 
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})



test("Admin_861. @API Admin template-exams-active_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exams/'+iExamId+'/active',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})

test("Admin_862. @API Endpoint validation for template-exams-active ", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/exam-api/v1.2/template-exams/'+iExamId+'/active/IGS',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


//Get method

test("Admin_821. @API Admin fetch the exam-sections  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/details/'+iExamId,
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    

    

})


test("Admin_822. @API Endpoint validation for exam-sections information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/detailsIGS/'+iExamId,
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_823. @API Access token validatio exam-sections _information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/details/'+iExamId,
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})


test("Admin_824. @API Admin add the exam-sections information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/details/'+iExamId,
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fv9. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


test("Admin_856. @API Admin add the template-exam-duplicate  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/duplicate/'+iExamId,
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fvh. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

//Get method

test("Admin_814. @API Admin fetch the template-exam-create-form   information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/create/0',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    

})


test("Admin_815. @API Endpoint validation for template-exam-create-form   information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/create/0/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_816. @API Access token validatio template-exam-create-form _information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/create/0',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_817. @API Admin add the template-exam-create-form  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/create/0',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001f. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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



///////////////////7/3/2024///////////////////////

//Get method

test("Admin_798. @API Admin fetch the exam-sections  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/sections',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    

    

})


test("Admin_799. @API Endpoint validation for exam-sections   information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/sectionsIGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_800. @API Access token validatio exam-sections _information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/sections',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})


test("Admin_801. @API Admin add the exam-sections information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/sections',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fv. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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




test("Admin_834. @API Admin add the template-exam-list information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exams',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_835. @API Admin add the template-exam-list_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/exam-api/v1.2/template-exams',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})

test("Admin_836. @API Admin add the template-exam-list  validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exams/IGS',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


//Get method

test("Admin_837. @API Admin fetch the template-exam-filters  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/filters',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    

    

})


test("Admin_838. @API Endpoint validation for template-exam-filters  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/filtersIGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_839. @API Access token validatio template-exam-filters _information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/filters',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})


test("Admin_840. @API Admin add the template-exam-filters information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/filters',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fvr. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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




/////////////Search iExam////////////////////

test("Admin_844. @API Admin add the iExam-Template-filter search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exams',
        {
            data: jsonObject.Admin_iExam_filter_Search_form.body,
            
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_845. @API Admin add the iExam-template-filter search _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exams',
        {
            data: jsonObject.Admin_iExam_filter_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_846. @API Admin add the iExam-Template-filter search _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exams/IGS',
        {
            data: jsonObject.Admin_iExam_filter_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Admin_847. @API Admin add the template-exam-custom-filter-save information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exam/custom-filter',
        {
            data: jsonObject.Admin_iExam_custom_filter_save.body,
            
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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
  const schema = jschemasonpath.iExam_custom_filter_save
  const validate = avj.compile(schema)
  const isValid = validate(res)
  expect(isValid).toBeTruthy()

})


test("Admin_848. @API Admin add the template-exam-custom-filter-save_validation of incorrect HTTP method", async ({ request }) => {

    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exam/custom-filter',
        {
            data: jsonObject.Admin_iExam_custom_filter_save.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_849. @API Admin add the template-exam-custom-filter-save_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exam/custom-filter/IGS',
        {
            data: jsonObject.Admin_iExam_custom_filter_save.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Admin_850. @API Admin add the template-exams-field-column-hide and show information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exams',
        {
            data: jsonObject.Admin_iExam_column_hide_show.body,
            
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_851. @API Admin add the template-exams-field-column-hide and show validation of incorrect HTTP method", async ({ request }) => {

    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/template-exams',
        {
            data: jsonObject.Admin_iExam_column_hide_show.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_852. @API Admin add the template-exams-field-column-hide and show validation of invalid endpoint", async ({ request }) => {

    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/template-exams/IGS',
        {
            data: jsonObject.Admin_iExam_column_hide_show.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})






//////////////////Offline Exam//////////////////////


test("Admin_867. @API Admin add the save-offline-exam  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-offline-exam',
        {

            data: jsonObject.save_offline_exam.body,

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
   // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Recovery Details Updated")


    //Schema validation
    const schema = jschemasonpath.Recovery_Details 
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_868. @API Admin add the save-offline-exam _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/save-offline-exam',
        {
            data: jsonObject.save_offline_exam.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_869. @API Admin add the save-offline-exam   validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-offline-exam/IGS',
        {
            data: jsonObject.save_offline_exam.body,

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



//Get method

test("Admin_863. @API Admin fetch the create-offline-exam-form   information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/create-offline-exam',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

  
    

})


test("Admin_864. @API Endpoint validation for create-offline-exam-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/create-offline-exam/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_865. @API Access token validatio create-offline-exam-form _information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/create-offline-exam',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_866. @API Admin add the create-offline-exam-form  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/create-offline-exam',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fvj. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//////Live Monitor///////////


test("Admin_874. @API Admin add the save-livemonitor-settings  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-livemonitor-settings',
        {

            data: jsonObject.livemonitor_settings.body,

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
   // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Live monitor refresh time updated successfully")


    //Schema validation
    const schema = jschemasonpath.livemonitor_Details 
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_875. @API Admin add the save-livemonitor-settings _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/save-livemonitor-settings',
        {
            data: jsonObject.livemonitor_settings.body,

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})

test("Admin_876. @API Admin add the save-livemonitor-settings   validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-livemonitor-settingsIGS',
        {
            data: jsonObject.livemonitor_settings.body,


            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



//Get method

test("Admin_870. @API Admin fetch the livemonitor-settings-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-livemonitor-settings',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_871. @API Endpoint validation for livemonitor-settings-form  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-livemonitor-settings/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_872. @API Access token validatio livemonitor-settings-form_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-livemonitor-settings',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_873. @API Admin add the livemonitor-settings-form  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-livemonitor-settings',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fvq. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


/////////Ofline Action////////////


test("Admin_881. @API Admin add the offline-action-update  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/offline-action',
        {

            data: jsonObject.Offline_Action.body,

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
   // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Offline Action settings has been updated successfully")


    //Schema validation
    const schema = jschemasonpath.Offline_Action 
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_882. @API Admin add the offline-action-update _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/offline-action',
        {
            data: jsonObject.Offline_Action.body,

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})

test("Admin_883. @API Admin add the offline-action-update  validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/offline-actionIGS',
        {
            data: jsonObject.Offline_Action.body,


            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



//Get method

test("Admin_877. @API Admin fetch the offline-action-form   information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/offline-action',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_878. @API Endpoint validation for offline-action-form   information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/offline-action/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_879. @API Access token validatio offline-action-form _information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/offline-action',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_880. @API Admin add the offline-action-form   information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/offline-action',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fpq. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

/////////////////Registration Portal/////////////////////////////

test("Admin_888. @API Admin add the save-Iregistration-List  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v2/saveIregistrationList',
        {

            data: jsonObject.save_Iregistration_List.body,

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
   // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Iregistration settings have been updated successfully")


    //Schema validation
    const schema = jschemasonpath.iResgistration_List 
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_889. @API Admin add the save-Iregistration-List _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v2/saveIregistrationList',
        {
            data: jsonObject.save_Iregistration_List.body,

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})

test("Admin_890. @API Admin add the save-Iregistration-List   validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v2/saveIregistrationListIGS',
        {
            data: jsonObject.save_Iregistration_List.body,


            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



//Get method

test("Admin_884. @API Admin fetch the iRegistration-List   information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v2/getIregistrationList',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_885. @API Endpoint validation for iRegistration-List    information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v2/getIregistrationList/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_886. @API Access token validatio iRegistration-List   _information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v2/getIregistrationList',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_887. @API Admin add the iRegistration-List    information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v2/getIregistrationList',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fgq. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


///////////////////isawe-case-settings/////////////////

test("Admin_895. @API Admin add the save-isawe-case-setting  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-isawe-case-setting',
        {

            data: jsonObject.save_isawe_case_setting.body,

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
   // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("ISAWE-CASE settings has been updated successfully")


    //Schema validation
    const schema = jschemasonpath.iSaw_Case_Schema 
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_896. @API Admin add the save-isawe-case-setting_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/save-isawe-case-setting',
        {
            data: jsonObject.save_isawe_case_setting.body,


            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})

test("Admin_897. @API Admin add the save-isawe-case-setting  validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-isawe-case-settingIGS',
        {
            data: jsonObject.save_isawe_case_setting.body,


            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



//Get method

test("Admin_891. @API Admin fetch the isawe-case-setting-form   information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/isawe-case-setting',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_892. @API Endpoint validation for isawe-case-setting-form   information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/isawe-case-setting/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_893. @API Access token validation  isawe-case-setting-form  _information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/isawe-case-setting',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_894. @API Admin add the isawe-case-setting-form  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/isawe-case-setting',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fdt. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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



///////////////DashBoard////////////////////////


//Get method

test("Admin_898. @API Admin fetch the show-widget response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_899: @API Endpoint validation for show-widget response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_900. @API Access token validation  show-widget response _information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_901. @API Admin add the show-widget response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fdq. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Admin_902. @API Admin fetch the user-details response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/18',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_903: @API Endpoint validation for user-details response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/18/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_904. @API Access token validation  user-details response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_905. @API Admin add the user-details response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fdi. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Admin_906. @API Admin fetch the exam-marking-listwidget response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/exammarkinglistwidget/18',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_907: @API Endpoint validation for exam-marking-listwidget response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/exammarkinglistwidget/18/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_908. @API Access token validation  exam-marking-listwidget response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/exammarkinglistwidget/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_909. @API Admin add the exam-marking-listwidget response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/exammarkinglistwidget/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fdo. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

//Get method

test("Admin_910. @API Admin fetch the user-exam-listwidget response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/userexamlistwidget/18',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_911: @API Endpoint validation for user-exam-listwidget response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/userexamlistwidget/18/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_912. @API Access token validation  user-exam-listwidget response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/userexamlistwidget/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_913. @API Admin add the user-exam-listwidget response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/userexamlistwidget/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fdl. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

//Get method

test("Admin_914. @API Admin fetch the exam-marking-listwidget-pagination response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/exammarkinglistwidget/18?page=2',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


    //Verify Response Payload
  expect(await res.Response.Message).toEqual("No exams assigned to you")

  //Schema validation
  const schema = jschemasonpath.exam_marking_listwidget_Pagination
  const validate = avj.compile(schema)
  const isValid = validate(res)
  expect(isValid).toBeTruthy()


})


test("Admin_915: @API Endpoint validation for exam-marking-listwidget-pagination response  information", async ({ request }) => {

    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/exammarkinglistwidget/18/IGS?page=2',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_916. @API Access token validation  exam-marking-listwidget-pagination response_information", async ({ request }) => {

    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/exammarkinglistwidget/18?page=2',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_917. @API Admin add the exam-marking-listwidget-pagination response  information - invalid", async ({ request }) => {

    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/exammarkinglistwidget/18?page=2',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fd1. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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




//Get method

test("Admin_918. @API Admin fetch the showwidget-hide response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/5/0',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


    //Verify Response Payload
  expect(await res.Response.Message).toEqual("Widget successfully hide.")

  //Schema validation
  const schema = jschemasonpath.showwidget_hide
  const validate = avj.compile(schema)
  const isValid = validate(res)
  expect(isValid).toBeTruthy()


})


test("Admin_919: @API Endpoint validation for showwidget-hide response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/5/0/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_920. @API Access token validation  showwidget-hide response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/5/0',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_921. @API Admin add the showwidget-hide response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/5/0',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fs1. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

//

//Get method

test("Admin_922. @API Admin fetch the showwidget-shown  response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/5/1',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

//Verify Response Payload
expect(await res.Response.Message).toEqual("Widget successfully shown.")

//Schema validation
const schema = jschemasonpath.showwidget_Shown
const validate = avj.compile(schema)
const isValid = validate(res)
expect(isValid).toBeTruthy()

})


test("Admin_923: @API Endpoint validation for showwidget-shown  response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/5/1/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_924. @API Access token validation  showwidget-shown  response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/5/1',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_925. @API Admin add the showwidget-shown  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/5/1',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001ft1. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Admin_926. @API Admin fetch the showwidget-list  response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_927: @API Endpoint validation for showwidget-list  response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_928. @API Access token validation  showwidget-list  response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_929. @API Admin add the showwidget-list  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fp1. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Admin_933. @API Admin fetch the  login-user-information  response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/18',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})


test("Admin_934: @API Endpoint validation for login-user-information  response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/18/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_935. @API Access token validation  login-user-information  response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_936. @API Admin add the login-user-information  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fp2. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


test("Admin_930. @API Admin getAuth-role-permission-list information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getAuth',
        {
         data: {"user_id":"18"},

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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



test("Admin_931. @API Admin add  the getAuth-role-permission-list of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getAuth',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_932. @API Admin add the getAuth-role-permission-list  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getAuth/IGS',
        {
            data: {"user_id":"18"},
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})



// //Get method

// test("Admin_933. @API Admin fetch the getAuth-role-permission-list  response information", async ({ request }) => {
//     jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
//     verifyResponse.fetchrequestTime();
//     const response = await request.get(baseURL + '/admin-api/v1/user/18',
//         {
           
//             headers: {
//                 "accept": "application/json",
//                 "webreferer":  jsonpath.webreferer,
//                 "authorization": token
//             }
//         });
//     //Validation of response time
//     verifyResponse.validateTime(jsonpath.responseDuration);
//     //console.log(await response.json())

//     //Status code validation
//     expect(response.status()).toBe(200);
//     expect(response.ok()).toBeTruthy()
//     expect(response.statusText()).toBe("OK");

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('application/json')

//     var res = await response.json()



// })


// test("Admin_934: @API Endpoint validation for getAuth-role-permission-list  response  information", async ({ request }) => {
//     jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
//     verifyResponse.fetchrequestTime();
//     const response = await request.get(baseURL + '/admin-api/v1/user/18/IGS',
//         {
//            // data: jsonpath.adminLogin.body,
//             headers: {
//                 "accept": "application/json",
//                 "webreferer":  jsonpath.webreferer,
//                 "authorization": token
//             }
//         });
//     //Validation of response time
//     verifyResponse.validateTime(jsonpath.responseDuration);


//     //Status code validation
//     expect(response.status()).toBe(404);
 

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

//     // var res = await response.json()
    

// })


// test("Admin_935. @API Access token validation  getAuth-role-permission-list  response_information", async ({ request }) => {
//     jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
//     verifyResponse.fetchrequestTime();
//     const response = await request.get(baseURL + '/admin-api/v1/user/18',
//         {
//            // data: jsonpath.adminLogin.body,
//             headers: {
//                 "accept": "application/json",
//                 "webreferer":  jsonpath.webreferer,
//                 "authorization": ""
//             }
//         });
//     //Validation of response time
//     verifyResponse.validateTime(jsonpath.responseDuration);


//     //Status code validation
//     expect(response.status()).toBe(401);
 

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

//     // var res = await response.json()
    

// })



// test("Admin_936. @API Admin add the getAuth-role-permission-list  response  information - invalid", async ({ request }) => {
//     jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
//     verifyResponse.fetchrequestTime();
//     const response = await request.get(baseURL + '/admin-api/v1/user/18',
//         {
//            // data: jsonpath.adminLogin.body,
//             headers: {
//                 "accept": "application/json",
//                 "webreferer": jsonpath.Invalid_webreferer,
//                 "authorization": token
//             }
//         });
//     //Validation of response time
//     verifyResponse.validateTime(jsonpath.responseDuration);


//     //Status code validation
//     expect(response.status()).toBe(401);
 

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

//      var res = await response.json()
//      console.log(res);
    

// })


// test("AL_001fp2. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
//     jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
//     verifyResponse.fetchrequestTime();
//     const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
//         {
//             data: jsonpath.adminLogin.body,
//             headers: jsonpath.adminLogin.header
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
//     token = res.access_token
//     //Verify Response Payload
//     console.log("Access token is:", token)
//     expect(await res.message).toEqual("Login Successful")

//     //Schema validation
//     const schema = jschemasonpath
//     const validate = avj.compile(schema)
//     const isValid = validate(res)
//     expect(isValid).toBeTruthy()

// })




//Get method

test("Admin_937. @API Admin fetch the  todolist-data   response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/todolist/18',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})


test("Admin_938: @API Endpoint validation for   todolist-data  response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/todolist/18/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_939. @API Access token validation   todolist-data  response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/todolist/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_940. @API Admin add the  todolist-data  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/todolist/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fp6. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Admin_941. @API Admin fetch the recent-list-data  response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/recentlist/18',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_942: @API Endpoint validation for recent-list-data  response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/recentlist/18/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_943. @API Access token validation  recent-list-data  response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/recentlist/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_944. @API Admin add the recent-list-data  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/recentlist/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fp8. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Admin_945. @API Admin fetch the user-filteruser-filters   response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/userfilters/18',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_946: @API Endpoint validation for user-filteruser-filters   response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/userfilters/18/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_947. @API Access token validation user-filteruser-filters  response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/userfilters/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_948. @API Admin add the user-filteruser-filters   response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/userfilters/18',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001f42. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Admin_949. @API Admin fetch the question-filters  response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question-filters',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_950: @API Endpoint validation for question-filters response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question-filtersIGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_951. @API Access token validation  question-filters response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question-filters',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_952. @API Admin add the question-filters  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question-filters',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fp0. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Post method

test("Admin_953. @API Admin  questions-status-list information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questions',
        {
         data: {"pagination":"","pageName":"dashboard-questions"},

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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



test("Admin_954. @API Admin add  the questions-status-list of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/questions',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_955. @API Admin add the questions-status-list  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questions/IGS',
        {
            data: {"pagination":"","pageName":"dashboard-questions"},
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


//Get method

test("Admin_956. @API Admin fetch the show-widget-hide  response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/1/0',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    
//Verify Response Payload
expect(await res.Response.Message).toEqual("Widget successfully hide.")


//Schema validation
const schema = jschemasonpath.show_widget_hide
const validate = avj.compile(schema)
const isValid = validate(res)
expect(isValid).toBeTruthy()


})


test("Admin_957: @API Endpoint validation for show-widget-hide response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/1/0/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_958. @API Access token validation  show-widget-hide  response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/1/0',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_959. @API Admin add the show-widget-hide  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/1/0',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001f72. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Admin_960. @API Admin fetch the show-widget-shown   response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/7/1',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

//Verify Response Payload
expect(await res.Response.Message).toEqual("Widget successfully shown.")


//Schema validation
const schema = jschemasonpath.show_widget_shown
const validate = avj.compile(schema)
const isValid = validate(res)
expect(isValid).toBeTruthy()

})


test("Admin_961: @API Endpoint validation for show-widget-shown   response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/7/1/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_962. @API Access token validation  show-widget-shown   response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/7/1',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_963. @API Admin add the show-widget-shown   response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/showwidget/18/7/1',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001f12. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Admin_964. @API Admin fetch the user-filters-paggination  response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/userfilters/18?page=2',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_965: @API Endpoint validation for user-filters-paggination  response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/userfilters/18/IGS?page=2',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_966. @API Access token validation  user-filters-paggination  response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/userfilters/18?page=2',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_967. @API Admin add the user-filters-paggination  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/userfilters/18?page=2',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001f52. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Admin_968. @API Admin fetch the recent-list-pagination  response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/recentlist/18?page=2',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_969: @API Endpoint validation for recent-list-pagination  response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/recentlist/18/IGS?page=2',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_970. @API Access token validation recent-list-pagination  response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/recentlist/18?page=2',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_971. @API Admin add the recent-list-pagination  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/recentlist/18?page=2',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001f22. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Admin_972. @API Admin fetch the to-do-list-pagination  response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/todolist/18?page=2',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

// //Verify Response Payload
// expect(await res.Response.Message).toEqual("No items available for your action.")


// //Schema validation
// const schema = jschemasonpath.to_do_list_pagination
// const validate = avj.compile(schema)
// const isValid = validate(res)
// expect(isValid).toBeTruthy()


})


test("Admin_973: @API Endpoint validation for to-do-list-pagination  response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/todolist/18/IGS?page=2',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_974. @API Access token validation  to-do-list-pagination  response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/todolist/18?page=2',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Admin_975. @API Admin add the to-do-list-pagination  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/todolist/18?page=2',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fpe. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

//post method

test("Admin_976. @API Admin questions-status-filter-search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questions',
        {
            data: jsonObject.Admin_Question_Status_filter_search.body,

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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



test("Admin_977. @API Admin add  the questions-status-filter-search of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/questions',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_978. @API Admin add the questions-status-filter-search  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getAuth/IGS',
        {
            data: jsonObject.Admin_Question_Status_filter_search.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Admin_979. @API Admin save-custom-filter-save-privet information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/custom-filter',
        {
            data: jsonObject.Admin_save_custom_privet.body,

            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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
  const schema = jschemasonpath.Custom_Filter_Saved
  const validate = avj.compile(schema)
  const isValid = validate(res)
  expect(isValid).toBeTruthy()
    
})



test("Admin_980. @API Admin add  the save-custom-filter-save-privet of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/custom-filter',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Admin_981. @API Admin add the save-custom-filter-save-privet  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/custom-filter/IGS',
        {
                    data: jsonObject.Admin_save_custom_privet.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})

*/

////////////////////////Exam List///////////////////////////


//Get method

test("Exam List_001. @API Admin fetch the Exam-Details-dublicate  response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/details/1309',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()




})


test("Exam List_002: @API Endpoint validation for Exam-Details-dublicate  response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/detailsIGS/1309',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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


test("Exam List_003. @API Access token validation  Exam-Details-dublicate  response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/details/1309',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

 
    

})



test("Exam List_004. @API Admin add the Exam-Details-dublicate  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/details/1309',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fpe. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Exam List_005. @API Admin fetch the Exam-duplicate-save  response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/duplicate/1309',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()




})


test("Exam List_006: @API Endpoint validation for Exam-duplicate-save  response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/duplicateIGS/1309',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Exam List_007. @API Access token validation  Exam-duplicate-save  response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/duplicate/1309',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Exam List_008. @API Admin add the Exam-duplicate-save  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/duplicate/1309',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001f4e. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Exam List_009. @API Admin fetch the Exam-preview-pdf  response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/preview/1313',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()




})


test("Exam List_010: @API Endpoint validation for Exam-preview-pdf  response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/preview/1313/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Exam List_011. @API Access token validation  Exam-preview-pdf  response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/preview/1313',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Exam List_012. @API Admin add the Exam-preview-pdf  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/preview/1313',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001f1e. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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



test("Exam List_016. @API Admin create the Exam-list information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exams',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Exam List_017. @API Admin add  the Exam-list of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exams',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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


test("Exam List_018. @API Admin add the Exam-list  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exams/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



//Get method

test("Exam List_019. @API Admin fetch the Exam-filters response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/filters',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()




})


test("Exam List_020: @API Endpoint validation for Exam-filters   response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/filters/IGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Exam List_021. @API Access token validation  Exam-filters   response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/filters',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Exam List_022. @API Admin add the Exam-filters  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/filters',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_00151e. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


/////////////Search Exam////////////////////

test("Exam List_023. @API Admin add the Exam search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exams',
        {
            data:jsonObject.Admin_exam_search.body,
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    examlistId = res.exams.data[0].id
    console.log("examlistId  is" + examlistId)


})


test("Exam List_024. @API Admin add the Exam search _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exams',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Exam List_025. @API Admin add the Exam search _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exams/IGS',
        {
             data:{
                "freeText": [
                    "Examname"
                ]
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Exam List_026. @API Admin add the exam-pagination information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exams?page=2',
        {
            data: jsonObject.examlist_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Exam List_027. @API Admin add the Exam-pagination_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exams?page=2',
        {
            data: jsonObject.examlist_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Exam List_028. @API Admin add the exam-pagination _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exams/IGS?page=2',
        {
            data: jsonObject.examlist_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Exam List_029. @API Admin add the Exam-filter-search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exams',
        {
            data: jsonObject.examlist_filter_search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Exam List_030. @API Admin add the Exam-filter-search_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exams',
        {
            data: jsonObject.examlist_filter_search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Exam List_031. @API Admin add the Exam-filter-search_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exams/IGS',
        {
            data: jsonObject.examlist_filter_search.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



test("Exam List_032. @API Admin add the custom-filter-save  public or privet information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/custom-filter',
        {
            data: jsonObject.examlist_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    const schema = jschemasonpath.custom_filter_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})



test("Exam List_033. @API Admin add the custom-filter-save  public or privet_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/blueprint-api/v1/custom-filter',
        {
           // data: jsonObject.examlist_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Exam List_034. @API Admin add the custom-filter-save  public or privet_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/blueprint-api/v1/custom-filter/IGS',
        {
            data: jsonObject.examlist_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Exam List_035. @API Admin add the Exam-list-show column information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exams',
        {
            data: jsonObject.examlist_custom_showcolumn.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Exam List_036. @API Admin add the Exam-list-show column of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exams',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Exam List_037. @API Admin add the Exam-list-show column of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exams/IGS',
        {
            data: jsonObject.examlist_custom_showcolumn.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("ES_001d. @API Validation of Exam creation successfull message.", async ({ request }) => {
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
     const schema = jschemasonpath.Create_Exam
     const validate = avj.compile(schema)
     const isValid = validate(res)
     expect(isValid).toBeTruthy()
 })
 


//Delete Exam list

//Delete Exam Template

test("Exam_List_013. @API Admin fetch the Exam-delete", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/exam-api/v1.2/exam/'+exam_ID+'/delete',
        {   
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
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

    var res = await response.json()
  
    
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Exam deleted successfully.")


    //Schema validation
    const schema = jschemasonpath.Exam_List_Delete
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})


test("Exam_List_015. @API Admin Exam-delete validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1.2/exam/'+exam_ID+'/delete',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Exam_List_014. @API Endpoint validation for Exam-delete", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/exam-api/v1.2/exam/'+exam_ID+'/delete/IGS',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()List_019
    

})



/////////////////////Question list Api////////////////////////////


test("Question List_038. @API Admin add the Question-Types-list  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questiontypes',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Question List_039. @API Admin add the Question-Types-list  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/questiontypes',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Question List_040. @API Admin add the Question-Types-list  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questiontypes/IGS',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Question List_041. @API Admin add the create-question-page-image-gallery information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image-gallery',
        {
            data: {
                "banks": [
                    1
                ],
                "showImages": true
            }       ,
            //jsonObject.examlist_custom_showcolumn.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Question List_042. @API Admin add the create-question-page-image-gallery of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/image-gallery',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Question List_043. @API Admin add the create-question-page-image-gallery of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/file-api/v1/image-gallery/IGS',
        {
            data: {
                "banks": [
                    1
                ],
                "showImages": true
            }       ,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Question List_044. @API Admin add the Create-Question-page-bank-question_type information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/createQuestion?bank=1&type=1',
        {
            data: {"type":"VSAQ","bank":1},
            //jsonObject.examlist_custom_showcolumn.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Question List_045. @API Admin add the Create-Question-page-bank-question_type of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/question-api/v1/createQuestion?bank=1&type=1',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Question List_046. @API Admin add the Create-Question-page-bank-question_type of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/createQuestionIGS?bank=1&type=1',
        {
            data: {"type":"VSAQ","bank":1},
            //jsonObject.examlist_custom_showcolumn.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})




test("Question List_051. @API Admin add the Question-types-page-search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questiontypes',
        {
            data: {"freeText":["mcq"]},
            //jsonObject.examlist_custom_showcolumn.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Question List_052. @API Admin add the Question-types-page-search of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/question-api/v1/questiontypes',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Question List_053. @API Admin add the Question-types-page-search of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questiontypesIGS',
        {
            data: {"freeText":["mcq"]},
            //jsonObject.examlist_custom_showcolumn.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Question List_058. @API Admin add the Question-List information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questions',
        {
            data: {"type":"VSAQ","bank":1},
            //jsonObject.examlist_custom_showcolumn.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Question List_059. @API Admin add the Question-List of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/question-api/v1/questions',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Question List_060. @API Admin add the Question-List of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questionsIGS',
        {
            data: {"type":"VSAQ","bank":1},
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Question List_065. @API Admin add the Questions - search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questions',
        {
            data: {
                "freeText": [
                    "isawe"
                ]
            },
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Question List_066. @API Admin add the Questions - search of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/question-api/v1/questions',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Question List_067. @API Admin add the Questions - search of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questionsIGS',
        {
            data: {
                "freeText": [
                    "isawe"
                ]
            },
            //jsonObject.examlist_custom_showcolumn.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Question List_068. @API Admin add the Questions-filter-search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questions',
        {
            data: {
                "freeText": [
                    "isawe"
                ],
                "filterArray": [
                    {
                        "filterId": "Title",
                        "operator": "like",
                        "displayText": "Title <span>is like</span> ",
                        "filterValue1": "isawe",
                        "filterValue2": "",
                        "filterValue3": "",
                        "operation": ""
                    }
                ]
            },
            //jsonObject.examlist_custom_showcolumn.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Question List_069. @API Admin add the Questions-filter-search of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/question-api/v1/questions',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Question List_070. @API Admin add the Questions-filter-search of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questionsIGS',
        {
            data: {
                "freeText": [
                    "isawe"
                ],
                "filterArray": [
                    {
                        "filterId": "Title",
                        "operator": "like",
                        "displayText": "Title <span>is like</span> ",
                        "filterValue1": "isawe",
                        "filterValue2": "",
                        "filterValue3": "",
                        "operation": ""
                    }
                ]
            },
            //jsonObject.examlist_custom_showcolumn.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Question List_071. @API Admin add the Question-custom-filter-save public or privet information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/custom-filter',
        {
            data:jsonObject.questionlist_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    const schema = jschemasonpath.Question_custom_filter
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()


})



test("Question List_072. @API Admin add the Question-custom-filter-save public or privet of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/question-api/v1/custom-filter',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Question List_073. @API Admin add the Question-custom-filter-save public or privet of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/custom-filterIGS',
        {
            data: {
                "filterArray": {
                    "filterName": "pri titleqa",
                    "filterType": "private",
                    "filterPage": "showquestions",
                    "filter_id": ""
                },
                "customFilter": [
                    {
                        "filterId": "Title",
                        "operator": "like",
                        "displayText": "Title <span>is like</span> ",
                        "filterValue1": "isawe",
                        "filterValue2": "",
                        "filterValue3": "",
                        "operation": ""
                    }
                ]
            },
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Question List_074. @API Admin add the Questions-pagination information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questions?page=2',
        {
            data: {
                "freeText": [
                    "isawe"
                ]
            },
            //jsonObject.examlist_custom_showcolumn.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Question List_075. @API Admin add the Questions-pagination of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/question-api/v1/questions?page=2',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Question List_076. @API Admin add the Questions-pagination of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questionsIGS?page=2',
        {
            data: {
                "freeText": [
                    "isawe"
                ]
            },
            //jsonObject.examlist_custom_showcolumn.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Question List_077. @API Admin add the Questions-list-show-column information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questions',
        {
            data: {
                "showColumns": [
                    "TAG",
                    "BANK",
                    "mappings",
                    "tags"
                ]
            },
            //jsonObject.examlist_custom_showcolumn.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Question List_078. @API Admin add the Questions-list-show-column of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/question-api/v1/questions',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Question List_079. @API Admin add the Questions-list-show-column of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/questionsIGS',
        {
            data: {
                "showColumns": [
                    "TAG",
                    "BANK",
                    "mappings",
                    "tags"
                ]
            },
            //jsonObject.examlist_custom_showcolumn.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



//Get method

test("Question List_047. @API Admin fetch the create-question-Tags-list  response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/get-image/tags',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()




})


test("Question List_048: @API Endpoint validation for create-question-Tags-list  response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/get-image/tagsIGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Question List_049. @API Access token validation  create-question-Tags-list  response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/get-image/tags',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Question List_050. @API Admin add the create-question-Tags-list  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/get-image/tags',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fpee. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Question List_054. @API Admin fetch the create-question-get-banks  response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/get-image/banks',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()




})


test("Question List_055: @API Endpoint validation for create-question-get-banks  response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/get-image/banksIGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Question List_056. @API Access token validation  create-question-get-banks  response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/get-image/banks',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Question List_057. @API Admin add the create-question-get-banks  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/get-image/banks',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fped. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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


//Get method

test("Question List_061. @API Admin fetch the Question-Filters  response information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question-filters',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()




})


test("Question List_062: @API Endpoint validation for Question-Filters  response  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question-filtersIGS',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()
    

})


test("Question List_063. @API Access token validation Question-Filters  response_information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question-filters',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer":  jsonpath.webreferer,
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()
    

})



test("Question List_064. @API Admin add the Question-Filters  response  information - invalid", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question-filters',
        {
           // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);
 

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

     var res = await response.json()
     console.log(res);
    

})


test("AL_001fied. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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





test("ES_001k. @API Validation of Exam creation successfull message.", async ({ request }) => {
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


test("ES_002g. @API Validation of Exam section and add questions successfull message.", async ({ request }) => {
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

test("ES_003l. @API Validation of Approved Exam  successfull message.", async ({ request }) => {
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

test("ES_004t. @API Validation of add user successful message.", async ({ request }) => {
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



 test("CS_001a. @API Candidate Login Success with Mandatory Fields", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/candidateData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v2/candidate/login',
        {
            data: jsonpath.candidateLogin.body,
            headers: jsonpath.candidateLogin.header

        });
    
//Validation of response time
  verifyResponse.validateTime(jsonObject.responseDuration);
  console.log(await response.json())


//Status code validation
expect(response.status()).toBe(200);
expect(response.ok()).toBeTruthy()
expect(response.statusText()).toBe("OK");


//Verify Response Headers
expect(response.headers()['content-type']).toBe('application/json')
 
    var res = await response.json()
    candidatetoken1 = res.data.access_token
    activeExamID1 = res.data.activeExams[0].examId
    activeSessionID1 = res.data.activeExams[0].sessionId


    //Verify Response Payload
    console.log("Access token is:", candidatetoken1, " and Exam ID is:", activeExamID1, " and Session ID is:", activeSessionID1)
    expect(await res.data.message).toEqual("Login Successful")


    })




    test("AL_001i. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
        jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
        var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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



//start//pause//resume//lock//resume//terminate//

test("Delivery_235. @API Admin add the Start-exam   information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/exam-actions/start-exam',
        {
            data: {
                "examId": activeExamID1,
                "candidateId": [
                    candidateId
                ],
                "sessionId": [
                    {
                        "id": activeSessionID1,
                        "name": "Exam Main Session"
                    }
                ]
            },
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

    // //Verify Response Payload
    // expect(await res.Response.Message).toEqual("")

    // //Schema validation
    // const schema = jschemasonpath.BankCreate_Schema
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()

})

test("Delivery_236. @API Admin add the  Start-exam  _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/exam-actions/start-exam',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_237. @API Admin add the Start-exam  _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/exam-actions/start-examIGS',
        {
            data: {
                "examId": activeExamID1,
                "candidateId": [
                    candidateId
                ],
                "sessionId": [
                    {
                        "id": sessionId,
                        "name": "Exam Main Session"
                    }
                ]
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

   //  var res = await response.json()

})




test("Delivery_226. @API Admin add the Pause-exam  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/exam-actions/pause-exam',
        {
            data: {
                "examId": activeExamID1,
                "candidateId": [
                    candidateId
                ],
                "sessionId": [
                    {
                        "id": activeSessionID1,
                        "name": "Exam Main Session45"
                    }
                ]
            },
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_227. @API Admin add the  Pause-exam _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/exam-actions/pause-exam',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_228. @API Admin add the Pause-exam _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/exam-actions/pause-exam/IGS',
        {
            data: {
                "examId": activeExamID1,
                "candidateId": [
                    candidateId
                ],
                "sessionId": [
                    {
                        "id": activeSessionID1,
                        "name": "Exam Main Session45"
                    }
                ]
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Delivery_223a. @API Admin add the Resume-exam  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/exam-actions/resume-exam',
        {
            data: {
                "examId": activeExamID1,
                "candidateId": [
                    candidateId
                ],
                "sessionId": [
                    {
                        "id": activeSessionID1,
                        "name": "Exam Main Session"
                    }
                ]
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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


test("Delivery_224b. @API Admin add the  Resume-exam _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/exam-actions/resume-exam',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



test("Delivery_225c. @API Admin add the Resume-exam _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/exam-actions/resume-exam/IGS',
        {
            data:{
                "examId": activeExamID1,
                "candidateId": [
                    candidateId
                ],
                "sessionId": [
                    {
                        "id": activeSessionID1,
                        "name": "Exam Main Session"
                    }
                ]
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})




test("Delivery_229. @API Admin add the Lock-exam information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/exam-actions/lock-exam',
        {
            data: {
                "examId": activeExamID1,
                "candidateId": [
                    candidateId
                ],
                "sessionId": [
                    {
                        "id": activeSessionID1,
                        "name": "Exam Main Session"
                    }
                ]
            },
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_230. @API Admin add the  Lock-exam_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/exam-actions/lock-exam',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_231. @API Admin add the Lock-exam _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/exam-actions/lock-exam/IGS',
        {
            data: {
                "examId": activeExamID1,
                "candidateId": [
                    candidateId
                ],
                "sessionId": [
                    {
                        "id": activeSessionID1,
                        "name": "Exam Main Session"
                    }
                ]
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_223. @API Admin add the Resume-exam  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/exam-actions/resume-exam',
        {
            data: {
                "examId": activeExamID1,
                "candidateId": [
                    candidateId
                ],
                "sessionId": [
                    {
                        "id": activeSessionID1,
                        "name": "Exam Main Session"
                    }
                ]
            },

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_224. @API Admin add the  Resume-exam _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/exam-actions/resume-exam',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_225. @API Admin add the Resume-exam _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/exam-actions/resume-exam/IGS',
        {
            data: {
                "examId": activeExamID1,
                "candidateId": [
                    candidateId
                ],
                "sessionId": [
                    {
                        "id": activeSessionID1,
                        "name": "Exam Main Session"
                    }
                ]
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Delivery_232. @API Admin add the  Terminate-exam  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/exam-actions/terminate-exam',
        {
            data: {
                "examId": activeExamID1,
                "candidateId": [
                    candidateId
                ],
                "sessionId": [
                    {
                        "id": activeSessionID1,
                        "name": "Exam Main Session"
                    }
                ]
            },
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_233. @API Admin add the Terminate-exam  _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/exam-actions/terminate-exam',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);   


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Delivery_234. @API Admin add the Terminate-exam _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/exam-actions/terminate-exam/IGS',
        {
            data: {
                "examId": activeExamID1,
                "candidateId": [
                    candidateId
                ],
                "sessionId": [
                    {
                        "id": activeSessionID1,
                        "name": "Exam Main Session"
                    }
                ]
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_238. @API Admin add the Livemonitor-list  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/livemonitor',
        {
            data: {
                "examId": activeExamID1,
                "sessionId": activeSessionID1,
            },
        
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });

        console.log(await response.json())
        
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
  //  console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

     examTest = res.data.candidateList.candidateList[0].candidateId,
    
     sessionId =res.data.candidateList.sessionId,
   
     candidateId =res.data.candidateList.candidateList[0].candidateId,
    
     userId = res.data.candidateList.candidateList[0].moreActions[1].userId,
    
     examIdNum= res.data.candidateList.examId,

     console.log("examTest is:", examTest, " and sessionId is:", sessionId, " and candidateId is:", candidateId,"and userId is:", userId, "and  examIdNum is:", examIdNum,)


})


test("Delivery_239. @API Admin add the  Livemonitor-list _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/livemonitor',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Delivery_240. @API Admin add the Livemonitor-list _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/livemonitorIGS',
        {
            data: {
                "examId": exam_ID,
                "sessionId": activeSessionID1,
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Delivery_181. @API Admin add the Update-user information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/updateuser',
        {
            data:{
                "client_id": "43112",
                "title": [
                    {
                        "id": "MR",
                        "name": "Mr",
                        "value": "Mr",
                        "displayName": "Mr"
                    }
                ],
                "user_name": "randomcandidate",
                "first_name": "Candidate",
                "last_name": "abc",
                "email": "autotest43112@a.com",
                "phone": "9876543201",
                "role": [
                    {
                        "id": 9,
                        "name": "Candidate",
                        "value": "Candidate",
                        "displayName": "Candidate"
                    }
                ],
                "eligible": [
                    {
                        "id": 1,
                        "name": "Yes",
                        "value": "Yes",
                        "displayName": "Yes"
                    }
                ],
                "venue_id": [
                    {"id":3,
                    "name":"Chennai, India",
                    "location_id": 1
                    }
                ],
                "booking_status_id": [
                    {"id":1,
                    "name":"Booked"}
                ],
                "upload": "liv-qa.assessappglobal.com.au/registration/1302/2012227/6305d7568fc95.jpg",
                "examId": examIdNum,
                "candidateId": candidateId,
                "user_id": userId
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_182. @API Admin add the Update-user_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/updateuser',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_183. @API Admin add the Update-user of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))

    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/updateuserIGS',
        {
            data: {
                "client_id": "43112",
                "title": [
                    {
                        "id": "MR",
                        "name": "Mr",
                        "value": "Mr",
                        "displayName": "Mr"
                    }
                ],
                "user_name": "randomcandidate",
                "first_name": "Candidate",
                "last_name": "abc",
                "email": "autotest43112@a.com",
                "phone": "9876543201",
                "role": [
                    {
                        "id": 9,
                        "name": "Candidate",
                        "value": "Candidate",
                        "displayName": "Candidate"
                    }
                ],
                "eligible": [
                    {
                        "id": 1,
                        "name": "Yes",
                        "value": "Yes",
                        "displayName": "Yes"
                    }
                ],
                "venue_id": [
                    {
                        "id": 36,
                        "name": "Chennai Test Venue",
                        "location_id": 1
                    }
                ],
                "booking_status_id": [
                    {
                        "id": 1,
                        "name": "Booked"
                    }
                ],
                "upload": "liv-qa.assessappglobal.com.au/registration/1302/2012227/6305d7568fc95.jpg",
                "examId": "1625",
                "candidateId": "2012322",
                "user_id": "45"
            },

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_184. @API Admin add the Generate-temp-id information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/generatetempid/',
        {
            data: {
    "temp_user_details": [
        {
            "id": "45",
            "upload image": {
                "imgURL": "liv-qa.assessappglobal.com.au/registration/1302/2012227/6305d7568fc95.jpg",
                "isUploading": false,
                "columnName": "upload image",
                "isExisting": true,
                "placeholder": "upload image",
                "isUploadingEnable": false
            },
            "exam id": "2012322",
            "name": "Shiva J",
            "role": "Candidate",
            "status": "Active",
            "eligible": "Yes",
            "invigilator": "",
            "selected": false
        }
    ],
    "examId": examIdNum
},
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Exam id already generated for this User")

    //Schema validation
    const schema = jschemasonpath.generate_temp_id_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Delivery_185. @API Admin add the  Generate-temp-id of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/generatetempid/',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Delivery_186. @API Admin add the Generate-temp-id of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/generatetempid/IGS',
        {
            data: {
                "temp_user_details": [
                    {
                        "id": "1625",
                        "upload image": {
                            "imgURL": "liv-qa.assessappglobal.com.au/registration/1302/2012227/6305d7568fc95.jpg",
                            "isUploading": false,
                            "columnName": "upload image",
                            "isExisting": true,
                            "placeholder": "upload image",
                            "isUploadingEnable": false
                        },
                        "exam id": "2012322",
                        "name": "Candidate abc2",
                        "role": "Candidate",
                        "status": "Active",
                        "eligible": "Yes",
                        "invigilator": "",
                        "selected": false
                    }
                ],
                "examId": "1625"
            },

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_187. @API Admin add the Special-consider-details-popup information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/special-consider-details',
        {
            data: {
                "examId": examIdNum,
                "candidateId": candidateId
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_188. @API Admin add the  Special-consider-details-popup of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/special-consider-details',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_189. @API Admin add the Special-consider-details-popup of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/special-consider-detailsIGS',
        {
            data: {
                "examId": examIdNum,
                "candidateId": candidateId
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_190. @API Admin add the Registration List information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/save-special-consider',
        {
            data: {
                "manage": [
                    {
                        "title": "Candidate Name",
                        "value": "Candidate abc",
                        "type": "label"
                    },
                    {
                        "title": "Special Consideration",
                        "value": true,
                        "type": "checkbox"
                    },
                    {
                        "title": "Notes",
                        "value": "",
                        "type": "textarea"
                    },
                    {
                        "title": "Attach supporting documentation (optional)",
                        "value": [],
                        "type": "attachment",
                        "format": ""
                    }
                ],
                "examId": examIdNum,
                "candidateId": candidateId
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Special Consideration has been updated successfully")

    //Schema validation
    const schema = jschemasonpath.Registration_List_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Delivery_191. @API Admin add the  Registration List of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/save-special-consider',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_192. @API Admin add the Registration List of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/save-special-considerIGS',
        {
            data: {
                "manage": [
                    {
                        "title": "Candidate Name",
                        "value": "Candidate abc",
                        "type": "label"
                    },
                    {
                        "title": "Special Consideration",
                        "value": true,
                        "type": "checkbox"
                    },
                    {
                        "title": "Notes",
                        "value": "",
                        "type": "textarea"
                    },
                    {
                        "title": "Attach supporting documentation (optional)",
                        "value": [],
                        "type": "attachment",
                        "format": ""
                    }
                ],
                "examId": examIdNum,
                "candidateId": candidateId
            },


            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_193. @API Admin add the Live Dashboard  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/total-candidates-statuses',
        {
            data: {
                "examId": examIdNum
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_194. @API Admin add the  Live Dashboard  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/total-candidates-statuses',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_195. @API Admin add the Live Dashboard  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/total-candidates-statusesIGS',
        {
            data: {
                "examId": examIdNum
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_196. @API Admin add the Live Dashboard List-pagination information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/total-candidates-statuses?page=2',
        {
            data:{
                "examId": examIdNum
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_197. @API Admin add the  Live Dashboard List-pagination of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/total-candidates-statuses?page=2',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_198. @API Admin add the Live Dashboard List-pagination of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/total-candidates-statusesIGS?page=2',
        {
            data: {
                "examId": examIdNum
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_199. @API Admin add the Live Dashboard search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/total-candidates-statuses',
        {
            data: {
                "examId": examIdNum,
                "sessionId": sessionId,
                "locationId": 1,
                "venueId": [
                    {
                        "id": 36,
                        "name": "Chennai Test Venue"
                    }
                ],
                "pagination": 25
            },
            

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_200. @API Admin add the  Live Dashboard search of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/total-candidates-statuses',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_201. @API Admin add the Live Dashboard search of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/total-candidates-statusesIGS',
        {
            data: {
                "examId": examIdNum,
                "sessionId": sessionId,
                "locationId": 1,
                "venueId": [
                    {
                        "id": 36,
                        "name": "Chennai Test Venue"
                    }
                ],
                "pagination": 25
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_202. @API Admin add the Reset-password  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/resetpassword',
        {
            data: {
                "examId": examIdNum,
                "candidateId": candidateId,
                "userId": userId,
                "reset_user_details": [
                    {
                        "id": 45,
                        "exam id": "2012322"
                    }
                ]
            },
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Password has been reset successfully")

    //Schema validation
    const schema = jschemasonpath.password_reset_schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Delivery_203. @API Admin add the  Reset-password _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/resetpassword',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_204. @API Admin add the Reset-password _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/resetpasswordIGS',
        {
            data: {
                "examId": examIdNum,
                "candidateId": candidateId,
                "userId": userId,
                "reset_user_details": [
                    {
                        "id": 45,
                        "exam id": examTest
                    }
                ]
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Delivery_208. @API Admin add the Special-consider-details-popup information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/special-consider-details',
        {
            data: {
                "examId": examIdNum,
                "candidateId": candidateId,
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_209. @API Admin add the  Special-consider-details-popup_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/special-consider-details',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_210. @API Admin add the Special-consider-details-popup_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/special-consider-detailsIGS',
        {
            data: {
                "examId": examIdNum,
                "candidateId": candidateId,
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_211. @API Admin add the Save-special-consider information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/save-special-consider',
        {
            data: {
                "manage": [
                    {
                        "title": "Candidate Name",
                        "value": "PFCandidateER8101101017 PFCandidateER8101101017",
                        "type": "label"
                    },
                    {
                        "title": "Special Consideration",
                        "value": true,
                        "type": "checkbox"
                    },
                    {
                        "title": "Notes",
                        "value": "",
                        "type": "textarea"
                    },
                    {
                        "title": "Attach supporting documentation (optional)",
                        "value": [],
                        "type": "attachment",
                        "format": ""
                    }
                ],
                "examId": examIdNum,
                "candidateId": candidateId,
            },
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Special Consideration has been updated successfully")

    //Schema validation
    const schema = jschemasonpath.Save_Special_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Delivery_212. @API Admin add the  Save-special-consider_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/save-special-consider',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_213. @API Admin add the Save-special-consider_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/save-special-considerIGS',
        {
            data: {
                "manage": [
                    {
                        "title": "Candidate Name",
                        "value": "PFCandidateER8101101017 PFCandidateER8101101017",
                        "type": "label"
                    },
                    {
                        "title": "Special Consideration",
                        "value": true,
                        "type": "checkbox"
                    },
                    {
                        "title": "Notes",
                        "value": "",
                        "type": "textarea"
                    },
                    {
                        "title": "Attach supporting documentation (optional)",
                        "value": [],
                        "type": "attachment",
                        "format": ""
                    }
                ],
                "examId": examIdNum,
                "candidateId": candidateId,
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_214. @API Admin add the Get-user-notes-popup information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/get-user-notes',
        {
            data:{
                "examId": examIdNum,
                "candidateId": candidateId,
                "sessionId": sessionId,
                "userId": userId,
            },
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_215. @API Admin add the  Get-user-notes-popup_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/get-user-notes',
        {
            data: jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_216. @API Admin add the Get-user-notes-popup_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/get-user-notesIGS',
        {
            data: {
                "examId": examIdNum,
                "candidateId": candidateId,
                "sessionId": sessionId,
                "userId": userId,
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Delivery_217. @API Admin add the Save-user-notes information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/save-user-notes',
        {
            data: {
                "manage": [
                    {
                        "title": "Candidate Name",
                        "value": "Shiva J",
                        "type": "label"
                    },
                    {
                        "title": "Notes",
                        "value": "test not12",
                        "type": "textarea"
                    }
                ],
                "examId": examIdNum,
                "candidateId": candidateId,
                "userId": userId,
                "sessionId": sessionId,
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Notes has been updated successfully")

    //Schema validation
    const schema = jschemasonpath.SaveUserNotes_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Delivery_218. @API Admin add the  Save-user-notes_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/save-user-notes',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_219. @API Admin add the Save-user-notes_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/save-user-notesIGS',
        {
            data: {
                "manage": [
                    {
                        "title": "Candidate Name",
                        "value": "Shiva J",
                        "type": "label"
                    },
                    {
                        "title": "Notes",
                        "value": "test not12",
                        "type": "textarea"
                    }
                ],
                "examId": examIdNum,
                "candidateId": candidateId,
                "userId": userId,
                "sessionId": sessionId,
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Delivery_220. @API Admin add the Reset-login   information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/exam-actions/reset-login',
        {
            data: {
                "candidateId": [
                    candidateId
                ],
                "sessionId": [
                    {
                        "id": sessionId,
                        "name": "Exam Main Session"
                    }
                ],
                "examId": examIdNum
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Login reset successfully for candidate(s) (Candidate abc)")

    //Schema validation
    const schema = jschemasonpath.ResetLogin_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Delivery_221. @API Admin add the  Reset-login   _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/exam-actions/reset-login',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_222. @API Admin add the Reset-login_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/exam-actions/reset-loginIGS',
        {
            data:  {
                "candidateId": [
                    candidateId
                ],
                "sessionId": [
                    {
                        "id": sessionId,
                        "name": "Exam Main Session"
                    }
                ],
                "examId": examIdNum
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})




test("Delivery_241. @API Admin add the Exam-actions  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/exam-actions',
        {
            data: {"examId":examIdNum},
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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



test("Delivery_242. @API Admin add the  Exam-actions_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/exam-actions',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_243. @API Admin add the Exam-actions_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/exam-actionsIGS',
        {
            data: {"examId":examIdNum},
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_244. @API Admin add the Livemonitor-Show column information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/livemonitor',
        {
            data: {
                "examId": examIdNum,
                "sessionId": sessionId,
                "showColumns": [
                    "client_id",
                    "mappings"
                ]
            },
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_245. @API Admin add the  Livemonitor-Show column of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/livemonitor',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_246. @API Admin add the Livemonitor-Show column_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/livemonitorIGS',
        {
            data: {
                "examId": examIdNum,
                "sessionId": sessionId,
                "showColumns": [
                    "client_id",
                    "mappings"
                ]
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_247. @API Admin add the Livemonitor-Filter information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/livemonitor',
        {
            data: {
                "examId": examIdNum,
                "sessionId": sessionId,
                "locationId": 1,
                "venueId": [
                    {
                        "id": 36,
                        "name": "Chennai Test Venue"
                    }
                ],
                "examStatusId": [
                    {
                        "id": 14,
                        "name": "Exam Completed"
                    }
                ]
            },
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_248. @API Admin add the  Livemonitor-Filter of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/livemonitor',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_249. @API Admin add the Livemonitor-Filter of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/livemonitorIGS',
        {
            data: {
                "examId": examIdNum,
                "sessionId": sessionId,
                "locationId": 1,
                "venueId": [
                    {
                        "id": 36,
                        "name": "Chennai Test Venue"
                    }
                ],
                "examStatusId": [
                    {
                        "id": 14,
                        "name": "Exam Completed"
                    }
                ]
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_250. @API Admin add the Livemonitor-search  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/livemonitor',
        {
            data: {
                "examId": examIdNum,
                "sessionId": sessionId,
                "freeText": "grace"
            },
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_251. @API Admin add the  Livemonitor-search _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/livemonitor',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_252. @API Admin add the Livemonitor-search_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/livemonitorIGS',
        {
            data: {
                "examId": examIdNum,
                "sessionId": sessionId,
                "freeText": "grace"
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Delivery_253. @API Admin add the Registration List information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/manage-registration',
        {
            data: {
                "filterArray": [],
                "pagination": null,
                "showColumns": [],
                "examId": examIdNum
            },
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_254. @API Admin add the  Registration List_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/manage-registration',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_255. @API Admin add the Registration List_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/manage-registrationIGS',
        {
            data: {
                "filterArray": [],
                "pagination": null,
                "showColumns": [],
                "examId": examIdNum
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_256. @API Admin add the Registration Search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/manage-registration',
        {
            data: {
                "filterArray": [],
                "freeText": [
                    "Candidate"
                ],
                "pagination": 25,
                "showColumns": null,
                "examId": examIdNum
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_257. @API Admin add the  Registration Search_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/manage-registration',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_258. @API Admin add the Registration Search_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/manage-registrationIGS',
        {
            data: {
                "filterArray": [],
                "freeText": [
                    "Candidate"
                ],
                "pagination": 25,
                "showColumns": null,
                "examId": examIdNum
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_259. @API Admin add the Registration pagination  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/manage-registration?page=2',
        {
            data: {
                "filterArray": [],
                "freeText": [
                    ""
                ],
                "pagination": 10,
                "showColumns": null,
                "examId": examIdNum
            },
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_260. @API Admin add the  Registration pagination_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/manage-registration?page=2',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_261. @API Admin add the Registration pagination_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/manage-registrationIGS?page=2',
        {
            data: {
                "filterArray": [],
                "freeText": [
                    ""
                ],
                "pagination": 10,
                "showColumns": null,
                "examId": examIdNum
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_262. @API Admin add the Registration Filter information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/manage-registration',
        {
            data: {
                "filterArray": [
                    {
                        "filterId": "Role",
                        "operator": "eq",
                        "displayText": "Type<span> is equal to</span> ",
                        "filterValue1": "Candidate",
                        "filterValue2": "select6",
                        "filterValue3": "",
                        "operation": ""
                    }
                ],
                "freeText": [
                    ""
                ],
                "pagination": 10,
                "showColumns": null,
                "examId": examIdNum
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_263. @API Admin add the  Registration Filter_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/manage-registration',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_264. @API Admin add the Registration Filter_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/manage-registrationIGS',
        {
            data: {
                "filterArray": [
                    {
                        "filterId": "Role",
                        "operator": "eq",
                        "displayText": "Type<span> is equal to</span> ",
                        "filterValue1": "Candidate",
                        "filterValue2": "select6",
                        "filterValue3": "",
                        "operation": ""
                    }
                ],
                "freeText": [
                    ""
                ],
                "pagination": 10,
                "showColumns": null,
                "examId": examIdNum
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_265. @API Admin add the Userpage-moreoption-menu List information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/userpage-moreoption-menu',
        {
            data: {"pageName":"users"},
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_266. @API Admin add the  Userpage-moreoption-menu List _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/userpage-moreoption-menu',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_267. @API Admin add the Userpage-moreoption-menu List_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/userpage-moreoption-menuIGS',
        {
            data: {"pageName":"users"},
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_268. @API Admin add the Registration left menu list information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/exam-details',
        {
            data: {"examId":examIdNum},
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_269. @API Admin add the  Registration left menu list_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/exam-details',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Delivery_270. @API Admin add the Registration left menu list_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/exam-detailsIGS',
        {
            data: {"examId":examIdNum},
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_271. @API Admin add the show column registration list information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/manage-registration',
        {
            data: {"examId":examIdNum},
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_272. @API Admin add the  show column registration list_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/manage-registration',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_273. @API Admin add the show column registration list _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/manage-registrationIGS',
        {
            data: {"examId":examIdNum},
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_274. @API Admin add the Delivery list information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/registration',
        {
           
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_275. @API Admin add the Delivery list_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/registration',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_276. @API Admin add the Delivery list_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/registrationIGS',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_277. @API Admin add the Delivery Pagination information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/registration?page=2',
        {
            data: {"pagination":25},
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_278. @API Admin add the Delivery Pagination_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/registration?page=2',
        {
          
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_279. @API Admin add the Delivery Pagination_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/registrationIGS?page=2',
        {
            data: {"pagination":25},
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Delivery_280. @API Admin add the Delivery Search information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/registration',
        {
            data: {"freeText":["test"]},
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_281. @API Admin add the  Delivery Search_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/registration',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_282. @API Admin add the Delivery Search_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/registrationIGS',
        {
            data: {"freeText":["test"]},
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Delivery_283. @API Admin add the Delivery Filter information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/registration',
        {
            data: {
                "filterArray": [
                    {
                        "filterId": "ID",
                        "operator": "eq",
                        "displayText": "ID <span> is equal to</span> ",
                        "filterValue1": 1297,
                        "filterValue2": "",
                        "filterValue3": "",
                        "operation": ""
                    }
                ],
                "pagination": 25
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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


test("Delivery_284. @API Admin add the  Delivery Filter_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/registration',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



test("Delivery_285. @API Admin add the Delivery Filter_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/registration/IGS',
        {
            data: {
                "filterArray": [
                    {
                        "filterId": "ID",
                        "operator": "eq",
                        "displayText": "ID <span> is equal to</span> ",
                        "filterValue1": 1297,
                        "filterValue2": "",
                        "filterValue3": "",
                        "operation": ""
                    }
                ],
                "pagination": 25
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Delivery_286. @API Admin add the delivery Showcolumn information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/registration',
        {
            data: {
                "showColumns": [
                    "STATUS",
                    "CANDIDATE #",
                    "EXAM NAME",
                    "mappings",
                    "tags"
                ]
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_287. @API Admin add the  delivery Showcolumn_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/registration',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Delivery_288. @API Admin add the delivery Showcolumn_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/registrationIGS',
        {
            data: {
                "showColumns": [
                    "STATUS",
                    "CANDIDATE #",
                    "EXAM NAME",
                    "mappings",
                    "tags"
                ]
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Delivery_289. @API Admin add the Assing Venue And Booking Status information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/examBookingStatusAndVenues',
        {
            data:{
                "examId": examIdNum
            },
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_290. @API Admin add the  Assing Venue And Booking Status_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/examBookingStatusAndVenues',
        {
          
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Delivery_291. @API Admin add the Assing Venue And Booking Status_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/examBookingStatusAndVenuesIGS',
        {
            data:{
                "examId": examIdNum
            },

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Delivery_292. @API Admin add the Assing Venue and Booking Status Save information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/assign-venue-booking-status',
        {
            data: {"selected":[ {
                "id": "45",
                "upload image": {
                    "imgURL": "",
                    "isUploading": false,
                    "columnName": "upload image",
                    "isExisting": true,
                    "placeholder": "upload image",
                    "isUploadingEnable": false
                },
                "exam id": examTest,
                "name": "Shiva J",
                "role": "Candidate",
                "status": "Active",
                "eligible": "Yes",
                "invigilator": ""
            }],"examId":examIdNum,"venue_id":[{"id":3,"name":"Chennai, India"}],"booking_status_id":[{"id":1,"name":"Booked"}]},
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_293. @API Admin add the  Assing Venue and Booking Status Save_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/assign-venue-booking-status',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_294. @API Admin add the Assing Venue and Booking Status Save_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/assign-venue-booking-status/IGS',
        {
            data: {"selected":[ {
                "id": "45",
                "upload image": {
                    "imgURL": "",
                    "isUploading": false,
                    "columnName": "upload image",
                    "isExisting": true,
                    "placeholder": "upload image",
                    "isUploadingEnable": false
                },
                "exam id": examTest,
                "name": "Shiva J",
                "role": "Candidate",
                "status": "Active",
                "eligible": "Yes",
                "invigilator": ""
            }],"examId":examIdNum,"venue_id":[{"id":3,"name":"Chennai, India"}],"booking_status_id":[{"id":1,"name":"Booked"}]},
        
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Delivery_295. @API Admin add the Bulk-assign-invigilator popup information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/bulk-assign-invigilator',
        {
            data: {
                "examId": examIdNum,
                "candidateId": candidateId,
            },
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_296. @API Admin add the  Bulk-assign-invigilator popup_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/bulk-assign-invigilator',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_297. @API Admin add the Bulk-assign-invigilator popup_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/bulk-assign-invigilator/IGS',
        {
            data: {
                "examId": examIdNum,
                "candidateId": candidateId,
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Delivery_298. @API Admin add the Save bulk assign invigilator information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/save-bulk-assign-invigilator',
        {
            data: {
                "venue_id": [
                    {
                        "id": 3,
                        "name": "Chennai, India",
                        "location_id": 1
                    }
                ],
                "tabFrm": {
                    "candidate": {
                        "Candidate": [
                            candidateId
                        ],
                        "user": [
                            {
                                "id": 45,
                                "name": "Invigilator Examincharge"
                            }
                        ]
                    },
                    "invigilator": {}
                },
                "examId": examIdNum,
                "candidateId": candidateId,
            },
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Invigilator has been assigned successfully")

    //Schema validation
    const schema = jschemasonpath.Invigilator_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})



test("Delivery_299. @API Admin add the  Save bulk assign invigilator_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/save-bulk-assign-invigilator',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Delivery_300. @API Admin add the Save bulk assign invigilator_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/save-bulk-assign-invigilatorIGS',
        {
            data: {
                "venue_id": [
                    {
                        "id": 3,
                        "name": "Chennai, India",
                        "location_id": 1
                    }
                ],
                "tabFrm": {
                    "candidate": {
                        "Candidate": [
                            candidateId
                        ],
                        "user": [
                            {
                                "id": 45,
                                "name": "Invigilator Examincharge"
                            }
                        ]
                    },
                    "invigilator": {}
                },
                "examId": examIdNum,
                "candidateId": candidateId,
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})




test("Delivery_304. @API Admin add the Bulk Download User Details information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/downloadBulkUserDetails/1299',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

 //   console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Your file is being currently prepared. Please wait ....")

    //Schema validation
    const schema = jschemasonpath.bulkdownload_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Delivery_305. @API Admin add the  Bulk Download User Details_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/downloadBulkUserDetails/1299',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_306. @API Admin add the Bulk Download User Details_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/downloadBulkUserDetails/1299/IGS',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Delivery_307. @API Admin add the Download All Users Details information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/downloadAllUsersDetails/1299',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Your file is being currently prepared. Please wait ....")

    //Schema validation
    const schema = jschemasonpath.downloaduser_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Delivery_308. @API Admin add the  Download All Users Details_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/downloadAllUsersDetails/1299',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_309. @API Admin add the Download All Users Details_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/downloadAllUsersDetails/1299/IGS',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_313. @API Admin add the Resetpassword  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/resetpassword/',
        {
            data: {"reset_user_details":[ {
                "id": "45",
                "upload image": {
                    "imgURL": "",
                    "isUploading": false,
                    "columnName": "upload image",
                    "isExisting": true,
                    "placeholder": "upload image",
                    "isUploadingEnable": false
                },
                "exam id": examTest,
                "name": "Shiva J",
                "role": "Candidate",
                "status": "Active",
                "eligible": "Yes",
                "invigilator": ""
            }],"examId":exam_ID,"userId":userId},
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.Response.Message).toEqual("Password has been reset successfully")

    //Schema validation
    const schema = jschemasonpath.passwordreset_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Delivery_314. @API Admin add the  Resetpassword _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/resetpassword/',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_315. @API Admin add the Resetpassword _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/resetpassword/IGS',
        {
            data: {"reset_user_details":[ {
                "id": "45",
                "upload image": {
                    "imgURL": "",
                    "isUploading": false,
                    "columnName": "upload image",
                    "isExisting": true,
                    "placeholder": "upload image",
                    "isUploadingEnable": false
                },
                "exam id": examTest,
                "name": "Shiva J",
                "role": "Candidate",
                "status": "Active",
                "eligible": "Yes",
                "invigilator": ""
            }],"examId":examIdNum,"userId":userId},

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_301. @API Admin add the Download User Details information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/downloaduserdetails/'+exam_ID,
        {
            data:{"user_details":[ {
                "id": userId,
                "upload image": {
                    "imgURL": "",
                    "isUploading": false,
                    "columnName": "upload image",
                    "isExisting": true,
                    "placeholder": "upload image",
                    "isUploadingEnable": false
                },
                "exam id": examTest,
                "name": "Shiva J",
                "role": "Candidate",
                "status": "Active",
                "eligible": "Yes",
                "invigilator": ""
            }]},
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_302. @API Admin add the  Download User Details_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/downloaduserdetails/1299',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_303. @API Admin add the Download User Details_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/downloaduserdetails/1299/IGS',
        {
            data: {"user_details":[ {
                "id": "45",
                "upload image": {
                    "imgURL": "",
                    "isUploading": false,
                    "columnName": "upload image",
                    "isExisting": true,
                    "placeholder": "upload image",
                    "isUploadingEnable": false
                },
                "exam id": "2012322",
                "name": "Shiva J",
                "role": "Candidate",
                "status": "Active",
                "eligible": "Yes",
                "invigilator": ""
            }]},
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Delivery_310. @API Admin add the Markers Report Download information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/download-markers-report',
        {
            data: {"examId":exam_ID},
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_311. @API Admin add the  Markers Report Download_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/download-markers-report',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_312. @API Admin add the Markers Report Download_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/download-markers-report/IGS',
        {
            data: {"examId":examIdNum},
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})




test("Delivery_316. @API Admin add the Bulk-Candidate Responses information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/bulk-downloadresponses-pdf/1956',
        {
            data: {"user_details":[]},
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

    expect(await res.Response.Message).toEqual("Your file is being currently prepared. Please wait ....")


    
})


test("Delivery_317. @API Admin add the  Bulk-Candidate Responses_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/bulk-downloadresponses-pdf/1956',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    //var res = await response.json()


})

test("Delivery_318. @API Admin add the Bulk-Candidate Responses_validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/bulk-downloadresponses-pdf/1956/IGS',
        {
            data: {"user_details":[]},
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})

test("AL_001h. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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


test("Delivery_319. @API Admin add the Delete-user  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/deleteuser/',
        {
            data: {"delete_user_details":[{
                "id": userId,
                "upload image": {
                    "imgURL": "",
                    "isUploading": false,
                    "columnName": "upload image",
                    "isExisting": true,
                    "placeholder": "upload image",
                    "isUploadingEnable": false
                },
                "exam id": examTest,
                "name": "Shiva J",
                "role": "Candidate",
                "status": "Active",
                "eligible": "Yes",
                "invigilator": ""
            }],"examId":exam_ID},
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_320. @API Admin add the  Delete-user  _validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/deleteuser/',
        {
           
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_321. @API Admin add theDelete-user  _validation of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/deleteuser/IGS',
        {
            data:  {"delete_user_details":[{
                "id": "45",
                "upload image": {
                    "imgURL": "",
                    "isUploading": false,
                    "columnName": "upload image",
                    "isExisting": true,
                    "placeholder": "upload image",
                    "isUploadingEnable": false
                },
                "exam id": examTest,
                "name": "Shiva J",
                "role": "Candidate",
                "status": "Active",
                "eligible": "Yes",
                "invigilator": ""
            }],"examId":exam_ID},

            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})

test("AL_001t. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
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

test("Delivery_205. @API Admin add the Download-candiate-response-pdf  information", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/download-candiate-response-pdf',
        {
            data:{
                "examId": examIdNum,
                "candidateId": candidateId,
                "sessionId": sessionId,
            },
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_206. @API Admin add the  Download-candiate-response-pdf  of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/download-candiate-response-pdf',
        {
            
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Delivery_207. @API Admin add the Download-candiate-response-pdf  of invalid endpoint", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    var jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/download-candiate-response-pdfIGS',
        {
            data: {
                "examId": examIdNum,
                "candidateId": candidateId,
                "sessionId": sessionId,
            },
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})

