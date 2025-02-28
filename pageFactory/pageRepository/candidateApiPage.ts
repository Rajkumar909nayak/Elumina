import { activeExamID } from 'tests/api/CS_candidate.test';
import { activeSessionID } from 'tests/api/CS_candidate.test';
import { pageID } from 'tests/api/CS_candidate.test';
import { examIdInvCheck } from 'tests/api/CS_candidate.test';
import { sectionIdInvCheck } from 'tests/api/CS_candidate.test';
import { pageIdInvCheck } from 'tests/api/CS_candidate.test';
import { questionIdInvcheck } from 'tests/api/CS_candidate.test';
import { test, expect } from '@playwright/test';



export var jsonObject =
{
    "responseDuration": 30000,
    /*Candidate Dashboard*/
    "candidateDashboard": {
        "preview": 0,
        "exam_id": activeExamID,
        "timestamp": null,
        "showValidExam": false,
        "validExams": []
    },

    /*Invigilator Password*/
    "invigilatorPswd": {
        "examId": activeExamID,
        "sessionId": activeSessionID,
        "password": "eyJjdCI6IlRRK1hvczhRUWwwV0NGd3NXYVZxZ1E9PSIsIml2IjoiMTgxMjMyYWFiZGNhMjA4NGRjNDQwNWJlMjM4MDBkOTQiLCJzIjoiMzliYWViYTE4MWM1YWNmOCJ9",
        "preview": 0,
        "timestamp": "2023-8-7 13:25:8.300"
    },

    /*Invalid Invigilator Password*/
    "invalidInvigilatorPswd": {
        "examId": activeExamID,
        "sessionId": activeSessionID,
        "password": "eyJjdCI6IlRRK1hvczhRUWwwV0NGd3NXYVZxZ1E9PSIsIml2IjoiMTgxMjMyYWFiZGNhMjA4NGRjNDQwNWJlMjM4MDBkOTQiLCJzIjoiMzliYWViYTE4MWM1YWNmOCJ9IGS",
        "preview": 0,
        "timestamp": "2023-8-7 13:25:8.300"
    },

    /*Before Exam start*/
    "beforeExamStart": {
        "examId": null,
        "questionId": null,
        "pageId": null,
        "pageRoute": "dashboard",
        "sessionId": null,
        "sectionId": null
    },
    /*After Exam start*/
    "afterExamStart": {
        "examId": examIdInvCheck,
        "questionId": questionIdInvcheck,
        "pageId": pageIdInvCheck,
        "pageRoute": "dashboard",
        "sessionId": activeSessionID,
        "sectionId": sectionIdInvCheck
    },

    /*Candidate Info*/
    "candidateInfo": {
        "preview": 0
    },

    /*Candidate Events*/
    "candidateEvents": {
        "event": "dashboard_accessed",
        "sessionId": activeSessionID,
        "examId": activeExamID,
        "preview": 0,
        "timestamp": null
    },

    /*Candidate Instruction*/
    "candidateInstruction": {
        "examId": activeExamID,
        "sessionId": activeSessionID,
        "preview": 0,
        "timestamp": "2023-8-7 13:22:29.500"
    },

    /*Download exam content page*/
    "downloadExamContentPage": {
        "examId": activeExamID,
        "sessionId": activeSessionID,
        "pageId": pageID,
        "type": "content",
        "preview": 0
    },

    /*Candidate Exam page download*/
    "candidateExamPageDownload": {
        "examId": activeExamID,
        "sessionId": activeSessionID,
        "pageId": pageID,
        "sectionType": "exam",
        "location": 0,
        "preview": 0
    },

    /*Candidate all notes*/
    "candidateAllNotes": {
        "examId": activeExamID,
        "sessionId": activeSessionID,
        "preview": 0
    },

    /*Questions download status*/
    "questionsDownloadStatus": {
        "examId": activeExamID,
        "sessionId": activeSessionID,
        "sectionType": "content",
        "preview": 0,
        "questionStatusSlug": "downloading"
    },

    /*Candidate save notes */
    "candidateSaveNotes": {
        "examId": examIdInvCheck,
        "sessionId": activeSessionID,
        "sectionId": sectionIdInvCheck,
        "questionId": questionIdInvcheck,
        "notes": "Testing for candiate notes",
        "uploaded": false,
        "preview": 0
    },

    /*Save Highlight notes*/
    "saveHighlightnoyes": {
        "highlightedText": "<p>&nbsp;Many deskto<span class=\"highlighted\" data-timestamp=\"1691471552986\" style=\"background-color: rgb(255, 255, 123);\" data-highlighted=\"true\">p publishing packages and web page </span>editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>",
        "slug": "text",
        "questionId": questionIdInvcheck,
        "sessionId": activeSessionID,
        "pageId": pageID,
        "examId": examIdInvCheck,
        "preview": 0
    },

    /*Remove highlight*/
    "removeHighlight": {
        "pageId": pageID,
        "examId": activeExamID,
        "preview": 0
    },

    /*Practice Exam Result*/
    "practiceExamResult": {
        "examId": activeExamID,
        "sessionId": activeSessionID,
        "preview": 0,
        "timestamp": "2023-8-8 6:30:14.700"
    },

    /*Practice Questions Result Page*/
    "practiceQuestionResultPage": {
        "examId": activeExamID,
        "sessionId": activeSessionID,
        "pageId": pageID,
        "type": "exam",
        "preview": 0
    },

    /*Questions Response Save*/
    "questionResponseSave": {
        "examId": activeExamID,
        "sessionId": activeSessionID,
        "syncSource": "API",
        "data": [
            {
                "examId": activeExamID,
                "sessionId": activeSessionID,
                "syncType": "response",
                "pageId": pageIdInvCheck,
                "questionId": 432,
                "queNo": 1,
                "questionStatus": 4,
                "timestamp": "2023-11-30 8:11:25.600",
                "data": 2540,
                "sectionType": "exam",
                "preview": 0
            }
        ],
        // "token": "KJKk8kIGqY2sEImtmNkIEVeaCTtrrhiI",
        "candidateId": "2012322"
    }
}
// let responseDate;
// export function validateTime(responseTime: number) {
//     // requestDate = new Date();
//     responseDate = new Date();
//     let responseTimeIn_msec = responseDate.getMilliseconds() - requestDate.getMilliseconds();
//     console.log(responseTimeIn_msec)
//     //Response time validation
//     expect(responseTimeIn_msec).toBeLessThanOrEqual(responseTime)
// }

// export let requestDate = new Date().getMilliseconds();
// export let responseDate = new Date().getMilliseconds();
// // console.log(responseDate.getMilliseconds() - requestDate.getMilliseconds());

