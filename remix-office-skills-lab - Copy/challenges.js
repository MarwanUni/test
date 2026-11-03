/**
 * Office Skills Lab - Interactive Challenges & Auto-Checking Tasks
 * Benha University - Shoubra | ELE123 / ELE114 Technical Reports
 */

// Quiz / Understanding Check questions (preserved)
window.LESSON_CHALLENGES = {
  "l01-introduction-technical-reports": [
    {
      question: "Which statement best describes a technical report?",
      options: ["A personal diary with no intended audience", "Technical information communicated to a specific reader for a specific purpose", "A document that must contain only equations", "A collection of copied internet paragraphs"],
      correct: 1,
      explanation: "A technical report communicates technical information, facts, and conclusions to a specific reader for a specific purpose."
    },
    {
      question: "A report for financial experts should primarily do what?",
      options: ["Use unexplained equations and specialist terms", "Provide simple explanations and emphasize objectives, benefits, and outcomes", "Remove all results to keep it short", "Use the same detail as a specialist engineering report"],
      correct: 1,
      explanation: "Non-technical readers need plain explanations and are usually most interested in the overall objective, benefits, and outcomes."
    },
    {
      question: "Which example follows the ethical writing guidance?",
      options: ["The system completely eliminates all network problems.", "The result is presented without mentioning the small test sample.", "According to the source, the method achieved 95% accuracy on 50 samples; larger testing is still needed.", "A copied sentence is included without a citation."],
      correct: 2,
      explanation: "The ethical version cites or attributes the source, reports the condition, and states the limitation instead of overstating the result."
    },
    {
      question: "What should happen before the initial draft?",
      options: ["Choose a font and start typing unrelated paragraphs", "Define purpose and readers, research, and create an outline", "Write the conclusion with new evidence", "Copy a similar report"],
      correct: 1,
      explanation: "The lecture's process begins with purpose and readers, followed by research and an outline before drafting."
    },
    {
      type: "tf",
      question: "A technical report should be written for a specific reader and purpose.",
      options: ["True", "False"],
      correct: 0,
      explanation: "A technical report communicates technical information to a defined audience for a defined purpose."
    }
  ],
  "l02-basic-report-structure": [
    {
      question: "Which four questions organize a useful abstract?",
      options: ["Who, where, when, which", "Why, how, what, so what", "What font, what margin, what color, what size", "Before, during, after, appendix"],
      correct: 1,
      explanation: "The abstract covers purpose (why), method (how), results (what), and conclusions or recommendations (so what)."
    },
    {
      question: "Which item belongs primarily in the introduction?",
      options: ["The full reference entry for every source", "Context, motivation, purpose, limitations, and report organization", "A new result not discussed elsewhere", "A dedication to a family member"],
      correct: 1,
      explanation: "The introduction establishes context and purpose, explains motivation and limitations, and previews the report organization."
    },
    {
      question: "What should a conclusion avoid?",
      options: ["Summarizing supported findings", "Explaining why the findings matter", "Introducing new material or evidence", "Mentioning the report's objectives"],
      correct: 2,
      explanation: "A conclusion must be based on material already presented and should not introduce new evidence, background, or claims."
    },
    {
      question: "What is the relationship between an in-text citation and a reference list?",
      options: ["They are unrelated", "The citation marks the source where it is used and the reference list gives its full details", "The reference list replaces all citations", "Citations are used only on the cover page"],
      correct: 1,
      explanation: "In-text citations acknowledge sources at the point of use; the reference list supplies the complete publication details."
    },
    {
      type: "tf",
      question: "A conclusion may introduce important new evidence that was not discussed in the report.",
      options: ["True", "False"],
      correct: 1,
      explanation: "A conclusion should summarize and interpret supported material, not introduce new evidence or claims."
    }
  ],
  "w01-page-setup": [
    {
      question: "For an engineering technical report submitted for binding, what is the minimum required left-hand margin?",
      options: ["1.5 cm", "2.5 cm (1 inch)", "3.5 cm", "4.0 cm"],
      correct: 2,
      explanation: "Bound reports require a left margin of at least 3.5 cm to provide space for spiral or comb binding without obscuring text. Other three sides require 1.5 cm."
    },
    {
      question: "Which paper size is mandatory for ELE123 assessment submissions?",
      options: ["US Letter (8.5\" × 11\")", "A4 (8.27\" × 11.69\")", "Legal", "Executive"],
      correct: 1,
      explanation: "A4 paper (210 × 297 mm) is strictly required for technical report assessment at Benha University, printed single-sided."
    },
    {
      question: "Which page orientation is normally used for the main body of a technical report?",
      options: ["Portrait", "Landscape only", "Rotated 90 degrees on every page", "Book fold"],
      correct: 0,
      explanation: "Portrait orientation is the normal layout for the report body; landscape can be used selectively for unusually wide tables or figures."
    }
  ],
  "w02-cover-page": [
    {
      question: "According to course formatting rules, what page number must appear on the report title (cover) page?",
      options: ["Roman numeral 'i'", "Arabic numeral '1'", "No page number at all", "Page '0'"],
      correct: 2,
      explanation: "The title page must NEVER display a page number. Word's built-in cover page tool automatically activates 'Different First Page' to suppress numbering."
    },
    {
      question: "Which of the following is required on the technical report title page?",
      options: ["Course code, report title, student name, student ID, and submission date", "Abstract and executive summary", "List of references", "Table of contents"],
      correct: 0,
      explanation: "The title page must clearly state the document title, author name, student ID, course details (ELE123 / ELE114), and submission date."
    }
  ],
  "w03-page-numbering": [
    {
      question: "What numbering scheme must be used for preliminary pages (Abstract, TOC, Lists)?",
      options: ["Arabic numerals (1, 2, 3...)", "Roman numerals (i, ii, iii...)", "Alphabetical letters (A, B, C...)", "No numbers are allowed"],
      correct: 1,
      explanation: "Preliminary front matter pages are numbered with lowercase Roman numerals (i, ii, iii...), while the main body restarts at Arabic 1."
    },
    {
      question: "Before restarting page numbering at 1 for the Introduction, what must you do in Header & Footer Tools?",
      options: ["Delete the header in Section 1", "Turn off 'Link to Previous'", "Change margins to 1.5 cm", "Insert an empty table"],
      correct: 1,
      explanation: "You must unlink the body header/footer by clicking 'Link to Previous' to deactivate it, preventing edits from propagating back to the preliminary pages."
    }
  ],
  "w04-headers-footers": [
    {
      question: "At what font size should the student name and ID appear in the report footer?",
      options: ["12 point", "10 point", "9 point", "8 point"],
      correct: 2,
      explanation: "Lecture 3 explicitly states: 'Student name and ID number can appear in a footer in 9-point size.'"
    },
    {
      question: "Why must two different headers/footers be created in Word?",
      options: ["To separate the preliminary pages from the report body text", "Because Word limits footers to 3 pages", "To allow different font families on each page", "It is optional"],
      correct: 0,
      explanation: "Two separate headers/footers are needed so preliminary pages have their own Roman numerals and metadata separated from the main body."
    }
  ],
  "w05-text-formatting": [
    {
      question: "What is the standard font family and size for report body text?",
      options: ["11 pt Calibri", "12 pt Times New Roman", "14 pt Arial", "10 pt Courier New"],
      correct: 1,
      explanation: "12-point Times New Roman is standard for report body text. 10-point is permitted for figures and tables."
    },
    {
      question: "How should technical report headings be capitalized?",
      options: ["ALL CAPS FOR ALL HEADINGS", "Title Case: Capitalize Every Single Word", "Sentence Case: Capitalize only the first word (except acronyms/proper names)", "Small caps"],
      correct: 2,
      explanation: "Lecture 3 rule: 'Capital letters are used for the first letter of the first word in each heading only; except for any acronyms (e.g. IEEE), trade names, or personal names and places.'"
    },
    {
      question: "What text alignment is required for all report body paragraphs?",
      options: ["Left-aligned (ragged right)", "Centered", "Fully Justified (aligned to both right and left margins)", "Right-aligned"],
      correct: 2,
      explanation: "Body text must be fully justified (Ctrl+J) to give clean, professional formal margins on both sides."
    },
    {
      type: "tf",
      question: "A report may use a different font family for every section to make the document more interesting.",
      options: ["True", "False"],
      correct: 1,
      explanation: "Consistent typography improves readability and gives the technical report a professional, unified appearance."
    }
  ],
  "w06-headings-toc": [
    {
      question: "What are the required heading sizes for First-level and Second-level headings?",
      options: ["Level 1: 18 pt bold, Level 2: 16 pt bold", "Level 1: 16 pt bold, Level 2: 14 pt bold", "Level 1: 14 pt bold, Level 2: 12 pt bold", "Level 1: 12 pt bold, Level 2: 10 pt bold"],
      correct: 1,
      explanation: "Lecture 3 & 4 rule: First-level = 16 bold, Second-level = 14 bold, Third-level = 12 bold, Fourth-level = 12 bold italics."
    },
    {
      question: "Why does an automatic Table of Contents display 'No table of contents entries found'?",
      options: ["The document has more than 10 pages", "Headings were formatted with manual font tools instead of built-in Heading styles", "The paper size is set to A4", "The font color is black"],
      correct: 1,
      explanation: "Word's automatic TOC generator searches specifically for Heading 1, Heading 2, and Heading 3 styles. Manually bolded text is ignored."
    }
  ],
  "w07-line-spacing": [
    {
      question: "What line spacing is standard for assessed engineering coursework?",
      options: ["Single spacing (1.0)", "1.15 line spacing", "1.5 line spacing", "Double spacing (2.0)"],
      correct: 2,
      explanation: "1.5 line spacing is generally used for work submitted for assessment to leave clear legibility for evaluator notes."
    },
    {
      question: "When should extra spacing be added beyond normal 1.5 line spacing?",
      options: ["Only on the title page", "To separate paragraphs, figures, tables, equations, and main headings from preceding text", "Between every single word", "Never"],
      correct: 1,
      explanation: "Extra spacing is required to separate paragraphs, figures, tables, equations, long quotations, and main headings from prior text."
    }
  ],
  "w08-indentation-centering": [
    {
      question: "When is paragraph first-line indentation NOT necessary?",
      options: ["If the paragraph is in bold", "If an extra line space is inserted between paragraphs", "In the introduction section", "When using Times New Roman"],
      correct: 1,
      explanation: "Lecture 3 rule: 'Indenting text at the beginning of a paragraph is necessary. But if an extra line space is inserted between paragraphs, no need for the indentation.'"
    },
    {
      question: "What alignment must be applied to figures and tables in the document?",
      options: ["Left-aligned against the margin", "Centered horizontally in the text", "Right-aligned", "Justified to margins"],
      correct: 1,
      explanation: "All figures and tables should be centered horizontally on the page."
    }
  ],
  "w09-figures": [
    {
      question: "Where must a figure caption be positioned, and how should the label be styled?",
      options: ["ABOVE the figure in italic", "BELOW the figure in BOLD with consecutive numbering", "To the right side of the figure", "In the document footer"],
      correct: 1,
      explanation: "Figure captions must be positioned strictly BELOW the figure, with the label and consecutive number in BOLD (e.g. 'Fig. 1. Circuit diagram')."
    },
    {
      question: "Which of the following phrases is strictly forbidden when referencing figures in technical reports?",
      options: ["'as shown in Figure 2'", "'see Fig. 2'", "'refer to the figure above'", "'in accordance with Figure 2'"],
      correct: 2,
      explanation: "Relative spatial references like 'the figure above' or 'the table below' are forbidden because figures shift during page reformatting. Always cite by number: 'see Figure 2'."
    }
  ],
  "w10-tables": [
    {
      question: "Where must a table caption be placed?",
      options: ["BELOW the table", "ABOVE the table in BOLD with consecutive numbering", "Inside the first cell", "In the document header"],
      correct: 1,
      explanation: "Table captions must be placed strictly ABOVE the table (opposite of figures), with bold label and number (e.g., 'Table 1: Measured Parameters')."
    },
    {
      question: "What symbol must be entered into a table cell when no data is available?",
      options: ["Leave it completely blank", "Write 'N/A' or 'nothing'", "An em-dash (—)", "A question mark (?)"],
      correct: 2,
      explanation: "Lecture 3 rule: 'Tables summarize data in rows and columns; a dash (—) indicates no data.' Blank cells look like accidental omissions."
    },
    {
      type: "tf",
      question: "Table captions are placed above the table, while figure captions are placed below the figure.",
      options: ["True", "False"],
      correct: 0,
      explanation: "This opposite caption placement is the required convention for technical reports."
    }
  ],
  "w11-tables-figures-lists": [
    {
      question: "What is required before Word can generate an automated Table of Figures or Table of Tables?",
      options: ["All figures/tables must have captions added using References > Insert Caption", "The document must be saved as PDF", "All figures must be converted to PNG", "Page numbers must be in Roman numerals"],
      correct: 0,
      explanation: "Word builds the lists by harvesting the automated Caption fields. If captions were typed as normal text, Word finds no entries."
    }
  ],
  "w12-equations": [
    {
      question: "How should mathematical equations be formatted and referenced?",
      options: ["Left-aligned and referred to as 'the equation above'", "Centered on the line, numbered consecutively in parentheses (1), and referred to as 'eqn. (1)'", "Placed inside footnotes", "Inserted as screenshots without numbers"],
      correct: 1,
      explanation: "All equations must be centered, numbered in parentheses at the right margin (1), and cited in text as 'as explained by eqn. (1)'."
    }
  ],
  "w13-citations-references": [
    {
      question: "What in-text citation format is standard for Electrical Engineering technical reports?",
      options: ["Author-Date: (Smith, 2024)", "IEEE bracketed numbers: [1], [2]", "Footnote superscripts: * and **", "Underlined website URLs"],
      correct: 1,
      explanation: "IEEE style with bracketed consecutive numbers [1], [2] is standard for Electrical Engineering at Benha University."
    }
  ],
  "w14-styles-themes": [
    {
      question: "In Word, what causes modified heading formatting to unexpectedly cascade into unwanted styles?",
      options: ["Using A4 paper size", "The heading styles are based on the 'Normal' style", "The Navigation Pane is open", "The document is too long"],
      correct: 1,
      explanation: "Most default styles inherit from 'Normal'. To avoid the cascade trap, set 'Style based on: (no style)' when customizing heading styles."
    }
  ],
  "e01-entering-data-formulas": [
    {
      question: "With Before values in column A (Row 2) and After values in column B (Row 2), what formula computes the difference in C2?",
      options: ["B2-A2", "=B2-A2", "=SUBTRACT(A2, B2)", "DIFFERENCE(B2, A2)"],
      correct: 1,
      explanation: "Every Excel formula must start with '='. The difference is calculated as =B2-A2."
    }
  ],
  "e02-summary-statistics": [
    {
      question: "Which four summary statistics are most commonly required in engineering laboratory reports?",
      options: ["Mean, Standard Deviation, Standard Error, and Sample Size (n)", "Mode, Kurtosis, Skewness, and Minimum", "Sum, Median, Maximum, and Range", "Count, Average, Variance, and Logarithm"],
      correct: 0,
      explanation: "Lecture 5 highlights Mean, Standard Deviation, Standard Error, and Count (sample size) as the 4 primary report summary metrics."
    },
    {
      type: "tf",
      question: "The standard error describes the spread of individual measurements in exactly the same way as standard deviation.",
      options: ["True", "False"],
      correct: 1,
      explanation: "Standard deviation describes measurement spread; standard error describes the uncertainty of an estimated mean."
    }
  ],
  "e03-chart-anatomy": [
    {
      question: "Which of the following chart types does NOT possess X or Y coordinate axes?",
      options: ["Clustered Column Chart", "Line Graph", "Pie Chart", "Scatter Plot"],
      correct: 2,
      explanation: "Pie charts partition a circular region into percentage sectors and do not have Cartesian X or Y axes."
    }
  ],
  "e04-column-bar-charts": [
    {
      question: "When is a horizontal Bar Chart preferred over a vertical Column Chart?",
      options: ["When comparing continuous time data", "When category label names are long and would otherwise tilt or clip", "When displaying percentages summing to 100%", "When data has no numerical values"],
      correct: 1,
      explanation: "Horizontal bar charts provide ample vertical space for long descriptive labels (e.g., continent names or expenditure categories) without awkward diagonal text."
    }
  ],
  "e05-pie-charts": [
    {
      question: "If a survey category represents 23% of respondents, what is its central angle on a pie chart?",
      options: ["23.0°", "46.0°", "82.8°", "90.0°"],
      correct: 2,
      explanation: "Central angle = percentage × 3.6°. Thus: 23 × 3.6 = 82.8 degrees."
    }
  ],
  "e06-line-charts": [
    {
      question: "On a technical line chart displaying time-series data, which variable belongs on the horizontal axis?",
      options: ["The measured output variable (e.g. population or voltage)", "Time (e.g. seconds, hours, years)", "The student ID", "A random categorical index"],
      correct: 1,
      explanation: "Time must ALWAYS be placed on the horizontal scale (X-axis), and the measured variable on the vertical scale (Y-axis)."
    }
  ],
  "e07-histograms": [
    {
      question: "If the smallest score is 46, largest is 100, and 6 classes are desired, what is Class Width (CW)?",
      options: ["(100 - 46) / 6 = 9 (round up to 9 or 10)", "100 / 6 = 16.6", "46 + 6 = 52", "(100 + 46) / 6 = 24.3"],
      correct: 0,
      explanation: "CW = (Max - Min) / k = (100 - 46) / 6 = 9. Rounded up to cover all data points cleanly, giving intervals of 9 or 10."
    }
  ],
  "e08-dot-plots": [
    {
      question: "What distinct data distribution features are revealed at a glance by a dot plot?",
      options: ["Three-dimensional shading and lighting", "Outliers, isolated clusters of points, and gaps", "Continuous polynomial regressions", "Correlation coefficients only"],
      correct: 1,
      explanation: "Dot plots make outliers (isolated extreme points), clusters (groups of values), and gaps (empty stretches) immediately noticeable."
    }
  ],
  "e09-choosing-charts": [
    {
      question: "Which chart is recommended when analyzing 20 experimental temperature values to check for isolated extreme outliers?",
      options: ["Pie chart with 20 slices", "Dot plot", "3D clustered column", "Radar chart"],
      correct: 1,
      explanation: "For small numerical sets (n < 30) where every individual value and outlier needs inspection, a dot plot is ideal."
    },
    {
      question: "Which chart is generally the clearest choice for showing how a measured value changes over time?",
      options: ["Line chart", "Pie chart", "Table of unrelated colors", "3D doughnut chart"],
      correct: 0,
      explanation: "A line chart connects ordered time-series values so trends, rises, falls, and changes can be inspected clearly."
    }
  ],
  "r01-report-checklist": [
    {
      question: "What is the official submission deadline for the ELE123 Technical Report?",
      options: ["Tuesday, 10 November 2026", "Tuesday, 17 November 2026", "Thursday, 20 November 2026", "End of semester"],
      correct: 1,
      explanation: "The official deadline specified in Dr. Christina Gamal's Lecture 5 assignment slide is Tuesday, 17 November 2026."
    }
  ]
};

