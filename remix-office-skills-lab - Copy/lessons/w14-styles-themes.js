window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "w14-styles-themes",
  group: "Word",
  title: "Styles, Linked Styles & Document Themes",
  lecture: "Lecture 4",
  goal: "Master Word styles, avoid the cascading Normal style trap, format character/paragraph/table styles, and navigate via the Navigation Pane.",
  rules: [
    "Always use Styles instead of direct manual formatting to ensure document consistency and effortless global updates.",
    "Beware the Style Cascade Trap: because default styles are based on 'Normal', modifying Normal may inadvertently alter headings and lists. Fix this by setting 'Style based on: (no style)'.",
    "Understand style types: Paragraph (¶ applies to entire block), Character (a applies to selected words), Linked (¶a applies to selection or paragraph), List, and Table styles.",
    "Use View > Navigation Pane to jump between styled headings across long technical documents.",
    "Document Themes (Design tab) control coordinated color schemes and font pairings globally."
  ],
  steps: [
    {
      text: "Open the Styles task pane by clicking the small dialog launcher arrow in the bottom-right corner of Home > Styles (shortcut Alt+Ctrl+Shift+S).",
      path: "Home > Styles > Dialog Launcher (Alt+Ctrl+Shift+S)"
    },
    {
      text: "To modify a style without unintended side-effects: right-click the style (e.g., Heading 1) > Modify... > set 'Style based on' to '(no style)' so changes to Normal do not cascade.",
      path: "Modify Style Dialog > Style based on: (no style)"
    },
    {
      text: "To create a brand-new custom style: in the Styles pane, click the 'New Style' button (A+ icon at bottom), name it, choose Style type ('Paragraph' or 'Character'), set font/spacing, and tick 'Add to the Styles gallery'.",
      path: "Styles Task Pane > New Style (A+ button)"
    },
    {
      text: "To add borders or shading to a style: in the Modify Style dialog, click the 'Format' button in the bottom-left > click 'Border...' > choose Box border, line width, and Shading fill color.",
      path: "Modify Style Dialog > Format > Border & Shading"
    },
    {
      text: "Open the Document Map for easy jumping through long reports: go to the View tab and check 'Navigation Pane'. Click any heading to navigate instantly.",
      path: "View > Show > Navigation Pane"
    },
    {
      text: "Apply or customize global document aesthetics via Design tab: explore Design > Themes, Colors, and Fonts to synchronize header and accent styling.",
      path: "Design > Document Formatting > Themes / Colors / Fonts"
    }
  ],
  practice: "In Word, open the Styles pane (Alt+Ctrl+Shift+S). Create a new style named 'Engineering Callout' with a left border and subtle gray shading. Type a paragraph, apply your new style, and verify in View > Navigation Pane that your headings outline the document structure.",
  mistakes: [
    "Changing the 'Normal' style font or indentation without setting headings to 'Style based on: (no style)', causing all headings to unexpectedly become indented or italicized.",
    "Using direct manual formatting repeatedly for every single paragraph instead of updating the style once in the gallery.",
    "Direct formatting inside table cells which overrides table styles, making future table theme changes fail on customized cells."
  ],
  check: [
    "Document headings and body text use predefined or modified styles.",
    "Heading styles are detached from Normal style ('Style based on: (no style)').",
    "View > Navigation Pane shows a clean outline of the report sections.",
    "Table and list styles conform to uniform typography."
  ]
});
