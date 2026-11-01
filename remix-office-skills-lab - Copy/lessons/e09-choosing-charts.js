window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "e09-choosing-charts",
  group: "Excel & Data",
  title: "Choosing the Right Chart (Decision Matrix)",
  lecture: "Lecture 5",
  goal: "Select the statistically sound chart type based on data type, sample size, and analytical objective.",
  rules: [
    "Dot Plot: Best for small numerical datasets (n < 35); shows every individual observation, identifies specific outliers, gaps, and clusters.",
    "Histogram: Best for large continuous or numerical datasets (n ≥ 30); groups data into class intervals (CW) to show underlying probability distributions and spread.",
    "Column / Bar Chart: Best for discrete categorical data (horizontal scale represents non-numerical attributes); length represents quantity to compare. Use horizontal bars for long labels.",
    "Line Graph: Best for data varying continuously over time (time strictly on horizontal axis, measured variable on vertical axis).",
    "Pie Chart: Strictly for proportions or percentages of a single whole (must sum to 100% or 360°); keep to ≤ 6 slices."
  ],
  steps: [
    {
      text: "Step 1: Determine Variable Type — Is your horizontal axis categorical (names, regions), continuous time (seconds, days, years), or numeric measurements (test scores, voltages)?",
      path: "Data Classification > Variable Nature"
    },
    {
      text: "Step 2: Check Sample Size — If numeric: small sample with individual points needing inspection? → Dot Plot (E08). Large sample requiring grouped intervals? → Histogram (E07).",
      path: "Decision Path > Numeric Data"
    },
    {
      text: "Step 3: Analyze Objective — If categorical: comparing magnitudes? → Column/Bar Chart (E04). Displaying shares of 100% with ≤ 6 slices? → Pie Chart (E05).",
      path: "Decision Path > Categorical Data"
    },
    {
      text: "Step 4: Check for Time Sequence — If tracking a physical phenomenon evolving continuously through time? → Line Graph (E06).",
      path: "Decision Path > Time-Series Data"
    },
    {
      text: "Step 5: Verify Standards — Ensure your chosen chart includes a Chart Title, descriptive Axis Titles with physical units, consistent tick marks, and an appropriate caption in Word.",
      path: "Engineering Verification"
    }
  ],
  practice: "Classify which chart you should use for each scenario:\n1. Hourly ambient temperature at a solar station across 24 hours → Line Chart (E06)\n2. Efficiency ratings for 4 different photovoltaic inverter brands → Column Chart (E04)\n3. Electric bill breakdown into 4 cost categories (generation, transmission, taxes, fees) summing to 100% → Pie Chart (E05)\n4. Voltage breakdown test on 200 semiconductor diodes → Histogram (E07)\n5. Arrival times of 15 student lab groups to inspect late outliers → Dot Plot (E08)",
  mistakes: [
    "Using a line graph for independent categories, which creates misleading interpolation lines between non-sequential items.",
    "Using a pie chart for items that do not sum to 100%, or with 15+ slices that turn into an unreadable visual puzzle.",
    "Using a categorical bar chart for continuous frequency data instead of a histogram with zero gap width.",
    "Choosing 3D charts for formal technical reports, which distorts visual perspective and scale reading."
  ],
  check: [
    "Selected chart directly matches the mathematical nature of the data.",
    "Continuous time data is plotted on a line graph.",
    "Proportions of a whole (≤ 6 categories) are plotted on a pie chart.",
    "Large numerical distributions are plotted as a histogram.",
    "Categorical comparisons are plotted as column or bar charts."
  ]
});
