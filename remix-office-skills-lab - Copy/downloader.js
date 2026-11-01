/**
 * Office Skills Lab - Project Downloader & Local Device Folder Exporter
 * Bundles all application files, lessons, PDFs, and configs into a single zip.
 */

(function () {
  'use strict';

  // Complete registry of project files
  const PROJECT_FILES = [
    { path: 'index.html', label: 'Main Application HTML', category: 'Core' },
    { path: 'style.css', label: 'Theme & Layout Stylesheet', category: 'Core' },
    { path: 'app.js', label: 'Application Navigation & State', category: 'Core' },
    { path: 'challenges.js', label: 'Check Your Understanding Quizzes', category: 'Core' },
    { path: 'playground.js', label: 'Interactive Formula & Layout Lab', category: 'Core' },
    { path: 'excel-simulator.js', label: 'Interactive Mini Excel Simulator', category: 'Core' },
    { path: 'downloader.js', label: 'Offline Exporter Script', category: 'Core' },
    { path: 'jszip.min.js', label: 'Offline ZIP Engine', category: 'Core' },
    { path: 'public/jszip.min.js', label: 'Public Offline ZIP Engine Copy', category: 'Core' },
    { path: 'package.json', label: 'NPM Project Manifest', category: 'Config' },
    { path: 'metadata.json', label: 'Project Metadata', category: 'Config' },
    { path: 'tsconfig.json', label: 'TypeScript Configuration', category: 'Config' },
    { path: 'vite.config.ts', label: 'Vite Configuration', category: 'Config' },
    { path: 'README.md', label: 'Device Setup & Local Guide', category: 'Docs' },

    // Source workspace retained for development and customization
    { path: 'src/App.tsx', label: 'React Application Source', category: 'Source' },
    { path: 'src/main.tsx', label: 'React Entry Point', category: 'Source' },
    { path: 'src/index.css', label: 'React Source Styles', category: 'Source' },

    // Word Lessons
    { path: 'lessons/w01-page-setup.js', label: 'W01: Page Setup & Margins', category: 'Word Lessons' },
    { path: 'lessons/w02-cover-page.js', label: 'W02: Formal Cover Page', category: 'Word Lessons' },
    { path: 'lessons/w03-page-numbering.js', label: 'W03: Section Breaks & Page Numbering', category: 'Word Lessons' },
    { path: 'lessons/w04-headers-footers.js', label: 'W04: Headers & Footers', category: 'Word Lessons' },
    { path: 'lessons/w05-text-formatting.js', label: 'W05: Text & Font Hierarchy', category: 'Word Lessons' },
    { path: 'lessons/w06-headings-toc.js', label: 'W06: Headings & Table of Contents', category: 'Word Lessons' },
    { path: 'lessons/w07-line-spacing.js', label: 'W07: Line & Paragraph Spacing', category: 'Word Lessons' },
    { path: 'lessons/w08-indentation-centering.js', label: 'W08: Indentation & Alignment', category: 'Word Lessons' },
    { path: 'lessons/w09-figures.js', label: 'W09: Figures & Captions', category: 'Word Lessons' },
    { path: 'lessons/w10-tables.js', label: 'W10: Tables & Styling', category: 'Word Lessons' },
    { path: 'lessons/w11-tables-figures-lists.js', label: 'W11: Lists of Figures & Tables', category: 'Word Lessons' },
    { path: 'lessons/w12-equations.js', label: 'W12: Mathematical Equations', category: 'Word Lessons' },
    { path: 'lessons/w13-citations-references.js', label: 'W13: IEEE Citations & References', category: 'Word Lessons' },
    { path: 'lessons/w14-styles-themes.js', label: 'W14: Styles & Document Themes', category: 'Word Lessons' },

    // Excel Lessons
    { path: 'lessons/e01-entering-data-formulas.js', label: 'E01: Data Entry & Formulas', category: 'Excel Lessons' },
    { path: 'lessons/e02-summary-statistics.js', label: 'E02: Summary Statistics', category: 'Excel Lessons' },
    { path: 'lessons/e03-chart-anatomy.js', label: 'E03: Chart Anatomy & Elements', category: 'Excel Lessons' },
    { path: 'lessons/e04-column-bar-charts.js', label: 'E04: Column & Bar Charts', category: 'Excel Lessons' },
    { path: 'lessons/e05-pie-charts.js', label: 'E05: Pie & Donut Charts', category: 'Excel Lessons' },
    { path: 'lessons/e06-line-charts.js', label: 'E06: Line Charts & Time Series', category: 'Excel Lessons' },
    { path: 'lessons/e07-histograms.js', label: 'E07: Histograms & Bins', category: 'Excel Lessons' },
    { path: 'lessons/e08-dot-plots.js', label: 'E08: Dot Plots & Scatter Charts', category: 'Excel Lessons' },
    { path: 'lessons/e09-choosing-charts.js', label: 'E09: Choosing the Right Chart', category: 'Excel Lessons' },

    // Checklist
    { path: 'lessons/r01-report-checklist.js', label: 'R01: Report Submission Checklist', category: 'Audits' },

    // Lecture PDFs
    { path: 'public/assets/aistudio/Lecture_3_Technical_Reports_40fc9046.pdf', fetchUrl: 'assets/aistudio/Lecture_3_Technical_Reports_40fc9046.pdf', isBinary: true, label: 'Lecture 3 Slides (PDF)', category: 'Lecture PDFs' },
    { path: 'public/assets/aistudio/Lecture_4_Technical_Reports_f79ac726.pdf', fetchUrl: 'assets/aistudio/Lecture_4_Technical_Reports_f79ac726.pdf', isBinary: true, label: 'Lecture 4 Slides (PDF)', category: 'Lecture PDFs' },
    { path: 'public/assets/aistudio/Lecture_5_Technical_Reports_4e2e5150.pdf', fetchUrl: 'assets/aistudio/Lecture_5_Technical_Reports_4e2e5150.pdf', isBinary: true, label: 'Lecture 5 Slides (PDF)', category: 'Lecture PDFs' }
  ];

  // Expose global controller
  window.OfficeSkillsDownloader = {
    returnFocusElement: null,
    getFiles: function () {
      return PROJECT_FILES;
    },

    openModal: function () {
      this.returnFocusElement = document.activeElement;
      let modal = document.getElementById('device-export-modal');
      if (!modal) {
        modal = createExportModal();
        document.body.appendChild(modal);
      }
      modal.classList.add('is-active');
      modal.setAttribute('aria-hidden', 'false');
      modal.removeAttribute('inert');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => modal.querySelector('#btn-close-export-modal')?.focus());
    },

    closeModal: function () {
      const modal = document.getElementById('device-export-modal');
      if (modal) {
        modal.classList.remove('is-active');
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('inert', '');
        document.body.style.overflow = '';
      }
      if (this.returnFocusElement && this.returnFocusElement.isConnected) this.returnFocusElement.focus();
      this.returnFocusElement = null;
    },

    startDownload: async function () {
      const progressBox = document.getElementById('download-progress-box');
      const progressBar = document.getElementById('download-progress-bar');
      const progressStatus = document.getElementById('download-progress-status');
      const downloadBtn = document.getElementById('btn-trigger-zip-download');
      const setProgress = (value) => {
        if (progressBar) progressBar.style.width = value + '%';
        if (progressBar && progressBar.parentElement) progressBar.parentElement.setAttribute('aria-valuenow', String(value));
      };

      if (!window.JSZip) {
        alert('ZIP engine is loading. Please try again in 2 seconds.');
        return;
      }

      try {
        if (downloadBtn) downloadBtn.disabled = true;
        if (progressBox) progressBox.style.display = 'block';

        const zip = new window.JSZip();
        const total = PROJECT_FILES.length;
        const missingFiles = [];

        for (let i = 0; i < total; i++) {
          const item = PROJECT_FILES[i];
          const percent = Math.round(((i + 1) / total) * 85);

          setProgress(percent);
          if (progressStatus) progressStatus.textContent = `Gathering [${i + 1}/${total}]: ${item.path}...`;

          const fetchUrl = new URL(item.fetchUrl || item.path, document.baseURI).href;
          try {
            const resp = await fetch(fetchUrl);
            if (!resp.ok) {
              console.warn(`Could not fetch ${fetchUrl}, status ${resp.status}`);
              missingFiles.push(item.path);
              continue;
            }

            if (item.isBinary) {
              const arrayBuffer = await resp.arrayBuffer();
              zip.file(item.path, arrayBuffer);
            } else {
              const textContent = await resp.text();
              zip.file(item.path, textContent);
            }
          } catch (fetchErr) {
            console.warn(`Error fetching ${fetchUrl}:`, fetchErr);
            missingFiles.push(item.path);
          }
        }

        if (missingFiles.length) {
          throw new Error(`Could not include ${missingFiles.length} file(s): ${missingFiles.join(', ')}. Open the app through Live Server or a local web server, then try again.`);
        }

        if (progressStatus) progressStatus.textContent = 'Compressing files into office-skills-lab.zip...';
        setProgress(95);

        const zipBlob = await zip.generateAsync({
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: { level: 6 }
        });

        setProgress(100);
        if (progressStatus) progressStatus.innerHTML = '<strong>Done! Your download has started.</strong> Check your browser Downloads folder.';

        // Trigger file download
        const downloadUrl = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'office-skills-lab.zip';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(downloadUrl);
          if (downloadBtn) downloadBtn.disabled = false;
        }, 1500);

      } catch (err) {
        console.error('Download error:', err);
        if (progressStatus) progressStatus.innerHTML = `<span style="color:var(--danger)">Error creating zip: ${err.message}</span>`;
        if (downloadBtn) downloadBtn.disabled = false;
      }
    }
  };

  function createExportModal() {
    const modal = document.createElement('div');
    modal.id = 'device-export-modal';
    modal.className = 'export-modal-backdrop';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'export-modal-title');
    modal.setAttribute('aria-describedby', 'export-modal-description');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('inert', '');

    modal.innerHTML = `
      <div class="export-modal-window">
        <div class="export-modal-header">
          <div class="export-header-title-wrap">
            <span class="export-icon">📦</span>
            <div>
              <h2 id="export-modal-title" class="export-title">Save to One Folder on Your Device</h2>
              <p class="export-subtitle" id="export-modal-description">Download all files, lessons, PDFs, and guides in a single ZIP package</p>
            </div>
          </div>
          <button type="button" class="export-close-btn" id="btn-close-export-modal" aria-label="Close dialog">✕</button>
        </div>

        <div class="export-modal-body">
          <!-- Step-by-Step Instructions -->
          <div class="export-steps-card">
            <h3 class="export-card-heading">🎯 How to get everything into one folder:</h3>
            <ol class="export-steps-list">
              <li>
                <strong>Click the "Download All Files (.ZIP)" button below.</strong>
                <p>This packages all ${PROJECT_FILES.length} project files (code, styles, lecture PDFs, and guide) into <code>office-skills-lab.zip</code>.</p>
              </li>
              <li>
                <strong>Extract the ZIP on your computer.</strong>
                <p>On Windows: Right-click the downloaded <code>.zip</code> file &rarr; select <em>"Extract All..."</em>.<br>
                On Mac: Double-click the <code>.zip</code> file to unzip into a folder.</p>
              </li>
              <li>
                <strong>Open the extracted folder &amp; launch!</strong>
                <p>Double-click <code>index.html</code> in that folder. The complete interactive lab opens instantly in Chrome, Edge, Safari, or Firefox with <strong>zero installation</strong> and works completely offline!</p>
              </li>
            </ol>
          </div>

          <!-- Download Action Box -->
          <div class="export-cta-box">
            <button type="button" class="btn-primary-download" id="btn-trigger-zip-download">
              <span class="btn-icon-large">⬇️</span>
              <span class="btn-text-large">
                <strong>Download All Files (.ZIP)</strong>
                <small>One-click package (all HTML, CSS, JS lessons &amp; PDFs)</small>
              </span>
            </button>

            <!-- Progress container -->
            <div id="download-progress-box" class="download-progress-box" role="status" aria-live="polite" style="display: none;">
              <div class="download-progress-track" role="progressbar" aria-label="ZIP download progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                <div id="download-progress-bar" class="download-progress-fill"></div>
              </div>
              <div id="download-progress-status" class="download-progress-status">Preparing archive...</div>
            </div>
          </div>

          <!-- AI Studio Direct Download Note -->
          <div class="export-tip-box">
            <div class="tip-icon">💡</div>
            <div class="tip-content">
              <strong>Tip: Exporting directly from Google AI Studio UI</strong>
              <p>You can also download this project directly from the AI Studio interface by clicking the <strong>top-right menu (&vellip; or Export)</strong> and selecting <strong>Download Zip / Export Code</strong> or syncing to GitHub.</p>
            </div>
          </div>

          <!-- Included Files Accordion / List -->
          <div class="export-files-breakdown">
            <h4 class="files-breakdown-heading">📁 Files included in this package (${PROJECT_FILES.length} items):</h4>
            <div class="files-tags-grid">
              ${PROJECT_FILES.map(f => `
                <div class="file-tag-item">
                  <span class="file-tag-ext">${f.path.endsWith('.pdf') ? '📄 PDF' : f.path.endsWith('.js') ? '⚡ JS' : f.path.endsWith('.css') ? '🎨 CSS' : '🌐 HTML'}</span>
                  <span class="file-tag-name" title="${f.path}">${f.path}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="export-modal-footer">
          <button type="button" class="btn-secondary" id="btn-footer-close">Close</button>
        </div>
      </div>
    `;

    // Event listeners
    setTimeout(() => {
      const closeBtn = document.getElementById('btn-close-export-modal');
      const footerClose = document.getElementById('btn-footer-close');
      const dlBtn = document.getElementById('btn-trigger-zip-download');

      if (closeBtn) closeBtn.onclick = () => window.OfficeSkillsDownloader.closeModal();
      if (footerClose) footerClose.onclick = () => window.OfficeSkillsDownloader.closeModal();
      if (dlBtn) dlBtn.onclick = () => window.OfficeSkillsDownloader.startDownload();

      modal.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          event.preventDefault();
          window.OfficeSkillsDownloader.closeModal();
          return;
        }
        if (event.key !== 'Tab') return;
        const focusable = Array.from(modal.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'))
          .filter(element => element.getClientRects().length > 0);
        if (!focusable.length) { event.preventDefault(); return; }
        const first = focusable[0]; const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      });

      modal.onclick = (e) => {
        if (e.target === modal) window.OfficeSkillsDownloader.closeModal();
      };
    }, 0);

    return modal;
  }

})();