// Auto-Checking Simulator Tasks for all 140 lesson steps
window.LESSON_TASKS = {
  "e01-entering-data-formulas": [
    {
      id: "e01_entering_data_formulas_0",
      lessonId: "e01-entering-data-formulas",
      stepIndex: 0,
      app: "excel",
      path: "Excel > Blank Workbook",
      instruction: "Open a blank Excel worksheet and click cell A1.",
      hint: "Menu path: Excel > Blank Workbook. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e01-entering-data-formulas", stepIndex: 0 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e01_entering_data_formulas_0"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Excel > Blank Workbook" };
      }
    },
    {
      id: "e01_entering_data_formulas_1",
      lessonId: "e01-entering-data-formulas",
      stepIndex: 1,
      app: "excel",
      path: "Row 1 (A1:C1)",
      instruction: "In Row 1, enter descriptive column headers: A1 = 'Before', B1 = 'After', C1 = 'Difference'.",
      hint: "Menu path: Row 1 (A1:C1). Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e01-entering-data-formulas", stepIndex: 1 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e01_entering_data_formulas_1"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Row 1 (A1:C1)" };
      }
    },
    {
      id: "e01_entering_data_formulas_2",
      lessonId: "e01-entering-data-formulas",
      stepIndex: 2,
      app: "excel",
      path: "Columns A & B (Rows 2:11)",
      instruction: "Enter your raw measurement values into columns A and B starting from row 2 downward (e.g., rows 2 to 11).",
      hint: "Menu path: Columns A & B (Rows 2:11). Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e01-entering-data-formulas", stepIndex: 2 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e01_entering_data_formulas_2"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Columns A & B (Rows 2:11)" };
      }
    },
    {
      id: "e01_entering_data_formulas_3",
      lessonId: "e01-entering-data-formulas",
      stepIndex: 3,
      app: "excel",
      path: "Cell C2 > Type '=B2-A2'",
      instruction: "Click into cell C2 and type the subtraction formula: =B2-A2, then press Enter to calculate the first difference.",
      hint: "Menu path: Cell C2 > Type '=B2-A2'. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e01-entering-data-formulas", stepIndex: 3 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e01_entering_data_formulas_3"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Cell C2 > Type '=B2-A2'" };
      }
    },
    {
      id: "e01_entering_data_formulas_4",
      lessonId: "e01-entering-data-formulas",
      stepIndex: 4,
      app: "excel",
      path: "Cell C2 > Drag AutoFill Handle downward",
      instruction: "Hover your mouse over the bottom-right corner of cell C2 until the cursor turns into a black cross (fill handle), then double-click or drag down to cell C11 to populate all rows.",
      hint: "Menu path: Cell C2 > Drag AutoFill Handle downward. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e01-entering-data-formulas", stepIndex: 4 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e01_entering_data_formulas_4"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Cell C2 > Drag AutoFill Handle downward" };
      }
    }
  ],
  "e02-summary-statistics": [
    {
      id: "e02_summary_statistics_0",
      lessonId: "e02-summary-statistics",
      stepIndex: 0,
      app: "excel",
      path: "File > Options > Add-ins > Excel Add-ins > Analysis ToolPak",
      instruction: "If 'Data Analysis' does not appear on your Data tab: enable the Analysis ToolPak add-in via File > Options > Add-ins > Excel Add-ins (Go...) > check 'Analysis ToolPak' > OK (verify on your Office version).",
      hint: "Menu path: File > Options > Add-ins > Excel Add-ins > Analysis ToolPak. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e02-summary-statistics", stepIndex: 0 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e02_summary_statistics_0"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: File > Options > Add-ins > Excel Add-ins > Analysis ToolPak" };
      }
    },
    {
      id: "e02_summary_statistics_1",
      lessonId: "e02-summary-statistics",
      stepIndex: 1,
      app: "excel",
      path: "Data Tab",
      instruction: "Open your worksheet with sample data and switch to the Data tab on the ribbon.",
      hint: "Menu path: Data Tab. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e02-summary-statistics", stepIndex: 1 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e02_summary_statistics_1"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Data Tab" };
      }
    },
    {
      id: "e02_summary_statistics_2",
      lessonId: "e02-summary-statistics",
      stepIndex: 2,
      app: "excel",
      path: "Data > Analysis > Data Analysis",
      instruction: "In the Analysis group at the far right of the Data ribbon, click 'Data Analysis'.",
      hint: "Menu path: Data > Analysis > Data Analysis. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e02-summary-statistics", stepIndex: 2 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e02_summary_statistics_2"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Data > Analysis > Data Analysis" };
      }
    },
    {
      id: "e02_summary_statistics_3",
      lessonId: "e02-summary-statistics",
      stepIndex: 3,
      app: "excel",
      path: "Data Analysis Dialog > Descriptive Statistics > OK",
      instruction: "In the list of Analysis Tools, scroll and select 'Descriptive Statistics', then click OK.",
      hint: "Menu path: Data Analysis Dialog > Descriptive Statistics > OK. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e02-summary-statistics", stepIndex: 3 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e02_summary_statistics_3"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Data Analysis Dialog > Descriptive Statistics > OK" };
      }
    },
    {
      id: "e02_summary_statistics_4",
      lessonId: "e02-summary-statistics",
      stepIndex: 4,
      app: "excel",
      path: "Descriptive Statistics > Input Range: $A$2:$A$11",
      instruction: "Set 'Input Range' to your data cells (e.g. $A$2:$A$11 or click and highlight the column).",
      hint: "Menu path: Descriptive Statistics > Input Range: $A$2:$A$11. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e02-summary-statistics", stepIndex: 4 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e02_summary_statistics_4"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Descriptive Statistics > Input Range: $A$2:$A$11" };
      }
    },
    {
      id: "e02_summary_statistics_5",
      lessonId: "e02-summary-statistics",
      stepIndex: 5,
      app: "excel",
      path: "Descriptive Statistics > Output Range: $A$15",
      instruction: "Select 'Output Range' and pick an empty cell on your worksheet (e.g. $A$15 or $E$2) where the statistical table should be written.",
      hint: "Menu path: Descriptive Statistics > Output Range: $A$15. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e02-summary-statistics", stepIndex: 5 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e02_summary_statistics_5"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Descriptive Statistics > Output Range: $A$15" };
      }
    },
    {
      id: "e02_summary_statistics_6",
      lessonId: "e02-summary-statistics",
      stepIndex: 6,
      app: "excel",
      path: "Descriptive Statistics > [✓] Summary statistics > OK",
      instruction: "Check the box labeled 'Summary statistics' so a checkmark appears, then click OK.",
      hint: "Menu path: Descriptive Statistics > [✓] Summary statistics > OK. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e02-summary-statistics", stepIndex: 6 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e02_summary_statistics_6"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Descriptive Statistics > [✓] Summary statistics > OK" };
      }
    }
  ],
  "e03-chart-anatomy": [
    {
      id: "e03_chart_anatomy_0",
      lessonId: "e03-chart-anatomy",
      stepIndex: 0,
      app: "excel",
      path: "Worksheet > Highlight Data & Headers",
      instruction: "Select your table data including column headings and category labels (e.g., A1:B13).",
      hint: "Menu path: Worksheet > Highlight Data & Headers. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e03-chart-anatomy", stepIndex: 0 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e03_chart_anatomy_0"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Worksheet > Highlight Data & Headers" };
      }
    },
    {
      id: "e03_chart_anatomy_1",
      lessonId: "e03-chart-anatomy",
      stepIndex: 1,
      app: "excel",
      path: "Insert > Charts",
      instruction: "Go to the Insert tab and locate the 'Charts' group in the center of the ribbon.",
      hint: "Menu path: Insert > Charts. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e03-chart-anatomy", stepIndex: 1 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e03_chart_anatomy_1"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Insert > Charts" };
      }
    },
    {
      id: "e03_chart_anatomy_2",
      lessonId: "e03-chart-anatomy",
      stepIndex: 2,
      app: "excel",
      path: "Insert > Charts > [Select Chart Type]",
      instruction: "Click your desired chart category icon (Column, Line, Pie, or Scatter) and choose the appropriate 2-D or 3-D subtype.",
      hint: "Menu path: Insert > Charts > [Select Chart Type]. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e03-chart-anatomy", stepIndex: 2 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e03_chart_anatomy_2"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Insert > Charts > [Select Chart Type]" };
      }
    },
    {
      id: "e03_chart_anatomy_3",
      lessonId: "e03-chart-anatomy",
      stepIndex: 3,
      app: "excel",
      path: "Chart Elements (+) > Axis Titles / Chart Title / Legend",
      instruction: "Add missing technical components: click the chart, click the green '+' (Chart Elements) icon at the top-right of the chart, and ensure 'Axis Titles', 'Chart Title', and 'Legend' are enabled.",
      hint: "Menu path: Chart Elements (+) > Axis Titles / Chart Title / Legend. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e03-chart-anatomy", stepIndex: 3 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e03_chart_anatomy_3"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Chart Elements (+) > Axis Titles / Chart Title / Legend" };
      }
    },
    {
      id: "e03_chart_anatomy_4",
      lessonId: "e03-chart-anatomy",
      stepIndex: 4,
      app: "excel",
      path: "Right-Click Component > Format Axis / Format Data Series",
      instruction: "To format or recolor any individual component (e.g. Plot Area background, Gridlines, or Axis Tick Marks): right-click directly on that part of the chart and select 'Format [Element]...'.",
      hint: "Menu path: Right-Click Component > Format Axis / Format Data Series. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e03-chart-anatomy", stepIndex: 4 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e03_chart_anatomy_4"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Right-Click Component > Format Axis / Format Data Series" };
      }
    }
  ],
  "e04-column-bar-charts": [
    {
      id: "e04_column_bar_charts_0",
      lessonId: "e04-column-bar-charts",
      stepIndex: 0,
      app: "excel",
      path: "Worksheet > Columns A & B",
      instruction: "Enter your categories in Column A and quantities in Column B (e.g. Health Care Expenditures data).",
      hint: "Menu path: Worksheet > Columns A & B. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e04-column-bar-charts", stepIndex: 0 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e04_column_bar_charts_0"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Worksheet > Columns A & B" };
      }
    },
    {
      id: "e04_column_bar_charts_1",
      lessonId: "e04-column-bar-charts",
      stepIndex: 1,
      app: "excel",
      path: "Select Range A1:B13",
      instruction: "Highlight data and headings (A1:B13).",
      hint: "Menu path: Select Range A1:B13. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e04-column-bar-charts", stepIndex: 1 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e04_column_bar_charts_1"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Select Range A1:B13" };
      }
    },
    {
      id: "e04_column_bar_charts_2",
      lessonId: "e04-column-bar-charts",
      stepIndex: 2,
      app: "excel",
      path: "Insert > Charts > Column or Bar Chart",
      instruction: "Go to Insert > Charts group > click 'Insert Column or Bar Chart'.",
      hint: "Menu path: Insert > Charts > Column or Bar Chart. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e04-column-bar-charts", stepIndex: 2 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e04_column_bar_charts_2"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Insert > Charts > Column or Bar Chart" };
      }
    },
    {
      id: "e04_column_bar_charts_3",
      lessonId: "e04-column-bar-charts",
      stepIndex: 3,
      app: "excel",
      path: "2-D Column > Clustered Column",
      instruction: "For vertical columns: select the first 2-D option ('Clustered Column').",
      hint: "Menu path: 2-D Column > Clustered Column. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e04-column-bar-charts", stepIndex: 3 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e04_column_bar_charts_3"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: 2-D Column > Clustered Column" };
      }
    },
    {
      id: "e04_column_bar_charts_4",
      lessonId: "e04-column-bar-charts",
      stepIndex: 4,
      app: "excel",
      path: "2-D Bar > Clustered Bar",
      instruction: "For horizontal bars (e.g., Continents area dataset): select 2-D Bar > 'Clustered Bar' (places categories along vertical axis and numbers along horizontal axis).",
      hint: "Menu path: 2-D Bar > Clustered Bar. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e04-column-bar-charts", stepIndex: 4 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e04_column_bar_charts_4"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: 2-D Bar > Clustered Bar" };
      }
    },
    {
      id: "e04_column_bar_charts_5",
      lessonId: "e04-column-bar-charts",
      stepIndex: 5,
      app: "excel",
      path: "Insert > Clustered Column (Multi-series)",
      instruction: "For double bar graphs: enter two numeric columns (e.g., Column B = 'Day 1 (kg)', Column C = 'Day 2 (kg)'). Highlight A1:C6 and insert Clustered Column/Bar to compare both series side-by-side with a legend.",
      hint: "Menu path: Insert > Clustered Column (Multi-series). Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e04-column-bar-charts", stepIndex: 5 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e04_column_bar_charts_5"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Insert > Clustered Column (Multi-series)" };
      }
    }
  ],
  "e05-pie-charts": [
    {
      id: "e05_pie_charts_0",
      lessonId: "e05-pie-charts",
      stepIndex: 0,
      app: "excel",
      path: "Worksheet > Input Data",
      instruction: "Enter category names in Column A and quantities/percentages in Column B.",
      hint: "Menu path: Worksheet > Input Data. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e05-pie-charts", stepIndex: 0 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e05_pie_charts_0"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Worksheet > Input Data" };
      }
    },
    {
      id: "e05_pie_charts_1",
      lessonId: "e05-pie-charts",
      stepIndex: 1,
      app: "excel",
      path: "Select Data Range",
      instruction: "Highlight the data and category headers (e.g. A1:B5).",
      hint: "Menu path: Select Data Range. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e05-pie-charts", stepIndex: 1 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e05_pie_charts_1"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Select Data Range" };
      }
    },
    {
      id: "e05_pie_charts_2",
      lessonId: "e05-pie-charts",
      stepIndex: 2,
      app: "excel",
      path: "Insert > Charts > Pie Chart",
      instruction: "Go to Insert > Charts group and click the 'Insert Pie or Doughnut Chart' icon.",
      hint: "Menu path: Insert > Charts > Pie Chart. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e05-pie-charts", stepIndex: 2 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e05_pie_charts_2"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Insert > Charts > Pie Chart" };
      }
    },
    {
      id: "e05_pie_charts_3",
      lessonId: "e05-pie-charts",
      stepIndex: 3,
      app: "excel",
      path: "2-D Pie (Standard or Exploded)",
      instruction: "Select '2-D Pie' for a standard pie chart, or 'Exploded Pie' to emphasize individual sectors with separated slices.",
      hint: "Menu path: 2-D Pie (Standard or Exploded). Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e05-pie-charts", stepIndex: 3 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e05_pie_charts_3"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: 2-D Pie (Standard or Exploded)" };
      }
    },
    {
      id: "e05_pie_charts_4",
      lessonId: "e05-pie-charts",
      stepIndex: 4,
      app: "excel",
      path: "Chart Elements (+) > Data Labels > More Options > Percentage",
      instruction: "To display percentages on the slices: click the chart, click Chart Elements (+), check 'Data Labels', and select 'Percentage' via More Options.",
      hint: "Menu path: Chart Elements (+) > Data Labels > More Options > Percentage. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e05-pie-charts", stepIndex: 4 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e05_pie_charts_4"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Chart Elements (+) > Data Labels > More Options > Percentage" };
      }
    },
    {
      id: "e05_pie_charts_5",
      lessonId: "e05-pie-charts",
      stepIndex: 5,
      app: "excel",
      path: "Formula: Central Angle = % × 3.6",
      instruction: "Theoretical manual calculation method: (1) Convert counts to percentages (Part / Total × 100), (2) Central angle = Percentage × 3.6°, (3) Verify sum = 360°.",
      hint: "Menu path: Formula: Central Angle = % × 3.6. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e05-pie-charts", stepIndex: 5 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e05_pie_charts_5"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Formula: Central Angle = % × 3.6" };
      }
    }
  ],
  "e06-line-charts": [
    {
      id: "e06_line_charts_0",
      lessonId: "e06-line-charts",
      stepIndex: 0,
      app: "excel",
      path: "Worksheet > Col A (Time), Col B (Variable)",
      instruction: "Organize two columns in Excel: Column A for time/years (e.g., Year 1860-1950) and Column B for the continuous variable (e.g., Population in millions).",
      hint: "Menu path: Worksheet > Col A (Time), Col B (Variable). Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e06-line-charts", stepIndex: 0 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e06_line_charts_0"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Worksheet > Col A (Time), Col B (Variable)" };
      }
    },
    {
      id: "e06_line_charts_1",
      lessonId: "e06-line-charts",
      stepIndex: 1,
      app: "excel",
      path: "Select Range A1:B11",
      instruction: "Highlight both columns including headers (A1:B11).",
      hint: "Menu path: Select Range A1:B11. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e06-line-charts", stepIndex: 1 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e06_line_charts_1"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Select Range A1:B11" };
      }
    },
    {
      id: "e06_line_charts_2",
      lessonId: "e06-line-charts",
      stepIndex: 2,
      app: "excel",
      path: "Insert > Charts > Line Chart",
      instruction: "Go to Insert > Charts group and click 'Insert Line or Area Chart'.",
      hint: "Menu path: Insert > Charts > Line Chart. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e06-line-charts", stepIndex: 2 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e06_line_charts_2"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Insert > Charts > Line Chart" };
      }
    },
    {
      id: "e06_line_charts_3",
      lessonId: "e06-line-charts",
      stepIndex: 3,
      app: "excel",
      path: "2-D Line > Line with Markers",
      instruction: "Select '2-D Line with Markers' (or standard 2-D Line) so individual data points are clearly distinguishable.",
      hint: "Menu path: 2-D Line > Line with Markers. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e06-line-charts", stepIndex: 3 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e06_line_charts_3"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: 2-D Line > Line with Markers" };
      }
    },
    {
      id: "e06_line_charts_4",
      lessonId: "e06-line-charts",
      stepIndex: 4,
      app: "excel",
      path: "Chart Elements (+) > Axis Titles",
      instruction: "Add technical axis titles: click Chart Elements (+), check 'Axis Titles', and set horizontal to 'Year' and vertical to 'Population (Millions)'.",
      hint: "Menu path: Chart Elements (+) > Axis Titles. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e06-line-charts", stepIndex: 4 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e06_line_charts_4"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Chart Elements (+) > Axis Titles" };
      }
    },
    {
      id: "e06_line_charts_5",
      lessonId: "e06-line-charts",
      stepIndex: 5,
      app: "excel",
      path: "Right-Click Axis > Format Axis",
      instruction: "Format axes: right-click the horizontal axis > Format Axis > ensure Axis Type is set to 'Date axis' or 'Text axis' if years appear as numbers instead of category points.",
      hint: "Menu path: Right-Click Axis > Format Axis. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e06-line-charts", stepIndex: 5 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e06_line_charts_5"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Right-Click Axis > Format Axis" };
      }
    }
  ],
  "e07-histograms": [
    {
      id: "e07_histograms_0",
      lessonId: "e07-histograms",
      stepIndex: 0,
      app: "excel",
      path: "Calculation: CW = (Max - Min) / k (Round UP)",
      instruction: "Find the smallest value (e.g., 46) and largest value (e.g., 100). Choose number of classes k = 6. Calculate CW = (100 - 46) / 6 = 54 / 6 = 9. Round UP to CW = 10 so classes cleanly cover 41-50 through 91-100.",
      hint: "Menu path: Calculation: CW = (Max - Min) / k (Round UP). Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e07-histograms", stepIndex: 0 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e07_histograms_0"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Calculation: CW = (Max - Min) / k (Round UP)" };
      }
    },
    {
      id: "e07_histograms_1",
      lessonId: "e07-histograms",
      stepIndex: 1,
      app: "excel",
      path: "Insert > Charts > Statistic Chart > Histogram (Office 365 / 2016+)",
      instruction: "Method A (Built-in Excel 365/2016+ Chart): Highlight your raw numbers in Column A > go to Insert > Charts > click 'Insert Statistic Chart' > select 'Histogram'. Right-click horizontal axis > Format Axis to adjust Bin width.",
      hint: "Menu path: Insert > Charts > Statistic Chart > Histogram (Office 365 / 2016+). Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e07-histograms", stepIndex: 1 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e07_histograms_1"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Insert > Charts > Statistic Chart > Histogram (Office 365 / 2016+)" };
      }
    },
    {
      id: "e07_histograms_2",
      lessonId: "e07-histograms",
      stepIndex: 2,
      app: "excel",
      path: "Worksheet > Create Bin Column",
      instruction: "Method B (Data Analysis ToolPak - Universal across all versions): Create a 'Bin' column with upper limits (50, 60, 70, 80, 90, 100).",
      hint: "Menu path: Worksheet > Create Bin Column. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e07-histograms", stepIndex: 2 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e07_histograms_2"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Worksheet > Create Bin Column" };
      }
    },
    {
      id: "e07_histograms_3",
      lessonId: "e07-histograms",
      stepIndex: 3,
      app: "excel",
      path: "Data > Analysis > Data Analysis > Histogram",
      instruction: "Go to Data > Data Analysis > select 'Histogram' > click OK.",
      hint: "Menu path: Data > Analysis > Data Analysis > Histogram. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e07-histograms", stepIndex: 3 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e07_histograms_3"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Data > Analysis > Data Analysis > Histogram" };
      }
    },
    {
      id: "e07_histograms_4",
      lessonId: "e07-histograms",
      stepIndex: 4,
      app: "excel",
      path: "Histogram Dialog > Input Range / Bin Range / [✓] Chart Output",
      instruction: "Set Input Range to your raw scores ($A$1:$A$40), Bin Range to your bin column, check 'Chart Output', and click OK.",
      hint: "Menu path: Histogram Dialog > Input Range / Bin Range / [✓] Chart Output. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e07-histograms", stepIndex: 4 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e07_histograms_4"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Histogram Dialog > Input Range / Bin Range / [✓] Chart Output" };
      }
    },
    {
      id: "e07_histograms_5",
      lessonId: "e07-histograms",
      stepIndex: 5,
      app: "excel",
      path: "Format Data Series > Gap Width: 0%",
      instruction: "To format bars to touch (standard histogram convention): right-click the histogram bars > Format Data Series... > set 'Gap Width' to 0% (or 1-2%).",
      hint: "Menu path: Format Data Series > Gap Width: 0%. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e07-histograms", stepIndex: 5 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e07_histograms_5"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Format Data Series > Gap Width: 0%" };
      }
    }
  ],
  "e08-dot-plots": [
    {
      id: "e08_dot_plots_0",
      lessonId: "e08-dot-plots",
      stepIndex: 0,
      app: "excel",
      path: "Data > Sort A to Z",
      instruction: "Sort your raw numerical data in Column A (e.g. A2:A31).",
      hint: "Menu path: Data > Sort A to Z. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e08-dot-plots", stepIndex: 0 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e08_dot_plots_0"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Data > Sort A to Z" };
      }
    },
    {
      id: "e08_dot_plots_1",
      lessonId: "e08-dot-plots",
      stepIndex: 1,
      app: "excel",
      path: "Cell B2 > Type '=COUNTIF($A$2:A2, A2)' > Fill Down",
      instruction: "In Column B (Y-axis vertical stack position), compute the vertical rank of duplicate values using the formula: =COUNTIF($A$2:A2, A2). Drag this formula down.",
      hint: "Menu path: Cell B2 > Type '=COUNTIF($A$2:A2, A2)' > Fill Down. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e08-dot-plots", stepIndex: 1 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e08_dot_plots_1"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Cell B2 > Type '=COUNTIF($A$2:A2, A2)' > Fill Down" };
      }
    },
    {
      id: "e08_dot_plots_2",
      lessonId: "e08-dot-plots",
      stepIndex: 2,
      app: "excel",
      path: "Select Range A2:B31",
      instruction: "Highlight Column A (X-axis values) and Column B (Y-axis stack heights).",
      hint: "Menu path: Select Range A2:B31. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e08-dot-plots", stepIndex: 2 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e08_dot_plots_2"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Select Range A2:B31" };
      }
    },
    {
      id: "e08_dot_plots_3",
      lessonId: "e08-dot-plots",
      stepIndex: 3,
      app: "excel",
      path: "Insert > Charts > Scatter > Scatter with only Markers",
      instruction: "Go to Insert > Charts > Scatter > select 'Scatter with only Markers' (do not connect lines).",
      hint: "Menu path: Insert > Charts > Scatter > Scatter with only Markers. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e08-dot-plots", stepIndex: 3 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e08_dot_plots_3"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Insert > Charts > Scatter > Scatter with only Markers" };
      }
    },
    {
      id: "e08_dot_plots_4",
      lessonId: "e08-dot-plots",
      stepIndex: 4,
      app: "excel",
      path: "Chart Elements > Uncheck Vertical Axis & Gridlines",
      instruction: "Clean up the chart: delete the vertical Y-axis labels and horizontal gridlines so only the horizontal number line with stacked dots/x's remains visible.",
      hint: "Menu path: Chart Elements > Uncheck Vertical Axis & Gridlines. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e08-dot-plots", stepIndex: 4 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e08_dot_plots_4"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Chart Elements > Uncheck Vertical Axis & Gridlines" };
      }
    },
    {
      id: "e08_dot_plots_5",
      lessonId: "e08-dot-plots",
      stepIndex: 5,
      app: "excel",
      path: "Format Data Series > Marker > Built-in: 'x'",
      instruction: "To use 'x' symbols instead of circles: right-click any marker > Format Data Series... > Marker > Marker Options > Built-in > select 'x'.",
      hint: "Menu path: Format Data Series > Marker > Built-in: 'x'. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e08-dot-plots", stepIndex: 5 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e08_dot_plots_5"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Format Data Series > Marker > Built-in: 'x'" };
      }
    }
  ],
  "e09-choosing-charts": [
    {
      id: "e09_choosing_charts_0",
      lessonId: "e09-choosing-charts",
      stepIndex: 0,
      app: "excel",
      path: "Data Classification > Variable Nature",
      instruction: "Step 1: Determine Variable Type — Is your horizontal axis categorical (names, regions), continuous time (seconds, days, years), or numeric measurements (test scores, voltages)?",
      hint: "Menu path: Data Classification > Variable Nature. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e09-choosing-charts", stepIndex: 0 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e09_choosing_charts_0"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Data Classification > Variable Nature" };
      }
    },
    {
      id: "e09_choosing_charts_1",
      lessonId: "e09-choosing-charts",
      stepIndex: 1,
      app: "excel",
      path: "Decision Path > Numeric Data",
      instruction: "Step 2: Check Sample Size — If numeric: small sample with individual points needing inspection? → Dot Plot (E08). Large sample requiring grouped intervals? → Histogram (E07).",
      hint: "Menu path: Decision Path > Numeric Data. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e09-choosing-charts", stepIndex: 1 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e09_choosing_charts_1"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Decision Path > Numeric Data" };
      }
    },
    {
      id: "e09_choosing_charts_2",
      lessonId: "e09-choosing-charts",
      stepIndex: 2,
      app: "excel",
      path: "Decision Path > Categorical Data",
      instruction: "Step 3: Analyze Objective — If categorical: comparing magnitudes? → Column/Bar Chart (E04). Displaying shares of 100% with ≤ 6 slices? → Pie Chart (E05).",
      hint: "Menu path: Decision Path > Categorical Data. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e09-choosing-charts", stepIndex: 2 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e09_choosing_charts_2"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Decision Path > Categorical Data" };
      }
    },
    {
      id: "e09_choosing_charts_3",
      lessonId: "e09-choosing-charts",
      stepIndex: 3,
      app: "excel",
      path: "Decision Path > Time-Series Data",
      instruction: "Step 4: Check for Time Sequence — If tracking a physical phenomenon evolving continuously through time? → Line Graph (E06).",
      hint: "Menu path: Decision Path > Time-Series Data. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e09-choosing-charts", stepIndex: 3 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e09_choosing_charts_3"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Decision Path > Time-Series Data" };
      }
    },
    {
      id: "e09_choosing_charts_4",
      lessonId: "e09-choosing-charts",
      stepIndex: 4,
      app: "excel",
      path: "Engineering Verification",
      instruction: "Step 5: Verify Standards — Ensure your chosen chart includes a Chart Title, descriptive Axis Titles with physical units, consistent tick marks, and an appropriate caption in Word.",
      hint: "Menu path: Engineering Verification. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "e09-choosing-charts", stepIndex: 4 },
      isManual: false,
      check: function (state) {
        if (state && state.completedExcelSteps && state.completedExcelSteps["e09_choosing_charts_4"]) return { pass: true };
        if (state && state.verified) return { pass: true };
        return { pass: false, message: "Perform the Excel operation specified in the instruction: Engineering Verification" };
      }
    }
  ],
  "r01-report-checklist": [
    {
      id: "r01_report_checklist_0",
      lessonId: "r01-report-checklist",
      stepIndex: 0,
      app: "report",
      path: "Audit 1: Layout > Size A4 & Margins",
      instruction: "Audit Page Layout: Verify paper size is strictly A4 (210 × 297 mm) and margins are 2.5 cm (standard) or Left ≥ 3.5 cm with 1.5 cm others (if bound). Single-sided print configuration.",
      hint: "Menu path: Audit 1: Layout > Size A4 & Margins. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "r01-report-checklist", stepIndex: 0 },
      isManual: true,
      check: function (state) {
        if (state && state.checklistDone && state.checklistDone["r01_report_checklist_0"]) return { pass: true };
        return { pass: false, message: "Verify this checklist item against your drafted technical report." };
      }
    },
    {
      id: "r01_report_checklist_1",
      lessonId: "r01-report-checklist",
      stepIndex: 1,
      app: "report",
      path: "Audit 2: Page Numbering (Roman Numerals)",
      instruction: "Audit Cover Page & Preliminary Numbering: Confirm title page has NO page number. Confirm preliminary pages (Abstract, TOC, Lists) use lowercase Roman numerals (i, ii, iii...).",
      hint: "Menu path: Audit 2: Page Numbering (Roman Numerals). Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "r01-report-checklist", stepIndex: 1 },
      isManual: true,
      check: function (state) {
        if (state && state.checklistDone && state.checklistDone["r01_report_checklist_1"]) return { pass: true };
        return { pass: false, message: "Verify this checklist item against your drafted technical report." };
      }
    },
    {
      id: "r01_report_checklist_2",
      lessonId: "r01-report-checklist",
      stepIndex: 2,
      app: "report",
      path: "Audit 3: Layout > Breaks > Start at 1",
      instruction: "Audit Section Breaks & Main Body: Confirm a Section Break (Next Page) precedes the Introduction, 'Link to Previous' is turned off, and main body restarts cleanly at Arabic number 1.",
      hint: "Menu path: Audit 3: Layout > Breaks > Start at 1. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "r01-report-checklist", stepIndex: 2 },
      isManual: true,
      check: function (state) {
        if (state && state.checklistDone && state.checklistDone["r01_report_checklist_2"]) return { pass: true };
        return { pass: false, message: "Verify this checklist item against your drafted technical report." };
      }
    },
    {
      id: "r01_report_checklist_3",
      lessonId: "r01-report-checklist",
      stepIndex: 3,
      app: "report",
      path: "Audit 4: Home > Font 12 pt & Justified (Ctrl+J)",
      instruction: "Audit Typography: Confirm body text is 12 pt Times New Roman, fully justified on both sides, with 1.5 line spacing. Verify tables/figures use 10 pt.",
      hint: "Menu path: Audit 4: Home > Font 12 pt & Justified (Ctrl+J). Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "r01-report-checklist", stepIndex: 3 },
      isManual: true,
      check: function (state) {
        if (state && state.checklistDone && state.checklistDone["r01_report_checklist_3"]) return { pass: true };
        return { pass: false, message: "Verify this checklist item against your drafted technical report." };
      }
    },
    {
      id: "r01_report_checklist_4",
      lessonId: "r01-report-checklist",
      stepIndex: 4,
      app: "report",
      path: "Audit 5: Styles > Headings 16/14/12 Bold (Sentence Case)",
      instruction: "Audit Heading Hierarchy: Level 1 = 16 pt bold, Level 2 = 14 pt bold, Level 3 = 12 pt bold. Capitalize only the first letter (sentence case). Confirm 'Keep with next' is active.",
      hint: "Menu path: Audit 5: Styles > Headings 16/14/12 Bold (Sentence Case). Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "r01-report-checklist", stepIndex: 4 },
      isManual: true,
      check: function (state) {
        if (state && state.checklistDone && state.checklistDone["r01_report_checklist_4"]) return { pass: true };
        return { pass: false, message: "Verify this checklist item against your drafted technical report." };
      }
    },
    {
      id: "r01_report_checklist_5",
      lessonId: "r01-report-checklist",
      stepIndex: 5,
      app: "report",
      path: "Audit 6: References > Caption BELOW & Cross-reference",
      instruction: "Audit Figures: All figures centered, captions placed strictly BELOW the image in bold with consecutive numbering, and cross-referenced in text ('see Figure X'). No 'figure above'.",
      hint: "Menu path: Audit 6: References > Caption BELOW & Cross-reference. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "r01-report-checklist", stepIndex: 5 },
      isManual: true,
      check: function (state) {
        if (state && state.checklistDone && state.checklistDone["r01_report_checklist_5"]) return { pass: true };
        return { pass: false, message: "Verify this checklist item against your drafted technical report." };
      }
    },
    {
      id: "r01_report_checklist_6",
      lessonId: "r01-report-checklist",
      stepIndex: 6,
      app: "report",
      path: "Audit 7: References > Caption ABOVE & Dash (—) for missing data",
      instruction: "Audit Tables: All tables centered, captions placed strictly ABOVE the table in bold with consecutive numbering, missing data marked with an em-dash (—), and cross-referenced in text.",
      hint: "Menu path: Audit 7: References > Caption ABOVE & Dash (—) for missing data. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "r01-report-checklist", stepIndex: 6 },
      isManual: true,
      check: function (state) {
        if (state && state.checklistDone && state.checklistDone["r01_report_checklist_6"]) return { pass: true };
        return { pass: false, message: "Verify this checklist item against your drafted technical report." };
      }
    },
    {
      id: "r01_report_checklist_7",
      lessonId: "r01-report-checklist",
      stepIndex: 7,
      app: "report",
      path: "Audit 8: Equation (Alt+=) & Right-Aligned (1)",
      instruction: "Audit Equations: Centered on line, numbered consecutively in parentheses at right margin (1), and referenced in text as 'eqn. (1)' without 'equation above'.",
      hint: "Menu path: Audit 8: Equation (Alt+=) & Right-Aligned (1). Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "r01-report-checklist", stepIndex: 7 },
      isManual: true,
      check: function (state) {
        if (state && state.checklistDone && state.checklistDone["r01_report_checklist_7"]) return { pass: true };
        return { pass: false, message: "Verify this checklist item against your drafted technical report." };
      }
    },
    {
      id: "r01_report_checklist_8",
      lessonId: "r01-report-checklist",
      stepIndex: 8,
      app: "report",
      path: "Audit 9: Excel Chart Elements & Units",
      instruction: "Audit Excel Charts: Verify chart title, axis titles with physical units, consistent tick marks, zero-gap histograms where appropriate, and correct chart type selection.",
      hint: "Menu path: Audit 9: Excel Chart Elements & Units. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "r01-report-checklist", stepIndex: 8 },
      isManual: true,
      check: function (state) {
        if (state && state.checklistDone && state.checklistDone["r01_report_checklist_8"]) return { pass: true };
        return { pass: false, message: "Verify this checklist item against your drafted technical report." };
      }
    },
    {
      id: "r01_report_checklist_9",
      lessonId: "r01-report-checklist",
      stepIndex: 9,
      app: "report",
      path: "Audit 10: References > Update Table & IEEE Bibliography",
      instruction: "Audit Front Matter Lists & References: Right-click Table of Contents, Table of Figures, and Table of Tables to run 'Update Field' (Update entire table). Verify IEEE References list at the end.",
      hint: "Menu path: Audit 10: References > Update Table & IEEE Bibliography. Execute this action in the simulator above.",
      showMeTarget: null,
      startState: { lessonId: "r01-report-checklist", stepIndex: 9 },
      isManual: true,
      check: function (state) {
        if (state && state.checklistDone && state.checklistDone["r01_report_checklist_9"]) return { pass: true };
        return { pass: false, message: "Verify this checklist item against your drafted technical report." };
      }
    }
  ],
  "w01-page-setup": [
    {
      id: "w01_page_setup_0",
      lessonId: "w01-page-setup",
      stepIndex: 0,
      app: "word",
      path: "Layout > Page Setup",
      instruction: "Open your Word document and click on the Layout tab in the top ribbon.",
      hint: "Menu path: Layout > Page Setup. Execute this action in the simulator above.",
      showMeTarget: "#ribbon-tab-layout",
      startState: { activeTab: "home", paperSize: "Letter", margins: { type: "normal", left: 2.5, right: 2.5, top: 2.5, bottom: 2.5 } },
      check: function (state) {
        if (state.activeTab === "layout") return { pass: true };
        return { pass: false, message: "Click the 'Layout' tab on the ribbon to access page setup." };
      }
    },
    {
      id: "w01_page_setup_1",
      lessonId: "w01-page-setup",
      stepIndex: 1,
      app: "word",
      path: "Layout > Size > A4",
      instruction: "Click Size in the Page Setup group, scroll down, and select A4 (8.27\" × 11.69\").",
      hint: "Menu path: Layout > Size > A4. Execute this action in the simulator above.",
      showMeTarget: "#tool-layout-size",
      startState: { activeTab: "layout", paperSize: "Letter" },
      check: function (state) {
        if (state.paperSize === "A4") return { pass: true };
        return { pass: false, message: "Paper size is currently " + (state.paperSize || "Letter") + ". Set it to A4." };
      }
    },
    {
      id: "w01_page_setup_2",
      lessonId: "w01-page-setup",
      stepIndex: 2,
      app: "word",
      path: "Layout > Margins > Normal",
      instruction: "For standard un-bound assessment submission: click Margins and choose Normal (Top: 1\", Bottom: 1\", Left: 1\", Right: 1\" / ~2.5 cm).",
      hint: "Menu path: Layout > Margins > Normal. Execute this action in the simulator above.",
      showMeTarget: "#tool-layout-margins",
      startState: { activeTab: "layout", paperSize: "A4", margins: { type: "narrow", left: 1.5, right: 1.5, top: 1.5, bottom: 1.5 } },
      check: function (state) {
        if (state.margins && (state.margins.type === "normal" || (Math.abs(state.margins.left - 2.5) <= 0.1 && Math.abs(state.margins.top - 2.5) <= 0.1))) return { pass: true };
        return { pass: false, message: "Set Margins to Normal (2.5 cm / 1 in on all sides)." };
      }
    },
    {
      id: "w01_page_setup_3",
      lessonId: "w01-page-setup",
      stepIndex: 3,
      app: "word",
      path: "Layout > Margins > Custom Margins...",
      instruction: "For bound submission: click Margins > Custom Margins... at the bottom of the menu. Set Left to 3.5 cm (1.38\"), and Top, Bottom, and Right to 1.5 cm (0.59\"), then click OK.",
      hint: "Menu path: Layout > Margins > Custom Margins.... Execute this action in the simulator above.",
      showMeTarget: "#tool-layout-margins",
      startState: { activeTab: "layout", paperSize: "A4", margins: { type: "normal", left: 2.5, right: 2.5, top: 2.5, bottom: 2.5 } },
      check: function (state) {
        if (state.margins && (state.margins.type === "bound" || (state.margins.left >= 3.5 && state.margins.right <= 1.6))) return { pass: true };
        return { pass: false, message: "Left margin must be at least 3.5 cm for binding, and 1.5 cm for top/bottom/right." };
      }
    }
  ],
  "w02-cover-page": [
    {
      id: "w02_cover_page_0",
      lessonId: "w02-cover-page",
      stepIndex: 0,
      app: "word",
      path: "Insert",
      instruction: "Navigate to the top ribbon and click on the Insert tab.",
      hint: "Menu path: Insert. Execute this action in the simulator above.",
      showMeTarget: "#ribbon-tab-insert",
      startState: { activeTab: "home" },
      check: function (state) {
        if (state.activeTab === "insert") return { pass: true };
        return { pass: false, message: "Click on the 'Insert' tab on the ribbon." };
      }
    },
    {
      id: "w02_cover_page_1",
      lessonId: "w02-cover-page",
      stepIndex: 1,
      app: "word",
      path: "Insert > Pages > Cover Page",
      instruction: "In the Pages group (left side of ribbon), click Cover Page to open the built-in design gallery.",
      hint: "Menu path: Insert > Pages > Cover Page. Execute this action in the simulator above.",
      showMeTarget: "#tool-insert-cover-page",
      startState: { activeTab: "insert", hasCoverPage: false },
      check: function (state) {
        if (state.coverPageGalleryOpen || state.hasCoverPage) return { pass: true };
        return { pass: false, message: "Click 'Cover Page' in the Pages group on the Insert tab." };
      }
    },
    {
      id: "w02_cover_page_2",
      lessonId: "w02-cover-page",
      stepIndex: 2,
      app: "word",
      path: "Insert > Pages > Cover Page > [Select Design]",
      instruction: "Select a formal design from the gallery (such as 'Austin', 'Facet', or 'Integral').",
      hint: "Menu path: Insert > Pages > Cover Page > [Select Design]. Execute this action in the simulator above.",
      showMeTarget: ".cover-choice-btn",
      startState: { activeTab: "insert", coverPageGalleryOpen: true, hasCoverPage: false },
      check: function (state) {
        if (state.hasCoverPage) return { pass: true };
        return { pass: false, message: "Select a formal cover page design (e.g. Austin or Formal Engineering)." };
      }
    },
    {
      id: "w02_cover_page_3",
      lessonId: "w02-cover-page",
      stepIndex: 3,
      app: "word",
      path: "Cover Page > Placeholder Fields",
      instruction: "Click into each placeholder field and replace the prompt text with your report title, subtitle, author name, student ID, and date.",
      hint: "Menu path: Cover Page > Placeholder Fields. Execute this action in the simulator above.",
      showMeTarget: ".cover-field-input",
      startState: { hasCoverPage: true, coverTitle: "[Report Title]", coverAuthor: "[Student Name]" },
      check: function (state) {
        if (state.hasCoverPage && state.coverTitle && !state.coverTitle.includes("[Report Title]") && state.coverAuthor && !state.coverAuthor.includes("[Student Name]")) return { pass: true };
        return { pass: false, message: "Fill in the Report Title and Author Name fields on the cover page." };
      }
    },
    {
      id: "w02_cover_page_4",
      lessonId: "w02-cover-page",
      stepIndex: 4,
      app: "word",
      path: "Header & Footer > Options > Different First Page",
      instruction: "Verify that no page number appears on the cover page (Word built-in cover pages enable 'Different First Page' automatically).",
      hint: "Menu path: Header & Footer > Options > Different First Page. Execute this action in the simulator above.",
      showMeTarget: "#tool-different-first-page",
      startState: { hasCoverPage: true, differentFirstPage: false, coverPageHasNumber: true },
      check: function (state) {
        if (state.differentFirstPage || !state.coverPageHasNumber) return { pass: true };
        return { pass: false, message: "Enable 'Different First Page' to suppress page numbers on the cover page." };
      }
    }
  ],
  "w03-page-numbering": [
    {
      id: "w03_page_numbering_0",
      lessonId: "w03-page-numbering",
      stepIndex: 0,
      app: "word",
      path: "Insert > Page Number > Top/Bottom of Page",
      instruction: "Go to the Insert tab, click Page Number in the Header & Footer group, and select either 'Top of Page' (Plain Number 3 / top-right) or 'Bottom of Page' (Plain Number 2 / bottom-center).",
      hint: "Menu path: Insert > Page Number > Top/Bottom of Page. Execute this action in the simulator above.",
      showMeTarget: "#tool-insert-page-number",
      startState: { hasPageNumber: false },
      check: function (state) {
        if (state.hasPageNumber) return { pass: true };
        return { pass: false, message: "Insert page numbers via Insert > Page Number." };
      }
    },
    {
      id: "w03_page_numbering_1",
      lessonId: "w03-page-numbering",
      stepIndex: 1,
      app: "word",
      path: "Insert > Page Number > Format Page Numbers",
      instruction: "Format front matter numbering: click Page Number > Format Page Numbers..., set 'Number format' to Roman numerals (i, ii, iii...), and set 'Page numbering' to 'Start at: i'. Click OK.",
      hint: "Menu path: Insert > Page Number > Format Page Numbers. Execute this action in the simulator above.",
      showMeTarget: "#tool-page-num-format",
      startState: { hasPageNumber: true, pageNumbering: { format: "arabic", startAt: 1 } },
      check: function (state) {
        if (state.pageNumbering && state.pageNumbering.format === "roman") return { pass: true };
        return { pass: false, message: "Format page numbers to use lowercase Roman numerals (i, ii, iii...)." };
      }
    },
    {
      id: "w03_page_numbering_2",
      lessonId: "w03-page-numbering",
      stepIndex: 2,
      app: "word",
      path: "Layout > Page Setup > Breaks > Next Page",
      instruction: "Place your cursor at the very end of your preliminary pages (e.g., after the Table of Figures), switch to the Layout tab, click Breaks, and choose Section Breaks > 'Next Page'.",
      hint: "Menu path: Layout > Page Setup > Breaks > Next Page. Execute this action in the simulator above.",
      showMeTarget: "#tool-layout-breaks",
      startState: { sectionsCount: 1 },
      check: function (state) {
        if (state.sectionsCount >= 2 || state.hasSectionBreak) return { pass: true };
        return { pass: false, message: "Insert a Section Break (Next Page) via Layout > Breaks." };
      }
    },
    {
      id: "w03_page_numbering_3",
      lessonId: "w03-page-numbering",
      stepIndex: 3,
      app: "word",
      path: "Header & Footer > Navigation > Link to Previous (Unlink)",
      instruction: "Double-click the header or footer on the new main body page to open Header & Footer Tools. In the Navigation group, click 'Link to Previous' to turn it OFF (unlink the section).",
      hint: "Menu path: Header & Footer > Navigation > Link to Previous (Unlink). Execute this action in the simulator above.",
      showMeTarget: "#tool-link-to-previous",
      startState: { sectionsCount: 2, activeSection: 2, linkToPrevious: { header: true, footer: true } },
      check: function (state) {
        if (state.linkToPrevious && (state.linkToPrevious.footer === false || state.linkToPrevious.header === false)) return { pass: true };
        return { pass: false, message: "Turn off 'Link to Previous' to unlink the body header/footer." };
      }
    },
    {
      id: "w03_page_numbering_4",
      lessonId: "w03-page-numbering",
      stepIndex: 4,
      app: "word",
      path: "Header & Footer > Page Number > Format Page Numbers > Start at: 1",
      instruction: "With cursor in the body header/footer, click Page Number > Format Page Numbers..., switch 'Number format' to Arabic (1, 2, 3...), and select 'Start at: 1'. Click OK.",
      hint: "Menu path: Header & Footer > Page Number > Format Page Numbers > Start at: 1. Execute this action in the simulator above.",
      showMeTarget: "#tool-page-num-format",
      startState: { sectionsCount: 2, activeSection: 2, section2PageFormat: "roman", section2StartAt: 3 },
      check: function (state) {
        if (state.section2PageFormat === "arabic" && state.section2StartAt === 1) return { pass: true };
        return { pass: false, message: "Restart page numbering at Arabic 1 in Section 2." };
      }
    },
    {
      id: "w03_page_numbering_5",
      lessonId: "w03-page-numbering",
      stepIndex: 5,
      app: "word",
      path: "Layout > Breaks > Next Page & Format Page Numbers",
      instruction: "For Appendices: add another Section Break (Next Page), unlink the header/footer, click Format Page Numbers..., and select chapter/prefix style or type the letter prefix (A1, A2, B1).",
      hint: "Menu path: Layout > Breaks > Next Page & Format Page Numbers. Execute this action in the simulator above.",
      showMeTarget: "#tool-layout-breaks",
      startState: { sectionsCount: 2 },
      check: function (state) {
        if (state.sectionsCount >= 3 || state.hasAppendixSection) return { pass: true };
        return { pass: false, message: "Add a Section Break (Next Page) for Appendices." };
      }
    }
  ],
  "w04-headers-footers": [
    {
      id: "w04_headers_footers_0",
      lessonId: "w04-headers-footers",
      stepIndex: 0,
      app: "word",
      path: "Insert > Header & Footer",
      instruction: "Go to the Insert tab on the ribbon and locate the Header & Footer group.",
      hint: "Menu path: Insert > Header & Footer. Execute this action in the simulator above.",
      showMeTarget: "#ribbon-tab-insert",
      startState: { activeTab: "home" },
      check: function (state) {
        if (state.activeTab === "insert") return { pass: true };
        return { pass: false, message: "Switch to the Insert tab." };
      }
    },
    {
      id: "w04_headers_footers_1",
      lessonId: "w04-headers-footers",
      stepIndex: 1,
      app: "word",
      path: "Insert > Header & Footer > Footer > Edit Footer",
      instruction: "Click Footer (or Header) and either choose a built-in preset or click 'Edit Footer' at the bottom of the menu.",
      hint: "Menu path: Insert > Header & Footer > Footer > Edit Footer. Execute this action in the simulator above.",
      showMeTarget: "#tool-edit-footer",
      startState: { activeZone: "body" },
      check: function (state) {
        if (state.activeZone === "footer" || state.footerOpen) return { pass: true };
        return { pass: false, message: "Click 'Edit Footer' to open footer editing." };
      }
    },
    {
      id: "w04_headers_footers_2",
      lessonId: "w04-headers-footers",
      stepIndex: 2,
      app: "word",
      path: "Home > Font > Size 9 pt",
      instruction: "Type your Student Name and Student ID in the footer area, select the text, and set font size to 9 pt via Home > Font.",
      hint: "Menu path: Home > Font > Size 9 pt. Execute this action in the simulator above.",
      showMeTarget: ".word-footer-zone",
      startState: { activeZone: "footer", footerText: "", footerFontSize: 12 },
      check: function (state) {
        if (state.footerText && state.footerText.length >= 4 && state.footerFontSize <= 10) return { pass: true };
        return { pass: false, message: "Type your name and ID in the footer and format at 9 pt font." };
      }
    },
    {
      id: "w04_headers_footers_3",
      lessonId: "w04-headers-footers",
      stepIndex: 3,
      app: "word",
      path: "Header & Footer Tools > Navigation > Link to Previous (OFF)",
      instruction: "To separate preliminary footer text from body footer text, go to the body section, ensure 'Link to Previous' is deactivated in Header & Footer Tools, then customize body footer text.",
      hint: "Menu path: Header & Footer Tools > Navigation > Link to Previous (OFF). Execute this action in the simulator above.",
      showMeTarget: "#tool-link-to-previous",
      startState: { activeZone: "footer", linkToPrevious: { footer: true } },
      check: function (state) {
        if (state.linkToPrevious && state.linkToPrevious.footer === false) return { pass: true };
        return { pass: false, message: "Deactivate 'Link to Previous' on the body footer." };
      }
    },
    {
      id: "w04_headers_footers_4",
      lessonId: "w04-headers-footers",
      stepIndex: 4,
      app: "word",
      path: "Header & Footer Tools > Close Header and Footer (or Esc)",
      instruction: "Click 'Close Header and Footer' on the ribbon (or press the Esc key) to return to main document editing.",
      hint: "Menu path: Header & Footer Tools > Close Header and Footer (or Esc). Execute this action in the simulator above.",
      showMeTarget: "#tool-close-header-footer",
      startState: { activeZone: "footer" },
      check: function (state) {
        if (state.activeZone === "body") return { pass: true };
        return { pass: false, message: "Click 'Close Header and Footer' (or press Esc) to return to body text." };
      }
    }
  ],
  "w05-text-formatting": [
    {
      id: "w05_text_formatting_0",
      lessonId: "w05-text-formatting",
      stepIndex: 0,
      app: "word",
      path: "Home > Select > Select All (Ctrl+A)",
      instruction: "Select your body paragraphs or press Ctrl+A to select all body text.",
      hint: "Menu path: Home > Select > Select All (Ctrl+A). Execute this action in the simulator above.",
      showMeTarget: "#tool-select-all",
      startState: { textSelected: false },
      check: function (state) {
        if (state.textSelected || state.allSelected) return { pass: true };
        return { pass: false, message: "Select body text or press Ctrl+A." };
      }
    },
    {
      id: "w05_text_formatting_1",
      lessonId: "w05-text-formatting",
      stepIndex: 1,
      app: "word",
      path: "Home > Font > Times New Roman > 12 pt",
      instruction: "In the Home tab > Font group, set the font family to 'Times New Roman' and the font size to '12'.",
      hint: "Menu path: Home > Font > Times New Roman > 12 pt. Execute this action in the simulator above.",
      showMeTarget: "#tool-font-family",
      startState: { textSelected: true, fontFamily: "Calibri", fontSize: 11 },
      check: function (state) {
        if ((state.fontFamily === "Times New Roman" || state.fontFamily === "Arial") && state.fontSize === 12) return { pass: true };
        return { pass: false, message: "Set font family to Times New Roman and font size to 12 pt." };
      }
    },
    {
      id: "w05_text_formatting_2",
      lessonId: "w05-text-formatting",
      stepIndex: 2,
      app: "word",
      path: "Home > Paragraph > Justify (Ctrl+J)",
      instruction: "In the Home tab > Paragraph group, click the 'Justify' button (or press Ctrl+J) to justify both margins.",
      hint: "Menu path: Home > Paragraph > Justify (Ctrl+J). Execute this action in the simulator above.",
      showMeTarget: "#tool-align-justify",
      startState: { textSelected: true, alignment: "left" },
      check: function (state) {
        if (state.alignment === "justify") return { pass: true };
        return { pass: false, message: "Click 'Justify' (Ctrl+J) to justify both margins." };
      }
    },
    {
      id: "w05_text_formatting_3",
      lessonId: "w05-text-formatting",
      stepIndex: 3,
      app: "word",
      path: "Home > Font > Size 10 pt",
      instruction: "For table content and figure labels, highlight the table cells and change font size to 10 pt (Arial or Times New Roman).",
      hint: "Menu path: Home > Font > Size 10 pt. Execute this action in the simulator above.",
      showMeTarget: "#tool-font-size",
      startState: { hasTable: true, tableRows: 3, tableCols: 3, tableFontSize: 12 },
      check: function (state) {
        if (state.hasTable && state.tableFontSize === 10) return { pass: true };
        return { pass: false, message: "Set table and caption text to 10 pt." };
      }
    },
    {
      id: "w05_text_formatting_4",
      lessonId: "w05-text-formatting",
      stepIndex: 4,
      app: "word",
      path: "Paragraph Dialog > Line and Page Breaks > Keep with next",
      instruction: "To prevent orphan headings from standing alone at the bottom of a page, select the heading > right-click > Paragraph > 'Line and Page Breaks' tab > check 'Keep with next'.",
      hint: "Menu path: Paragraph Dialog > Line and Page Breaks > Keep with next. Execute this action in the simulator above.",
      showMeTarget: "#tool-keep-with-next",
      startState: { keepWithNext: false },
      check: function (state) {
        if (state.keepWithNext) return { pass: true };
        return { pass: false, message: "Check 'Keep with next' in Paragraph options to prevent orphaned headings." };
      }
    }
  ],
  "w06-headings-toc": [
    {
      id: "w06_headings_toc_0",
      lessonId: "w06-headings-toc",
      stepIndex: 0,
      app: "word",
      path: "Home > Styles > Right-click Heading 1 > Modify...",
      instruction: "Go to the Home tab > Styles gallery, right-click 'Heading 1', and select 'Modify...'. Set font to Arial (or Times New Roman), size to 16 pt, Bold, and color to Automatic/Black. Click OK.",
      hint: "Menu path: Home > Styles > Right-click Heading 1 > Modify.... Execute this action in the simulator above.",
      showMeTarget: "#style-heading1",
      startState: { heading1Size: 12, heading1Bold: false },
      check: function (state) {
        if (state.heading1Size >= 16 && state.heading1Bold) return { pass: true };
        return { pass: false, message: "Set Heading 1 to 16 pt bold." };
      }
    },
    {
      id: "w06_headings_toc_1",
      lessonId: "w06-headings-toc",
      stepIndex: 1,
      app: "word",
      path: "Home > Styles > Right-click Heading 2 / 3 > Modify...",
      instruction: "Repeat style modifications for Heading 2 (14 pt, Bold) and Heading 3 (12 pt, Bold). In the Modify Style dialog, ensure 'Add to the Styles gallery' is checked.",
      hint: "Menu path: Home > Styles > Right-click Heading 2 / 3 > Modify.... Execute this action in the simulator above.",
      showMeTarget: "#style-heading2",
      startState: { heading2Size: 11, heading2Bold: false },
      check: function (state) {
        if (state.heading2Size >= 14 && state.heading2Bold) return { pass: true };
        return { pass: false, message: "Set Heading 2 to 14 pt bold." };
      }
    },
    {
      id: "w06_headings_toc_2",
      lessonId: "w06-headings-toc",
      stepIndex: 2,
      app: "word",
      path: "Home > Styles > [Heading 1 / Heading 2 / Heading 3]",
      instruction: "Click into each heading in your document and click the corresponding style ('Heading 1', 'Heading 2', or 'Heading 3') in the Styles gallery.",
      hint: "Menu path: Home > Styles > [Heading 1 / Heading 2 / Heading 3]. Execute this action in the simulator above.",
      showMeTarget: ".styles-gallery",
      startState: { heading1Applied: false, heading2Applied: false },
      check: function (state) {
        if (state.heading1Applied || state.heading2Applied) return { pass: true };
        return { pass: false, message: "Apply Heading 1 or Heading 2 style to a heading in the document." };
      }
    },
    {
      id: "w06_headings_toc_3",
      lessonId: "w06-headings-toc",
      stepIndex: 3,
      app: "word",
      path: "Home > Paragraph > Multilevel List > 1 Heading 1, 1.1 Heading 2...",
      instruction: "To number headings hierarchically, click in your first Heading 1, go to Home > Multilevel List, and select the list template showing '1 Heading 1, 1.1 Heading 2, 1.1.1 Heading 3'.",
      hint: "Menu path: Home > Paragraph > Multilevel List > 1 Heading 1, 1.1 Heading 2.... Execute this action in the simulator above.",
      showMeTarget: "#tool-multilevel-list",
      startState: { multilevelNumbering: false },
      check: function (state) {
        if (state.multilevelNumbering) return { pass: true };
        return { pass: false, message: "Apply Multilevel Numbering (1 Heading 1, 1.1 Heading 2...)." };
      }
    },
    {
      id: "w06_headings_toc_4",
      lessonId: "w06-headings-toc",
      stepIndex: 4,
      app: "word",
      path: "References > Table of Contents > Automatic Table 1",
      instruction: "Place your cursor on the preliminary page where the Table of Contents belongs, switch to the References tab, click 'Table of Contents', and choose 'Automatic Table 1' or 'Automatic Table 2'.",
      hint: "Menu path: References > Table of Contents > Automatic Table 1. Execute this action in the simulator above.",
      showMeTarget: "#tool-insert-toc",
      startState: { activeTab: "references", hasTOC: false },
      check: function (state) {
        if (state.hasTOC) return { pass: true };
        return { pass: false, message: "Insert an Automatic Table of Contents from the References tab." };
      }
    },
    {
      id: "w06_headings_toc_5",
      lessonId: "w06-headings-toc",
      stepIndex: 5,
      app: "word",
      path: "References > Table of Contents > Update Table (Update entire table)",
      instruction: "Whenever headings or page numbers change during editing, update the TOC by clicking References > 'Update Table' (choose 'Update entire table') or right-clicking the TOC and selecting 'Update Field'.",
      hint: "Menu path: References > Table of Contents > Update Table (Update entire table). Execute this action in the simulator above.",
      showMeTarget: "#tool-update-toc",
      startState: { hasTOC: true, tocUpdated: false },
      check: function (state) {
        if (state.tocUpdated) return { pass: true };
        return { pass: false, message: "Click 'Update Table' to refresh the Table of Contents." };
      }
    }
  ],
  "w07-line-spacing": [
    {
      id: "w07_line_spacing_0",
      lessonId: "w07-line-spacing",
      stepIndex: 0,
      app: "word",
      path: "Home > Select > Select All (Ctrl+A)",
      instruction: "Highlight the text or paragraphs you want to format (or press Ctrl+A to select all body text).",
      hint: "Menu path: Home > Select > Select All (Ctrl+A). Execute this action in the simulator above.",
      showMeTarget: "#tool-select-all",
      startState: { textSelected: false },
      check: function (state) {
        if (state.textSelected || state.allSelected) return { pass: true };
        return { pass: false, message: "Highlight body text or press Ctrl+A." };
      }
    },
    {
      id: "w07_line_spacing_1",
      lessonId: "w07-line-spacing",
      stepIndex: 1,
      app: "word",
      path: "Home > Paragraph > Line and Paragraph Spacing > 1.5",
      instruction: "In the Home tab > Paragraph group, click the Line and Paragraph Spacing icon and select '1.5'.",
      hint: "Menu path: Home > Paragraph > Line and Paragraph Spacing > 1.5. Execute this action in the simulator above.",
      showMeTarget: "#tool-line-spacing",
      startState: { textSelected: true, lineSpacing: 1.0 },
      check: function (state) {
        if (state.lineSpacing === 1.5 || state.lineSpacing === 1.15) return { pass: true };
        return { pass: false, message: "Set Line Spacing to 1.5 via Home > Paragraph." };
      }
    },
    {
      id: "w07_line_spacing_2",
      lessonId: "w07-line-spacing",
      stepIndex: 2,
      app: "word",
      path: "Home > Paragraph > Line and Paragraph Spacing > Line Spacing Options...",
      instruction: "To set clean paragraph separation without repeatedly hitting the Enter key, click 'Line Spacing Options...' at the bottom of the dropdown.",
      hint: "Menu path: Home > Paragraph > Line and Paragraph Spacing > Line Spacing Options.... Execute this action in the simulator above.",
      showMeTarget: "#tool-paragraph-dialog",
      startState: { paragraphDialogOpen: false },
      check: function (state) {
        if (state.paragraphDialogOpen || state.paragraphSpacing.after > 0) return { pass: true };
        return { pass: false, message: "Open Paragraph Dialog Launcher or Line Spacing Options." };
      }
    },
    {
      id: "w07_line_spacing_3",
      lessonId: "w07-line-spacing",
      stepIndex: 3,
      app: "word",
      path: "Paragraph Dialog > Spacing > After: 6 pt / Before: 12 pt",
      instruction: "In the Paragraph dialog box under 'Spacing', set 'After' to 6 pt or 8 pt (and 'Before' to 12 pt for headings).",
      hint: "Menu path: Paragraph Dialog > Spacing > After: 6 pt / Before: 12 pt. Execute this action in the simulator above.",
      showMeTarget: "#dialog-spacing-after",
      startState: { paragraphSpacing: { before: 0, after: 0 } },
      check: function (state) {
        if (state.paragraphSpacing && state.paragraphSpacing.after >= 6) return { pass: true };
        return { pass: false, message: "Set paragraph Spacing After to 6 pt or 8 pt." };
      }
    },
    {
      id: "w07_line_spacing_4",
      lessonId: "w07-line-spacing",
      stepIndex: 4,
      app: "word",
      path: "Paragraph Dialog > Spacing > Before: 12 pt / After: 12 pt",
      instruction: "Before figures, tables, and centered equations, add extra paragraph spacing (e.g., 12 pt before and after) so visual elements do not crowd adjacent prose.",
      hint: "Menu path: Paragraph Dialog > Spacing > Before: 12 pt / After: 12 pt. Execute this action in the simulator above.",
      showMeTarget: "#dialog-spacing-before",
      startState: { paragraphSpacing: { before: 0, after: 6 } },
      check: function (state) {
        if (state.paragraphSpacing && state.paragraphSpacing.before >= 12) return { pass: true };
        return { pass: false, message: "Set paragraph Spacing Before to 12 pt for clear visual separation." };
      }
    }
  ],
  "w08-indentation-centering": [
    {
      id: "w08_indentation_centering_0",
      lessonId: "w08-indentation-centering",
      stepIndex: 0,
      app: "word",
      path: "Home > Select",
      instruction: "Select the paragraphs you want to indent (or select the 'Normal' style to apply globally).",
      hint: "Menu path: Home > Select. Execute this action in the simulator above.",
      showMeTarget: "#tool-select-all",
      startState: { textSelected: false },
      check: function (state) {
        if (state.textSelected || state.allSelected) return { pass: true };
        return { pass: false, message: "Select the body paragraphs." };
      }
    },
    {
      id: "w08_indentation_centering_1",
      lessonId: "w08-indentation-centering",
      stepIndex: 1,
      app: "word",
      path: "Home > Paragraph > Dialog Launcher",
      instruction: "In the Home tab > Paragraph group, click the small arrow in the bottom-right corner (Paragraph dialog box launcher).",
      hint: "Menu path: Home > Paragraph > Dialog Launcher. Execute this action in the simulator above.",
      showMeTarget: "#tool-paragraph-dialog",
      startState: { paragraphDialogOpen: false },
      check: function (state) {
        if (state.paragraphDialogOpen || state.firstLineIndent) return { pass: true };
        return { pass: false, message: "Click the Paragraph dialog launcher in Home > Paragraph." };
      }
    },
    {
      id: "w08_indentation_centering_2",
      lessonId: "w08-indentation-centering",
      stepIndex: 2,
      app: "word",
      path: "Paragraph Dialog > Indents and Spacing > Special: First line",
      instruction: "Under the 'Indents and Spacing' tab, find the 'Indentation' section, click the 'Special' dropdown, and choose 'First line' (set By: 0.5\" or 1.27 cm), then click OK.",
      hint: "Menu path: Paragraph Dialog > Indents and Spacing > Special: First line. Execute this action in the simulator above.",
      showMeTarget: "#dialog-indent-special",
      startState: { firstLineIndent: false },
      check: function (state) {
        if (state.firstLineIndent) return { pass: true };
        return { pass: false, message: "Set Special Indentation to 'First line' (0.5 in / 1.27 cm)." };
      }
    },
    {
      id: "w08_indentation_centering_3",
      lessonId: "w08-indentation-centering",
      stepIndex: 3,
      app: "word",
      path: "Home > Paragraph > Bullets",
      instruction: "For bullet lists, highlight the list items and click the Bullets icon (or Multilevel List) in the Paragraph group to ensure proper list hanging indentation.",
      hint: "Menu path: Home > Paragraph > Bullets. Execute this action in the simulator above.",
      showMeTarget: "#tool-bullets",
      startState: { hasBullets: false },
      check: function (state) {
        if (state.hasBullets) return { pass: true };
        return { pass: false, message: "Apply bullet styling using the Bullets tool in Home > Paragraph." };
      }
    },
    {
      id: "w08_indentation_centering_4",
      lessonId: "w08-indentation-centering",
      stepIndex: 4,
      app: "word",
      path: "Home > Paragraph > Center (Ctrl+E)",
      instruction: "To center a figure, graph, or table, select the element and click the Center alignment icon in the Paragraph group (or press Ctrl+E).",
      hint: "Menu path: Home > Paragraph > Center (Ctrl+E). Execute this action in the simulator above.",
      showMeTarget: "#tool-align-center",
      startState: { elementCentered: false },
      check: function (state) {
        if (state.elementCentered || state.alignment === "center") return { pass: true };
        return { pass: false, message: "Center align the figure or table using Center (Ctrl+E)." };
      }
    }
  ],
  "w09-figures": [
    {
      id: "w09_figures_0",
      lessonId: "w09-figures",
      stepIndex: 0,
      app: "word",
      path: "Insert > Illustrations > Pictures",
      instruction: "Place your insertion cursor on a blank line where the diagram belongs and go to the Insert tab.",
      hint: "Menu path: Insert > Illustrations > Pictures. Execute this action in the simulator above.",
      showMeTarget: "#ribbon-tab-insert",
      startState: { activeTab: "home" },
      check: function (state) {
        if (state.activeTab === "insert") return { pass: true };
        return { pass: false, message: "Switch to the Insert tab on the ribbon." };
      }
    },
    {
      id: "w09_figures_1",
      lessonId: "w09-figures",
      stepIndex: 1,
      app: "word",
      path: "Insert > Pictures > This Device...",
      instruction: "Click Pictures > 'This Device...', select your image file (PNG, JPG, or SVG), and click Insert.",
      hint: "Menu path: Insert > Pictures > This Device.... Execute this action in the simulator above.",
      showMeTarget: "#tool-insert-picture",
      startState: { activeTab: "insert", hasFigure: false },
      check: function (state) {
        if (state.hasFigure) return { pass: true };
        return { pass: false, message: "Click Pictures / Picture Placeholder to insert a figure." };
      }
    },
    {
      id: "w09_figures_2",
      lessonId: "w09-figures",
      stepIndex: 2,
      app: "word",
      path: "Home > Paragraph > Center (Ctrl+E)",
      instruction: "With the picture selected, go to the Home tab and click Center alignment (Ctrl+E).",
      hint: "Menu path: Home > Paragraph > Center (Ctrl+E). Execute this action in the simulator above.",
      showMeTarget: "#tool-align-center",
      startState: { hasFigure: true, figureCentered: false },
      check: function (state) {
        if (state.figureCentered || (state.hasFigure && state.alignment === "center")) return { pass: true };
        return { pass: false, message: "Center align the figure horizontally (Ctrl+E)." };
      }
    },
    {
      id: "w09_figures_3",
      lessonId: "w09-figures",
      stepIndex: 3,
      app: "word",
      path: "References > Captions > Insert Caption",
      instruction: "Right-click the picture (or go to References tab) and select 'Insert Caption...'.",
      hint: "Menu path: References > Captions > Insert Caption. Execute this action in the simulator above.",
      showMeTarget: "#tool-insert-caption",
      startState: { hasFigure: true, captionDialogOpen: false },
      check: function (state) {
        if (state.captionDialogOpen || state.hasFigureCaption) return { pass: true };
        return { pass: false, message: "Click 'Insert Caption' in the References tab." };
      }
    },
    {
      id: "w09_figures_4",
      lessonId: "w09-figures",
      stepIndex: 4,
      app: "word",
      path: "Caption Dialog > Label: Figure > Position: Below selected item",
      instruction: "In the Caption dialog, verify 'Label' is set to 'Figure', 'Position' is set to 'Below selected item', type a colon and your descriptive title, and click OK.",
      hint: "Menu path: Caption Dialog > Label: Figure > Position: Below selected item. Execute this action in the simulator above.",
      showMeTarget: "#dialog-caption-position",
      startState: { hasFigure: true, captionDialogOpen: true, hasFigureCaption: false },
      check: function (state) {
        if (state.hasFigureCaption && state.figureCaptionPosition === "below") return { pass: true };
        return { pass: false, message: "Insert Figure caption with Position set to 'Below selected item'." };
      }
    },
    {
      id: "w09_figures_5",
      lessonId: "w09-figures",
      stepIndex: 5,
      app: "word",
      path: "Home > Font > Bold (Ctrl+B) > 10 pt",
      instruction: "Select the caption text, press Ctrl+B to bold the label and number, and format at 10 pt font.",
      hint: "Menu path: Home > Font > Bold (Ctrl+B) > 10 pt. Execute this action in the simulator above.",
      showMeTarget: "#tool-bold",
      startState: { hasFigureCaption: true, figureCaptionBold: false, figureCaptionSize: 12 },
      check: function (state) {
        if (state.figureCaptionBold && state.figureCaptionSize <= 10) return { pass: true };
        return { pass: false, message: "Bold the caption label/number (Ctrl+B) and set font size to 10 pt." };
      }
    },
    {
      id: "w09_figures_6",
      lessonId: "w09-figures",
      stepIndex: 6,
      app: "word",
      path: "References > Captions > Cross-reference > Reference type: Figure > Only label and number",
      instruction: "To refer to the figure in your body text, place cursor after your sentence, click References > Cross-reference, choose 'Figure' as Reference type, select 'Only label and number', select your figure, and click Insert.",
      hint: "Menu path: References > Captions > Cross-reference > Reference type: Figure > Only label and number. Execute this action in the simulator above.",
      showMeTarget: "#tool-cross-reference",
      startState: { hasFigureCaption: true, hasCrossReference: false },
      check: function (state) {
        if (state.hasCrossReference || (state.bodyText && state.bodyText.includes("Figure 1"))) return { pass: true };
        return { pass: false, message: "Insert an in-text cross-reference (e.g. 'see Figure 1') in your body text." };
      }
    }
  ],
  "w10-tables": [
    {
      id: "w10_tables_0",
      lessonId: "w10-tables",
      stepIndex: 0,
      app: "word",
      path: "Insert > Tables > Table",
      instruction: "Place your insertion cursor where the table is needed, go to the Insert tab, and click Table.",
      hint: "Menu path: Insert > Tables > Table. Execute this action in the simulator above.",
      showMeTarget: "#ribbon-tab-insert",
      startState: { activeTab: "home" },
      check: function (state) {
        if (state.activeTab === "insert") return { pass: true };
        return { pass: false, message: "Switch to the Insert tab." };
      }
    },
    {
      id: "w10_tables_1",
      lessonId: "w10-tables",
      stepIndex: 1,
      app: "word",
      path: "Insert > Table > Insert Table...",
      instruction: "Drag across the grid to select rows and columns, or click 'Insert Table...' to specify exact columns and rows.",
      hint: "Menu path: Insert > Table > Insert Table.... Execute this action in the simulator above.",
      showMeTarget: "#tool-insert-table",
      startState: { activeTab: "insert", hasTable: false },
      check: function (state) {
        if (state.hasTable && state.tableRows >= 3) return { pass: true };
        return { pass: false, message: "Insert a table with at least 3 rows and columns." };
      }
    },
    {
      id: "w10_tables_2",
      lessonId: "w10-tables",
      stepIndex: 2,
      app: "word",
      path: "Table Tools > Layout > Alignment > Center",
      instruction: "Highlight the entire table (click the four-headed arrow icon at the top-left of the table) and press Ctrl+E (or Home > Center) to center the table on the page.",
      hint: "Menu path: Table Tools > Layout > Alignment > Center. Execute this action in the simulator above.",
      showMeTarget: "#tool-align-center",
      startState: { hasTable: true, tableCentered: false },
      check: function (state) {
        if (state.tableCentered || (state.hasTable && state.alignment === "center")) return { pass: true };
        return { pass: false, message: "Center align the table on the page (Ctrl+E)." };
      }
    },
    {
      id: "w10_tables_3",
      lessonId: "w10-tables",
      stepIndex: 3,
      app: "word",
      path: "References > Captions > Insert Caption > Label: Table > Position: Above selected item",
      instruction: "With table selected, go to References > 'Insert Caption'. Set Label to 'Table', verify Position is 'Above selected item', type your title, and click OK.",
      hint: "Menu path: References > Captions > Insert Caption > Label: Table > Position: Above selected item. Execute this action in the simulator above.",
      showMeTarget: "#tool-insert-caption",
      startState: { hasTable: true, hasTableCaption: false },
      check: function (state) {
        if (state.hasTableCaption && state.tableCaptionPosition === "above") return { pass: true };
        return { pass: false, message: "Insert Table caption with Position strictly 'Above selected item'." };
      }
    },
    {
      id: "w10_tables_4",
      lessonId: "w10-tables",
      stepIndex: 4,
      app: "word",
      path: "Home > Font > Bold (Ctrl+B)",
      instruction: "Bold the caption label and number (Ctrl+B) and format at 10 pt font.",
      hint: "Menu path: Home > Font > Bold (Ctrl+B). Execute this action in the simulator above.",
      showMeTarget: "#tool-bold",
      startState: { hasTableCaption: true, tableCaptionBold: false, tableCaptionSize: 12 },
      check: function (state) {
        if (state.tableCaptionBold && state.tableCaptionSize <= 10) return { pass: true };
        return { pass: false, message: "Bold the table caption label/number (Ctrl+B) at 10 pt font size." };
      }
    },
    {
      id: "w10_tables_5",
      lessonId: "w10-tables",
      stepIndex: 5,
      app: "word",
      path: "Home > Font > 10 pt & Table Cells",
      instruction: "Select all table cells, set font size to 10 pt, enter column headers, and fill cells. If a data cell has no value, type an em-dash (—).",
      hint: "Menu path: Home > Font > 10 pt & Table Cells. Execute this action in the simulator above.",
      showMeTarget: ".word-table-cell",
      startState: { hasTable: true, tableFontSize: 12, hasEmDash: false },
      check: function (state) {
        if (state.hasTable && state.tableFontSize === 10 && state.hasEmDash) return { pass: true };
        return { pass: false, message: "Set table cell font to 10 pt and enter em-dash (—) for missing data." };
      }
    },
    {
      id: "w10_tables_6",
      lessonId: "w10-tables",
      stepIndex: 6,
      app: "word",
      path: "Table Design / Table Layout",
      instruction: "Use Table Design tab to style borders and header shading; use Table Layout tab to align column text (numbers right-aligned or centered, labels left-aligned).",
      hint: "Menu path: Table Design / Table Layout. Execute this action in the simulator above.",
      showMeTarget: "#tool-table-style",
      startState: { hasTable: true, tableHeaderShaded: false },
      check: function (state) {
        if (state.tableHeaderShaded || state.tableStyled) return { pass: true };
        return { pass: false, message: "Apply header row shading and border styling to the table." };
      }
    }
  ],
  "w11-tables-figures-lists": [
    {
      id: "w11_tables_figures_lists_0",
      lessonId: "w11-tables-figures-lists",
      stepIndex: 0,
      app: "word",
      path: "References > Captions > Insert Caption",
      instruction: "Ensure all figures in your document have captions added via References > Insert Caption (Label: Figure) and all tables have captions (Label: Table).",
      hint: "Menu path: References > Captions > Insert Caption. Execute this action in the simulator above.",
      showMeTarget: "#tool-insert-caption",
      startState: { hasFigureCaption: true, hasTableCaption: true },
      check: function (state) {
        if (state.hasFigureCaption && state.hasTableCaption) return { pass: true };
        return { pass: false, message: "Ensure all figures and tables have captions added via Insert Caption." };
      }
    },
    {
      id: "w11_tables_figures_lists_1",
      lessonId: "w11-tables-figures-lists",
      stepIndex: 1,
      app: "word",
      path: "Preliminary Section (Front Matter)",
      instruction: "Place your cursor on the preliminary page where you want the List of Figures to appear.",
      hint: "Menu path: Preliminary Section (Front Matter). Execute this action in the simulator above.",
      showMeTarget: ".preliminary-page-marker",
      startState: { activeSection: 2 },
      check: function (state) {
        if (state.activeSection === 1 || state.cursorOnPreliminaryPage) return { pass: true };
        return { pass: false, message: "Place cursor on the preliminary front matter page." };
      }
    },
    {
      id: "w11_tables_figures_lists_2",
      lessonId: "w11-tables-figures-lists",
      stepIndex: 2,
      app: "word",
      path: "References > Captions > Insert Table of Figures",
      instruction: "Switch to the References tab and click 'Insert Table of Figures' in the Captions group.",
      hint: "Menu path: References > Captions > Insert Table of Figures. Execute this action in the simulator above.",
      showMeTarget: "#ribbon-tab-references",
      startState: { activeTab: "home" },
      check: function (state) {
        if (state.activeTab === "references") return { pass: true };
        return { pass: false, message: "Switch to the References tab." };
      }
    },
    {
      id: "w11_tables_figures_lists_3",
      lessonId: "w11-tables-figures-lists",
      stepIndex: 3,
      app: "word",
      path: "Table of Figures Dialog > Caption label: Figure > OK",
      instruction: "In the dialog box, ensure 'Caption label' is set to 'Figure', choose your Tab leader (e.g. dotted lines), ensure 'Right align page numbers' is checked, and click OK.",
      hint: "Menu path: Table of Figures Dialog > Caption label: Figure > OK. Execute this action in the simulator above.",
      showMeTarget: "#tool-insert-list-figures",
      startState: { activeTab: "references", hasListOfFigures: false },
      check: function (state) {
        if (state.hasListOfFigures) return { pass: true };
        return { pass: false, message: "Click 'Insert Table of Figures' (Caption label: Figure) and click OK." };
      }
    },
    {
      id: "w11_tables_figures_lists_4",
      lessonId: "w11-tables-figures-lists",
      stepIndex: 4,
      app: "word",
      path: "Table of Figures Dialog > Caption label: Table > OK",
      instruction: "To generate the Table of Tables: move cursor below the List of Figures, click 'Insert Table of Figures' again, but change 'Caption label' to 'Table', then click OK.",
      hint: "Menu path: Table of Figures Dialog > Caption label: Table > OK. Execute this action in the simulator above.",
      showMeTarget: "#tool-insert-list-tables",
      startState: { hasListOfFigures: true, hasListOfTables: false },
      check: function (state) {
        if (state.hasListOfTables) return { pass: true };
        return { pass: false, message: "Click 'Insert Table of Figures' with Caption label: Table to insert Table of Tables." };
      }
    },
    {
      id: "w11_tables_figures_lists_5",
      lessonId: "w11-tables-figures-lists",
      stepIndex: 5,
      app: "word",
      path: "References > Captions > Update Table (or Right-Click > Update Field)",
      instruction: "To refresh entries after making edits: select the table, click References > 'Update Table' (choose 'Update entire table'), or right-click the list and select 'Update Field'.",
      hint: "Menu path: References > Captions > Update Table (or Right-Click > Update Field). Execute this action in the simulator above.",
      showMeTarget: "#tool-update-lists",
      startState: { hasListOfFigures: true, listsUpdated: false },
      check: function (state) {
        if (state.listsUpdated) return { pass: true };
        return { pass: false, message: "Click 'Update Table' to refresh figure and table lists." };
      }
    }
  ],
  "w12-equations": [
    {
      id: "w12_equations_0",
      lessonId: "w12-equations",
      stepIndex: 0,
      app: "word",
      path: "Insert > Symbols > Equation (Alt + =)",
      instruction: "Place your cursor on a new line and go to Insert > Symbols > Equation (or press the keyboard shortcut Alt + =).",
      hint: "Menu path: Insert > Symbols > Equation (Alt + =). Execute this action in the simulator above.",
      showMeTarget: "#tool-insert-equation",
      startState: { hasEquation: false },
      check: function (state) {
        if (state.hasEquation) return { pass: true };
        return { pass: false, message: "Insert an Equation via Insert > Equation (or Alt + =)." };
      }
    },
    {
      id: "w12_equations_1",
      lessonId: "w12-equations",
      stepIndex: 1,
      app: "word",
      path: "Equation Tools > Structures & Symbols",
      instruction: "Use the Equation ribbon tools to type variables, Greek symbols (α, β, θ, λ), fractions, subscripts/superscripts (V_T, I_ph, R_sh), and integrals.",
      hint: "Menu path: Equation Tools > Structures & Symbols. Execute this action in the simulator above.",
      showMeTarget: ".word-equation-box",
      startState: { hasEquation: true, equationHasVariables: false },
      check: function (state) {
        if (state.hasEquation && state.equationHasVariables) return { pass: true };
        return { pass: false, message: "Type equation symbols and variables (e.g. E = mc² or V_T = kT/q)." };
      }
    },
    {
      id: "w12_equations_2",
      lessonId: "w12-equations",
      stepIndex: 2,
      app: "word",
      path: "Home > Paragraph > Center",
      instruction: "Center the equation line (Ctrl+E).",
      hint: "Menu path: Home > Paragraph > Center. Execute this action in the simulator above.",
      showMeTarget: "#tool-align-center",
      startState: { hasEquation: true, equationCentered: false },
      check: function (state) {
        if (state.hasEquation && state.equationCentered) return { pass: true };
        return { pass: false, message: "Center align the equation line (Ctrl+E)." };
      }
    },
    {
      id: "w12_equations_3",
      lessonId: "w12-equations",
      stepIndex: 3,
      app: "word",
      path: "References > Insert Caption > Label: Equation > Exclude label from caption",
      instruction: "To add a clean right-aligned equation number: at the end of the equation inside the equation box, type '#(1)' and press Enter, OR use References > Insert Caption (Label: Equation, tick 'Exclude label from caption' to yield just '(1)').",
      hint: "Menu path: References > Insert Caption > Label: Equation > Exclude label from caption. Execute this action in the simulator above.",
      showMeTarget: "#tool-number-equation",
      startState: { hasEquation: true, equationNumbered: false },
      check: function (state) {
        if (state.hasEquation && state.equationNumbered) return { pass: true };
        return { pass: false, message: "Add right-aligned equation number (1) in parentheses." };
      }
    },
    {
      id: "w12_equations_4",
      lessonId: "w12-equations",
      stepIndex: 4,
      app: "word",
      path: "References > Captions > Cross-reference > Reference type: Equation",
      instruction: "In your body paragraph, refer to the formula by name: type '...as defined by eqn. (1)' and insert an automated cross-reference via References > Cross-reference.",
      hint: "Menu path: References > Captions > Cross-reference > Reference type: Equation. Execute this action in the simulator above.",
      showMeTarget: ".word-body-zone",
      startState: { hasEquation: true, bodyText: "" },
      check: function (state) {
        if (state.bodyText && (state.bodyText.includes("eqn. (1)") || state.bodyText.includes("(1)"))) return { pass: true };
        return { pass: false, message: "Cite the equation in body text as 'eqn. (1)'." };
      }
    }
  ],
  "w13-citations-references": [
    {
      id: "w13_citations_references_0",
      lessonId: "w13-citations-references",
      stepIndex: 0,
      app: "word",
      path: "References > Citations & Bibliography",
      instruction: "Go to the References tab on the ribbon and find the 'Citations & Bibliography' group.",
      hint: "Menu path: References > Citations & Bibliography. Execute this action in the simulator above.",
      showMeTarget: "#ribbon-tab-references",
      startState: { activeTab: "home" },
      check: function (state) {
        if (state.activeTab === "references") return { pass: true };
        return { pass: false, message: "Switch to the References tab." };
      }
    },
    {
      id: "w13_citations_references_1",
      lessonId: "w13-citations-references",
      stepIndex: 1,
      app: "word",
      path: "References > Citations & Bibliography > Style: IEEE",
      instruction: "Click the 'Style' dropdown menu and select 'IEEE' (or the professor's specified standard, e.g., APA/Harvard).",
      hint: "Menu path: References > Citations & Bibliography > Style: IEEE. Execute this action in the simulator above.",
      showMeTarget: "#tool-citation-style",
      startState: { activeTab: "references", citationStyle: "APA" },
      check: function (state) {
        if (state.citationStyle === "IEEE") return { pass: true };
        return { pass: false, message: "Set citation Style to IEEE." };
      }
    },
    {
      id: "w13_citations_references_2",
      lessonId: "w13-citations-references",
      stepIndex: 2,
      app: "word",
      path: "Text Cursor Position",
      instruction: "Place your cursor at the end of the sentence or fact you are citing (before the period).",
      hint: "Menu path: Text Cursor Position. Execute this action in the simulator above.",
      showMeTarget: ".word-body-zone",
      startState: { citationCursorReady: false },
      check: function (state) {
        if (state.citationCursorReady || state.hasInTextCitation) return { pass: true };
        return { pass: false, message: "Place text cursor at the end of the sentence to cite." };
      }
    },
    {
      id: "w13_citations_references_3",
      lessonId: "w13-citations-references",
      stepIndex: 3,
      app: "word",
      path: "References > Insert Citation > Add New Source...",
      instruction: "Click 'Insert Citation' > 'Add New Source...'. Select the source type (e.g., 'Journal Article', 'Book', 'Conference Proceedings', or 'Report') and fill in Author, Title, Journal Name, Year, Pages, and Volume.",
      hint: "Menu path: References > Insert Citation > Add New Source.... Execute this action in the simulator above.",
      showMeTarget: "#tool-add-source",
      startState: { sourceAdded: false },
      check: function (state) {
        if (state.sourceAdded || state.sourcesCount >= 1) return { pass: true };
        return { pass: false, message: "Click 'Insert Citation' > 'Add New Source...' and fill details." };
      }
    },
    {
      id: "w13_citations_references_4",
      lessonId: "w13-citations-references",
      stepIndex: 4,
      app: "word",
      path: "Source Dialog > OK",
      instruction: "Click OK. Word will insert the IEEE numbered citation bracket (e.g. [1]) into your sentence.",
      hint: "Menu path: Source Dialog > OK. Execute this action in the simulator above.",
      showMeTarget: "#tool-insert-citation",
      startState: { sourceAdded: true, hasInTextCitation: false },
      check: function (state) {
        if (state.hasInTextCitation || (state.bodyText && state.bodyText.includes("[1]"))) return { pass: true };
        return { pass: false, message: "Insert the IEEE bracketed citation [1] in text." };
      }
    },
    {
      id: "w13_citations_references_5",
      lessonId: "w13-citations-references",
      stepIndex: 5,
      app: "word",
      path: "References > Bibliography > References",
      instruction: "At the end of your report document, create a new section, click References > 'Bibliography', and choose 'References' to automatically generate the full numbered bibliography.",
      hint: "Menu path: References > Bibliography > References. Execute this action in the simulator above.",
      showMeTarget: "#tool-insert-bibliography",
      startState: { hasInTextCitation: true, hasBibliography: false },
      check: function (state) {
        if (state.hasBibliography && (state.bodyText && state.bodyText.includes("References"))) return { pass: true };
        return { pass: false, message: "Generate the automated References section at the end of the report." };
      }
    }
  ],
  "w14-styles-themes": [
    {
      id: "w14_styles_themes_0",
      lessonId: "w14-styles-themes",
      stepIndex: 0,
      app: "word",
      path: "Home > Styles > Dialog Launcher (Alt+Ctrl+Shift+S)",
      instruction: "Open the Styles task pane by clicking the small dialog launcher arrow in the bottom-right corner of Home > Styles (shortcut Alt+Ctrl+Shift+S).",
      hint: "Menu path: Home > Styles > Dialog Launcher (Alt+Ctrl+Shift+S). Execute this action in the simulator above.",
      showMeTarget: "#tool-styles-pane",
      startState: { stylesPaneOpen: false },
      check: function (state) {
        if (state.stylesPaneOpen) return { pass: true };
        return { pass: false, message: "Open the Styles task pane (dialog launcher arrow in Home > Styles)." };
      }
    },
    {
      id: "w14_styles_themes_1",
      lessonId: "w14-styles-themes",
      stepIndex: 1,
      app: "word",
      path: "Modify Style Dialog > Style based on: (no style)",
      instruction: "To modify a style without unintended side-effects: right-click the style (e.g., Heading 1) > Modify... > set 'Style based on' to '(no style)' so changes to Normal do not cascade.",
      hint: "Menu path: Modify Style Dialog > Style based on: (no style). Execute this action in the simulator above.",
      showMeTarget: "#tool-modify-style",
      startState: { stylesPaneOpen: true, styleBasedOnNone: false },
      check: function (state) {
        if (state.styleBasedOnNone) return { pass: true };
        return { pass: false, message: "In Modify Style, set 'Style based on: (no style)' to avoid cascading." };
      }
    },
    {
      id: "w14_styles_themes_2",
      lessonId: "w14-styles-themes",
      stepIndex: 2,
      app: "word",
      path: "Styles Task Pane > New Style (A+ button)",
      instruction: "To create a brand-new custom style: in the Styles pane, click the 'New Style' button (A+ icon at bottom), name it, choose Style type ('Paragraph' or 'Character'), set font/spacing, and tick 'Add to the Styles gallery'.",
      hint: "Menu path: Styles Task Pane > New Style (A+ button). Execute this action in the simulator above.",
      showMeTarget: "#tool-new-style",
      startState: { stylesPaneOpen: true, customStyleCreated: false },
      check: function (state) {
        if (state.customStyleCreated) return { pass: true };
        return { pass: false, message: "Click New Style (A+ icon) to create a custom style." };
      }
    },
    {
      id: "w14_styles_themes_3",
      lessonId: "w14-styles-themes",
      stepIndex: 3,
      app: "word",
      path: "Modify Style Dialog > Format > Border & Shading",
      instruction: "To add borders or shading to a style: in the Modify Style dialog, click the 'Format' button in the bottom-left > click 'Border...' > choose Box border, line width, and Shading fill color.",
      hint: "Menu path: Modify Style Dialog > Format > Border & Shading. Execute this action in the simulator above.",
      showMeTarget: "#tool-style-border",
      startState: { customStyleCreated: true, styleHasBorderOrShading: false },
      check: function (state) {
        if (state.styleHasBorderOrShading) return { pass: true };
        return { pass: false, message: "Add borders or shading to the custom style." };
      }
    },
    {
      id: "w14_styles_themes_4",
      lessonId: "w14-styles-themes",
      stepIndex: 4,
      app: "word",
      path: "View > Show > Navigation Pane",
      instruction: "Open the Document Map for easy jumping through long reports: go to the View tab and check 'Navigation Pane'. Click any heading to navigate instantly.",
      hint: "Menu path: View > Show > Navigation Pane. Execute this action in the simulator above.",
      showMeTarget: "#tool-navigation-pane",
      startState: { activeTab: "view", navigationPaneOpen: false },
      check: function (state) {
        if (state.navigationPaneOpen) return { pass: true };
        return { pass: false, message: "Go to View > check 'Navigation Pane' to display Document Map." };
      }
    },
    {
      id: "w14_styles_themes_5",
      lessonId: "w14-styles-themes",
      stepIndex: 5,
      app: "word",
      path: "Design > Document Formatting > Themes / Colors / Fonts",
      instruction: "Apply or customize global document aesthetics via Design tab: explore Design > Themes, Colors, and Fonts to synchronize header and accent styling.",
      hint: "Menu path: Design > Document Formatting > Themes / Colors / Fonts. Execute this action in the simulator above.",
      showMeTarget: "#tool-themes-palette",
      startState: { themeApplied: false },
      check: function (state) {
        if (state.themeApplied || state.colorPaletteChanged) return { pass: true };
        return { pass: false, message: "Apply a document Theme or Color palette via the Design tab." };
      }
    }
  ]
};

