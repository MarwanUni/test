window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "e05-pie-charts",
  group: "Excel & Data",
  title: "Pie Charts & Proportional Angles",
  lecture: "Lecture 5",
  goal: "Create 2-D pie and exploded pie charts for percentage distributions and calculate theoretical central sector angles (Percent × 3.6°).",
  rules: [
    "A circle graph (pie chart) consists of a circular region partitioned into disjoint sections, each representing a part or percentage of a whole (100%).",
    "A full circle corresponds to 360 degrees. The central angle for each sector is calculated by multiplying its percentage by 3.6 (Angle = % × 3.6°). The sum of all angles must equal 360°.",
    "Best practice rule: Use pie charts ONLY when you have few categories (3 to 6 max). Too many thin slices become unreadable.",
    "Pie charts do NOT possess X or Y coordinate axes."
  ],
  steps: [
    {
      text: "Enter category names in Column A and quantities/percentages in Column B.",
      path: "Worksheet > Input Data"
    },
    {
      text: "Highlight the data and category headers (e.g. A1:B5).",
      path: "Select Data Range"
    },
    {
      text: "Go to Insert > Charts group and click the 'Insert Pie or Doughnut Chart' icon.",
      path: "Insert > Charts > Pie Chart"
    },
    {
      text: "Select '2-D Pie' for a standard pie chart, or 'Exploded Pie' to emphasize individual sectors with separated slices.",
      path: "2-D Pie (Standard or Exploded)"
    },
    {
      text: "To display percentages on the slices: click the chart, click Chart Elements (+), check 'Data Labels', and select 'Percentage' via More Options.",
      path: "Chart Elements (+) > Data Labels > More Options > Percentage"
    },
    {
      text: "Theoretical manual calculation method: (1) Convert counts to percentages (Part / Total × 100), (2) Central angle = Percentage × 3.6°, (3) Verify sum = 360°.",
      path: "Formula: Central Angle = % × 3.6"
    }
  ],
  practice: "Calculate central angles and create a pie chart for the 1000-adult housekeeping survey (Lecture 5 slide 16):\n• In closet: 68% × 3.6 = 244.8°\n• Under bed: 23% × 3.6 = 82.8°\n• In bathtub: 6% × 3.6 = 21.6°\n• In freezer: 3% × 3.6 = 10.8°\nVerify sum: 244.8 + 82.8 + 21.6 + 10.8 = 360.0°. Enter into Excel and generate a 2-D Pie with percentage data labels.",
  mistakes: [
    "Using a pie chart for 12+ categories (such as all 12 health care expenditure rows), resulting in a crowded, unreadable rainbow wheel with slivers.",
    "Using pie charts when categories do NOT sum to 100% of a whole (e.g., questions where respondents could pick multiple answers).",
    "Relying on heavily tilted 3D pie charts that distort the front slice to appear misleadingly larger than rear slices."
  ],
  check: [
    "Slices sum to 100% (or 360 degrees).",
    "Number of categories is limited (≤ 6 slices for readability).",
    "Percentages or values are visible as data labels.",
    "No misleading 3D distortions."
  ]
});
