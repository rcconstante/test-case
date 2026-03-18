🧠 Product Overview

Test-Case.dev is a lightweight SaaS tool that helps:

QA testers

Developers

Students

👉 Create, organize, and export test cases quickly

🎯 Core Value

Instead of writing messy notes like:

“login works, wrong pass fails”

👉 It turns into structured, usable test cases.

🧩 1. MVP FEATURES (KEEP SIMPLE)
✅ 1.1 Test Case Builder (MAIN FEATURE)
Input Form Fields:

Title (text)

Description (textarea)

Steps (multi-line input)

Expected Result (textarea)

Priority (dropdown)

Low

Medium

High

📋 Output (Generated Format)
Test Case: Login Success

Description:
User logs in with valid credentials

Steps:
1. Enter email
2. Enter password
3. Click login

Expected Result:
User is redirected to dashboard

Priority: High
📊 1.2 Test Case List View

Table layout:

Title	Priority	Actions
Login Success	High	Edit / Delete
📤 1.3 Export Options

Copy to clipboard

Download as:

.txt

.csv

🗑️ 1.4 Basic Actions

Add test case

Edit

Delete

Clear all

🎨 2. UI STRUCTURE
🖥️ Layout
[ Logo: Test-Case.dev ]

[ + New Test Case ]

-------------------------

[ FORM PANEL ]
Title
Description
Steps
Expected Result
Priority

[ Save Button ]

-------------------------

[ TEST CASE LIST TABLE ]

-------------------------

[ Export Buttons ]
🎯 UX Principles

No login required (MVP)

Fast input → instant save

Clean, dev-style UI

Mobile responsive

🧠 3. TECH STACK
🔹 Frontend (MVP)

Next.js (App Router)

Tailwind CSS

🔹 Storage

👉 Start with:

localStorage (no backend)

Later upgrade:

Supabase (DB + auth)

💾 4. DATA STRUCTURE
📦 Test Case Object
{
  id: string,
  title: string,
  description: string,
  steps: string[],
  expected: string,
  priority: "Low" | "Medium" | "High",
  createdAt: timestamp
}
🧱 5. STATE MANAGEMENT
const [testCases, setTestCases] = useState([])
Save to localStorage
localStorage.setItem("testcases", JSON.stringify(testCases))
Load on start
useEffect(() => {
  const data = localStorage.getItem("testcases")
  if (data) setTestCases(JSON.parse(data))
}, [])
⚙️ 6. CORE FUNCTIONS
➕ Add Test Case
function addTestCase(tc) {
  setTestCases(prev => [...prev, tc])
}
✏️ Edit
function updateTestCase(id, updated) {
  setTestCases(prev =>
    prev.map(tc => tc.id === id ? updated : tc)
  )
}
❌ Delete
function deleteTestCase(id) {
  setTestCases(prev =>
    prev.filter(tc => tc.id !== id)
  )
}
📤 7. EXPORT LOGIC
📝 TXT Export
function exportTXT(testCases) {
  const content = testCases.map(tc => `
Test Case: ${tc.title}

Steps:
${tc.steps.join("\n")}

Expected:
${tc.expected}
`).join("\n\n")

  downloadFile(content, "testcases.txt")
}
📊 CSV Export
function exportCSV(testCases) {
  const rows = testCases.map(tc =>
    `${tc.title},${tc.priority},${tc.expected}`
  )

  downloadFile(rows.join("\n"), "testcases.csv")
}
🎯 8. COMPONENT STRUCTURE
/app
  page.tsx

/components
  TestCaseForm.tsx
  TestCaseList.tsx
  TestCaseItem.tsx
  ExportButtons.tsx

/utils
  storage.ts
  export.ts
🧪 9. MVP BUILD PLAN
🗓️ Day 1

UI layout

Form

Add test case

🗓️ Day 2

List view

Edit/Delete

localStorage

🗓️ Day 3

Export (TXT/CSV)

UI polish

Deploy

🚀 10. DEPLOYMENT

Push to GitHub

Deploy via Vercel

Connect domain: test-case.dev

💰 11. MONETIZATION (LATER)
Phase 1 (FREE)

All core features

Phase 2 (₱99–₱199)

Unlock:

Unlimited test cases

Cloud save

Export formats

Phase 3

Team sharing

Project grouping

🔥 12. FUTURE FEATURES

Projects (group test cases)

Tags (login, payment, etc.)

Status (pass/fail)

Collaboration (teams)

API

🧠 13. POSITIONING
Tagline Ideas:

“Write test cases faster”

“Simple test case builder for developers”

“Organize your QA workflow”

🚨 FINAL ADVICE

This is IMPORTANT:

👉 Don’t add AI yet
👉 Don’t add accounts yet
👉 Don’t overbuild

Just:

Form

List

Export

Launch.