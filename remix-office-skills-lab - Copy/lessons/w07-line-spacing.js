window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "w07-line-spacing",
  group: "Word",
  title: "Line Spacing & Paragraph Separation",
  lecture: "Lecture 3",
  goal: "Apply 1.5 line spacing for submitted assessed report text and configure paragraph before/after spacing.",
  rules: [
    "1.5 line spacing is generally used for work submitted for assessment.",
    "Extra spacing must be used to separate consecutive paragraphs.",
    "Extra spacing must be used to separate figures, tables, equations, and long quotations from the surrounding text.",
    "Extra spacing must be used to separate a main heading from the section of text that comes before it."
  ],
  steps: [
    {
      text: "Highlight the text or paragraphs you want to format (or press Ctrl+A to select all body text).",
      path: "Home > Select > Select All (Ctrl+A)"
    },
    {
      text: "In the Home tab > Paragraph group, click the Line and Paragraph Spacing icon and select '1.5'.",
      path: "Home > Paragraph > Line and Paragraph Spacing > 1.5"
    },
    {
      text: "To set clean paragraph separation without repeatedly hitting the Enter key, click 'Line Spacing Options...' at the bottom of the dropdown.",
      path: "Home > Paragraph > Line and Paragraph Spacing > Line Spacing Options..."
    },
    {
      text: "In the Paragraph dialog box under 'Spacing', set 'After' to 6 pt or 8 pt (and 'Before' to 12 pt for headings).",
      path: "Paragraph Dialog > Spacing > After: 6 pt / Before: 12 pt"
    },
    {
      text: "Before figures, tables, and centered equations, add extra paragraph spacing (e.g., 12 pt before and after) so visual elements do not crowd adjacent prose.",
      path: "Paragraph Dialog > Spacing > Before: 12 pt / After: 12 pt"
    }
  ],
  practice: "In Word, select 3 paragraphs of draft text. Open 'Line and Paragraph Spacing', choose 1.5. Then open Line Spacing Options and set Spacing After to 6 pt and check that pressing Enter creates clean spacing automatically.",
  mistakes: [
    "Pressing Enter twice between every paragraph to simulate spacing instead of using Word's paragraph 'Spacing After' property.",
    "Submitting single-spaced text (1.0), which makes engineering professor annotations and corrections difficult to read.",
    "Failing to add spacing before headings and around tables, causing equations and images to collide into adjacent paragraphs."
  ],
  check: [
    "Body line spacing is set to 1.5.",
    "Paragraphs are clearly separated by consistent spacing (e.g. 6-8 pt after).",
    "Headings have extra spacing separating them from preceding text.",
    "Figures, tables, and equations are separated with breathing room before and after."
  ]
});
