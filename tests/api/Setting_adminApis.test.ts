//import { APIActions } from '@lib/APIActions';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { jsonObject } from 'pageFactory/pageRepository/api_AdminPage';
//import { token } from './adminToken.test';
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

//var token;
var jsonpath1;
var jsonpath2;
var jsonpath;
var mcqID: any;
var schemajsonpath;

export let token;
let UserId;
let Grade_Book_Id;
let roleId;
let email_template_id;
let user_activity_id;
let dashboard_id;
let training_center__id;
let training_site_id;
let grade_scale_id;
let grade_scale_name;
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

test("Admin_017. @API Admin add the user and save", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user',
        {
            data: jsonObject.Admin_add_user_save.body,
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
    UserId = res.Response.userId
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("User created successfully and an email has been sent to their email.")

    //Schema validation
    const schema = jschemasonpath.Admin_add_user_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_001. @API Admin fetch the user-form-information", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/' + UserId + '/form',
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

})

test("Admin_002. @API Endpoint validation for user-form-information", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/' + UserId + '/formIGS',
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
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

})

test("Admin_003. @API Access token validation for user_form_information", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/' + UserId + '/formIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")

})

test("Admin_005. @API Admin fetch the user-address-location", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            },
            params: {
                "type": "personalSettings"
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

})

test("Admin_006. @API Endpoint validation for user-address-location", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/formIGS?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

})

test("Admin_007. @API Access token validation for user-address-location", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")

})

test("Admin_009. @API Admin Admin fetch the user-setting", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            },
            params: {
                "type": "personalSettings"
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

})

test("Admin_010. @API Endpoint validation for user-setting", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/formIGS?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

})

test("Admin_011. @API Access token validation for user-setting", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")

})

test("Admin_013. @API Admin fetch the user-role", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            },
            params: {
                "type": "personalSettings"
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

})

test("Admin_014. @API Endpoint validation for user-role", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/formIGS?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

})

test("Admin_015. @API Access token validation for user-role", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": ""
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")

})

