//import { APIActions } from '@lib/APIActions';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
//import { token } from './adminToken.test';
import { jsonObject } from '@pages/DeliveryApiPage';
import { log } from 'winston';
import { ValidationResponse } from '../../utils/validationUtiles/ResponseValidation';

let verifyResponse = new ValidationResponse;

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
const Ajv = require('ajv')
const avj = new Ajv()

var jsonpath;
var jsonpath1;
let candidateID;
let candidateID1;
let questionID;
let markerID;
let markername;
let existing_user_data;
export let BulkUserId;
export let exam_ID;
let sessionID;
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

test("ExamService_023A. @API To verify  the Exam-creation-save-details", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exam/save-details',
        {
            data: jsonObject.createExam1,
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
    var res1 = res.Response
    var resarry = [];
    for (var i in res1)
        resarry.push([i, res1[i]]);

    exam_ID = +((resarry[2])[1]);
    console.log("Exam id is:", exam_ID)
    console.log(typeof exam_ID)

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Exam created successfully")

    //Schema validation
    const schema = jschemasonpath.createExam
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("ExamService_029A. @API To verify  the Exam-Layout-Form", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exam/layout/' + exam_ID + '/form',
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
})

test("ExamService_032A. @API To verify  the save-ExamSessions-Questions", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exam/save-sessions/' + exam_ID,
        {
            data: jsonObject.addQuestions,
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
    const schema = jschemasonpath.editExam
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

// test("ExamService_035A. @API To verify  the Save-content and Exam sessions", async ({ request }) => {
//     jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
//     verifyResponse.fetchrequestTime();
//     const response = await request.post(baseURL + '/exam-api/v1.2/exam/save-sessions/' + exam_ID,
//         {
//             data: jsonObject.addQuestions_ContentPage,
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
//     expect(await res.message).toEqual("Session(s) Updated successfully")

//     //Schema validation
//     const schema = jschemasonpath.editExam
//     const validate = avj.compile(schema)
//     const isValid = validate(res)
//     expect(isValid).toBeTruthy()
// })

// test("ExamService_038A. @API To verify  the Save-content, Exam and Survey-sessions", async ({ request }) => {
//     jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
//     verifyResponse.fetchrequestTime();
//     const response = await request.post(baseURL + '/exam-api/v1.2/exam/save-sessions/' + exam_ID,
//         {
//             data: jsonObject.addQuestions_Surveypage,
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
//     expect(await res.message).toEqual("Session(s) Updated successfully")

//     //Schema validation
//     const schema = jschemasonpath.editExam
//     const validate = avj.compile(schema)
//     const isValid = validate(res)
//     expect(isValid).toBeTruthy()
// })

test("ExamService_026A. @API To verify  the Exam-workflow-save", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1/exam/workflow/save/' + exam_ID,
        {
            data: jsonObject.approveexam,
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
    expect(await res.Response.Message).toEqual("Status has been updated successfuly.")

    //Schema validation
    const schema = jschemasonpath.approveexam
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Delivery_001. @API To verify  the Add-New-Users", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v2/createuser',
        {
            data: jsonObject.Add_New_Users,
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
    expect(await res.message).toEqual("Create User Form")
})

test("Delivery_002. @API To verify  the Add-New-Users of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/createuser',
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
})

test("Delivery_003. @API To  verify  the Add-New-Users of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/createuserIGS',
        {
            data: jsonObject.Add_New_Users,
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
})

test("Delivery_004. @API To verify  the New user create Validation ", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/checkavailability',
        {
            data: jsonObject.New_user_create,
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
    expect(await res.message).toEqual("Not Exist")
})

test("Delivery_005. @API To verify  the New user create Validation  of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/checkavailability',
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
})

test("Delivery_006. @API To  verify  the New user create Validation  of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/checkavailabilityIGS',
        {
            data: jsonObject.New_user_create,
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
})

test("Delivery_007. @API To verify  the New User Save", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v2/saveuser',
        {
            data: {
                "data": [

                    {
                        "client_id": makeid(8),
                        "title": "MR",
                        "user_name": makeid(12),
                        "first_name": "Shiva",
                        "last_name": "J",
                        "email": makeid(5) + "cd121@test.com",
                        "phone": "9986600567",
                        "role": "9",
                        "eligible": "1",
                        "venue_id": "3",
                        "booking_status_id": "1",
                        "profile_image": ""
                    },

                    {
                        "client_id": makeid(9),
                        "title": "MR",
                        "user_name": makeid(13),
                        "first_name": makeid(7),
                        "last_name": "d",
                        "email": makeid(4) + "cd121@yopmail.com",
                        "phone": "9876543210",
                        "role": "10",
                        "eligible": "1",
                        "venue_id": "3",
                        "booking_status_id": "1",
                        "profile_image": ""
                    }
                ],
                "userId": "28",
                "examId": exam_ID
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
    expect(await res.Response.Message).toEqual("User(s) added to the Examname text3 successfully")
})

test("Delivery_008. @API To verify  the New User Save  of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/saveuser',
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
})

test("Delivery_009. @API To  verify  the New User Save  of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/saveuserIGS',
        {
            data: jsonObject.New_User_Save,
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
})

test("Delivery_010. @API To verify  the Existing-users-Filter", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/existingusers',
        {
            data: jsonObject.Existing_users_Filter,
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

})

test("Delivery_011. @API To verify  the Existing-users-Filter  of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/existingusers',
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
})

test("Delivery_012. @API To  verify  the Existing-users-Filter  of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/existingusersIGS',
        {
            data: jsonObject.Existing_users_Filter,
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
})

test("Delivery_013. @API To verify  the Filter Save public or Privet", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/existingusers-custom-filter',
        {
            data: jsonObject.Filter_Save_public_or_Privet,
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
})

test("Delivery_014. @API To verify  the Filter Save public or Privet  of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/existingusers-custom-filter',
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
})

