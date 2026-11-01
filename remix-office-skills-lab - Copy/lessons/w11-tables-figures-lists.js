window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "w11-tables-figures-lists",
  group: "Word",
  title: "Table of Figures & Table of Tables",
  lecture: "Lecture 3",
  goal: "Generate and synchronize automated lists of figures and tables in the front matter of your technical report.",
  rules: [
    "Must be placed in the preliminary pages (front matter) following the main Table of Contents.",
    "Captions must be added using Word's automated 'Insert Caption' tool first, otherwise Word cannot find any entries.",
    "Must maintain consistent dot leader styling and right-aligned Roman/Arabic page numbers.",
    "Must be refreshed/updated before final report submission whenever content is edited."
  ],
  steps: [
    {
      text: "Ensure all figures in your document have captions added via References > Insert Caption (Label: Figure) and all tables have captions (Label: Table).",
      path: "References > Captions > Insert Caption"
    },
    {
      text: "Place your cursor on the preliminary page where you want the List of Figures to appear.",
      path: "Preliminary Section (Front Matter)"
    },
    {
      text: "Switch to the References tab and click 'Insert Table of Figures' in the Captions group.",
      path: "References > Captions > Insert Table of Figures"
    },
    {
      text: "In the dialog box, ensure 'Caption label' is set to 'Figure', choose your Tab leader (e.g. dotted lines), ensure 'Right align page numbers' is checked, and click OK.",
      path: "Table of Figures Dialog > Caption label: Figure > OK"
    },
    {
      text: "To generate the Table of Tables: move cursor below the List of Figures, click 'Insert Table of Figures' again, but change 'Caption label' to 'Table', then click OK.",
      path: "Table of Figures Dialog > Caption label: Table > OK"
    },
    {
      text: "To refresh entries after making edits: select the table, click References > 'Update Table' (choose 'Update entire table'), or right-click the list and select 'Update Field'.",
      path: "References > Captions > Update Table (or Right-Click > Update Field)"
    }
  ],
  practice: "In a document with 2 figures and 2 tables, insert an automated List of Figures and a List of Tables on page 'ii'. Add another figure on page 5, return to page 'ii', right-click the List of Figures, and select 'Update Field' to verify the new entry appears.",
  mistakes: [
    "Typing the list of figures manually, which requires tedious manual page recalculation whenever paragraphs shift.",
    "Selecting 'Update page numbers only' when new figures or tables were inserted or titles were edited, which fails to show newly added figures.",
    "Trying to generate a Table of Figures when captions were typed as regular text instead of Word's official caption field."
  ],
  check: [
    "List of Figures displays all figures with exact numbers and titles.",
    "List of Tables displays all tables with exact numbers and titles.",
    "Page numbers are right-aligned with dot leaders.",
    "Both lists are updated to reflect the latest document page edits."
  ]
});
