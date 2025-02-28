import { test, expect } from '@playwright/test'

let requestDate;
export class ValidationResponse {

    fetchrequestTime() {
        requestDate = Date.now();
    }

    validateTime(responseTime: number) {
        let responseDate = new Date().getTime();
        let responseTimeIn_msec = responseDate - requestDate;
        console.log("Response time:", responseTimeIn_msec, "ms")
        console.log("Response time:", responseDate, "and", requestDate)
        //Response time validation
        expect(responseTimeIn_msec).toBeLessThanOrEqual(responseTime)
    }
}