test("Delivery_015. @API To  verify  the Filter Save public or Privet  of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/existingusers-custom-filterIGS',
        {
            data: jsonObject.Filter_Save_public_or_Privet,
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
})

test("Delivery_016. @API To verify  the Save filter list Public or privet", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/existingusers',
        {
            data: jsonObject.Save_filter_list_Public_or_privet,
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

})

test("Delivery_017. @API To verify  the Save filter list Public or privet  of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/existingusers',
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
})

test("Delivery_018. @API To  verify  the Save filter list Public or privet  of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/existingusersIGS',
        {
            data: jsonObject.Save_filter_list_Public_or_privet,
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
})

test("Delivery_019. @API To verify the Existing users-filters response", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/existingusers-filters',
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
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json');
})

test("Delivery_020. @API To verify the response when passing an invalid endpoint for Existing users-filters", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/existingusers-filtersIGS',
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
})

test("Delivery_021. @API To verify the response when passing empty access token for Existing users-filters", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/existingusers-filters',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_023. @API To verify the exam-bulk-upload-users-page response", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/exam-bulk-upload-users',
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
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json');


    var res = await response.json()

    //Schema validation
    const schema = jschemasonpath.Delivery.exam_bulk_upload_users_page
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Delivery_024. @API To verify the response when passing an invalid endpoint for exam-bulk-upload-users-page", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/exam-bulk-upload-usersIGS',
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
})

test("Delivery_025. @API To verify the response when passing empty access token for exam-bulk-upload-users-page", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/exam-bulk-upload-users',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_027. @API To verify the sample-users download response", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/download/bulkuploaduser/default/sample_users.csv',
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
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
})

test("Delivery_028. @API To verify the response when passing an invalid endpoint for sample-users download", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/download/bulkuploaduser/defaultIGS/sample_users.csv',
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
})

test("Delivery_031. @API To verify  the sample-file-upload-users", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();

    const file = path.resolve("./utils/api/sample_users.csv");
    const image = fs.readFileSync(file);

    const response = await request.post(baseURL + '/exam-registration-api/v1/fileupload/registration/bulkuploadusers/' + exam_ID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token,
            },
            multipart: {
                file: {
                    name: "testFile.csv",
                    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    buffer: image
                }
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
    BulkUserId = res.Response.id;
    console.log("Bulk user id-", BulkUserId)

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("File uploaded successfully")

    //Schema validation
    const schema = jschemasonpath.Delivery.sample_file_upload_users
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
});

test("Delivery_032. @API To verify  the sample-file-upload-users of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/fileupload/registration/bulkuploadusers/' + exam_ID,
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
})

test("Delivery_033. @API To  verify  the sample-file-upload-users of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const file = path.resolve("./utils/api/sample_users.csv");
    const image = fs.readFileSync(file);
    const response = await request.post(baseURL + '/exam-registration-api/v1/fileupload/registration/bulkuploadusers/' + exam_ID + '/IGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            },
            multipart: {
                file: {
                    name: "testFile.csv",
                    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    buffer: image
                }
            },
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("Delivery_034. @API To verify  the Bulkuploadusers-user-list-page", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/getbulkuserspagination/registration/bulkuploadusers/' + exam_ID + '/' + BulkUserId,
        {
            data: jsonObject.Bulkuploadusers_user_list_page,
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

})

test("Delivery_035. @API To verify  the Bulkuploadusers-user-list-page of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/getbulkuserspagination/registration/bulkuploadusers/' + exam_ID + '/' + BulkUserId,
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
})

test("Delivery_036. @API To  verify  the Bulkuploadusers-user-list-page of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/getbulkuserspagination/registration/bulkuploadusers/' + exam_ID + '/' + BulkUserId + '/IGS',
        {
            data: jsonObject.Bulkuploadusers_user_list_page,
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
})

test("Delivery_037. @API To verify  the Bulkuploaduser-List-page", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/getbulkuserspagination/registration/bulkuploadusers/' + exam_ID + '/' + BulkUserId,
        {
            data: jsonObject.Bulkuploadusers_user_list_page,
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

})

test("Delivery_038. @API To verify  the Bulkuploaduser-List-page of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/getbulkuserspagination/registration/bulkuploadusers/' + exam_ID + '/' + BulkUserId,
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
})

test("Delivery_039. @API To  verify  the Bulkuploaduser-List-page of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/getbulkuserspagination/registration/bulkuploadusers/' + exam_ID + '/' + BulkUserId + '/IGS',
        {
            data: jsonObject.Bulkuploadusers_user_list_page,
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
})

test("Delivery_040. @API To verify  the Savebulk-users", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/savebulkusers/' + exam_ID,
        {
            data: jsonObject.Savebulk_users,
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
    expect(await res.Response.Message).toEqual("Validaion is in Progress, Please Wait..")

    //Schema validation
    const schema = jschemasonpath.Delivery.Savebulk_users
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Delivery_041. @API To verify  the Savebulk-users of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/savebulkusers/' + exam_ID,
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
})

