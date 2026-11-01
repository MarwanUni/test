window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "e01-entering-data-formulas",
  group: "Excel & Data",
  title: "Entering Data & Writing Formulas",
  lecture: "Lecture 5",
  goal: "Set up organized laboratory datasets in Excel, apply column headers in Row 1, and compute derived variables using '=' formulas.",
  rules: [
    "Always reserve Row 1 for descriptive column headers and units (e.g. 'Before (V)', 'After (V)', 'Difference (ΔV)').",
    "Every Excel formula or function must begin with the '=' equals symbol.",
    "Do not hardcode calculated numbers; use cell references (e.g., =B2-A2) so calculations update dynamically when data points change.",
    "Use cell formatting (Home > Number) to standardize decimal places."
  ],
  steps: [
    {
      text: "Open a blank Excel worksheet and click cell A1.",
      path: "Excel > Blank Workbook"
    },
    {
      text: "In Row 1, enter descriptive column headers: A1 = 'Before', B1 = 'After', C1 = 'Difference'.",
      path: "Row 1 (A1:C1)"
    },
    {
      text: "Enter your raw measurement values into columns A and B starting from row 2 downward (e.g., rows 2 to 11).",
      path: "Columns A & B (Rows 2:11)"
    },
    {
      text: "Click into cell C2 and type the subtraction formula: =B2-A2, then press Enter to calculate the first difference.",
      path: "Cell C2 > Type '=B2-A2'"
    },
    {
      text: "Hover your mouse over the bottom-right corner of cell C2 until the cursor turns into a black cross (fill handle), then double-click or drag down to cell C11 to populate all rows.",
      path: "Cell C2 > Drag AutoFill Handle downward"
    }
  ],
  practice: "Enter the Lecture 5 test dataset into Excel:\nBefore (Col A): 142, 140, 144, 144, 142, 146, 149, 148, 142, 148\nAfter (Col B): 140, 136, 147, 139, 143, 142, 145, 145, 138, 146\nIn C2, calculate =B2-A2 and fill down. Verify results: -2, -4, 3, -5, 1, -4, -4, -3, -4, -2.",
  mistakes: [
    "Typing 'B2-A2' without the leading '=' symbol, which causes Excel to store it as plain text instead of computing the result.",
    "Entering raw numbers without column headers, making it impossible to generate labeled charts later.",
    "Manually calculating values with a physical pocket calculator and typing results into Excel."
  ],
  check: [
    "Column labels are present in Row 1.",
    "Formula begins with '=' and references cell coordinates (e.g. =B2-A2).",
    "Formula is filled down to all 10 data rows.",
    "Calculated differences match expected values (e.g., Row 2 difference is -2)."
  ]
});