// Verification policy for the 140 lesson steps. Excel checks inspect actual
// cell values/formulas, selections, formatting, analysis output, or chart state.
(function () {
  'use strict';

  const manualWordSteps = {
    'w11-tables-figures-lists': [1],
    'w13-citations-references': [2, 3, 5],
    'w14-styles-themes': [0, 1, 2, 3, 5]
  };

  const result = function (pass, message) {
    return pass ? { pass: true } : { pass: false, message: message };
  };
  const cell = function (state, address) {
    return String((state && state.cells && state.cells[address]) ?? '').trim();
  };
  const matchesRange = function (state, expected) {
    return String(state && state.selectedRange || '').replace(/\$/g, '').toUpperCase() === expected.toUpperCase();
  };
  const hasDataRows = function (state, col, start, end) {
    for (let row = start; row <= end; row++) if (!cell(state, col + row)) return false;
    return true;
  };
  const formulasIn = function (state, col, start, end, pattern) {
    for (let row = start; row <= end; row++) if (!pattern.test(cell(state, col + row))) return false;
    return true;
  };
  const numericValues = function (state, range) {
    const parts = range.split(':');
    const parse = address => {
      const m = address.match(/^([A-Z]+)(\d+)$/);
      let column = 0;
      for (const ch of m[1]) column = column * 26 + ch.charCodeAt(0) - 64;
      return { row: Number(m[2]), column };
    };
    const a = parse(parts[0]); const b = parse(parts[1] || parts[0]); const values = [];
    for (let r = Math.min(a.row, b.row); r <= Math.max(a.row, b.row); r++) {
      for (let c = Math.min(a.column, b.column); c <= Math.max(a.column, b.column); c++) {
        const address = (function (index) { let name = ''; for (let n = index; n; n = Math.floor((n - 1) / 26)) name = String.fromCharCode(65 + (n - 1) % 26) + name; return name; })(c) + r;
        const value = Number(state && state.values && state.values[address]);
        if (Number.isFinite(value)) values.push(value);
      }
    }
    return values;
  };
  const putColumn = function (cells, col, values, startRow) {
    values.forEach(function (value, index) { cells[col + (startRow + index)] = String(value); });
  };
  const excelStart = function (lessonId, index) {
    const start = { activeTab: 'home', activeCell: 'A1', selectedRange: 'A1', cells: {}, styles: {} };
    const cells = start.cells;
    const before = [142, 140, 144, 144, 142, 146, 149, 148, 142, 148];
    const after = [140, 136, 147, 139, 143, 142, 145, 145, 138, 146];
    const scores = [65, 91, 85, 76, 85, 87, 79, 93, 82, 75, 100, 70, 88, 78, 83, 59, 87, 69, 89, 54, 74, 89, 83, 80, 94, 67, 77, 92, 82, 70, 94, 84, 96, 98, 46, 70, 90, 96, 88, 72];
    const ages = [58, 30, 37, 36, 34, 49, 35, 40, 47, 47, 39, 54, 47, 48, 54, 50, 35, 40, 38, 47, 48, 34, 40, 46, 49, 47, 35, 48, 47, 46];
    const usePairs = function (headers, a, b, firstRow) {
      headers.forEach((value, i) => { cells[String.fromCharCode(65 + i) + '1'] = value; });
      putColumn(cells, 'A', a, firstRow || 2); putColumn(cells, 'B', b, firstRow || 2);
    };
    if (lessonId === 'e01-entering-data-formulas') {
      if (index >= 2) { cells.A1 = 'Before'; cells.B1 = 'After'; cells.C1 = 'Difference'; }
      if (index >= 3) { putColumn(cells, 'A', before, 2); putColumn(cells, 'B', after, 2); }
      if (index >= 4) cells.C2 = '=B2-A2';
      start.activeCell = index === 3 || index === 4 ? 'C2' : 'A1';
      start.selectedRange = start.activeCell;
    } else if (lessonId === 'e02-summary-statistics') {
      cells.A1 = 'Before'; putColumn(cells, 'A', before, 2); start.inputRange = index >= 5 ? 'A2:A11' : ''; start.outputCell = index >= 6 ? 'E2' : '';
    } else if (lessonId === 'e03-chart-anatomy') {
      usePairs(['Category', 'Voltage (V)'], ['Trial 1', 'Trial 2', 'Trial 3', 'Trial 4'], [2.4, 3.3, 2.8, 2.7]);
      start.selectedRange = index === 0 ? 'A1' : 'A1:B5'; start.activeCell = 'A1';
    } else if (lessonId === 'e04-column-bar-charts') {
      if (index > 0) {
        const labels = ['Category', 'Hospital', 'Physician', 'Drugs', 'Other personal', 'Nursing home', 'Dental', 'Administration', 'Public health', 'Home health', 'Research', 'Construction', 'Equipment'];
        const amounts = ['Amount ($bn)', 371, 218, 109, 92, 83, 51, 50, 39, 32, 18, 17, 14];
        putColumn(cells, 'A', labels, 1); putColumn(cells, 'B', amounts, 1);
      }
      if (index === 5) { cells.C1 = 'Day 2 (kg)'; putColumn(cells, 'C', [14, 17, 12, 19, 16], 2); }
      start.selectedRange = index === 1 ? 'A1' : index >= 2 ? (index === 5 ? 'A1:C6' : 'A1:B13') : 'A1';
    } else if (lessonId === 'e05-pie-charts') {
      if (index > 0) usePairs(['Location', 'Percent'], ['In closet', 'Under bed', 'In bathtub', 'In freezer'], [68, 23, 6, 3]);
      start.selectedRange = index === 1 ? 'A1' : index > 1 ? 'A1:B5' : 'A1';
    } else if (lessonId === 'e06-line-charts') {
      if (index > 0) usePairs(['Year', 'Population (Millions)'], [1860, 1870, 1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950], [31.4, 39.8, 50.2, 62.9, 76, 92, 105.7, 122.8, 131.7, 151.1]);
      start.selectedRange = index === 1 ? 'A1' : index > 1 ? 'A1:B11' : 'A1';
    } else if (lessonId === 'e07-histograms') {
      cells.A1 = 'Scores'; putColumn(cells, 'A', scores, 2); start.selectedRange = 'A1:A41'; start.inputRange = ''; start.outputCell = 'D2';
      start.histogram = { classWidth: index === 0 ? 9 : 10, bins: [], gapWidth: 30 };
      if (index >= 3) putColumn(cells, 'C', [50, 60, 70, 80, 90, 100], 2);
      if (index === 5) {
        start.histogram.bins = [50, 60, 70, 80, 90, 100];
        start.chart = { type: 'histogram', labels: ['41–50', '51–60', '61–70', '71–80', '81–90', '91–100'], values: [1, 2, 6, 8, 14, 9], title: 'Score frequency', xTitle: 'Score range', yTitle: 'Frequency', gapWidth: 30, seriesCount: 1 };
      }
    } else if (lessonId === 'e08-dot-plots') {
      cells.A1 = 'Age'; putColumn(cells, 'A', ages, 2);
      if (index >= 2) for (let row = 2; row <= 31; row++) cells['B' + row] = `=COUNTIF($A$2:A${row},A${row})`;
      start.selectedRange = index === 2 ? 'A2' : index >= 3 ? 'A2:B31' : 'A2:A31';
      if (index > 0) start.activeTab = 'data';
    } else if (lessonId === 'e09-choosing-charts') {
      usePairs(['Region', 'Area (million sq mi)'], ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'], [11.7, 17.2, 3.9, 9.4, 3.3, 6.9]);
      start.selectedRange = 'A1:B7';
    }
    return start;
  };

  const excelChecks = {
    'e01-entering-data-formulas': [
      state => result(state.activeCell === 'A1', 'Select cell A1 to begin the worksheet.'),
      state => result(['Before', 'After', 'Difference'].every((value, i) => cell(state, String.fromCharCode(65 + i) + '1').toLowerCase().includes(value.toLowerCase())), 'Enter the Before, After, and Difference headings in A1:C1.'),
      state => result(hasDataRows(state, 'A', 2, 11) && hasDataRows(state, 'B', 2, 11), 'Enter all ten measurement pairs in columns A and B, rows 2–11.'),
      state => result(/^=\s*B2\s*-\s*A2$/i.test(cell(state, 'C2')) && Math.abs(Number(state.values.C2) - (Number(state.values.B2) - Number(state.values.A2))) < 1e-8, 'C2 must contain a working =B2-A2 cell-reference formula.'),
      state => result(formulasIn(state, 'C', 2, 11, /^=\s*B\d+\s*-\s*A\d+$/i) && Math.abs(Number(state.values.C11) - (Number(state.values.B11) - Number(state.values.A11))) < 1e-8, 'Fill the relative difference formula through C11.')
    ],
    'e02-summary-statistics': [
      state => result(state.analysisEnabled, 'Enable the Analysis ToolPak before using Data Analysis.'),
      state => result(state.activeTab === 'data', 'Switch to the Data ribbon tab.'),
      state => result(state.analysisOpen, 'Open the Data Analysis panel from the Data tab.'),
      state => result(state.analysisType === 'Descriptive Statistics', 'Choose Descriptive Statistics as the analysis tool.'),
      state => result(String(state.inputRange).replace(/\$/g, '').toUpperCase() === 'A2:A11', 'Set the input range to A2:A11.'),
      state => result(String(state.outputCell).replace(/\$/g, '').toUpperCase() === 'E2', 'Choose an empty output cell such as E2.'),
      state => result(state.summaryStatistics && state.statsGenerated && Math.abs(Number(state.values.F3) - 144.5) < 0.02 && Math.abs(Number(state.values.F4) - 3.10018) < 0.03 && Number(state.values.F6) === 10, 'Generate the summary table and verify mean 144.5, standard deviation about 3.1002, and count 10.')
    ],
    'e03-chart-anatomy': [
      state => result(matchesRange(state, 'A1:B5'), 'Select the data and headings in A1:B5.'),
      state => result(state.activeTab === 'insert', 'Open the Insert ribbon tab.'),
      state => result(!!state.chart && ['column', 'line', 'pie', 'scatter'].includes(state.chart.type), 'Insert a chart from the selected worksheet range.'),
      state => result(state.chartElementsAdded && state.chart && state.chart.title && state.chart.xTitle && state.chart.yTitle && /\([^)]*\)/.test(state.chart.yTitle), 'Add a chart title and axis titles with measurement units.'),
      state => result(state.chart && state.chart.formatted && state.chart.formattedElement, 'Format a chart element; the chart should show the applied style.')
    ],
    'e04-column-bar-charts': [
      state => result(hasDataRows(state, 'A', 2, 13) && hasDataRows(state, 'B', 2, 13), 'Enter category labels and values in columns A and B.'),
      state => result(matchesRange(state, 'A1:B13'), 'Select the headings and dataset in A1:B13.'),
      state => result(state.activeTab === 'insert', 'Open the Insert tab and chart group.'),
      state => result(state.chart && state.chart.type === 'column', 'Insert a clustered column chart for vertical columns.'),
      state => result(state.chart && state.chart.type === 'bar', 'Insert a clustered bar chart for horizontal bars.'),
      state => result(state.chart && state.chart.type === 'column' && state.chart.seriesCount >= 2 && matchesRange(state, 'A1:C6'), 'Select A1:C6 and insert a multi-series clustered chart with at least two series.')
    ],
    'e05-pie-charts': [
      state => result(hasDataRows(state, 'A', 2, 5) && hasDataRows(state, 'B', 2, 5), 'Enter category names and values in columns A and B.'),
      state => result(matchesRange(state, 'A1:B5'), 'Select the labels and values in A1:B5.'),
      state => result(state.activeTab === 'insert', 'Open the Insert tab and choose a pie chart.'),
      state => result(state.chart && state.chart.type === 'pie' && state.chart.subtype === '2-D Pie', 'Choose a standard 2-D pie chart or an exploded pie subtype.'),
      state => result(state.chart && state.chartLabelsPercent, 'Turn on percentage data labels for the pie slices.'),
      state => {
        const rows = [2, 3, 4, 5];
        const formulasMatch = rows.every(row => new RegExp('^=\\s*B' + row + '\\s*\\*\\s*3\\.6$', 'i').test(cell(state, 'C' + row)));
        const anglesMatch = rows.every(row => Math.abs(Number(state.values['C' + row]) - Number(state.values['B' + row]) * 3.6) < 0.1);
        return result(formulasMatch && anglesMatch && Math.abs(rows.reduce((sum, row) => sum + Number(state.values['C' + row] || 0), 0) - 360) < 0.1, 'Use =B2*3.6 through =B5*3.6 and verify the sector angles total 360°.')
      }
    ],
    'e06-line-charts': [
      state => result(hasDataRows(state, 'A', 1, 11) && hasDataRows(state, 'B', 1, 11), 'Organize time and measured values in columns A and B with headings.'),
      state => result(matchesRange(state, 'A1:B11'), 'Select both headed columns in A1:B11.'),
      state => result(state.activeTab === 'insert', 'Open the Insert tab and select a line chart.'),
      state => result(state.chart && state.chart.type === 'line', 'Create a 2-D line chart with markers or a standard line chart.'),
      state => result(state.chartElementsAdded && state.chart && /year/i.test(state.chart.xTitle) && /population/i.test(state.chart.yTitle) && /\(/.test(state.chart.yTitle), 'Set the horizontal axis to Year and the vertical axis to Population (Millions).'),
      state => result(state.chart && ['date', 'text'].includes(state.chartAxisType), 'Set the horizontal axis type to Date or Text.')
    ],
    'e07-histograms': [
      state => result(Number(state.histogram.classWidth) === 10, 'Set class width to 10 after rounding the calculated width up.'),
      state => result(state.chart && state.chart.type === 'histogram', 'Insert a histogram from the numeric scores.'),
      state => result([50, 60, 70, 80, 90, 100].every((value, i) => Number(cell(state, 'C' + (i + 2))) === value), 'Enter upper bin limits 50, 60, 70, 80, 90, and 100 in C2:C7.'),
      state => result(state.analysisOpen && state.activeTab === 'data' && state.analysisType === 'Histogram', 'Open Data Analysis and select Histogram.'),
      state => result(String(state.inputRange).replace(/\$/g, '').toUpperCase() === 'A2:A41' && String(state.binRange).replace(/\$/g, '').toUpperCase() === 'C2:C7' && [50, 60, 70, 80, 90, 100].every((value, i) => Number(cell(state, 'C' + (i + 2))) === value) && state.chartOutput && state.histogramGenerated && [1, 2, 6, 8, 14, 9].every((value, i) => Number(state.values['E' + (i + 2)]) === value) && state.chart && state.chart.type === 'histogram', 'Set the ranges, enable Chart Output, run the analysis, and verify frequencies 1, 2, 6, 8, 14, 9.'),
      state => result(state.chart && state.chart.type === 'histogram' && Number(state.chart.gapWidth) <= 2, 'Set the histogram gap width to 0–2%.')
    ],
    'e08-dot-plots': [
      state => {
        const nums = Array.from({ length: 30 }, (_, i) => Number(state.values['A' + (i + 2)]));
        return result(state.selectedSort === 'A-Z' && nums.every((value, i) => i === 0 || nums[i - 1] <= value), 'Sort the age data in column A from smallest to largest.')
      },
      state => result(formulasIn(state, 'B', 2, 31, /^=COUNTIF\(\$?A\$?2:A\d+,A\d+\)$/i) && [2, 3, 4, 5].every(row => Number(state.values['B' + row]) >= 1), 'Use the COUNTIF running-frequency formula in B2:B31 and fill it down.'),
      state => result(matchesRange(state, 'A2:B31'), 'Select the X values and stack heights in A2:B31.'),
      state => result(state.chart && state.chart.type === 'scatter' && state.chart.lineMode === 'markers', 'Insert a Scatter chart with markers only, without connecting lines.'),
      state => result(state.chart && !state.verticalAxisVisible && !state.gridlinesVisible, 'Hide the vertical axis and gridlines so the number line and stacked dots remain.'),
      state => result(state.markerStyle === 'x', 'Set the scatter marker style to X.')
    ],
    'e09-choosing-charts': [
      state => result(['categorical', 'time', 'numeric'].includes(state.decision.variableType), 'Classify the horizontal variable as categorical, continuous time, or numeric measurements.'),
      state => result(['small', 'large', 'not-applicable'].includes(state.decision.sampleSize), 'Choose the sample-size category for the numeric dataset.'),
      state => {
        const objective = state.decision.objective;
        const chart = state.chartSelection;
        const matchesObjective = (objective === 'compare' && chart === 'column')
          || (objective === 'proportion' && chart === 'pie')
          || (objective === 'distribution' && ['dot', 'histogram'].includes(chart));
        return result(matchesObjective, 'Match the chart to the objective: compare → column/bar, proportions → pie, distribution → dot plot or histogram.');
      },
      state => result(['yes', 'no'].includes(state.decision.timeSeries) && (state.decision.timeSeries !== 'yes' || state.chartSelection === 'line'), 'Identify whether this is continuous time-series data; use a line chart when it is.'),
      state => result(state.chart && state.chart.title && state.chart.xTitle && state.chart.yTitle && /\([^)]*\)/.test(state.chart.yTitle), 'Add a clear title and descriptive axis titles with units to the chosen chart.')
    ]
  };

  const excelSeedStates = {
    'e01-entering-data-formulas': [
      { activeCell: 'B1', selectedRange: 'B1' }, { activeCell: 'A1', selectedRange: 'A1' },
      { activeCell: 'A1', selectedRange: 'A1', cells: { A1: 'Before', B1: 'After', C1: 'Difference' } },
      { activeCell: 'C2', selectedRange: 'C2', cells: { A1: 'Before', B1: 'After', C1: 'Difference', A2: '142', B2: '140' } },
      { activeCell: 'C2', selectedRange: 'C2:C11', cells: { A1: 'Before', B1: 'After', C1: 'Difference', A2: '142', B2: '140', A3: '140', B3: '136', A4: '144', B4: '147', A5: '144', B5: '139', A6: '142', B6: '143', A7: '146', B7: '142', A8: '149', B8: '145', A9: '148', B9: '145', A10: '142', B10: '138', A11: '148', B11: '146', C2: '=B2-A2' } }
    ]
  };

  Object.keys(window.LESSON_TASKS).forEach(function (lessonId) {
    window.LESSON_TASKS[lessonId].forEach(function (task) {
      if (task.app === 'report') {
        task.isManual = true;
        task.manualReason = 'Compare this requirement with your complete report; the simulator cannot inspect an external document.';
        task.check = function () { return { pass: false, manual: true, message: task.manualReason }; };
        return;
      }

      if (task.app === 'excel') {
        const checker = excelChecks[lessonId] && excelChecks[lessonId][task.stepIndex];
        task.startState = Object.assign(excelStart(lessonId, task.stepIndex), (excelSeedStates[lessonId] || [])[task.stepIndex] || {});
        task.isManual = typeof checker !== 'function';
        task.check = checker || function () { return { pass: false, manual: true, message: 'This spreadsheet requirement is not currently auto-verifiable.' }; };
        task.manualReason = task.isManual ? 'This spreadsheet requirement is not currently auto-verifiable.' : '';
        return;
      }

      if (manualWordSteps[lessonId] && manualWordSteps[lessonId].indexOf(task.stepIndex) !== -1) {
        task.isManual = true;
        task.manualReason = 'This requirement needs document review that Mini Word does not yet model reliably.';
        task.check = function () {
          return { pass: false, manual: true, message: task.manualReason };
        };
      }

      // The step asks specifically for 1.5 spacing; 1.15 is not equivalent.
      if (lessonId === 'w07-line-spacing' && task.stepIndex === 1) {
        task.check = function (state) {
          if (state && Number(state.lineSpacing) === 1.5) return { pass: true };
          return { pass: false, message: 'Set line spacing to 1.5; the current value is ' + (state && state.lineSpacing || 'unset') + '.' };
        };
      }

      if (lessonId === 'w05-text-formatting' && task.stepIndex === 1) {
        task.check = function (state) {
          if (state && state.fontFamily === 'Times New Roman' && Number(state.fontSize) === 12) return { pass: true };
          return { pass: false, message: 'Set the body font to 12 pt Times New Roman.' };
        };
      }

      if (lessonId === 'w06-headings-toc' && task.stepIndex === 0) {
        task.check = function (state) {
          if (state && Number(state.heading1Size) === 16 && state.heading1Bold) return { pass: true };
          return { pass: false, message: 'Set Heading 1 to exactly 16 pt and bold.' };
        };
      }

      if (lessonId === 'w06-headings-toc' && task.stepIndex === 1) {
        task.check = function (state) {
          if (state && Number(state.heading2Size) === 14 && state.heading2Bold && Number(state.heading3Size) === 12 && state.heading3Bold) return { pass: true };
          return { pass: false, message: 'Set Heading 2 to 14 pt bold and Heading 3 to 12 pt bold.' };
        };
      }

      if (lessonId === 'w07-line-spacing' && task.stepIndex === 2) {
        task.check = function (state) {
          if (state && state.paragraphDialogOpen) return { pass: true };
          return { pass: false, message: 'Open the Paragraph spacing options before changing paragraph spacing.' };
        };
      }

      // Do not let the Lists task pass from its own initial state.
      if (lessonId === 'w11-tables-figures-lists' && task.stepIndex === 0) {
        task.startState = { hasFigureCaption: false, hasTableCaption: false };
      }
    });
  });

  // Public audit helper used by tests and the application to inspect all lesson steps.
  window.verifyLessonTasks = function () {
    const report = { total: 0, automatic: 0, manual: 0, issues: [] };
    (window.LESSONS || []).forEach(function (lesson) {
      const tasks = window.LESSON_TASKS[lesson.id] || [];
      if (tasks.length !== (lesson.steps || []).length) {
        report.issues.push(lesson.id + ': task count does not match lesson steps');
      }
      (lesson.steps || []).forEach(function (_, index) {
        report.total += 1;
        const task = tasks[index];
        if (!task || !task.check || !task.id || !task.instruction || !task.hint || !task.startState) {
          report.issues.push(lesson.id + ' step ' + (index + 1) + ': incomplete task definition');
        } else if (task.isManual) {
          report.manual += 1;
          const result = task.check({});
          if (!result || result.pass || !result.manual) report.issues.push(task.id + ': manual verifier is not explicitly manual');
        } else {
          report.automatic += 1;
        }
      });
    });
    return report;
  };
})();
