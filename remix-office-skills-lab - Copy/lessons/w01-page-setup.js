window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "w01-page-setup",
  group: "Word",
  title: "Page Setup (Size & Margins)",
  lecture: "Lecture 3",
  goal: "Configure paper size to A4 and specify standard or bound margins before drafting report content.",
  rules: [
    "A4 paper size must be selected (8.27\" × 11.69\" / 210 × 297 mm).",
    "Printing on one side only is often preferred for assessment purposes.",
    "Standard margins: 2.5 cm (1 inch / Normal) on all sides recommended.",
    "Bound reports: Left-hand margin of at least 3.5 cm is mandatory, with 1.5 cm on the other three sides."
  ],
  steps: [
    {
      text: "Open your Word document and click on the Layout tab in the top ribbon.",
      path: "Layout > Page Setup"
    },
    {
      text: "Click Size in the Page Setup group, scroll down, and select A4 (8.27\" × 11.69\").",
      path: "Layout > Size > A4"
    },
    {
      text: "For standard un-bound assessment submission: click Margins and choose Normal (Top: 1\", Bottom: 1\", Left: 1\", Right: 1\" / ~2.5 cm).",
      path: "Layout > Margins > Normal"
    },
    {
      text: "For bound submission: click Margins > Custom Margins... at the bottom of the menu. Set Left to 3.5 cm (1.38\"), and Top, Bottom, and Right to 1.5 cm (0.59\"), then click OK.",
      path: "Layout > Margins > Custom Margins..."
    }
  ],
  practice: "Open Microsoft Word, create a new blank document, change the paper size to A4, and configure the custom margins for a bound technical report (Left: 3.5 cm, Top/Bottom/Right: 1.5 cm).",
  mistakes: [
    "Leaving the default US Letter size (8.5\" × 11\") active, which ruins page layout upon printing.",
    "Using standard 2.5 cm margin for bound reports, causing text near the left margin to be trapped in the spiral/comb binding.",
    "Setting margins late after inserting tables or figures, causing horizontal tables to get clipped."
  ],
  check: [
    "Paper size in Layout > Size shows A4 checked.",
    "Margins are configured according to submission type (2.5 cm all sides OR 3.5 cm left with 1.5 cm others).",
    "Orientation is Portrait and configured for single-sided printing."
  ]
});
