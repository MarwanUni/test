window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "w02-cover-page",
  group: "Word",
  title: "Cover Page (Title Page)",
  lecture: "Lecture 3",
  goal: "Insert a formal technical report cover page with project title, author details, and submission date without displaying a page number.",
  rules: [
    "The title (cover) page must NEVER be numbered.",
    "Must include document title, author name(s), student ID, course details (ELE123 / ELE114), and submission date.",
    "Choose a clean, professional technical template (e.g., Austin, Banded, Facet, Grid, or Integral)."
  ],
  steps: [
    {
      text: "Navigate to the top ribbon and click on the Insert tab.",
      path: "Insert"
    },
    {
      text: "In the Pages group (left side of ribbon), click Cover Page to open the built-in design gallery.",
      path: "Insert > Pages > Cover Page"
    },
    {
      text: "Select a formal design from the gallery (such as 'Austin', 'Facet', or 'Integral').",
      path: "Insert > Pages > Cover Page > [Select Design]"
    },
    {
      text: "Click into each placeholder field and replace the prompt text with your report title, subtitle, author name, student ID, and date.",
      path: "Cover Page > Placeholder Fields"
    },
    {
      text: "Verify that no page number appears on the cover page (Word built-in cover pages enable 'Different First Page' automatically).",
      path: "Header & Footer > Options > Different First Page"
    }
  ],
  practice: "In Word, insert the 'Facet' or 'Austin' cover page. Enter 'Technical Report: Photovoltaic Systems', your name, student ID, 'ELE123 Technical Reports', and submission deadline '17 November 2026'. Ensure the header/footer number does not appear on this page.",
  mistakes: [
    "Typing a title page manually on page 1 without section breaks or 'Different First Page', resulting in an unwanted '1' on the title page.",
    "Leaving default placeholder text (e.g., '[Document Subtitle]') visible in the final submitted report.",
    "Choosing flashy, overly decorative or colorful magazine designs that are inappropriate for formal engineering reports."
  ],
  check: [
    "Title page exists as the first page of the report.",
    "Title, student name, ID number, and submission date are filled in.",
    "No page number or header text appears on the title page.",
    "Layout transitions cleanly to the front matter on page 2."
  ]
});