test("Delivery_042. @API To  verify  the Savebulk-users of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/savebulkusers/' + exam_ID + '/IGS',
        {
            data: jsonObject.Savebulk_users,
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
})

test("Delivery_043. @API To verify  the Existing Users List", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/existingusers',
        {
            data: jsonObject.Existing_Users_List,
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
})

test("Delivery_044. @API To verify  the Existing Users List of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/existingusers',
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
})

test("Delivery_045. @API To  verify  the Existing Users List of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/existingusersIGS',
        {
            data: jsonObject.Existing_Users_List,
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
})

test("Delivery_046. @API To verify the Choose roles response", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/registrationroles',
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
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json');
})

test("Delivery_047. @API To verify the response when passing an invalid endpoint for Choose roles", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/registrationrolesIGS',
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
})

test("Delivery_048. @API To verify the response when passing empty access token for Choose roles", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/registrationroles',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_050. @API To verify the Eligible response", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/eligible',
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
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json');
})

test("Delivery_051. @API To verify the response when passing an invalid endpoint for Eligible", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/eligibleIGS',
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
})

test("Delivery_052. @API To verify the response when passing empty access token for Eligible", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/eligible',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_054. @API To verify  the Exam Booking Status And Venues", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/examBookingStatusAndVenues',
        {
            data: { "examId": exam_ID },
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
})

test("Delivery_055. @API To verify  the Exam Booking Status And Venues of incorrect HTTP method", async ({ request }) => {
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
})

test("Delivery_056. @API To  verify  the Exam Booking Status And Venues of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/examBookingStatusAndVenuesIGS',
        {
            data: { "examId": exam_ID },
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
})

test("Delivery_057. @API To verify the Filters response", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/existingusers-filters',
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
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json');
})

test("Delivery_058. @API To verify the response when passing an invalid endpoint for Filters", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/existingusers-filtersIGS',
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
})

test("Delivery_059. @API To verify the response when passing empty access token for Filters", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/existingusers-filters',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_061. @API To verify  the Existingusers-pagination", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/existingusers?page=2',
        {
            data: jsonObject.Existingusers_pagination,
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
})

test("Delivery_062. @API To verify  the Existingusers-pagination of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/existingusers?page=2',
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
})

test("Delivery_063. @API To  verify  the Existingusers-pagination of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/existingusersIGS?page=2',
        {
            data: jsonObject.Existingusers_pagination,
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
})

test("Delivery_064. @API To verify  the Existingusers-Search", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/existingusers',
        {
            data: jsonObject.Existingusers_Search,
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
    existing_user_data = res.existingusers.data[0];
})

test("Delivery_065. @API To verify  the Existingusers-Search of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/existingusers',
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
})

test("Delivery_066. @API To  verify  the Existingusers-Search of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/existingusersIGS',
        {
            data: jsonObject.Existingusers_Search,
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
})

test("Delivery_067. @API To verify  the Existing-users-exam-Save", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v2/existingusersexam',
        {
            data: {
                "selectedRecord": [{
                    "id": "1633",
                    "upload image": {
                        "imgURL": "",
                        "isUploading": false,
                        "columnName": "upload image",
                        "isExisting": true,
                        "placeholder": "upload image",
                        "isUploadingEnable": true
                    },
                    "client id": "",
                    "first name": "admin",
                    "last name": "api",
                    "email": "aCPQITy297@yopmail.com",
                    "phone": "6547056513"
                }], "roleId": 9, "eligible": "1", "examId": exam_ID, "userId": "28", "booking_status_id": [{ "id": 1, "name": "Booked" }], "venue_id": [{
                    "id": 3,
                    "name": "Chennai, India"
                }]
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
    expect(response.headers()['content-type']).toBe('application/json');

    var res = await response.json()
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Users have been added to the Examname text3 Successfully");
})

test("Delivery_068. @API To verify  the Existing-users-exam-Save of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/existingusersexam',
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
})

test("Delivery_069. @API To  verify  the Existing-users-exam-Save of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/existingusersexamIGS',
        {
            data: {
                "selectedRecord": [{
                    "id": "1633",
                    "upload image": {
                        "imgURL": "",
                        "isUploading": false,
                        "columnName": "upload image",
                        "isExisting": true,
                        "placeholder": "upload image",
                        "isUploadingEnable": true
                    },
                    "client id": "",
                    "first name": "admin",
                    "last name": "api",
                    "email": "aCPQITy297@yopmail.com",
                    "phone": "6547056513"
                }], "roleId": 9, "eligible": "1", "examId": exam_ID, "userId": "28", "booking_status_id": [{ "id": 1, "name": "Booked" }], "venue_id": [{
                    "id": 3,
                    "name": "Chennai, India"
                }]
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
})

test("Delivery_070. @API To verify  the venue-summary-list", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v2/venue-summary',
        {
            data: { "filterArray": [], "pagination": null, "showColumns": [], "examId": exam_ID },
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
})

test("Delivery_071. @API To verify  the venue-summary-list of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/venue-summary',
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
})

test("Delivery_072. @API To  verify  the venue-summary-list of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/venue-summaryIGS',
        {
            data: jsonObject.venue_summary_list,
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
})

