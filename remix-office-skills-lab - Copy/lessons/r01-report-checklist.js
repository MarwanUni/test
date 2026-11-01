window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "r01-report-checklist",
  group: "Report",
  title: "Formal Report Pre-Submission Audit Checklist",
  lecture: "Lectures 3, 4 & 5",
  goal: "Execute a comprehensive audit of your formal technical report against all professor requirements before the 17 November 2026 deadline.",
  rules: [
    "Course & Faculty: ELE123 Technical Reports / ELE114 Technical Report Writing — Dr. Christina Gamal, Faculty of Engineering (Shoubra), Benha University (2026-2027).",
    "Assignment Requirement: Prepare a formal technical report following standard technical report architecture on a topic of personal engineering interest.",
    "Official Submission Deadline: Tuesday, 17 November 2026.",
    "Core Software Stack: Microsoft Word for layout and formatting; Microsoft Excel for data analysis, summary statistics, and chart generation.",
    "Zero Tolerance Standards: No missing page numbers, no uncaptioned figures/tables, no relative references ('figure above'), and no unformatted default Word styles."
  ],
  steps: [
    {
      text: "Audit Page Layout: Verify paper size is strictly A4 (210 × 297 mm) and margins are 2.5 cm (standard) or Left ≥ 3.5 cm with 1.5 cm others (if bound). Single-sided print configuration.",
      path: "Audit 1: Layout > Size A4 & Margins"
    },
    {
      text: "Audit Cover Page & Preliminary Numbering: Confirm title page has NO page number. Confirm preliminary pages (Abstract, TOC, Lists) use lowercase Roman numerals (i, ii, iii...).",
      path: "Audit 2: Page Numbering (Roman Numerals)"
    },
    {
      text: "Audit Section Breaks & Main Body: Confirm a Section Break (Next Page) precedes the Introduction, 'Link to Previous' is turned off, and main body restarts cleanly at Arabic number 1.",
      path: "Audit 3: Layout > Breaks > Start at 1"
    },
    {
      text: "Audit Typography: Confirm body text is 12 pt Times New Roman, fully justified on both sides, with 1.5 line spacing. Verify tables/figures use 10 pt.",
      path: "Audit 4: Home > Font 12 pt & Justified (Ctrl+J)"
    },
    {
      text: "Audit Heading Hierarchy: Level 1 = 16 pt bold, Level 2 = 14 pt bold, Level 3 = 12 pt bold. Capitalize only the first letter (sentence case). Confirm 'Keep with next' is active.",
      path: "Audit 5: Styles > Headings 16/14/12 Bold (Sentence Case)"
    },
    {
      text: "Audit Figures: All figures centered, captions placed strictly BELOW the image in bold with consecutive numbering, and cross-referenced in text ('see Figure X'). No 'figure above'.",
      path: "Audit 6: References > Caption BELOW & Cross-reference"
    },
    {
      text: "Audit Tables: All tables centered, captions placed strictly ABOVE the table in bold with consecutive numbering, missing data marked with an em-dash (—), and cross-referenced in text.",
      path: "Audit 7: References > Caption ABOVE & Dash (—) for missing data"
    },
    {
      text: "Audit Equations: Centered on line, numbered consecutively in parentheses at right margin (1), and referenced in text as 'eqn. (1)' without 'equation above'.",
      path: "Audit 8: Equation (Alt+=) & Right-Aligned (1)"
    },
    {
      text: "Audit Excel Charts: Verify chart title, axis titles with physical units, consistent tick marks, zero-gap histograms where appropriate, and correct chart type selection.",
      path: "Audit 9: Excel Chart Elements & Units"
    },
    {
      text: "Audit Front Matter Lists & References: Right-click Table of Contents, Table of Figures, and Table of Tables to run 'Update Field' (Update entire table). Verify IEEE References list at the end.",
      path: "Audit 10: References > Update Table & IEEE Bibliography"
    }
  ],
  practice: "Run this complete 10-point audit on your draft technical report 48 hours before Tuesday 17 November 2026. Check off each item in this interactive lab as you verify your Word and Excel files.",
  mistakes: [
    "Submitting without refreshing the Table of Contents, resulting in page number mismatches.",
    "Swapping caption positions (putting figure captions above or table captions below).",
    "Writing relative spatial phrases ('as shown below', 'in the table above') which break when pagination changes.",
    "Leaving default US Letter size active instead of A4.",
    "Printing double-sided when assessment requires single-sided submission."
  ],
  check: [
    "Paper is A4 with appropriate margins (2.5 cm or 3.5 cm left for binding).",
    "Title page has no number; front matter is i, ii, iii; body starts at 1.",
    "Text is 12 pt Times New Roman, justified, 1.5 spaced.",
    "Headings use 16/14/12 pt bold in sentence case.",
    "Figures have captions BELOW in bold; Tables have captions ABOVE in bold.",
    "Missing table data marked with dash (—).",
    "Equations are centered and numbered (1).",
    "All figures, tables, and equations are explicitly cited in body text.",
    "IEEE References bibliography is complete and matches in-text citations.",
    "Report ready for submission by Tuesday 17 November 2026."
  ]
});
