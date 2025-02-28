import fs from 'fs';
import path from 'path';
import { exam_ID1 } from 'tests/api/iAuthorSettings.test';
import { token } from 'tests/api/adminToken.test';
//import {BankId} from 'tests/api/iAuthorSettings.test'


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
 
let bankName = makeid(8);
let tagName = makeid(8);
let locationname = makeid(8);
let questionname = makeid(8);
let questionType =(Math.floor(Math.random() * 89 + 100));
let specilaityName = makeid(8);
let specilaityType =(Math.floor(Math.random() * 89 + 100));
let notificationname =makeid(8);
let venueName= makeid(8);
let iExamName = makeid(8);
let Dashboardname = makeid(8);
let notificationemail = (makeid(7) + Math.floor(Math.random() * 899 + 100) + '@yopmail.com')
let examName = makeid(8);
let questionlist =makeid(8);

let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate();
let day1 = dateObj.getUTCDate() + 1;
let year = dateObj.getUTCFullYear();
let hrs = dateObj.getHours()
let mins = dateObj.getMinutes()
let mins1 = dateObj.getMinutes() + 2;
let secs = dateObj.getSeconds()
var date = year + "-" + month + "-" + day;
var date1 = year + "-" + month + "-" + day1;
console.log(date, "and", date1);

var mainsectionstarttime = year + "-" + month + "-" + day + "T" + hrs + ":" + mins1 + ":" + secs;
var mainsectionendtime = year + "-" + month + "-" + day + "T20:32:46";
var mainsectionstartdate = year + "-" + month + "-" + day + "T11:32:46";
var mainsectionenddate = year + "-" + month + "-" + day1 + "T20:32:46";

let currentDate = new Date();
let StartBookingDate = currentDate.getDate().toString();
let EndExamDate = (currentDate.getDate() + 1).toString();
console.log(currentDate);

let hour = currentDate.getHours();
let period = '';

if (hour >= 12) {
    period = 'PM';
    if (hour > 12) {
        hour -= 12;
    }
} else {
    period = 'AM';
    if (hour === 0) {
        hour = 12;
    }
}

let currentDate1 = new Date();
let datecurrent = currentDate1.getDate();
console.log(datecurrent);
let pm = currentDate1.getHours() >= 12;
let hour12 = currentDate1.getHours() % 12;
if (!hour12)
    hour12 += 12;
let minute = currentDate1.getMinutes();
console.log(`${hour12}:${minute} ${pm ? 'pm' : 'am'}`);

let StartBookingMin = currentDate1.getMinutes() + 2;
let EndBookingMin = currentDate1.getMinutes() + 3;
let StartExamMin = currentDate1.getMinutes() + 2;
let EndExamMin = currentDate1.getMinutes() + 4;



