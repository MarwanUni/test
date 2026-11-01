window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "e06-line-charts",
  group: "Excel & Data",
  title: "Line Charts (Continuous Trends Over Time)",
  lecture: "Lecture 5",
  goal: "Plot continuous time-series data to illustrate trends, putting time on the horizontal axis and the measured variable on the vertical axis.",
  rules: [
    "A line graph is particularly appropriate for representing data that varies continuously over time.",
    "Time (seconds, years, months) must ALWAYS be positioned on the horizontal scale (X-axis).",
    "The physical variable being measured (voltage, power, temperature, population) is placed on the vertical scale (Y-axis).",
    "Points are connected using line segments to communicate direction and rate of change.",
    "Do NOT use line charts for discrete categorical items (e.g. comparing different car brands or countries)."
  ],
  steps: [
    {
      text: "Organize two columns in Excel: Column A for time/years (e.g., Year 1860-1950) and Column B for the continuous variable (e.g., Population in millions).",
      path: "Worksheet > Col A (Time), Col B (Variable)"
    },
    {
      text: "Highlight both columns including headers (A1:B11).",
      path: "Select Range A1:B11"
    },
    {
      text: "Go to Insert > Charts group and click 'Insert Line or Area Chart'.",
      path: "Insert > Charts > Line Chart"
    },
    {
      text: "Select '2-D Line with Markers' (or standard 2-D Line) so individual data points are clearly distinguishable.",
      path: "2-D Line > Line with Markers"
    },
    {
      text: "Add technical axis titles: click Chart Elements (+), check 'Axis Titles', and set horizontal to 'Year' and vertical to 'Population (Millions)'.",
      path: "Chart Elements (+) > Axis Titles"
    },
    {
      text: "Format axes: right-click the horizontal axis > Format Axis > ensure Axis Type is set to 'Date axis' or 'Text axis' if years appear as numbers instead of category points.",
      path: "Right-Click Axis > Format Axis"
    }
  ],
  practice: "Enter the US Population (millions) dataset from Lecture 5 slide 14:\n1860: 31.4 | 1870: 39.8 | 1880: 50.2 | 1890: 62.9 | 1900: 76.0 | 1910: 92.0 | 1920: 105.7 | 1930: 122.8 | 1940: 131.7 | 1950: 151.1.\nCreate a Line Graph with markers. Verify that the curve shows a smooth upward exponential trend across the 90-year period.",
  mistakes: [
    "Placing the time variable on the vertical axis and the measured metric on the horizontal axis (reverses standard engineering convention).",
    "Using a line graph for unconnected categorical entities (e.g. connecting apples to oranges with a slope line, implying continuity).",
    "Excel plotting years as a second data series line rather than axis labels (fix by clicking 'Select Data' and setting Horizontal Axis Labels to Column A)."
  ],
  check: [
    "Time is plotted along the horizontal axis.",
    "Measured variable and units are on the vertical axis.",
    "Line connects sequential data points smoothly.",
    "Axis markers clearly highlight discrete sample moments."
  ]
});