test("Delivery_073. @API To verify  the venue-summary-search", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v2/venue-summary',
        {
            data: { "filterArray": [], "freeText": ["Remote Location"], "pagination": "25", "showColumns": null, "examId": exam_ID },
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
})

test("Delivery_074. @API To verify  the venue-summary-search of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/venue-summary',
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
})

test("Delivery_075. @API To  verify  the venue-summary-search of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/venue-summaryIGS',
        {
            data: jsonObject.venue_summary_search,
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
})

test("Delivery_076. @API To verify  the download-venue-summary", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v2/download-venue-summary',
        {
            data: { "examId": exam_ID, "filter_data": [], "user_details": [] },
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
})

test("Delivery_077. @API To verify  the download-venue-summary of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/download-venue-summary',
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
})

test("Delivery_078. @API To  verify  the download-venue-summary of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/download-venue-summaryIGS',
        {
            data: jsonObject.download_venue_summary,
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
})

test("Delivery_079. @API To verify  the venue-summary-filter-list", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v2/venue-summary',
        {
            data: { "filterArray": [{ "filterId": "Name", "operator": "eq", "displayText": "Name <span>is equal to</span> ", "filterValue1": "Remote Location", "filterValue2": "", "filterValue3": "", "operation": "" }], "freeText": [""], "pagination": "25", "showColumns": null, "examId": exam_ID },
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
})

test("Delivery_080. @API To verify  the venue-summary-filter-list of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/venue-summary',
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
})

test("Delivery_081. @API To  verify  the venue-summary-filter-list of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/venue-summaryIGS',
        {
            data: jsonObject.venue_summary_filter_list,
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
})

test("Delivery_082. @API To verify  the venue-summary-save-filter-public or privet", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v2/venue-summary-custom-filter',
        {
            data: { "filterArray": { "filterName": makeid(15), "filterType": "public", "filterPage": "venue-summary", "filter_id": "" }, "customFilter": [{ "filterId": "Name", "operator": "eq", "displayText": "Name <span>is equal to</span> ", "filterValue1": "Remote Location", "filterValue2": "", "filterValue3": "", "operation": "" }], "examId": exam_ID },
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
})

test("Delivery_083. @API To verify  the venue-summary-save-filter-public or privet of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/venue-summary-custom-filter',
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
})

test("Delivery_084. @API To  verify  the venue-summary-save-filter-public or privet of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/venue-summary-custom-filterIGS',
        {
            data: jsonObject.venue_summary_save_filter_public_or_privet,
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
})

test("Delivery_085. @API To verify  the venue-summary-filters", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v2/venue-summary-filters',
        {
            data: { "examId": exam_ID },
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
})

test("Delivery_086. @API To verify  the venue-summary-filters of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/venue-summary-filters',
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
})

test("Delivery_087. @API To  verify  the venue-summary-filters of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/venue-summary-filtersIGS',
        {
            data: { "examId": exam_ID },
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
})

test("Delivery_088. @API To verify  the venue-summary pagination", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v2/venue-summary?page=2',
        {
            data: { "filterArray": [], "pagination": 25, "showColumns": null, "examId": exam_ID },
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
})

test("Delivery_089. @API To verify  the venue-summary pagination of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/venue-summary?page=2',
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
})

test("Delivery_090. @API To  verify  the venue-summary pagination of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/venue-summaryIGS?page=2',
        {
            data: jsonObject.venue_summary_pagination,
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
})

test("Delivery_094. @API To verify theMarking-Exam Session response", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/getExamSessionByExam/' + exam_ID,
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
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json');

    var res = await response.json()
    sessionID = res.data[0].id;
    console.log("Session Id is", sessionID)
})

test("Delivery_095. @API To verify the response when passing an invalid endpoint for Marking-Exam Session", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/getExamSessionByExam/' + exam_ID + '/IGS',
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
})

test("Delivery_096. @API To verify the response when passing empty access token for Marking-Exam Session", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/getExamSessionByExam/' + exam_ID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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

test("Delivery_091. @API To verify  the Marking list", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/manage-marking',
        {
            data: { "filterArray": [], "pagination": "", "showColumns": [], "examId": exam_ID, "session": [{ "id": sessionID, "name": "Exam Main Session" }] },
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
})

test("Delivery_092. @API To verify  the Marking list of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/manage-marking',
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
})

test("Delivery_093. @API To  verify  the Marking list of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/manage-markingIGS',
        {
            data: jsonObject.Marking_list,
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
})

test("Delivery_098. @API To verify  the Marking-Session-By Search", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/manage-marking',
        {
            data: { "filterArray": [], "freeText": [""], "pagination": 25, "showColumns": null, "examId": exam_ID, "session": [{ "id": sessionID, "name": "Exam Main Session" }] },
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
    candidateID = res["manage-marking"].data[0]["exam id"];
    candidateID1 = res["manage-marking"].data[1]["exam id"];
    console.log("candidateID is-", candidateID, "and", candidateID1);
})

test("Delivery_099. @API To verify  the Marking-Session-By Search of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/manage-marking',
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
})

test("Delivery_100. @API To  verify  the Marking-Session-By Search of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/manage-markingIGS',
        {
            data: jsonObject.Marking_Session_By_Search,
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
})