export var jsonObject =
{
    "responseDuration": 30000,
    "createExam": {
        "exam_bank": [
            {
                "id": 1,
                "name": "Practice Bank"
            }
        ],
        "exam_name": "Automation Feasibility",
        "exam_description": "<p>Elumina Test Exam </p>",
        "practice_exam": true,
        "examId": "012499",
        "exam_start_date_time": [
            {
                "enableOption": 1,
                "examDate": date,
                "examHours": hour12.toString(),
                "examMinutes": StartExamMin
            }
        ],
        "exam_end_date_time": [
            {
                "enableOption": 1,
                "examDate": date1,
                "examHours": hour12.toString(),
                "examMinutes": EndExamMin
            }
        ],
        exam_invigilator_password: "ABCDE",
        "exam_venue": [
            {
                "id": 3,
                "name": "Elumina Chennai",
                "seats": 150,
                "max_seats": 0
            }
        ],
        "question_display_type": [
            {
                "id": 77,
                "name": "Standard"
            }
        ],
        "questions_per_page": [
            {
                "id": 8,
                "name": "1"
            }
        ],
        "image_View": "140",
        "shuffle_within_questions": [
            {
                "id": 13,
                "name": "No"
            }
        ],
        "select_exam_tools": [
            {
                "id": 79,
                "name": "Calculator"
            },
            {
                "id": 80,
                "name": "Notepad"
            },
            {
                "id": 81,
                "name": "Highlighter"
            }
        ],
        "browser_security": [
            {
                "id": 57,
                "name": "None",
                "examKey": null
            }
        ],
        "security_role": "[{\"id\":9,\"name\":\"Candidate\",\"network_security\":{\"id\":1,\"name\":\"Allow All\"},\"options\":{\"options_arr\":[{\"id\":1,\"name\":\"Allow All\",\"visibleStatus\":1},{\"id\":2,\"name\":\"Allow IP Address Range\",\"visibleStatus\":2},{\"id\":3,\"name\":\"Allow Specific IP Address\",\"visibleStatus\":3}],\"singleSelect\":true,\"title\":\"Candidate\",\"isForJsonSchema\":false,\"value\":1}}]"
    },
    
        /*Add question payload*/
        "addQuestions": {
            "data": [
                {
                    "id": "1",
                    "type": "exam",
                    "mode": "write_mode",
                    "display_name": "Automation Feasibility Test Exam",
                    "question_per_page": {
                        "id": 8,
                        "name": "1"
                    },
                    "items": [
                        {
                            "id": 7713,
                            "display_name": "Exam Main Session",
                            "type": "session",
                            "mode": "write_mode",
                            "items": [
                                {
                                    "id": null,
                                    "display_name": "Section A",
                                    "type": "section_exam",
                                    "items": [
                                        {
                                            "id": null,
                                            "display_name": "Page 1",
                                            "mode": "write_mode",
                                            "type": "page",
                                            "items": [
                                                {
                                                    "id": "432",
                                                    "title": "TEST MCQ Questions",
                                                    "text": "TEST MCQ Questions",
                                                    "type": "MCQ",
                                                    "description": "TEST MCQ Questions",
                                                    "station type": "",
                                                    "bank": "Practice Bank",
                                                    "created by": "IGS user",
                                                    "created by id": "28",
                                                    "last modified by": "IGS user",
                                                    "status": "Approved",
                                                    "tag": [],
                                                    "tags": "",
                                                    "tag dates": [],
                                                    "tag nested": [],
                                                    "tag date nested": [],
                                                    "created date": "18-10-2023",
                                                    "last date updated": "18-10-2023",
                                                    "last exam name": "",
                                                    "no of exams": "0",
                                                    "correct %": "0",
                                                    "used in exams": [],
                                                    "exam name": [],
                                                    "used in blueprints": [],
                                                    "updated datetime": "1697646848",
                                                    "exam date": [],
                                                    "total mark": "1",
                                                    "no of attempts": "0",
                                                    "discriminator": "",
                                                    "percentage": "",
                                                    "legacy item id": "",
                                                    "checked": true,
                                                    "questionType": "MCQ",
                                                    "page_name": "Page 1",
                                                    "error": false,
                                                    "items": [],
                                                    "mode": "write_mode"
                                                }
                                            ],
                                            "data": {},
                                            "isDrag": true,
                                            "path": "~/0/0/0/0"
                                        },
                                        {
                                            "id": null,
                                            "display_name": "Page 2",
                                            "mode": "write_mode",
                                            "type": "page",
                                            "items": [
                                                {
                                                    "id": "433",
                                                    "title": "SAQ Automation TEST Question",
                                                    "text": "SAQ TEST Question",
                                                    "type": "SAQ",
                                                    "description": "SAQ TEST Question",
                                                    "station type": "",
                                                    "bank": "Practice Bank",
                                                    "created by": "IGS user",
                                                    "created by id": "28",
                                                    "last modified by": "IGS user",
                                                    "status": "Approved",
                                                    "tag": [],
                                                    "tags": "",
                                                    "tag dates": [],
                                                    "tag nested": [],
                                                    "tag date nested": [],
                                                    "created date": "18-10-2023",
                                                    "last date updated": "18-10-2023",
                                                    "last exam name": "",
                                                    "no of exams": "0",
                                                    "correct %": "0",
                                                    "used in exams": [],
                                                    "exam name": [],
                                                    "used in blueprints": [],
                                                    "updated datetime": "1697648150",
                                                    "exam date": [],
                                                    "total mark": "5",
                                                    "no of attempts": "0",
                                                    "discriminator": "",
                                                    "percentage": "",
                                                    "legacy item id": "",
                                                    "checked": true,
                                                    "questionType": "SAQ",
                                                    "page_name": "Page 2",
                                                    "error": false,
                                                    "items": [],
                                                    "mode": "write_mode"
                                                }
                                            ],
                                            "data": {},
                                            "isDrag": true,
                                            "path": "~/0/0/0/1"
                                        },
                                        {
                                            "id": null,
                                            "display_name": "Page 3",
                                            "mode": "write_mode",
                                            "type": "page",
                                            "items": [
                                                {
                                                    "id": "445",
                                                    "title": "Automation VSAQ test",
                                                    "text": "question test",
                                                    "type": "VSAQ",
                                                    "description": "question aim2",
                                                    "station type": "",
                                                    "bank": "Practice Bank",
                                                    "created by": "IGS user",
                                                    "created by id": "28",
                                                    "last modified by": "IGS user",
                                                    "status": "Approved",
                                                    "tag": [],
                                                    "tags": "",
                                                    "tag dates": [],
                                                    "tag nested": [],
                                                    "tag date nested": [],
                                                    "created date": "18-10-2023",
                                                    "last date updated": "18-10-2023",
                                                    "last exam name": "",
                                                    "no of exams": "0",
                                                    "correct %": "0",
                                                    "used in exams": [],
                                                    "exam name": [],
                                                    "used in blueprints": [],
                                                    "updated datetime": "1697648173",
                                                    "exam date": [],
                                                    "total mark": "3",
                                                    "no of attempts": "0",
                                                    "discriminator": "",
                                                    "percentage": "",
                                                    "legacy item id": "",
                                                    "checked": true,
                                                    "questionType": "VSAQ",
                                                    "page_name": "Page 3",
                                                    "error": false,
                                                    "items": [],
                                                    "mode": "write_mode"
                                                }
                                            ],
                                            "data": {},
                                            "isDrag": true,
                                            "path": "~/0/0/0/2"
                                        }
                                    ],
                                    "mode": "write_mode",
                                    "path": "~/0/0/0",
                                    "data": {
                                        "section_identifier": "Section A",
                                        "section_name": "Section A",
                                        "section_type": "exam",
                                        "section_description": "<p>Section A</p>",
                                        "time_settings": "{\"duration\":[{\"id\":120,\"name\":120}],\"remainingTime\":11340}",
                                        "pass_section": "[{\"id\":\"no\",\"name\":\"No\"}]",
                                        "pass_percentage": ""
                                    },
                                    "sessionStart": currentDate,
                                    "sessionEnd": currentDate
                                }
                            ],
                            "meta": {
                                "key": "Start Date",
                                "value": "start_time"
                            },
                            "data": {
                                "session_name": "Exam Main Session",
                                "session_description": "Exam Main Session Description",
                                "session_duration": {
                                    "examHours": 192,
                                    "examMinutes": 0,
                                    "examSeconds": 0,
                                    "enableOption": 1
                                },
                                "exam_start_time": mainsectionstarttime,
                                "exam_end_time": mainsectionendtime,
                                "exam_start_date": mainsectionstartdate,
                                "exam_end_date": mainsectionenddate
                            },
                            "path": "~/0/0"
                        }
                    ],
                    "path": "~/0"
                }
            ]
        },
    
        /*Approve Exam payload*/
        "approveexam": {
            "workflow": {
                "id": "2",
                "name": "No Workflow"
            },
            "exam_id": exam_ID1,
            "transition": "Approve",
            "Authorization": "{\"Practice Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Preview (PDF)\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Unlock\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Reports\":[{\"View\":\"TRUE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"FALSE\"}],\"Registration\":[{\"Live Monitor\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Download Exam\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"}]},\"Elumina - Test Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Preview (PDF)\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Unlock\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Reports\":[{\"View\":\"TRUE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"FALSE\"}],\"Registration\":[{\"Live Monitor\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Download Exam\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"}]},\"banks\":{\"1\":[\"Exam Administrator\"],\"3\":[\"Exam Administrator\"]},\"user\":\"28\"}"
        },

    "Admin_Bank_Create_Form": {
        "body": 
            {
                "name": bankName,
                "description": "<p>bank</p>",
                "workflow": "No Workflow",
                "tags": "[{\"id\":9,\"name\":\"LIV Test\"}]",
                "question_types": "[{\"id\":1,\"name\":\"MCQ\",\"slug\":\"typea\",\"distractor_count\":\"2\",\"mark\":\"1\",\"readonly\":\"\",\"max_limit\":10}]"
            }
        // "empty_username_body": {
        //     "first_name": "admin",
        //     "last_name": "api",
        //     "username": "",
        //     "email": (makeid(7) + Math.floor(Math.random() * 899 + 100) + '@yopmail.com'),
        //     "phone": ('6' + Math.floor(Math.random() * 899999999 + 100)),
        //     "mobile": "",
        //     "dob": "",
        //     "startdate": "",
        //     "enddate": "",
        //     "generate_pwd": "j3r%wStFBP"
        // }
    },
    "Admin_Bank_Search_form": {
        "body":
        {
            
                "freeText": [
                    bankName
                ]
            
        }
    },
    "Bank_Pagination":{
      "body":{
        "freeText":
      ["Test"],
      "pagination":5
    }
    },
    "Banks_Filter_search":{
        "body":{
                "filterArray": [
                    {
                        "filterId": "Bank",
                        "operator": "like",
                        "displayText": "Bank <span>is like</span> ",
                        "filterValue1": "Qa",
                        "filterValue2": "",
                        "operation": ""
                    }
                ],
                "freeText": []
            
        }
    },
    "Bank_custom_filter":{
        "body":{
            "filterArray": {
                "filterName": bankName,
                "filterType": "public",
                "filterPage": "view-banks",
                "filter_id": ""
            },
            "customFilter": [
                {
                    "filterId": "Bank",
                    "operator": "like",
                    "displayText": "Bank <span>is like</span> ",
                    "filterValue1": "Qa",
                    "filterValue2": "",
                    "operation": ""
                }
            ]
        }
    },
    "Bank_show_column":{
          "body":{
            "freeText": [],
            "showColumns": [
                "BANK",
                "mappings"
            ]
        }
    },
    "Admin_Bank_Edit_form" :
    {
        "body":
        {
            "name": makeid(8),
            "description": "<p>bank</p>",
            "workflow": "No Workflow",
            "tags": "[{\"id\":9,\"name\":\"LIV Test\"}]",
            "question_types": "[{\"id\":1,\"name\":\"MCQ\",\"mark\":\"1\",\"distractor_count\":\"2\",\"max_limit\":10,\"readonly\":\"\",\"tags\":[]}]"
        }
            
        
    },
    "Admin_Tag_Create_Form": {
        "body": 
        {
        "tag": tagName,
        "control":{"control_id":"1",
        "control_value":"Text",
        "tag_value":[{"id":"",
        "value":"testapii"}],
        "removedTags":[]
    }
}
},
"Tag_Search_Form":{
    "body":{
        "freeText": [
            tagName
        ]
    }
},
"Tag_Edit_Form":{
    "body":{"tag":makeid(8),
    //"testapi (1) du update",
            "control":{"control_id":1,
            "control_value":"Text",
            "tag_value":[{"id":187,
            "value":"testapii update"}],
            "removedTags":[]}}
},
"Tag_Filter_Search":{
    "body":{"filterArray":[{"filterId":"Tag","operator":"like","displayText":"Tag <span>is like</span> ","filterValue1":"tree","filterValue2":"","operation":""}],"freeText":[]}
},
"Tag_Custom_filter":{
    "body":{
        "filterArray": {
            "filterName": "tagtree",
            "filterType": "public",
            "filterPage": "view-tags",
            "filter_id": ""
        },
        "customFilter": [
            {
                "filterId": "Tag",
                "operator": "like",
                "displayText": "Tag <span>is like</span> ",
                "filterValue1": "tree",
                "filterValue2": "",
                "operation": ""
            }
        ]
    }
},
"Tag_Pagination":{
    "body":{"freeText":[],
    "pagination":10}
},
"Tag_Show_Column":{
    "body":{
        "freeText": [],
        "showColumns": [
            "TAG",
            "mappings"
        ]
    }
},
"Location_Save_Form":{
    "body":{
        "name": locationname,
        "short_name": "loc",
        "time_zone": 69,
        "day_light_savings": true,
        "status": "1"
    }
},
"Location_Search_Form":{
    "body": {"freeText":[locationname]}
},
"Location_Edit_Form":{
    "body":{
        "name": locationname,
        //"test location2 update",
        "short_name": "loc",
        "time_zone": 69,
        "day_light_savings": true,
        "status": "1"
    }
},
"Location_Filter_Search":{
    "body":{
        "filterArray": [
            {
                "filterId": "Name",
                "operator": "like",
                "displayText": "Name <span>is like</span> ",
                "filterValue1": "chennai",
                "filterValue2": "",
                "operation": ""
            }
        ],
        "freeText": [
            ""
        ]
    }
},
"Location_Filters_Search":{
    "body":{"filterArray":{"filterName":"chennai",
    "filterType":"public",
    "filterPage":"locations",
    "filter_id":""},
    "customFilter":[{"filterId":"Name",
    "operator":"like",
    "displayText":"Name <span>is like</span> ",
    "filterValue1":"chennai",
    "filterValue2":"",
    "operation":""}]}
},
"Location_Show_Column":{
    "body":{"freeText":[""],
    "showColumns":["NAME",
    "mappings"]}
},
"Save_Checkout":{
    "body":{
        "checkout_time": "1"
    }
},
"Save_Proctoring":{
    "body":{"video_recording":true,"audio_recording":true,"screenshot_enable":true,"video_fragment_size":[{"id":"5","name":"5 seconds"}],"face_recognition_match":[{"id":"70","name":"70%"}],"screenshot_capture_interval":[{"id":"30","name":"30 seconds"}],"enforce_hardware_check":false,"camera_link":"https://support.assessapp.com.au/portal/en/kb/articles/troubleshoot-webcam-28-7-2020","microphone_link":"https://support.assessapp.com.au/portal/en/kb/articles/troubleshoot-webcam-28-7-2020","browsercheck_link":"https://success.eluminaelearning.com.au/portal/en/kb/articles/troubleshoot-browser","termsandcondition":"<p>All the best!!!All the best!!!All the best!!!</p>","iproctor_extension":true,"internet_connection_check":true,"internet_upload_speed":[{"id":"2","name":"1mbps"}],"internet_download_speed":[{"id":"2","name":"1mbps"}],"prompt_candidate":"Your assessment is now being proctored - you can return to the exam","extension_version_message":"Please ensure that you are using the current version of the extension ($version)"}
},


