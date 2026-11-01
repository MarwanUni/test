window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "w08-indentation-centering",
  group: "Word",
  title: "Indentation & Centering",
  lecture: "Lecture 3",
  goal: "Apply first-line paragraph indentation, format bullet lists, and center all figures and tables.",
  rules: [
    "Indenting text at the beginning of a paragraph is necessary (unless extra space is inserted between paragraphs).",
    "Indentation is appropriate and required for lists with bullet points (•).",
    "All figures and tables should be centered horizontally on the page."
  ],
  steps: [
    {
      text: "Select the paragraphs you want to indent (or select the 'Normal' style to apply globally).",
      path: "Home > Select"
    },
    {
      text: "In the Home tab > Paragraph group, click the small arrow in the bottom-right corner (Paragraph dialog box launcher).",
      path: "Home > Paragraph > Dialog Launcher"
    },
    {
      text: "Under the 'Indents and Spacing' tab, find the 'Indentation' section, click the 'Special' dropdown, and choose 'First line' (set By: 0.5\" or 1.27 cm), then click OK.",
      path: "Paragraph Dialog > Indents and Spacing > Special: First line"
    },
    {
      text: "For bullet lists, highlight the list items and click the Bullets icon (or Multilevel List) in the Paragraph group to ensure proper list hanging indentation.",
      path: "Home > Paragraph > Bullets"
    },
    {
      text: "To center a figure, graph, or table, select the element and click the Center alignment icon in the Paragraph group (or press Ctrl+E).",
      path: "Home > Paragraph > Center (Ctrl+E)"
    }
  ],
  practice: "In Word, open the Paragraph dialog launcher and set Special to 'First line' at 0.5 inches for a body paragraph. Then insert a sample 3x3 table and press Ctrl+E to center it on the page.",
  mistakes: [
    "Pressing the Spacebar 5 times or pressing the Tab key on every new paragraph instead of using Word's automated First Line indent.",
    "Applying both First Line indent AND large empty line breaks between paragraphs, creating redundant spacing.",
    "Leaving figures and tables left-aligned against the margin instead of centering them on the page."
  ],
  check: [
    "Paragraphs either have a consistent first-line indent OR a uniform paragraph spacing after.",
    "Bullet lists are indented from the left margin.",
    "All figures and tables are centered horizontally."
  ]
});