test("Delivery_101. @API To verify  the MarkerAssignPopup", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/markerassign',
        {
            data: { "examId": exam_ID, "session": [{ "id": sessionID, "name": "Exam Main Session" }] },
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
})

test("Delivery_102. @API To verify  the MarkerAssignPopup of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/markerassign',
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
})

test("Delivery_103. @API To  verify  the MarkerAssignPopup of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/markerassignIGS',
        {
            data: jsonObject.MarkerAssignPopup,
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
})

test("Delivery_104. @API To verify  the marker-name-assign", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/markerassignfilter',
        {
            data: {
                "examId": exam_ID, "candidateId": [candidateID, candidateID1], "questionId": ["000"], "session": [{
                    "id": sessionID, "name": "Exam Main Session"
                }]
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
    markerID = res.markerList[0].marker_id;
    markername = res.markerList[0].name;
    console.log("markerID is-", markerID, "and", markername);
})

test("Delivery_105. @API To verify  the marker-name-assign of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/markerassignfilter',
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
})

test("Delivery_106. @API To  verify  the marker-name-assign of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/markerassignfilterIGS',
        {
            data: jsonObject.marker_name_assign,
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
})

test("Delivery_107. @API To verify  the Marker-assign-save", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/markerassignsave',
        {
            data: {
                "examId": exam_ID, "session": [{
                    "id": sessionID, "name": "Exam Main Session"
                }], "candidateId": [candidateID, candidateID1], "questionId": ["000"], "markerId": [markerID]
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
})

test("Delivery_128. @API To verify  the Marker Responce left site menu", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/examadminmarkingquestionlist',
        {
            data: { "examId": exam_ID, "candidateId": candidateID, "markerId": markerID, "session": sessionID, "markingStatusId": [], "questionId": null, "viewBy": "candidate", "role": "marker" },
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
    questionID = res.parts[0].data[0].question_id;
    console.log('questionID is-', questionID)
})

test("Delivery_129. @API To verify  the Marker Responce left site menu of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/examadminmarkingquestionlist',
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
})

test("Delivery_130. @API To  verify  the Marker Responce left site menu of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/examadminmarkingquestionlistIGS',
        {
            data: jsonObject.Marker_Responce_left_site_menu,
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})

test("Delivery_131. @API To verify  the Exam-admin-marking-view-response", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/examadminmarkingviewresponse',
        {
            data: { "questionId": questionID, "examId": exam_ID, "candidateId": candidateID, "markingStatusId": [], "markerId": markerID, "session": sessionID },
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
})

test("Delivery_132. @API To verify  the Exam-admin-marking-view-response of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/examadminmarkingviewresponse',
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
})

test("Delivery_133. @API To  verify  the Exam-admin-marking-view-response of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/examadminmarkingviewresponseIGS',
        {
            data: jsonObject.Exam_admin_marking_view_response,
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})

test("Delivery_134. @API To verify  the Exam-admin-marking-viewresponse-save", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/examadminmarkingviewresponsesave',
        {
            data: {
                "examId": exam_ID,
                "markerId": markerID,
                "candidateId": candidateID,
                "mainquestionId": questionID,
                "subQuestion": false,
                "questionType": "common",
                "markerData": {
                    "markerScore": "1",
                    "markerFeedback": "<p>marker one feedback</p>",
                    "markerRating": 2,
                    "isChanged": false,
                    "formValid": true,
                    "markedAnswerKeys": []
                }
            }
            ,
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
    expect(await res.Response.Message).toEqual("Marks saved successfully")

    //Schema validation
    const schema = jschemasonpath.Delivery.Reset_Marking
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Delivery_135. @API To verify  the Exam-admin-marking-viewresponse-save of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/examadminmarkingviewresponsesave',
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
})

test("Delivery_136. @API To  verify  the Exam-admin-marking-viewresponse-save of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/examadminmarkingviewresponsesaveIGS',
        {
            data: jsonObject.Exam_admin_marking_viewresponse_save,
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})

test("Delivery_137. @API To verify  the Final or submit-as-final  submited", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/submitfinal',
        {
            data: { "candidateId": candidateID, "markerId": markerID, "examId": exam_ID, "session": [{ "id": sessionID, "name": "Exam Main Session" }], "markingStatusId": [], "markersArray": [{ "id": 3740, "name": "Marker One" }] },
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
    expect(await res.Response.Message).toEqual("Final marks submitted sucessfully")

    //Schema validation
    const schema = jschemasonpath.Delivery.Reset_Marking
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Delivery_138. @API To verify  the Final or submit-as-final  submited of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/submitfinal',
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
})

test("Delivery_139. @API To  verify  the Final or submit-as-final  submited of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/submitfinalIGS',
        {
            data: jsonObject.Final_or_submit_as_final_submited,
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})


test("Delivery_140. @API To verify  the Reopen-marking", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/reopen-marking',
        {
            data: { "candidateId": candidateID, "markerId": markerID, "examId": exam_ID, "session": [{ "id": sessionID, "name": "Exam Main Session" }], "markingStatusId": [], "markersArray": [{ "id": markerID, "name": markername }] },
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
    expect(await res.message).toEqual("Marking has been Reopened sucessfully")

    //Schema validation
    const schema = jschemasonpath.Delivery.Reopen_marking
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Delivery_141. @API To verify  the Reopen-marking of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/reopen-marking',
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
})

