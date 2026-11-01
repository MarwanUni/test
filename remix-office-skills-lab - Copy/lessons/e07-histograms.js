window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "e07-histograms",
  group: "Excel & Data",
  title: "Histograms & Frequency Distributions",
  lecture: "Lecture 5",
  goal: "Calculate class intervals (CW = (Max - Min) / k rounded UP), build a frequency distribution table, and plot a frequency histogram.",
  rules: [
    "Used for large sets of continuous or numerical data to reveal underlying distributions, skewness, and spread.",
    "Data is partitioned into k non-overlapping intervals called 'classes'. The count in each class is the 'class frequency'.",
    "Formula for Class Width: CW = (Largest data value - Smallest data value) / Desirable number of classes. Always round CW UP to the next highest whole number so intervals encompass all data points.",
    "Each interval has a lower-class limit and an upper-class limit (e.g. 41-50, 51-60).",
    "In a true histogram, adjacent column bars touch with zero gap width (unlike categorical bar charts which feature visible gaps)."
  ],
  steps: [
    {
      text: "Find the smallest value (e.g., 46) and largest value (e.g., 100). Choose number of classes k = 6. Calculate CW = (100 - 46) / 6 = 54 / 6 = 9. Round UP to CW = 10 so classes cleanly cover 41-50 through 91-100.",
      path: "Calculation: CW = (Max - Min) / k (Round UP)"
    },
    {
      text: "Method A (Built-in Excel 365/2016+ Chart): Highlight your raw numbers in Column A > go to Insert > Charts > click 'Insert Statistic Chart' > select 'Histogram'. Right-click horizontal axis > Format Axis to adjust Bin width.",
      path: "Insert > Charts > Statistic Chart > Histogram (Office 365 / 2016+)"
    },
    {
      text: "Method B (Data Analysis ToolPak - Universal across all versions): Create a 'Bin' column with upper limits (50, 60, 70, 80, 90, 100).",
      path: "Worksheet > Create Bin Column"
    },
    {
      text: "Go to Data > Data Analysis > select 'Histogram' > click OK.",
      path: "Data > Analysis > Data Analysis > Histogram"
    },
    {
      text: "Set Input Range to your raw scores ($A$1:$A$40), Bin Range to your bin column, check 'Chart Output', and click OK.",
      path: "Histogram Dialog > Input Range / Bin Range / [✓] Chart Output"
    },
    {
      text: "To format bars to touch (standard histogram convention): right-click the histogram bars > Format Data Series... > set 'Gap Width' to 0% (or 1-2%).",
      path: "Format Data Series > Gap Width: 0%"
    }
  ],
  practice: "Enter the 40 course test scores from Lecture 5 slide 7:\n65, 91, 85, 76, 85, 87, 79, 93, 82, 75, 100, 70, 88, 78, 83, 59, 87, 69, 89, 54, 74, 89, 83, 80, 94, 67, 77, 92, 82, 70, 94, 84, 96, 98, 46, 70, 90, 96, 88, 72.\nVerify 6 classes (41-50, 51-60, 61-70, 71-80, 81-90, 91-100) yield frequencies: 1, 2, 6, 8, 14, 9. Plot the histogram.",
  mistakes: [
    "Rounding class width CW down or keeping it fractional, which causes the highest score (e.g. 100) to fall outside the top bin.",
    "Leaving wide gaps between bars as if it were a categorical bar chart (in histograms, bars represent continuous intervals and should touch).",
    "Creating overlapping bin limits (e.g., 40-50, 50-60 where 50 is ambiguous; use 41-50 and 51-60)."
  ],
  check: [
    "Smallest and largest data points are accounted for.",
    "Class width CW is calculated correctly and rounded up.",
    "Class frequency table sums to the total sample count (N = 40).",
    "Histogram bars touch or have near-zero gap width."
  ]
});
