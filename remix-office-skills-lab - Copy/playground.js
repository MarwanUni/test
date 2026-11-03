/**
 * Office Skills Lab - Interactive Playground Simulators & Auto-Checking Shell
 * Benha University - Shoubra | ELE123 / ELE114 Technical Reports
 * 
 * Provides:
 *  1. window.PlaygroundManager: Task strip, instruction panel, auto-check runner, progress sync
 *  2. window.MiniWord: Complete Microsoft Word 365 simulator with ribbon, A4 paper, undo/redo
 *  3. window.MiniExcel: Excel simulator shell (Phase 1 container & preview)
 */

(function () {
  'use strict';

  // Safe helper to escape HTML
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // =========================================================================
  // 1. PLAYGROUND MANAGER
  // =========================================================================

  const PlaygroundManager = {
    container: null,
    lessonId: null,
    currentTaskIndex: 0,
    tasks: [],
    autoAdvanceTimer: null,
    highlightTimer: null,
    isAdvancing: false,

    isArabic: function () {
      return document.documentElement.lang === 'ar-EG';
    },

    uiText: function (english, arabic) {
      return this.isArabic() ? arabic : english;
    },

    init: function (containerEl, lessonId) {
      this.container = containerEl;
      this.lessonId = lessonId;
      this.currentTaskIndex = 0;
      this.autoAdvanceTimer = null;
      this.highlightTimer = null;
      this.isAdvancing = false;

      // Load tasks for this lesson from window.LESSON_TASKS
      const allTasks = window.LESSON_TASKS || {};
      this.tasks = allTasks[lessonId] || [];

      this.renderShell();
      this.loadTask(0);
    },

    renderShell: function () {
      if (!this.container) return;

      const totalTasks = this.tasks.length;
      const ar = this.isArabic();

      this.container.innerHTML = `
        <div class="playground-shell" id="playground-shell">
          <!-- Top Task Navigation Strip -->
          <div class="task-strip-wrapper">
            <div class="task-strip-header">
              <div class="task-strip-meta">
                <span class="task-strip-badge">${ar ? 'معمل عملي' : 'PRACTICAL LAB'}</span>
                <span class="task-strip-counter" id="task-strip-counter" aria-live="polite">${ar ? `مهمة ١ من ${totalTasks}` : `Task 1 of ${totalTasks}`}</span>
              </div>
              <div class="task-strip-actions">
                <button type="button" class="btn-task-nav" id="btn-task-prev" title="${ar ? 'المهمة السابقة' : 'Previous task'}" disabled>◀ ${ar ? 'السابق' : 'Prev'}</button>
                <button type="button" class="btn-task-nav" id="btn-task-next" title="${ar ? 'المهمة التالية' : 'Next task'}" ${totalTasks <= 1 ? 'disabled' : ''}>${ar ? 'التالي' : 'Next'} ▶</button>
                <button type="button" class="btn-task-reset" id="btn-task-reset" title="${ar ? 'إعادة ضبط بيانات المهمة الحالية' : 'Reset current task document state'}">↺ ${ar ? 'إعادة المهمة' : 'Reset Task'}</button>
              </div>
            </div>

            <!-- Chips container -->
            <div class="task-chips-scroll" id="task-chips-container" role="tablist" aria-label="Lesson tasks">
              ${this.tasks.map((task, idx) => `
                <button type="button" class="task-chip ${task.isManual ? 'manual' : 'not-started'}" id="task-chip-${idx}" data-idx="${idx}" role="tab" aria-controls="task-instruction-panel simulator-mount" aria-selected="${idx === 0 ? 'true' : 'false'}" tabindex="${idx === 0 ? '0' : '-1'}" aria-label="Task ${idx + 1}${task.isManual ? ', manual review' : ''}" title="Task ${idx + 1}${task.isManual ? ' (manual review)' : ''}: ${escapeHtml(task.path || task.instruction)}">
                  <span class="chip-num">${idx + 1}</span>
                  <span class="chip-check" aria-hidden="true">✓</span>
                  ${task.isManual ? '<span class="chip-manual" aria-hidden="true">M</span>' : ''}
                </button>
              `).join('')}
            </div>

            <!-- Auto Advance Banner (hidden by default) -->
            <div class="task-auto-advance-banner" id="task-auto-advance-banner" style="display: none;">
              <span class="advance-icon">🎉</span>
              <span class="advance-text" id="task-advance-text">Task completed! Auto-advancing in 1.5s...</span>
              <button type="button" class="btn-advance-stay" id="btn-advance-stay">Stay here</button>
            </div>
          </div>

          <!-- Instruction & Hint Panel -->
          <div class="task-instruction-panel" id="task-instruction-panel" aria-live="polite" aria-atomic="true">
            <div class="instruction-main-row">
              <div class="instruction-body">
                <div class="instruction-step-tag" id="task-step-tag">STEP 1</div>
                <div class="instruction-text" id="task-instruction-text">Loading instruction...</div>
              </div>
              <div class="instruction-helpers">
                <button type="button" class="btn-helper" id="btn-toggle-hint" title="${ar ? 'إظهار أو إخفاء التلميح' : 'Show or hide the hint'}" aria-controls="task-hint-box" aria-expanded="false">💡 ${ar ? 'ورّيني تلميح' : 'Show hint'}</button>
                <button type="button" class="btn-helper btn-show-me" id="btn-show-me" title="${ar ? 'ورّيني مكان الأداة' : 'Highlight where to click'}">🔍 ${ar ? 'ورّيني' : 'Show me'}</button>
                <button type="button" class="btn-helper btn-show-practically" id="btn-show-practically" title="${ar ? 'اشرحلي الخطوة عمليًا' : 'Walk through this step practically'}">🎬 ${ar ? 'اشرحلي عمليًا' : 'Show practically'}</button>
              </div>
            </div>

            <!-- Expandable Hint Box -->
            <div class="task-hint-box" id="task-hint-box" style="display: none;">
              <strong style="color:var(--brand-blue);">${ar ? 'تلميح:' : 'Hint:'}</strong>
              <span id="task-hint-text"></span>
            </div>

            <!-- Verification Status Bar -->
            <div class="task-status-bar" id="task-status-bar" role="status" aria-live="polite">
              <span class="status-indicator-dot" id="status-indicator-dot"></span>
              <span class="status-msg" id="task-status-msg">${ar ? 'نفّذ الخطوة في المحاكي...' : 'Awaiting action in simulator...'}</span>
            </div>
          </div>

          <!-- Simulator Body -->
          <div class="simulator-mount" id="simulator-mount">
            <!-- Mini Word or Mini Excel mounted here -->
          </div>
        </div>
      `;

      this.bindShellEvents();
      this.updateAllChips();
    },

    bindShellEvents: function () {
      const prevBtn = document.getElementById('btn-task-prev');
      const nextBtn = document.getElementById('btn-task-next');
      const resetBtn = document.getElementById('btn-task-reset');
      const hintBtn = document.getElementById('btn-toggle-hint');
      const showMeBtn = document.getElementById('btn-show-me');
      const showPracticallyBtn = document.getElementById('btn-show-practically');
      const stayBtn = document.getElementById('btn-advance-stay');
      const chipsContainer = document.getElementById('task-chips-container');

      if (prevBtn) {
        prevBtn.onclick = () => {
          if (this.currentTaskIndex > 0) this.loadTask(this.currentTaskIndex - 1);
        };
      }

      if (nextBtn) {
        nextBtn.onclick = () => {
          if (this.currentTaskIndex < this.tasks.length - 1) this.loadTask(this.currentTaskIndex + 1);
        };
      }

      if (resetBtn) {
        resetBtn.onclick = () => {
          this.resetCurrentTask();
        };
      }

      if (hintBtn) {
        hintBtn.onclick = () => {
          const hintBox = document.getElementById('task-hint-box');
          if (hintBox) {
            const isHidden = hintBox.style.display === 'none';
            hintBox.style.display = isHidden ? 'block' : 'none';
            hintBtn.classList.toggle('active', isHidden);
            hintBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
          }
        };
      }

      if (showMeBtn) {
        showMeBtn.onclick = () => {
          this.highlightTarget();
        };
      }

      if (showPracticallyBtn) {
        showPracticallyBtn.onclick = () => {
          this.playPracticalStep();
        };
      }

      if (stayBtn) {
        stayBtn.onclick = () => {
          this.cancelAutoAdvance();
        };
      }

      if (chipsContainer) {
        chipsContainer.onclick = (e) => {
          const chip = e.target.closest('.task-chip');
          if (chip) {
            const idx = parseInt(chip.getAttribute('data-idx'), 10);
            if (!isNaN(idx)) this.loadTask(idx);
          }
        };
        chipsContainer.onkeydown = (event) => {
          const chip = event.target.closest('.task-chip');
          if (!chip) return;
          const current = Number(chip.dataset.idx);
          let next = current;
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (current + 1) % this.tasks.length;
          else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (current - 1 + this.tasks.length) % this.tasks.length;
          else if (event.key === 'Home') next = 0;
          else if (event.key === 'End') next = this.tasks.length - 1;
          else return;
          event.preventDefault();
          this.loadTask(next);
          document.getElementById(`task-chip-${next}`)?.focus();
        };
      }

      const shell = document.getElementById('playground-shell');
      if (shell) shell.onkeydown = event => {
        if (event.altKey && event.key === 'ArrowLeft' && this.currentTaskIndex > 0) {
          event.preventDefault();
          this.loadTask(this.currentTaskIndex - 1);
          document.getElementById(`task-chip-${this.currentTaskIndex}`)?.focus();
        } else if (event.altKey && event.key === 'ArrowRight' && this.currentTaskIndex < this.tasks.length - 1) {
          event.preventDefault();
          this.loadTask(this.currentTaskIndex + 1);
          document.getElementById(`task-chip-${this.currentTaskIndex}`)?.focus();
        }
      };
    },

    loadTask: function (idx) {
      if (idx < 0 || idx >= this.tasks.length) return;
      this.cancelAutoAdvance();
      this.currentTaskIndex = idx;

      const task = this.tasks[idx];
      const totalTasks = this.tasks.length;

      // Update Header & Buttons
      const counterEl = document.getElementById('task-strip-counter');
      const prevBtn = document.getElementById('btn-task-prev');
      const nextBtn = document.getElementById('btn-task-next');
      const stepTag = document.getElementById('task-step-tag');
      const instructionText = document.getElementById('task-instruction-text');
      const hintText = document.getElementById('task-hint-text');
      const hintBox = document.getElementById('task-hint-box');
      const hintBtn = document.getElementById('btn-toggle-hint');

      if (counterEl) counterEl.textContent = this.isArabic() ? `مهمة ${idx + 1} من ${totalTasks}` : `Task ${idx + 1} of ${totalTasks}`;
      if (prevBtn) prevBtn.disabled = idx === 0;
      if (nextBtn) nextBtn.disabled = idx === totalTasks - 1;
      if (stepTag) stepTag.textContent = (this.isArabic() ? `الخطوة ${idx + 1}` : `STEP ${idx + 1}`) + (task.path ? ` · ${task.path}` : '');
      if (instructionText) instructionText.textContent = task.instructionAr || task.instruction || this.uiText('Follow the step-by-step instruction in the Study Guide.', 'اتبع الخطوات بالترتيب في دليل الدرس.');
      if (hintText) hintText.textContent = task.hintAr || task.hint || (task.path ? `${this.uiText('Look under:', 'دَوّر في:')} ${task.path}` : this.uiText('Review the rule and menu path in the Study Guide.', 'راجع القاعدة ومسار القوائم في دليل الدرس.'));
      if (hintBox) hintBox.style.display = 'none';
      if (hintBtn) { hintBtn.classList.remove('active'); hintBtn.setAttribute('aria-expanded', 'false'); }

      // Update chip active states
      this.updateAllChips();

      // Mount or re-use appropriate simulator
      this.ensureSimulator(task);

      // Initialize simulator to task's startState
      if (task.app === 'word' && window.MiniWord) {
        window.MiniWord.loadState(task.startState);
      } else if (task.app === 'excel' && window.MiniExcel) {
        window.MiniExcel.activateLesson(this.lessonId, task.startState);
      }

      // Run initial check
      this.checkCurrentTask(true);
    },

    ensureSimulator: function (task) {
      const mount = document.getElementById('simulator-mount');
      if (!mount) return;

      const appType = task.app || (this.lessonId.startsWith('w') ? 'word' : 'excel');

      if (appType === 'word') {
        if (!document.getElementById('mini-word-app')) {
          mount.innerHTML = '';
          window.MiniWord.mount(mount);
        }
      } else if (appType === 'excel') {
        if (!document.getElementById('mini-excel-app')) {
          mount.innerHTML = '';
          window.MiniExcel.mount(mount);
        }
      } else {
        // Report / general checklist view
        mount.innerHTML = `
          <div class="report-audit-simulator" style="padding:2rem; text-align:center; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-md);">
            <div style="font-size:2rem; margin-bottom:0.5rem;">📋</div>
            <h3 style="margin-bottom:0.5rem; color:var(--text-main);">Technical Report Submission Audit</h3>
            <p style="color:var(--text-muted); max-width:600px; margin:0 auto 1.5rem; font-size:0.9rem;">
              Compare your completed report against this audit requirement. Open your document in Microsoft Word or the Mini Word tab to verify.
            </p>
            <p style="color:var(--warning); font-size:0.82rem; font-weight:700;">Manual review required — use the Study Guide checkbox to self-mark after checking your report.</p>
          </div>
        `;
      }
    },

    updateAllChips: function () {
      const completedSteps = (window.OfficeSkillsApp && window.OfficeSkillsApp.getCompletedSteps()) || {};

      this.tasks.forEach((task, idx) => {
        const chip = document.getElementById(`task-chip-${idx}`);
        if (!chip) return;

        const isCurrent = idx === this.currentTaskIndex;
        const key = `${this.lessonId}_${idx}`;
        const isDone = !!completedSteps[key];

        chip.classList.remove('current', 'done', 'not-started');
        if (isCurrent) chip.classList.add('current');
        if (isDone) chip.classList.add('done');
        if (!isCurrent && !isDone) chip.classList.add('not-started');

        chip.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
        chip.tabIndex = isCurrent ? 0 : -1;
        chip.setAttribute('aria-label', `Task ${idx + 1}${isDone ? ', completed' : ''}${task.isManual ? ', manual review' : ''}`);
      });
    },

    highlightTarget: function () {
      const task = this.tasks[this.currentTaskIndex];
      if (!task) return;

      let targetEl = null;

      // 1. Check specific showMeTarget
      if (task.showMeTarget) {
        targetEl = document.querySelector(task.showMeTarget);
      }

      // 2. Fallbacks based on path / app
      if (!targetEl && task.app === 'word') {
        const path = (task.path || '').toLowerCase();
        if (path.includes('layout')) targetEl = document.querySelector('#ribbon-tab-layout');
        else if (path.includes('insert')) targetEl = document.querySelector('#ribbon-tab-insert');
        else if (path.includes('references')) targetEl = document.querySelector('#ribbon-tab-references');
        else if (path.includes('view')) targetEl = document.querySelector('#ribbon-tab-view');
        else targetEl = document.querySelector('#ribbon-tab-home');
      }

      if (!targetEl && task.app === 'excel') {
        const path = (task.path || '').toLowerCase();
        let selector = '[data-excel-tab="home"]';
        if (path.includes('data') || path.includes('sort') || path.includes('filter') || path.includes('analysis')) selector = '[data-excel-tab="data"]';
        else if (path.includes('insert') || path.includes('chart')) selector = '[data-excel-tab="insert"]';
        else if (path.includes('formula') || path.includes('function')) selector = '[data-excel-tab="formulas"]';
        else if (path.includes('cell') || path.includes('range') || path.includes('worksheet')) selector = '#excel-name-box';
        targetEl = document.querySelector(selector);
      }

      if (targetEl) {
        // Remove existing highlights
        document.querySelectorAll('.show-me-highlight').forEach(el => el.classList.remove('show-me-highlight'));

        targetEl.classList.add('show-me-highlight');
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });

        if (this.highlightTimer) clearTimeout(this.highlightTimer);
        this.highlightTimer = setTimeout(() => {
          if (targetEl) targetEl.classList.remove('show-me-highlight');
        }, 3200);
      }
    },

    resolveShowMeTarget: function (task) {
      let targetEl = task.showMeTarget ? document.querySelector(task.showMeTarget) : null;
      const path = (task.path || '').toLowerCase();
      if (!targetEl && task.app === 'word') {
        if (path.includes('layout')) targetEl = document.querySelector('#ribbon-tab-layout');
        else if (path.includes('insert')) targetEl = document.querySelector('#ribbon-tab-insert');
        else if (path.includes('references')) targetEl = document.querySelector('#ribbon-tab-references');
        else if (path.includes('view')) targetEl = document.querySelector('#ribbon-tab-view');
        else targetEl = document.querySelector('#ribbon-tab-home');
      }
      if (!targetEl && task.app === 'excel') {
        let selector = '[data-excel-tab="home"]';
        if (path.includes('data') || path.includes('sort') || path.includes('filter') || path.includes('analysis')) selector = '[data-excel-tab="data"]';
        else if (path.includes('insert') || path.includes('chart')) selector = '[data-excel-tab="insert"]';
        else if (path.includes('formula') || path.includes('function')) selector = '[data-excel-tab="formulas"]';
        else if (path.includes('cell') || path.includes('range') || path.includes('worksheet')) selector = '#excel-name-box';
        targetEl = document.querySelector(selector);
      }
      return targetEl;
    },

    playPracticalStep: function () {
      const task = this.tasks[this.currentTaskIndex];
      const targetEl = this.resolveShowMeTarget(task);
      if (!task || !targetEl) return this.highlightTarget();

      document.querySelectorAll('.practical-cursor, .practical-prompt').forEach(el => el.remove());
      const cursor = document.createElement('div');
      cursor.className = 'practical-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cursor);
      const rect = targetEl.getBoundingClientRect();
      const startX = Math.max(24, window.innerWidth * 0.5);
      const startY = Math.max(24, window.innerHeight * 0.45);
      cursor.style.left = `${startX}px`;
      cursor.style.top = `${startY}px`;
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

      window.setTimeout(() => {
        const nextRect = targetEl.getBoundingClientRect();
        cursor.style.left = `${nextRect.left + nextRect.width / 2}px`;
        cursor.style.top = `${nextRect.top + nextRect.height / 2}px`;
      }, 120);

      window.setTimeout(() => {
        targetEl.click();
        targetEl.classList.add('show-me-highlight');
        const prompt = document.createElement('div');
        prompt.className = 'practical-prompt';
        const ar = this.isArabic();
        prompt.innerHTML = `<strong>${ar ? 'هل فهمت الخطوة؟' : 'Did you understand this action?'}</strong><span>${escapeHtml(task.instruction || task.path || '')}</span><div><button type="button" class="btn-primary practical-continue">${ar ? 'كمّل' : 'Continue'}</button><button type="button" class="btn-toggle practical-stop">${ar ? 'قف هنا' : 'Stop here'}</button><button type="button" class="btn-toggle practical-again">${ar ? 'ورّيني تاني' : 'Show again'}</button></div>`;
        document.body.appendChild(prompt);
        const finishPrompt = () => {
          prompt.remove();
          cursor.remove();
          targetEl.classList.remove('show-me-highlight');
        };
        prompt.querySelector('.practical-stop').onclick = finishPrompt;
        prompt.querySelector('.practical-continue').onclick = () => {
          finishPrompt();
          if (this.currentTaskIndex < this.tasks.length - 1) this.loadTask(this.currentTaskIndex + 1);
        };
        prompt.querySelector('.practical-again').onclick = () => {
          prompt.remove();
          cursor.remove();
          targetEl.classList.remove('show-me-highlight');
          this.playPracticalStep();
        };
      }, 1050);
    },

    checkCurrentTask: function (silent) {
      const task = this.tasks[this.currentTaskIndex];
      if (!task) return;

      let state = {};
      if (task.app === 'word' && window.MiniWord) {
        state = window.MiniWord.getState();
      } else if (task.app === 'excel' && window.MiniExcel) {
        state = window.MiniExcel.getState();
      }

      const result = typeof task.check === 'function' ? task.check(state) : { pass: false, message: 'Check pending.' };

      const statusDot = document.getElementById('status-indicator-dot');
      const statusMsg = document.getElementById('task-status-msg');

      if (result && result.pass) {
        if (statusDot) {
          statusDot.className = 'status-indicator-dot success';
        }
        if (statusMsg) {
          statusMsg.innerHTML = this.isArabic()
            ? '<strong style="color:var(--success);">✓ اتأكدت!</strong> المطلوب اتحقق.'
            : '<strong style="color:var(--success);">✓ Verified!</strong> Requirement satisfied.';
          statusMsg.setAttribute('aria-live', 'assertive');
        }
        this.handleTaskSuccess(silent);
      } else {
        if (statusDot) {
          statusDot.className = `status-indicator-dot ${result && result.manual ? 'manual' : 'pending'}`;
        }
        if (statusMsg) {
          const label = result && result.manual
            ? (this.isArabic() ? '<strong>مراجعة يدوية:</strong> ' : '<strong>Manual review:</strong> ')
            : '';
          const fallback = this.uiText('Complete the step in the simulator above.', 'كمّل الخطوة المطلوبة في المحاكي اللي فوق.');
          statusMsg.innerHTML = `<span style="color:var(--text-muted);">${label}${result && result.message ? escapeHtml(result.message) : fallback}</span>`;
          statusMsg.setAttribute('aria-live', result && result.manual ? 'polite' : 'assertive');
        }
        if (result && result.manual) {
          const currentChip = document.getElementById(`task-chip-${this.currentTaskIndex}`);
          if (currentChip) {
            currentChip.classList.add('manual');
            currentChip.setAttribute('aria-description', result.message || 'Manual review required');
          }
        }
      }
    },

    handleTaskSuccess: function (silent) {
      const key = `${this.lessonId}_${this.currentTaskIndex}`;

      // Notify main app to persist completion as 'verified'
      if (window.OfficeSkillsApp && typeof window.OfficeSkillsApp.onTaskVerified === 'function') {
        window.OfficeSkillsApp.onTaskVerified(this.lessonId, this.currentTaskIndex);
      }

      // Update chip visual
      const currentChip = document.getElementById(`task-chip-${this.currentTaskIndex}`);
      if (currentChip) currentChip.classList.add('done');

      if (silent) return;

      // Show auto-advance banner
      const banner = document.getElementById('task-auto-advance-banner');
      const advanceText = document.getElementById('task-advance-text');

      if (this.currentTaskIndex < this.tasks.length - 1) {
        if (banner) banner.style.display = 'flex';
        if (advanceText) advanceText.textContent = this.isArabic()
          ? `✓ خلصت المهمة ${this.currentTaskIndex + 1}! هننقل للمهمة اللي بعدها كمان لحظة...`
          : `✓ Task ${this.currentTaskIndex + 1} completed! Auto-advancing in 1.5s...`;

        this.cancelAutoAdvance();
        this.autoAdvanceTimer = setTimeout(() => {
          if (banner) banner.style.display = 'none';
          this.loadTask(this.currentTaskIndex + 1);
        }, 1500);
      } else {
        // Lesson finished!
        if (banner) banner.style.display = 'flex';
        if (advanceText) advanceText.innerHTML = this.isArabic()
          ? `🏆 <strong>خلصت كل مهام الدرس (${this.tasks.length})!</strong> شغل ممتاز.`
          : `🏆 <strong>All ${this.tasks.length} tasks completed for this lesson!</strong> Excellent work.`;
        const stayBtn = document.getElementById('btn-advance-stay');
        if (stayBtn) stayBtn.style.display = 'none';
      }
    },

    cancelAutoAdvance: function () {
      if (this.autoAdvanceTimer) {
        clearTimeout(this.autoAdvanceTimer);
        this.autoAdvanceTimer = null;
      }
      const banner = document.getElementById('task-auto-advance-banner');
      if (banner) banner.style.display = 'none';
    },

    resetCurrentTask: function () {
      const task = this.tasks[this.currentTaskIndex];
      if (!task) return;

      this.cancelAutoAdvance();

      if (task.app === 'word' && window.MiniWord) {
        window.MiniWord.loadState(task.startState);
      } else if (task.app === 'excel' && window.MiniExcel) {
        window.MiniExcel.loadState(task.startState);
      }

      this.checkCurrentTask(false);
    }
  };

  // Expose globally
  window.PlaygroundManager = PlaygroundManager;


  // =========================================================================
  // 2. MINI WORD SIMULATOR (Microsoft Word 365)
  // =========================================================================

  const MiniWord = {
    mountPoint: null,
    history: [],
    historyIndex: -1,
    defaultState: null,

    // Internal reactive state
    state: {
      activeTab: 'home',
      paperSize: 'A4',
      orientation: 'portrait',
      margins: {
        type: 'normal',
        top: 2.5,
        bottom: 2.5,
        left: 2.5,
        right: 2.5
      },
      zoom: 100,
      showFormattingMarks: false,
      fontFamily: 'Times New Roman',
      fontSize: 12,
      bold: false,
      italic: false,
      underline: false,
      textColor: '#000000',
      alignment: 'justify',
      lineSpacing: 1.15,
      paragraphSpacing: {
        before: 0,
        after: 6
      },
      firstLineIndent: false,
      keepWithNext: false,
      styles: {
        heading1: { fontSize: 16, bold: true, fontFamily: 'Arial' },
        heading2: { fontSize: 14, bold: true, fontFamily: 'Arial' },
        heading3: { fontSize: 12, bold: true, fontFamily: 'Arial' }
      },
      heading1Size: 16,
      heading1Bold: true,
      heading2Size: 14,
      heading2Bold: true,
      heading3Size: 12,
      heading3Bold: true,
      heading1Applied: false,
      heading2Applied: false,
      heading3Applied: false,
      multilevelNumbering: false,
      hasCoverPage: false,
        hasPageBreak: false,
      coverPageGalleryOpen: false,
      coverTitle: 'TECHNICAL REPORT: DESIGN & ANALYSIS',
      coverAuthor: 'Marwan Abdallah (ID: 20260123)',
      coverDate: '17 November 2026',
      differentFirstPage: true,
      coverPageHasNumber: false,
      hasPageNumber: true,
      pageNumbering: {
        position: 'bottom-center',
        format: 'roman',
        startAt: 1
      },
      sectionsCount: 1,
      activeSection: 1,
      hasSectionBreak: false,
      linkToPrevious: {
        header: true,
        footer: true
      },
      section2PageFormat: 'arabic',
      section2StartAt: 1,
      hasAppendixSection: false,
      activeZone: 'body',
      footerOpen: false,
      headerText: 'ELE123 Technical Reports',
      footerText: 'Marwan Abdallah · ID: 20260123 · ELE123',
      footerFontSize: 9,
      textSelected: false,
      allSelected: false,
      tableFontSize: 10,
      hasTable: false,
      tableRows: 0,
      tableCols: 0,
      tableCentered: false,
      hasTableCaption: false,
      tableCaptionPosition: 'above',
      tableCaptionBold: false,
      tableCaptionSize: 10,
      hasEmDash: false,
      tableHeaderShaded: false,
      tableStyled: false,
      hasFigure: false,
      figureCentered: false,
      captionDialogOpen: false,
      hasFigureCaption: false,
      figureCaptionPosition: 'below',
      figureCaptionBold: false,
      figureCaptionSize: 10,
      hasCrossReference: false,
      hasTOC: false,
      tocUpdated: false,
      hasListOfFigures: false,
      hasListOfTables: false,
      listsUpdated: false,
      hasEquation: false,
      equationHasVariables: false,
      equationCentered: false,
      equationNumbered: false,
      equationText: 'V_T = (k · T) / q · ln(I / I_s)',
      citationStyle: 'IEEE',
      sourceAdded: false,
      sourcesCount: 0,
      hasInTextCitation: false,
      hasBibliography: false,
      stylesPaneOpen: false,
      styleBasedOnNone: false,
      customStyleCreated: false,
      styleHasBorderOrShading: false,
      navigationPaneOpen: false,
      themeApplied: false,
      colorPaletteChanged: false,
      bodyText: ''
    },

    mount: function (mountEl) {
      this.mountPoint = mountEl;
      if (!this.mountPoint.dataset.pageNumberToggleBound) {
        this.mountPoint.addEventListener('click', event => {
          if (!event.target.closest('#tool-insert-page-number')) return;
          this.state.hasPageNumber = !this.state.hasPageNumber;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        });
        this.mountPoint.dataset.pageNumberToggleBound = 'true';
      }
      if (!this.defaultState) this.defaultState = JSON.parse(JSON.stringify(this.state));
      this.render();
      this.saveSnapshot();
    },

    getState: function () {
      // Sync real text from contenteditable body
      const bodyEl = document.getElementById('word-page-body');
      if (bodyEl) {
        const p1 = document.getElementById('word-body-paragraph-1');
        this.state.bodyText = p1 ? (p1.innerText || '') : (bodyEl.innerText || '');
      }
      const eqEl = document.getElementById('word-equation-math');
      if (eqEl) {
        this.state.equationText = eqEl.innerText || '';
      }
      return Object.assign({}, this.state);
    },

    loadState: function (initialState) {
      const defaults = JSON.parse(JSON.stringify(this.defaultState || this.state));
      const incoming = JSON.parse(JSON.stringify(initialState || {}));
      this.state = Object.assign({}, defaults, incoming);
      ['margins', 'paragraphSpacing', 'pageNumbering', 'linkToPrevious', 'styles'].forEach((key) => {
        if (incoming[key] && typeof incoming[key] === 'object') {
          this.state[key] = Object.assign({}, defaults[key] || {}, incoming[key]);
        }
      });
      this.history = [];
      this.historyIndex = -1;
      this.render();
      this.saveSnapshot();
    },

    saveSnapshot: function () {
      const snap = JSON.stringify(this.state);
      if (this.historyIndex >= 0 && this.history[this.historyIndex] === snap) return;
      this.history = this.history.slice(0, this.historyIndex + 1);
      this.history.push(snap);
      if (this.history.length > 30) this.history.shift();
      this.historyIndex = this.history.length - 1;
      this.updateUndoRedoButtons();
    },

    undo: function () {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.state = JSON.parse(this.history[this.historyIndex]);
        this.render();
        PlaygroundManager.checkCurrentTask(false);
      }
    },

    redo: function () {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.state = JSON.parse(this.history[this.historyIndex]);
        this.render();
        PlaygroundManager.checkCurrentTask(false);
      }
    },

    updateUndoRedoButtons: function () {
      const undoBtn = document.getElementById('tool-undo');
      const redoBtn = document.getElementById('tool-redo');
      if (undoBtn) undoBtn.disabled = this.historyIndex <= 0;
      if (redoBtn) redoBtn.disabled = this.historyIndex >= this.history.length - 1;
    },

    render: function () {
      if (!this.mountPoint) return;

      const s = this.state;
      const previousDesk = this.mountPoint.querySelector('#word-desk');
      const deskScroll = previousDesk
        ? { top: previousDesk.scrollTop, left: previousDesk.scrollLeft }
        : null;
      const previousToolbar = this.mountPoint.querySelector('#word-ribbon-toolbar');
      const toolbarScrollLeft = previousToolbar ? previousToolbar.scrollLeft : 0;

      this.mountPoint.innerHTML = `
        <div class="mini-word-app" id="mini-word-app">
          <!-- Window Title Bar -->
          <div class="word-title-bar">
            <div class="title-left">
              <span class="word-logo-icon">W</span>
              <span class="doc-title-text">Technical_Report_Draft.docx - Word</span>
              <span class="doc-save-status">Saved</span>
            </div>
            <div class="title-quick-tools">
              <button type="button" class="q-btn" id="tool-undo" title="Undo (Ctrl+Z)" ${this.historyIndex <= 0 ? 'disabled' : ''}>↩</button>
              <button type="button" class="q-btn" id="tool-redo" title="Redo (Ctrl+Y)" ${this.historyIndex >= this.history.length - 1 ? 'disabled' : ''}>↪</button>
            </div>
          </div>

          <!-- Ribbon Tabs Navigation -->
          <nav class="word-ribbon-tabs" aria-label="Word ribbon tabs" role="tablist">
            <button type="button" role="tab" aria-controls="word-ribbon-toolbar" aria-selected="${s.activeTab === 'home'}" tabindex="${s.activeTab === 'home' ? '0' : '-1'}" class="ribbon-tab-btn ${s.activeTab === 'home' ? 'active' : ''}" id="ribbon-tab-home" data-tab="home">Home</button>
            <button type="button" role="tab" aria-controls="word-ribbon-toolbar" aria-selected="${s.activeTab === 'insert'}" tabindex="${s.activeTab === 'insert' ? '0' : '-1'}" class="ribbon-tab-btn ${s.activeTab === 'insert' ? 'active' : ''}" id="ribbon-tab-insert" data-tab="insert">Insert</button>
            <button type="button" role="tab" aria-controls="word-ribbon-toolbar" aria-selected="${s.activeTab === 'layout'}" tabindex="${s.activeTab === 'layout' ? '0' : '-1'}" class="ribbon-tab-btn ${s.activeTab === 'layout' ? 'active' : ''}" id="ribbon-tab-layout" data-tab="layout">Layout</button>
            <button type="button" role="tab" aria-controls="word-ribbon-toolbar" aria-selected="${s.activeTab === 'references'}" tabindex="${s.activeTab === 'references' ? '0' : '-1'}" class="ribbon-tab-btn ${s.activeTab === 'references' ? 'active' : ''}" id="ribbon-tab-references" data-tab="references">References</button>
            <button type="button" role="tab" aria-controls="word-ribbon-toolbar" aria-selected="${s.activeTab === 'view'}" tabindex="${s.activeTab === 'view' ? '0' : '-1'}" class="ribbon-tab-btn ${s.activeTab === 'view' ? 'active' : ''}" id="ribbon-tab-view" data-tab="view">View</button>
          </nav>

          <!-- Ribbon Toolbar Body -->
          <div class="word-ribbon-toolbar" id="word-ribbon-toolbar" role="tabpanel" aria-labelledby="ribbon-tab-${s.activeTab}">
            ${this.renderActiveRibbonTab()}
          </div>

          <!-- Document Desk / Page Canvas -->
          <div class="word-desk" id="word-desk">
            ${s.navigationPaneOpen ? `
              <aside class="word-nav-pane">
                <div class="nav-pane-header">Headings</div>
                <ul class="nav-headings-list">
                  <li class="nav-h1">1.0 Introduction</li>
                  <li class="nav-h2">1.1 Problem Statement</li>
                  <li class="nav-h1">2.0 Methodology & Setup</li>
                  <li class="nav-h1">3.0 Results & Analysis</li>
                  <li class="nav-h1">References</li>
                </ul>
              </aside>
            ` : ''}

            <div class="word-desk-canvas" style="transform: scale(${s.zoom / 100}); transform-origin: top center;">
              <!-- Simulated A4 Paper -->
              <div class="word-page-a4 ${s.margins.type === 'bound' ? 'is-bound' : ''} ${s.orientation === 'landscape' ? 'is-landscape' : ''}" id="word-page-a4" style="${this.getPageStyles()}">
                
                <!-- Binding Spine Shading (visible when Bound is selected) -->
                ${s.margins.type === 'bound' ? `
                  <div class="binding-spine-indicator" title="Bound Report Margin Allowance: 3.5 cm">
                    <span>3.5 cm Spine Binding Allowance</span>
                  </div>
                ` : ''}

                <!-- Header Zone -->
                <div class="word-header-zone ${s.activeZone === 'header' ? 'is-active' : ''}" id="word-header-zone">
                  <span class="section-zone-label">[Section ${s.activeSection} Header${s.linkToPrevious.header ? '' : ' - Unlinked'}]</span>
                  <div class="header-content" contenteditable="true" role="textbox" aria-label="Document header" aria-multiline="true" id="word-header-content">
                    <span style="float:left; font-size:9pt; color:#64748b;">${escapeHtml(s.headerText)}</span>
                    ${s.hasPageNumber && s.pageNumbering.position === 'top-right' ? `
                      <span style="float:right; font-size:9pt; font-weight:700;">Page ${s.activeSection === 1 ? 'i' : '1'}</span>
                    ` : ''}
                    <div style="clear:both;"></div>
                  </div>
                </div>

                <!-- Main Body Zone -->
                <div class="word-body-zone ${s.activeZone === 'body' ? 'is-active' : ''}" id="word-page-body" contenteditable="true" role="textbox" aria-label="Document body page" aria-multiline="true" spellcheck="false" style="${this.getBodyStyles()}">
                  ${this.renderDocumentBodyHtml()}
                </div>

                <!-- Footer Zone -->
                <div class="word-footer-zone ${s.activeZone === 'footer' ? 'is-active' : ''}" id="word-footer-zone">
                  <span class="section-zone-label">[Section ${s.activeSection} Footer${s.linkToPrevious.footer ? '' : ' - Unlinked'}]</span>
                  <div class="footer-content" id="word-footer-content" style="font-size:${s.footerFontSize}pt;">
                    <span style="float:left;" id="footer-text-display" contenteditable="true" role="textbox" aria-label="Document footer">${escapeHtml(s.footerText)}</span>
                    ${s.hasPageNumber && s.pageNumbering.position === 'bottom-center' ? `
                      <span style="float:right; font-weight:700;" id="footer-page-num-display">
                        ${s.differentFirstPage && s.hasCoverPage ? '' : (s.activeSection === 1 ? 'Page i' : 'Page 1')}
                      </span>
                    ` : ''}
                    <div style="clear:both;"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- Status Bar -->
          <div class="word-status-bar">
            <div class="status-left">
              <span>Page ${s.activeSection} of ${s.sectionsCount}</span>
              <span class="status-separator">·</span>
              <span>Section ${s.activeSection}</span>
              <span class="status-separator">·</span>
              <span id="word-count-display">${this.countWords()} words</span>
            </div>
            <div class="status-right">
              <span class="status-spec-badge">${s.paperSize} · ${s.margins.type.toUpperCase()} MARGINS</span>
              <span class="status-separator">·</span>
              <div class="zoom-controls">
                <button type="button" class="btn-zoom-tick" id="btn-zoom-out" title="Zoom out">-</button>
                <span>${s.zoom}%</span>
                <button type="button" class="btn-zoom-tick" id="btn-zoom-in" title="Zoom in">+</button>
              </div>
            </div>
          </div>
        </div>
      `;

      const nextDesk = this.mountPoint.querySelector('#word-desk');
      if (nextDesk && deskScroll) {
        nextDesk.scrollTop = deskScroll.top;
        nextDesk.scrollLeft = deskScroll.left;
      }
      const nextToolbar = this.mountPoint.querySelector('#word-ribbon-toolbar');
      if (nextToolbar) nextToolbar.scrollLeft = toolbarScrollLeft;

      this.bindRibbonEvents();
    },

    renderActiveRibbonTab: function () {
      const s = this.state;

      switch (s.activeTab) {
        case 'home':
          return `
            <!-- Font Group -->
            <div class="ribbon-group">
              <div class="ribbon-group-row">
                <select class="ribbon-select" id="tool-font-family" title="Font Family">
                  <option value="Times New Roman" ${s.fontFamily === 'Times New Roman' ? 'selected' : ''}>Times New Roman</option>
                  <option value="Arial" ${s.fontFamily === 'Arial' ? 'selected' : ''}>Arial</option>
                  <option value="Calibri" ${s.fontFamily === 'Calibri' ? 'selected' : ''}>Calibri</option>
                  <option value="Segoe UI" ${s.fontFamily === 'Segoe UI' ? 'selected' : ''}>Segoe UI</option>
                </select>
                <select class="ribbon-select select-narrow" id="tool-font-size" title="Font Size">
                  <option value="9" ${s.fontSize === 9 ? 'selected' : ''}>9</option>
                  <option value="10" ${s.fontSize === 10 ? 'selected' : ''}>10</option>
                  <option value="11" ${s.fontSize === 11 ? 'selected' : ''}>11</option>
                  <option value="12" ${s.fontSize === 12 ? 'selected' : ''}>12</option>
                  <option value="14" ${s.fontSize === 14 ? 'selected' : ''}>14</option>
                  <option value="16" ${s.fontSize === 16 ? 'selected' : ''}>16</option>
                  <option value="18" ${s.fontSize === 18 ? 'selected' : ''}>18</option>
                  <option value="24" ${s.fontSize === 24 ? 'selected' : ''}>24</option>
                </select>
              </div>
              <div class="ribbon-group-row">
                <button type="button" class="ribbon-btn ${s.bold ? 'active' : ''}" id="tool-bold" title="Bold (Ctrl+B)"><strong>B</strong></button>
                <button type="button" class="ribbon-btn ${s.italic ? 'active' : ''}" id="tool-italic" title="Italic (Ctrl+I)"><em>I</em></button>
                <button type="button" class="ribbon-btn ${s.underline ? 'active' : ''}" id="tool-underline" title="Underline (Ctrl+U)"><u>U</u></button>
                <input type="color" id="tool-text-color" value="${s.textColor}" class="ribbon-color-picker" title="Text Color" />
                <button type="button" class="ribbon-btn" id="tool-select-all" title="Select All (Ctrl+A)">Select All</button>
              </div>
              <div class="ribbon-group-label">Font</div>
            </div>

            <!-- Paragraph Group -->
            <div class="ribbon-group">
              <div class="ribbon-group-row">
                <button type="button" class="ribbon-btn ${s.alignment === 'left' ? 'active' : ''}" id="tool-align-left" title="Align Left (Ctrl+L)">≡ Left</button>
                <button type="button" class="ribbon-btn ${s.alignment === 'center' ? 'active' : ''}" id="tool-align-center" title="Center (Ctrl+E)">≣ Center</button>
                <button type="button" class="ribbon-btn ${s.alignment === 'right' ? 'active' : ''}" id="tool-align-right" title="Align Right (Ctrl+R)">≡ Right</button>
                <button type="button" class="ribbon-btn ${s.alignment === 'justify' ? 'active' : ''}" id="tool-align-justify" title="Justify (Ctrl+J)">≣ Justify</button>
              </div>
              <div class="ribbon-group-row">
                <button type="button" class="ribbon-btn" id="tool-bullets" title="Bullets">• List</button>
                <button type="button" class="ribbon-btn" id="tool-numbering" title="Numbering">1. Numbering</button>
                <button type="button" class="ribbon-btn" id="tool-multilevel-list" title="Multilevel Headings List">1.1 List</button>
                <select class="ribbon-select select-narrow" id="tool-line-spacing" title="Line Spacing">
                  <option value="1.0" ${s.lineSpacing === 1.0 ? 'selected' : ''}>1.0</option>
                  <option value="1.15" ${s.lineSpacing === 1.15 ? 'selected' : ''}>1.15</option>
                  <option value="1.5" ${s.lineSpacing === 1.5 ? 'selected' : ''}>1.5</option>
                  <option value="2.0" ${s.lineSpacing === 2.0 ? 'selected' : ''}>2.0</option>
                </select>
                <button type="button" class="ribbon-btn ${s.firstLineIndent ? 'active' : ''}" id="tool-first-line-indent" title="First Line Indent (0.5 in / 1.27 cm)">Indent 0.5"</button>
                <button type="button" class="ribbon-btn-icon" id="tool-paragraph-dialog" title="Paragraph Dialog Box Launcher">↘</button>
              </div>
              <div class="ribbon-group-label">Paragraph</div>
            </div>

            <!-- Styles Gallery -->
            <div class="ribbon-group flex-1">
              <div class="styles-gallery">
                <button type="button" class="style-card" id="style-normal" title="Normal Body Style">
                  <span class="style-name">Normal</span>
                  <span class="style-preview">12 pt Justify</span>
                </button>
                <button type="button" class="style-card ${s.heading1Applied ? 'active' : ''}" id="style-heading1" title="Heading 1 (16 pt Bold)">
                  <span class="style-name">Heading 1</span>
                  <span class="style-preview">${s.heading1Size} pt Bold</span>
                </button>
                <button type="button" class="style-card ${s.heading2Applied ? 'active' : ''}" id="style-heading2" title="Heading 2 (14 pt Bold)">
                  <span class="style-name">Heading 2</span>
                  <span class="style-preview">${s.heading2Size} pt Bold</span>
                </button>
                <button type="button" class="style-card ${s.heading3Applied ? 'active' : ''}" id="style-heading3" title="Heading 3 (12 pt Bold)">
                  <span class="style-name">Heading 3</span>
                  <span class="style-preview">${s.heading3Size} pt ${s.heading3Bold ? 'Bold' : 'Regular'}</span>
                </button>
                <button type="button" class="style-card" id="style-title" title="Title Style (24 pt Bold)">
                  <span class="style-name">Title</span>
                  <span class="style-preview">24 pt Bold</span>
                </button>
                <button type="button" class="ribbon-btn" id="tool-styles-pane" title="Open Styles Task Pane">Styles ↘</button>
                <label class="style-size-control">H1 <select class="ribbon-select select-narrow" id="tool-heading1-size" aria-label="Heading 1 font size"><option value="12" ${s.heading1Size === 12 ? 'selected' : ''}>12 pt</option><option value="14" ${s.heading1Size === 14 ? 'selected' : ''}>14 pt</option><option value="16" ${s.heading1Size === 16 ? 'selected' : ''}>16 pt</option><option value="18" ${s.heading1Size === 18 ? 'selected' : ''}>18 pt</option></select></label>
                <label class="style-size-control">H2 <select class="ribbon-select select-narrow" id="tool-heading2-size" aria-label="Heading 2 font size"><option value="12" ${s.heading2Size === 12 ? 'selected' : ''}>12 pt</option><option value="14" ${s.heading2Size === 14 ? 'selected' : ''}>14 pt</option><option value="16" ${s.heading2Size === 16 ? 'selected' : ''}>16 pt</option><option value="18" ${s.heading2Size === 18 ? 'selected' : ''}>18 pt</option></select></label>
                <label class="style-size-control">H3 <select class="ribbon-select select-narrow" id="tool-heading3-size" aria-label="Heading 3 font size"><option value="10" ${s.heading3Size === 10 ? 'selected' : ''}>10 pt</option><option value="12" ${s.heading3Size === 12 ? 'selected' : ''}>12 pt</option><option value="14" ${s.heading3Size === 14 ? 'selected' : ''}>14 pt</option><option value="16" ${s.heading3Size === 16 ? 'selected' : ''}>16 pt</option></select></label>
              </div>
              <div class="ribbon-group-label">Styles</div>
            </div>
          `;

        case 'insert':
          return `
            <!-- Pages Group -->
            <div class="ribbon-group">
              <div class="ribbon-group-row">
                <button type="button" class="ribbon-btn ${s.hasCoverPage ? 'active' : ''}" id="tool-insert-cover-page">📑 Cover Page</button>
                <button type="button" class="ribbon-btn" id="tool-insert-page-break">📄 Page Break</button>
              </div>
              <div class="ribbon-group-label">Pages</div>
            </div>

            <!-- Tables Group -->
            <div class="ribbon-group">
              <div class="ribbon-group-row">
                <label class="table-size-control">Rows <input type="number" id="tool-table-rows" min="1" max="12" value="${s.tableRows || 4}" /></label>
                <label class="table-size-control">Cols <input type="number" id="tool-table-cols" min="1" max="8" value="${s.tableCols || 4}" /></label>
                <button type="button" class="ribbon-btn ${s.hasTable ? 'active' : ''}" id="tool-insert-table">田 Insert Table</button>
                <button type="button" class="ribbon-btn" id="tool-table-style" ${!s.hasTable ? 'disabled' : ''}>🎨 Table Style</button>
              </div>
              <div class="ribbon-group-label">Tables</div>
            </div>

            <!-- Illustrations -->
            <div class="ribbon-group">
              <div class="ribbon-group-row">
                <button type="button" class="ribbon-btn ${s.hasFigure ? 'active' : ''}" id="tool-insert-picture">🖼️ Pictures (Placeholder)</button>
              </div>
              <div class="ribbon-group-label">Illustrations</div>
            </div>

            <!-- Header & Footer -->
            <div class="ribbon-group">
              <div class="ribbon-group-row">
                <button type="button" class="ribbon-btn ${s.activeZone === 'header' ? 'active' : ''}" id="tool-edit-header">Header</button>
                <button type="button" class="ribbon-btn ${s.activeZone === 'footer' ? 'active' : ''}" id="tool-edit-footer">Footer (9 pt)</button>
                <button type="button" class="ribbon-btn ${s.hasPageNumber ? 'active' : ''}" id="tool-insert-page-number" aria-pressed="${s.hasPageNumber ? 'true' : 'false'}"># Page Number</button>
              </div>
              <div class="ribbon-group-row">
                <button type="button" class="ribbon-btn" id="tool-page-num-format">Format Numbers...</button>
                <button type="button" class="ribbon-btn ${!s.linkToPrevious.footer ? 'active' : ''}" id="tool-link-to-previous" title="Unlink section footer">🔗 Link to Previous</button>
                <button type="button" class="ribbon-btn" id="tool-different-first-page">Different First Page</button>
                <button type="button" class="ribbon-btn" id="tool-close-header-footer">✕ Close</button>
              </div>
              <div class="ribbon-group-label">Header & Footer</div>
            </div>

            <!-- Symbols & Equations -->
            <div class="ribbon-group">
              <div class="ribbon-group-row">
                <button type="button" class="ribbon-btn ${s.hasEquation ? 'active' : ''}" id="tool-insert-equation">π Equation (Alt+=)</button>
                <button type="button" class="ribbon-btn" id="tool-number-equation" ${!s.hasEquation ? 'disabled' : ''}>(1) Number Eqn</button>
              </div>
              <div class="ribbon-group-label">Symbols</div>
            </div>
          `;

        case 'layout':
          return `
            <!-- Page Setup Group -->
            <div class="ribbon-group">
              <div class="ribbon-group-row">
                <select class="ribbon-select" id="tool-layout-margins" title="Document Margins" aria-label="Document margins">
                  <option value="normal" ${s.margins.type === 'normal' ? 'selected' : ''}>Margins: Normal (2.5 cm all sides)</option>
                  <option value="bound" ${s.margins.type === 'bound' ? 'selected' : ''}>Margins: Bound (3.5 cm left, 1.5 cm others)</option>
                  <option value="narrow" ${s.margins.type === 'narrow' ? 'selected' : ''}>Margins: Narrow (1.5 cm all sides)</option>
                  <option value="wide" ${s.margins.type === 'wide' ? 'selected' : ''}>Margins: Wide (5 cm left/right)</option>
                  <option value="custom" ${s.margins.type === 'custom' ? 'selected' : ''}>Margins: Custom Margins...</option>
                </select>
                <select class="ribbon-select select-narrow" id="tool-layout-orientation" title="Orientation" aria-label="Page orientation">
                  <option value="portrait" ${s.orientation === 'portrait' ? 'selected' : ''}>Portrait</option>
                  <option value="landscape" ${s.orientation === 'landscape' ? 'selected' : ''}>Landscape</option>
                </select>
              </div>
              <div class="ribbon-group-row">
                <select class="ribbon-select select-narrow" id="tool-layout-size" title="Paper Size" aria-label="Paper size">
                  <option value="A4" ${s.paperSize === 'A4' ? 'selected' : ''}>A4 (210 × 297 mm)</option>
                  <option value="Letter" ${s.paperSize === 'Letter' ? 'selected' : ''}>US Letter (8.5 × 11 in)</option>
                </select>
                <select class="ribbon-select" id="tool-layout-breaks" title="Section Breaks" aria-label="Section break type"><option value="next-page">Section Break: Next Page</option><option value="continuous">Section Break: Continuous</option></select>
              </div>
              <div class="ribbon-group-label">Page Setup</div>
            </div>

            <!-- Paragraph Layout -->
            <div class="ribbon-group">
              <div class="ribbon-group-row">
                <label style="font-size:0.75rem; display:flex; align-items:center; gap:0.25rem;">
                  Before: <input type="number" id="dialog-spacing-before" aria-label="Paragraph spacing before in points" value="${s.paragraphSpacing.before}" style="width:45px;" /> pt
                </label>
                <label style="font-size:0.75rem; display:flex; align-items:center; gap:0.25rem;">
                  After: <input type="number" id="dialog-spacing-after" aria-label="Paragraph spacing after in points" value="${s.paragraphSpacing.after}" style="width:45px;" /> pt
                </label>
                <button type="button" class="ribbon-btn ${s.keepWithNext ? 'active' : ''}" id="tool-keep-with-next">Keep with next</button>
              </div>
              <div class="ribbon-group-label">Paragraph Spacing</div>
            </div>
          `;

        case 'references':
          return `
            <!-- Table of Contents -->
            <div class="ribbon-group">
              <div class="ribbon-group-row">
                <button type="button" class="ribbon-btn ${s.hasTOC ? 'active' : ''}" id="tool-insert-toc">📑 Table of Contents</button>
                <button type="button" class="ribbon-btn" id="tool-update-toc">🔄 Update TOC</button>
              </div>
              <div class="ribbon-group-label">Table of Contents</div>
            </div>

            <!-- Captions -->
            <div class="ribbon-group">
              <div class="ribbon-group-row">
                <button type="button" class="ribbon-btn" id="tool-insert-caption">🏷️ Insert Caption</button>
                <button type="button" class="ribbon-btn ${s.hasListOfFigures ? 'active' : ''}" id="tool-insert-list-figures">List of Figures</button>
                <button type="button" class="ribbon-btn ${s.hasListOfTables ? 'active' : ''}" id="tool-insert-list-tables">List of Tables</button>
              </div>
              <div class="ribbon-group-row">
                <button type="button" class="ribbon-btn" id="tool-update-lists">Update Lists</button>
                <button type="button" class="ribbon-btn" id="tool-cross-reference">🔗 Cross-reference</button>
              </div>
              <div class="ribbon-group-label">Captions & Lists</div>
            </div>

            <!-- Citations & Bibliography -->
            <div class="ribbon-group">
              <div class="ribbon-group-row">
                <select class="ribbon-select select-narrow" id="tool-citation-style">
                  <option value="IEEE" ${s.citationStyle === 'IEEE' ? 'selected' : ''}>Style: IEEE [1]</option>
                  <option value="APA" ${s.citationStyle === 'APA' ? 'selected' : ''}>Style: APA</option>
                  <option value="Harvard" ${s.citationStyle === 'Harvard' ? 'selected' : ''}>Style: Harvard</option>
                </select>
                <button type="button" class="ribbon-btn" id="tool-add-source">+ Add Source</button>
                <button type="button" class="ribbon-btn" id="tool-insert-citation">Cite [1]</button>
                <button type="button" class="ribbon-btn ${s.hasBibliography ? 'active' : ''}" id="tool-insert-bibliography">Bibliography</button>
              </div>
              <div class="ribbon-group-label">Citations & Bibliography</div>
            </div>
          `;

        case 'view':
          return `
            <!-- Document Views -->
            <div class="ribbon-group">
              <div class="ribbon-group-row">
                <button type="button" class="ribbon-btn ${s.navigationPaneOpen ? 'active' : ''}" id="tool-navigation-pane">☑ Navigation Pane</button>
                <button type="button" class="ribbon-btn ${s.showFormattingMarks ? 'active' : ''}" id="tool-formatting-marks">¶ Formatting Marks</button>
                <button type="button" class="ribbon-btn" id="tool-themes-palette">🎨 Themes / Palette</button>
              </div>
              <div class="ribbon-group-label">Show & Aesthetics</div>
            </div>

            <!-- Zoom -->
            <div class="ribbon-group">
              <div class="ribbon-group-row">
                <button type="button" class="ribbon-btn ${s.zoom === 75 ? 'active' : ''}" id="btn-zoom-75">75%</button>
                <button type="button" class="ribbon-btn ${s.zoom === 100 ? 'active' : ''}" id="btn-zoom-100">100%</button>
                <button type="button" class="ribbon-btn ${s.zoom === 125 ? 'active' : ''}" id="btn-zoom-125">125%</button>
                <button type="button" class="ribbon-btn ${s.zoom === 150 ? 'active' : ''}" id="btn-zoom-150">150%</button>
              </div>
              <div class="ribbon-group-label">Zoom</div>
            </div>
          `;

        default:
          return '';
      }
    },

    getPageStyles: function () {
      const s = this.state;
      const margin = s.margins || {};
      const px = (value) => `${Math.max(0, Number(value) || 0) * 10}px`;
      const left = (Number(margin.left) || 2.5) + (Number(margin.gutter) || 0);
      const portraitWidth = s.paperSize === 'Letter' ? 660 : 640;
      const portraitHeight = s.paperSize === 'Letter' ? 850 : 900;
      const width = s.orientation === 'landscape' ? portraitHeight : portraitWidth;
      const height = s.orientation === 'landscape' ? portraitWidth : portraitHeight;
      return `width:${width}px; min-height:${height}px; padding-left:${px(left)}; padding-right:${px(margin.right)}; padding-top:${px(margin.top)}; padding-bottom:${px(margin.bottom)};`;
    },

    getBodyStyles: function () {
      const s = this.state;
      return `
        font-family: "${s.fontFamily}", serif;
        font-size: ${s.fontSize}pt;
        text-align: ${s.alignment};
        line-height: ${s.lineSpacing};
        font-weight: ${s.bold ? 'bold' : 'normal'};
        font-style: ${s.italic ? 'italic' : 'normal'};
        text-decoration: ${s.underline ? 'underline' : 'none'};
        color: ${s.textColor};
        ${s.firstLineIndent ? 'text-indent: 1.27cm;' : ''}
      `;
    },

    updateTypographyPreview: function () {
      const s = this.state;
      const body = document.getElementById('word-page-body');
      const footer = document.getElementById('word-footer-content');
      const table = document.querySelector('#word-page-body .word-table');
      const tableCaption = document.querySelector('#word-page-body .table-caption');
      const figureCaption = document.querySelector('#word-page-body .figure-caption');

      if (body) {
        body.style.fontFamily = `"${s.fontFamily}", serif`;
        body.style.fontSize = `${s.fontSize}pt`;
      }
      document.querySelectorAll('#word-page-body .word-p').forEach(paragraph => {
        paragraph.style.fontFamily = `"${s.fontFamily}", serif`;
        paragraph.style.fontSize = `${s.fontSize}pt`;
      });
      if (footer) footer.style.fontSize = `${s.footerFontSize}pt`;
      if (table) table.style.fontSize = `${s.tableFontSize}pt`;
      if (tableCaption) tableCaption.style.fontSize = `${s.tableCaptionSize}pt`;
      if (figureCaption) figureCaption.style.fontSize = `${s.figureCaptionSize}pt`;
    },

    updateTextColorPreview: function () {
      const s = this.state;
      const body = document.getElementById('word-page-body');
      const paragraphs = document.querySelectorAll('#word-page-body .word-p');
      const colorPicker = document.getElementById('tool-text-color');
      const selection = window.getSelection();
      const selectedText = selection && !selection.isCollapsed && body && body.contains(selection.anchorNode);

      if (colorPicker) colorPicker.value = s.textColor;
      if (selectedText) {
        document.execCommand('foreColor', false, s.textColor);
      } else {
        if (body) body.style.color = s.textColor;
        paragraphs.forEach(paragraph => { paragraph.style.color = s.textColor; });
      }
    },

    renderDocumentBodyHtml: function () {
      const s = this.state;

      let html = '';

      // Cover Page
      if (s.hasCoverPage) {
        html += `
          <div class="word-cover-page-block">
            <div class="cover-accent-bar"></div>
            <h1 class="cover-field-title" contenteditable="true" id="cover-title-input">${escapeHtml(s.coverTitle)}</h1>
            <p class="cover-field-sub">ELE123 / ELE114 Technical Report Assessment</p>
            <div class="cover-field-meta">
              <div><strong>Author:</strong> <span contenteditable="true" id="cover-author-input">${escapeHtml(s.coverAuthor)}</span></div>
              <div><strong>Institution:</strong> Benha University · Faculty of Engineering at Shoubra</div>
              <div><strong>Instructor:</strong> Dr. Christina Gamal</div>
              <div><strong>Date:</strong> <span>${escapeHtml(s.coverDate)}</span></div>
            </div>
            <div class="cover-page-separator"><span>--- Page Break (Section 1 Front Matter) ---</span></div>
          </div>
        `;
      }

      if (s.hasPageBreak) {
        html += '<div class="word-page-break-marker" contenteditable="false">— Page Break —</div>';
      }

      // Table of Contents
      if (s.hasTOC) {
        const h1 = s.multilevelNumbering ? '1.0 Introduction' : 'Introduction';
        const h2 = s.multilevelNumbering ? '1.1 Problem Statement & Objectives' : 'Problem Statement & Objectives';
        const h3 = s.heading3Applied ? '1.1.1 Measurement procedure' : 'Measurement procedure';
        html += `
          <div class="word-toc-block" id="word-toc-block">
            <h2 class="toc-title">Table of Contents</h2>
            <div class="toc-entries">
              <div class="toc-entry"><span class="toc-label">${escapeHtml(h1)}</span><span class="toc-dots">...........................................................................</span><span class="toc-page">1</span></div>
              <div class="toc-entry indent-1"><span class="toc-label">${escapeHtml(h2)}</span><span class="toc-dots">...................................................................</span><span class="toc-page">1</span></div>
              <div class="toc-entry indent-2"><span class="toc-label">${escapeHtml(h3)}</span><span class="toc-dots">...................................................................</span><span class="toc-page">2</span></div>
              <div class="toc-entry"><span class="toc-label">References</span><span class="toc-dots">..........................................................................................</span><span class="toc-page">3</span></div>
            </div>
          </div>
        `;
      }

      // List of Figures
      if (s.hasListOfFigures) {
        html += `
          <div class="word-toc-block">
            <h3 class="toc-title">List of Figures</h3>
            <div class="toc-entries">
              <div class="toc-entry"><span class="toc-label">Figure 1: Schematic diagram of experimental test circuit</span><span class="toc-dots">.......................</span><span class="toc-page">2</span></div>
            </div>
          </div>
        `;
      }

      // List of Tables
      if (s.hasListOfTables) {
        html += `
          <div class="word-toc-block">
            <h3 class="toc-title">List of Tables</h3>
            <div class="toc-entries">
              <div class="toc-entry"><span class="toc-label">Table 1: Measured experimental electrical values</span><span class="toc-dots">..............................</span><span class="toc-page">3</span></div>
            </div>
          </div>
        `;
      }

      // Main Heading 1
      html += `
        <h1 class="word-h1 ${s.heading1Applied ? 'styled-h1' : ''}" style="font-size:${s.heading1Size}pt; font-weight:${s.heading1Bold ? 'bold' : 'normal'}; margin-top:12pt; margin-bottom:6pt;">
          ${s.multilevelNumbering ? '1.0 ' : ''}Introduction
        </h1>
        <p class="word-p" id="word-body-paragraph-1" style="margin-bottom:${s.paragraphSpacing.after}pt; margin-top:${s.paragraphSpacing.before}pt;">
          ${escapeHtml(s.bodyText || 'Engineering technical reports communicate design methodologies, experimental results, and analytical conclusions in a standardized format. Formatting rigor ensures reader clarity, reproducibility, and professional compliance with department guidelines.')}
        </p>
      `;

      // Subsection Heading 2
      html += `
        <h2 class="word-h2 ${s.heading2Applied ? 'styled-h2' : ''}" style="font-size:${s.heading2Size}pt; font-weight:${s.heading2Bold ? 'bold' : 'normal'}; margin-top:10pt; margin-bottom:4pt;">
          ${s.multilevelNumbering ? '1.1 ' : ''}Problem Statement & Objectives
        </h2>
        <p class="word-p" style="margin-bottom:${s.paragraphSpacing.after}pt; margin-top:${s.paragraphSpacing.before}pt;">
          All physical parameters must be reported with their associated measurement uncertainties, consistent units, and descriptive legends. As demonstrated in technical literature, standard equations must follow consecutive parenthetical numbering ${s.hasInTextCitation ? ' [1]' : ''}.
        </p>
      `;

      html += `
        <h3 class="word-h3" style="font-size:${s.heading3Size}pt; font-weight:${s.heading3Bold ? 'bold' : 'normal'}; margin-top:8pt; margin-bottom:4pt;">
          ${s.heading3Applied ? '1.1.1 ' : ''}Measurement procedure
        </h3>
      `;

      if (s.hasBullets) {
        html += '<ul class="word-demo-list"><li>Use consistent units for each measurement.</li><li>Report uncertainty with measured values.</li></ul>';
      }
      if (s.hasNumbering) {
        html += '<ol class="word-demo-list"><li>Record the measurement.</li><li>Calculate the result.</li></ol>';
      }

      // Mathematical Equation
      if (s.hasEquation) {
        html += `
          <div class="word-equation-box ${s.equationCentered ? 'centered' : ''}" style="margin: 12pt 0; text-align: ${s.equationCentered ? 'center' : 'left'};">
            <span class="equation-math" contenteditable="true" id="word-equation-math" style="font-style:italic; font-family:'Cambria Math', Times, serif;">
              ${escapeHtml(s.equationText || 'V_T = (k · T) / q · ln(I / I_s)')}
            </span>
            ${s.equationNumbered ? '<span class="equation-num" style="float:right; font-weight:700;">(1)</span>' : ''}
            <div style="clear:both;"></div>
          </div>
        `;
      }

      // Table (with caption ABOVE)
      if (s.hasTable) {
        const headers = ['Parameter', 'Symbol', 'Nominal Value', 'Tolerance', 'Notes', 'Unit', 'Result', 'Status'];
        const sampleRows = [
          ['Series Resistance', 'Rₛ', '100.0', '± 1.0%', '—', 'Ω', '100.2', 'Measured'],
          ['Shunt Resistance', 'Rₛₕ', '1.5', '± 5.0%', 'Stable', 'kΩ', '1.48', 'Measured'],
          ['Leakage Current', 'Iₗₑₐₖ', '—', 'Negligible', 'Not recorded', 'µA', '—', 'N/A'],
          ['Output Voltage', 'Vₒ', '12.0', '± 0.2%', 'Nominal', 'V', '11.98', 'Pass']
        ];
        const columnCount = Math.max(1, Math.min(8, s.tableCols || 4));
        const bodyRowCount = Math.max(0, Math.min(11, (s.tableRows || 4) - 1));
        const tableHeaderHtml = Array.from({ length: columnCount }, (_, column) => `<th contenteditable="true" style="border:1px solid #94a3b8; padding:6px 10px;">${headers[column]}</th>`).join('');
        const tableBodyHtml = Array.from({ length: bodyRowCount }, (_, row) => `<tr>${Array.from({ length: columnCount }, (_, column) => `<td contenteditable="true" style="border:1px solid #cbd5e1; padding:5px 10px;">${sampleRows[row % sampleRows.length][column]}</td>`).join('')}</tr>`).join('');
        html += `
          <div class="word-table-wrapper ${s.tableCentered ? 'centered' : ''}" style="margin: 12pt 0; text-align: ${s.tableCentered ? 'center' : 'left'};">
            ${s.hasTableCaption ? `
              <div class="table-caption ${s.tableCaptionBold ? 'caption-bold' : ''}" style="font-size:${s.tableCaptionSize}pt; margin-bottom:4px; text-align:left;">
                <strong>Table 1:</strong> Measured Electrical Component Parameters
              </div>
            ` : ''}
            <table class="word-table ${s.tableHeaderShaded ? 'header-shaded' : ''}" style="font-size:${s.tableFontSize}pt; margin: 0 auto; width: 95%; border-collapse: collapse;">
              <thead>
                <tr>${tableHeaderHtml}</tr>
              </thead>
              <tbody>${tableBodyHtml}</tbody>
            </table>
          </div>
        `;
      }

      // Figure (with caption BELOW)
      if (s.hasFigure) {
        html += `
          <div class="word-figure-wrapper ${s.figureCentered ? 'centered' : ''}" style="margin: 14pt 0; text-align: ${s.figureCentered ? 'center' : 'left'};">
            <div class="figure-placeholder-box" style="width: 85%; max-width: 480px; height: 160px; margin: 0 auto; background: #f8fafc; border: 2px dashed #94a3b8; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 4px;">
              <span style="font-size: 2rem;">📐</span>
              <span style="font-size: 0.85rem; font-weight: 600; color: #475569;">Technical Circuit Schematic</span>
              <span style="font-size: 0.72rem; color: #94a3b8;">High-resolution vector graphic (PNG / SVG)</span>
            </div>
            ${s.hasFigureCaption ? `
              <div class="figure-caption ${s.figureCaptionBold ? 'caption-bold' : ''}" style="font-size:${s.figureCaptionSize}pt; margin-top:6px; text-align:center;">
                <strong>Figure 1:</strong> Experimental measurement circuit configuration for solar cell characterization.
              </div>
            ` : ''}
          </div>
        `;
      }

      // References Section
      if (s.hasBibliography) {
        html += `
          <div class="word-references-block" style="margin-top: 20pt; border-top: 1px solid #e2e8f0; padding-top: 10pt;">
            <h2 class="word-h1" style="font-size:16pt; font-weight:bold; margin-bottom:8pt;">References</h2>
            <div class="reference-item" style="font-size:10pt; line-height:1.4; margin-bottom:6pt;">
              [1] C. Gamal, <em>Technical Report Writing for Engineering Students</em>, Benha University Press, 2026, pp. 12–45.
            </div>
            <div class="reference-item" style="font-size:10pt; line-height:1.4; margin-bottom:6pt;">
              [2] IEEE Standards Association, "IEEE Editorial Style Manual for Authors," IEEE Transactions, vol. 14, no. 2, 2024.
            </div>
          </div>
        `;
      }

      return html;
    },

    bindRibbonEvents: function () {
      const s = this.state;

      // Ribbon tab switching
      document.querySelectorAll('.ribbon-tab-btn').forEach(btn => {
        btn.onclick = (e) => {
          const tab = e.currentTarget.getAttribute('data-tab');
          if (tab && tab !== s.activeTab) {
            s.activeTab = tab;
            const toolbar = document.getElementById('word-ribbon-toolbar');
            if (toolbar) {
              document.querySelectorAll('.ribbon-tab-btn').forEach(b => {
                const isCurrent = b.getAttribute('data-tab') === tab;
                b.classList.toggle('active', isCurrent);
                b.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
                b.tabIndex = isCurrent ? 0 : -1;
              });
              const toolbarScrollLeft = toolbar.scrollLeft;
              toolbar.innerHTML = this.renderActiveRibbonTab();
              toolbar.scrollLeft = toolbarScrollLeft;
              this.bindRibbonEvents();
            } else {
              this.render();
            }
            this.saveSnapshot();
            PlaygroundManager.checkCurrentTask(false);
          }
        };
      });
      const ribbonTabs = document.querySelector('.word-ribbon-tabs');
      if (ribbonTabs) {
        ribbonTabs.onkeydown = event => {
          const tabs = Array.from(ribbonTabs.querySelectorAll('[role="tab"]'));
          const current = tabs.indexOf(event.target);
          if (current < 0 || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
          const targetTab = tabs[next].dataset.tab;
          s.activeTab = targetTab;
          const toolbar = document.getElementById('word-ribbon-toolbar');
          if (toolbar) {
            document.querySelectorAll('.ribbon-tab-btn').forEach(b => {
              const isCurrent = b.getAttribute('data-tab') === targetTab;
              b.classList.toggle('active', isCurrent);
              b.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
              b.tabIndex = isCurrent ? 0 : -1;
            });
            const toolbarScrollLeft = toolbar.scrollLeft;
            toolbar.innerHTML = this.renderActiveRibbonTab();
            toolbar.scrollLeft = toolbarScrollLeft;
            this.bindRibbonEvents();
          } else {
            this.render();
          }
          this.saveSnapshot();
          document.getElementById(`ribbon-tab-${targetTab}`)?.focus();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Quick Undo & Redo
      const undoBtn = document.getElementById('tool-undo');
      const redoBtn = document.getElementById('tool-redo');
      if (undoBtn) undoBtn.onclick = () => this.undo();
      if (redoBtn) redoBtn.onclick = () => this.redo();

      // Font Family
      const fontSelect = document.getElementById('tool-font-family');
      if (fontSelect) {
        fontSelect.onchange = (e) => {
          s.fontFamily = e.target.value;
          this.updateTypographyPreview();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Font Size
      const sizeSelect = document.getElementById('tool-font-size');
      if (sizeSelect) {
        sizeSelect.onchange = (e) => {
          s.fontSize = parseInt(e.target.value, 10);
          if (s.activeZone === 'footer') s.footerFontSize = s.fontSize;
          if (s.hasTable) s.tableFontSize = s.fontSize;
          if (s.hasTableCaption) s.tableCaptionSize = s.fontSize;
          if (s.hasFigureCaption) s.figureCaptionSize = s.fontSize;
          this.updateTypographyPreview();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Formatting toggles
      const boldBtn = document.getElementById('tool-bold');
      if (boldBtn) {
        boldBtn.onclick = () => {
          const sel = window.getSelection();
          const bodyEl = document.getElementById('word-page-body');
          if (sel && !sel.isCollapsed && bodyEl && bodyEl.contains(sel.anchorNode)) {
            document.execCommand('bold', false, null);
            this.saveSnapshot();
            PlaygroundManager.checkCurrentTask(false);
            return;
          }
          s.bold = !s.bold;
          if (s.hasTableCaption) s.tableCaptionBold = s.bold;
          if (s.hasFigureCaption) s.figureCaptionBold = s.bold;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const italicBtn = document.getElementById('tool-italic');
      if (italicBtn) {
        italicBtn.onclick = () => {
          const sel = window.getSelection();
          const bodyEl = document.getElementById('word-page-body');
          if (sel && !sel.isCollapsed && bodyEl && bodyEl.contains(sel.anchorNode)) {
            document.execCommand('italic', false, null);
            this.saveSnapshot();
            PlaygroundManager.checkCurrentTask(false);
            return;
          }
          s.italic = !s.italic;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const underlineBtn = document.getElementById('tool-underline');
      if (underlineBtn) {
        underlineBtn.onclick = () => {
          const sel = window.getSelection();
          const bodyEl = document.getElementById('word-page-body');
          if (sel && !sel.isCollapsed && bodyEl && bodyEl.contains(sel.anchorNode)) {
            document.execCommand('underline', false, null);
            this.saveSnapshot();
            PlaygroundManager.checkCurrentTask(false);
            return;
          }
          s.underline = !s.underline;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Text Color
      const colorInput = document.getElementById('tool-text-color');
      if (colorInput) {
        colorInput.oninput = (e) => {
          s.textColor = e.target.value;
          this.updateTextColorPreview();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Select All
      const selectAllBtn = document.getElementById('tool-select-all');
      if (selectAllBtn) {
        selectAllBtn.onclick = () => {
          s.allSelected = true;
          s.textSelected = true;
          const bodyEl = document.getElementById('word-page-body');
          if (bodyEl) {
            const range = document.createRange();
            range.selectNodeContents(bodyEl);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          }
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Alignment buttons
      ['left', 'center', 'right', 'justify'].forEach(align => {
        const btn = document.getElementById(`tool-align-${align}`);
        if (btn) {
          btn.onclick = () => {
            s.alignment = align;
            if (align === 'center') {
              s.figureCentered = true;
              s.tableCentered = true;
              s.elementCentered = true;
            }
            this.render();
            this.saveSnapshot();
            PlaygroundManager.checkCurrentTask(false);
          };
        }
      });

      // Bullets
      const bulletsBtn = document.getElementById('tool-bullets');

            const numberingBtn = document.getElementById('tool-numbering');
            if (numberingBtn) {
              numberingBtn.onclick = () => {
                s.hasNumbering = !s.hasNumbering;
                this.render();
                this.saveSnapshot();
                PlaygroundManager.checkCurrentTask(false);
              };
            }
      if (bulletsBtn) {
        bulletsBtn.onclick = () => {
          s.hasBullets = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Multilevel list
      const multiBtn = document.getElementById('tool-multilevel-list');
      if (multiBtn) {
        multiBtn.onclick = () => {
          s.multilevelNumbering = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Line Spacing
      const lineSpacingSelect = document.getElementById('tool-line-spacing');
      if (lineSpacingSelect) {
        lineSpacingSelect.onchange = (e) => {
          s.lineSpacing = parseFloat(e.target.value);
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // First-line Indent
      const indentBtn = document.getElementById('tool-first-line-indent');
      if (indentBtn) {
        indentBtn.onclick = () => {
          s.firstLineIndent = !s.firstLineIndent;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Styles
      const styleHeading1 = document.getElementById('style-heading1');
      if (styleHeading1) {
        styleHeading1.onclick = () => {
          s.heading1Applied = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const styleHeading2 = document.getElementById('style-heading2');
      if (styleHeading2) {
        styleHeading2.onclick = () => {
          s.heading2Applied = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const styleHeading3 = document.getElementById('style-heading3');
      if (styleHeading3) {
        styleHeading3.onclick = () => {
          s.heading3Applied = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const normalStyleBtn = document.getElementById('style-normal');
      if (normalStyleBtn) {
        normalStyleBtn.onclick = () => {
          s.heading1Applied = false;
          s.heading2Applied = false;
          s.heading3Applied = false;
          s.fontFamily = 'Times New Roman';
          s.fontSize = 12;
          s.bold = false;
          s.italic = false;
          s.underline = false;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      [['heading1', 'heading1Size'], ['heading2', 'heading2Size'], ['heading3', 'heading3Size']].forEach(([heading, sizeKey]) => {
        const select = document.getElementById(`tool-${heading}-size`);
        if (select) {
          select.onchange = (e) => {
            s[sizeKey] = parseInt(e.target.value, 10);
            this.render();
            this.saveSnapshot();
            PlaygroundManager.checkCurrentTask(false);
          };
        }
      });

      const stylesPaneBtn = document.getElementById('tool-styles-pane');
      if (stylesPaneBtn) {
        stylesPaneBtn.onclick = () => {
          s.stylesPaneOpen = true;
          s.styleBasedOnNone = true;
          s.customStyleCreated = true;
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
          alert('Styles Task Pane Opened: Heading 1 (16 pt bold), Heading 2 (14 pt bold). Custom styles configured with (no style) parent.');
        };
      }

      // Layout Margins
      const marginsSelect = document.getElementById('tool-layout-margins');
      if (marginsSelect) {
        marginsSelect.onchange = (e) => {
          const type = e.target.value;
          s.margins.type = type;
          if (type === 'bound') {
            s.margins.left = 3.5;
            s.margins.top = 1.5;
            s.margins.bottom = 1.5;
            s.margins.right = 1.5;
            s.margins.gutter = 0.5;
          } else if (type === 'narrow') {
            s.margins.left = 1.5;
            s.margins.top = 1.5;
            s.margins.bottom = 1.5;
            s.margins.right = 1.5;
            s.margins.gutter = 0;
          } else if (type === 'wide') {
            s.margins.left = 5;
            s.margins.right = 5;
            s.margins.top = 2.5;
            s.margins.bottom = 2.5;
            s.margins.gutter = 0;
          } else if (type === 'custom') {
            const values = prompt('Custom margins in cm: left, top, right, bottom', `${s.margins.left}, ${s.margins.top}, ${s.margins.right}, ${s.margins.bottom}`);
            if (values !== null) {
              const parsed = values.split(',').map(value => Number(value.trim()));
              if (parsed.length === 4 && parsed.every(value => Number.isFinite(value) && value >= 0)) {
                [s.margins.left, s.margins.top, s.margins.right, s.margins.bottom] = parsed;
                s.margins.gutter = Number(prompt('Binding gutter in cm (0 if none)', String(s.margins.gutter || 0))) || 0;
              }
            }
          } else {
            s.margins.left = 2.5;
            s.margins.top = 2.5;
            s.margins.bottom = 2.5;
            s.margins.right = 2.5;
            s.margins.gutter = 0;
          }
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Paper Size
      const sizePaperSelect = document.getElementById('tool-layout-size');
      if (sizePaperSelect) {
        sizePaperSelect.onchange = (e) => {
          s.paperSize = e.target.value;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Orientation
      const orientSelect = document.getElementById('tool-layout-orientation');
      if (orientSelect) {
        orientSelect.onchange = (e) => {
          s.orientation = e.target.value;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Section Breaks
      const breaksBtn = document.getElementById('tool-layout-breaks');
      if (breaksBtn) {
        breaksBtn.onchange = () => {
          s.sectionsCount++;
          s.activeSection = s.sectionsCount;
          s.hasSectionBreak = true;
          s.sectionBreakType = breaksBtn.value;
          s.linkToPrevious.footer = false;
          s.section2PageFormat = 'arabic';
          s.section2StartAt = 1;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Paragraph dialog launcher
      const paraDialogBtn = document.getElementById('tool-paragraph-dialog');
      if (paraDialogBtn) {
        paraDialogBtn.onclick = () => {
          s.paragraphDialogOpen = true;
          const afterVal = prompt('Paragraph Dialog Launcher > Indents and Spacing\nSet Spacing After (pt):', s.paragraphSpacing.after);
          if (afterVal !== null) {
            s.paragraphSpacing.after = parseInt(afterVal, 10) || 6;
          }
          const beforeVal = prompt('Set Spacing Before (pt):', s.paragraphSpacing.before);
          if (beforeVal !== null) {
            s.paragraphSpacing.before = parseInt(beforeVal, 10) || 12;
          }
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Spacing Before / After inline inputs
      const beforeInp = document.getElementById('dialog-spacing-before');
      if (beforeInp) {
        beforeInp.onchange = (e) => {
          s.paragraphSpacing.before = parseInt(e.target.value, 10) || 0;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const afterInp = document.getElementById('dialog-spacing-after');
      if (afterInp) {
        afterInp.onchange = (e) => {
          s.paragraphSpacing.after = parseInt(e.target.value, 10) || 0;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Keep with next
      const keepBtn = document.getElementById('tool-keep-with-next');
      if (keepBtn) {
        keepBtn.onclick = () => {
          s.keepWithNext = !s.keepWithNext;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Insert Cover Page
      const coverBtn = document.getElementById('tool-insert-cover-page');
      if (coverBtn) {
        coverBtn.onclick = () => {
          s.coverPageGalleryOpen = true;
          s.hasCoverPage = true;
          s.differentFirstPage = true;
          s.coverPageHasNumber = false;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Insert Table
      const tableBtn = document.getElementById('tool-insert-table');
      if (tableBtn) {
        tableBtn.onclick = () => {
          s.hasTable = true;
          s.tableRows = Math.max(1, Math.min(12, parseInt(document.getElementById('tool-table-rows')?.value, 10) || 4));
          s.tableCols = Math.max(1, Math.min(8, parseInt(document.getElementById('tool-table-cols')?.value, 10) || 4));
          s.tableFontSize = 10;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Table style
      const tableStyleBtn = document.getElementById('tool-table-style');
      if (tableStyleBtn) {
        tableStyleBtn.onclick = () => {
          s.tableHeaderShaded = true;
          s.tableStyled = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Insert Picture
      const picBtn = document.getElementById('tool-insert-picture');

            const pageBreakBtn = document.getElementById('tool-insert-page-break');
            if (pageBreakBtn) {
              pageBreakBtn.onclick = () => {
                s.hasPageBreak = true;
                this.render();
                this.saveSnapshot();
                PlaygroundManager.checkCurrentTask(false);
              };
            }
      if (picBtn) {
        picBtn.onclick = () => {
          s.hasFigure = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Header & Footer tools
      const editHeaderBtn = document.getElementById('tool-edit-header');
      if (editHeaderBtn) {
        editHeaderBtn.onclick = () => {
          s.activeZone = 'header';
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const editFooterBtn = document.getElementById('tool-edit-footer');
      if (editFooterBtn) {
        editFooterBtn.onclick = () => {
          s.activeZone = 'footer';
          s.footerOpen = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const closeHfBtn = document.getElementById('tool-close-header-footer');
      if (closeHfBtn) {
        closeHfBtn.onclick = () => {
          s.activeZone = 'body';
          s.footerOpen = false;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const unlinkBtn = document.getElementById('tool-link-to-previous');
      if (unlinkBtn) {
        unlinkBtn.onclick = () => {
          s.linkToPrevious.footer = !s.linkToPrevious.footer;
          s.linkToPrevious.header = s.linkToPrevious.footer;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const diffFirstBtn = document.getElementById('tool-different-first-page');
      if (diffFirstBtn) {
        diffFirstBtn.onclick = () => {
          s.differentFirstPage = !s.differentFirstPage;
          s.coverPageHasNumber = !s.differentFirstPage;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Page numbering format
      const pageNumFmtBtn = document.getElementById('tool-page-num-format');
      if (pageNumFmtBtn) {
        pageNumFmtBtn.onclick = () => {
          const choice = prompt('Format Page Numbers:\n1. Roman numerals (i, ii, iii...)\n2. Arabic numerals (1, 2, 3...) - Start at 1\nEnter 1 or 2:', s.pageNumbering.format === 'roman' ? '1' : '2');
          if (choice === '1') {
            s.pageNumbering.format = 'roman';
          } else if (choice === '2') {
            s.section2PageFormat = 'arabic';
            s.section2StartAt = 1;
          }
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Equation
      const eqBtn = document.getElementById('tool-insert-equation');
      if (eqBtn) {
        eqBtn.onclick = () => {
          s.hasEquation = true;
          s.equationHasVariables = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const eqNumBtn = document.getElementById('tool-number-equation');
      if (eqNumBtn) {
        eqNumBtn.onclick = () => {
          s.equationNumbered = true;
          s.equationCentered = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // References: TOC
      const tocBtn = document.getElementById('tool-insert-toc');
      if (tocBtn) {
        tocBtn.onclick = () => {
          s.hasTOC = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const tocUpdateBtn = document.getElementById('tool-update-toc');
      if (tocUpdateBtn) {
        tocUpdateBtn.onclick = () => {
          s.tocUpdated = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Insert Caption
      const captionBtn = document.getElementById('tool-insert-caption');
      if (captionBtn) {
        captionBtn.onclick = () => {
          s.captionDialogOpen = true;
          const labelChoice = prompt('Caption Dialog:\nChoose Label:\n1. Figure (Placed below selected item)\n2. Table (Placed above selected item)\nEnter 1 or 2:', s.hasTable && !s.hasFigure ? '2' : '1');
          if (labelChoice === '2') {
            s.hasTableCaption = true;
            s.tableCaptionPosition = 'above';
            s.tableCaptionBold = true;
            s.tableCaptionSize = 10;
          } else {
            s.hasFigureCaption = true;
            s.figureCaptionPosition = 'below';
            s.figureCaptionBold = true;
            s.figureCaptionSize = 10;
          }
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Lists of Figures & Tables
      const listFigBtn = document.getElementById('tool-insert-list-figures');
      if (listFigBtn) {
        listFigBtn.onclick = () => {
          s.hasListOfFigures = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const listTabBtn = document.getElementById('tool-insert-list-tables');
      if (listTabBtn) {
        listTabBtn.onclick = () => {
          s.hasListOfTables = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const updateListsBtn = document.getElementById('tool-update-lists');
      if (updateListsBtn) {
        updateListsBtn.onclick = () => {
          s.listsUpdated = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Cross reference
      const crossRefBtn = document.getElementById('tool-cross-reference');
      if (crossRefBtn) {
        crossRefBtn.onclick = () => {
          s.hasCrossReference = true;
          s.bodyText += ' as shown in Figure 1.';
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Citations
      const citeStyleSelect = document.getElementById('tool-citation-style');
      if (citeStyleSelect) {
        citeStyleSelect.onchange = (e) => {
          s.citationStyle = e.target.value;
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const addSourceBtn = document.getElementById('tool-add-source');
      if (addSourceBtn) {
        addSourceBtn.onclick = () => {
          s.sourceAdded = true;
          s.sourcesCount++;
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
          alert('New IEEE Source Added: [1] C. Gamal, "Technical Report Writing", Benha Univ, 2026.');
        };
      }

      const citeBtn = document.getElementById('tool-insert-citation');
      if (citeBtn) {
        citeBtn.onclick = () => {
          s.hasInTextCitation = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const bibBtn = document.getElementById('tool-insert-bibliography');
      if (bibBtn) {
        bibBtn.onclick = () => {
          s.hasBibliography = true;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // View tab: Navigation pane
      const navPaneBtn = document.getElementById('tool-navigation-pane');
      if (navPaneBtn) {
        navPaneBtn.onclick = () => {
          s.navigationPaneOpen = !s.navigationPaneOpen;
          this.render();
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // View tab: Formatting marks
      const marksBtn = document.getElementById('tool-formatting-marks');
      if (marksBtn) {
        marksBtn.onclick = () => {
          s.showFormattingMarks = !s.showFormattingMarks;
          const desk = document.getElementById('word-desk');
          if (desk) desk.classList.toggle('show-marks', s.showFormattingMarks);
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // View tab: Themes palette
      const themesBtn = document.getElementById('tool-themes-palette');
      if (themesBtn) {
        themesBtn.onclick = () => {
          s.themeApplied = true;
          s.colorPaletteChanged = true;
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
          alert('Document Theme & Color Palette Applied: Engineering Formal Blue palette.');
        };
      }

      // Zoom buttons
      [75, 100, 125, 150].forEach(z => {
        const btn = document.getElementById(`btn-zoom-${z}`);
        if (btn) {
          btn.onclick = () => {
            s.zoom = z;
            this.render();
            this.saveSnapshot();
          };
        }
      });

      const zoomIn = document.getElementById('btn-zoom-in');
      const zoomOut = document.getElementById('btn-zoom-out');
      if (zoomIn) {
        zoomIn.onclick = () => {
          if (s.zoom < 200) {
            s.zoom += 10;
            this.render();
            this.saveSnapshot();
          }
        };
      }
      if (zoomOut) {
        zoomOut.onclick = () => {
          if (s.zoom > 50) {
            s.zoom -= 10;
            this.render();
            this.saveSnapshot();
          }
        };
      }

      // Contenteditable edits
      const bodyEl = document.getElementById('word-page-body');
      if (bodyEl) {
        bodyEl.oninput = (event) => {
          const p1 = document.getElementById('word-body-paragraph-1');
          s.bodyText = p1 ? (p1.innerText || '') : (bodyEl.innerText || '');
          const selection = window.getSelection();
          let focusNode = selection && selection.anchorNode;
          if (focusNode && focusNode.nodeType === Node.TEXT_NODE) focusNode = focusNode.parentElement;
          const coverField = (event.target && event.target.closest && event.target.closest('#cover-title-input, #cover-author-input')) || (focusNode && focusNode.closest && focusNode.closest('#cover-title-input, #cover-author-input'));
          if (coverField && coverField.id === 'cover-title-input') s.coverTitle = coverField.innerText || '';
          if (coverField && coverField.id === 'cover-author-input') s.coverAuthor = coverField.innerText || '';
          const titleField = document.getElementById('cover-title-input');
          const authorField = document.getElementById('cover-author-input');
          if (titleField) s.coverTitle = titleField.innerText || '';
          if (authorField) s.coverAuthor = authorField.innerText || '';
          const count = document.getElementById('word-count-display');
          if (count) count.textContent = `${this.countWords()} words`;
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
        bodyEl.onkeydown = (event) => {
          if (!event.ctrlKey || event.altKey) return;
          const key = event.key.toLowerCase();
          if (key === 'z' || key === 'y') {
            event.preventDefault();
            if (key === 'z') this.undo();
            else this.redo();
            return;
          }
          if (key === 'a') {
            s.textSelected = true;
            s.allSelected = true;
            PlaygroundManager.checkCurrentTask(false);
            return;
          }
          const alignments = { l: 'left', e: 'center', r: 'right', j: 'justify' };
          if (alignments[key]) {
            event.preventDefault();
            s.alignment = alignments[key];
            if (s.alignment === 'center') {
              s.figureCentered = true;
              s.tableCentered = true;
            }
            this.render();
            this.saveSnapshot();
            PlaygroundManager.checkCurrentTask(false);
          } else if (key === 'b' || key === 'i' || key === 'u') {
            event.preventDefault();
            const property = key === 'b' ? 'bold' : key === 'i' ? 'italic' : 'underline';
            s[property] = !s[property];
            if (s.hasTableCaption && key === 'b') s.tableCaptionBold = s.bold;
            if (s.hasFigureCaption && key === 'b') s.figureCaptionBold = s.bold;
            this.render();
            this.saveSnapshot();
            PlaygroundManager.checkCurrentTask(false);
          }
        };
      }

      const headerEl = document.getElementById('word-header-content');
      if (headerEl) {
        headerEl.oninput = () => {
          s.headerText = headerEl.innerText || '';
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
        headerEl.onkeydown = event => {
          if (event.key === 'Escape') { event.preventDefault(); s.activeZone = 'body'; this.render(); this.saveSnapshot(); }
          else if (event.ctrlKey && event.key.toLowerCase() === 'z') { event.preventDefault(); this.undo(); }
          else if (event.ctrlKey && event.key.toLowerCase() === 'y') { event.preventDefault(); this.redo(); }
        };
      }

      const footerEl = document.getElementById('footer-text-display');
      if (footerEl) {
        footerEl.oninput = () => {
          s.footerText = footerEl.innerText || '';
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
        footerEl.onkeydown = event => {
          if (event.key === 'Escape') { event.preventDefault(); s.activeZone = 'body'; s.footerOpen = false; this.render(); this.saveSnapshot(); }
          else if (event.ctrlKey && event.key.toLowerCase() === 'z') { event.preventDefault(); this.undo(); }
          else if (event.ctrlKey && event.key.toLowerCase() === 'y') { event.preventDefault(); this.redo(); }
        };
      }

      // Cover title/author edits
      const titleInput = document.getElementById('cover-title-input');
      if (titleInput) {
        titleInput.oninput = () => {
          s.coverTitle = titleInput.innerText;
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      const authorInput = document.getElementById('cover-author-input');
      if (authorInput) {
        authorInput.oninput = () => {
          s.coverAuthor = authorInput.innerText;
          PlaygroundManager.checkCurrentTask(false);
        };
      }

      // Equation editing
      const eqMath = document.getElementById('word-equation-math');
      if (eqMath) {
        eqMath.oninput = () => {
          s.equationText = eqMath.innerText;
          this.saveSnapshot();
          PlaygroundManager.checkCurrentTask(false);
        };
      }
    },

    countWords: function () {
      const bodyEl = document.getElementById('word-page-body');
      const text = bodyEl ? (bodyEl.innerText || '') : (this.state.bodyText || '');
      const words = text.trim().split(/\s+/).filter(w => w.length > 0);
      return words.length;
    }
  };

  // Expose MiniWord globally
  window.MiniWord = MiniWord;


  // =========================================================================
  // 3. MINI EXCEL SIMULATOR (Phase 1 Container & Shell)
  // =========================================================================

  const MiniExcel = {
    mountPoint: null,
    defaultState: null,
    state: {
      activeCell: 'C2',
      cells: {},
      verified: false
    },

    mount: function (mountEl) {
      this.mountPoint = mountEl;
      if (!this.defaultState) this.defaultState = JSON.parse(JSON.stringify(this.state));
      this.render();
    },

    getState: function () {
      return Object.assign({}, this.state);
    },

    loadState: function (initialState) {
      this.state = Object.assign(JSON.parse(JSON.stringify(this.defaultState || this.state)), JSON.parse(JSON.stringify(initialState || {})));
      this.render();
    },

    render: function () {
      if (!this.mountPoint) return;

      this.mountPoint.innerHTML = `
        <div class="mini-excel-app" id="mini-excel-app">
          <!-- Excel Title & Ribbon Bar -->
          <div class="excel-title-bar">
            <span class="excel-logo-icon">X</span>
            <span class="doc-title-text">Lab_Data_Analysis.xlsx - Excel</span>
          </div>

          <div class="excel-ribbon-tabs">
            <button type="button" class="excel-tab-btn active">Home</button>
            <button type="button" class="excel-tab-btn">Insert</button>
            <button type="button" class="excel-tab-btn">Formulas</button>
            <button type="button" class="excel-tab-btn">Data</button>
          </div>

          <div class="excel-formula-bar-container">
            <div class="name-box">C2</div>
            <div class="formula-fx">fx</div>
            <input type="text" class="formula-input" id="excel-formula-input" value="=B2-A2" placeholder="Enter formula or value..." />
          </div>

          <!-- Spreadsheet Preview Grid -->
          <div class="excel-grid-viewport">
            <table class="excel-table">
              <thead>
                <tr>
                  <th class="corner-header"></th>
                  <th>A</th>
                  <th>B</th>
                  <th>C</th>
                  <th>D</th>
                  <th>E</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="row-num">1</td>
                  <td class="col-head">Before (V)</td>
                  <td class="col-head">After (V)</td>
                  <td class="col-head">Difference (V)</td>
                  <td class="col-head">Status</td>
                  <td class="col-head">Notes</td>
                </tr>
                <tr>
                  <td class="row-num">2</td>
                  <td>12.4</td>
                  <td>14.8</td>
                  <td class="active-cell font-bold" id="cell-c2">=B2-A2 (2.4)</td>
                  <td>PASS</td>
                  <td>Nominal</td>
                </tr>
                <tr>
                  <td class="row-num">3</td>
                  <td>11.8</td>
                  <td>15.1</td>
                  <td>=B3-A3 (3.3)</td>
                  <td>PASS</td>
                  <td>Stable</td>
                </tr>
                <tr>
                  <td class="row-num">4</td>
                  <td>12.1</td>
                  <td>14.9</td>
                  <td>=B4-A4 (2.8)</td>
                  <td>PASS</td>
                  <td>Optimal</td>
                </tr>
                <tr>
                  <td class="row-num">5</td>
                  <td>12.5</td>
                  <td>15.2</td>
                  <td>=B5-A5 (2.7)</td>
                  <td>PASS</td>
                  <td>Repeatable</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Phase 1 Notice & Interaction -->
          <div style="margin-top: 1rem; padding: 0.85rem 1.25rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
            <div>
              <strong style="color:var(--brand-blue); display:block; font-size:0.88rem;">📊 Excel Spreadsheet Simulator (Phase 1 Ready)</strong>
              <span style="font-size:0.8rem; color:var(--text-muted);">
                Formula bar &amp; grid preview loaded. Full interactive cell editing and formula engine build completes in Phase 2.
              </span>
            </div>
            <span style="color:var(--warning); font-size:0.76rem; font-weight:700; white-space:nowrap;">Manual until Phase 2</span>
          </div>
        </div>
      `;
    }
  };

  // Expose MiniExcel globally if not already provided
  window.MiniExcel = window.MiniExcel || MiniExcel;

})();
