window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "w10-tables",
  group: "Word",
  title: "Tables & Table Captions",
  lecture: "Lecture 3",
  goal: "Build structured data tables with bold captions ABOVE the table, missing-data dashes, and 10-pt styling.",
  rules: [
    "Tables summarize technical data in rows and columns.",
    "A dash (—) must be entered to explicitly indicate 'no data' (never leave cells blank).",
    "All tables must be centered horizontally on the page.",
    "Table captions are strictly placed ABOVE the table (opposite of figures).",
    "All tables must be labelled in BOLD with an appropriate consecutive number (e.g., 'Table 1: Electrical characteristics of BP SX-150').",
    "Every table must be referred to in the body text (e.g., 'see Table 1'); never write 'the table below'.",
    "10-point font is permitted and standard for table cell text.",
    "Separate tables from surrounding text with extra line spacing."
  ],
  steps: [
    {
      text: "Place your insertion cursor where the table is needed, go to the Insert tab, and click Table.",
      path: "Insert > Tables > Table"
    },
    {
      text: "Drag across the grid to select rows and columns, or click 'Insert Table...' to specify exact columns and rows.",
      path: "Insert > Table > Insert Table..."
    },
    {
      text: "Highlight the entire table (click the four-headed arrow icon at the top-left of the table) and press Ctrl+E (or Home > Center) to center the table on the page.",
      path: "Table Tools > Layout > Alignment > Center"
    },
    {
      text: "With table selected, go to References > 'Insert Caption'. Set Label to 'Table', verify Position is 'Above selected item', type your title, and click OK.",
      path: "References > Captions > Insert Caption > Label: Table > Position: Above selected item"
    },
    {
      text: "Bold the caption label and number (Ctrl+B) and format at 10 pt font.",
      path: "Home > Font > Bold (Ctrl+B)"
    },
    {
      text: "Select all table cells, set font size to 10 pt, enter column headers, and fill cells. If a data cell has no value, type an em-dash (—).",
      path: "Home > Font > 10 pt & Table Cells"
    },
    {
      text: "Use Table Design tab to style borders and header shading; use Table Layout tab to align column text (numbers right-aligned or centered, labels left-aligned).",
      path: "Table Design / Table Layout"
    }
  ],
  practice: "In Word, create a 4-column, 5-row table for solar panel specifications. Add a caption ABOVE labeled 'Table 1: PV Module Electrical Parameters'. Apply 10 pt text, center the table, use an em-dash (—) for unknown data, and cross-reference it in your body text ('presented in Table 1').",
  mistakes: [
    "Placing the caption BELOW the table (the technical standard requires table captions ABOVE, figure captions BELOW).",
    "Leaving missing data cells empty instead of inserting a dash (—), which makes readers wonder if data was omitted accidentally.",
    "Writing 'refer to the table below' instead of formal numbering ('as listed in Table 2').",
    "Allowing table rows to split awkwardly across page breaks without repeating the header row on the next page (Table Layout > Repeat Header Rows)."
  ],
  check: [
    "Table caption is located ABOVE the table.",
    "Caption label and consecutive number are in bold.",
    "Missing values are marked with a dash (—).",
    "Table is centered horizontally on the page.",
    "Font size inside the table is 10 pt.",
    "Table is cross-referenced in the text without relative directional words."
  ]
});
