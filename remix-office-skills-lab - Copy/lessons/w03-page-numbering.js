window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "w03-page-numbering",
  group: "Word",
  title: "Page Numbering & Section Breaks",
  lecture: "Lecture 3",
  goal: "Set up multi-section numbering with Roman numerals (i, ii, iii) for preliminary pages and Arabic numerals (1, 2, 3) for the main body.",
  rules: [
    "The title page should NOT be numbered.",
    "All other pages may be numbered either in the top-right corner or in the center at the bottom of the page.",
    "Roman numerals (i, ii, iii, iv) are mandatory for preliminary pages (Abstract, TOC, Lists).",
    "Arabic numerals (1, 2, 3, 4) must number the main text, starting at 1 on the Introduction page.",
    "Appendix pages must be numbered internally by letter and page: A1, A2, B1, C1, C2, C3..."
  ],
  steps: [
    {
      text: "Go to the Insert tab, click Page Number in the Header & Footer group, and select either 'Top of Page' (Plain Number 3 / top-right) or 'Bottom of Page' (Plain Number 2 / bottom-center).",
      path: "Insert > Page Number > Top/Bottom of Page"
    },
    {
      text: "Format front matter numbering: click Page Number > Format Page Numbers..., set 'Number format' to Roman numerals (i, ii, iii...), and set 'Page numbering' to 'Start at: i'. Click OK.",
      path: "Insert > Page Number > Format Page Numbers"
    },
    {
      text: "Place your cursor at the very end of your preliminary pages (e.g., after the Table of Figures), switch to the Layout tab, click Breaks, and choose Section Breaks > 'Next Page'.",
      path: "Layout > Page Setup > Breaks > Next Page"
    },
    {
      text: "Double-click the header or footer on the new main body page to open Header & Footer Tools. In the Navigation group, click 'Link to Previous' to turn it OFF (unlink the section).",
      path: "Header & Footer > Navigation > Link to Previous (Unlink)"
    },
    {
      text: "With cursor in the body header/footer, click Page Number > Format Page Numbers..., switch 'Number format' to Arabic (1, 2, 3...), and select 'Start at: 1'. Click OK.",
      path: "Header & Footer > Page Number > Format Page Numbers > Start at: 1"
    },
    {
      text: "For Appendices: add another Section Break (Next Page), unlink the header/footer, click Format Page Numbers..., and select chapter/prefix style or type the letter prefix (A1, A2, B1).",
      path: "Layout > Breaks > Next Page & Format Page Numbers"
    }
  ],
  practice: "Create a 4-page test document: Page 1 = Cover (no number), Page 2 = Abstract (numbered 'i'), insert a Section Break (Next Page), Page 3 = Introduction (numbered '1'), Page 4 = Body (numbered '2'). Verify the unlinking works properly.",
  mistakes: [
    "Forgetting to insert a Section Break (Next Page) between front matter and main body, making it impossible to switch between Roman and Arabic numerals.",
    "Failing to turn off 'Link to Previous', causing changes in the body numbering to corrupt the front matter numbering.",
    "Leaving numbering on 'Continue from previous section' so the body text starts at 2 or 3 instead of 1.",
    "Placing page numbers in non-standard locations (e.g., bottom-left or top-left)."
  ],
  check: [
    "Title page has no visible page number.",
    "Preliminary pages (Abstract, TOC) show Roman numerals (i, ii, iii...).",
    "Section break exists right before Introduction.",
    "'Link to Previous' is deactivated in Section 2.",
    "Main body restarts cleanly at Arabic numeral 1.",
    "Positioning is consistent throughout: either strictly top-right OR strictly bottom-center."
  ]
});
