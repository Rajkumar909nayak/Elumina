import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import * as excel from 'exceljs';

const workbook = new excel.Workbook();
const worksheet = workbook.addWorksheet('TestResults');
let currentRow = 1;

class ExcelReporter implements Reporter {
  onBegin() {
    worksheet.addRow(['Test Case ID', 'Test scenario', 'Status']); // Headers
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const testName1 = test.title;
    const testName2 = testName1.split('. ')[0];
    const testName3 = testName1.split('. ')[1];
    const testStatus = result.status;
    worksheet.addRow([testName2, testName3, testStatus]);
    currentRow++;
  }

  async onEnd() {
    await workbook.xlsx.writeFile('testResult.xlsx');
  }
}
export default ExcelReporter;