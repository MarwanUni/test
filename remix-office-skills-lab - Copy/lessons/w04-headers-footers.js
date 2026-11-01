window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "w04-headers-footers",
  group: "Word",
  title: "Headers & Footers",
  lecture: "Lecture 3",
  goal: "Set up separated headers and footers with 9-point student identification and automatic page numbering.",
  rules: [
    "Two different headers or footers must be created so preliminary pages are separated from report body text.",
    "Student name and ID number can appear in the footer at 9-point font size.",
    "Headers and footers position page numbers automatically across sections.",
    "The title (cover) page must remain free of headers and footers."
  ],
  steps: [
    {
      text: "Go to the Insert tab on the ribbon and locate the Header & Footer group.",
      path: "Insert > Header & Footer"
    },
    {
      text: "Click Footer (or Header) and either choose a built-in preset or click 'Edit Footer' at the bottom of the menu.",
      path: "Insert > Header & Footer > Footer > Edit Footer"
    },
    {
      text: "Type your Student Name and Student ID in the footer area, select the text, and set font size to 9 pt via Home > Font.",
      path: "Home > Font > Size 9 pt"
    },
    {
      text: "To separate preliminary footer text from body footer text, go to the body section, ensure 'Link to Previous' is deactivated in Header & Footer Tools, then customize body footer text.",
      path: "Header & Footer Tools > Navigation > Link to Previous (OFF)"
    },
    {
      text: "Click 'Close Header and Footer' on the ribbon (or press the Esc key) to return to main document editing.",
      path: "Header & Footer Tools > Close Header and Footer (or Esc)"
    }
  ],
  practice: "In Word, open the footer on page 2 (front matter), add 'Marwan [ID] - Benha Univ' in 9 pt Times New Roman. Move to Section 2 (body), unlink from previous, and verify changes don't overwrite Section 1.",
  mistakes: [
    "Typing student ID into the main body margins manually instead of using Word's dedicated Header & Footer container.",
    "Using normal 12-point font for footer metadata instead of the required 9-point size.",
    "Leaving 'Link to Previous' active when altering headers/footers between report front matter and main body."
  ],
  check: [
    "Footer metadata (name and student ID) is styled at 9 pt.",
    "Preliminary section footers are unlinked from main body footers.",
    "Cover page has no footer or header visible.",
    "Page numbers inside headers/footers align consistently."
  ]
});
