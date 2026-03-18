export type Priority = 'Low' | 'Medium' | 'High';

export interface TestCase {
  id: string;
  title: string;
  description: string;
  steps: string[];
  expected: string;
  priority: Priority;
  createdAt: number;
}

export const STORAGE_KEY = 'testcases_data';

export function loadTestCases(): TestCase[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load test cases:', error);
  }
  return [];
}

export function saveTestCases(testCases: TestCase[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testCases));
  } catch (error) {
    console.error('Failed to save test cases:', error);
  }
}

function downloadFile(content: string, filename: string, type: string = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportTXT(testCases: TestCase[]) {
  const content = testCases.map(tc => `Test Case: ${tc.title}
Description: ${tc.description}

Steps:
${tc.steps.map((s, i) => `${i + 1}. ${s}`).join('\\n')}

Expected:
${tc.expected}

Priority: ${tc.priority}`).join('\\n\\n----------------------------------------\\n\\n');

  downloadFile(content, 'testcases.txt', 'text/plain');
}

export function exportCSV(testCases: TestCase[]) {
  const headers = ['Title', 'Description', 'Steps', 'Expected Result', 'Priority'];
  
  const escapeCSV = (str: string) => {
    if (!str) return '""';
    const cleanStr = str.replace(/"/g, '""');
    return `"${cleanStr}"`;
  };

  const rows = testCases.map(tc => {
    const stepsStr = tc.steps.map((s, i) => `${i + 1}. ${s}`).join('\\n');
    return [
      escapeCSV(tc.title),
      escapeCSV(tc.description),
      escapeCSV(stepsStr),
      escapeCSV(tc.expected),
      escapeCSV(tc.priority)
    ].join(',');
  });

  const content = [headers.join(','), ...rows].join('\\n');
  downloadFile(content, 'testcases.csv', 'text/csv');
}
