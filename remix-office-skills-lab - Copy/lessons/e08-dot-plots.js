window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "e08-dot-plots",
  group: "Excel & Data",
  title: "Dot Plots (Outliers, Clusters & Gaps)",
  lecture: "Lecture 5",
  goal: "Construct dot plots on a number line to identify frequency, isolated outliers, data clusters, and gaps in small numerical sets.",
  rules: [
    "A dot plot is a graphical representation of numerical data using a number line with 'x' marks or dots placed vertically above specific values to show their frequency of occurrence.",
    "Dot plots make three key distribution features immediately obvious:\n• Outliers: data points significantly larger or smaller than other values (e.g., ages 30 and 58).\n• Clusters: isolated groups of concentrated points (e.g., ages 46 through 50).\n• Gaps: large empty spaces between points (e.g., between 41 and 45).",
    "Excel does not have a native 1-click 'Dot Plot' button, but engineers construct it via an elegant COUNTIF + Scatter Plot workaround (advanced technique)."
  ],
  steps: [
    {
      text: "Sort your raw numerical data in Column A (e.g. A2:A31).",
      path: "Data > Sort A to Z"
    },
    {
      text: "In Column B (Y-axis vertical stack position), compute the vertical rank of duplicate values using the formula: =COUNTIF($A$2:A2, A2). Drag this formula down.",
      path: "Cell B2 > Type '=COUNTIF($A$2:A2, A2)' > Fill Down"
    },
    {
      text: "Highlight Column A (X-axis values) and Column B (Y-axis stack heights).",
      path: "Select Range A2:B31"
    },
    {
      text: "Go to Insert > Charts > Scatter > select 'Scatter with only Markers' (do not connect lines).",
      path: "Insert > Charts > Scatter > Scatter with only Markers"
    },
    {
      text: "Clean up the chart: delete the vertical Y-axis labels and horizontal gridlines so only the horizontal number line with stacked dots/x's remains visible.",
      path: "Chart Elements > Uncheck Vertical Axis & Gridlines"
    },
    {
      text: "To use 'x' symbols instead of circles: right-click any marker > Format Data Series... > Marker > Marker Options > Built-in > select 'x'.",
      path: "Format Data Series > Marker > Built-in: 'x'"
    }
  ],
  practice: "Analyze the 30 apartment resident ages from Lecture 5 slides 5-6:\n58, 30, 37, 36, 34, 49, 35, 40, 47, 47, 39, 54, 47, 48, 54, 50, 35, 40, 38, 47, 48, 34, 40, 46, 49, 47, 35, 48, 47, 46.\nVerify expected results:\n• Youngest: 30, Oldest: 58\n• Most common (mode): 47 (frequency = 6)\n• Outliers: 30 and 58\n• Cluster: ages 46 to 50\n• Gap: ages 41 to 45 (zero residents)",
  mistakes: [
    "Searching for a 'Dot Plot' chart type in standard Excel menus (must use the Scatter + COUNTIF workaround).",
    "Connecting the dots with a continuous line, which turns an independent occurrence count into an erroneous zigzag waveform.",
    "Overlooking outliers and reporting average numbers without addressing anomalous extreme values."
  ],
  check: [
    "Data points are plotted along a single calibrated horizontal number line.",
    "Frequencies stack vertically above each exact value.",
    "Outliers (30 and 58) are clearly separated by empty space.",
    "Cluster (46-50) and gap (41-45) are visually distinct."
  ]
});
