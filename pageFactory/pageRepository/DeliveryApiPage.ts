import fs from 'fs';
import path from 'path';
import { exam_ID } from 'tests/api/Delivery.test';
import { BulkUserId } from 'tests/api/Delivery.test';

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
    "createExam1": {
        "exam_name": "Examname text3",
        "exam_bank": [
            {
                "id": 1,
                "name": "Practice Bank"
            }
        ],
        "exam_description": "<p>description text value</p>",
        "grade_book": [],
        "exam_code": [],
        "semester": 2,
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
                "name": "Chennai Test Venue",
                "seats": 500,
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
        "image_View": "139",
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
        "during_the_attempt": [
            {
                "id": 25,
                "name": "The attempt",
                "checked": true
            },
            {
                "id": 26,
                "name": "Whether correct",
                "checked": false
            },
            {
                "id": 27,
                "name": "Marks",
                "checked": false
            },
            {
                "id": 28,
                "name": "Specific feedback",
                "checked": false
            },
            {
                "id": 29,
                "name": "General feedback",
                "checked": false
            },
            {
                "id": 30,
                "name": "Right answer",
                "checked": false
            },
            {
                "id": 31,
                "name": "Overall feedback",
                "checked": false
            }
        ],
        "immediately_after_attempt": [
            {
                "id": 32,
                "name": "The attempt"
            },
            {
                "id": 33,
                "name": "Whether correct"
            },
            {
                "id": 34,
                "name": "Marks"
            },
            {
                "id": 35,
                "name": "Specific feedback"
            },
            {
                "id": 36,
                "name": "General feedback"
            },
            {
                "id": 37,
                "name": "Right answer"
            },
            {
                "id": 38,
                "name": "Overall feedback"
            }
        ],
        "later_while_exam_open": [
            {
                "id": 39,
                "name": "The attempt"
            },
            {
                "id": 40,
                "name": "Whether correct"
            },
            {
                "id": 41,
                "name": "Marks"
            },
            {
                "id": 42,
                "name": "Specific feedback"
            },
            {
                "id": 43,
                "name": "General feedback"
            },
            {
                "id": 44,
                "name": "Right answer"
            },
            {
                "id": 45,
                "name": "Overall feedback"
            }
        ],
        "after_exam_closed": [
            {
                "id": 46,
                "name": "The attempt"
            },
            {
                "id": 47,
                "name": "Whether correct"
            },
            {
                "id": 48,
                "name": "Marks"
            },
            {
                "id": 49,
                "name": "Specific feedback"
            },
            {
                "id": 50,
                "name": "General feedback"
            },
            {
                "id": 51,
                "name": "Right answer"
            },
            {
                "id": 52,
                "name": "Overall feedback"
            }
        ],
        "browser_security": [
            {
                "id": 57,
                "name": "None",
                "examKey": null
            }
        ],
        "security_role": "[]",
        "feedback": "<p>overall feedback text</p>"
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
                                        "path": "~/0/0/0/0"
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

    /*Add question in content page payload*/
    "addQuestions_ContentPage": {
        "data": [
            {
                "id": exam_ID,
                "type": "exam",
                "mode": "write_mode",
                "display_name": "Examname text3",
                "question_per_page": {
                    "id": 8,
                    "name": "1"
                },
                "items": [
                    {
                        "id": 3611,
                        "display_name": "Exam Main Session",
                        "type": "session",
                        "mode": "write_mode",
                        "items": [
                            {
                                "id": null,
                                "display_name": "create content section",
                                "type": "section_content",
                                "items": [
                                    {
                                        "id": null,
                                        "display_name": "Page 1",
                                        "type": "page",
                                        "items": [
                                            {
                                                "id": null,
                                                "display_name": "contentTitle",
                                                "type": "content",
                                                "mode": "write_mode",
                                                "items": [],
                                                "data": {
                                                    "content_title": "contentTitle",
                                                    "attachment_1": "[]",
                                                    "attachment_2": "[]",
                                                    "content_layout": "[{\"id\":2,\"name\":\"Terms & Conditions\"}]"
                                                },
                                                "path": "~/0/0/0/0/0"
                                            }
                                        ],
                                        "mode": "write_mode",
                                        "data": {
                                            "examId": exam_ID,
                                            "flag": "create",
                                            "mode": "write_mode"
                                        },
                                        "path": "~/0/0/0/0"
                                    }
                                ],
                                "mode": "write_mode",
                                "path": "~/0/0/0",
                                "data": {
                                    "section_name": "create content section",
                                    "section_type": "content",
                                    "section_description": "<p>section escrip</p>",
                                    "time_settings": "{\"duration\":[{\"id\":1,\"name\":1}],\"remainingTime\":43139}"
                                },
                                "sessionStart": "2024-01-08 10:30:00",
                                "sessionEnd": "2024-01-09 10:20:00"
                            },
                            {
                                "id": 3510,
                                "display_name": "section",
                                "duration": 1,
                                "type": "section_exam",
                                "mode": "write_mode",
                                "items": [
                                    {
                                        "id": 38655,
                                        "display_name": "Page 1",
                                        "type": "page",
                                        "mode": "write_mode",
                                        "items": [
                                            {
                                                "id": 1133,
                                                "title": "",
                                                "type": "question",
                                                "mode": "write_mode",
                                                "bank": "Practice Bank",
                                                "questionType": "Type X",
                                                "created by": "IGS user",
                                                "last modified by": "IGS user",
                                                "status": "Draft",
                                                "description": "question aim",
                                                "used in exams": [
                                                    "examname text3"
                                                ],
                                                "used in blueprints": [],
                                                "no of exams": null,
                                                "checked": true,
                                                "page_name": "Page 1",
                                                "new_version_found": 0,
                                                "exam_status": "Draft"
                                            }
                                        ],
                                        "data": {
                                            "page_name": "Page 1"
                                        }
                                    },
                                    {
                                        "id": 38656,
                                        "display_name": "Page 2",
                                        "type": "page",
                                        "mode": "write_mode",
                                        "items": [
                                            {
                                                "id": 1132,
                                                "title": "typex topic edit2",
                                                "type": "question",
                                                "mode": "write_mode",
                                                "bank": "Practice Bank",
                                                "questionType": "Type X",
                                                "created by": "IGS user",
                                                "last modified by": "IGS user",
                                                "status": "Approved",
                                                "description": "question aim",
                                                "used in exams": [
                                                    "test exam creation",
                                                    "examname text3"
                                                ],
                                                "used in blueprints": [],
                                                "no of exams": null,
                                                "checked": true,
                                                "page_name": "Page 2",
                                                "new_version_found": 0,
                                                "exam_status": "Draft"
                                            }
                                        ],
                                        "data": {
                                            "page_name": "Page 2"
                                        }
                                    },
                                    {
                                        "id": 38657,
                                        "display_name": "Page 3",
                                        "type": "page",
                                        "mode": "write_mode",
                                        "items": [
                                            {
                                                "id": 1131,
                                                "title": "",
                                                "type": "question",
                                                "mode": "write_mode",
                                                "bank": "Practice Bank",
                                                "questionType": "Type B",
                                                "created by": "IGS user",
                                                "last modified by": "IGS user",
                                                "status": "Draft",
                                                "description": "question aim test",
                                                "used in exams": [
                                                    "examname text3"
                                                ],
                                                "used in blueprints": [],
                                                "no of exams": null,
                                                "checked": true,
                                                "page_name": "Page 3",
                                                "new_version_found": 0,
                                                "exam_status": "Draft"
                                            }
                                        ],
                                        "data": {
                                            "page_name": "Page 3"
                                        }
                                    }
                                ],
                                "data": {
                                    "section_identifier": "",
                                    "section_name": "section",
                                    "section_type": "exam",
                                    "section_description": "<p>section desc</p>",
                                    "pass_section": "[{\"id\":\"no\",\"name\":\"No\"}]",
                                    "pass_percentage": 0,
                                    "time_settings": "{\"duration\":[{\"id\":\"60\",\"name\":\"60\"}],\"remainingTime\":\"43140\",\"totalTime\":100}"
                                }
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
                                "examHours": 720,
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

    /*Add question in survey page payload*/
    "addQuestions_Surveypage": {
        "data": [
            {
                "id": "{{Created_Exam_ID}}",
                "type": "exam",
                "mode": "write_mode",
                "display_name": "Examname text2 edit",
                "question_per_page": {
                    "id": 8,
                    "name": "1"
                },
                "items": [
                    {
                        "id": 3613,
                        "display_name": "Exam Main Session",
                        "type": "session",
                        "mode": "write_mode",
                        "items": [
                            {
                                "id": 3511,
                                "display_name": "create content section",
                                "duration": 0,
                                "type": "section_content",
                                "mode": "write_mode",
                                "items": [
                                    {
                                        "id": 38658,
                                        "display_name": "Page 1",
                                        "type": "page",
                                        "mode": "write_mode",
                                        "items": [
                                            {
                                                "id": 584,
                                                "display_name": "contentTitle",
                                                "type": "content",
                                                "mode": "write_mode",
                                                "data": {
                                                    "content_title": "contentTitle",
                                                    "attachment_1": "[]",
                                                    "attachment_2": "[]",
                                                    "content": "",
                                                    "content_layout": "[{\"id\":2,\"name\":\"Terms & Conditions\"}]"
                                                }
                                            }
                                        ],
                                        "data": {
                                            "page_name": "Page 1"
                                        }
                                    }
                                ],
                                "data": {
                                    "section_identifier": "",
                                    "section_name": "create content section",
                                    "section_type": "content",
                                    "section_description": "<p>section escrip</p>",
                                    "pass_section": "",
                                    "pass_percentage": 0,
                                    "time_settings": "{\"duration\":[{\"id\":\"1\",\"name\":\"1\"}],\"remainingTime\":\"43139\",\"totalTime\":100}"
                                }
                            },
                            {
                                "id": 3512,
                                "display_name": "section",
                                "duration": 1,
                                "type": "section_exam",
                                "mode": "write_mode",
                                "items": [
                                    {
                                        "id": 38660,
                                        "display_name": "Page 2",
                                        "type": "page",
                                        "mode": "write_mode",
                                        "items": [
                                            {
                                                "id": 1132,
                                                "title": "typex topic edit2",
                                                "type": "question",
                                                "mode": "write_mode",
                                                "bank": "Practice Bank",
                                                "questionType": "Type X",
                                                "created by": "IGS user",
                                                "last modified by": "IGS user",
                                                "status": "Approved",
                                                "description": "question aim",
                                                "used in exams": [
                                                    "test exam creation",
                                                    "examname text3"
                                                ],
                                                "used in blueprints": [],
                                                "no of exams": null,
                                                "checked": true,
                                                "page_name": "Page 2",
                                                "new_version_found": 0,
                                                "exam_status": "Draft"
                                            }
                                        ],
                                        "data": {
                                            "page_name": "Page 2"
                                        }
                                    }
                                ],
                                "data": {
                                    "section_identifier": "",
                                    "section_name": "section",
                                    "section_type": "exam",
                                    "section_description": "<p>section desc</p>",
                                    "pass_section": "[{\"id\":\"no\",\"name\":\"No\"}]",
                                    "pass_percentage": 0,
                                    "time_settings": "{\"duration\":[{\"id\":\"60\",\"name\":\"60\"}],\"remainingTime\":\"43140\",\"totalTime\":100}"
                                }
                            },
                            {
                                "id": null,
                                "display_name": "survey section name test",
                                "type": "section_survey",
                                "items": [
                                    {
                                        "id": null,
                                        "display_name": "Page 1",
                                        "mode": "write_mode",
                                        "type": "page",
                                        "items": [
                                            {
                                                "id": "1130",
                                                "title": "question type b test updat",
                                                "text": "Statement text",
                                                "questionType": "Type B",
                                                "description": "question aim test",
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
                                                "created date": "04-01-2024",
                                                "last date updated": "04-01-2024",
                                                "last exam name": "test exam creation",
                                                "no of exams": "1",
                                                "correct %": "0",
                                                "used in exams": [
                                                    "test exam creation"
                                                ],
                                                "exam name": [],
                                                "used in blueprints": [],
                                                "updated datetime": "1704412076",
                                                "exam date": [],
                                                "total mark": "1",
                                                "no of attempts": "0",
                                                "discriminator": "",
                                                "percentage": "",
                                                "legacy item id": ""
                                            }
                                        ],
                                        "data": {},
                                        "isDrag": true,
                                        "path": "~/0/0/2/0"
                                    },
                                    {
                                        "id": null,
                                        "display_name": "Page 2",
                                        "mode": "write_mode",
                                        "type": "page",
                                        "items": [
                                            {
                                                "id": "1129",
                                                "title": "sjt question topic edited",
                                                "text": "quuestion stem",
                                                "questionType": "SJT",
                                                "description": "question aims",
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
                                                "created date": "04-01-2024",
                                                "last date updated": "04-01-2024",
                                                "last exam name": "test exam creation",
                                                "no of exams": "1",
                                                "correct %": "0",
                                                "used in exams": [
                                                    "test exam creation"
                                                ],
                                                "exam name": [],
                                                "used in blueprints": [],
                                                "updated datetime": "1704412056",
                                                "exam date": [],
                                                "total mark": "20",
                                                "no of attempts": "0",
                                                "discriminator": "",
                                                "percentage": "",
                                                "legacy item id": ""
                                            }
                                        ],
                                        "data": {},
                                        "isDrag": true,
                                        "path": "~/0/0/2/1"
                                    },
                                    {
                                        "id": null,
                                        "display_name": "Page 3",
                                        "mode": "write_mode",
                                        "type": "page",
                                        "items": [
                                            {
                                                "id": "1127",
                                                "title": "SAQ Sample Question",
                                                "text": "SAQ Sample Question",
                                                "questionType": "SAQ / Essay",
                                                "description": "SAQ Sample Question",
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
                                                "created date": "04-01-2024",
                                                "last date updated": "04-01-2024",
                                                "last exam name": "",
                                                "no of exams": "0",
                                                "correct %": "0",
                                                "used in exams": [],
                                                "exam name": [],
                                                "used in blueprints": [],
                                                "updated datetime": "1704412019",
                                                "exam date": [],
                                                "total mark": "5",
                                                "no of attempts": "0",
                                                "discriminator": "",
                                                "percentage": "",
                                                "legacy item id": ""
                                            }
                                        ],
                                        "data": {},
                                        "isDrag": true,
                                        "path": "~/0/0/2/2"
                                    }
                                ],
                                "path": "~/0/0/2",
                                "mode": "write_mode",
                                "data": {
                                    "section_name": "survey section name test",
                                    "section_type": "survey",
                                    "section_description": "<p>descrip sur</p>",
                                    "time_settings": "{\"duration\":[{\"id\":60,\"name\":60}],\"remainingTime\":43079}"
                                },
                                "sessionStart": "2024-01-08 10:30:00",
                                "sessionEnd": "2024-01-09 10:20:00"
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
                                "examHours": 720,
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
    "Modify_Exam": {
        "exam_name": "Examname text edit",
        "exam_bank": [
            {
                "id": 1,
                "name": "Practice Bank"
            }
        ],
        "exam_description": "<p>description text value edit</p>",
        "grade_book": [
            {
                "id": 27,
                "name": "Grade Scale"
            }
        ],
        "exam_code": [],
        "semester": 2,
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
                "examHours": "20",
                "examMinutes": EndExamMin
            }
        ],
        "exam_venue": [
            {
                "id": 36,
                "name": "Chennai Test Venue",
                "seats": 200,
                "max_seats": 0
            },
            {
                "id": 1,
                "name": "Melbourne",
                "seats": 10,
                "max_seats": 0
            }
        ],
        "exam_booking_status": false,
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
        "image_View": "139",
        "shuffle_within_questions": [
            {
                "id": 13,
                "name": "No"
            }
        ],
        "select_exam_tools": [
            {
                "id": 80,
                "name": "Notepad"
            },
            {
                "id": 81,
                "name": "Highlighter"
            },
            {
                "id": 79,
                "name": "Calculator"
            }
        ],
        "during_the_attempt": [
            {
                "id": 25,
                "name": "The attempt",
                "checked": true
            },
            {
                "id": 26,
                "name": "Whether correct",
                "checked": false
            },
            {
                "id": 27,
                "name": "Marks",
                "checked": false
            },
            {
                "id": 28,
                "name": "Specific feedback",
                "checked": false
            },
            {
                "id": 29,
                "name": "General feedback",
                "checked": false
            },
            {
                "id": 30,
                "name": "Right answer",
                "checked": false
            },
            {
                "id": 31,
                "name": "Overall feedback",
                "checked": false
            }
        ],
        "immediately_after_attempt": [
            {
                "id": 32,
                "name": "The attempt"
            },
            {
                "id": 33,
                "name": "Whether correct"
            },
            {
                "id": 34,
                "name": "Marks"
            },
            {
                "id": 35,
                "name": "Specific feedback"
            },
            {
                "id": 36,
                "name": "General feedback"
            },
            {
                "id": 37,
                "name": "Right answer"
            },
            {
                "id": 38,
                "name": "Overall feedback"
            }
        ],
        "later_while_exam_open": [
            {
                "id": 39,
                "name": "The attempt"
            },
            {
                "id": 40,
                "name": "Whether correct"
            },
            {
                "id": 41,
                "name": "Marks"
            },
            {
                "id": 42,
                "name": "Specific feedback"
            },
            {
                "id": 43,
                "name": "General feedback"
            },
            {
                "id": 44,
                "name": "Right answer"
            },
            {
                "id": 45,
                "name": "Overall feedback"
            }
        ],
        "after_exam_closed": [
            {
                "id": 46,
                "name": "The attempt"
            },
            {
                "id": 47,
                "name": "Whether correct"
            },
            {
                "id": 48,
                "name": "Marks"
            },
            {
                "id": 49,
                "name": "Specific feedback"
            },
            {
                "id": 50,
                "name": "General feedback"
            },
            {
                "id": 51,
                "name": "Right answer"
            },
            {
                "id": 52,
                "name": "Overall feedback"
            }
        ],
        "exam_invigilator_password": "12345",
        "browser_security": [
            {
                "id": "57",
                "name": "None",
                "examKey": null
            }
        ],
        "security_role": "[]",
        "feedback": "<p>overall feedback text</p>"
    },
    "New_user_create": { "client_id": makeid(10), "userId": "" },
    "Add_New_Users": { "examId": exam_ID },
    "New_User_Save": {
        "data": [

            {
                "client_id": "1230083",
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
    "Existing_users_Filter": { "filterArray": [{ "filterId": "First Name", "operator": "like", "displayText": "First Name <span>is like</span> ", "filterValue1": "admin", "filterValue2": "", "filterValue3": "", "operation": "" }], "freeText": [""], "pagination": 25, "showColumns": null, "examId": exam_ID },
    "Filter_Save_public_or_Privet": { "filterArray": { "filterName": makeid(15), "filterType": "public", "filterPage": "exam-existing-users", "filter_id": "" }, "customFilter": [{ "filterId": "First Name", "operator": "eq", "displayText": "First Name <span>is equal to</span> ", "filterValue1": "Abijit", "filterValue2": "", "filterValue3": "", "operation": "" }], "examId": exam_ID },
    "Save_filter_list_Public_or_privet": { "filterArray": [{ "filterId": "First Name", "operator": "eq", "filterValue1": "admin", "filterValue2": "", "filterValue3": null, "operation": "", "displayText": "First Name <span>is equal to</span> " }], "pagination": 25, "showColumns": null, "examId": exam_ID },
    "Bulkuploadusers_user_list_page": { "sortingColumn": [], "examId": exam_ID, "removedRecord": [] },
    "Savebulk_users": {
        "removedRecord": [],
        "settings": {
            "uploadType": 4,
            "newUserPassword": 1,
            "ExistingUserdetails": 2,
            "ForcePasswordChange": 2,
            "AllowDeletes": 1,
            "EmailRegistrationDetails": 1
        },
        "fileId": BulkUserId
    },
    "Existing_Users_List": { "filterArray": [], "pagination": null, "showColumns": [], "examId": exam_ID },
    "Existingusers_pagination": { "filterArray": [], "pagination": 25, "showColumns": [], "examId": exam_ID },
    "Existingusers_Search": { "filterArray": [], "freeText": ["admin"], "pagination": 25, "showColumns": null, "examId": exam_ID },
    "venue_summary_list": { "filterArray": [], "pagination": null, "showColumns": [], "examId": exam_ID },
    "venue_summary_search": { "filterArray": [], "freeText": ["Remote Location"], "pagination": "25", "showColumns": null, "examId": exam_ID },
    "download_venue_summary": { "examId": exam_ID, "filter_data": [], "user_details": [] },
    "venue_summary_filter_list": { "filterArray": [{ "filterId": "Name", "operator": "eq", "displayText": "Name <span>is equal to</span> ", "filterValue1": "Remote Location", "filterValue2": "", "filterValue3": "", "operation": "" }], "freeText": [""], "pagination": "25", "showColumns": null, "examId": exam_ID },
    "venue_summary_save_filter_public_or_privet": { "filterArray": { "filterName": makeid(15), "filterType": "public", "filterPage": "venue-summary", "filter_id": "" }, "customFilter": [{ "filterId": "Name", "operator": "eq", "displayText": "Name <span>is equal to</span> ", "filterValue1": "Remote Location", "filterValue2": "", "filterValue3": "", "operation": "" }], "examId": exam_ID },
    "venue_summary_pagination": { "filterArray": [], "pagination": 25, "showColumns": null, "examId": exam_ID },
    "Marking_list": { "filterArray": [], "pagination": "", "showColumns": [], "examId": exam_ID, "session": [{ "id": "{{Active_sessionId}}", "name": "Exam Main Session" }] },
    "Marking_Session_By_Search": { "filterArray": [], "freeText": [""], "pagination": 25, "showColumns": null, "examId": "{{Active_examId}}", "session": [{ "id": "{{sessionID}}", "name": "Exam Main Session" }] },
    "MarkerAssignPopup": {
        "examId": "{{Active_examId}}", "session": [{
            "id": "{{ sessionID }}", "name": "Exam Main Session"
        }]
    },
    "marker_name_assign": { "examId": "{{Active_examId}}", "candidateId": ["{{candidateID}}"], "questionId": ["000"], "session": [{ "id": "{{sessionID}}", "name": "Exam Main Session" }] },
    "Marker_assign_save": { "examId": "{{Active_examId}}", "session": [{ "id": "{{sessionID}}", "name": "Exam Main Session" }], "candidateId": ["{{candidateID}}"], "questionId": ["000"], "markerId": "[{{markerID}}]" },
    "Unassign_all_markers": { "examId": "{{Active_examId}}", "sessionId": [{ "id": "{{sessionID}}", "name": "Exam Main Session" }] },
    "Marker_unassign_save": {
        "examId": "{{Active_examId}}", "session": [{
            "id": "{{ sessionID }}", "name": "Exam Main Session"
        }], "candidateId": ["{{candidateID}}"], "questionId": ["000"], "markerId": "[{{ markerID }}]"
    },
    "Markers_dashboard_Search": { "freeText": ["{{markername}}"], "pagination": 5, "examId": "{{Active_examId}}", "examSession": ["{{sessionID}}"] },
    "Markers_dashboard_Pagination": { "freeText": ["{{markername}}"], "pagination": 25, "showColumns": null, "examId": "{{Active_examId}}", "examSession": ["{{sessionID}}"] },
    "Marker_Responce_left_site_menu": { "examId": "{{Active_examId}}", "candidateId": "{{candidateID}}", "markerId": "{{markerID}}", "session": "{{sessionID}}", "markingStatusId": [], "questionId": null, "viewBy": "candidate", "role": "marker" },
    "Markers_report_Paginaion": {
        "examId": "{{Active_examId}}", "pagination": 50, "markersArray": [{
            "id": "{{ markerID }}", "name": "{{markername}}"
        }], "markerId": "{ { markerID } }", "session": [{ "id": "{{ sessionID }}", "name": "Exam Main Session" }], "markingStatusId": []
    },
    "markers_report_show_column": {
        "examId": "{{Active_examId}}", "showColumns": ["client id", "mappings"], "pagination": 50, "markersArray": [{
            "id": "{{ markerID }}", "name": "{{markername}}"
        }], "markerId": "{ { markerID } }", "session": [{ "id": "{{ sessionID }}", "name": "Exam Main Session" }], "markingStatusId": []
    },
    "MarkersBySession_List": { "examId": "{{Active_examId}}", "session": [{ "id": "{{sessionID}}", "name": "Exam Main Session" }] },
    "Markers_Report_List": { "examId": "{{Active_examId}}", "markersArray": [{ "id": "{{markerID}}", "name": "{{markername}}" }], "session": [{ "id": "{{sessionID}}", "name": "Exam Main Session" }], "markingStatusId": [] },
    "Reset_Marking": { "examId": "{{Active_examId}}", "candidateId": [], "markerId": "{{markerID}}" },
    "Open_or_Close_Marking_All": { "examId": "{{Active_examId}}", "markerId": "", "markingEnabled": false },
    "workflow_create_page": { "exam_id": exam_ID, "workflow": { "name": "No Workflow" }, "Authorization": "{\"COPEM Module 1\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"LIV Test Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"QA Bank\":{\"Question\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"\":\"FALSE\"},{\"View\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Public Filter\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"}],\"Images\":[{\"Upload\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Exam\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview (WEB)\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Checkout\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Export\":\"FALSE\"},{\"Preview (PDF)\":\"TRUE\"},{\"Public Filter\":\"FALSE\"},{\"View\":\"TRUE\"}],\"Blueprint\":[{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Unlock\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Registration\":[{\"Adduser\":\"TRUE\"},{\"Updateuser\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Generate Temp ID\":\"TRUE\"},{\"Assign Venue And Booking Status\":\"TRUE\"},{\"Markers Report Download\":\"TRUE\"},{\"Bulk Assign Invigilator\":\"TRUE\"},{\"Manage Special Consideration\":\"TRUE\"},{\"Manage Booking\":\"TRUE\"},{\"Live Monitor\":\"TRUE\"},{\"Marking\":\"TRUE\"},{\"Marker View Next\":\"TRUE\"},{\"Marker View Prev\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"\":\"TRUE\"},{\"Venue Summary\":\"TRUE\"},{\"Download Exam\":\"TRUE\"},{\"Live Monitor Exam Action\":\"TRUE\"},{\"Live Monitor Questions\":\"TRUE\"},{\"Live Monitor Timer\":\"TRUE\"},{\"Reset Password\":\"TRUE\"},{\"Reopen Exam\":\"TRUE\"},{\"Open All Marking\":\"TRUE\"},{\"Open Marking\":\"TRUE\"},{\"Reset Marking\":\"TRUE\"},{\"Un Assign All Markers\":\"TRUE\"},{\"Download All Exam users\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}],\"Gradebook\":[{\"View\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"View\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Download\":\"TRUE\"},{\"Publish\":\"TRUE\"},{\"Unpublish\":\"TRUE\"},{\"Add Comment\":\"TRUE\"},{\"Public Filter\":\"FALSE\"}],\"Reports\":[{\"View\":\"FALSE\"},{\"Create\":\"TRUE\"},{\"Search\":\"TRUE\"},{\"Edit\":\"TRUE\"},{\"Preview\":\"TRUE\"},{\"Duplicate\":\"TRUE\"},{\"Delete\":\"TRUE\"},{\"Print\":\"TRUE\"},{\"Export\":\"TRUE\"},{\"Archive\":\"TRUE\"},{\"Public Filter\":\"TRUE\"}]},\"banks\":{\"1\":[\"Administrator\"],\"5\":[\"Administrator\"],\"42\":[\"Administrator\"]},\"user\":\"2638\"}" },
    "Exam_admin_marking_view_response": { "questionId": "{{ questionID }}", "examId": "{{Created_Exam_ID}}", "candidateId": "{{candidateID}}", "markingStatusId": [], "markerId": "{{markerID}}", "session": "{ { sessionID } }" },
    "Exam_admin_marking_viewresponse_save": {
        "examId": "{{Created_Exam_ID}}",
        "markerId": "{{markerID}}",
        "candidateId": "{{candidateID}}",
        "mainquestionId": "{{questionID}}",
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
    },
    "Final_or_submit_as_final_submited": { "candidateId": "{{candidateID}}", "markerId": "{{ markerID }}", "examId": "{ { Created_Exam_ID } }", "session": [{ "id": "{{ sessionID }}", "name": "Exam Main Session" }], "markingStatusId": [], "markersArray": [{ "id": 3740, "name": "Marker One" }] },
    "Reopen_marking": { "candidateId": "{{candidateID}}", "markerId": "{{markerID}}", "examId": "{{Created_Exam_ID}}", "session": [{ "id": "{{sessionID}}", "name": "Exam Main Session" }], "markingStatusId": [], "markersArray": [{ "id": "{{markerID}}", "name": "{{markername}}" }] }


}