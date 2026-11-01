window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "e04-column-bar-charts",
  group: "Excel & Data",
  title: "Column & Bar Charts (Vertical, Horizontal & Double)",
  lecture: "Lecture 5",
  goal: "Construct vertical column charts, horizontal bar charts, and double bar graphs for categorical data comparisons.",
  rules: [
    "Bar graphs convey categorical data where the category axis represents a non-numerical attribute.",
    "Vertical bar charts are termed 'Column Charts' in Excel; horizontal representations are termed 'Bar Charts'.",
    "The length/height of each bar represents the quantitative magnitude we wish to compare.",
    "Use horizontal bar charts when category names are long to prevent awkward diagonal or clipped labels.",
    "A double bar graph displays 2 pieces of comparative information for each item (e.g. Day 1 vs. Day 2 sales or Model A vs. Model B)."
  ],
  steps: [
    {
      text: "Enter your categories in Column A and quantities in Column B (e.g. Health Care Expenditures data).",
      path: "Worksheet > Columns A & B"
    },
    {
      text: "Highlight data and headings (A1:B13).",
      path: "Select Range A1:B13"
    },
    {
      text: "Go to Insert > Charts group > click 'Insert Column or Bar Chart'.",
      path: "Insert > Charts > Column or Bar Chart"
    },
    {
      text: "For vertical columns: select the first 2-D option ('Clustered Column').",
      path: "2-D Column > Clustered Column"
    },
    {
      text: "For horizontal bars (e.g., Continents area dataset): select 2-D Bar > 'Clustered Bar' (places categories along vertical axis and numbers along horizontal axis).",
      path: "2-D Bar > Clustered Bar"
    },
    {
      text: "For double bar graphs: enter two numeric columns (e.g., Column B = 'Day 1 (kg)', Column C = 'Day 2 (kg)'). Highlight A1:C6 and insert Clustered Column/Bar to compare both series side-by-side with a legend.",
      path: "Insert > Clustered Column (Multi-series)"
    }
  ],
  practice: "Enter the Health Care Expenditures ($bn) from Lecture 5:\nHospital: 371 | Physician: 218 | Drugs & Supplies: 109 | Other Personal: 92 | Nursing Home: 83 | Dental: 51 | Admin & Insurance: 50 | Public Health: 39 | Home Health: 32 | Research: 18 | Construction: 17 | Eye & Equipment: 14.\nHighlight A1:B13 and insert a 2-D Clustered Column Chart. Also test horizontal layout with Continent areas: Africa 11.7, Asia 17.2, Europe 3.9, North America 9.4, Oceania 3.3, South America 6.9, Antarctica 5.5 (million sq mi).",
  mistakes: [
    "Using vertical columns for 15+ categories with long text names, causing labels to tilt at 45 degrees or truncate (switch to horizontal bars instead).",
    "Leaving the vertical Y-axis unlabelled (always add '$ (Billions)' or 'Area (sq mi)').",
    "Using 3D stacked columns when comparing distinct individual categories, which obscures comparison heights."
  ],
  check: [
    "Categories and numeric values are correctly mapped to axes.",
    "Axis title specifies measurement units ($bn, kg, million sq mi).",
    "Columns or bars are spaced cleanly without overlapping.",
    "Double bar charts include a clear legend differentiating Series 1 from Series 2."
  ]
});