"Admin_question_type_Create_Form":{
    "body":{
        "question_types": [
            {
                "id": 12,
                "name": "Type B"
            }
        ],
        "banks": [
            {
                "id": questionType,
                "name": bankName
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
    }
},

"Question_type_Search_Form":{
    "body":{
        "freeText": [
            "Practice bank"
        ]
    }
},

"Question_Type_Edit_Form":{
    "body":{
        "question_types": [
            {
                "id": 12,
                "name": "Type B"
            }
        ],
        "banks": [
            {
                "id": questionType,
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
    }
},
"Admin_question_type_filter_Search":{
    "body":{
        "filterArray": [
            {
                "filterId": "Bank",
                "operator": "eq",
                "displayText": "Bank <span>is equal to</span> ",
                "filterValue1": "Practice Bank",
                "filterValue2": "Select one",
                "operation": ""
            }
        ],
        "freeText": [
            ""
        ]
    }
},
"Admin_question_type_custom_filter":{
    "body":{
        "filterArray": {
            "filterName": bankName,
            "filterType": "public",
            "filterPage": "view-question-types",
            "filter_id": ""
        },
        "customFilter": [
            {
                "filterId": "Bank",
                "operator": "eq",
                "displayText": "Bank <span>is equal to</span> ",
                "filterValue1": "Practice Bank",
                "filterValue2": "Select one",
                "operation": ""
            }
        ]
    }
},
"Admin_Question_type_column_Show":{
    "body":{
        "freeText": [
            ""
        ],
        "showColumns": [
            "LAST MODIFIED DATE",
            "mappings"
        ]
    }
},
"Admin_Question_type_duplicate":{
    "body":{
        "question_types": [
            {
                "id": 24,
                "name": "Type B"
            }
        ],
        "banks": [
            {
                "id": 56,
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
    }
},

"Admin_Create_Specilaity" :{
    "body" :{
        
            "name": specilaityName,
            "description": "<p>desc</p>",
        
    }
},

"Admin_Specilaity_Search_form" :{
    "body" :{
        
            "freeText": [
                specilaityName,
            ]
        
    }
},
"Admin_Specilaity_Edit_form" :{
    "body": {
        "name": specilaityName,
        "description": "<p>desc</p>"
    }
},
"Admin_specialty_filter_search":{
    "body":{
        "filterArray": [
            {
                "filterId": "Specialty",
                "operator": "like",
                "displayText": "Specialty <span>is like</span> ",
                "filterValue1": "Elumina",
                "filterValue2": "",
                "operation": ""
            }
        ],
        "freeText": []
    }
},
"Admin_specialty_custom_filter":{
    "body":{
        "filterArray": {
            "filterName": specilaityName,
            "filterType": "public",
            "filterPage": "view-speciality",
            "filter_id": ""
        },
        "customFilter": [
            {
                "filterId": "Specialty",
                "operator": "like",
                "displayText": "Specialty <span>is like</span> ",
                "filterValue1": "Elumina",
                "filterValue2": "",
                "operation": ""
            }
        ]
    }
},
"Admin_specialty_field_cloumn_hide_show":{
    "body":{
        "freeText": [],
        "showColumns": [
            "mappings"
        ]
    }
},
"Admin_specialty_pagination":{
    "body":{
        "pagination": 10
    }
},
"Admin_Create_notificationemail":{
    "body":{
        "first_name": notificationname,
        "last_name":   notificationname,
        "email": notificationemail,
        "purpose": "[{\"id\":2,\"name\":\"iRegistration\"}]",
        "status": true
    }
},
"Admin_notification_emails_Search_form":{
    "body":{
        "freeText": [
            notificationname
        ]
    }
},
"Admin_notification_email_update":{
    "body":{
        "first_name":notificationname ,
        "last_name": notificationname,
        "email": notificationemail,
        "purpose": "[{\"id\":2,\"name\":\"iRegistration\"}]",
        "status": true
    }
},
"Admin_notification_emails_filter_search":{
    "body":{
        "filterArray": [
            {
                "filterId": "First Name",
                "operator": "like",
                "displayText": "First Name <span>is like</span> ",
                "filterValue1": "QA",
                "filterValue2": "",
                "operation": ""
            }
        ],
        "freeText": [
            notificationname
        ]
    }
},
"Admin_notification_custom_filter":{
    "body":{
        "filterArray": {
            "filterName": notificationname,
            "filterType": "public",
            "filterPage": "/notification_emails",
            "filter_id": ""
        },
        "customFilter": [
            {
                "filterId": "Last Name",
                "operator": "like",
                "displayText": "Last Name <span>is like</span> ",
                "filterValue1": "QA",
                "filterValue2": "",
                "operation": ""
            }
        ]
    }
},
"Admin_notification_field_cloumn_hide_show":{
    "body":{
        "freeText": [
            ""
        ],
        "showColumns": [
            "PURPOSE",
            "mappings"
        ]
    }
},
"Xlsx_file_download":{
    "body":{
        "exam": [],
        "version": []
      }
},
"csv_file_download":{
    "body":{
        "exam": [],
        "version": []
      }
},
"exam_statistics_form":{
    "body":[{"id":1,
    "name":"Test Exam 1"}]
},
"xlsx_file_download":{
    "body":{
        "banks": [],
        "module_type": []
      }
},
"Question_csv_file_download":{
    "body":{
        "banks": [],
        "module_type": []
    }
},
"import_module_type":{
    "body": false
},
"exam_export_download":{
    "body":{
        "exam": [
            {
                "id": 490,
                "name": "import"
            }
        ],
        "file_format": [
            {
                "id": "zip",
                "name": "ZIP"
            }
        ]
    }
},
"export_questions_download":{
    "body":{
        "banks": [
            {
                "id": 1,
                "name": "Practice Bank"
            }
        ],
        "questiontype": "[{\"id\":5,\"name\":\"VSAQ\"}]",
        "fromdate": "NODATE",
        "todate": "NODATE",
        "status": "[]",
        "created_by": "[]",
        "modified_by": "[]",
        "file_format": [
            {
                "id": "xls",
                "name": "XLS"
            }
        ]
    }
},
"exam_import_statistics":{
    "body":{
        "exams":([{"id":1,"name":"Test Exam 1"}]),
         "version": ([{"id":2,"name":"2"}])
    }
},
"Admin_Venue_Create" :{
    "body":{
        "name": venueName,
        "city_suburb": 2,
        "country": 0,
        "amenities": [],
        "image_thumbnail": [],
        "status": 1
    }
},
"Admin_Venue_Search_form":{
    "body":{
        "freeText":[
        venueName
    ]
}
},
"Venue_Edit_Form":{
    "body":{
        "name": venueName,
        "short_name": "Test loca",
        "description": "<p>test description</p>",
        "address_1": "add1",
        "address_2": "add2",
        "city_suburb": 2,
        "country": 2,
        "amenities": [
            {
                "id": 1,
                "name": "Private rooms (for religious reasons, learning difficulties, breastfeeding, etc.)"
            }
        ],
        "image_thumbnail": [],
        "status": 1
    }
},
"Venue_Filter_Search":{
    "body":{"filterArray":[{"filterId":"Name","operator":"like","displayText":"Name <span><strong>is like</strong></span> ","filterValue1":"Chennai","filterValue2":"","operation":""}],"freeText":[]}
},
"Venue_Custom_Filters_public":{
    "body":{"filterArray":{"filterName":venueName,"filterType":"public","filterPage":"view-venue","filter_id":""},"customFilter":[{"filterId":"Name","operator":"like","displayText":"Name <span><strong>is like</strong></span> ","filterValue1":"Chennai","filterValue2":"","operation":""}]}
},
"Venue_Pagination":{
    "body":{"freeText":[],"pagination":10}
},
"Venue_Show_Column":{
    "body":{
        "freeText": [],
        "showColumns": [
            "NAME",
            "mappings"
        ]
    }
},
"Admin_iExam_Create":{
    "body":{
        "exam_bank": [
            {
                "id": 1,
                "name": iExamName
            }
        ],
        "exam_name": "api exam",
        "exam_description": "<p>asfwe</p>",
        "exam_start_date_time": [
            {
                "enableOption": 1,
                "examDate": "2023-11-18",
                "examHours": "12",
                "examMinutes": "04"
            }
        ],
        "exam_end_date_time": [
            {
                "enableOption": 1,
                "examDate": "2023-12-17",
                "examHours": "12",
                "examMinutes": "04"
            }
        ],
        "exam_venue": [
            {
                "id": 3,
                "name": "Chennai, India",
                "seats": "100",
                "max_seats": "100"
            }
        ],
        "exam_booking_start_date_time": "2023-11-17T14:04:00",
        "exam_booking_end_date_time": "2023-11-17T17:04:00",
        "question_display_type": [
            {
                "id": 102,
                "name": "Standard"
            }
        ],
        "questions_per_page": [
            {
                "id": 91,
                "name": "1"
            }
        ],
        "image_View": "142",
        "shuffle_within_questions": [
            {
                "id": 104,
                "name": "No"
            }
        ],
        "select_exam_tools": [],
        "browser_security": [
            {
                "id": 138,
                "name": "None",
                "examKey": null
            }
        ],
        "security_role": "[{\"id\":9,\"name\":\"Candidate\",\"network_security\":{\"id\":1,\"name\":\"Allow All\"},\"options\":{\"options_arr\":[{\"id\":1,\"name\":\"Allow All\",\"visibleStatus\":1},{\"id\":2,\"name\":\"Allow IP Address Range\",\"visibleStatus\":2},{\"id\":3,\"name\":\"Allow Specific IP Address\",\"visibleStatus\":3}],\"singleSelect\":true,\"title\":\"Candidate\",\"isForJsonSchema\":false,\"value\":1}}]"
    }
},
"Admin_iExam_Search_form":{
    "body":{
        "freeText": [
            iExamName
        ]
    }
},
"Admin_template_exam_Create":{
    "body":{
        "mode":"write_mode"
    }
},
"Admin_template_exam_section":{
    "body":{
        "mode": "write_mode"
    }
},
"Admin_template_exam_survey":{
    "body":{
        "mode": "write_mode"
    }
},
"Admin_template_exam_save":{
    "body":{
        "data": [
            {
                "id": "2",
                "type": "exam",
                "mode": "write_mode",
                "display_name": "api exam",
                "question_per_page": {
                    "id": 91,
                    "name": "1"
                },
                "items": [
                    {
                        "id": 1575,
                        "display_name": "Exam Main Session",
                        "type": "session",
                        "mode": "write_mode",
                        "items": [
                            {
                                "id": null,
                                "display_name": "zfg",
                                "type": "section_content",
                                "items": [
                                    {
                                        "id": null,
                                        "display_name": "Page 1",
                                        "type": "page",
                                        "items": [
                                            {
                                                "id": null,
                                                "display_name": "sdf",
                                                "type": "content",
                                                "items": [],
                                                "data": {
                                                    "content_title": "sdf",
                                                    "content": "<p>zxfew</p>",
                                                    "attachment_1": "[{\"filename\":\"65570c58aef63.jpeg\",\"destination_path\":\"saas-qa.assessappglobal.com.au/content_section/files\",\"extension\":\"jpeg\",\"type\":\"Image\",\"size\":\"15.09 KB\",\"path\":\"saas-qa.assessappglobal.com.au/content_section/files/65570c58aef63.jpeg\"}]",
                                                    "attachment_2": "[]",
                                                    "content_layout": "[{\"id\":2,\"name\":\"Terms & Conditions\"}]"
                                                },
                                                "path": "~/0/0/0/0/0",
                                                "mode": "write_mode"
                                            }
                                        ],
                                        "data": {
                                            "examId": "2",
                                            "flag": "create"
                                        },
                                        "path": "~/0/0/0/0",
                                        "mode": "write_mode"
                                    }
                                ],
                                "mode": "write_mode",
                                "path": "~/0/0/0",
                                "data": {
                                    "section_name": "zfg",
                                    "section_type": "content",
                                    "section_description": "<p>zfg</p>",
                                    "time_settings": "{\"duration\":[{\"id\":1,\"name\":1}],\"remainingTime\":41759}"
                                },
                                "sessionStart": "2023-11-18 12:04:00",
                                "sessionEnd": "2023-12-17 12:04:00"
                            },
                            {
                                "id": null,
                                "display_name": "zxs",
                                "type": "section_exam",
                                "items": [
                                    {
                                        "id": null,
                                        "display_name": "Page 1",
                                        "type": "page",
                                        "items": [
                                            {
                                                "id": "347",
                                                "title": "VSAQ 171023",
                                                "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.VSAQ",
                                                "type": "question",
                                                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.VSAQ",
                                                "station type": "",
                                                "bank": "Practice Bank",
                                                "created by": "Ashraf Begam",
                                                "created by id": "84",
                                                "last modified by": "SaasQA ApproverTest",
                                                "status": "Approved",
                                                "tag": [],
                                                "tags": "",
                                                "tag dates": [],
                                                "tag nested": [],
                                                "tag date nested": [],
                                                "created date": "17-10-2023",
                                                "last date updated": "17-10-2023",
                                                "last exam name": "demo972342",
                                                "no of exams": "9",
                                                "correct %": "0",
                                                "used in exams": [
                                                    "demo107919",
                                                    "exam06112023",
                                                    "exam06112023- updated",
                                                    "exam07112023",
                                                    "time validation test",
                                                    "time validation test",
                                                    "time validation test",
                                                    "exam06112023",
                                                    "demo972342"
                                                ],
                                                "exam name": [
                                                    "demo107919",
                                                    "exam06112023",
                                                    "exam06112023- updated",
                                                    "exam07112023",
                                                    "time validation test",
                                                    "time validation test",
                                                    "time validation test",
                                                    "exam06112023",
                                                    "demo972342"
                                                ],
                                                "used in blueprints": [
                                                    "Blueprint 171023"
                                                ],
                                                "updated datetime": "1697578537",
                                                "exam date": [
                                                    "09-11-2023",
                                                    "06-11-2023",
                                                    "07-11-2023",
                                                    "08-11-2023",
                                                    "08-11-2023",
                                                    "09-11-2023",
                                                    "09-11-2023",
                                                    "09-11-2023",
                                                    "06-11-2023",
                                                    "11-11-2023"
                                                ],
                                                "total mark": "5",
                                                "no of attempts": "0",
                                                "discriminator": "",
                                                "percentage": "",
                                                "legacy item id": "",
                                                "checked": true,
                                                "questionType": "VSAQ",
                                                "page_name": "Page 1",
                                                "error": false,
                                                "items": [],
                                                "mode": "write_mode"
                                            }
                                        ],
                                        "data": {},
                                        "path": "~/0/0/1/0",
                                        "mode": "write_mode"
                                    },
                                    {
                                        "id": null,
                                        "display_name": "Page 2",
                                        "type": "page",
                                        "items": [
                                            {
                                                "id": "351",
                                                "title": "Type X ",
                                                "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Type x",
                                                "type": "question",
                                                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Type X",
                                                "station type": "",
                                                "bank": "Practice Bank",
                                                "created by": "Ashraf Begam",
                                                "created by id": "84",
                                                "last modified by": "SaasQA ApproverTest",
                                                "status": "Approved",
                                                "tag": [],
                                                "tags": "",
                                                "tag dates": [],
                                                "tag nested": [],
                                                "tag date nested": [],
                                                "created date": "17-10-2023",
                                                "last date updated": "17-10-2023",
                                                "last exam name": "import",
                                                "no of exams": "9",
                                                "correct %": "0",
                                                "used in exams": [
                                                    "demo107919",
                                                    "exam06112023",
                                                    "exam06112023- updated",
                                                    "exam07112023",
                                                    "time validation test",
                                                    "time validation test",
                                                    "time validation test",
                                                    "exam06112023",
                                                    "import"
                                                ],
                                                "exam name": [
                                                    "demo107919",
                                                    "exam06112023",
                                                    "exam06112023- updated",
                                                    "exam07112023",
                                                    "time validation test",
                                                    "time validation test",
                                                    "time validation test",
                                                    "exam06112023",
                                                    "import"
                                                ],
                                                "used in blueprints": [
                                                    "Blueprint 171023"
                                                ],
                                                "updated datetime": "1697578507",
                                                "exam date": [
                                                    "09-11-2023",
                                                    "06-11-2023",
                                                    "07-11-2023",
                                                    "08-11-2023",
                                                    "08-11-2023",
                                                    "09-11-2023",
                                                    "09-11-2023",
                                                    "09-11-2023",
                                                    "06-11-2023",
                                                    "18-11-2023"
                                                ],
                                                "total mark": "5",
                                                "no of attempts": "0",
                                                "discriminator": "",
                                                "percentage": "",
                                                "legacy item id": "",
                                                "checked": true,
                                                "questionType": "Type X",
                                                "page_name": "Page 2",
                                                "error": false,
                                                "items": [],
                                                "mode": "write_mode"
                                            }
                                        ],
                                        "data": {},
                                        "path": "~/0/0/1/1",
                                        "mode": "write_mode"
                                    }
                                ],
                                "mode": "write_mode",
                                "path": "~/0/0/1",
                                "data": {
                                    "section_identifier": "zxcvd",
                                    "section_name": "zxs",
                                    "section_type": "exam",
                                    "section_description": "<p>zcer</p>",
                                    "time_settings": "{\"duration\":[{\"id\":60,\"name\":60}],\"remainingTime\":41699}",
                                    "pass_section": "[{\"id\":\"no\",\"name\":\"No\"}]",
                                    "pass_percentage": ""
                                },
                                "sessionStart": "2023-11-18 12:04:00",
                                "sessionEnd": "2023-12-17 12:04:00"
                            },
                            {
                                "id": null,
                                "display_name": "xcer",
                                "type": "section_survey",
                                "items": [
                                    {
                                        "id": null,
                                        "display_name": "Page 1",
                                        "mode": "write_mode",
                                        "type": "page",
                                        "items": [
                                            {
                                                "id": "353",
                                                "title": "SAQ",
                                                "text": "when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                "type": "question",
                                                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                                                "station type": "",
                                                "bank": "Practice Bank",
                                                "created by": "Ashraf Begam",
                                                "created by id": "84",
                                                "last modified by": "SaasQA ApproverTest",
                                                "status": "Approved",
                                                "tag": [],
                                                "tags": "",
                                                "tag dates": [],
                                                "tag nested": [],
                                                "tag date nested": [],
                                                "created date": "17-10-2023",
                                                "last date updated": "17-10-2023",
                                                "last exam name": "exam06112023",
                                                "no of exams": "8",
                                                "correct %": "0",
                                                "used in exams": [
                                                    "demo107919",
                                                    "exam06112023",
                                                    "exam06112023- updated",
                                                    "exam07112023",
                                                    "time validation test",
                                                    "time validation test",
                                                    "time validation test",
                                                    "exam06112023"
                                                ],
                                                "exam name": [
                                                    "exam06112023",
                                                    "exam06112023- updated",
                                                    "exam07112023",
                                                    "time validation test",
                                                    "time validation test",
                                                    "time validation test",
                                                    "exam06112023"
                                                ],
                                                "used in blueprints": [
                                                    "Blueprint 171023"
                                                ],
                                                "updated datetime": "1697578490",
                                                "exam date": [
                                                    "06-11-2023",
                                                    "07-11-2023",
                                                    "08-11-2023",
                                                    "08-11-2023",
                                                    "09-11-2023",
                                                    "09-11-2023",
                                                    "09-11-2023",
                                                    "06-11-2023"
                                                ],
                                                "total mark": "0",
                                                "no of attempts": "0",
                                                "discriminator": "",
                                                "percentage": "",
                                                "legacy item id": "",
                                                "checked": true,
                                                "questionType": "SAQ / Essay",
                                                "page_name": "Page 1",
                                                "error": false,
                                                "items": [],
                                                "mode": "write_mode"
                                            }
                                        ],
                                        "data": {},
                                        "path": "~/0/0/2/0"
                                    },
                                    {
                                        "id": null,
                                        "display_name": "Page 2",
                                        "mode": "write_mode",
                                        "type": "page",
                                        "items": [
                                            {
                                                "id": "354",
                                                "title": "SJT",
                                                "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.?",
                                                "type": "question",
                                                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.?",
                                                "station type": "",
                                                "bank": "Practice Bank",
                                                "created by": "Ashraf Begam",
                                                "created by id": "84",
                                                "last modified by": "Ashraf Begam",
                                                "status": "Approved",
                                                "tag": [
                                                    "test value"
                                                ],
                                                "tags": "test value",
                                                "tag dates": [],
                                                "tag nested": [
                                                    {
                                                        "tag": "test____value",
                                                        "tag_type_id": 1
                                                    }
                                                ],
                                                "tag date nested": [],
                                                "created date": "17-10-2023",
                                                "last date updated": "17-10-2023",
                                                "last exam name": "exam06112023",
                                                "no of exams": "5",
                                                "correct %": "0",
                                                "used in exams": [
                                                    "demo107919",
                                                    "exam06112023",
                                                    "exam06112023- updated",
                                                    "exam07112023",
                                                    "exam06112023"
                                                ],
                                                "exam name": [
                                                    "exam06112023",
                                                    "exam06112023- updated",
                                                    "exam07112023",
                                                    "exam06112023"
                                                ],
                                                "used in blueprints": [
                                                    "Blueprint 171023"
                                                ],
                                                "updated datetime": "1697576707",
                                                "exam date": [
                                                    "06-11-2023",
                                                    "07-11-2023",
                                                    "08-11-2023",
                                                    "08-11-2023",
                                                    "06-11-2023"
                                                ],
                                                "total mark": "10",
                                                "no of attempts": "0",
                                                "discriminator": "",
                                                "percentage": "",
                                                "legacy item id": "",
                                                "checked": true,
                                                "questionType": "SJT",
                                                "page_name": "Page 2",
                                                "error": false,
                                                "items": [],
                                                "mode": "write_mode"
                                            }
                                        ],
                                        "data": {},
                                        "path": "~/0/0/2/1"
                                    }
                                ],
                                "path": "~/0/0/2",
                                "mode": "write_mode",
                                "data": {
                                    "section_name": "xcer",
                                    "section_type": "survey",
                                    "section_description": "<p>xcger</p>",
                                    "time_settings": "{\"duration\":[{\"id\":60,\"name\":60}],\"remainingTime\":41639}"
                                },
                                "sessionStart": "2023-11-18 12:04:00",
                                "sessionEnd": "2023-12-17 12:04:00"
                            }
                        ],
                        "meta": {
                            "key": "Start Date",
                            "value": "start_time"
                        },
                        "data": {
                            "session_name": "Exam Main Session",
                            "session_description": "Exam Main Session Description",
                            "session_duration": {
                                "examHours": 696,
                                "examMinutes": 0,
                                "examSeconds": 0,
                                "enableOption": 1
                            },
                            "exam_start_time": "2023-11-18 12:04:00",
                            "exam_end_time": "2023-12-17 12:04:00",
                            "exam_start_date": "2023-11-18T12:04",
                            "exam_end_date": "2023-12-17T12:04"
                        },
                        "path": "~/0/0"
                    }
                ],
                "path": "~/0"
            }
        ]
    }
},
"Admin_iExam_filter_Search_form":{
    "body":{
        "freeText": [
            ""
        ],
        "filterArray": [
            {
                "filterId": "Exam Name",
                "operator": "like",
                "displayText": "Exam Name <span>is like</span> ",
                "filterValue1": "Elumina",
                "filterValue2": "",
                "operation": ""
            }
        ]
    }
},
"Admin_iExam_custom_filter_save":{
    "body":{
        "filterArray": {
            "filterName": iExamName,
            "filterType": "public",
            "filterPage": "showtemplateexams",
            "filter_id": ""
        },
        "customFilter": [
            {
                "filterId": "Exam Name",
                "operator": "like",
                "displayText": "Exam Name <span>is like</span> ",
                "filterValue1": "Elumina",
                "filterValue2": "",
                "operation": ""
            }
        ]
    }
},
"Admin_iExam_column_hide_show":{
    "body":{
        "freeText": [
            ""
        ],
        "showColumns": [
            "LAST DATE UPDATED",
            "mappings"
        ]
    }
},
"save_offline_exam":{
    "body":{
        "hot_keys": "Q",
        "recovery_password": "123456",
        "restore_password": "123456",
        "expiry_duration": "11"
    }
},
"livemonitor_settings":{
    "body":{
        "live_monitor_refresh": [
            {
                "id": "20",
                "name": "20"
            }
        ]
    }
},
"Offline_Action":{
    "body":{
        "hot_keys": "R",
        "offline_action_password": "123456"
    }
},
"save_Iregistration_List":{
    "body":{
        "contact_mail": "eluminaadmin@assessappglobal.com.au",
        "email_booking_content": "<p>Your selected venue for the upcoming examination is confirmed.</p>",
        "booking_instructions_content": "<p>Please review your selected venue details below and click Book Now to proceed with your booking. You must accept the Terms and Conditions before you can proceed with your confirmation.</p>",
        "booking_details_content": "\n        Thank you for booking your examination. You will receive an email confirming the details of your booking. If you have any issues or queries please contact the College via <a href=\"mailto:$contact_mail\">$contact_mail</a>        \n        ",
        "booking_time_plus": "20",
        "booking_terms_and_conditions_content": "\n        <p>I have read and understood the information on the Divisional Written Examination webpage.</p>\n        <p>I have read and understood the information around the withdrawal from examinations.</p>\n        <p>I understand that I am responsible for submitting my withdrawal from the examination within the Exam Booking System.</p>\n        <p>I understand that I am responsible for contacting the College to confirm  my withdrawal from the examination.</p>",
        "booking_withdraw_content": "Thank you for confirming your withdrawal from the examination. You will receive an email confirmation shortly. A record of your withdrawal will be kept on file. If you have any issues or queries please contact the College via <a href=\"mailto:$contact_mail\">$contact_mail</a>",
        "withdraw_booking_content": "<p>Your request to withdraw from the upcoming examination is confirmed. Please contact the College directly to inform them of your decision to withdraw.</p>",
        "special_arrangement_content": "<p>test</p>",
        "booking_withdraw_terms": "\n        <p>I have read and understood the information on the Divisional Written Examination webpage.</p>\n        <p>I have read and understood the information around the withdrawal from examinations.</p>\n        <p>I understand that I am responsible for submitting my withdrawal from the examination within the Exam Booking System.</p>\n        <p>I understand that I am responsible for contacting the College to confirm  my withdrawal from the examination.</p>\n        ",
        "exam_statistics_sync_time": "02:00",
        "iregistrationLoginError": "You are not allowed to book exam in the exam booking portal. Please check with the Exam Administrator.",
        "iregistration_login_title": "RACP Exam Registration Portal",
        "waitlisted_booking_content": "<p>email</p>",
        "member_portal_url": "http/ss"
    }
},
"save_isawe_case_setting":{
    "body":{
        "msmg_maximum_distractors": 10,
        "msmg_maximum_answer_selection": 5,
        "vsaqmg_maximum_answer_keys": 10,
        "vsaqmg_maximum_written_answers": 5,
        "isaweCaseId": 1
    }
},
"Admin_Question_Status_filter_search":{
    "body":{
        "filterArray": [
            {
                "filterId": "Type",
                "operator": "eq",
                "displayText": "Type <span>is equal to</span> ",
                "filterValue1": "MCQ",
                "filterValue2": "select6",
                "filterValue3": "",
                "operation": ""
            }
        ],
        "pagination": "",
        "pageName": "dashboard-questions"
    }
},

"Admin_save_custom_privet":{
    "body":
    {
        "filterArray": {
            "filterName": Dashboardname,
            "filterType": "private",
            "filterPage": "showquestions",
            "filter_id": ""
        },
        "customFilter": [
            {
                "filterId": "Type",
                "operator": "eq",
                "displayText": "Type <span>is equal to</span> ",
                "filterValue1": "MCQ",
                "filterValue2": "select6",
                "filterValue3": "",
                "operation": ""
            }
        ]
    }    
},
"iExam_Edit_Form":{
    "body":{
        
    }
},
"template_exam_update":{
    "body":{
        "exam_bank": [
            {
                "id": 1,
                "name": "Practice Bank"
            }
        ],
        "exam_name": "api exam",
        "exam_description": "<p>asfwe</p>",
        "exam_start_date_time": [
            {
                "enableOption": 1,
                "examDate": "2023-11-18",
                "examHours": "12",
                "examMinutes": "04"
            }
        ],
        "exam_end_date_time": [
            {
                "enableOption": 1,
                "examDate": "2023-12-17",
                "examHours": "12",
                "examMinutes": "04"
            }
        ],
        "exam_venue": [
            {
                "id": 3,
                "name": "Chennai, India",
                "seats": 100,
                "max_seats": "100"
            }
        ],
        "exam_booking_start_date_time": "2023-11-17 14:04:00",
        "exam_booking_end_date_time": "2023-11-17T17:04:00",
        "exam_booking_status": false,
        "question_display_type": [
            {
                "id": 102,
                "name": "Standard"
            }
        ],
        "questions_per_page": [
            {
                "id": 91,
                "name": "1"
            }
        ],
        "image_View": "142",
        "shuffle_within_questions": [
            {
                "id": 104,
                "name": "No"
            }
        ],
        "select_exam_tools": [],
        "browser_security": [
            {
                "id": "138",
                "name": "None",
                "examKey": null
            }
        ],
        "security_role": "[{\"id\":9,\"name\":\"Candidate\",\"network_security\":{\"id\":1,\"name\":\"Allow All\"},\"options\":{\"options_arr\":[{\"id\":1,\"name\":\"Allow All\",\"visibleStatus\":1},{\"id\":2,\"name\":\"Allow IP Address Range\",\"visibleStatus\":2},{\"id\":3,\"name\":\"Allow Specific IP Address\",\"visibleStatus\":3}],\"singleSelect\":true,\"title\":\"Candidate\",\"isForJsonSchema\":false,\"value\":1}}]",
        "exam_id": "4"
    }
},
"template_exam_save_sessions":{
    "body":{
        "data": [
            {
                "id": "2",
                "type": "exam",
                "mode": "write_mode",
                "display_name": "api exam",
                "question_per_page": {
                    "id": 91,
                    "name": "1"
                },
                "items": [
                    {
                        "id": 1578,
                        "display_name": "Exam Main Session",
                        "type": "session",
                        "mode": "write_mode",
                        "items": [
                            {
                                "id": 2722,
                                "display_name": "zfg",
                                "duration": 0,
                                "type": "section_content",
                                "mode": "write_mode",
                                "items": [
                                    {
                                        "id": 15292,
                                        "display_name": "Page 1",
                                        "type": "page",
                                        "mode": "write_mode",
                                        "items": [
                                            {
                                                "id": 610,
                                                "display_name": "sdf",
                                                "type": "content",
                                                "mode": "write_mode",
                                                "data": {
                                                    "content_title": "sdf",
                                                    "attachment_1": "[{\"filename\":\"65570c58aef63.jpeg\",\"destination_path\":\"saas-qa.assessappglobal.com.au\\/content_section\\/files\",\"extension\":\"jpeg\",\"type\":\"Image\",\"path\":\"saas-qa.assessappglobal.com.au\\/content_section\\/files\\/65570c58aef63.jpeg\"}]",
                                                    "attachment_2": "[]",
                                                    "content": "<p>zxfew</p>",
                                                    "content_layout": "[{\"id\":2,\"name\":\"Terms & Conditions\"}]"
                                                }
                                            }
                                        ],
                                        "data": {
                                            "page_name": "Page 1"
                                        },
                                        "path": "~/0/0/0/0"
                                    }
                                ],
                                "data": {
                                    "section_identifier": "",
                                    "section_name": "zfg",
                                    "section_type": "content",
                                    "section_description": "<p>zfg</p>",
                                    "pass_section": "",
                                    "pass_percentage": 0,
                                    "time_settings": "{\"duration\":[{\"id\":\"1\",\"name\":\"1\"}],\"remainingTime\":\"41759\",\"totalTime\":100}"
                                },
                                "path": "~/0/0/0",
                                "sessionStart": "2023-11-18 12:04:00",
                                "sessionEnd": "2023-12-17 12:04:00"
                            },
                            {
                                "id": 2723,
                                "display_name": "zxs",
                                "duration": 1,
                                "type": "section_exam",
                                "mode": "write_mode",
                                "items": [
                                    {
                                        "id": 15293,
                                        "display_name": "Page 1",
                                        "type": "page",
                                        "mode": "write_mode",
                                        "items": [
                                            {
                                                "id": 347,
                                                "title": "VSAQ 171023",
                                                "type": "question",
                                                "mode": "write_mode",
                                                "bank": "Practice Bank",
                                                "questionType": "VSAQ",
                                                "created by": "Ashraf Begam",
                                                "last modified by": "SaasQA ApproverTest",
                                                "status": "Approved",
                                                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.VSAQ",
                                                "used in exams": [
                                                    "demo107919",
                                                    "exam06112023",
                                                    "exam06112023- updated",
                                                    "exam07112023",
                                                    "time validation test",
                                                    "time validation test",
                                                    "time validation test",
                                                    "exam06112023",
                                                    "demo972342"
                                                ],
                                                "used in blueprints": [
                                                    "Blueprint 171023"
                                                ],
                                                "no of exams": null,
                                                "checked": true,
                                                "page_name": "Page 1",
                                                "new_version_found": 0,
                                                "exam_status": "Draft"
                                            }
                                        ],
                                        "data": {
                                            "page_name": "Page 1"
                                        },
                                        "path": "~/0/0/1/0"
                                    },
                                    {
                                        "id": 15294,
                                        "display_name": "Page 2",
                                        "type": "page",
                                        "mode": "write_mode",
                                        "items": [
                                            {
                                                "id": 351,
                                                "title": "Type X ",
                                                "type": "question",
                                                "mode": "write_mode",
                                                "bank": "Practice Bank",
                                                "questionType": "Type X",
                                                "created by": "Ashraf Begam",
                                                "last modified by": "SaasQA ApproverTest",
                                                "status": "Approved",
                                                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Type X",
                                                "used in exams": [
                                                    "demo107919",
                                                    "exam06112023",
                                                    "exam06112023- updated",
                                                    "exam07112023",
                                                    "time validation test",
                                                    "time validation test",
                                                    "time validation test",
                                                    "exam06112023",
                                                    "import"
                                                ],
                                                "used in blueprints": [
                                                    "Blueprint 171023"
                                                ],
                                                "no of exams": null,
                                                "checked": true,
                                                "page_name": "Page 2",
                                                "new_version_found": 0,
                                                "exam_status": "Draft"
                                            }
                                        ],
                                        "data": {
                                            "page_name": "Page 2"
                                        },
                                        "path": "~/0/0/1/1"
                                    }
                                ],
                                "data": {
                                    "section_identifier": "zxcvd",
                                    "section_name": "zxs",
                                    "section_type": "exam",
                                    "section_description": "<p>zcer</p>",
                                    "pass_section": "[{\"id\":\"no\",\"name\":\"No\"}]",
                                    "pass_percentage": 0,
                                    "time_settings": "{\"duration\":[{\"id\":\"60\",\"name\":\"60\"}],\"remainingTime\":\"41699\",\"totalTime\":100}"
                                },
                                "path": "~/0/0/1",
                                "sessionStart": "2023-11-18 12:04:00",
                                "sessionEnd": "2023-12-17 12:04:00"
                            },
                            {
                                "id": 2724,
                                "display_name": "xcer",
                                "duration": 1,
                                "type": "section_survey",
                                "mode": "write_mode",
                                "items": [
                                    {
                                        "id": 15295,
                                        "display_name": "Page 1",
                                        "type": "page",
                                        "mode": "write_mode",
                                        "items": [
                                            {
                                                "id": 353,
                                                "title": "SAQ",
                                                "type": "question",
                                                "mode": "write_mode",
                                                "bank": "Practice Bank",
                                                "questionType": "SAQ / Essay",
                                                "created by": "Ashraf Begam",
                                                "last modified by": "SaasQA ApproverTest",
                                                "status": "Approved",
                                                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                                                "used in exams": [
                                                    "demo107919",
                                                    "exam06112023",
                                                    "exam06112023- updated",
                                                    "exam07112023",
                                                    "time validation test",
                                                    "time validation test",
                                                    "time validation test",
                                                    "exam06112023"
                                                ],
                                                "used in blueprints": [
                                                    "Blueprint 171023"
                                                ],
                                                "no of exams": null,
                                                "checked": true,
                                                "page_name": "Page 1",
                                                "new_version_found": 0,
                                                "exam_status": "Draft"
                                            }
                                        ],
                                        "data": {
                                            "page_name": "Page 1"
                                        },
                                        "path": "~/0/0/2/0"
                                    },
                                    {
                                        "id": 15296,
                                        "display_name": "Page 2",
                                        "type": "page",
                                        "mode": "write_mode",
                                        "items": [
                                            {
                                                "id": 354,
                                                "title": "SJT",
                                                "type": "question",
                                                "mode": "write_mode",
                                                "bank": "Practice Bank",
                                                "questionType": "SJT",
                                                "created by": "Ashraf Begam",
                                                "last modified by": "Ashraf Begam",
                                                "status": "Approved",
                                                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.?",
                                                "used in exams": [
                                                    "demo107919",
                                                    "exam06112023",
                                                    "exam06112023- updated",
                                                    "exam07112023",
                                                    "exam06112023"
                                                ],
                                                "used in blueprints": [
                                                    "Blueprint 171023"
                                                ],
                                                "no of exams": null,
                                                "checked": true,
                                                "page_name": "Page 2",
                                                "new_version_found": 0,
                                                "exam_status": "Draft"
                                            }
                                        ],
                                        "data": {
                                            "page_name": "Page 2"
                                        },
                                        "path": "~/0/0/2/1"
                                    }
                                ],
                                "data": {
                                    "section_identifier": "",
                                    "section_name": "xcer",
                                    "section_type": "survey",
                                    "section_description": "<p>xcger</p>",
                                    "pass_section": "",
                                    "pass_percentage": 0,
                                    "time_settings": "{\"duration\":[{\"id\":\"60\",\"name\":\"60\"}],\"remainingTime\":\"41639\",\"totalTime\":100}"
                                },
                                "path": "~/0/0/2",
                                "sessionStart": "2023-11-18 12:04:00",
                                "sessionEnd": "2023-12-17 12:04:00"
                            }
                        ],
                        "meta": {
                            "key": "Start Date",
                            "value": "start_time"
                        },
                        "data": {
                            "session_name": "Exam Main Session",
                            "session_description": "Exam Main Session Description",
                            "session_duration": {
                                "examHours": 696,
                                "examMinutes": 0,
                                "examSeconds": 0,
                                "enableOption": 1
                            },
                            "exam_start_time": "2023-11-18 12:04:00",
                            "exam_end_time": "2023-12-17 12:04:00",
                            "exam_start_date": "2023-11-18T12:04",
                            "exam_end_date": "2023-12-17T12:04"
                        },
                        "path": "~/0/0"
                    }
                ],
                "path": "~/0"
            }
        ]
    }
},
"examlist_Pagination":{
    "body":{}
},
"examlist_filter_search":{
    "body":{
        "filterArray": [
            {
                "filterId": "Exam Name",
                "operator": "like",
                "displayText": "Exam Name <span>is like</span> ",
                "filterValue1": "Exam 23.13 Unit",
                "filterValue2": "",
                "filterValue3": "",
                "operation": ""
            }
        ]
    }
},
"examlist_custom_filter":{
    "body":{
        "filterArray": {
            "filterName": examName,
            "filterType": "private",
            "filterPage": "showexams",
            "filter_id": ""
        },
        "customFilter": [
            {
                "filterId": "Exam Name",
                "operator": "like",
                "displayText": "Exam Name <span>is like</span> ",
                "filterValue1": "Exam 23.13 Unit",
                "filterValue2": "",
                "filterValue3": "",
                "operation": ""
            }
        ]
    }
},
"examlist_custom_showcolumn":{
    "body":{"showColumns":["TOTAL QUESTIONS","mappings","tags"]}
},
"Admin_exam_search": {
    "body":
    {
    "freeText": [
        "Examname"
    ]
}
},
 "questionlist_custom_filter":{
    "body":{
        
            "filterArray": {
                "filterName": questionlist,
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
        
    }
 }   

}