test("Delivery_142. @API To  verify  the Reopen-marking of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/reopen-markingIGS',
        {
            data: jsonObject.Reopen_marking,
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})

test("Delivery_108. @API To verify  the Marker-assign-save of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/markerassignsave',
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
})

test("Delivery_109. @API To  verify  the Marker-assign-save of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/markerassignsaveIGS',
        {
            data: jsonObject.Marker_assign_save,
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
})

test("Delivery_110. @API To verify  the Unassign-all-markers", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/unassign-all-markers',
        {
            data: { "examId": exam_ID, "sessionId": [{ "id": sessionID, "name": "Exam Main Session" }] },
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
    expect(await res.Response.Message).toEqual("Markers unassigned successfully")
})

test("Delivery_111. @API To verify  the Unassign-all-markers of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/unassign-all-markers',
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
})

test("Delivery_112. @API To  verify  the Unassign-all-markers of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/unassign-all-markersIGS',
        {
            data: jsonObject.Unassign_all_markers,
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
})

test("Delivery_113. @API To verify  the Marker-unassign-reset-check", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/markerassignresetcheck',
        {
            data: { "examId": exam_ID, "markerId": [markerID] },
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
    expect(await res.message).toEqual("Are you sure that you want to unassign the Marker?")
})

test("Delivery_114. @API To verify  the Marker-unassign-reset-check of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/markerassignresetcheck',
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
})

test("Delivery_115. @API To  verify  the Marker-unassign-reset-check of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/markerassignresetcheckIGS',
        {
            data: jsonObject.Unassign_all_markers,
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})

// test("Delivery_116. @API To verify  the Marker-unassign-save", async ({ request }) => {
//     jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
//     verifyResponse.fetchrequestTime();
//     console.log(exam_ID)
//     const response = await request.post(baseURL + '/exam-registration-api/v1/markerassignunsave',
//         {
//             data: {
//                 "examId": exam_ID, "session": [{
//                     "id": sessionID, "name": "Exam Main Session"
//                 }], "candidateId": [candidateID, candidateID1], "questionId": ["000"], "markerId": [markerID]
//             },
//             headers: {
//                 "Content-Type": "application/json",
//                 "webreferer": jsonpath.webreferer,
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
// })

// test("Delivery_117. @API To verify  the Marker-unassign-save of incorrect HTTP method", async ({ request }) => {
//     verifyResponse.fetchrequestTime();
//     const response = await request.get(baseURL + '/exam-registration-api/v1/markerassignunsave',
//         {
//             headers: {
//                 "accept": "application/json",
//                 "webreferer": jsonpath.webreferer,
//                 "authorization": token
//             }
//         });
//     //Validation of response time
//     verifyResponse.validateTime(jsonpath.responseDuration);

//     //Status code validation
//     expect(response.status()).toBe(405);

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
// })

// test("Delivery_118. @API To  verify  the Marker-unassign-save of invalid endpoint.", async ({ request }) => {
//     verifyResponse.fetchrequestTime();
//     const response = await request.post(baseURL + '/exam-registration-api/v1/markerassignunsaveIGS',
//         {
//             data: jsonObject.Marker_unassign_save,
//             headers: {
//                 "accept": "application/json",
//                 "webreferer": jsonpath.webreferer,
//                 "authorization": token
//             }
//         });

//     //Validation of response time
//     verifyResponse.validateTime(jsonpath.responseDuration);

//     //Status code validation
//     expect(response.status()).toBe(404);

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
// })

// test("Delivery_107a. @API To verify  the Marker-assign-save", async ({ request }) => {
//     jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
//     verifyResponse.fetchrequestTime();
//     console.log(exam_ID)
//     const response = await request.post(baseURL + '/exam-registration-api/v1/markerassignsave',
//         {
//             data: {
//                 "examId": exam_ID, "session": [{
//                     "id": sessionID, "name": "Exam Main Session"
//                 }], "candidateId": [candidateID, candidateID1], "questionId": ["000"], "markerId": [markerID]
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
// })

test("Delivery_119. @API To verify  the Markers-Dashboard", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/markers-dashboard',
        {
            data: { "examId": exam_ID },
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
})

test("Delivery_120. @API To verify  the Markers-Dashboard of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/markers-dashboard',
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
})

test("Delivery_121. @API To  verify  the Markers-Dashboard of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/markers-dashboardIGS',
        {
            data: { "examId": exam_ID },
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})

test("Delivery_122. @API To verify  the Markers-dashboard-Search", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/markers-dashboard',
        {
            data: { "freeText": [markername], "pagination": 5, "examId": exam_ID, "examSession": [sessionID] },
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
})

test("Delivery_123. @API To verify  the Markers-dashboard-Search of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/markers-dashboard',
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
})

test("Delivery_124. @API To  verify  the Markers-dashboard-Search of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/markers-dashboardIGS',
        {
            data: jsonObject.Markers_dashboard_Search,
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})

test("Delivery_125. @API To verify  the Markers-dashboard-Pagination", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/markers-dashboard?page=2',
        {
            data: { "freeText": [markername], "pagination": 25, "showColumns": null, "examId": exam_ID, "examSession": [sessionID] },
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
})

test("Delivery_126. @API To verify  the Markers-dashboard-Pagination of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/markers-dashboard?page=2',
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
})

