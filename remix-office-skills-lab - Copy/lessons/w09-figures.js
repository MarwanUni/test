window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "w09-figures",
  group: "Word",
  title: "Figures & Captions",
  lecture: "Lecture 3",
  goal: "Insert diagrams, photos, and graphs with bold numbered captions below the figure and formal in-text cross-references.",
  rules: [
    "Figures include diagrams, graphs, sketches, photographs, and maps.",
    "All figures should be centered horizontally on the page.",
    "Every figure must have a caption in BOLD with an appropriate consecutive number (e.g., 'Fig. 1. Single-diode equivalent circuit').",
    "Figure captions are strictly placed BELOW the figure.",
    "Every figure must be explicitly referred to in the body text (e.g., 'see Figure 1' or 'as shown in Fig. 1').",
    "NEVER use relative location phrases such as 'the figure above' or 'the figure below' (figures shift during pagination).",
    "Separate figures from surrounding body text with extra paragraph spacing (e.g., 12 pt before and after)."
  ],
  steps: [
    {
      text: "Place your insertion cursor on a blank line where the diagram belongs and go to the Insert tab.",
      path: "Insert > Illustrations > Pictures"
    },
    {
      text: "Click Pictures > 'This Device...', select your image file (PNG, JPG, or SVG), and click Insert.",
      path: "Insert > Pictures > This Device..."
    },
    {
      text: "With the picture selected, go to the Home tab and click Center alignment (Ctrl+E).",
      path: "Home > Paragraph > Center (Ctrl+E)"
    },
    {
      text: "Right-click the picture (or go to References tab) and select 'Insert Caption...'.",
      path: "References > Captions > Insert Caption"
    },
    {
      text: "In the Caption dialog, verify 'Label' is set to 'Figure', 'Position' is set to 'Below selected item', type a colon and your descriptive title, and click OK.",
      path: "Caption Dialog > Label: Figure > Position: Below selected item"
    },
    {
      text: "Select the caption text, press Ctrl+B to bold the label and number, and format at 10 pt font.",
      path: "Home > Font > Bold (Ctrl+B) > 10 pt"
    },
    {
      text: "To refer to the figure in your body text, place cursor after your sentence, click References > Cross-reference, choose 'Figure' as Reference type, select 'Only label and number', select your figure, and click Insert.",
      path: "References > Captions > Cross-reference > Reference type: Figure > Only label and number"
    }
  ],
  practice: "In Word, insert a schematic or photo. Center it, add a caption below it labeled 'Figure 1: Schematic diagram of laboratory setup', format the label in bold, and insert a body sentence cross-referencing it ('...as depicted in Figure 1.').",
  mistakes: [
    "Placing the caption ABOVE the figure (rules strictly require captions below figures, unlike tables).",
    "Writing vague text references like 'refer to the diagram above' instead of the required 'see Figure 1'.",
    "Typing 'Figure 1' manually as raw text instead of Word's automated Insert Caption tool, breaking automatic cross-referencing and List of Figures generation.",
    "Setting wrap text to 'Tight' or 'Square' causing body text to wrap awkwardly around technical diagrams instead of using 'In Line with Text' centered."
  ],
  check: [
    "Figure is centered horizontally on the page.",
    "Caption is placed BELOW the figure.",
    "Caption label and number are in bold font.",
    "Body text contains an automated cross-reference (e.g. 'Fig. 1' or 'Figure 1').",
    "Phrases like 'figure above' or 'figure below' are completely absent."
  ]
});
