import fs from 'fs';
import path from 'path';
import { exam_ID } from 'tests/api/Api_ES_exam.test';
import { token } from 'tests/api/adminToken.test';

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
    /*Create Exam payload*/
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
        "exam_id": exam_ID,
        "transition": "Approve",
        "Authorization": "{\"Practice Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Preview (PDF)\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Unlock\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Reports\":[{\"View\":\"TRUE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"FALSE\"}],\"Registration\":[{\"Live Monitor\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Download Exam\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"}]},\"Elumina - Test Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Preview (PDF)\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Unlock\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Reports\":[{\"View\":\"TRUE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"FALSE\"}],\"Registration\":[{\"Live Monitor\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Download Exam\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"}]},\"banks\":{\"1\":[\"Exam Administrator\"],\"3\":[\"Exam Administrator\"]},\"user\":\"28\"}"
    },

    /*Add user payload*/
    "addUserinexam": {
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

    /*Empty exam name payload*/
    "emptyExamname": {
        "exam_bank": [
            {
                "id": 1,
                "name": "Practice Bank"
            }
        ],
        "exam_name": "",
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
    }
}