test("Delivery_127. @API To  verify  the Markers-dashboard-Pagination of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/markers-dashboardIGS?page=2',
        {
            data: jsonObject.Markers_dashboard_Pagination,
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})

// test("Delivery_128. @API To verify  the Marker Responce left site menu", async ({ request }) => {
//     jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
//     verifyResponse.fetchrequestTime();
//     console.log(exam_ID)
//     const response = await request.post(baseURL + '/exam-registration-api/v1/examadminmarkingquestionlist',
//         {
//             data: { "examId": exam_ID, "candidateId": candidateID, "markerId": markerID, "session": sessionID, "markingStatusId": [], "questionId": null, "viewBy": "candidate", "role": "marker" },
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
//     questionID = res.parts[0].data[0];
//     console.log('questionID is-', questionID)
// })

// test("Delivery_129. @API To verify  the Marker Responce left site menu of incorrect HTTP method", async ({ request }) => {
//     verifyResponse.fetchrequestTime();
//     const response = await request.get(baseURL + '/exam-registration-api/v1/examadminmarkingquestionlist',
//         {
//             headers: {
//                 "accept": "application/json",
//                 "webreferer": jsonpath.webreferer,
//                 "authorization": token
//             }
//         });
//     //Validation of response time
//     verifyResponse.validateTime(jsonpath.responseDuration);

//     //Status code validation
//     expect(response.status()).toBe(405);

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
// })

// test("Delivery_130. @API To  verify  the Marker Responce left site menu of invalid endpoint.", async ({ request }) => {
//     verifyResponse.fetchrequestTime();
//     const response = await request.post(baseURL + '/exam-registration-api/v1/examadminmarkingquestionlistIGS',
//         {
//             data: jsonObject.Marker_Responce_left_site_menu,
//             headers: {
//                 "accept": "application/json",
//                 "webreferer": jsonpath.webreferer,
//                 "authorization": token
//             }
//         });

//     //Validation of response time
//     verifyResponse.validateTime(jsonpath.responseDuration);

//     //Status code validation
//     expect(response.status()).toBe(404);

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
// })

test("Delivery_143. @API To verify  the Markers-report Paginaion", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/markers-report?page=2',
        {
            data: { "examId": exam_ID, "pagination": 50, "markersArray": [{ "id": markerID, "name": "{{markername}}" }], "markerId": markerID, "session": [{ "id": sessionID, "name": "Exam Main Session" }], "markingStatusId": [] },
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

})

test("Delivery_144. @API To verify  the Markers-report Paginaion of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/markers-report?page=2',
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
})

test("Delivery_145. @API To  verify  the Markers-report Paginaion of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/markers-reportIGS?page=2',
        {
            data: jsonObject.Markers_report_Paginaion,
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})

test("Delivery_146. @API To verify  the markers-report-show column", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/markers-report',
        {
            data: { "examId": exam_ID, "showColumns": ["client id", "mappings"], "pagination": 50, "markersArray": [{ "id": markerID, "name": markername }], "markerId": markerID, "session": [{ "id": sessionID, "name": "Exam Main Session" }], "markingStatusId": [] },
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

})

test("Delivery_147. @API To verify  the markers-report-show column of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/markers-report',
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
})

test("Delivery_148. @API To  verify  the markers-report-show column of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/markers-reportIGS',
        {
            data: jsonObject.markers_report_show_column,
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})

test("Delivery_149. @API To verify theMarkingStatus-List response", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/getMarkingStatus',
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
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json');
})

test("Delivery_150. @API To verify the response when passing an invalid endpoint for MarkingStatus-List", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/getMarkingStatusIGS',
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
})

test("Delivery_151. @API To verify the response when passing empty access token for MarkingStatus-List", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/getMarkingStatus',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
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
    expect(await res.error_description).toEqual("The access token is missing");
})

test("Delivery_153. @API To verify  the MarkersBySession-List", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/getMarkersBySession',
        {
            data: { "examId": exam_ID, "session": [{ "id": sessionID, "name": "Exam Main Session" }] },
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
    expect(await res.Message).toEqual("Success");
})

test("Delivery_154. @API To verify  the MarkersBySession-List of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/getMarkersBySession',
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
})

test("Delivery_155. @API To  verify  the MarkersBySession-List of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/getMarkersBySessionIGS',
        {
            data: jsonObject.MarkersBySession_List,
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})

test("Delivery_156. @API To verify  the Markers-Report-List", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/markers-report',
        {
            data: { "examId": exam_ID, "markersArray": [{ "id": markerID, "name": markername }], "session": [{ "id": sessionID, "name": "Exam Main Session" }], "markingStatusId": [] },
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
})

test("Delivery_157. @API To verify  the Markers-Report-List of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/markers-report',
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
})

test("Delivery_158. @API To  verify  the Markers-Report-List of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/markers-reportIGS',
        {
            data: jsonObject.Markers_Report_List,
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})

test("Delivery_159. @API To verify  the markers-report-filters", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/markers-report',
        {
            data: { "examId": exam_ID, "markersArray": [{ "id": markerID, "name": markername }], "session": [{ "id": sessionID, "name": "Exam Main Session" }], "markingStatusId": [1] },
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
})

test("Delivery_160. @API To verify  the markers-report-filters of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/markers-report',
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
})

test("Delivery_161. @API To  verify  the markers-report-filters of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/markers-reportIGS',
        {
            data: jsonObject.Markers_Report_List,
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})

