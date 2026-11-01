window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "e03-chart-anatomy",
  group: "Excel & Data",
  title: "Chart Anatomy & Fundamentals",
  lecture: "Lecture 5",
  goal: "Identify essential chart components (titles, plot area, axes, tick marks, legends) and format elements using Excel's contextual tools.",
  rules: [
    "A formal technical chart must include: Chart Title, Plot Area, Axis Titles (with units in parentheses, e.g. 'Time (s)'), X-axis & Y-axis with clear tick marks and labels, and a Legend (when displaying multiple series).",
    "Pie charts represent proportions of a whole and do NOT have X or Y axes.",
    "Always select data together with row/column labels so Excel names series automatically.",
    "Excel includes approximately 60 distinct chart variations (Column, Line, Scatter, Bar, Pie, Area, Surface, Radar, Histogram, etc.)."
  ],
  steps: [
    {
      text: "Select your table data including column headings and category labels (e.g., A1:B13).",
      path: "Worksheet > Highlight Data & Headers"
    },
    {
      text: "Go to the Insert tab and locate the 'Charts' group in the center of the ribbon.",
      path: "Insert > Charts"
    },
    {
      text: "Click your desired chart category icon (Column, Line, Pie, or Scatter) and choose the appropriate 2-D or 3-D subtype.",
      path: "Insert > Charts > [Select Chart Type]"
    },
    {
      text: "Add missing technical components: click the chart, click the green '+' (Chart Elements) icon at the top-right of the chart, and ensure 'Axis Titles', 'Chart Title', and 'Legend' are enabled.",
      path: "Chart Elements (+) > Axis Titles / Chart Title / Legend"
    },
    {
      text: "To format or recolor any individual component (e.g. Plot Area background, Gridlines, or Axis Tick Marks): right-click directly on that part of the chart and select 'Format [Element]...'.",
      path: "Right-Click Component > Format Axis / Format Data Series"
    }
  ],
  practice: "Create a simple 2-column table with 4 data points. Insert a 2-D Clustered Column chart. Click the Chart Elements '+' icon, add an Axis Title on the vertical axis ('Current (mA)'), and right-click the plot area to adjust its fill color.",
  mistakes: [
    "Omitting Axis Titles and measurement units, forcing readers to guess what the numbers represent.",
    "Keeping default placeholder titles like 'Chart Title' in the final technical report.",
    "Displaying a redundant Legend when there is only one data series already described by the axis title.",
    "Using decorative 3D effects that distort data perspective and make reading values inaccurate."
  ],
  check: [
    "Chart Title clearly describes the experiment or dataset.",
    "Both axes possess descriptive titles with physical engineering units (e.g., 'Power (W)', 'Temperature (°C)').",
    "Tick marks and axis numeric intervals are readable and evenly spaced.",
    "Legend is included only if two or more series are compared."
  ]
});