test("Admin_019. @API Admin add the user-save_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/user',
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

test("Admin_020. @API Admin add the user-save_validation of invalid endpoint.", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/userIGS',
        {
            data: jsonObject.Admin_add_user_save.body,
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

test("Admin_021. @API Admin add the user-address-save", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-contact/' + UserId,
        {
            data: jsonpath2.Admin_add_user_address_save.body,
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
    expect(await res.Response.Message).toEqual("User contact created successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_add_user_address_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_023. @API Admin add the user-address-save_validation of incorrect HTTP method", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/user-contact/' + UserId,
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

test("Admin_024. @API Admin add the user-address-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-contact/' + UserId + '/IGS',
        {
            data: jsonpath2.Admin_add_user_address_save.body,
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

test("Admin_025. @API Admin fetch the user-setting-form", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId,
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
})

test("Admin_026. @API Endpoint validation for user-setting-form", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/IGS',
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

test("Admin_028. @API Admin_user-setting-save", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-setting/' + UserId,
        {
            data: jsonpath2.Admin_user_setting_save.body,
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
    expect(await res.Response.Message).toEqual("User setting created successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_user_setting_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_029. @API Admin user-setting-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/user-setting/' + UserId,
        {
            data: jsonpath2.Admin_user_setting_save.body,
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

test("Admin_030. @API Admin user-setting-savee_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-setting/' + UserId + '/IGS',
        {
            data: jsonpath2.Admin_user_setting_save.body,
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

test("Admin_031. @API Admin fetch theUser-role-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId,
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
})

test("Admin_032. @API Endpoint validation for User-role-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/IGS',
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

test("Admin_034. @API Admin_user-role-save", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-role/' + UserId,
        {
            data: jsonpath2.Admin_user_role_save.body,
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
    expect(await res.Response.Message).toEqual("User roles created successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_user_role_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_035. @API Admin user-role-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/user-role/' + UserId,
        {
            data: jsonpath2.Admin_user_role_save.body,
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

test("Admin_036. @API Admin user-role-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/user-role/' + UserId + '/IGS',
        {
            data: jsonpath2.Admin_user_role_save.body,
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

test("Admin_037. @API Admin fetch the user-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user',
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
})

test("Admin_038. @API Endpoint validation for user-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/userIGS',
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

test("Admin_040. @API Admin fetch the user-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId,
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
})

test("Admin_041. @API Endpoint validation for user-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/IGS',
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

test("Admin_043. @API Admin fetch the user-edit-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/' + UserId + '/edit-form',
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
})

test("Admin_044. @API Endpoint validation for user-edit-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/' + UserId + '/edit-formIGS',
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

test("Admin_046. @API Admin_user-edit-update", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user/' + UserId,
        {
            data: jsonObject.Admin_add_user_save.Admin_user_edit_update,
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
    expect(await res.Response.Message).toEqual("User updated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_user_edit_update
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_047. @API Admin user-edit-update_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/user/' + UserId,
        {
            data: jsonObject.Admin_add_user_save.Admin_user_edit_update,
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

test("Admin_048. @API Admin user-edit-update_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user/' + UserId + '/IGS',
        {
            data: jsonObject.Admin_add_user_save.Admin_user_edit_update,
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

test("Admin_049. @API Admin fetch the user-address-edit-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/form',
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
})

test("Admin_050. @API Endpoint validation for user-address-edit-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/formIGS',
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

test("Admin_052. @API Admin_user-address-edit-update", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-contact/' + UserId + '/save',
        {
            data: jsonpath2.Admin_user_address_edit_update_body,
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
    expect(await res.Response.Message).toEqual("User contact updated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_user_address_edit_update_body
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_053. @API Admin user-address-edit-update_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/save',
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

test("Admin_054. @API Admin user-address-edit-updatee_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-contact/' + UserId + '/saveIGS',
        {
            data: jsonpath2.Admin_user_address_edit_update_body,
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

test("Admin_055. @API Admin fetch the user-setting-edit-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/form',
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
})

test("Admin_056. @API Endpoint validation for user-setting-edit-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/formIGS',
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

test("Admin_058. @API Admin_user-setting-edit-update", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-setting/' + UserId + '/save',
        {
            data: jsonpath2.Admin_user_setting_edit_update,
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
    expect(await res.Response.Message).toEqual("User setting updated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_user_setting_edit_update
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_059. @API Admin user-setting-edit-update_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/save',
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

test("Admin_060. @API Admin user-setting-edit-update_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-setting/' + UserId + '/saveIGS',
        {
            data: jsonpath2.Admin_user_setting_edit_update,
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

test("Admin_064. @API Admin_user-setting-edit-update", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-role/' + UserId + '/save',
        {
            data: jsonpath2.Admin_user_role_edit_update,
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
    expect(await res.Response.Message).toEqual("User roles updated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_user_role_edit_update
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_065. @API Admin user-setting-edit-update_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/save',
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

test("Admin_066. @API Admin user-setting-edit-update_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-role/' + UserId + '/saveIGS',
        {
            data: jsonpath2.Admin_user_role_edit_update,
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

test("Admin_067. @API Admin_users-list", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/users',
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

test("Admin_068. @API Admin users-list_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/users',
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

test("Admin_069. @API Admin users-list_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/usersIGS',
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

test("Admin_070. @API Admin_users-login", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/login',
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

test("Admin_071. @API Admin users-login_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/login',
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

test("Admin_072. @API Admin users-login_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/loginIGS',
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

test("Admin_076. @API Admin_Save-logout-settings", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-logout-settings',
        {
            data: jsonpath2.Admin_Save_logout_settings,
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
    expect(await res.Response.Message).toEqual("Logout idle time updated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_Save_logout_settings
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_077. @API Admin Save-logout-settings_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/save-logout-settings',
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

test("Admin_078. @API Admin Save-logout-settings_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-logout-settingsIGS',
        {
            data: jsonpath2.Admin_Save_logout_settings,
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

test("Admin_079. @API Admin_save-rate-limit-login", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/rate-limit-login',
        {
            data: jsonpath2.Admin_save_rate_limit_login,
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
    expect(await res.Response.Message).toEqual("Rate Limit Login settings has been updated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_save_rate_limit_login
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_080. @API Admin save-rate-limit-login_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/rate-limit-login',
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

test("Admin_081. @API Admin save-rate-limit-login_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/rate-limit-loginIGS',
        {
            data: jsonpath2.Admin_save_rate_limit_login,
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

test("Admin_061. @API Admin fetch the user-role-edit-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/form',
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
})

test("Admin_062. @API Endpoint validation for user-role-edit-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/formIGS',
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

test("Admin_073. @API Admin fetch the logout-settings-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-logout-settings',
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
})

test("Admin_074. @API Endpoint validation for logout-settings-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-logout-settingsIGS',
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

test("Admin_082. @API Admin fetch the rate-limit-login-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/rate-limit-login',
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
})

test("Admin_083. @API Endpoint validation for rate-limit-login-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/rate-limit-loginIGS',
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

test("Admin_098. @API Admin_role-save", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/role',
        {
            data: jsonObject.Admin_Role.Admin_role_save,
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
    expect(await res.Response.Message).toEqual("Role created successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_role_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_099. @API Admin role-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/role',
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

test("Admin_100. @API Admin role-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/roleIGS',
        {
            data: jsonObject.Admin_Role.Admin_role_save,
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

test("Admin_101. @API Admin fetch the role-create-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/role/form',
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
})

test("Admin_102. @API Endpoint validation for role-create-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/role/form/IGS',
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

test("Admin_104. @API Admin_Role list", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/roles',
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

test("Admin_105. @API Admin Role list_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/roles',
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

test("Admin_106. @API Admin Role list_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/rolesIGS',
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

test("Admin_107. @API Admin fetch the role-filter-list", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getrolefilter',
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
})

test("Admin_108. @API Endpoint validation for role-filter-list", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getrolefilterIGS',
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

test("Admin_110. @API Admin_roles-list-search", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/roles',
        {
            data: jsonObject.Admin_Role.Admin_roles_list_search,
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
    roleId = res.roles.data[0].id
    console.log("Rile id: ", roleId)
})

test("Admin_111. @API Admin roles-list-search_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/roles',
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

test("Admin_112. @API Admin roles-list-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/rolesIGS',
        {
            data: jsonObject.Admin_Role.Admin_roles_list_search,
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

test("Admin_113. @API Admin_roles-filter-search", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/roles',
        {
            data: jsonObject.Admin_Role.Admin_roles_filter_search,
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

test("Admin_114. @API Admin roles-filter-search_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/roles',
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

test("Admin_115. @API Admin roles-filter-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/rolesIGS',
        {
            data: jsonObject.Admin_Role.Admin_roles_filter_search,
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

test("Admin_116. @API Admin_role-custom-filter-save", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Admin_Role.Admin_role_custom_filter_save,
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
    const schema = jschemasonpath.Admin_role_custom_filter_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_117. @API Adminrole-custom-filter-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/custom-filter',
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

test("Admin_118. @API Admin role-custom-filter-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filterIGS',
        {
            data: jsonObject.Admin_Role.Admin_role_custom_filter_save,
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
test("Admin_119. @API Admin_role-list-pagination", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/roles?page=2',
        {
            data: jsonpath2.Admin_role_list_pagination,
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

    var res = await response.json();
})

test("Admin_120. @API Adminrole-role-list-pagination_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/roles?page=2',
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

test("Admin_121. @API Admin role-list-pagination_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/rolesIGS?page=2',
        {
            data: jsonpath2.Admin_role_list_pagination,
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

test("Admin_122. @API Admin_roles-list-column-hiden", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/roles?page=2',
        {
            data: jsonpath2.Admin_roles_list_column_hiden,
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

    var res = await response.json();
})

test("Admin_123. @API Adminrole-roles-list-column-hiden_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/roles?page=2',
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

test("Admin_124. @API Admin roles-list-column-hiden_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/rolesIGS?page=2',
        {
            data: jsonpath2.Admin_roles_list_column_hiden,
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

test("Admin_125. @API Admin_role-update", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/role/' + roleId,
        {
            data: jsonObject.Admin_Role.Admin_role_update,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Role updated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_role_update
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_126. @API Adminrole-role-update_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/role/' + roleId,
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

test("Admin_127. @API Admin role-update_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/role/' + roleId + '/IGS',
        {
            data: jsonObject.Admin_Role.Admin_role_update,
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

test("Admin_085. @API Admin fetch the role-duplicate", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicateRole/' + roleId,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Role duplicated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_fetch_the_role_duplicate
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_086. @API Endpoint validation for role-duplicate", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicateRole/' + roleId + '/IGS',
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

test("Admin_088. @API Admin fetch the delete-role", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deleterole/' + roleId,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Role deleted successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_fetch_the_delete_role
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_089. @API Endpoint validation for delete-role", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deleterole/' + roleId + '/IGS',
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

test("Admin_091. @API Admin delete-role_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deleterole/' + roleId,
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

test("Admin_128. @API Admin fetch the user-activities-filter", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/useractivities',
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
})

test("Admin_129. @API Endpoint validation for user-activities-filter", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/useractivitiesIGS',
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

test("Admin_131. @API Admin_user-activities-list", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/useractivities',
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

    var res = await response.json();
})

test("Admin_132. @API Admin user-activities-list_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/useractivities',
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

test("Admin_133. @API Admin user-activities-list_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/useractivitiesIGS',
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

test("Admin_134. @API Admin_user-activities-list-pagination", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/useractivities?page=2',
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

    var res = await response.json();
    user_activity_id = res.useractivities.data[0]["id"]
    console.log("User activity id:", user_activity_id)
})

test("Admin_135. @API Admin user-activities-list-pagination_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/useractivities?page=2',
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

test("Admin_136. @API Admin user-activities-list-pagination_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/useractivitiesIGS?page=2',
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

test("Admin_092. @API Admin fetch thesecurity-control-privilage-liste", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/securitycontrol/12',
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
})

test("Admin_093. @API Endpoint validation for security-control-privilage-list", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/securitycontrol/12/IGS',
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

test("Admin_095. @API Admin_securitycontrol-save", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/securitycontrol/12',
        {
            data: jsonpath2.Admin_securitycontrol_save,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Security control updated successfully.")

    //Schema validation
    const schema = jschemasonpath.Admin_securitycontrol_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_096. @API Admin securitycontrol-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/securitycontrol/12',
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

test("Admin_097. @API Admin securitycontrol-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/securitycontrol/12/IGS',
        {
            data: jsonpath2.Admin_securitycontrol_save,
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

test("Admin_137. @API Admin_user-activities-search", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/useractivities',
        {
            data: {
                "freeText": [
                    user_activity_id
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

    var res = await response.json();
})

test("Admin_138. @API Admin user-activities-search_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/useractivities',
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

test("Admin_139. @API Admin user-activities-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/useractivitiesIGS',
        {
            data: {
                "freeText": [
                    user_activity_id
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
})

test("Admin_140. @API Admin_user-activities-filter-search", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/useractivities',
        {
            data: jsonpath2.Admin_user_activities_filter_search,
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

    var res = await response.json();
})

test("Admin_141. @API Admin user-activities-filter-search_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/useractivities',
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

test("Admin_142. @API Admin user-activities-filter-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/useractivitiesIGS',
        {
            data: jsonpath2.Admin_user_activities_filter_search,
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

test("Admin_143. @API Admin_custom-filter-save public or privet", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter',
        {
            data: {
                "filterArray": {
                    "filterName": user_activity_id,
                    "filterType": "public",
                    "filterPage": "view-user-activity",
                    "filter_id": ""
                },
                "customFilter": [
                    {
                        "filterId": "User Name",
                        "operator": "eq",
                        "displayText": "User Name <span><strong>is equal to</strong></span> ",
                        "filterValue1": "\t SAAS QA marker",
                        "filterValue2": "",
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
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Filter saved successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_custom_filter_save_public_or_privet
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_144. @API Admin custom-filter-save public or privet_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/custom-filter',
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

test("Admin_145. @API Admin custom-filter-save public or privet_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filterIGS',
        {
            data: {
                "filterArray": {
                    "filterName": user_activity_id,
                    "filterType": "public",
                    "filterPage": "view-user-activity",
                    "filter_id": ""
                },
                "customFilter": [
                    {
                        "filterId": "User Name",
                        "operator": "eq",
                        "displayText": "User Name <span><strong>is equal to</strong></span> ",
                        "filterValue1": "\t SAAS QA marker",
                        "filterValue2": "",
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
})

test("Admin_146. @API Admin fetch the email-template-create-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/email-template/form',
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
})

test("Admin_147. @API Endpoint validation for email-template-create-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/email-template/formIGS',
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

/*test("Admin_149. @API Admin_email-template-save", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/email-template',
        {
            data: jsonObject.customization_email_tempalte.Admin_email_template_save_body,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Template created successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_email_template_save_body
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_150. @API Admin email-template-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/email-template',
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

test("Admin_151. @API Admin email-template-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/email-templateIGS',
        {
            data: jsonObject.customization_email_tempalte.Admin_email_template_save_body,
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
})*/

test("Admin_158. @API Admin_email-templates-list", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/email_templates',
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

    var res = await response.json();
})

test("Admin_159. @API Admin email-templates-list_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/email_templates',
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

test("Admin_160. @API Admin email-templates-list_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/email_templatesIGS',
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

test("Admin_161. @API Admin_email-templates-search", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/email_templates',
        {
            data: jsonObject.customization_email_tempalte.Admin_email_templates_search,
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

    var res = await response.json();
    email_template_id = res.email_templates.data[0].id
    console.log("Email Template id: ", email_template_id)
})

test("Admin_162. @API Admin email-templates-searcht_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/email_templates',
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

test("Admin_163. @API Admin email-templates-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/email_templatesIGS',
        {
            data: jsonObject.customization_email_tempalte.Admin_email_templates_search,
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

test("Admin_164. @API Admin fetch the email-template-filter-list", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getemailtemplatefilter',
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
})

test("Admin_165. @API Endpoint validation for email-template-filter-list", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getemailtemplatefilterIGS',
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

test("Admin_167. @API Admin_email-templates-pagination", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/email_templates?page=2',
        {
            data: { "freeText": [] },
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

    var res = await response.json();
})

test("Admin_168. @API Admin email-templates-pagination_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/email_templates?page=2',
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

test("Admin_169. @API Admin email-templates-pagination_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/email_templatesIGS?page=2',
        {
            data: { "freeText": [] },
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

test("Admin_170. @API Admin_email-templates-filter-search", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/email_templates',
        {
            data: jsonpath2.Admin_email_templates_filter_search,
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

    var res = await response.json();
})

test("Admin_171. @API Admin email-templates-filter-search_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/email_templates',
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

test("Admin_172. @API Admin email-templates-filter-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/email_templatesIGS',
        {
            data: jsonpath2.Admin_email_templates_filter_search,
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

test("Admin_173. @API Admin_custom-filter-save", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.customization_email_tempalte.Admin_custom_filter_save,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Filter saved successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_custom_filter_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_174. @API Admin custom-filter-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/custom-filter',
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

test("Admin_175. @API Admin custom-filter-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filterIGS',
        {
            data: jsonObject.customization_email_tempalte.Admin_custom_filter_save,
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

test("Admin_176. @API Admin_email-templates-list-field-column-hide", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/email_templates?page=1',
        {
            data: jsonpath2.Admin_email_templates_list_field_column_hide,
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

    var res = await response.json();
})

test("Admin_177. @API Admin email-templates-list-field-column-hide_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/email_templates?page=1',
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

test("Admin_178. @API Admin email-templates-list-field-column-hide_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/email_templatesIGS?page=1',
        {
            data: jsonpath2.Admin_email_templates_list_field_column_hide,
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

test("Admin_152. @API Admin fetch the email-template-edit-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/email-template/' + email_template_id + '/form',
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
})

test("Admin_153. @API Endpoint validation for email-template-edit-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/email-template/' + email_template_id + '/formIGS',
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

test("Admin_155. @API Admin_email-template-update", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/email-template/' + email_template_id,
        {
            data: jsonpath2.Admin_email_template_update,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Template updated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_email_template_update
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_156. @API Admin email-template-update_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/email-template/' + email_template_id,
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

test("Admin_157. @API Admin email-template-update_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/email-template/' + email_template_id + '/IGS',
        {
            data: jsonpath2.Admin_email_template_update,
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

test("Admin_179. @API Admin_create-dashboard-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/createdashboard-schema',
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

    var res = await response.json();
})

test("Admin_180. @API Admin create-dashboard-form_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/createdashboard-schemaIGS',
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

test("Admin_181. @API Admin_create-dashboard-save", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/createdashboard',
        {
            data: jsonObject.Dashboard.Admin_create_dashboard_save,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("New dashboard created")

    //Schema validation
    const schema = jschemasonpath.Admin_create_dashboard_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_182. @API Admin create-dashboard-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/createdashboard',
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

test("Admin_183. @API Admin create-dashboard-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/createdashboardIGS',
        {
            data: jsonObject.Dashboard.Admin_create_dashboard_save,
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

test("Admin_184. @API Admin_dashboards-list", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/dashboards',
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

    var res = await response.json();
})

test("Admin_185. @API Admin dashboards-list_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/dashboards',
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

test("Admin_186. @API Admin dashboards-list_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/dashboardsIGS',
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

test("Admin_187. @API Admin fetch the dashboard-filter-list", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/dashboardfilter',
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
})

test("Admin_188. @API Endpoint validation for dashboard-filter-list", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/dashboardfilterIGS',
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

test("Admin_190. @API Admin_dashboards-search", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/dashboards',
        {
            data: jsonObject.Dashboard.Admin_dashboards_search,
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

    var res = await response.json();
    dashboard_id = res.dashboards.data[0].id
    console.log("Dashboard id: ", dashboard_id)
})

test("Admin_191. @API Admin dashboards-search_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/dashboards',
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

test("Admin_192. @API Admin dashboards-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/dashboardsIGS',
        {
            data: jsonObject.Dashboard.Admin_dashboards_search,
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

test("Admin_193. @API Admin_dashboards-filter-search", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/dashboards',
        {
            data: jsonpath2.Admin_dashboards_filter_search,
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

    var res = await response.json();
})

test("Admin_194. @API Admin dashboards-filter-search_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/dashboards',
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

test("Admin_195. @API Admin dashboards-filter-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/dashboardsIGS',
        {
            data: jsonpath2.Admin_dashboards_filter_search,
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

test("Admin_196. @API Admin_custom-filter-save public or private", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Dashboard.Admin_custom_filter_save_public_or_private,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Filter saved successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_custom_filter_save_public_or_private
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_197. @API Admin custom-filter-save public or private_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/custom-filter',
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

test("Admin_198. @API Admin custom-filter-save public or private_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filterIGS',
        {
            data: jsonObject.Dashboard.Admin_custom_filter_save_public_or_private,
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

test("Admin_199. @API Admin_dashboards-list-field-column-hide", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/dashboards',
        {
            data: jsonpath2.Admin_dashboards_list_field_column_hide,
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

    var res = await response.json();
})

test("Admin_200. @API Admin dashboards-list-field-column-hide_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/dashboards',
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

test("Admin_201. @API Admin dashboards-list-field-column-hide_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/dashboardsIGS',
        {
            data: jsonpath2.Admin_dashboards_list_field_column_hide,
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

test("Admin_202. @API Admin fetch the dashboard-list-status-change", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/dashboard/status/1/1',
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
})

test("Admin_204. @API Admin_edit-dashboard-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/editdashboard-schema/1',
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

    var res = await response.json();
})

test("Admin_205 @API Admin edit-dashboard-form_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/editdashboard-schema/1/IGS',
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

test("Admin_206. @API Admin_dashboard-update", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/editdashboard/' + dashboard_id,
        {
            data: jsonObject.Dashboard.Admin_dashboard_update,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Dashboard updated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_dashboard_update
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_207. @API Admin dashboard-update_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/editdashboard/' + dashboard_id,
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

test("Admin_208. @API Admin dashboard-update_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/editdashboard/' + dashboard_id + '/IGS',
        {
            data: jsonObject.Dashboard.Admin_dashboard_update,
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

test("Admin_209. @API Admin fetch the duplicate-dashboard", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatedashboard/' + dashboard_id,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Dashboard duplicated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_duplicate_dashboard
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_210. @API Endpoint validation for duplicate-dashboard", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatedashboard/' + dashboard_id + '/IGS',
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

test("Admin_212. @API Admin fetch the delete-dashboard", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deletedashboard/' + dashboard_id,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Dashboard deleted successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_delete_dashboard
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_213. @API Endpoint validation for delete-dashboard", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deletedashboard/' + dashboard_id + '/IGS',
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

test("Admin_215. @API Admin fetch the chat-settings-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/chat-settings',
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

    var res = await response.json();
})

test("Admin_216. @API Endpoint validation for chat-settings-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/chat-settingsIGS',
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

test("Admin_218. @API Admin_chat-settings-save", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/chat-settings',
        {
            data: jsonpath2.Admin_chat_settings_save,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Chat Settings Updated  successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_chat_settings_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_219. @API Admin chat-settings-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/chat-settings',
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

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("Admin_220. @API Admin chat-settings-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/chat-settingsIGS',
        {
            data: jsonpath2.Admin_chat_settings_save,
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

test("Admin_221. @API Admin fetch the training_centre-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_centre',
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

    var res = await response.json();
})

test("Admin_222. @API Endpoint validation for training_centre-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_centreIGS',
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

test("Admin_224. @API Admin_training_centre-save", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_centre',
        {
            data: jsonObject.Training_Center.Admin_training_centre_save,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Training Centre added   successfully")
    training_center__id = res.Response.data.id
    console.log("Training Center id: ", training_center__id)

    //Schema validation
    const schema = jschemasonpath.Admin_training_centre_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_225. @API Admin training_centre-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/training_centre',
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

test("Admin_226. @API Admin training_centre-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_centreIGS',
        {
            data: jsonObject.Training_Center.Admin_training_centre_save,
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

test("Admin_227. @API Admin fetch the training_centre-edit-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_centre/1',
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

    var res = await response.json();
})

test("Admin_228. @API Endpoint validation for training_centre-edit-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_centre/1/IGS',
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

test("Admin_230. @API Admin_training_centre-update", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_centre/' + training_center__id,
        {
            data: jsonObject.Training_Center.Admin_training_centre_update,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Training Centre updated   successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_training_centre_update
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_231. @API Admin training_centre-update_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/training_centre/' + training_center__id,
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

test("Admin_232. @API Admin training_centre-update_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_centre/' + training_center__id + '/IGS',
        {
            data: jsonObject.Training_Center.Admin_training_centre_update,
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

test("Admin_233. @API Admin_training_centres-list", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_centres',
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

    var res = await response.json();
})

test("Admin_234. @API Admin training_centres-list_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_centres',
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

test("Admin_235. @API Admin training_centres-list_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_centresIGS',
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

test("Admin_236. @API Admin fetch the training_centres-filters", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/training_centres',
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

    var res = await response.json();
})

test("Admin_237. @API Endpoint validation for training_centres-filters", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/training_centresIGS',
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

test("Admin_240. @API Admin training_centres-search_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_centres',
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

test("Admin_241. @API Admin training_centres-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_centresIGS',
        {
            data: jsonObject.Training_Center.Admin_training_centres_search,
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

test("Admin_243. @API Admin training_centres-filter-search_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_centres',
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

test("Admin_244. @API Admin training_centres-filter-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_centresIGS',
        {
            data: jsonObject.Training_Center.Admin_training_centres_filter_search,
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

test("Admin_245. @API Admin_training_centre-custom-filter-save", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_centre-custom-filter',
        {
            data: jsonObject.Training_Center.Admin_training_centre_custom_filter_save,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Filter saved successfully!")

    //Schema validation
    const schema = jschemasonpath.Admin_training_centre_custom_filter_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_246. @API Admin training_centre-custom-filter-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_centre-custom-filter',
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

test("Admin_247. @API Admin training_centre-custom-filter-save-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_centre-custom-filterIGS',
        {
            data: jsonObject.Training_Center.Admin_training_centre_custom_filter_save,
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

test("Admin_249. @API Admin training_centres-field-column-show and hide_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_centres',
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

test("Admin_250. @API Admin training_centres-field-column-show and hide_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_centresIGS',
        {
            data: jsonpath2.Admin_training_centres_field_column_show_and_hide,
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

test("Admin_252. @API Admin training_centres-pagination_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_centres?page=2',
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

test("Admin_253. @API Admin training_centres-pagination_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_centresIGS?page=2',
        {
            data: jsonpath2.Admin_training_centres_pagination,
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

test("Admin_254. @API Admin fetch the deactivate_training_centre", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_training_centre/' + training_center__id,
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

    var res = await response.json();
})

test("Admin_255. @API Endpoint validation for deactivate_training_centre", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_training_centre/' + training_center__id + '/IGS',
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

test("Admin_257. @API Admin fetch the activate_training_centre", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/activate_training_centre/' + training_center__id,
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

    var res = await response.json();
})

test("Admin_258. @API Endpoint validation for activate_training_centre", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/activate_training_centre/' + training_center__id + '/IGS',
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

test("Admin_260. @API Admin fetch the training_centre-delete", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/training_centre/' + training_center__id,
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

    var res = await response.json();
})

test("Admin_261. @API Endpoint validation for training_centre-delete", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/training_centre/' + training_center__id + '/IGS',
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

test("Admin_263. @API Admin fetch the training_site-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_site',
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

    var res = await response.json();
})

test("Admin_264. @API Endpoint validation for training_site-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_siteIGS',
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

test("Admin_266. @API Admin_training_site-save", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_site',
        {
            data: jsonObject.Training_Site.Admin_training_site_save,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Training Site added   successfully")
    training_site_id = res.Response.data.id
    console.log("Training Site id: ", training_site_id)

    //Schema validation
    const schema = jschemasonpath.Admin_training_site_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_267. @API Admin training_site-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/training_site',
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

test("Admin_268. @API Admin training_site-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_siteIGS',
        {
            data: jsonObject.Training_Site.Admin_training_site_save,
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

test("Admin_269. @API Admin fetch the training_site-edit-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_site/' + training_site_id,
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

    var res = await response.json();
})

test("Admin_270. @API Endpoint validation for training_site-edit-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_site/' + training_site_id + '/IGS',
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

test("Admin_272. @API Admin_training_sites-list", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_sites',
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

    var res = await response.json();
})

test("Admin_273. @API Admin training_sites-list_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_sites',
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

test("Admin_274. @API Admin training_sites-list_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_sitesIGS',
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

test("Admin_276. @API Admin training_sites-search_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_sites',
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

test("Admin_277. @API Admin training_sites-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_sitesIGS',
        {
            data: jsonObject.Training_Site.Admin_training_site_search,
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

test("Admin_279. @API Admin training_sites-filter-search_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_sites',
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

test("Admin_280. @API Admin training_sites-filter-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_sitesIGS',
        {
            data: jsonObject.Training_Site.Admin_training_site_search,
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

test("Admin_281. @API Admin_training_site-custom-filter-save", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_site-custom-filter',
        {
            data: jsonObject.Training_Site.Admin_training_site_custom_filter_save,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Filter saved successfully!")

    //Schema validation
    const schema = jschemasonpath.Admin_training_site_custom_filter_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_282. @API Admin training_site-custom-filter-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_site-custom-filter',
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

test("Admin_283. @API Admin training_site-custom-filter-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_site-custom-filterIGS',
        {
            data: jsonObject.Training_Site.Admin_training_site_custom_filter_save,
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

test("Admin_285. @API Admin training_sites-field-cloumn-hide and show_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_sites',
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

test("Admin_286. @API Admin training_sites-field-cloumn-hide and show_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_sitesIGS',
        {
            data: jsonpath2.Admin_training_sites_field_cloumn_hide_and_show,
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

test("Admin_288. @API Admin training_sites-pagination_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_sites?page=2',
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

test("Admin_289. @API Admin training_sites-pagination_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_sitesIGS?page=2',
        {
            data: jsonpath2.Admin_training_sites_pagination,
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

test("Admin_290. @API Admin fetch the deactivate_training_site", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_training_site/' + training_site_id,
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

    var res = await response.json();
})

test("Admin_291. @API Endpoint validation for deactivate_training_site", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_training_site/' + training_site_id + '/IGS',
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

test("Admin_293. @API Admin fetch the activate_training_site", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/activate_training_site/' + training_site_id,
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

    var res = await response.json();
})

test("Admin_294. @API Endpoint validation for activate_training_site", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/activate_training_site/' + training_site_id + '/IGS',
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

test("Admin_296. @API Admin fetch the training_site-delete", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/training_site/' + training_site_id,
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

    var res = await response.json();
})

test("Admin_297. @API Endpoint validation for training_site-delete", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/training_site/' + training_site_id + '/IGS',
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

test("Admin_299. @API Admin_save-grade-scale", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-grade-scale',
        {
            data: jsonObject.Grade_Scale.Admin_save_grade_scale,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.message).toEqual("Grade Scale saved successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_save_grade_scale
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_300. @API Admin save-grade-scale_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/save-grade-scale',
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

test("Admin_301. @API Admin save-grade-scale_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-grade-scaleIGS',
        {
            data: jsonObject.Grade_Scale.Admin_save_grade_scale,
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

test("Admin_314. @API Admin_grade-scale-search", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-scale',
        {
            data: jsonObject.Grade_Scale.Admin_grade_scale_search,
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

    var res = await response.json();
    grade_scale_id = res.gradeScales.data[0].id
    grade_scale_name = res.gradeScales.data[0].name
    console.log("Grade Scale id: ", grade_scale_id)
})

test("Admin_315. @API Admin grade-scale-search_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-scale',
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

test("Admin_316. @API Admin grade-scale-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-scaleIGS',
        {
            data: jsonObject.Grade_Scale.Admin_grade_scale_search,
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

test("Admin_302. @API Admin_grade-scale-edit-form", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/manage-grade-scale',
        {
            data: {
                "gradeScaleId": grade_scale_id
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

    var res = await response.json();
})

test("Admin_303. @API Admin grade-scale-edit-form_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/manage-grade-scale',
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

test("Admin_304. @API Admin grade-scale-edit-form_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/manage-grade-scaleIGS',
        {
            data: {
                "gradeScaleId": grade_scale_id
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

test("Admin_305. @API Admin_save-grade-scale", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-grade-scale',
        {
            data: {
                "gradeScaleId": grade_scale_id,
                "gradeScaleName": grade_scale_name,
                "scaleValues": [
                    {
                        "value": "green",
                        "color": "#00ff2a",
                        "id": 26
                    },
                    {
                        "value": "red",
                        "color": "#ff0000",
                        "id": 27
                    },
                    {
                        "value": "yellow",
                        "color": "#fff700",
                        "id": 28
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.message).toEqual("Grade Scale saved successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_save_grade_scale
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_306. @API Admin save-grade-scale_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/save-grade-scale',
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

test("Admin_307. @API Admin save-grade-scale_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-grade-scaleIGS',
        {
            data: {
                "gradeScaleId": grade_scale_id,
                "gradeScaleName": grade_scale_name,
                "scaleValues": [
                    {
                        "value": "green",
                        "color": "#00ff2a",
                        "id": 26
                    },
                    {
                        "value": "red",
                        "color": "#ff0000",
                        "id": 27
                    },
                    {
                        "value": "yellow",
                        "color": "#fff700",
                        "id": 28
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
})

test("Admin_308. @API Admin_grade-scale-list", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-scale',
        {
            data: jsonpath2.Admin_grade_scale_list,
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

    var res = await response.json();
})

test("Admin_309. @API Admin grade-scale-list_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-scale',
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

test("Admin_310. @API Admin grade-scale-list_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-scaleIGS',
        {
            data: jsonpath2.Admin_grade_scale_list,
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

test("Admin_311. @API Admin fetch the grade-scale-filters", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-scale-filters',
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

    var res = await response.json();
})

test("Admin_312. @API Endpoint validation for grade-scale-filters", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-scale-filtersIGS',
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

test("Admin_317. @API Admin_grade-scale-filter-search", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-scale',
        {
            data: jsonObject.Grade_Scale.Admin_grade_scale_filter_search,
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

    var res = await response.json();
})

test("Admin_318. @API Admin grade-scale-filter-search_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-scale',
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

test("Admin_319. @API Admin grade-scale-filter-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-scaleIGS',
        {
            data: jsonObject.Grade_Scale.Admin_grade_scale_filter_search,
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

test("Admin_320. @API Admin_grade-scale-custom-filter-save", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-scale-custom-filter',
        {
            data: jsonObject.Grade_Scale.Admin_grade_scale_custom_filter_save,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Filter saved successfully!")

    //Schema validation
    const schema = jschemasonpath.Admin_grade_scale_custom_filter_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_321. @API Admin grade-scale-custom-filter-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-scale-custom-filter',
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

test("Admin_322. @API Admin grade-scale-custom-filter-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-scale-custom-filterIGS',
        {
            data: jsonObject.Grade_Scale.Admin_grade_scale_custom_filter_save,
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

test("Admin_323. @API Admin_grade-scale-field-column-hide", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-scale',
        {
            data: jsonpath2.Admin_grade_scale_field_column_hide,
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

    var res = await response.json();
})

test("Admin_324. @API Admin grade-scale-field-column-hide_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-scale',
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

test("Admin_325. @API Admin grade-scale-field-column-hide_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-scaleIGS',
        {
            data: jsonpath2.Admin_grade_scale_field_column_hide,
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

test("Admin_326. @API Admin_grade-scale-pagination", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-scale?page=2',
        {
            data: jsonpath2.Admin_grade_scale_pagination,
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

    var res = await response.json();
})

test("Admin_327. @API Admin grade-scale-pagination_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-scale?page=2',
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

test("Admin_328. @API Admin grade-scale-pagination_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-scaleIGS?page=2',
        {
            data: jsonpath2.Admin_grade_scale_pagination,
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

test("Admin_329. @API Admin_duplicate-grade-scale", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/duplicate-grade-scale?gradeScaleId=' + grade_scale_id,
        {
            data: {},
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

    var res = await response.json();
})

test("Admin_330. @API Admin duplicate-grade-scale_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicate-grade-scale?gradeScaleId=' + grade_scale_id,
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

test("Admin_331. @API Admin duplicate-grade-scale_validation of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/duplicate-grade-scaleIGS?gradeScaleId=' + grade_scale_id,
        {
            data: {},
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

test("Admin_332. @API Admin duplicate-grade-scale_validation of invalid grade scale id", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/duplicate-grade-scale?gradeScaleId=' + grade_scale_id + 'igs',
        {
            data: {},
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(500);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("Admin_522. @API Admin add the user and save_validate invalid_userId", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-contact/' + UserId + 'abs',
        {
            data: jsonpath2.Admin_add_user_address_save.body,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(500);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("Admin_525. @API Admin_roles-list-search_empty access token", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/roles',
        {
            data: jsonObject.Admin_Role.Admin_roles_list_search,
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

test("Admin_526. @API Admin fetch the user-activities-filter_invalid access token", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/useractivities',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token + "IGS"
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
    expect(await res.error_description).toEqual("The access token is invalid or has expired")
})

test("Admin_527. @API Admin fetch the email-template-edit-form_invalid access token", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/email-template/' + email_template_id + '/form',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token + "IGS"
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
    expect(await res.error_description).toEqual("The access token is invalid or has expired")
})

test("Admin_528. @API Admin fetch the email-template-create-form_invalid access token", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/email-template/form',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token + "IGS"
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
    expect(await res.error_description).toEqual("The access token is invalid or has expired")
})

test("Admin_529. @API Admin fetch the email-template-filter-list_invalid access token", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getemailtemplatefilter',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token + "IGS"
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
    expect(await res.error_description).toEqual("The access token is invalid or has expired")
})

test("Admin_530. @API Admin fetch the duplicate-dashboard_invalid access token", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatedashboard/1',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token + "IGS"
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
    expect(await res.error_description).toEqual("The access token is invalid or has expired")
})

test("Admin_531. @API Admin fetch the delete-dashboard_invalid access token", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deletedashboard/' + dashboard_id,
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token + "IGS"
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
    expect(await res.error_description).toEqual("The access token is invalid or has expired")
})

test("Admin_532. @API Admin fetch the chat-settings-form_invalid access token", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/chat-settings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token + "IGS"
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
    expect(await res.error_description).toEqual("The access token is invalid or has expired")
})

test("Admin_533. @API Admin fetch the training_centre-form_invalid access token", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_centre',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token + "IGS"
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
    expect(await res.error_description).toEqual("The access token is invalid or has expired")
})

test("Admin_534. @API Admin fetch the training_centre-edit-form_invalid access token", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_centre/1',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token + "IGS"
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
    expect(await res.error_description).toEqual("The access token is invalid or has expired")
})

test("Admin_535. @API Admin fetch the training_centres-filters_invalid access token", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/training_centres',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token + "IGS"
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
    expect(await res.error_description).toEqual("The access token is invalid or has expired")
})

test("Admin_536. @API Admin fetch the deactivate_training_centre_invalid access token", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_training_centre/' + training_center__id,
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token + "IGS"
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
    expect(await res.error_description).toEqual("The access token is invalid or has expired")
})

test("Admin_537. @API Admin fetch the activate_training_centre_invali access token", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/activate_training_centre/' + training_center__id,
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token + "IGS"
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
    expect(await res.error_description).toEqual("The access token is invalid or has expired")
})

test("Admin_538. @API Admin fetch the training_site-form_invalid access token", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_site',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token + "IGS"
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
    expect(await res.error_description).toEqual("The access token is invalid or has expired")
})

test("Admin_539. @API Admin fetch the grade-scale-filters_invalid access token", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-scale-filters',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.webreferer,
                "authorization": token + "IGS"
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
    expect(await res.error_description).toEqual("The access token is invalid or has expired")
})

test("Admin_540. @API Admin verify  the save-auth-methods information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-auth-methods',
        {
            data: jsonpath2.Common_Setting_Authentication_Simple_Authentication,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.message).toEqual("Authentication activated successfully")

    //Schema validation
    const schema = jschemasonpath.Common_Setting_Authentication_Simple_Authentication;
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_541. @API Admin add  the  verify  the save-auth-methods of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/save-auth-methods',
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

test("Admin_542. @API Admin add the  verify  the save-auth-methods  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-auth-methodsIGS',
        {
            data: jsonpath2.Common_Setting_Authentication_Simple_Authentication,
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

test("Admin_543. @API To verify the AuthMethods-list-simple aut  informations", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getAuthMethods',
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

    var res = await response.json();
})

test("Admin_544. @API To verify the response when passing an invalid endpoint for AuthMethods-list-simple aut.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getAuthMethodsIGS',
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

test("Admin_545. @API To verify the response when passing empty access token for AuthMethods-list-simple aut.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getAuthMethods',
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

test("Admin_547. @API To verify the multifactor - auth - form  informations", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/multifactor-authentication',
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

    var res = await response.json();
})

test("Admin_548. @API To verify the response of multifactor-auth-form  when passing an invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/multifactor-authenticationIGS',
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

test("Admin_549. @API To verify the response of multifactor-auth-form when passing empty access token.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/multifactor-authentication',
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

test("Admin_551. @API Admin verify  the save-auth-methods information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-auth-methods',
        {
            data: jsonpath2.Comman_Setting_Authentication_Multi_factor_Auth,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.message).toEqual("Authentication activated successfully")

    //Schema validation
    const schema = jschemasonpath.Common_Setting_Authentication_Simple_Authentication;
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_552. @API Admin add  the  verify  the save-auth-methods of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/save-auth-methods',
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

test("Admin_553. @API Admin add the  verify  the save-auth-methods  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-auth-methodsIGS',
        {
            data: jsonpath2.Comman_Setting_Authentication_Multi_factor_Auth,
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

test("Admin_554. @API To verify the saml-auth-form  informations", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/saml-authentication',
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

    var res = await response.json();
})

test("Admin_555. @API To verify the response of saml-auth-form when passing an invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/saml-authenticationIGS',
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

test("Admin_556. @API To verify the response of saml-auth-form when passing empty access token.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/saml-authentication',
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

test("Admin_558. @API Admin verify  the save-auth-methods information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-auth-methods',
        {
            data: jsonpath2.Comman_Setting_Authentication_Azure_saml,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.message).toEqual("Authentication activated successfully")

    //Schema validation
    const schema = jschemasonpath.Common_Setting_Authentication_Simple_Authentication;
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_559. @API Admin add  the  verify  the save-auth-methods of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/save-auth-methods',
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

test("Admin_560. @API Admin add the  verify  the save-auth-methods  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-auth-methodsIGS',
        {
            data: jsonpath2.Comman_Setting_Authentication_Azure_saml,
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

test("Admin_561. @API To verify the azure-open-auth-form informations", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/azure-authentication',
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

    var res = await response.json();
})

test("Admin_562. @API To verify the response of azure-open-auth-form when passing an invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/azure-authenticationIGS',
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

test("Admin_563. @API To verify the response of azure-open-auth-form when passing empty access token.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/azure-authentication',
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

test("Admin_566. @API Admin add  the  verify  the save-auth-methods of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/save-auth-methods',
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

test("Admin_567. @API Admin add the  verify  the save-auth-methods  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-auth-methodsIGS',
        {
            data: jsonpath2.Comman_Setting_Authentication_Azure_Open,
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

test("Admin_568. @API To verify the portal-sso-auth-form informations", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/portal-sso-authentication',
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

    var res = await response.json();
})

test("Admin_569. @API To verify the response of portal-sso-auth-form when passing an invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/portal-sso-authenticationIGS',
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

test("Admin_570. @API To verify the response of portal-sso-auth-form when passing empty access token.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/portal-sso-authentication',
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

test("Admin_572. @API Admin verify  the save-auth-methods information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-auth-methods',
        {
            data: jsonpath2.Comman_Setting_Authentication_portal_sso_auth,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.message).toEqual("Authentication activated successfully")

    //Schema validation
    const schema = jschemasonpath.Common_Setting_Authentication_Simple_Authentication;
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_573. @API Admin add  the  verify  the save-auth-methods of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/save-auth-methods',
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

test("Admin_574. @API Admin add the  verify  the save-auth-methods  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-auth-methodsIGS',
        {
            data: jsonpath2.Comman_Setting_Authentication_portal_sso_auth,
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

test("Admin_583. @API Admin verify  the grade-book-create-form  information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/manage-grade-book',
        {
            data: jsonpath2.Comman_Setting_Grade_Settings_Grade_Book_Grade_Create,
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

    var res = await response.json();
})

test("Admin_584. @API Admin add  the  verify  the grade-book-create-form  of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/manage-grade-book',
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

test("Admin_585. @API Admin add the  verify  the grade-book-create-form  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/manage-grade-bookIGS',
        {
            data: jsonpath2.Comman_Setting_Grade_Settings_Grade_Book_Grade_Create,
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

test("Admin_592. @API Admin verify  the get-ExamSession information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/getExamSession',
        {
            data: jsonpath2.Comman_Setting_Grade_Settings_Grade_Book_Grade_Create_get_ExamSession,
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

    var res = await response.json();

    //Schema validation
    const schema = jschemasonpath.Comman_Setting_Grade_Settings_Grade_Book_Grade_Create_get_ExamSession;
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_593. @API Admin add  the  verify  the get-ExamSession of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-registration-api/v2/getExamSession',
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

test("Admin_594. @API Admin add the  verify  the get-ExamSession  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-registration-api/v2/getExamSessionIGS',
        {
            data: jsonpath2.Comman_Setting_Grade_Settings_Grade_Book_Grade_Create_get_ExamSession,
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

test("Admin_586. @API Admin verify  the grade-book-create-form -exam-select  information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/manage-grade-book',
        {
            data: jsonpath2.Comman_Setting_Grade_Settings_Grade_Book_Grade_Create_grade_book_create_form_exam_select,
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

    var res = await response.json();
})

test("Admin_587. @API Admin add  the  verify  the grade-book-create-form -exam-select  of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/manage-grade-book',
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

test("Admin_588. @API Admin add the  verify  the grade-book-create-form -exam-select  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/manage-grade-bookIGS',
        {
            data: jsonpath2.Comman_Setting_Grade_Settings_Grade_Book_Grade_Create_grade_book_create_form_exam_select,
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

test("Admin_589. @API Admin verify  the grade-book-create-form session-select  information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/manage-grade-book',
        {
            data: jsonpath2.Comman_Setting_Grade_Settings_Grade_Book_Grade_Create_grade_book_create_form_session_select,
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

    var res = await response.json();
})

test("Admin_590. @API Admin add  the  verify  the grade-book-create-form session-select of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/manage-grade-book',
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

test("Admin_591. @API Admin add the  verify  the grade-book-create-form session-select  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/manage-grade-bookIGS',
        {
            data: jsonpath2.Comman_Setting_Grade_Settings_Grade_Book_Grade_Create_grade_book_create_form_session_select,
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

test("Admin_595. @API Admin verify  the save-grade-book information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-grade-book',
        {
            data: jsonObject.Grade_Book.Comman_Setting_Grade_Settings_Grade_Book_Grade_Create_save_grade_book,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.message).toEqual("Grade Book saved successfully")

    //Schema validation
    const schema = jschemasonpath.Comman_Setting_Grade_Settings_Grade_Book_Grade_Create_save_grade_book;
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_596. @API Admin add  the  verify  the save-grade-book of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/save-grade-book',
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

test("Admin_597. @API Admin add the  verify  the save-grade-book  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-grade-bookIGS',
        {
            data: jsonObject.Grade_Book.Comman_Setting_Grade_Settings_Grade_Book_Grade_Create_save_grade_book,
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

test("Admin_598. @API Admin verify  the grade-book-list information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-book',
        {
            data: jsonpath2.grade_book_list,
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

    var res = await response.json();
})

test("Admin_599. @API Admin add  the  verify  the grade-book-list  of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-book',
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

test("Admin_600. @API Admin add the  verify  the grade-book-list  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-bookIGS',
        {
            data: jsonpath2.grade_book_list,
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

test("Admin_601. @API To verify the grade-book-filters  informations", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-book-filters',
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

    var res = await response.json();
})

test("Admin_602. @API To verify the grade-book-filters response when passing an invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-book-filtersIGS',
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

test("Admin_603. @API To verify grade-book-filters the response when passing empty access token.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-book-filters',
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

test("Admin_605. @API Admin verify  the grade-book-search information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-book',
        {
            data: jsonObject.Grade_Book.grade_book_search,
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

    var res = await response.json();
    Grade_Book_Id = res.gradebooks.data[0].id;
    console.log("Grade book id is", Grade_Book_Id)
})

test("Admin_606. @API Admin add  the  verify  the grade-book-search of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-book',
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

test("Admin_607. @API Admin add the  verify  the grade-book-search  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-bookIGS',
        {
            data: jsonObject.Grade_Book.grade_book_search,
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

test("Admin_575. @API Admin verify  the grade-book-edit-form  information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/manage-grade-book',
        {
            data: {
                "exams": [],
                "gradeBookId": Grade_Book_Id
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

    var res = await response.json();
})

test("Admin_576. @API Admin verify  the grade-book-edit-form  with empty gradebook ID", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/manage-grade-book',
        {
            data: {
                "exams": [],
                "gradeBookId": ""
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
    expect(response.status()).toBe(500);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("Admin_577. @API Admin verify  the grade-book-edit-form  if invalid ID", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/manage-grade-book',
        {
            data: {
                "exams": [],
                "gradeBookId": "8ab"
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
    expect(response.status()).toBe(500);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("Admin_578. @API Admin add  the  verify  the grade-book-edit-form of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/manage-grade-book',
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

test("Admin_579. @API Admin add the  verify  the grade-book-edit-form  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/manage-grade-bookIGS',
        {
            data: {
                "exams": [],
                "gradeBookId": Grade_Book_Id
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

test("Admin_580. @API Admin verify  the grade-book-update information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-grade-book',
        {
            data:
            {
                "gradeBookId": Grade_Book_Id,
                "gradeBookName": makeid(11),
                "exams": [
                    {
                        "id": 3,
                        "name": "Test Proctoring Exam 1"
                    }
                ],
                "gradeAggregation": [
                    {
                        "id": 1,
                        "name": "Average"
                    }
                ],
                "examDetails": [
                    {
                        "name": "Test Proctoring Exam 1",
                        "id": 2,
                        "sessions": [
                            {
                                "maximumMarks": {
                                    "title": "Maximum Marks",
                                    "value": 40
                                },
                                "weightage": {
                                    "title": "Weightage (%)",
                                    "value": 100
                                },
                                "session_id": 6,
                                "name": "Exam Main Session",
                                "sections": [
                                    {
                                        "id": 8,
                                        "name": "Exam Section",
                                        "maximumMarks": {
                                            "title": "Maximum Marks",
                                            "value": 40
                                        },
                                        "passPercentage": {
                                            "title": "Pass Percentage (%)",
                                            "value": 50
                                        },
                                        "grades": [
                                            {
                                                "scale": 4,
                                                "fromMark": 15,
                                                "toMark": 30,
                                                "id": ""
                                            },
                                            {
                                                "scale": 5,
                                                "fromMark": 0,
                                                "toMark": 14,
                                                "id": ""
                                            },
                                            {
                                                "scale": 6,
                                                "fromMark": 31,
                                                "toMark": 40,
                                                "id": ""
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "finalSettings": {
                    "combinations": [
                        {
                            "8": 4
                        },
                        {
                            "8": 5
                        },
                        {
                            "8": 6
                        }
                    ],
                    "finalResult": [
                        {
                            "Test Proctoring Exam 1 Exam Section": 4,
                            "Final Result": 4,
                            "combinationId": 126
                        },
                        {
                            "Test Proctoring Exam 1 Exam Section": 5,
                            "Final Result": 5,
                            "combinationId": 127
                        },
                        {
                            "Test Proctoring Exam 1 Exam Section": 6,
                            "Final Result": 6,
                            "combinationId": 128
                        }
                    ],
                    "finalGrades": [
                        {
                            "scale": 4,
                            "fromMark": "",
                            "toMark": ""
                        },
                        {
                            "scale": 5,
                            "fromMark": "",
                            "toMark": ""
                        },
                        {
                            "scale": 6,
                            "fromMark": "",
                            "toMark": ""
                        }
                    ]
                },
                "finalResultCategory": 1,
                "gradeScale": [
                    {
                        "id": 2,
                        "name": "Rating Scale"
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.message).toEqual("Grade Book saved successfully")

    //Schema validation
    const schema = jschemasonpath.Common_Setting_Authentication_Simple_Authentication;
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_581. @API Admin add  the  verify  the grade-book-update of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/save-grade-book',
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

test("Admin_582. @API Admin add the  verify  the grade-book-update  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-grade-bookIGS',
        {
            data: jsonObject.Grade_Book.Comman_Setting_Grade_Settings_Grade_Book_Grade_Create_save_grade_book,
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

test("Admin_608. @API Admin verify  the grade-book-filter-search  information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-book',
        {
            data: jsonpath2.grade_book_filter_search,
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
})

test("Admin_609. @API Admin add  the  verify  the grade-book-filter-search of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-book',
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

test("Admin_610. @API Admin add the  verify  the grade-book-filter-search  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-bookIGS',
        {
            data: jsonpath2.grade_book_filter_search,
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

test("Admin_611. @API Admin verify  the activate-grade-book  information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/activate-grade-book?gradeBookId=' + Grade_Book_Id,
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
    expect(response.headers()['content-type']).toBe('application/json');

    var res = await response.json();
    //Verify Response Payload
    expect(await res.message).toEqual("Grade Book activated successfully")

    //Schema validation
    const schema = jschemasonpath.Common_Setting_Authentication_Simple_Authentication;
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_612. @API Admin add  the  verify  the activate-grade-book  of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/activate-grade-book?gradeBookId=' + Grade_Book_Id,
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

test("Admin_613. @API Admin add the  verify  the activate-grade-book  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/activate-grade-bookIGS?gradeBookId=' + Grade_Book_Id,
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

test("Admin_614. @API Admin verify  the deactivate-grade-book  information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/deactivate-grade-book?gradeBookId=' + Grade_Book_Id,
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
    expect(response.headers()['content-type']).toBe('application/json');

    var res = await response.json();
    //Verify Response Payload
    expect(await res.message).toEqual("Grade Book deactivated successfully")

    //Schema validation
    const schema = jschemasonpath.Common_Setting_Authentication_Simple_Authentication;
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_615. @API Admin add  the  verify  the deactivate-grade-book  of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate-grade-book?gradeBookId=' + Grade_Book_Id,
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

test("Admin_616. @API Admin add the  verify  the deactivate-grade-book  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/deactivate-grade-bookIGS?gradeBookId=' + Grade_Book_Id,
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

test("Admin_617. @API Admin verify  the grade-book-field-column-hide  information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-book?page=2',
        {
            data: jsonpath2.grade_book_field_column_hide,
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
})

test("Admin_618. @API Admin add  the  verify  the grade-book-field-column-hide of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-book?page=2',
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

test("Admin_619. @API Admin add the  verify  the grade-book-field-column-hide  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-bookIGS?page=2',
        {
            data: jsonpath2.grade_book_field_column_hide,
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

test("Admin_620. @API Admin verify  the grade-book-pagination  information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-book?page=2',
        {
            data: jsonpath2.grade_book_pagination,
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
})

test("Admin_621. @API Admin add  the  verify  the grade-book-pagination of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-book?page=2',
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

test("Admin_622. @API Admin add the  verify  the grade-book-pagination  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-bookIGS?page=2',
        {
            data: jsonpath2.grade_book_pagination,
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

test("Admin_623. @API Admin verify  the grade-book-custom-filter-save public or private  information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-book-custom-filter',
        {
            data: jsonObject.Grade_Book.grade_book_custom_filter_save_public_orprivate,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Filter saved successfully!")

    //Schema validation
    const schema = jschemasonpath.grade_book_custom_filter_save_public_orprivate;
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_624. @API Admin add  the  verify  the grade-book-custom-filter-save public or private of incorrect HTTP method", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-book-custom-filter',
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

test("Admin_625. @API Admin add the  verify  the grade-book-custom-filter-save public or private  of invalid endpoint.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/grade-book-custom-filterIGS',
        {
            data: jsonObject.Grade_Book.grade_book_custom_filter_save_public_orprivate,
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

test("Admin_604. @API To verify the grade-book-filters response on passing invalid webreferer in the header field.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-book-filters',
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
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")
})

test("Admin_571. @API To verify the response of portal-sso-auth-form when passing invalid webreferer in the header field.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/portal-sso-authentication',
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
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")
})

test("Admin_565. @API Admin verify  the save-auth-methods information", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-auth-methods',
        {
            data: jsonpath2.Comman_Setting_Authentication_Azure_Open,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
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
    expect(await res.message).toEqual("Authentication activated successfully")

    //Schema validation
    const schema = jschemasonpath.Common_Setting_Authentication_Simple_Authentication;
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

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
})

test("Admin_564. @API To verify the response of azure-open-auth-form when passing invalid webreferer in the header field.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/azure-authentication',
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
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")
})

test("Admin_557. @API To verify the response of saml-auth-form on passing invalid webreferer in the header field.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/saml-authentication',
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
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")
})

test("Admin_550. @API To verify the response of multifactor-auth-form when passing invalid webreferer in the header field.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/multifactor-authentication',
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
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")
})

test("Admin_546. @API To verify the response on passing invalid webreferer in the header field for AuthMethods-list-simple aut.", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getAuthMethods',
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
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")
})

test("Admin_520. @API Admin add the user-save_empty username,email and phone", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user',
        {
            data: jsonObject.Admin_add_user_save.empty_username_email_password_body,
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
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("The username field is required.")
})

test("AL_001Zz. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_521. @API Admin add the user and save_empty first_name", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user',
        {
            data: jsonObject.Admin_add_user_save.empty_first_name_body,
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
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("The first name field is required.")
})

test("AL_001Zy. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_523. @API Admin_role-save_empty name", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/role',
        {
            data: jsonObject.Admin_Role.Admin_role_save_empty_name,
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
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("The name field is required.")
})

test("AL_001Zxa. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_524. @API Admin_roles-list-search_invalid name", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/roles',
        {
            data: jsonObject.Admin_Role.Admin_roles_list_search_with_invalid_name,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(400);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

})

test("AL_001Zx. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_313. @API Admin grade-scale-filters-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/grade-scale-filters',
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

test("AL_001Zw. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_298. @API Admin training_site-delete-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/training_site/' + training_site_id,
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

test("AL_001Zv. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_295. @API Admin activate_training_site-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/activate_training_site/' + training_site_id,
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

test("AL_001Zu. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_292. @API Admin deactivate_training_site-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_training_site/' + training_site_id,
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

test("AL_001Zt. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_287. @API Admin_training_sites-pagination", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_sites?page=2',
        {
            data: jsonpath2.Admin_training_sites_pagination,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
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

test("AL_001Zs. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_284. @API Admin_training_sites-field-cloumn-hide and show", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_sites',
        {
            data: jsonpath2.Admin_training_sites_field_cloumn_hide_and_show,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
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

test("AL_001Zr. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_278. @API Admin_training_sites-filter-search", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_sites',
        {
            data: jsonObject.Training_Site.Admin_training_sites_filter_search,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
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

test("AL_001Zq. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_275. @API Admin_training_sites-search", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_sites',
        {
            data: jsonObject.Training_Site.Admin_training_site_search,
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
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

test("AL_001Zp. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_271. @API Admin training_site-edit-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_site/' + training_site_id,
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

test("AL_001Zo. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_265. @API Admin training_site-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_site',
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

test("AL_001Zn. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_262. @API Admin training_centre-delete-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/training_centre/' + training_center__id,
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

test("AL_001Zm. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_259. @API Admin activate_training_centre-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_training_centre/' + training_center__id,
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

test("AL_001Zl. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_256. @API Admin deactivate_training_centre-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_training_centre/' + training_center__id,
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

test("AL_001Zk. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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
})

test("Admin_251. @API Admin_training_centres-pagination", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_centres?page=2',
        {
            data: jsonpath2.Admin_training_centres_pagination,
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

    var res = await response.json();
})

test("AL_001Zj. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_248. @API Admin_training_centres-field-column-show and hide", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_centres',
        {
            data: jsonpath2.Admin_training_centres_field_column_show_and_hide,
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

    var res = await response.json();
})

test("AL_001Zi. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_242. @API Admin_training_centres-filter-search", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_centres',
        {
            data: jsonObject.Training_Center.Admin_training_centres_filter_search,
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

    var res = await response.json();
})

test("AL_001Zh. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_239. @API Admin_training_centres-search", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/training_centres',
        {
            data: jsonObject.Training_Center.Admin_training_centres_search,
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

    var res = await response.json();
})

test("AL_001Zg. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_238. @API Admin training_centres-filters-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/training_centres',
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

test("AL_001Zf. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_229. @API Admin training_centre-edit-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_centre/1',
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

test("AL_001Ze. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_223. @API Admin training_centre-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/training_centre',
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

test("AL_001Zd. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_217. @API Admin chat-settings-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/chat-settings',
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

test("AL_001Zc. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_214. @API Admin delete-dashboard-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deletedashboard/' + dashboard_id,
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

test("AL_001Zb. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_211. @API Admin duplicate-dashboard-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatedashboard/' + dashboard_id,
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

test("AL_001Za. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_203. @API Admin dashboard-list-status-change-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/dashboard/status/1/1',
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

test("AL_001Z. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_189. @API Admin dashboard-filter-list-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/dashboardfilter',
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

test("AL_001Y. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_154. @API Admin email-template-edit-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/email-template/' + email_template_id + '/form',
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

test("AL_001X. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_166. @API Admin email-template-filter-list-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getemailtemplatefilter',
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

test("AL_001W. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_148. @API Admin email-template-create-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/email-template/form',
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

test("AL_001V. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_094. @API Admin security-control-privilage-list-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/securitycontrol/12',
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

test("AL_001U. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_130. @API Admin user-activities-filter-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/useractivities',
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

test("AL_001T. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_090. @API Admin delete-role-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deleterole/' + roleId,
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

test("AL_001S. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_087. @API Admin role-duplicate-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicateRole/' + roleId,
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

test("AL_001R. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_109. @API Admin role-filter-list-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getrolefilter',
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

test("AL_001Q. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_103. @API Admin role-create-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/role/form',
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

test("AL_001P. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_084. @API Admin rate-limit-login-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/rate-limit-login',
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

test("AL_001O. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_075. @API Admin logout-settings-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-logout-settings',
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

test("AL_001N. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_063. @API Admin user-role-edit-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/form',
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

test("AL_001M. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_057. @API Admin user-setting-edit-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/form',
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

test("AL_001L. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_051. @API Admin user-address-edit-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/form',
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

test("AL_001K. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_045. @API Admin user-edit-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/' + UserId + '/edit-form',
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

test("AL_001J. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_042. @API Admin user-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId,
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

test("AL_001I. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_039. @API Admin user-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user',
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

test("AL_001H. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_033. @API Admin User-role-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId,
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

test("AL_001G. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_027. @API Admin user-setting-form-Header field validation - invalid", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId,
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

test("AL_001F. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_022. @API Admin add theuser-address-save_empty state_id", async ({ request }) => {
    jsonpath2 = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-contact/' + UserId,
        {
            data: jsonpath2.Admin_add_user_address_save.empty_state_idbody,
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
    expect(response.headers()['content-type']).toBe('application/json')
})

test("AL_001E. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_016. @API user-role-Header field validation - invalid", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);
    expect(response.statusText()).toBe("Unauthorized");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
    var res = await response.json()
    console.log(res)
})

test("AL_001D. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_018. @API Admin add the user-save_empty username", async ({ request }) => {
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user',
        {
            data: jsonObject.Admin_add_user_save.empty_username_body,
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
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    UserId = res.Response.userId
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("The username field is required.")

})

test("AL_001C. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_012. @API user-setting-Header field validation - invalid", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);
    expect(response.statusText()).toBe("Unauthorized");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
    var res = await response.json()
    console.log(res)
})

test("AL_001A. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_008. @API user address location-Header field validation - invalid", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": jsonpath.Invalid_webreferer,
                "authorization": token
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);
    expect(response.statusText()).toBe("Unauthorized");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
    var res = await response.json()
    console.log(res)
})

test("AL_001B. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_004. @API Admin user information-Header field validation - invalid", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/' + UserId + '/formIGS',
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
    expect(response.statusText()).toBe("Unauthorized");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
    var res = await response.json()
    console.log(res)
})