test("Delivery_162. @API To verify  the Reset-Marking", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/reset-marking',
        {
            data: { "examId": exam_ID, "candidateId": [], "markerId": markerID },
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
    expect(await res.Response.Message).toEqual("Marking has been reset")

    //Schema validation
    const schema = jschemasonpath.Delivery.Reset_Marking
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Delivery_163. @API To  verify  the Reset-Marking of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/reset-marking',
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
})

test("Delivery_164. @API To  verify  the markers-report-filters of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/reset-markingIGS',
        {
            data: jsonObject.Reset_Marking,
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})

test("Delivery_165. @API To verify  the Open or Close Marking-All", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/open-marking',
        {
            data: { "examId": exam_ID, "markerId": "", "markingEnabled": false },
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
    expect(await res.Response.Message).toEqual("Marking has been closed for all markers")

    //Schema validation
    const schema = jschemasonpath.Delivery.Reset_Marking
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Delivery_166. @API To verify  the Open or Close Marking-All of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/open-marking',
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
})

test("Delivery_167. @API To  verify  the Open or Close Marking-All of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/open-markingIGS',
        {
            data: jsonObject.Open_or_Close_Marking_All,
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})

test("Delivery_168. @API To verify  the workflow-create-page", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/marking/workflow/create',
        {
            data: { "exam_id": exam_ID, "workflow": { "name": "No Workflow" }, "Authorization": "{\"COPEM Module 1\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"LIV Test Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"QA Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"banks\":{\"1\":[\"Administrator\"],\"5\":[\"Administrator\"],\"42\":[\"Administrator\"]},\"user\":\"2638\"}" },
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
    expect(response.ok()).toBeTruthy();
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("Delivery_169. @API To verify  the workflow-create-page of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/marking/workflow/create',
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
})

test("Delivery_170. @API To  verify  the workflow-create-page of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v1/marking/workflow/createIGS',
        {
            data: jsonObject.workflow_create_page,
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
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8');
})

test("Delivery_173. @API To verify  the Workflow-save", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/exam-registration-api/v1/marking/workflow/save/' + exam_ID,
        {
            data: { "workflow": { "id": "1", "name": "No Workflow" }, "exam_id": exam_ID, "transition": "Approve", "Authorization": "{\"COPEM Module 1\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"LIV Test Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"QA Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"banks\":{\"1\":[\"Administrator\"],\"5\":[\"Administrator\"],\"42\":[\"Administrator\"]},\"user\":\"28\"}" },
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
    expect(response.ok()).toBeTruthy();
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("Delivery_174. @API To verify  the Workflow-save of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/marking/workflow/save/' + exam_ID,
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
})

test("Delivery_171. @API To verify the Workflow-checkout response", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/marking/workflow/checkout/' + exam_ID,
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
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json');
})

test("Delivery_172. @API To verify the response when passing an invalid endpoint for Workflow-checkout", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/marking/workflow/checkout/' + exam_ID + '/IGS',
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
})

test("Delivery_175. @API To verify  the Download exam file name", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/examService_QunHist_DeliveryShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    console.log(exam_ID)
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/downloadexam',
        {
            data: { "examId": exam_ID },
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
    expect(response.ok()).toBeTruthy();
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json');

    var res = await response.json()
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Your exam details is being currently prepared to download. Please wait ....")

    //Schema validation
    const schema = jschemasonpath.Delivery.Download_exam_file_name
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Delivery_176. @API To verify  the Download exam file name of incorrect HTTP method", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/iexam/candidate-api/v2/downloadexam',
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
    expect(response.headers()['content-type']).toBe('application/json')
})

test("Delivery_177. @API To  verify  the Download exam file name of invalid endpoint.", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/iexam/candidate-api/v2/downloadexamIGS',
        {
            data: { "examId": exam_ID },
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
    expect(response.headers()['content-type']).toBe('application/json');
})

test("Delivery_152. @API To verify the response on passing invalid 'webreferer' in the header field for MarkingStatus-List", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/getMarkingStatus',
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
})

test("AL_001h. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Delivery_097. @API To verify the response on passing invalid 'webreferer' in the header field for Marking-Exam Session", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/getExamSessionByExam/' + exam_ID,
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
})

test("AL_001g. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Delivery_060. @API To verify the response on passing invalid 'webreferer' in the header field for Filters", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/existingusers-filters',
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
})

test("Delivery_053. @API To verify the response on passing invalid 'webreferer' in the header field for Eligible", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/eligible',
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
})

test("Delivery_049. @API To verify the response on passing invalid 'webreferer' in the header field for Choose roles", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/registrationroles',
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
})

test("AL_001d. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Delivery_029. @API To verify the response when passing empty access token for sample-users download", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/download/bulkuploaduser/default/sample_users.csv',
        {
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

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")
})

test("AL_001c. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Delivery_030. @API To verify the response on passing invalid 'webreferer' in the header field for sample-users download", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/file-api/v1/download/bulkuploaduser/default/sample_users.csv',
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
})

test("AL_001b. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Delivery_026. @API To verify the response on passing invalid 'webreferer' in the header field for exam-bulk-upload-users-page", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/exam-bulk-upload-users',
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
})

test("Delivery_022. @API To verify the response on passing invalid 'webreferer' in the header field for Existing users-filters", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v1/existingusers-filters',
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
})

