window.LESSONS = window.LESSONS || [];
window.LESSONS.push({
  id: "w12-equations",
  group: "Word",
  title: "Equations & Math Notation",
  lecture: "Lecture 3",
  goal: "Format mathematical formulas centered on the line, assign sequential equation numbers, and cross-reference them in text.",
  rules: [
    "All equations must be centered horizontally on their line.",
    "All equations must be numbered consecutively in parentheses at the right margin (e.g., '(1)' or '(2.3)').",
    "All equations must be referred to in the body text (e.g., 'as explained by eqn. (1)' or 'using (1)').",
    "Never use relative references such as 'the equation above' or 'the formula below'.",
    "Separate equations from surrounding prose with extra line spacing."
  ],
  steps: [
    {
      text: "Place your cursor on a new line and go to Insert > Symbols > Equation (or press the keyboard shortcut Alt + =).",
      path: "Insert > Symbols > Equation (Alt + =)"
    },
    {
      text: "Use the Equation ribbon tools to type variables, Greek symbols (α, β, θ, λ), fractions, subscripts/superscripts (V_T, I_ph, R_sh), and integrals.",
      path: "Equation Tools > Structures & Symbols"
    },
    {
      text: "Center the equation line (Ctrl+E).",
      path: "Home > Paragraph > Center"
    },
    {
      text: "To add a clean right-aligned equation number: at the end of the equation inside the equation box, type '#(1)' and press Enter, OR use References > Insert Caption (Label: Equation, tick 'Exclude label from caption' to yield just '(1)').",
      path: "References > Insert Caption > Label: Equation > Exclude label from caption"
    },
    {
      text: "In your body paragraph, refer to the formula by name: type '...as defined by eqn. (1)' and insert an automated cross-reference via References > Cross-reference.",
      path: "References > Captions > Cross-reference > Reference type: Equation"
    }
  ],
  practice: "In Word, press Alt+= and type the Shockley solar diode equation: I = I_ph - I_o [exp((V + I*R_s)/V_T) - 1]. Append #(1) and press Enter to snap the number to the right margin. Refer to it in the following paragraph as 'eqn. (1)'.",
  mistakes: [
    "Inserting equations as blurry low-resolution screenshots or image crops instead of native Word equation objects.",
    "Writing 'as shown in the equation above' instead of the strict required citation '...by eqn. (1)'.",
    "Leaving equations left-aligned with body text rather than centered on their own dedicated line.",
    "Mixing inconsistent mathematical font styles (always use standard Math font like Cambria Math)."
  ],
  check: [
    "Equation is built using Word's native equation editor (Alt+=).",
    "Equation is centered on the line.",
    "Equation number (1) is aligned to the right margin.",
    "Body text contains explicit reference 'eqn. (1)' without 'equation above'."
  ]
});
