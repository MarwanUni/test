window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "w13-citations-references",
  group: "Word",
  title: "Citations & References (IEEE)",
  lecture: "Lecture 3",
  goal: "Manage technical bibliography sources using IEEE style, insert in-text citation brackets [1], and generate a References section.",
  rules: [
    "Electrical Engineering technical reports must follow a consistent referencing standard (e.g., IEEE numbered style: [1], [2]).",
    "Every source listed in the References section must be cited at least once in the text, and vice versa.",
    "The References section must be placed at the end of the report before any Appendices.",
    "Do not paste bare web URLs without author, title, publication date, and access date."
  ],
  steps: [
    {
      text: "Go to the References tab on the ribbon and find the 'Citations & Bibliography' group.",
      path: "References > Citations & Bibliography"
    },
    {
      text: "Click the 'Style' dropdown menu and select 'IEEE' (or the professor's specified standard, e.g., APA/Harvard).",
      path: "References > Citations & Bibliography > Style: IEEE"
    },
    {
      text: "Place your cursor at the end of the sentence or fact you are citing (before the period).",
      path: "Text Cursor Position"
    },
    {
      text: "Click 'Insert Citation' > 'Add New Source...'. Select the source type (e.g., 'Journal Article', 'Book', 'Conference Proceedings', or 'Report') and fill in Author, Title, Journal Name, Year, Pages, and Volume.",
      path: "References > Insert Citation > Add New Source..."
    },
    {
      text: "Click OK. Word will insert the IEEE numbered citation bracket (e.g. [1]) into your sentence.",
      path: "Source Dialog > OK"
    },
    {
      text: "At the end of your report document, create a new section, click References > 'Bibliography', and choose 'References' to automatically generate the full numbered bibliography.",
      path: "References > Bibliography > References"
    }
  ],
  practice: "In Word, set Style to IEEE. Add a Journal Article source: Author 'J. D. Kramer', Title 'Photovoltaic Cell Modelling', Journal 'IEEE Trans. Energy Conversion', Year '2024'. Cite it in a sentence, then insert the automated References section at the end.",
  mistakes: [
    "Typing numbered citations like '[1]' manually into text without using Word's source manager, leading to mismatched numbers if sources are reordered.",
    "Using author-date format (e.g. '(Kramer, 2024)') when the department or course calls for IEEE numbered citations [1].",
    "Missing vital citation metadata like publication year, volume, or page numbers for academic journal sources.",
    "Placing the References section in the preliminary front matter instead of the end of the report."
  ],
  check: [
    "Citation style is set to IEEE.",
    "In-text citations appear as bracketed numbers: [1], [2].",
    "All sources are entered into Word's Manage Sources database.",
    "The automated 'References' bibliography is placed at the end of the report."
  ]
});
