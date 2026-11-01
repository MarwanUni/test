window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "w05-text-formatting",
  group: "Word",
  title: "Text Size, Font & Justification",
  lecture: "Lecture 3",
  goal: "Format body text with 12-pt Times New Roman, full justification, and proper heading capitalization rules.",
  rules: [
    "12-point type is the normal size for the text of a report.",
    "10-point type is permitted for figures and tables.",
    "Times New Roman is usually chosen for the report body text.",
    "Arial may be used for headings and tables (the same font should be maintained throughout unless a second font is chosen specifically for headings and tables).",
    "Text must be fully justified (aligned to both right and left margins).",
    "Headings without text must never appear stranded alone on the bottom line of a page (orphan heading).",
    "Capital letters are used for the first letter of the first word in each heading only (sentence case), except acronyms (e.g. IEEE), trade names, or proper personal/place names."
  ],
  steps: [
    {
      text: "Select your body paragraphs or press Ctrl+A to select all body text.",
      path: "Home > Select > Select All (Ctrl+A)"
    },
    {
      text: "In the Home tab > Font group, set the font family to 'Times New Roman' and the font size to '12'.",
      path: "Home > Font > Times New Roman > 12 pt"
    },
    {
      text: "In the Home tab > Paragraph group, click the 'Justify' button (or press Ctrl+J) to justify both margins.",
      path: "Home > Paragraph > Justify (Ctrl+J)"
    },
    {
      text: "For table content and figure labels, highlight the table cells and change font size to 10 pt (Arial or Times New Roman).",
      path: "Home > Font > Size 10 pt"
    },
    {
      text: "To prevent orphan headings from standing alone at the bottom of a page, select the heading > right-click > Paragraph > 'Line and Page Breaks' tab > check 'Keep with next'.",
      path: "Paragraph Dialog > Line and Page Breaks > Keep with next"
    }
  ],
  practice: "Draft a sample paragraph of technical body text. Apply 12 pt Times New Roman, justify both margins with Ctrl+J, and write a heading in sentence case ('6.1 Chemical waste management').",
  mistakes: [
    "Leaving text left-aligned with ragged right edges instead of fully justified.",
    "Mixing 3 or more arbitrary font families within the same report.",
    "Capitalizing every word in headings (Title Case) instead of capitalizing only the first word (Sentence case) as required by course standards.",
    "Allowing a heading to sit on the last line of a page with its text pushed to the next page."
  ],
  check: [
    "Body text is 12 pt Times New Roman.",
    "All body paragraphs are justified on both sides.",
    "Figures and tables are styled at 10 pt.",
    "Headings use sentence case (first letter capitalized only, unless acronym/proper noun).",
    "Headings use 'Keep with next' to prevent bottom-of-page separation."
  ]
});
