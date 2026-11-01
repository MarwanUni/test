window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "e02-summary-statistics",
  group: "Excel & Data",
  title: "Summary & Descriptive Statistics",
  lecture: "Lecture 5",
  goal: "Generate technical summary statistics (Mean, Standard Deviation, Standard Error, Sample Size) using Excel's Data Analysis ToolPak.",
  rules: [
    "Most-used statistical metrics required in technical engineering reports: Mean (average), Standard Deviation (spread), Standard Error (precision of sample mean), and Sample Size n (Count).",
    "Report statistics with consistent, sensible decimal precision (typically 2 to 4 decimal places).",
    "Never guess or manually compute large datasets by hand when presenting experimental results."
  ],
  steps: [
    {
      text: "If 'Data Analysis' does not appear on your Data tab: enable the Analysis ToolPak add-in via File > Options > Add-ins > Excel Add-ins (Go...) > check 'Analysis ToolPak' > OK (verify on your Office version).",
      path: "File > Options > Add-ins > Excel Add-ins > Analysis ToolPak"
    },
    {
      text: "Open your worksheet with sample data and switch to the Data tab on the ribbon.",
      path: "Data Tab"
    },
    {
      text: "In the Analysis group at the far right of the Data ribbon, click 'Data Analysis'.",
      path: "Data > Analysis > Data Analysis"
    },
    {
      text: "In the list of Analysis Tools, scroll and select 'Descriptive Statistics', then click OK.",
      path: "Data Analysis Dialog > Descriptive Statistics > OK"
    },
    {
      text: "Set 'Input Range' to your data cells (e.g. $A$2:$A$11 or click and highlight the column).",
      path: "Descriptive Statistics > Input Range: $A$2:$A$11"
    },
    {
      text: "Select 'Output Range' and pick an empty cell on your worksheet (e.g. $A$15 or $E$2) where the statistical table should be written.",
      path: "Descriptive Statistics > Output Range: $A$15"
    },
    {
      text: "Check the box labeled 'Summary statistics' so a checkmark appears, then click OK.",
      path: "Descriptive Statistics > [✓] Summary statistics > OK"
    }
  ],
  practice: "Run Descriptive Statistics on the 10 'Before' numbers: 142, 140, 144, 144, 142, 146, 149, 148, 142, 148. Verify against Dr. Christina's lecture slide 20 results:\n• Mean: 144.5\n• Standard Error: 0.98036\n• Standard Deviation: 3.10018 (~3.1002)\n• Sample Variance: 9.6111\n• Count (n): 10",
  mistakes: [
    "Looking for 'Data Analysis' when the Analysis ToolPak add-in is disabled in Excel options.",
    "Selecting text header cells in the Input Range without ticking 'Labels in first row', which triggers an 'Input range contains non-numeric data' error.",
    "Forgetting to tick the 'Summary statistics' checkbox, which produces a blank output table."
  ],
  check: [
    "Descriptive statistics table is generated on the worksheet.",
    "Mean matches 144.5.",
    "Standard Deviation matches ~3.1002.",
    "Count shows n = 10.",
    "Standard Error shows ~0.9804."
  ]
});
