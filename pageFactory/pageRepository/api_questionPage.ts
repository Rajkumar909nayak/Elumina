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

let titleName = makeid(9)

export var jsonObject =
{
    //User related payload 
    "OSCE_question": {
        "body": {
            "type": "OSCE Question",
            "bank": 1,
            "title": "osce " + titleName,
            "description": "<p>osce description</p>",
            "station_title": "station title",
            "station_type": [
                {
                    "id": "Examination",
                    "name": "Examination"
                }
            ],
            "information_for_candidate": "<p>infom for candidate</p>",
            "information_for_examiner": "<p>onfom for examinar</p>",
            "alert": "",
            "patient_instructions": "<p>patient</p>",
            "requirements": "<p>request equipment</p>",
            "compulsary_feedback_display_text": "<p>compulsory feedback</p>",
            "comment": "<p>comments</p>",
            "tags": [],
            "comments": "",
            "feedback": [
                {
                    "position": "",
                    "header": "",
                    "required": "",
                    "total_sum": 0,
                    "answer_key_childs": [
                        {
                            "position": 1,
                            "category": "Communication",
                            "required": "required"
                        },
                        {
                            "position": 1,
                            "category": "Knowledge",
                            "required": "required"
                        },
                        {
                            "position": 1,
                            "category": "Fluency",
                            "required": "required"
                        }
                    ]
                }
            ],
            "gcs": [
                {
                    "position": "",
                    "header": "",
                    "required": "",
                    "total_sum": 21,
                    "answer_key_childs": [
                        {
                            "position": 1,
                            "category": "Outstanding Pass",
                            "required": "required",
                            "mark": 6,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Excellent Pass",
                            "required": "required",
                            "mark": 5,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Adequate Pass",
                            "required": "required",
                            "mark": 4,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Borderline Pass",
                            "required": "required",
                            "mark": 3,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Communication",
                            "required": "required",
                            "mark": 2,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Fail",
                            "required": "required",
                            "mark": 1,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        }
                    ]
                }
            ],
            "process": [
                {
                    "position": "",
                    "title": "Elumin",
                    "required": "required",
                    "total_sum": 21,
                    "answer_key_childs": [
                        {
                            "position": 1,
                            "category": "Excellent",
                            "required": "required",
                            "criteria": "Excellent",
                            "mark": 6,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Outstanding",
                            "required": "required",
                            "criteria": "Outstanding",
                            "mark": 5,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Adequate",
                            "required": "required",
                            "criteria": "Adequate",
                            "mark": 4,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Borderline Satisfactory",
                            "required": "required",
                            "criteria": "Borderline Satisfactory ",
                            "mark": 3,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Borderline Unsatisfactory",
                            "required": "required",
                            "criteria": "Borderline Unsatisfactory",
                            "mark": 2,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Unsatisfactory",
                            "required": "required",
                            "criteria": "Unsatisfactory",
                            "mark": 1,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        }
                    ]
                }
            ],
            "checklist": [
                {
                    "header": "Text",
                    "position": 1,
                    "required": "required",
                    "total_sum": 0,
                    "answer_key_childs": [
                        {
                            "position": 1,
                            "title": "text1",
                            "required": "required",
                            "isForJsonSchema": true,
                            "mark": 0,
                            "mark_required": false
                        }
                    ]
                }
            ]
        },
        "editoscebody": {
            "type": "OSCE Question",
            "bank": 1,
            "title": "osce " + makeid(8),
            "description": "<p>osce description</p>",
            "station_title": "station title",
            "station_type": [
                {
                    "id": "Examination",
                    "name": "Examination"
                }
            ],
            "information_for_candidate": "<p>infom for candidate</p>",
            "information_for_examiner": "<p>onfom for examinar</p>",
            "alert": "",
            "patient_instructions": "<p>patient</p>",
            "requirements": "<p>request equipment</p>",
            "compulsary_feedback_display_text": "<p>compulsory feedback</p>",
            "comment": "<p>comments</p>",
            "tags": [],
            "comments": "",
            "feedback": [
                {
                    "position": "",
                    "header": "",
                    "required": "",
                    "total_sum": 0,
                    "answer_key_childs": [
                        {
                            "position": 1,
                            "category": "Communication",
                            "required": "required"
                        },
                        {
                            "position": 1,
                            "category": "Knowledge",
                            "required": "required"
                        },
                        {
                            "position": 1,
                            "category": "Fluency",
                            "required": "required"
                        }
                    ]
                }
            ],
            "gcs": [
                {
                    "position": "",
                    "header": "",
                    "required": "",
                    "total_sum": 21,
                    "answer_key_childs": [
                        {
                            "position": 1,
                            "category": "Outstanding Pass",
                            "required": "required",
                            "mark": 6,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Excellent Pass",
                            "required": "required",
                            "mark": 5,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Adequate Pass",
                            "required": "required",
                            "mark": 4,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Borderline Pass",
                            "required": "required",
                            "mark": 3,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Communication",
                            "required": "required",
                            "mark": 2,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Fail",
                            "required": "required",
                            "mark": 1,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        }
                    ]
                }
            ],
            "process": [
                {
                    "position": "",
                    "title": "Elumin",
                    "required": "required",
                    "total_sum": 21,
                    "answer_key_childs": [
                        {
                            "position": 1,
                            "category": "Excellent",
                            "required": "required",
                            "criteria": "Excellent",
                            "mark": 6,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Outstanding",
                            "required": "required",
                            "criteria": "Outstanding",
                            "mark": 5,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Adequate",
                            "required": "required",
                            "criteria": "Adequate",
                            "mark": 4,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Borderline Satisfactory",
                            "required": "required",
                            "criteria": "Borderline Satisfactory ",
                            "mark": 3,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Borderline Unsatisfactory",
                            "required": "required",
                            "criteria": "Borderline Unsatisfactory",
                            "mark": 2,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Unsatisfactory",
                            "required": "required",
                            "criteria": "Unsatisfactory",
                            "mark": 1,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        }
                    ]
                }
            ],
            "checklist": [
                {
                    "header": "Text",
                    "position": 1,
                    "required": "required",
                    "total_sum": 0,
                    "answer_key_childs": [
                        {
                            "position": 1,
                            "title": "text1",
                            "required": "required",
                            "isForJsonSchema": true,
                            "mark": 0,
                            "mark_required": false
                        }
                    ]
                }
            ]
        },
        "empty_title_body": {
            "type": "OSCE Question",
            "bank": 1,
            "title": "",
            "description": "<p>osce description</p>",
            "station_title": "station title",
            "station_type": [
                {
                    "id": "Examination",
                    "name": "Examination"
                }
            ],
            "information_for_candidate": "<p>infom for candidate</p>",
            "information_for_examiner": "<p>onfom for examinar</p>",
            "alert": "",
            "patient_instructions": "<p>patient</p>",
            "requirements": "<p>request equipment</p>",
            "compulsary_feedback_display_text": "<p>compulsory feedback</p>",
            "comment": "<p>comments</p>",
            "tags": [],
            "comments": "",
            "feedback": [
                {
                    "position": "",
                    "header": "",
                    "required": "",
                    "total_sum": 0,
                    "answer_key_childs": [
                        {
                            "position": 1,
                            "category": "Communication",
                            "required": "required"
                        },
                        {
                            "position": 1,
                            "category": "Knowledge",
                            "required": "required"
                        },
                        {
                            "position": 1,
                            "category": "Fluency",
                            "required": "required"
                        }
                    ]
                }
            ],
            "gcs": [
                {
                    "position": "",
                    "header": "",
                    "required": "",
                    "total_sum": 21,
                    "answer_key_childs": [
                        {
                            "position": 1,
                            "category": "Outstanding Pass",
                            "required": "required",
                            "mark": 6,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Excellent Pass",
                            "required": "required",
                            "mark": 5,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Adequate Pass",
                            "required": "required",
                            "mark": 4,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Borderline Pass",
                            "required": "required",
                            "mark": 3,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Communication",
                            "required": "required",
                            "mark": 2,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Fail",
                            "required": "required",
                            "mark": 1,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        }
                    ]
                }
            ],
            "process": [
                {
                    "position": "",
                    "title": "Elumin",
                    "required": "required",
                    "total_sum": 21,
                    "answer_key_childs": [
                        {
                            "position": 1,
                            "category": "Excellent",
                            "required": "required",
                            "criteria": "Excellent",
                            "mark": 6,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Outstanding",
                            "required": "required",
                            "criteria": "Outstanding",
                            "mark": 5,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Adequate",
                            "required": "required",
                            "criteria": "Adequate",
                            "mark": 4,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Borderline Satisfactory",
                            "required": "required",
                            "criteria": "Borderline Satisfactory ",
                            "mark": 3,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Borderline Unsatisfactory",
                            "required": "required",
                            "criteria": "Borderline Unsatisfactory",
                            "mark": 2,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        },
                        {
                            "position": 1,
                            "category": "Unsatisfactory",
                            "required": "required",
                            "criteria": "Unsatisfactory",
                            "mark": 1,
                            "min": 0,
                            "max": 10,
                            "mark_required": false
                        }
                    ]
                }
            ],
            "checklist": [
                {
                    "header": "Text",
                    "position": 1,
                    "required": "required",
                    "total_sum": 0,
                    "answer_key_childs": [
                        {
                            "position": 1,
                            "title": "text1",
                            "required": "required",
                            "isForJsonSchema": true,
                            "mark": 0,
                            "mark_required": false
                        }
                    ]
                }
            ]
        }
    }
}