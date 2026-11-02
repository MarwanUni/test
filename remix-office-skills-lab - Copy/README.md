# Office Skills Lab (ELE123 / ELE114)
**Technical Reports & Excel Data Reference**  
*Benha University · Faculty of Engineering at Shoubra · Dr. Christina Gamal*

---

## 🚀 How to Run on Your Device in One Folder

### Option 1: Instant Offline Run (No Installations Needed!)
1. Copy the complete project folder to your computer (e.g. `Desktop/OfficeSkillsLab`).
2. Make sure all files and subfolders (`lessons/`, `style.css`, `app.js`, etc.) remain in the same folder.
3. **Double-click `index.html`** in any modern web browser (Google Chrome, Microsoft Edge, Safari, Firefox).
4. That's it! The full interactive guide, step-by-step checklists, Excel formula playground, chart analyzers, quizzes, trophies, and progress tracking work 100% offline.

---

### Option 2: Run with Local Node.js Dev Server (Optional)
If you have [Node.js](https://nodejs.org) installed and want to run it via the local development server:
1. Open your terminal or Command Prompt in this folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local server:
   ```bash
   npm run dev
   ```
4. Open the displayed local link (usually `http://localhost:3000`) in your browser.

---

## 📂 Folder Structure

```
office-skills-lab/
├── index.html                   # Main application web page
├── style.css                    # Complete styling (Light & Dark mode)
├── app.js                       # Navigation, search, and progress tracking
├── challenges.js                # Interactive comprehension checks & quizzes
├── playground.js                # Interactive Excel & formatting lab simulator
├── excel-simulator.js           # Interactive Mini Excel grid and formula engine
├── package.json                 # Project configuration
├── README.md                    # This guide
├── lessons/                     # All 24 modular study units
│   ├── w01-page-setup.js        # Page sizes, margins, orientation
│   ├── w02-cover-page.js        # Formal engineering report cover
│   ├── w03-page-numbering.js    # Roman numerals vs Arabic numerals
│   ├── w04-headers-footers.js   # Running headers & section unlinking
│   ├── w05-text-formatting.js   # Typography, font hierarchy, body styling
│   ├── w06-headings-toc.js      # Multi-level headings & automated TOC
│   ├── w07-line-spacing.js      # 1.15 - 1.5 line spacing & paragraph rules
│   ├── w08-indentation-centering.js # First-line indent & block citations
│   ├── w09-figures.js           # Figure captions (below image) & cross-refs
│   ├── w10-tables.js            # Table titles (above table) & border standards
│   ├── w11-tables-figures-lists.js # List of Figures / List of Tables setup
│   ├── w12-equations.js         # Math typography, numbered equations
│   ├── w13-citations-references.js # IEEE standard bracketed citations
│   ├── w14-styles-themes.js     # Word quick styles & consistent palette
│   ├── e01-entering-data-formulas.js # Data entry & core arithmetic
│   ├── e02-summary-statistics.js # AVERAGE, STDEV.S, MEDIAN, MODE
│   ├── e03-chart-anatomy.js     # Axes, legends, chart titles, gridlines
│   ├── e04-column-bar-charts.js # Categorical comparison charts
│   ├── e05-pie-charts.js        # Proportional data & best practices
│   ├── e06-line-charts.js       # Time series & continuous trend charts
│   ├── e07-histograms.js        # Distribution bins & frequency analysis
│   ├── e08-dot-plots.js         # Scatter plots & bivariate correlation
│   ├── e09-choosing-charts.js   # Chart selection decision tree
│   └── r01-report-checklist.js  # Pre-submission quality audit checklist
└── public/
    └── assets/
        └── aistudio/            # Course reference lecture slides (PDFs)
            ├── Lecture_3_Technical_Reports_40fc9046.pdf
            ├── Lecture_4_Technical_Reports_f79ac726.pdf
            └── Lecture_5_Technical_Reports_4e2e5150.pdf
```

---

## 🎯 Key Standards Covered
- **Word Formatting**: Margins (1 in / 2.54 cm), Page numbering (front matter vs body sections), Figure captions below vs Table captions above, Equations numbered at right margin, IEEE citation style.
- **Excel Analysis & Visuals**: Summary statistics, chart selection guidelines, clean axis labeling, and no 3D distortion.
