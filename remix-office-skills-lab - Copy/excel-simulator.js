/* Offline Mini Excel simulator: editable grid, formulas, data tools, and SVG charts. */
(function () {
  'use strict';

  const COLS = 12;
  const ROWS = 40;
  const columnName = (index) => {
    let name = '';
    for (let n = index + 1; n > 0; n = Math.floor((n - 1) / 26)) name = String.fromCharCode(65 + (n - 1) % 26) + name;
    return name;
  };
  const addressParts = (address) => {
    const match = String(address || '').replace(/\$/g, '').toUpperCase().match(/^([A-Z]+)(\d+)$/);
    if (!match) return null;
    let col = 0;
    for (const char of match[1]) col = col * 26 + char.charCodeAt(0) - 64;
    return { row: Number(match[2]), col };
  };
  const addressOf = (row, col) => `${columnName(col - 1)}${row}`;
  const html = (value) => String(value == null ? '' : value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  
  const freshState = () => ({
    activeTab: 'home', activeCell: 'A1', selectedRange: 'A1', cells: {}, styles: {}, columnWidths: {}, rowHeights: {},
    mergedRanges: [], numberFormats: {}, filterEnabled: false, filterColumn: 'A', filterValue: '', freezeTopRow: false,
    conditionalGreaterThan: null, chart: null, statsGenerated: false, analysisEnabled: false, analysisOpen: false,
    analysisType: '', inputRange: '', binRange: '', outputCell: 'E2', chartOutput: false, summaryStatistics: false,
    histogram: { classWidth: 10, bins: [], gapWidth: 30 }, decision: { variableType: '', sampleSize: '', objective: '', timeSeries: '' },
    chartSelection: '', chartElementsAdded: false, chartFormatted: false, chartLabelsPercent: false,
    chartAxisType: 'text', selectedSort: '', clipboard: [], editing: false, editingValue: '',
    gridlinesVisible: true, verticalAxisVisible: true, markerStyle: 'circle', fillSource: '', fillTarget: ''
  });

  const MiniExcel = {
    mountPoint: null,
    defaultState: null,
    history: [],
    historyIndex: -1,
    state: freshState(),
    globalListenersBound: false,
    currentLessonId: null,
    completedTaskIds: {},
    isDraggingSelection: false,
    dragSelectionStart: null,
    lastHoveredAddress: null,
    isDraggingFill: false,
    fillOriginRange: null,
    lastFillHoveredAddress: null,

    mount(mountEl) {
      this.mountPoint = mountEl;
      if (!this.defaultState) this.defaultState = freshState();
      this.history = [];
      this.historyIndex = -1;
      this.saveSnapshot();
      if (!this.globalListenersBound) {
        document.addEventListener('mousemove', e => this.handleGlobalMouseMove(e));
        document.addEventListener('mouseup', e => this.handleGlobalMouseUp(e));
        this.globalListenersBound = true;
      }
      this.render();
    },

    saveSnapshot() {
      const snap = JSON.stringify(this.state);
      if (this.historyIndex >= 0 && this.history[this.historyIndex] === snap) return;
      this.history = this.history.slice(0, this.historyIndex + 1);
      this.history.push(snap);
      if (this.history.length > 50) this.history.shift();
      this.historyIndex = this.history.length - 1;
      this.updateUndoRedoButtons();
    },

    undo() {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.state = JSON.parse(this.history[this.historyIndex]);
        this.render();
        this.updateUndoRedoButtons();
        if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false);
      }
    },

    redo() {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.state = JSON.parse(this.history[this.historyIndex]);
        this.render();
        this.updateUndoRedoButtons();
        if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false);
      }
    },

    updateUndoRedoButtons() {
      if (!this.mountPoint) return;
      const u = this.mountPoint.querySelector('#excel-tool-undo');
      const r = this.mountPoint.querySelector('#excel-tool-redo');
      if (u) u.disabled = this.historyIndex <= 0;
      if (r) r.disabled = this.historyIndex >= this.history.length - 1;
    },

    loadState(startState) {
      const baseline = freshState();
      const incoming = JSON.parse(JSON.stringify(startState || {}));
      this.state = Object.assign(baseline, incoming);
      this.state.cells = Object.assign({}, incoming.cells || {});
      this.state.styles = Object.assign({}, incoming.styles || {});
      this.state.numberFormats = Object.assign({}, incoming.numberFormats || {});
      this.state.columnWidths = Object.assign({}, incoming.columnWidths || {});
      this.state.rowHeights = Object.assign({}, incoming.rowHeights || {});
      this.state.histogram = Object.assign(baseline.histogram, incoming.histogram || {});
      this.state.decision = Object.assign(baseline.decision, incoming.decision || {});
      this.history = [];
      this.historyIndex = -1;
      this.saveSnapshot();
      this.render();
    },

    activateLesson(lessonId, startState) {
      const task = startState || {};
      if (this.currentLessonId !== lessonId) {
        this.currentLessonId = lessonId;
        this.completedTaskIds = {};
        const seeded = this.getLessonSeedState(lessonId);
        this.loadState(Object.assign(seeded, task));
        return;
      }

      // Preserve the workbook data as users progress; task start-state only
      // adjusts the active view and never clears edited cells.
      this.state.activeTab = task.activeTab || this.state.activeTab || 'home';
      this.render();
      this.saveSnapshot();
    },

    getLessonSeedState(lessonId) {
      if (lessonId === 'e01-entering-data-formulas') {
        const cells = { A1: 'Before', B1: 'After', C1: 'Difference' };
        const before = [142, 140, 144, 144, 142, 146, 149, 148, 142, 148];
        const after = [140, 136, 147, 139, 143, 142, 145, 145, 138, 146];
        before.forEach((value, i) => { cells[`A${i + 2}`] = String(value); });
        after.forEach((value, i) => { cells[`B${i + 2}`] = String(value); });
        return { cells, activeCell: 'A1', selectedRange: 'A1' };
      }
      if (lessonId === 'e02-summary-statistics') {
        const cells = { A1: 'Before' };
        [142, 140, 144, 144, 142, 146, 149, 148, 142, 148].forEach((value, i) => { cells[`A${i + 2}`] = String(value); });
        return { cells, activeCell: 'A1', selectedRange: 'A1' };
      }
      return {};
    },

    getState() {
      const state = Object.assign({}, this.state);
      state.values = {};
      Object.keys(this.state.cells).forEach(address => { state.values[address] = this.getValue(address); });
      state.completedTaskIds = Object.assign({}, this.completedTaskIds);
      return state;
    },

    getRaw(address) {
      return this.state.cells[String(address).replace(/\$/g, '').toUpperCase()] ?? '';
    },

    setRaw(address, value) {
      const key = String(address).replace(/\$/g, '').toUpperCase();
      if (!addressParts(key)) return;
      if (value === '' || value == null) delete this.state.cells[key];
      else this.state.cells[key] = String(value);
    },

    getValue(address, seen) {
      const key = String(address).replace(/\$/g, '').toUpperCase();
      const parts = addressParts(key);
      if (!parts || parts.row < 1 || parts.col < 1 || parts.row > 1000 || parts.col > 1000) return '#REF!';
      const raw = this.getRaw(key);
      if (typeof raw !== 'string' || raw.charAt(0) !== '=') {
        if (raw === '') return '';
        const number = Number(raw);
        return raw.trim() !== '' && Number.isFinite(number) ? number : raw;
      }
      const lookup = seen || new Set();
      if (lookup.has(key)) return '#REF!';
      lookup.add(key);
      const value = this.evaluateFormula(raw.slice(1), lookup);
      lookup.delete(key);
      return value;
    },

    evaluateFormula(formula, seen) {
      const tokens = [];
      const pattern = /\s*(\$?[A-Za-z]{1,3}\$?\d+|\d+(?:\.\d+)?%?|"(?:""|[^"])*"|[A-Za-z_][A-Za-z0-9_.]*|<=|>=|<>|[+\-*\/%^&=<>(),:])/g;
      let last = 0;
      let match;
      while ((match = pattern.exec(formula))) {
        if (match.index !== last && formula.slice(last, match.index).trim()) return '#VALUE!';
        let token = match[1];
        if (!token.startsWith('"')) {
          token = token.toUpperCase();
        }
        tokens.push(token);
        last = pattern.lastIndex;
      }
      if (formula.slice(last).trim() || !tokens.length) return '#VALUE!';
      let cursor = 0;
      const peek = () => tokens[cursor];
      const take = () => tokens[cursor++];
      const isErr = (value) => typeof value === 'string' && /^#(?:REF!|DIV\/0!|VALUE!|NAME\?|NUM!)/.test(value);
      const numeric = (value) => {
        if (value === '') return 0;
        if (typeof value === 'number') return value;
        if (typeof value === 'boolean') return value ? 1 : 0;
        if (isErr(value)) return value;
        const n = Number(String(value).trim());
        return Number.isFinite(n) && String(value).trim() !== '' ? n : '#VALUE!';
      };
      const flatten = (value) => Array.isArray(value) ? value.flat(Infinity) : [value];
      const refValue = (address) => this.getValue(address, seen);

      const parseComparison = () => {
        let left = parseConcat();
        while (['=', '<>', '<', '>', '<=', '>='].includes(peek())) {
          const op = take();
          const right = parseConcat();
          if (isErr(left)) return left;
          if (isErr(right)) return right;
          if (op === '=') left = left == right;
          else if (op === '<>') left = left != right;
          else {
            const nl = numeric(left); const nr = numeric(right);
            if (isErr(nl)) return nl;
            if (isErr(nr)) return nr;
            if (op === '<') left = nl < nr;
            else if (op === '>') left = nl > nr;
            else if (op === '<=') left = nl <= nr;
            else left = nl >= nr;
          }
        }
        return left;
      };

      const parseConcat = () => {
        let value = parseAdd();
        while (peek() === '&') {
          take();
          const next = parseAdd();
          if (isErr(value)) return value;
          if (isErr(next)) return next;
          value = String(value) + String(next);
        }
        return value;
      };

      const parseAdd = () => {
        let value = parseMultiply();
        while (peek() === '+' || peek() === '-') {
          const op = take(); const right = parseMultiply();
          if (isErr(value)) return value;
          if (isErr(right)) return right;
          const nl = numeric(value); const nr = numeric(right);
          if (isErr(nl)) return nl;
          if (isErr(nr)) return nr;
          value = op === '+' ? nl + nr : nl - nr;
        }
        return value;
      };

      const parseMultiply = () => {
        let value = parsePower();
        while (peek() === '*' || peek() === '/') {
          const op = take(); const right = parsePower();
          if (isErr(value)) return value;
          if (isErr(right)) return right;
          const nl = numeric(value); const nr = numeric(right);
          if (isErr(nl)) return nl;
          if (isErr(nr)) return nr;
          if (op === '/' && nr === 0) return '#DIV/0!';
          value = op === '*' ? nl * nr : nl / nr;
        }
        return value;
      };

      const parsePower = () => {
        let value = parseUnary();
        while (peek() === '^') {
          take();
          const exp = parseUnary();
          if (isErr(value)) return value;
          if (isErr(exp)) return exp;
          const nb = numeric(value); const ne = numeric(exp);
          if (isErr(nb)) return nb;
          if (isErr(ne)) return ne;
          value = Math.pow(nb, ne);
        }
        return value;
      };

      const parseUnary = () => {
        if (peek() === '+') { take(); const v = numeric(parseUnary()); return isErr(v) ? v : v; }
        if (peek() === '-') { take(); const v = numeric(parseUnary()); return isErr(v) ? v : -v; }
        let val = parsePrimary();
        while (peek() === '%') {
          take();
          const n = numeric(val);
          if (isErr(n)) return n;
          val = n / 100;
        }
        return val;
      };

      const matchCriteria = (val, crit) => {
        const strCrit = String(crit ?? '').trim();
        const m = strCrit.match(/^(<=|>=|<>|<|>|=)?(.*)$/);
        const op = m[1] || '=';
        const target = m[2].trim();
        const targetNum = Number(target);
        const valNum = Number(val);
        const hasNum = target !== '' && Number.isFinite(targetNum) && Number.isFinite(valNum) && val !== '';
        if (hasNum) {
          if (op === '=') return valNum === targetNum;
          if (op === '<>') return valNum !== targetNum;
          if (op === '<') return valNum < targetNum;
          if (op === '>') return valNum > targetNum;
          if (op === '<=') return valNum <= targetNum;
          if (op === '>=') return valNum >= targetNum;
        }
        const sVal = String(val ?? '').toLowerCase();
        const sTarget = target.toLowerCase();
        if (sTarget.includes('*') || sTarget.includes('?')) {
          const regex = new RegExp('^' + sTarget.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
          const res = regex.test(sVal);
          return op === '<>' ? !res : res;
        }
        if (op === '=') return sVal === sTarget;
        if (op === '<>') return sVal !== sTarget;
        return false;
      };

      const parsePrimary = () => {
        const token = take();
        if (token === '(') {
          const value = parseComparison();
          if (take() !== ')') return '#VALUE!';
          return value;
        }
        if (token == null) return '#VALUE!';
        if (/^"/.test(token)) return token.slice(1, -1).replace(/""/g, '"');
        if (/^\d/.test(token)) {
          if (token.endsWith('%')) return Number(token.slice(0, -1)) / 100;
          return Number(token);
        }
        if (/^\$?[A-Z]{1,3}\$?\d+$/.test(token)) {
          const first = token.replace(/\$/g, '');
          if (peek() === ':') {
            take(); const secondToken = take();
            if (!/^\$?[A-Z]{1,3}\$?\d+$/.test(secondToken || '')) return '#REF!';
            const firstParts = addressParts(first); const secondParts = addressParts(secondToken);
            if (!firstParts || !secondParts) return '#REF!';
            const values = [];
            for (let row = Math.min(firstParts.row, secondParts.row); row <= Math.max(firstParts.row, secondParts.row); row++) {
              for (let col = Math.min(firstParts.col, secondParts.col); col <= Math.max(firstParts.col, secondParts.col); col++) values.push(refValue(addressOf(row, col)));
            }
            return values;
          }
          return refValue(first);
        }
        if (/^[A-Z_]/.test(token)) {
          if (token === 'TRUE') return true;
          if (token === 'FALSE') return false;
          if (take() !== '(') return '#NAME?';
          const args = [];
          if (peek() !== ')') {
            do { args.push(parseComparison()); if (peek() !== ',') break; take(); } while (true);
          }
          if (take() !== ')') return '#VALUE!';
          const all = args.flatMap(flatten);
          if (all.some(isErr)) return all.find(isErr);
          const nums = all.filter(value => typeof value === 'number' || (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value)))).map(Number);
          
          // Core & Logic
          if (token === 'IF') return args.length >= 2 ? (args[0] ? args[1] : (args[2] ?? false)) : '#VALUE!';
          if (token === 'AND') return all.length ? all.every(v => v !== 0 && v !== false && v !== '') : false;
          if (token === 'OR') return all.length ? all.some(v => v !== 0 && v !== false && v !== '') : false;
          if (token === 'NOT') return !args[0];

          // Statistics & Math
          if (token === 'SUM') return nums.reduce((sum, value) => sum + value, 0);
          if (token === 'AVERAGE') return nums.length ? nums.reduce((sum, value) => sum + value, 0) / nums.length : '#DIV/0!';
          if (token === 'MIN') return nums.length ? Math.min(...nums) : 0;
          if (token === 'MAX') return nums.length ? Math.max(...nums) : 0;
          if (token === 'COUNT') return nums.length;
          if (token === 'COUNTA') return all.filter(v => v !== '' && v != null).length;
          if (token === 'COUNTIF') {
            if (args.length < 2) return '#VALUE!';
            return flatten(args[0]).filter(value => matchCriteria(value, args[1])).length;
          }
          if (token === 'ROUND') {
            const num = numeric(args[0]); const digits = args[1] != null ? numeric(args[1]) : 0;
            if (isErr(num) || isErr(digits)) return '#VALUE!';
            const p = Math.pow(10, digits); return Math.round(num * p) / p;
          }
          if (token === 'INT') { const n = numeric(args[0]); return isErr(n) ? n : Math.floor(n); }
          if (token === 'ABS') { const n = numeric(args[0]); return isErr(n) ? n : Math.abs(n); }
          if (token === 'SQRT') { const n = numeric(args[0]); return isErr(n) ? n : n < 0 ? '#NUM!' : Math.sqrt(n); }
          if (token === 'MOD') {
            const n = numeric(args[0]); const d = numeric(args[1]);
            if (isErr(n) || isErr(d)) return '#VALUE!';
            return d === 0 ? '#DIV/0!' : ((n % d) + d) % d;
          }
          if (token === 'POWER') {
            const b = numeric(args[0]); const e = numeric(args[1]);
            if (isErr(b) || isErr(e)) return '#VALUE!';
            return Math.pow(b, e);
          }
          if (token === 'PRODUCT') return nums.length ? nums.reduce((sum, v) => sum * v, 1) : 0;
          if (token === 'MEDIAN') {
            if (!nums.length) return '#NUM!';
            const sorted = [...nums].sort((a, b) => a - b);
            const mid = Math.floor(sorted.length / 2);
            return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
          }
          if (token === 'STDEV' || token === 'STDEV.S') {
            if (nums.length < 2) return '#DIV/0!';
            const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
            return Math.sqrt(nums.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (nums.length - 1));
          }
          if (token === 'STDEV.P') {
            if (!nums.length) return '#DIV/0!';
            const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
            return Math.sqrt(nums.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / nums.length);
          }

          // Text Functions
          if (token === 'LEFT') {
            const s = String(args[0] ?? ''); const len = args[1] != null ? Number(args[1]) : 1;
            return s.slice(0, Math.max(0, len));
          }
          if (token === 'RIGHT') {
            const s = String(args[0] ?? ''); const len = args[1] != null ? Number(args[1]) : 1;
            return s.slice(Math.max(0, s.length - len));
          }
          if (token === 'MID') {
            const s = String(args[0] ?? ''); const start = Math.max(0, Number(args[1] || 1) - 1); const len = Number(args[2] || 0);
            return s.substr(start, len);
          }
          if (token === 'LEN') return String(args[0] ?? '').length;
          if (token === 'TRIM') return String(args[0] ?? '').trim().replace(/\s+/g, ' ');
          if (token === 'UPPER') return String(args[0] ?? '').toUpperCase();
          if (token === 'LOWER') return String(args[0] ?? '').toLowerCase();
          if (token === 'CONCATENATE' || token === 'CONCAT') return all.map(String).join('');

          // Date Functions
          if (token === 'TODAY') return Math.floor((Date.now() - new Date(Date.UTC(1899, 11, 30)).getTime()) / 86400000);
          if (token === 'NOW') return (Date.now() - new Date(Date.UTC(1899, 11, 30)).getTime()) / 86400000;
          if (token === 'DATE') {
            const y = Number(args[0]); const m = Number(args[1]); const d = Number(args[2]);
            return Math.floor((new Date(Date.UTC(y, m - 1, d)).getTime() - new Date(Date.UTC(1899, 11, 30)).getTime()) / 86400000);
          }
          if (token === 'YEAR') {
            const n = numeric(args[0]); if (isErr(n)) return n;
            return new Date(Date.UTC(1899, 11, 30) + n * 86400000).getUTCFullYear();
          }
          if (token === 'MONTH') {
            const n = numeric(args[0]); if (isErr(n)) return n;
            return new Date(Date.UTC(1899, 11, 30) + n * 86400000).getUTCMonth() + 1;
          }
          if (token === 'DAY') {
            const n = numeric(args[0]); if (isErr(n)) return n;
            return new Date(Date.UTC(1899, 11, 30) + n * 86400000).getUTCDate();
          }

          // Lookup (VLOOKUP)
          if (token === 'VLOOKUP') {
            if (args.length < 3) return '#VALUE!';
            const lookupVal = args[0];
            const colIndex = Number(args[2]);
            const exact = args[3] !== undefined ? !args[3] : true;
            const rangeStr = String(tokens.slice(tokens.indexOf('(') + 1).find(t => t.includes(':')) || '');
            const rows = rangeStr ? this.valuesFromRange(rangeStr) : [];
            for (let r = 0; r < rows.length; r++) {
              const firstVal = rows[r][0];
              const match = exact ? String(firstVal).toLowerCase() === String(lookupVal).toLowerCase() : Number(firstVal) <= Number(lookupVal);
              if (match) return rows[r][colIndex - 1] ?? '#REF!';
            }
            return '#N/A';
          }

          return '#NAME?';
        }
        return '#VALUE!';
      };

      try {
        const result = parseComparison();
        if (cursor !== tokens.length) return '#VALUE!';
        if (Array.isArray(result)) return result[0] ?? '';
        return (typeof result === 'number' && !Number.isFinite(result)) ? '#NUM!' : result;
      } catch (_) {
        return '#VALUE!';
      }
    },

    formattedValue(address) {
      const value = this.getValue(address);
      const format = this.state.numberFormats[address] || 'General';
      if (value === '' || typeof value === 'boolean' || (typeof value === 'string' && value.startsWith('#'))) return value;
      if (typeof value !== 'number') return value;
      if (format === 'Percent') return `${(value * 100).toFixed(0)}%`;
      if (format === 'Currency') return `$${value.toFixed(2)}`;
      if (format === 'Number') return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
      if (format === 'Date') return new Date(Date.UTC(1899, 11, 30) + value * 86400000).toLocaleDateString();
      return String(value);
    },

    render() {
      if (!this.mountPoint) return;
      const s = this.state;
      this.mountPoint.innerHTML = `
        <section class="mini-excel-app" id="mini-excel-app" aria-label="Mini Excel spreadsheet">
          <header class="excel-title-bar">
            <div style="display:flex; align-items:center; gap:0.5rem; flex:1;">
              <span class="excel-logo-icon">X</span>
              <span class="doc-title-text">Lab_Data_Analysis.xlsx - Mini Excel</span>
              <span class="excel-save-state">Local practice sheet</span>
            </div>
            <div class="title-quick-tools" style="display:flex; gap:0.25rem;">
              <button type="button" class="q-btn" id="excel-tool-undo" title="Undo (Ctrl+Z)" ${this.historyIndex <= 0 ? 'disabled' : ''}>↩</button>
              <button type="button" class="q-btn" id="excel-tool-redo" title="Redo (Ctrl+Y)" ${this.historyIndex >= this.history.length - 1 ? 'disabled' : ''}>↪</button>
            </div>
          </header>
          <nav class="excel-ribbon-tabs" aria-label="Excel ribbon tabs" role="tablist">
            ${['Home', 'Insert', 'Formulas', 'Data'].map(tab => `<button type="button" id="excel-toolbar-tab-${tab.toLowerCase()}" role="tab" aria-controls="excel-toolbar" aria-selected="${s.activeTab === tab.toLowerCase()}" tabindex="${s.activeTab === tab.toLowerCase() ? '0' : '-1'}" class="excel-tab-btn ${s.activeTab === tab.toLowerCase() ? 'active' : ''}" data-excel-tab="${tab.toLowerCase()}">${tab}</button>`).join('')}
          </nav>
          <div class="excel-toolbar" id="excel-toolbar" role="tabpanel" aria-labelledby="excel-toolbar-tab-${s.activeTab}">${this.renderToolbar()}</div>
          ${this.renderPracticePanel()}
          <div class="excel-formula-bar-container">
            <input id="excel-name-box" class="name-box" aria-label="Name box" value="${html(s.selectedRange || s.activeCell)}" />
            <span class="formula-fx">fx</span>
            <input type="text" class="formula-input" id="excel-formula-input" aria-label="Formula bar" value="${html(this.getRaw(s.activeCell))}" placeholder="Enter formula or value..." />
            <button type="button" class="excel-enter-btn" data-excel-action="commit-formula">✓</button>
          </div>
          <div class="excel-grid-viewport" id="excel-grid-viewport" role="region" aria-label="Spreadsheet viewport">
            <div class="excel-table-scroll-container">
              <div class="excel-selection-box" id="excel-selection-box">
                <span class="excel-fill-handle" id="excel-fill-handle" title="Drag to fill" aria-label="Fill selected cells"></span>
              </div>
              <div class="excel-fill-preview-box" id="excel-fill-preview-box" style="display: none;"></div>
              <table id="excel-table-grid" class="excel-table ${s.freezeTopRow ? 'freeze-top-row' : ''}" role="grid" tabindex="0" aria-label="Worksheet grid. Use arrow keys to move, Enter or Tab to advance, F2 or double-click to edit, and Control+D to fill down." aria-activedescendant="excel-cell-${s.activeCell}"><thead><tr><th class="corner-header" role="columnheader"></th>${Array.from({ length: COLS }, (_, col) => `<th class="excel-col-header" role="columnheader" data-col="${col + 1}" id="excel-col-${columnName(col)}" style="${s.columnWidths[col + 1] ? `width:${s.columnWidths[col + 1]}px` : ''}">${columnName(col)}</th>`).join('')}</tr></thead>
                <tbody>${Array.from({ length: ROWS }, (_, row) => {
                  const rowNumber = row + 1;
                  const rangeParts = String(s.selectedRange || s.activeCell).split(':');
                  const rFirst = addressParts(rangeParts[0]);
                  const rLast = addressParts(rangeParts[1] || rangeParts[0]);
                  const rMin = rFirst && rLast ? Math.min(rFirst.row, rLast.row) : (addressParts(s.activeCell)?.row || 1);
                  const rMax = rFirst && rLast ? Math.max(rFirst.row, rLast.row) : (addressParts(s.activeCell)?.row || 1);
                  const cMin = rFirst && rLast ? Math.min(rFirst.col, rLast.col) : (addressParts(s.activeCell)?.col || 1);
                  const cMax = rFirst && rLast ? Math.max(rFirst.col, rLast.col) : (addressParts(s.activeCell)?.col || 1);

                  const cells = Array.from({ length: COLS }, (_, col) => {
                    const address = addressOf(rowNumber, col + 1);
                    const merged = s.mergedRanges.map(range => String(range).split(':')).map(parts => [addressParts(parts[0]), addressParts(parts[1] || parts[0])]).find(([a, b]) => a && b && rowNumber >= Math.min(a.row, b.row) && rowNumber <= Math.max(a.row, b.row) && col + 1 >= Math.min(a.col, b.col) && col + 1 <= Math.max(a.col, b.col));
                    if (merged) {
                      const [from, to] = merged;
                      if (rowNumber !== Math.min(from.row, to.row) || col + 1 !== Math.min(from.col, to.col)) return '';
                    }
                    const style = s.styles[address] || {};
                    const isActive = address === s.activeCell;
                    const inRange = rowNumber >= rMin && rowNumber <= rMax && col + 1 >= cMin && col + 1 <= cMax;
                    const value = this.formattedValue(address);
                    const styleString = [style.bold ? 'font-weight:700' : '', style.italic ? 'font-style:italic' : '', style.color ? `color:${html(style.color)}` : '', style.fill ? `background:${html(style.fill)}` : '', style.align ? `text-align:${style.align}` : '', style.border ? 'border:1px solid #64748b' : '', s.conditionalGreaterThan !== null && typeof this.getValue(address) === 'number' && this.getValue(address) > Number(s.conditionalGreaterThan) ? 'background:#fff1b8' : ''].filter(Boolean).join(';');
                    const colspan = merged ? Math.abs(merged[1].col - merged[0].col) + 1 : 1;
                    return `<td id="excel-cell-${address}" role="gridcell" headers="excel-row-${rowNumber} excel-col-${columnName(col)}" data-address="${address}" aria-label="${address}: ${value === '' ? 'blank' : html(value)}" aria-selected="${inRange}" tabindex="${isActive ? '0' : '-1'}" ${colspan > 1 ? `colspan="${colspan}"` : ''} class="excel-cell ${isActive ? 'active-cell' : ''} ${inRange ? 'range-selected' : ''}" style="${styleString};${s.rowHeights[rowNumber] ? `height:${s.rowHeights[rowNumber]}px` : ''}"><span class="excel-cell-value">${html(value)}</span></td>`;
                  }).join('');
                  const hidden = s.filterEnabled && rowNumber > 1 && s.filterValue && String(this.formattedValue(`${s.filterColumn}${rowNumber}`)).toLowerCase().indexOf(s.filterValue.toLowerCase()) === -1;
                  return `<tr data-row="${rowNumber}" role="row" class="${hidden ? 'filtered-out' : ''}"><th class="row-num" role="rowheader" id="excel-row-${rowNumber}">${rowNumber}</th>${cells}</tr>`;
                }).join('')}</tbody>
              </table>
            </div>
          </div>
          ${s.chart ? this.renderChart() : ''}
          <footer class="excel-status-bar" role="status" aria-live="polite"><span>Ready</span><span>${html(s.selectedRange || s.activeCell)} selected</span><span>${s.freezeTopRow ? 'Top row frozen' : 'Sheet1'}</span><span>${s.activeTab.toUpperCase()}</span></footer>
        </section>`;
      this.bindEvents();
      this.positionSelectionBox();
    },

    renderToolbar() {
      const s = this.state;
      if (s.activeTab === 'home') return `
        <div class="excel-tool-group"><strong>Font</strong><button aria-label="Toggle bold" data-excel-action="bold">B</button><button aria-label="Toggle italic" data-excel-action="italic"><em>I</em></button><label>Fill <input type="color" aria-label="Cell fill color" data-excel-action="fill-color" value="${s.styles[s.activeCell]?.fill || '#fff2cc'}"></label><label>Font <input type="color" aria-label="Cell font color" data-excel-action="font-color" value="${s.styles[s.activeCell]?.color || '#000000'}"></label><button data-excel-action="borders">Borders</button></div>
        <div class="excel-tool-group"><strong>Alignment</strong><button data-excel-action="align-left">Left</button><button data-excel-action="align-center">Center</button><button data-excel-action="align-right">Right</button><button data-excel-action="merge">Merge &amp; Center</button></div>
        <div class="excel-tool-group"><strong>Number</strong><select data-excel-action="number-format"><option>General</option><option>Number</option><option>Currency</option><option>Percent</option><option>Date</option></select></div>
        <div class="excel-tool-group"><strong>Size</strong><label>Column px <input type="number" aria-label="Column width in pixels" data-excel-action="column-width" min="30" max="500" value="${s.columnWidths[addressParts(s.activeCell)?.col] || 110}"></label><label>Row px <input type="number" aria-label="Row height in pixels" data-excel-action="row-height" min="18" max="200" value="${s.rowHeights[addressParts(s.activeCell)?.row] || 30}"></label></div>`;
      if (s.activeTab === 'insert') return `
        <div class="excel-tool-group"><strong>Charts</strong><button data-excel-action="chart-column">Column chart</button><button data-excel-action="chart-bar">Bar chart</button><button data-excel-action="chart-line">Line chart</button><button data-excel-action="chart-pie">Pie chart</button><button data-excel-action="chart-scatter">Scatter</button><button data-excel-action="chart-histogram">Histogram</button></div>
        <div class="excel-tool-group"><strong>Chart options</strong><button data-excel-action="chart-elements">Show title &amp; axes</button><button data-excel-action="chart-labels">Percent labels</button><button data-excel-action="chart-format">Format selected element</button><label>Axis <select aria-label="Horizontal axis type" data-excel-action="axis-type"><option value="text" ${s.chartAxisType === 'text' ? 'selected' : ''}>Text</option><option value="date" ${s.chartAxisType === 'date' ? 'selected' : ''}>Date</option></select></label><label>Marker <select aria-label="Chart marker style" data-excel-action="marker-style"><option value="circle" ${s.markerStyle === 'circle' ? 'selected' : ''}>Circle</option><option value="x" ${s.markerStyle === 'x' ? 'selected' : ''}>X</option></select></label><button data-excel-action="toggle-axis">Toggle Y axis</button><button data-excel-action="toggle-gridlines">Toggle gridlines</button></div>`;
      if (s.activeTab === 'formulas') return `
        <div class="excel-tool-group"><strong>Functions</strong>${['SUM', 'AVERAGE', 'MIN', 'MAX', 'COUNT', 'IF'].map(fn => `<button data-function="${fn}">${fn}</button>`).join('')}</div>
        <div class="excel-tool-group"><strong>Analysis</strong><button data-excel-action="analysis-open">Data Analysis</button><button data-excel-action="analysis-run">Run summary statistics</button></div>`;
      return `
        <div class="excel-tool-group"><strong>Sort &amp; Filter</strong><button data-excel-action="sort-asc">Sort A to Z</button><button data-excel-action="sort-desc">Sort Z to A</button><button data-excel-action="filter">Filter</button><button data-excel-action="freeze">Freeze top row</button></div>
        <div class="excel-tool-group"><strong>Conditional formatting</strong><label>Highlight &gt; <input type="number" aria-label="Highlight cells greater than" data-excel-action="conditional-value" value="${s.conditionalGreaterThan ?? 0}"></label><button data-excel-action="conditional-apply">Apply</button></div>
        <div class="excel-tool-group"><strong>Analysis</strong><button data-excel-action="toolpak">${s.analysisEnabled ? 'Analysis ToolPak enabled' : 'Enable Analysis ToolPak'}</button><button data-excel-action="analysis-open">Data Analysis</button><label>Type <select data-excel-action="analysis-type"><option value="Descriptive Statistics" ${s.analysisType === 'Descriptive Statistics' ? 'selected' : ''}>Descriptive Statistics</option><option value="Histogram" ${s.analysisType === 'Histogram' ? 'selected' : ''}>Histogram</option></select></label><label>Input <input type="text" data-excel-action="input-range" value="${html(s.inputRange)}" placeholder="A2:A11"></label><label>Bins <input type="text" data-excel-action="bin-range" value="${html(s.binRange)}" placeholder="C2:C7"></label><label>Output <input type="text" data-excel-action="output-cell" value="${html(s.outputCell)}"></label><label><input type="checkbox" data-excel-action="chart-output" ${s.chartOutput ? 'checked' : ''}> Chart output</label><label><input type="checkbox" data-excel-action="summary-stats" ${s.summaryStatistics ? 'checked' : ''}> Summary statistics</label><button data-excel-action="analysis-run">Run</button></div>`;
    },

    renderPracticePanel() {
      const s = this.state;
      return `<div class="excel-practice-panel" aria-label="Task practice controls">
        <label>Variable type <select data-decision="variableType"><option value="">Choose…</option><option value="categorical" ${s.decision.variableType === 'categorical' ? 'selected' : ''}>Categorical</option><option value="time" ${s.decision.variableType === 'time' ? 'selected' : ''}>Continuous time</option><option value="numeric" ${s.decision.variableType === 'numeric' ? 'selected' : ''}>Numeric measurements</option></select></label>
        <label>Sample size <select data-decision="sampleSize"><option value="">Choose…</option><option value="small" ${s.decision.sampleSize === 'small' ? 'selected' : ''}>Small (&lt;35)</option><option value="large" ${s.decision.sampleSize === 'large' ? 'selected' : ''}>Large (≥30)</option><option value="not-applicable" ${s.decision.sampleSize === 'not-applicable' ? 'selected' : ''}>Not applicable</option></select></label>
        <label>Objective <select data-decision="objective"><option value="">Choose…</option><option value="compare" ${s.decision.objective === 'compare' ? 'selected' : ''}>Compare categories</option><option value="proportion" ${s.decision.objective === 'proportion' ? 'selected' : ''}>Show proportions</option><option value="distribution" ${s.decision.objective === 'distribution' ? 'selected' : ''}>Inspect distribution</option></select></label>
        <label>Time series <select data-decision="timeSeries"><option value="">Choose…</option><option value="yes" ${s.decision.timeSeries === 'yes' ? 'selected' : ''}>Yes</option><option value="no" ${s.decision.timeSeries === 'no' ? 'selected' : ''}>No</option></select></label>
        <label>Class width <input type="number" min="1" data-histogram-width value="${s.histogram.classWidth}"></label>
        <label>Chart choice <select data-chart-choice><option value="">Choose…</option><option value="dot" ${s.chartSelection === 'dot' ? 'selected' : ''}>Dot plot</option><option value="histogram" ${s.chartSelection === 'histogram' ? 'selected' : ''}>Histogram</option><option value="column" ${s.chartSelection === 'column' ? 'selected' : ''}>Column / bar</option><option value="line" ${s.chartSelection === 'line' ? 'selected' : ''}>Line graph</option><option value="pie" ${s.chartSelection === 'pie' ? 'selected' : ''}>Pie chart</option></select></label>
        <span class="excel-practice-label">For decision tasks and histogram setup</span>
      </div>`;
    },

    renderChart() {
      const chart = this.state.chart;
      const labels = chart.labels || [];
      const values = chart.values || [];
      const seriesList = chart.series || [{ name: 'Series 1', values }];
      const allVals = seriesList.flatMap(s => s.values.map(Number));
      const max = Math.max(1, ...allVals);
      const width = 680; const height = 300; const pad = 42;
      const palette = ['#107c41', '#2f75b5', '#ed7d31', '#a5a5a5', '#ffc000', '#8064a2'];
      const xValues = (chart.xValues || labels).map(Number);
      const xNumeric = xValues.filter(Number.isFinite);
      const xMin = xNumeric.length ? Math.min(...xNumeric) : 0;
      const xMax = xNumeric.length ? Math.max(...xNumeric) : 1;
      const xPosition = index => chart.type === 'scatter' && Number.isFinite(xValues[index])
        ? pad + (xValues[index] - xMin) / Math.max(1, xMax - xMin) * (width - 2 * pad)
        : pad + index * (width - 2 * pad) / Math.max(1, labels.length - 1);
      let marks = '';

      if (chart.type === 'line' || chart.type === 'scatter') {
        seriesList.forEach((ser, sIdx) => {
          const color = palette[sIdx % palette.length];
          const pts = ser.values.map((v, i) => `${xPosition(i)},${height - pad - Number(v) / max * (height - 2 * pad)}`).join(' ');
          if (chart.type === 'line') marks += `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5"/>`;
          ser.values.forEach((v, i) => {
            const x = xPosition(i);
            const y = height - pad - Number(v) / max * (height - 2 * pad);
            if (this.state.markerStyle === 'x') {
              marks += `<line x1="${x - 4}" y1="${y - 4}" x2="${x + 4}" y2="${y + 4}" stroke="${color}" stroke-width="2"/><line x1="${x - 4}" y1="${y + 4}" x2="${x + 4}" y2="${y - 4}" stroke="${color}" stroke-width="2"/>`;
            } else {
              marks += `<circle cx="${x}" cy="${y}" r="4.5" fill="${color}"/>`;
            }
          });
        });
      } else if (chart.type === 'pie') {
        const total = values.reduce((sum, value) => sum + Number(value || 0), 0) || 1;
        let angle = -Math.PI / 2;
        values.forEach((value, i) => {
          const next = angle + Number(value) / total * Math.PI * 2;
          const x1 = 180 + 120 * Math.cos(angle); const y1 = 150 + 120 * Math.sin(angle);
          const x2 = 180 + 120 * Math.cos(next); const y2 = 150 + 120 * Math.sin(next);
          marks += `<path d="M180 150 L${x1} ${y1} A120 120 0 ${next - angle > Math.PI ? 1 : 0} 1 ${x2} ${y2} Z" fill="${palette[i % palette.length]}" stroke="white"/>`;
          if (this.state.chartLabelsPercent) {
            const middle = angle + (next - angle) / 2;
            marks += `<text x="${180 + 72 * Math.cos(middle)}" y="${150 + 72 * Math.sin(middle)}" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${Math.round(Number(value) / total * 100)}%</text>`;
          }
          angle = next;
        });
      } else if (chart.type === 'bar') {
        const slot = (height - 2 * pad) / Math.max(labels.length, 1);
        const subSlot = slot * 0.75 / Math.max(seriesList.length, 1);
        labels.forEach((_, i) => {
          seriesList.forEach((ser, sIdx) => {
            const v = ser.values[i] || 0;
            const barWidth = Number(v) / max * (width - 2 * pad);
            marks += `<rect x="${pad}" y="${pad + i * slot + sIdx * subSlot + slot * 0.1}" width="${barWidth}" height="${subSlot * 0.85}" fill="${palette[sIdx % palette.length]}"/>`;
          });
        });
      } else {
        // Column / Histogram
        const slot = (width - 2 * pad) / Math.max(labels.length, 1);
        const gapRatio = chart.type === 'histogram'
          ? Math.max(0, Math.min(100, Number(chart.gapWidth ?? this.state.histogram.gapWidth))) / 100
          : 0.25;
        const subSlot = slot * (1 - gapRatio) / Math.max(seriesList.length, 1);
        labels.forEach((_, i) => {
          seriesList.forEach((ser, sIdx) => {
            const v = ser.values[i] || 0;
            const barHeight = Number(v) / max * (height - 2 * pad);
            marks += `<rect x="${pad + i * slot + slot * gapRatio / 2 + sIdx * subSlot}" y="${height - pad - barHeight}" width="${subSlot}" height="${barHeight}" fill="${palette[sIdx % palette.length]}"/>`;
          });
        });
      }

      let axisLabels;
      if (chart.type === 'scatter' && xNumeric.length) {
        const ticks = [...new Set(xNumeric)].sort((a, b) => a - b);
        const stride = Math.max(1, Math.ceil(ticks.length / 7));
        const visibleTicks = ticks.filter((_, index) => index % stride === 0 || index === ticks.length - 1);
        axisLabels = visibleTicks.map(value => {
          const x = pad + (value - xMin) / Math.max(1, xMax - xMin) * (width - 2 * pad);
          return `<text x="${x}" y="${height - 12}" text-anchor="middle" font-size="10">${html(value)}</text>`;
        }).join('');
      } else {
        axisLabels = labels.map((label, i) => `<text x="${pad + i * (width - 2 * pad) / Math.max(1, labels.length - 1)}" y="${height - 12}" text-anchor="middle" font-size="10">${html(label).slice(0, 12)}</text>`).join('');
      }
      const title = chart.title || 'Chart Title';
      const legend = seriesList.length > 1 ? `<g transform="translate(${width - 120}, 15)">${seriesList.map((s, idx) => `<rect x="0" y="${idx * 16}" width="10" height="10" fill="${palette[idx % palette.length]}"/><text x="14" y="${idx * 16 + 9}" font-size="10">${html(s.name || 'Series ' + (idx + 1))}</text>`).join('')}</g>` : '';

      return `<div class="excel-chart-panel ${chart.formatted ? 'chart-formatted' : ''}" id="excel-chart-panel"><div class="excel-chart-editors"><label>Chart title <input aria-label="Chart title" data-chart-field="title" value="${html(title)}"></label><label>X axis <input aria-label="Horizontal axis title" data-chart-field="xTitle" value="${html(chart.xTitle || '')}" placeholder="Category / Time"></label><label>Y axis <input aria-label="Vertical axis title" data-chart-field="yTitle" value="${html(chart.yTitle || '')}" placeholder="Value and units"></label><button data-excel-action="save-chart-fields">Apply labels</button><label>Gap width <input aria-label="Chart gap width percentage" data-chart-gap type="number" min="0" max="100" value="${chart.gapWidth ?? this.state.histogram.gapWidth}">%</label></div><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${html(title)}" class="excel-chart-svg"><text x="${width / 2}" y="20" text-anchor="middle" font-weight="bold">${html(title)}</text>${legend}<line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" stroke="#475569"/>${chart.axisVisible === false || this.state.verticalAxisVisible === false ? '' : `<line x1="${pad}" y1="${pad}" x2="${pad}" y2="${height - pad}" stroke="#475569"/>`}${this.state.gridlinesVisible ? `<line x1="${pad}" y1="${height - pad * 1.8}" x2="${width - pad}" y2="${height - pad * 1.8}" stroke="#e2e8f0"/>` : ''}${marks}${axisLabels}<text x="${width / 2}" y="${height - 1}" text-anchor="middle" font-size="11">${html(chart.xTitle || '')}</text><text x="12" y="${height / 2}" text-anchor="middle" font-size="11" transform="rotate(-90 12 ${height / 2})">${html(chart.yTitle || '')}</text></svg><div class="excel-chart-caption">${this.state.chartLabelsPercent ? 'Percentage labels enabled' : ''} ${chart.formatted ? '· formatted' : ''} ${this.state.markerStyle === 'x' ? '· X markers' : ''}</div></div>`;
    },

    isInSelectedRange(address) {
      const range = String(this.state.selectedRange || this.state.activeCell).split(':');
      const first = addressParts(range[0]); const last = addressParts(range[1] || range[0]); const cell = addressParts(address);
      if (!first || !last || !cell) return address === this.state.activeCell;
      return cell.row >= Math.min(first.row, last.row) && cell.row <= Math.max(first.row, last.row) && cell.col >= Math.min(first.col, last.col) && cell.col <= Math.max(first.col, last.col);
    },

    selectedAddresses() {
      const parts = this.state.selectedRange.split(':');
      const first = addressParts(parts[0]); const last = addressParts(parts[1] || parts[0]);
      if (!first || !last) return [this.state.activeCell];
      const addresses = [];
      for (let row = Math.min(first.row, last.row); row <= Math.min(ROWS, Math.max(first.row, last.row)); row++) {
        for (let col = Math.min(first.col, last.col); col <= Math.min(COLS, Math.max(first.col, last.col)); col++) addresses.push(addressOf(row, col));
      }
      return addresses;
    },

    setSelection(range) {
      const cleaned = String(range || '').replace(/\$/g, '').toUpperCase();
      const pieces = cleaned.split(':');
      if (!addressParts(pieces[0]) || (pieces[1] && !addressParts(pieces[1]))) return;
      this.state.selectedRange = pieces.length > 1 ? `${pieces[0]}:${pieces[1]}` : pieces[0];
      this.state.activeCell = pieces[0];
      this.render();
      this.mountPoint?.querySelector('#excel-table-grid')?.focus();
      if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false);
    },

    renderValues() {
      if (!this.mountPoint) return;
      this.mountPoint.querySelectorAll('[data-address] .excel-cell-value').forEach(span => {
        const td = span.closest('[data-address]');
        if (td) span.textContent = this.formattedValue(td.dataset.address);
      });
      const formula = this.mountPoint.querySelector('#excel-formula-input');
      if (formula && document.activeElement !== formula) formula.value = this.getRaw(this.state.activeCell);
      const active = this.mountPoint.querySelector('#excel-name-box');
      if (active && document.activeElement !== active) active.value = this.state.selectedRange;
      this.updateUndoRedoButtons();
    },

    positionSelectionBox() {
      if (!this.mountPoint) return;
      const box = this.mountPoint.querySelector('#excel-selection-box');
      if (!box) return;

      const s = this.state;
      const parts = String(s.selectedRange || s.activeCell).split(':');
      const first = addressParts(parts[0]);
      const last = addressParts(parts[1] || parts[0]);
      if (!first || !last) {
        box.style.display = 'none';
        return;
      }

      const rMin = Math.min(first.row, last.row);
      const rMax = Math.max(first.row, last.row);
      const cMin = Math.min(first.col, last.col);
      const cMax = Math.max(first.col, last.col);

      const startCell = this.mountPoint.querySelector(`[data-address="${addressOf(rMin, cMin)}"]`);
      const endCell = this.mountPoint.querySelector(`[data-address="${addressOf(rMax, cMax)}"]`);
      if (!startCell || !endCell) {
        box.style.display = 'none';
        return;
      }

      const top = startCell.offsetTop;
      const left = startCell.offsetLeft;
      const width = (endCell.offsetLeft + endCell.offsetWidth) - left;
      const height = (endCell.offsetTop + endCell.offsetHeight) - top;

      box.style.display = 'block';
      box.style.top = `${top}px`;
      box.style.left = `${left}px`;
      box.style.width = `${width}px`;
      box.style.height = `${height}px`;
    },

    updateSelectionUI() {
      if (!this.mountPoint) return;
      const s = this.state;
      const parts = String(s.selectedRange || s.activeCell).split(':');
      const first = addressParts(parts[0]);
      const last = addressParts(parts[1] || parts[0]);
      if (!first || !last) return;
      const rMin = Math.min(first.row, last.row);
      const rMax = Math.max(first.row, last.row);
      const cMin = Math.min(first.col, last.col);
      const cMax = Math.max(first.col, last.col);

      this.mountPoint.querySelectorAll('.excel-cell').forEach(cell => {
        const pt = addressParts(cell.dataset.address);
        if (!pt) return;
        const inRange = pt.row >= rMin && pt.row <= rMax && pt.col >= cMin && pt.col <= cMax;
        const isActive = cell.dataset.address === s.activeCell;
        cell.classList.toggle('active-cell', isActive);
        cell.classList.toggle('range-selected', inRange);
        cell.tabIndex = isActive ? 0 : -1;
        cell.setAttribute('aria-selected', inRange ? 'true' : 'false');
      });

      this.positionSelectionBox();

      const grid = this.mountPoint.querySelector('#excel-table-grid');
      if (grid) grid.setAttribute('aria-activedescendant', `excel-cell-${s.activeCell}`);

      const formula = this.mountPoint.querySelector('#excel-formula-input');
      if (formula && document.activeElement !== formula) formula.value = this.getRaw(s.activeCell);

      const box = this.mountPoint.querySelector('#excel-name-box');
      if (box && document.activeElement !== box) box.value = s.selectedRange;

      const statusBar = this.mountPoint.querySelector('.excel-status-bar');
      if (statusBar && statusBar.children[1]) {
        statusBar.children[1].textContent = `${s.selectedRange || s.activeCell} selected`;
      }
    },

    selectCell(address, extend) {
      if (!addressParts(address)) return;
      const old = addressParts(this.state.activeCell); const next = addressParts(address);
      this.state.activeCell = address.toUpperCase();
      if (extend && old) {
        const from = addressParts(this.state.selectedRange.split(':')[0]) || old;
        this.state.selectedRange = `${addressOf(Math.min(from.row, next.row), Math.min(from.col, next.col))}:${addressOf(Math.max(from.row, next.row), Math.max(from.col, next.col))}`;
      } else {
        this.state.selectedRange = address.toUpperCase();
      }
      this.updateSelectionUI();
      this.renderValues();
      if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false);
    },

    beginEdit(address) {
      this.selectCell(address || this.state.activeCell, false);
      const cell = this.mountPoint.querySelector(`[data-address="${this.state.activeCell}"]`);
      if (!cell) return;
      const input = document.createElement('input');
      input.className = 'excel-inline-editor'; input.value = this.getRaw(this.state.activeCell); input.setAttribute('aria-label', `Edit ${this.state.activeCell}`);
      cell.querySelector('.excel-cell-value').hidden = true;
      cell.appendChild(input); input.focus(); input.select(); this.state.editing = true;
      input.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === 'Tab') { event.preventDefault(); this.commitEdit(input.value); this.moveCell(event.key === 'Tab' ? 0 : 1, event.key === 'Tab' ? 1 : 0); }
        if (event.key === 'Escape') { this.state.editing = false; this.render(); }
      });
      input.addEventListener('blur', () => { if (this.state.editing) this.commitEdit(input.value); });
    },

    commitEdit(value) {
      this.setRaw(this.state.activeCell, value);
      this.state.editing = false;
      this.saveSnapshot();
      const cell = this.mountPoint.querySelector(`[data-address="${this.state.activeCell}"]`);
      if (cell) { cell.querySelector('.excel-inline-editor')?.remove(); const span = cell.querySelector('.excel-cell-value'); span.hidden = false; span.textContent = this.formattedValue(this.state.activeCell); }
      const formula = this.mountPoint.querySelector('#excel-formula-input');
      if (formula) formula.value = this.getRaw(this.state.activeCell);
      this.renderValues();
      if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false);
    },

    moveCell(rowDelta, colDelta) {
      const point = addressParts(this.state.activeCell); if (!point) return;
      this.selectCell(addressOf(Math.max(1, Math.min(ROWS, point.row + rowDelta)), Math.max(1, Math.min(COLS, point.col + colDelta))), false);
      this.mountPoint.querySelector('#excel-table-grid')?.focus();
      this.mountPoint.querySelector(`[data-address="${this.state.activeCell}"]`)?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    },

    extendSelection(rowDelta, colDelta) {
      const anchor = addressParts(this.state.activeCell);
      if (!anchor) return;
      const parts = String(this.state.selectedRange || this.state.activeCell).split(':');
      const last = addressParts(parts[1] || parts[0]) || anchor;
      const newRow = Math.max(1, Math.min(ROWS, last.row + rowDelta));
      const newCol = Math.max(1, Math.min(COLS, last.col + colDelta));
      const r1 = Math.min(anchor.row, newRow);
      const r2 = Math.max(anchor.row, newRow);
      const c1 = Math.min(anchor.col, newCol);
      const c2 = Math.max(anchor.col, newCol);
      this.state.selectedRange = (r1 === r2 && c1 === c2)
        ? addressOf(r1, c1)
        : `${addressOf(r1, c1)}:${addressOf(r2, c2)}`;
      this.updateSelectionUI();
      if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false);
    },

    handleFillDblClick() {
      const parts = String(this.state.selectedRange || this.state.activeCell).split(':');
      const first = addressParts(parts[0]);
      const last = addressParts(parts[1] || parts[0]);
      if (!first || !last) return;

      const startRow = Math.max(first.row, last.row);
      const col = first.col;

      let adjCol = col > 1 ? col - 1 : (col < COLS ? col + 1 : null);
      if (adjCol) {
        let lastDataRow = startRow;
        for (let r = startRow + 1; r <= ROWS; r++) {
          if (this.getRaw(addressOf(r, adjCol)).trim() !== '') {
            lastDataRow = r;
          } else {
            break;
          }
        }
        if (lastDataRow > startRow) {
          this.fillMatrix(this.state.selectedRange || this.state.activeCell, addressOf(lastDataRow, Math.max(first.col, last.col)));
        }
      }
    },

    handleGlobalMouseMove(event) {
      if (this.isDraggingSelection && this.dragSelectionStart) {
        if (event.buttons !== 1) {
          this.handleGlobalMouseUp(event);
          return;
        }
        const cell = event.target.closest('[data-address]');
        if (!cell) return;
        const current = cell.dataset.address;
        if (!current || current === this.lastHoveredAddress) return;
        this.lastHoveredAddress = current;

        const start = addressParts(this.dragSelectionStart);
        const curr = addressParts(current);
        if (!start || !curr) return;

        const r1 = Math.min(start.row, curr.row);
        const r2 = Math.max(start.row, curr.row);
        const c1 = Math.min(start.col, curr.col);
        const c2 = Math.max(start.col, curr.col);

        this.state.selectedRange = (r1 === r2 && c1 === c2)
          ? addressOf(r1, c1)
          : `${addressOf(r1, c1)}:${addressOf(r2, c2)}`;

        this.updateSelectionUI();

        const box = this.mountPoint?.querySelector('#excel-name-box');
        if (box && document.activeElement !== box) {
          const rowCount = r2 - r1 + 1;
          const colCount = c2 - c1 + 1;
          if (rowCount > 1 || colCount > 1) {
            box.value = `${rowCount}R x ${colCount}C`;
          }
        }
        return;
      }

      if (this.isDraggingFill && this.fillOriginRange) {
        if (event.buttons !== 1) {
          this.handleGlobalMouseUp(event);
          return;
        }
        const cell = event.target.closest('[data-address]');
        if (!cell) return;
        const current = cell.dataset.address;
        if (!current || current === this.lastFillHoveredAddress) return;
        this.lastFillHoveredAddress = current;
        this.updateFillPreview(this.fillOriginRange, current);
        return;
      }
    },

    handleGlobalMouseUp(event) {
      if (this.isDraggingSelection) {
        this.isDraggingSelection = false;
        this.dragSelectionStart = null;
        this.lastHoveredAddress = null;

        const box = this.mountPoint?.querySelector('#excel-name-box');
        if (box && document.activeElement !== box) {
          box.value = this.state.selectedRange;
        }

        this.updateSelectionUI();
        if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false);
      }

      if (this.isDraggingFill) {
        this.isDraggingFill = false;
        const source = this.fillOriginRange;
        const target = this.lastFillHoveredAddress;
        this.fillOriginRange = null;
        this.lastFillHoveredAddress = null;
        this.clearFillPreview();
        if (source && target && source !== target) this.fillMatrix(source, target);
      }
    },

    bindEvents() {
      const root = this.mountPoint;
      if (!root) return;

      const undoBtn = root.querySelector('#excel-tool-undo');
      const redoBtn = root.querySelector('#excel-tool-redo');
      if (undoBtn) undoBtn.onclick = () => this.undo();
      if (redoBtn) redoBtn.onclick = () => this.redo();

      root.querySelectorAll('[data-excel-tab]').forEach(button => button.onclick = () => { this.state.activeTab = button.dataset.excelTab; this.render(); if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false); });
      const excelTabs = root.querySelector('.excel-ribbon-tabs');
      if (excelTabs) excelTabs.onkeydown = event => {
        const tabs = Array.from(excelTabs.querySelectorAll('[role="tab"]'));
        const current = tabs.indexOf(event.target);
        if (current < 0 || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
        this.state.activeTab = tabs[next].dataset.excelTab;
        this.render();
        this.mountPoint.querySelector(`[data-excel-tab="${this.state.activeTab}"]`)?.focus();
        if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false);
      };

      root.querySelector('#excel-fill-handle')?.addEventListener('mousedown', event => {
        event.preventDefault();
        event.stopPropagation();
        window.getSelection()?.removeAllRanges();
        this.isDraggingFill = true;
        this.fillOriginRange = this.state.selectedRange || this.state.activeCell;
        this.lastFillHoveredAddress = this.state.activeCell;
      });

      root.querySelector('#excel-fill-handle')?.addEventListener('dblclick', event => {
        event.preventDefault();
        event.stopPropagation();
        this.handleFillDblClick();
      });

      const viewport = root.querySelector('#excel-grid-viewport');
      if (viewport) {
        viewport.onselectstart = event => event.preventDefault();
      }

      const tableGrid = root.querySelector('#excel-table-grid');
      if (tableGrid) {
        tableGrid.onselectstart = event => event.preventDefault();
        tableGrid.onmousedown = event => {
          if (event.target.id === 'excel-fill-handle' || event.target.classList.contains('excel-fill-handle')) {
            event.preventDefault();
            event.stopPropagation();
            window.getSelection()?.removeAllRanges();
            this.isDraggingFill = true;
            this.fillOriginRange = this.state.selectedRange || this.state.activeCell;
            this.lastFillHoveredAddress = this.state.activeCell;
            return;
          }
          const cell = event.target.closest('[data-address]');
          if (!cell || event.button !== 0) return;

          const formulaInput = root.querySelector('#excel-formula-input');
          if (document.activeElement === formulaInput && /[\+\-\*\/\(\,\:\=\&]\s*$/.test(formulaInput.value)) {
            event.preventDefault();
            formulaInput.value += cell.dataset.address;
            formulaInput.focus();
            return;
          }

          event.preventDefault();
          window.getSelection()?.removeAllRanges();
          const address = cell.dataset.address;
          if (event.shiftKey) {
            this.selectCell(address, true);
          } else {
            this.isDraggingSelection = true;
            this.dragSelectionStart = address;
            this.lastHoveredAddress = address;
            this.state.activeCell = address;
            this.state.selectedRange = address;
            this.updateSelectionUI();
          }
        };

        tableGrid.ondblclick = event => {
          const cell = event.target.closest('[data-address]');
          if (cell) this.beginEdit(cell.dataset.address);
        };
      }
      root.querySelector('#excel-name-box').onkeydown = event => { if (event.key === 'Enter') { this.setSelection(event.currentTarget.value); event.currentTarget.blur(); } };
      const formula = root.querySelector('#excel-formula-input');
      formula.onkeydown = event => { if (event.key === 'Enter') { event.preventDefault(); this.commitEdit(formula.value); this.moveCell(1, 0); } };
      root.querySelector('[data-excel-action="commit-formula"]').onclick = () => this.commitEdit(formula.value);
      root.querySelectorAll('[data-function]').forEach(button => button.onclick = () => { formula.value = `=${button.dataset.function}(${this.state.selectedRange})`; formula.focus(); });
      root.querySelectorAll('[data-decision]').forEach(select => select.onchange = () => { this.state.decision[select.dataset.decision] = select.value; this.saveSnapshot(); if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false); });
      root.querySelector('[data-histogram-width]').onchange = event => { this.state.histogram.classWidth = Number(event.target.value); this.saveSnapshot(); if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false); };
      root.querySelector('[data-chart-choice]').onchange = event => { this.state.chartSelection = event.target.value; this.saveSnapshot(); if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false); };
      root.querySelectorAll('[data-excel-action]').forEach(control => {
        if (control.dataset.function) return;
        const action = control.dataset.excelAction;
        const apply = () => this.runAction(action, control);
        if (control.tagName === 'SELECT' || control.type === 'color' || control.type === 'checkbox' || control.type === 'number' || control.type === 'text') control.onchange = apply;
        else control.onclick = apply;
      });
      root.querySelectorAll('[data-chart-field]').forEach(input => input.onchange = () => { if (this.state.chart) this.state.chart[input.dataset.chartField] = input.value; this.saveSnapshot(); if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false); });
      root.querySelector('#excel-table-grid')?.addEventListener('keydown', event => this.handleGridKey(event));
      root.addEventListener('paste', event => {
        const text = event.clipboardData?.getData('text'); if (!text) return;
        event.preventDefault(); this.pasteText(text);
      });
      root.querySelectorAll('.excel-col-header').forEach(header => header.onclick = () => this.setSelection(`${columnName(Number(header.dataset.col) - 1)}1:${columnName(Number(header.dataset.col) - 1)}${ROWS}`));
      root.querySelectorAll('.row-num').forEach(header => {
        header.onclick = () => {
          const row = header.textContent.trim();
          if (row && !isNaN(row)) this.setSelection(`A${row}:${columnName(COLS - 1)}${row}`);
        };
      });
      root.querySelector('.corner-header')?.addEventListener('click', () => this.setSelection(`A1:${columnName(COLS - 1)}${ROWS}`));
      const gap = root.querySelector('[data-chart-gap]');
      if (gap) gap.onchange = () => { if (this.state.chart) { this.state.chart.gapWidth = Number(gap.value); this.state.histogram.gapWidth = Number(gap.value); this.saveSnapshot(); this.render(); if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false); } };
    },

    handleGridKey(event) {
      if (event.target !== this.mountPoint.querySelector('#excel-table-grid')) return;
      if (event.target.matches('input, select, button, textarea')) return;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); this.undo(); return; }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') { event.preventDefault(); this.redo(); return; }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'd') { event.preventDefault(); this.fillSelectionDown(); return; }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c') { this.state.clipboard = this.getSelectedValues(); return; }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'v') { if (this.state.clipboard.length) { event.preventDefault(); this.pasteMatrix(this.state.clipboard); } return; }
      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        const selected = this.selectedAddresses();
        selected.forEach(address => { delete this.state.cells[address]; });
        this.saveSnapshot();
        this.renderValues();
        if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false);
        return;
      }
      if (event.key === 'F2' || (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey)) {
        if (!['Tab', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
          event.preventDefault();
          this.beginEdit(this.state.activeCell);
          const editor = this.mountPoint.querySelector('.excel-inline-editor');
          if (editor && event.key.length === 1) { editor.value = event.key; editor.setSelectionRange(editor.value.length, editor.value.length); }
        }
        return;
      }
      const movements = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
      if (movements[event.key]) {
        event.preventDefault();
        if (event.shiftKey) {
          this.extendSelection(...movements[event.key]);
        } else {
          this.moveCell(...movements[event.key]);
        }
        return;
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        this.moveCell(event.shiftKey ? -1 : 1, 0);
        return;
      }
      if (event.key === 'Tab') {
        event.preventDefault();
        this.moveCell(0, event.shiftKey ? -1 : 1);
        return;
      }
    },

    getSelectedValues() {
      const range = this.state.selectedRange.split(':'); const a = addressParts(range[0]); const b = addressParts(range[1] || range[0]);
      return Array.from({ length: Math.abs(b.row - a.row) + 1 }, (_, r) => Array.from({ length: Math.abs(b.col - a.col) + 1 }, (_, c) => this.getRaw(addressOf(Math.min(a.row, b.row) + r, Math.min(a.col, b.col) + c))));
    },

    pasteText(text) {
      this.pasteMatrix(text.replace(/\r/g, '').split('\n').filter(Boolean).map(row => row.split('\t')));
    },

    pasteMatrix(matrix) {
      const start = addressParts(this.state.activeCell); if (!start) return;
      matrix.forEach((row, r) => row.forEach((value, c) => this.setRaw(addressOf(start.row + r, start.col + c), value)));
      this.state.selectedRange = `${this.state.activeCell}:${addressOf(start.row + matrix.length - 1, start.col + Math.max(0, ...matrix.map(row => row.length)) - 1)}`;
      this.saveSnapshot();
      this.render();
      if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false);
    },

    fillDown(source, target) {
      this.fillMatrix(source, target);
    },

    fillMatrix(source, target) {
      const sParts = String(source).split(':');
      const sFirst = addressParts(sParts[0]);
      const sLast = addressParts(sParts[1] || sParts[0]);
      const tPoint = addressParts(target);
      if (!sFirst || !sLast || !tPoint) return;

      const sMinRow = Math.min(sFirst.row, sLast.row);
      const sMaxRow = Math.max(sFirst.row, sLast.row);
      const sMinCol = Math.min(sFirst.col, sLast.col);
      const sMaxCol = Math.max(sFirst.col, sLast.col);

      const mMinRow = Math.min(sMinRow, tPoint.row);
      const mMaxRow = Math.max(sMaxRow, tPoint.row);
      const mMinCol = Math.min(sMinCol, tPoint.col);
      const mMaxCol = Math.max(sMaxCol, tPoint.col);

      const srcRowCount = sMaxRow - sMinRow + 1;
      const srcColCount = sMaxCol - sMinCol + 1;

      // Check numeric progressions per column (if srcRowCount >= 2)
      const colProgressions = {};
      for (let c = sMinCol; c <= sMaxCol; c++) {
        if (srcRowCount >= 2) {
          const vals = [];
          for (let r = sMinRow; r <= sMaxRow; r++) {
            const raw = this.getRaw(addressOf(r, c)).trim();
            const num = Number(raw);
            if (raw !== '' && Number.isFinite(num) && !raw.startsWith('=')) {
              vals.push(num);
            } else {
              break;
            }
          }
          if (vals.length === srcRowCount) {
            const step = vals[1] - vals[0];
            let isProg = true;
            for (let i = 2; i < vals.length; i++) {
              if (Math.abs((vals[i] - vals[i - 1]) - step) > 1e-9) { isProg = false; break; }
            }
            if (isProg) {
              colProgressions[c] = { first: vals[0], last: vals[vals.length - 1], step };
            }
          }
        }
      }

      for (let r = mMinRow; r <= mMaxRow; r++) {
        for (let c = mMinCol; c <= mMaxCol; c++) {
          if (r >= sMinRow && r <= sMaxRow && c >= sMinCol && c <= sMaxCol) continue;

          const mappedCol = sMinCol + (((c - sMinCol) % srcColCount + srcColCount) % srcColCount);
          const prog = colProgressions[mappedCol];

          let newVal;
          if (prog && srcRowCount >= 2) {
            if (r > sMaxRow) {
              const num = prog.last + prog.step * (r - sMaxRow);
              newVal = String(Math.round(num * 1e9) / 1e9);
            } else if (r < sMinRow) {
              const num = prog.first - prog.step * (sMinRow - r);
              newVal = String(Math.round(num * 1e9) / 1e9);
            } else {
              const mappedRow = sMinRow + (((r - sMinRow) % srcRowCount + srcRowCount) % srcRowCount);
              newVal = this.getRaw(addressOf(mappedRow, mappedCol));
            }
          } else {
            const mappedRow = sMinRow + (((r - sMinRow) % srcRowCount + srcRowCount) % srcRowCount);
            const srcAddr = addressOf(mappedRow, mappedCol);
            const srcRaw = this.getRaw(srcAddr);
            const rowDelta = r - mappedRow;
            const colDelta = c - mappedCol;
            newVal = srcRaw.startsWith('=')
              ? this.adjustFormula(srcRaw, rowDelta, colDelta)
              : srcRaw;
          }

          this.setRaw(addressOf(r, c), newVal);
        }
      }

      this.state.selectedRange = (mMinRow === mMaxRow && mMinCol === mMaxCol)
        ? addressOf(mMinRow, mMinCol)
        : `${addressOf(mMinRow, mMinCol)}:${addressOf(mMaxRow, mMaxCol)}`;
      this.saveSnapshot();
      this.render();
      if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false);
    },

    fillSelectionDown() {
      const parts = this.state.selectedRange.split(':');
      const from = addressParts(parts[0]); const to = addressParts(parts[1] || parts[0]);
      if (!from || !to || to.row <= from.row) return;
      this.fillMatrix(`${addressOf(from.row, Math.min(from.col, to.col))}:${addressOf(from.row, Math.max(from.col, to.col))}`, addressOf(to.row, Math.max(from.col, to.col)));
    },

    finishFill() {
      if (!this.state.fillSource && !this.fillOriginRange) return;
      const source = this.fillOriginRange || this.state.fillSource;
      const target = this.lastFillHoveredAddress || this.state.fillTarget || source;
      this.state.fillSource = '';
      this.state.fillTarget = '';
      this.fillOriginRange = null;
      this.lastFillHoveredAddress = null;
      this.clearFillPreview();
      if (source && target && source !== target) this.fillMatrix(source, target);
    },

    updateFillPreview(source, target) {
      if (!this.mountPoint) return;
      const sParts = String(source).split(':');
      const sFirst = addressParts(sParts[0]);
      const sLast = addressParts(sParts[1] || sParts[0]);
      const tPoint = addressParts(target);
      if (!sFirst || !sLast || !tPoint) return;

      const mMinRow = Math.min(sFirst.row, sLast.row, tPoint.row);
      const mMaxRow = Math.max(sFirst.row, sLast.row, tPoint.row);
      const mMinCol = Math.min(sFirst.col, sLast.col, tPoint.col);
      const mMaxCol = Math.max(sFirst.col, sLast.col, tPoint.col);

      const previewBox = this.mountPoint.querySelector('#excel-fill-preview-box');
      const startCell = this.mountPoint.querySelector(`[data-address="${addressOf(mMinRow, mMinCol)}"]`);
      const endCell = this.mountPoint.querySelector(`[data-address="${addressOf(mMaxRow, mMaxCol)}"]`);
      if (previewBox && startCell && endCell) {
        const top = startCell.offsetTop;
        const left = startCell.offsetLeft;
        const width = (endCell.offsetLeft + endCell.offsetWidth) - left;
        const height = (endCell.offsetTop + endCell.offsetHeight) - top;
        previewBox.style.display = 'block';
        previewBox.style.top = `${top}px`;
        previewBox.style.left = `${left}px`;
        previewBox.style.width = `${width}px`;
        previewBox.style.height = `${height}px`;
      }
    },

    clearFillPreview() {
      if (!this.mountPoint) return;
      const previewBox = this.mountPoint.querySelector('#excel-fill-preview-box');
      if (previewBox) previewBox.style.display = 'none';
    },

    adjustFormula(formula, rowShift, colShift) {
      return formula.replace(/(\$?)([A-Za-z]{1,3})(\$?)(\d+)/gi, (whole, absCol, col, absRow, row) => {
        const point = addressParts(`${col}${row}`); if (!point) return whole;
        const newCol = absCol ? col.toUpperCase() : columnName(Math.max(0, point.col - 1 + colShift));
        const newRow = absRow ? row : Math.max(1, point.row + rowShift);
        return `${absCol}${newCol}${absRow}${newRow}`;
      });
    },

    runAction(action, control) {
      const s = this.state;
      const selected = this.selectedAddresses();
      const updateStyles = callback => selected.forEach(address => callback(s.styles[address] || (s.styles[address] = {}), address));
      if (action === 'bold') updateStyles(style => { style.bold = !style.bold; });
      else if (action === 'italic') updateStyles(style => { style.italic = !style.italic; });
      else if (action === 'fill-color') updateStyles(style => { style.fill = control.value; });
      else if (action === 'font-color') updateStyles(style => { style.color = control.value; });
      else if (action === 'borders') updateStyles(style => { style.border = !style.border; });
      else if (action.startsWith('align-')) updateStyles(style => { style.align = action.slice(6); });
      else if (action === 'number-format') selected.forEach(address => { s.numberFormats[address] = control.value; });
      else if (action === 'column-width') s.columnWidths[addressParts(s.activeCell).col] = Number(control.value);
      else if (action === 'row-height') s.rowHeights[addressParts(s.activeCell).row] = Number(control.value);
      else if (action === 'merge') { s.mergedRanges.push(s.selectedRange); updateStyles(style => { style.align = 'center'; }); }
      else if (action === 'sort-asc' || action === 'sort-desc') this.sortSelection(action === 'sort-asc');
      else if (action === 'filter') {
        s.filterEnabled = !s.filterEnabled;
        if (s.filterEnabled) {
          const colLetter = columnName(addressParts(s.activeCell)?.col - 1 || 0);
          s.filterColumn = colLetter;
          s.filterValue = (prompt ? prompt(`Filter Column ${colLetter} containing:`, '') : '') || '';
        }
      }
      else if (action === 'freeze') s.freezeTopRow = !s.freezeTopRow;
      else if (action === 'conditional-value') s.conditionalGreaterThan = Number(control.value);
      else if (action === 'conditional-apply') s.conditionalGreaterThan = Number(this.mountPoint.querySelector('[data-excel-action="conditional-value"]').value);
      else if (action === 'toolpak') s.analysisEnabled = !s.analysisEnabled;
      else if (action === 'analysis-open') { s.analysisOpen = true; s.activeTab = 'data'; }
      else if (action === 'analysis-type') s.analysisType = control.value;
      else if (action === 'input-range') s.inputRange = control.value.toUpperCase();
      else if (action === 'bin-range') {
        s.binRange = control.value.toUpperCase();
        s.histogram.bins = this.valuesFromRange(s.binRange).flat().map(Number).filter(Number.isFinite);
      }
      else if (action === 'output-cell') s.outputCell = control.value.toUpperCase();
      else if (action === 'summary-stats') s.summaryStatistics = control.checked;
      else if (action === 'chart-output') s.chartOutput = control.checked;
      else if (action === 'analysis-run') this.runAnalysis();
      else if (['chart-column', 'chart-bar', 'chart-line', 'chart-pie', 'chart-scatter', 'chart-histogram'].includes(action)) this.insertChart(action.slice(6));
      else if (action === 'chart-elements') { s.chartElementsAdded = true; if (s.chart) { s.chart.xTitle = s.chart.xTitle || 'Category'; s.chart.yTitle = s.chart.yTitle || 'Value (units)'; s.chart.title = s.chart.title || 'Experiment results'; } }
      else if (action === 'chart-labels') s.chartLabelsPercent = true;
      else if (action === 'chart-format') { s.chartFormatted = true; if (s.chart) { s.chart.formatted = true; s.chart.formattedElement = true; } }
      else if (action === 'axis-type') s.chartAxisType = control.value;
      else if (action === 'marker-style') s.markerStyle = control.value;
      else if (action === 'toggle-axis') s.verticalAxisVisible = !s.verticalAxisVisible;
      else if (action === 'toggle-gridlines') s.gridlinesVisible = !s.gridlinesVisible;
      else if (action === 'save-chart-fields') { if (s.chart) this.mountPoint.querySelectorAll('[data-chart-field]').forEach(input => s.chart[input.dataset.chartField] = input.value); }
      this.saveSnapshot();
      this.render();
      if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false);
    },

    sortSelection(ascending) {
      const range = this.state.selectedRange.split(':'); const start = addressParts(range[0]); const end = addressParts(range[1] || range[0]);
      const firstCol = Math.min(start.col, end.col); const lastCol = Math.max(start.col, end.col);
      const activeCol = addressParts(this.state.activeCell)?.col || firstCol;
      const sortColOffset = Math.max(0, Math.min(lastCol - firstCol, activeCol - firstCol));
      const rows = [];
      for (let row = start.row; row <= end.row; row++) {
        rows.push({
          origRow: row,
          raws: Array.from({ length: lastCol - firstCol + 1 }, (_, offset) => this.getRaw(addressOf(row, firstCol + offset))),
          sortVal: this.getValue(addressOf(row, firstCol + sortColOffset))
        });
      }
      const hasHeader = start.row === 1;
      const header = hasHeader ? rows.shift() : null;
      rows.sort((a, b) => {
        const an = Number(a.sortVal); const bn = Number(b.sortVal);
        const order = a.sortVal !== '' && b.sortVal !== '' && Number.isFinite(an) && Number.isFinite(bn) ? an - bn : String(a.sortVal).localeCompare(String(b.sortVal));
        return ascending ? order : -order;
      });
      if (header) rows.unshift(header);
      rows.forEach((rowObj, rowOffset) => {
        const targetRow = start.row + rowOffset;
        rowObj.raws.forEach((raw, columnOffset) => {
          let updatedRaw = raw;
          if (typeof raw === 'string' && raw.startsWith('=')) {
            updatedRaw = this.adjustFormula(raw, targetRow - rowObj.origRow, 0);
          }
          this.setRaw(addressOf(targetRow, firstCol + columnOffset), updatedRaw);
        });
      });
      this.state.selectedSort = ascending ? 'A-Z' : 'Z-A';
      this.saveSnapshot();
    },

    runAnalysis() {
      const s = this.state; const rangeText = s.inputRange || s.selectedRange; const values = this.valuesFromRange(rangeText).flat().map(Number).filter(Number.isFinite);
      if (!values.length) return;
      const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
      const deviation = Math.sqrt(values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / Math.max(1, values.length - 1));
      const output = s.outputCell || 'E2'; const point = addressParts(output); if (!point) return;
      s.statsGenerated = true;
      if (s.analysisType === 'Histogram') {
        const bins = s.histogram.bins.length ? s.histogram.bins : [50, 60, 70, 80, 90, 100];
        const counts = bins.map((bin, index) => values.filter(value => value <= bin && (index === 0 || value > bins[index - 1])).length);
        counts.forEach((count, index) => { this.setRaw(addressOf(point.row + index, point.col + 1), count); this.setRaw(addressOf(point.row + index, point.col), `${index ? bins[index - 1] + 1 : bins[0] - s.histogram.classWidth + 1}-${bins[index]}`); });
        s.histogramGenerated = true;
        if (s.chartOutput) this.insertChart('histogram', `${output}:${addressOf(point.row + bins.length - 1, point.col + 1)}`);
      } else {
        const stats = [['Statistic', 'Value'], ['Mean', mean], ['Standard Deviation', deviation], ['Standard Error', deviation / Math.sqrt(values.length)], ['Count', values.length]];
        stats.forEach((row, r) => row.forEach((value, c) => this.setRaw(addressOf(point.row + r, point.col + c), value)));
      }
      this.saveSnapshot();
    },

    valuesFromRange(rangeText) {
      const parts = String(rangeText || '').replace(/\$/g, '').toUpperCase().split(':'); const a = addressParts(parts[0]); const b = addressParts(parts[1] || parts[0]);
      if (!a || !b) return [];
      const rows = [];
      for (let row = Math.min(a.row, b.row); row <= Math.max(a.row, b.row); row++) {
        const values = [];
        for (let col = Math.min(a.col, b.col); col <= Math.max(a.col, b.col); col++) values.push(this.getValue(addressOf(row, col)));
        rows.push(values);
      }
      return rows;
    },

    insertChart(type, rangeText) {
      const range = rangeText || this.state.selectedRange; const rows = this.valuesFromRange(range);
      if (rows.length < 1) return;
      const header = rows[0];
      const firstRowHasHeadings = header.some(value => typeof value === 'string' && !Number.isFinite(Number(value)));
      const dataRows = type === 'histogram' || rows.length === 1 || !firstRowHasHeadings ? rows : rows.slice(1);
      let labels = dataRows.map((row, index) => String(row[0] || index + 1));
      const colCount = Math.max(...dataRows.map(r => r.length));
      const series = [];

      // A raw one-column score list should be binned rather than rendered as
      // one bar per observation. ToolPak output already has interval/count
      // columns, so leave that range intact.
      if (type === 'histogram' && dataRows.every(row => row.length === 1)) {
        const samples = dataRows.map(row => Number(row[0])).filter(Number.isFinite);
        if (!samples.length) return;
        const classWidth = Math.max(1, Number(this.state.histogram.classWidth) || 10);
        const firstLower = Math.floor((Math.min(...samples) - 1) / classWidth) * classWidth + 1;
        const binCount = Math.max(1, Math.ceil((Math.max(...samples) - firstLower + 1) / classWidth));
        labels = Array.from({ length: binCount }, (_, index) => {
          const lower = firstLower + index * classWidth;
          return `${lower}–${lower + classWidth - 1}`;
        });
        const counts = Array(binCount).fill(0);
        samples.forEach(value => {
          const index = Math.floor((value - firstLower) / classWidth);
          if (index >= 0 && index < counts.length) counts[index] += 1;
        });
        series.push({ name: 'Frequency', values: counts });
      }

      if (!series.length && colCount > 1) {
        for (let c = 1; c < colCount; c++) {
          const sName = firstRowHasHeadings ? String(header[c] || `Series ${c}`) : `Series ${c}`;
          const sVals = dataRows.map(r => Number(r[c])).filter(Number.isFinite);
          series.push({ name: sName, values: sVals });
        }
      } else if (!series.length) {
        series.push({ name: 'Series 1', values: dataRows.map(r => Number(r[0])).filter(Number.isFinite) });
      }

      const values = series[0]?.values || [];
      this.state.chart = {
        type: type,
        subtype: type === 'pie' ? '2-D Pie' : '',
        lineMode: type === 'scatter' ? 'markers' : '',
        labels,
        xValues: type === 'scatter' ? dataRows.map(row => Number(row[0])) : [],
        values,
        series,
        title: '',
        xTitle: '',
        yTitle: '',
        gapWidth: type === 'histogram' ? this.state.histogram.gapWidth : 30,
        seriesCount: Math.max(1, series.length),
        range,
        axisVisible: true
      };
      this.state.chartSelection = type;
      this.saveSnapshot();
      this.render();
      if (window.PlaygroundManager) window.PlaygroundManager.checkCurrentTask(false);
    }
  };

  window.MiniExcel = MiniExcel;
})();
