window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "w06-headings-toc",
  group: "Word",
  title: "Headings & Table of Contents",
  lecture: "Lecture 3 & 4",
  goal: "Format multi-level headings (16/14/12 pt) with built-in styles and generate an automatic, updatable Table of Contents.",
  rules: [
    "Heading hierarchy sizes: First-level = 16 pt bold; Second-level = 14 pt bold; Third-level = 12 pt bold; Fourth-level = 12 pt bold italic.",
    "Capitalize only the first letter of the first word in each heading (sentence case), unless containing acronyms (e.g., IEEE), trade names, or proper nouns.",
    "Must use Word's built-in Heading styles (Heading 1, Heading 2, Heading 3) — manual bolding will not be recognized by the automatic Table of Contents.",
    "Headings must never appear orphaned alone on the bottom line of a page (enforce 'Keep with next').",
    "Table of Contents must be placed in the preliminary pages (numbered with Roman numerals)."
  ],
  steps: [
    {
      text: "Go to the Home tab > Styles gallery, right-click 'Heading 1', and select 'Modify...'. Set font to Arial (or Times New Roman), size to 16 pt, Bold, and color to Automatic/Black. Click OK.",
      path: "Home > Styles > Right-click Heading 1 > Modify..."
    },
    {
      text: "Repeat style modifications for Heading 2 (14 pt, Bold) and Heading 3 (12 pt, Bold). In the Modify Style dialog, ensure 'Add to the Styles gallery' is checked.",
      path: "Home > Styles > Right-click Heading 2 / 3 > Modify..."
    },
    {
      text: "Click into each heading in your document and click the corresponding style ('Heading 1', 'Heading 2', or 'Heading 3') in the Styles gallery.",
      path: "Home > Styles > [Heading 1 / Heading 2 / Heading 3]"
    },
    {
      text: "To number headings hierarchically, click in your first Heading 1, go to Home > Multilevel List, and select the list template showing '1 Heading 1, 1.1 Heading 2, 1.1.1 Heading 3'.",
      path: "Home > Paragraph > Multilevel List > 1 Heading 1, 1.1 Heading 2..."
    },
    {
      text: "Place your cursor on the preliminary page where the Table of Contents belongs, switch to the References tab, click 'Table of Contents', and choose 'Automatic Table 1' or 'Automatic Table 2'.",
      path: "References > Table of Contents > Automatic Table 1"
    },
    {
      text: "Whenever headings or page numbers change during editing, update the TOC by clicking References > 'Update Table' (choose 'Update entire table') or right-clicking the TOC and selecting 'Update Field'.",
      path: "References > Table of Contents > Update Table (Update entire table)"
    }
  ],
  practice: "In Word, customize Heading 1 to 16 pt bold and Heading 2 to 14 pt bold. Type two sample headings with body paragraphs beneath them. Go to References > Table of Contents and insert an Automatic TOC. Edit one heading, right-click the TOC, and select 'Update Field' to watch it sync.",
  mistakes: [
    "Manually formatting heading text with the font toolbar instead of using the built-in Heading styles, which leaves the Table of Contents empty ('No table of contents entries found').",
    "Capitalizing every word like a book title ('Chemical Waste Management In Solar Plants') rather than sentence case ('Chemical waste management in solar plants').",
    "Forgetting to update the Table of Contents before final PDF export or printing, leaving outdated page numbers or deleted headings in the table.",
    "Typing dots and page numbers by hand, which breaks alignment whenever font or margin settings change."
  ],
  check: [
    "Level 1 headings are 16 pt bold.",
    "Level 2 headings are 14 pt bold, Level 3 are 12 pt bold.",
    "Headings use sentence case formatting.",
    "Table of Contents is generated automatically via References > Table of Contents.",
    "Updating the document dynamically updates the TOC page numbers."
  ]
});
