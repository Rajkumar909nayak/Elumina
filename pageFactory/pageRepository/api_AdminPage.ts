
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

let roleName = makeid(9)
let emailTemplateName = makeid(8)
let dashboadr_name = makeid(9)
let training_center_name = makeid(10)
let training_site_name = makeid(9)
let grade_scale_name = makeid(10)
let gradeBookName = makeid(12)
let grade_book_filter_name = makeid(12)
export var jsonObject =
{
    //User related payload 
    "Admin_add_user_save": {
        "body": {
            "first_name": "admin",
            "last_name": "api",
            "username": (makeid(5) + Math.floor(Math.random() * 89 + 100)),
            "email": (makeid(7) + Math.floor(Math.random() * 899 + 100) + '@yopmail.com'),
            "phone": ('6' + Math.floor(Math.random() * 899999999 + 100)),
            "mobile": "",
            "dob": "",
            "startdate": "",
            "enddate": "",
            "generate_pwd": "j3r%wStFBP"
        },
        "empty_username_body": {
            "first_name": "admin",
            "last_name": "api",
            "username": "",
            "email": (makeid(7) + Math.floor(Math.random() * 899 + 100) + '@yopmail.com'),
            "phone": ('6' + Math.floor(Math.random() * 899999999 + 100)),
            "mobile": "",
            "dob": "",
            "startdate": "",
            "enddate": "",
            "generate_pwd": "j3r%wStFBP"
        },
        "empty_username_email_password_body": {
            "first_name": "admin",
            "last_name": "api",
            "username": "",
            "email": "",
            "phone": "",
            "mobile": "",
            "dob": "",
            "startdate": "",
            "enddate": "",
            "generate_pwd": "j3r%wStFBP"
        },
        "empty_first_name_body": {
            "first_name": "",
            "last_name": "api",
            "username": (makeid(5) + Math.floor(Math.random() * 89 + 100)),
            "email": (makeid(7) + Math.floor(Math.random() * 899 + 100) + '@yopmail.com'),
            "phone": ('6' + Math.floor(Math.random() * 899999999 + 100)),
            "mobile": "",
            "dob": "",
            "startdate": "",
            "enddate": "",
            "generate_pwd": "j3r%wStFBP"
        },
        "Admin_user_edit_update": {
            "first_name": "admin",
            "last_name": "api",
            "username": (makeid(5) + Math.floor(Math.random() * 89 + 100)),
            "email": (makeid(7) + Math.floor(Math.random() * 899 + 100) + '@yopmail.com'),
            "phone": ('6' + Math.floor(Math.random() * 899999999 + 100)),
            "mobile": "",
            "dob": "",
            "startdate": "",
            "enddate": "",
            "generate_pwd": "j3r%wStFBP"
        }
    },

    //Role related payload
    "Admin_Role": {
        "Admin_role_save": {
            "name": roleName, "description": roleName, "product_id": "[{\"id\":2,\"name\":\"OE\",\"value\":\"\",\"displayName\":\"OE\"}]"
        },
        "Admin_role_save_empty_name": {
            "name": "", "description": roleName, "product_id": "[{\"id\":2,\"name\":\"OE\",\"value\":\"\",\"displayName\":\"OE\"}]"
        },
        "Admin_roles_list_search": { "freeText": [roleName] },
        "Admin_roles_list_search_with_invalid_name": { "freeText": [roleName] + "IGS" },
        "Admin_roles_filter_search": {
            "filterArray": [
                {
                    "filterId": "Module",
                    "operator": "eq",
                    "displayText": "Module <span>is equal to</span> ",
                    "filterValue1": "OE",
                    "filterValue2": "Select one",
                    "operation": ""
                }
            ],
            "freeText": [
                ""
            ]
        },
        "Admin_role_custom_filter_save": {
            "filterArray": {
                "filterName": "OE Fiend" + makeid(12),
                "filterType": "public",
                "filterPage": "view-roles",
                "filter_id": ""
            },
            "customFilter": [
                {
                    "filterId": "Module",
                    "operator": "eq",
                    "displayText": "Module <span>is equal to</span> ",
                    "filterValue1": "OE",
                    "filterValue2": "Select one",
                    "operation": ""
                }
            ]
        },
        "Admin_role_update": {
            "name": roleName,
            "description": "<p>Supervisor</p>",
            "product_id": "[{\"id\":7,\"name\":\"WBA\",\"value\":\"\",\"displayName\":\"WBA\"}]"
        }
    },
    "customization_email_tempalte": {
        "Admin_email_template_save_body": {
            "name": "Likadfrah123ra",
            "subject": "test subject",
            "content": "<p>test content</p>",
            "event": "[{\"id\":3,\"name\":\"Question Created\"}]",
            "status": true
        },
        "Admin_email_templates_search": {
            "freeText": [emailTemplateName]
        },
        "Admin_custom_filter_save": {
            "filterArray": {
                "filterName": emailTemplateName,
                "filterType": "public",
                "filterPage": "view-email-templates",
                "filter_id": ""
            },
            "customFilter": [
                {
                    "filterId": "Template Name",
                    "operator": "eq",
                    "displayText": "Template Name <span>is equal to</span> ",
                    "filterValue1": "User Welcome mail",
                    "filterValue2": "",
                    "operation": ""
                }
            ]
        }
    },
    "Dashboard": {
        "Admin_create_dashboard_save": {
            "dashboard_roles": "[{\"id\":1,\"name\":\"Administrator\"}]",
            "dashboard_name": dashboadr_name,
            "dashboard_description": "<p>desct</p>",
            "product_id": "[{\"id\":1,\"name\":\"QMS\",\"value\":\"\",\"displayName\":\"QMS\"}]",
            "dashboard_widgets": "[{\"id\":1,\"name\":\"To do List\",\"selected\":false},{\"id\":2,\"name\":\"My recent items\",\"selected\":false}]"
        },
        "Admin_dashboards_search": {
            "freeText": [dashboadr_name]
        },
        "Admin_custom_filter_save_public_or_private": {
            "filterArray": {
                "filterName": dashboadr_name,
                "filterType": "public",
                "filterPage": "admin-dashboard",
                "filter_id": ""
            },
            "customFilter": [
                {
                    "filterId": "Dashboard",
                    "operator": "eq",
                    "displayText": "Dashboard <span>is equal to</span> ",
                    "filterValue1": "QMS Dashboard",
                    "filterValue2": "",
                    "operation": ""
                }
            ]
        },
        "Admin_dashboard_update": {
            "dashboard_roles": "[{\"id\":2,\"name\":\"Examiner\"},{\"id\":4,\"name\":\"Approver\"},{\"id\":1,\"name\":\"Administrator\"},{\"id\":3,\"name\":\"Reviewer\"}]",
            "dashboard_name": dashboadr_name,
            "dashboard_description": "<p>QMS Dashboard</p>",
            "product_id": "[{\"id\":1,\"name\":\"QMS\",\"value\":\"\",\"displayName\":\"QMS\"}]",
            "dashboard_widgets": "[{\"id\":2,\"name\":\"My recent items\"},{\"id\":3,\"name\":\"My Filters\"},{\"id\":9,\"name\":\"Question Status\"},{\"id\":1,\"name\":\"To do List\"}]"
        }
    },
    "Training_Center": {
        "Admin_training_centre_save": {
            "training_centre_name": training_center_name,
            "short_name": "test short"
        },
        "Admin_training_centre_update": {
            "training_centre_name": makeid(8),
            "short_name": "Test"
        },
        "Admin_training_centres_search": {
            "freeText": [
                training_center_name
            ]
        },
        "Admin_training_centres_filter_search": {
            "filterArray": [
                {
                    "filterId": "Training Centre Name",
                    "operator": "like",
                    "displayText": "Training Centre Name <span>is like</span> ",
                    "filterValue1": training_center_name,
                    "filterValue2": "",
                    "operation": ""
                }
            ],
            "freeText": [
                ""
            ]
        },
        "Admin_training_centre_custom_filter_save": {
            "filterArray": {
                "filterName": makeid(11),
                "filterType": "public",
                "filterPage": "training_centres",
                "filter_id": ""
            },
            "customFilter": [
                {
                    "filterId": "Training Centre Name",
                    "operator": "like",
                    "displayText": "Training Centre Name <span>is like</span> ",
                    "filterValue1": "NSW",
                    "filterValue2": "",
                    "operation": ""
                }
            ]
        }
    },
    "Training_Site": {
        "Admin_training_site_save": {
            "training_site_name": training_site_name,
            "short_name": "test2",
            "training_centre_id": "[{\"id\":1,\"training_centre_name\":\"Test Centre 1\",\"value\":1,\"name\":\"Test Centre 1\",\"displayName\":\"Test Centre 1\"}]"
        },
        "Admin_training_site_search": {
            "freeText": [training_site_name]
        },
        "Admin_training_sites_filter_search": {
            "filterArray": [
                {
                    "filterId": "Training Site Name",
                    "operator": "like",
                    "displayText": "Training Site Name <span>is like</span> ",
                    "filterValue1": training_site_name,
                    "filterValue2": "",
                    "operation": ""
                }
            ],
            "freeText": [
                ""
            ]
        },
        "Admin_training_site_custom_filter_save": {
            "filterArray": {
                "filterName": training_site_name,
                "filterType": "public",
                "filterPage": "training_sites",
                "filter_id": ""
            },
            "customFilter": [
                {
                    "filterId": "Training Site Name",
                    "operator": "like",
                    "displayText": "Training Site Name <span>is like</span> ",
                    "filterValue1": "Canberra Hospital",
                    "filterValue2": "",
                    "operation": ""
                }
            ]
        }
    },
    "Grade_Scale": {
        "Admin_save_grade_scale": {
            "gradeScaleId": 0,
            "gradeScaleName": grade_scale_name,
            "scaleValues": [
                {
                    "value": "green",
                    "color": "#00ff2a",
                    "id": null
                },
                {
                    "value": "red",
                    "color": "#ff0000",
                    "id": null
                },
                {
                    "value": "yellow",
                    "color": "#fff700",
                    "id": null
                }
            ]
        },
        "Admin_grade_scale_search": {
            "freeText": [
                grade_scale_name
            ],
            "pagination": 25,
            "showColumns": null
        },
        "Admin_grade_scale_filter_search": {
            "filterArray": [
                {
                    "filterId": "Name",
                    "operator": "eq",
                    "displayText": "Name <span>is equal to</span> ",
                    "filterValue1": grade_scale_name,
                    "filterValue2": "",
                    "operation": ""
                }
            ],
            "freeText": [
                ""
            ],
            "pagination": 25,
            "showColumns": null
        },
        "Admin_grade_scale_custom_filter_save": {
            "filterArray": {
                "filterName": makeid(11),
                "filterType": "public",
                "filterPage": "grade-scale",
                "filter_id": ""
            },
            "customFilter": [
                {
                    "filterId": "Name",
                    "operator": "eq",
                    "displayText": "Name <span>is equal to</span> ",
                    "filterValue1": "public",
                    "filterValue2": "",
                    "operation": ""
                }
            ]
        }
    },
    "Grade_Book": {
        "Comman_Setting_Grade_Settings_Grade_Book_Grade_Create_save_grade_book":
        {
            "gradeBookId": null,
            "gradeBookName": gradeBookName,
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
        "grade_book_search": {
            "freeText": [
                gradeBookName
            ],
            "pagination": 25,
            "showColumns": null
        },
        "grade_book_custom_filter_save_public_orprivate": {
            "filterArray": {
                "filterName": grade_book_filter_name,
                "filterType": "public",
                "filterPage": "grade-book",
                "filter_id": ""
            },
            "customFilter": [
                {
                    "filterId": "Name",
                    "operator": "like",
                    "displayText": "Name <span>is like</span> ",
                    "filterValue1": "happy",
                    "filterValue2": "",
                    "operation": ""
                }
            ]

        }

    }
}