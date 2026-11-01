/**
 * Office Skills Lab - Interactive Study & Lab Reference
 * Benha University - Shoubra | ELE123 / ELE114 Technical Reports
 */

(function () {
  'use strict';

  // Safe localStorage helper
  const storage = {
    get: function (key, fallback) {
      try {
        const item = localStorage.getItem('osl_' + key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        console.warn('localStorage read error:', e);
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem('osl_' + key, JSON.stringify(value));
      } catch (e) {
        console.warn('localStorage write error:', e);
      }
    }
  };

  // State
  let state = {
    lessons: window.LESSONS || [],
    currentLessonId: null,
    activeTab: 'guide',
    searchQuery: '',
    completedSteps: storage.get('completed_steps', {}),
    challengeAnswers: storage.get('challenge_answers', {}),
    notes: storage.get('notes', {}),
    theme: storage.get('theme', null),
    language: storage.get('language', 'en'),
    sidebarOpen: window.matchMedia('(min-width: 901px)').matches,
    mobileLayout: window.matchMedia('(max-width: 900px)').matches
  };

  // DOM Elements
  const elements = {
    body: document.body,
    themeToggle: document.getElementById('theme-toggle'),
    themeIcon: document.getElementById('theme-icon'),
    themeText: document.getElementById('theme-text'),
    menuToggle: document.getElementById('menu-toggle'),
    sidebar: document.getElementById('app-sidebar'),
    sidebarOverlay: document.getElementById('sidebar-overlay'),
    sidebarNav: document.getElementById('sidebar-nav'),
    overallProgressFill: document.getElementById('overall-progress-fill'),
    overallProgressText: document.getElementById('overall-progress-text'),
    contentArea: document.getElementById('content-area'),
    searchInput: document.getElementById('search-input'),
    languageToggle: document.getElementById('language-toggle'),
    languageText: document.getElementById('language-text'),
    downloadProjectBtn: document.getElementById('download-project-btn')
  };

  const translations = {
    en: {
      skip: 'Skip to lesson content', search: 'Search rules, paths, or topics...', searchLabel: 'Search lessons and technical rules',
      topics: 'Course Topics', lessons: 'Course lessons', progress: 'Study Progress',
      brand: 'Technical Reports', lessonLanguageNote: '',
      download: 'Save to Device (.ZIP)', downloadTitle: 'Download all files in one folder on your device (.ZIP)',
      deadline: '📅 Due: Tue 17 Nov 2026', themeTitle: 'Toggle dark/light mode',
      welcome: 'Technical Reports', welcomeText: 'Your interactive reference guide for ELE123 Technical Reports (ELE114 Technical Report Writing) taught by Dr. Christina Gamal at Benha University (Shoubra).',
      welcomeHint: 'Select any lesson from the sidebar to view requirements, official Word/Excel 365 menu paths, practice exercises, and checklists.',
      abstract: 'Why this matters',
      simulatorNote: 'These focused practice emulators model the tools needed for this lesson. They are training aids, not full Microsoft Word or Excel replacements.',
      guideExpected: 'Expected Output',
      abstractLead: 'This lesson helps you produce clearer, more consistent technical reports and avoid common submission errors.',
      emulationTitle: 'Practice emulator',
      course: 'Course', due: 'Assignment Deadline', software: 'Primary Software',
      noTopics: 'No topics matching', requirements: "Professor's Requirements (Rules)", steps: 'Step-by-Step Procedure',
      completed: 'completed', markStep: 'Mark step', verified: '✓ Lab Verified', verifiedTitle: 'Verified in Lab Simulator',
      expectedOutput: 'Expected result', previewDisclaimer: 'Illustration of the expected result · not a screenshot',
      selfMarked: '✓ Self-Marked', selfMarkedTitle: 'Marked by student', practice: 'Immediate Practice Task',
      mistakes: 'Common Mistakes to Avoid', check: 'Finished Result Quality Check',
      notes: 'My Lab & Submission Notes', autoSaved: 'Auto-saved to browser',
      notesPlaceholder: 'Type personal reminders, observations, or draft details for your report here...',
      previous: 'Previous Topic', next: 'Next Topic', challenge: 'Knowledge & Practical Challenge',
      correct: 'Correct', correctBang: '✓ Correct!', keepMind: '✕ Keep in Mind:', retry: '🔄 Try Again',
      checklistReady: 'Practical Checklist Ready', checklistHint: 'Review the Study Guide checklist items and verify your Word or Excel files directly.',
      views: 'Lesson Views', guide: 'Guide', lab: 'Lab', quiz: 'Quiz', more: 'More for this lesson',
      moreHint: 'Requirements, practice, tips & notes', goal: 'Goal:', standard: 'Office 365 Standard',
      saved: 'Saved ✓', saving: 'Saving...', languageLabel: 'Switch to Egyptian Arabic'
    },
    ar: {
      skip: 'روح لمحتوى الدرس', search: 'دوّر على قاعدة أو خطوة أو موضوع...', searchLabel: 'ابحث في الدروس والقواعد الفنية',
      topics: 'مواضيع الكورس', lessons: 'دروس الكورس', progress: 'تقدمك في المذاكرة',
      brand: 'التقارير الفنية', lessonLanguageNote: 'محتوى الدرس والخطوات بالإنجليزي عشان أسماء قوائم Word وExcel تبقى زي البرنامج.',
      download: 'حمّل على جهازك (.ZIP)', downloadTitle: 'حمّل كل الملفات في ملف ZIP واحد',
      deadline: '📅 التسليم: الثلاثاء ١٧ نوفمبر ٢٠٢٦', themeTitle: 'غيّر الوضع الفاتح أو الداكن',
      welcome: 'التقارير الفنية', welcomeText: 'دليلك التفاعلي لمقرر التقارير الفنية ELE123 والكتابة الفنية ELE114 مع د. كريستينا جمال، جامعة بنها - شبرا.',
      welcomeHint: 'اختار درس من القائمة عشان تشوف المطلوب وخطوات Word وExcel والتمارين وقوائم المراجعة.',
      abstract: 'أهمية الدرس',
      simulatorNote: 'المحاكاة دي للتدريب على الخطوات المطلوبة بس، ومش بديل كامل لبرنامج Microsoft Word أو Excel.',
      guideExpected: 'Expected Output · الشكل النهائي المتوقع',
      abstractLead: 'الجزء ده هيساعدك تطلع تقرير فني أوضح ومنسق، وتتفادى أخطاء شائعة وقت التسليم.',
      emulationTitle: 'محاكي للتدريب',
      course: 'المقرر', due: 'ميعاد التسليم', software: 'البرامج المستخدمة',
      noTopics: 'مفيش مواضيع مطابقة لـ', requirements: 'المطلوب في الدرس', steps: 'الخطوات بالترتيب',
      completed: 'اتعملت', markStep: 'علّم على الخطوة', verified: '✓ اتأكدت في المعمل', verifiedTitle: 'تم التحقق في المحاكي',
      expectedOutput: 'الشكل المتوقع', previewDisclaimer: 'رسم توضيحي للشكل المتوقع · مش لقطة شاشة',
      selfMarked: '✓ علّمت عليها بنفسك', selfMarkedTitle: 'تم تحديدها يدويًا', practice: 'جرّب بنفسك',
      mistakes: 'غلطات خلي بالك منها', check: 'راجع النتيجة النهائية',
      notes: 'ملاحظاتي', autoSaved: 'بتتحفظ تلقائي في المتصفح',
      notesPlaceholder: 'اكتب هنا ملاحظاتك أو أفكارك أو تفاصيل مسودة التقرير...',
      previous: 'الدرس السابق', next: 'الدرس التالي', challenge: 'اختبر فهمك',
      correct: 'صح', correctBang: '✓ إجابة صح!', keepMind: '✕ خلي بالك:', retry: '🔄 جرّب تاني',
      checklistReady: 'قائمة المراجعة جاهزة', checklistHint: 'راجع عناصر دليل المذاكرة واتأكد من ملفات Word أو Excel بتاعتك.',
      views: 'أقسام الدرس', guide: 'الشرح', lab: 'التطبيق', quiz: 'اختبار', more: 'تفاصيل زيادة للدرس',
      moreHint: 'المطلوب، تدريب، نصايح وملاحظات', goal: 'الهدف:', standard: 'معيار Office 365',
      saved: 'اتحفظت ✓', saving: 'بيتحفظ...', languageLabel: 'غيّر اللغة للإنجليزي'
    }
  };

  function t(key) {
    return translations[state.language]?.[key] || translations.en[key] || key;
  }

  const lessonArabic = {
    'w01-page-setup': { title: 'إعداد الصفحة والهوامش', goal: 'ظبّط حجم الورق على A4 والهوامش المناسبة قبل ما تبدأ كتابة التقرير.', abstract: 'الإعداد الصح للصفحة من البداية بيمنع مشاكل الطباعة والتجليد وبيخلي شكل التقرير ثابت.' },
    'w02-cover-page': { title: 'صفحة الغلاف', goal: 'اعمل غلاف رسمي فيه عنوان المشروع وبيانات الطالب وتاريخ التسليم من غير رقم صفحة ظاهر.', abstract: 'الغلاف المرتب بيوضح بيانات التقرير وصاحبه من أول نظرة ويدي انطباع أكاديمي منظم.' },
    'w03-page-numbering': { title: 'ترقيم الصفحات والفواصل', goal: 'استخدم الأرقام الرومانية للصفحات التمهيدية وابدأ ترقيم متن التقرير من 1.', abstract: 'تقسيم الترقيم بيفصل المقدمة والفهارس عن متن التقرير وبيسهّل الرجوع لأي جزء.' },
    'w04-headers-footers': { title: 'الرأس والتذييل', goal: 'ظبّط رأس وتذييل الصفحات مع بيانات الطالب بحجم مناسب وترقيم تلقائي.', abstract: 'الرأس والتذييل بيساعدوا القارئ يعرف بيانات التقرير ورقم الصفحة من غير ما يقطعوا القراءة.' },
    'w05-text-formatting': { title: 'تنسيق النص والخط والمحاذاة', goal: 'نسّق متن التقرير بخط Times New Roman مقاس 12 ومحاذاة Justify، واكتب العناوين بحالة الجملة.', abstract: 'التنسيق الموحد بيخلّي التقرير أسهل في القراءة وأكثر احترافية، وبيقلل اختلاف شكل الصفحات.' },
    'w06-headings-toc': { title: 'العناوين والفهرس', goal: 'نسّق مستويات العناوين باستخدام الأنماط الجاهزة وأنشئ فهرس تلقائي قابل للتحديث.', abstract: 'العناوين المنظمة بتوضح تسلسل الأفكار وبتسمح لـ Word يبني فهرس دقيق ويتحدث بعد التعديل.' },
    'w07-line-spacing': { title: 'تباعد السطور والفقرات', goal: 'استخدم تباعد 1.5 للنص واضبط المسافات قبل الفقرات وبعدها.', abstract: 'المسافات المناسبة بتخلي التقرير مقروء وتدي مساحة للمراجعة من غير فراغات عشوائية.' },
    'w08-indentation-centering': { title: 'المسافة البادئة والتوسيط', goal: 'ظبّط بداية الفقرات ووسّط الأشكال والجداول بالطريقة المناسبة.', abstract: 'المحاذاة والمسافات الثابتة بتحافظ على شكل الصفحة وتخلي العناصر البصرية واضحة.' },
    'w09-figures': { title: 'الأشكال والتعليقات التوضيحية', goal: 'أدرج الأشكال واكتب تعليق مرقم بخط عريض أسفل كل شكل مع الإشارة إليه في النص.', abstract: 'التعليقات والترقيم بيساعدوا القارئ يحدد كل شكل ويفهم علاقته بشرح التقرير.' },
    'w10-tables': { title: 'الجداول وعناوينها', goal: 'أنشئ جداول واضحة بعنوان عريض فوق الجدول واستخدم شرطة للخانات اللي مفيهاش بيانات.', abstract: 'الجدول المنظم بيعرض النتائج بسرعة، والعنوان والرموز الواضحة بيمنعوا سوء فهم البيانات.' },
    'w11-tables-figures-lists': { title: 'فهرس الأشكال والجداول', goal: 'أنشئ قوائم تلقائية للأشكال والجداول وحدّثها في الصفحات التمهيدية.', abstract: 'القوائم التلقائية بتسهّل الوصول للأشكال والجداول وبتتحدث لما أرقام الصفحات تتغير.' },
    'w12-equations': { title: 'المعادلات والرموز الرياضية', goal: 'وسّط المعادلات ورقّمها بالتتابع واربطها بإشارات واضحة داخل النص.', abstract: 'كتابة المعادلات بشكل موحد بتوضح خطوات التحليل وتسهّل الإشارة لكل معادلة أثناء الشرح.' },
    'w13-citations-references': { title: 'الاقتباسات والمراجع بنظام IEEE', goal: 'أضف المصادر بنظام IEEE واستخدم أرقام الاقتباس داخل النص وأنشئ قائمة مراجع.', abstract: 'توثيق المصادر بيحفظ حقوق أصحابها ويدعم النتائج وبيخلّي القارئ يراجع المراجع بسهولة.' },
    'w14-styles-themes': { title: 'الأنماط والسمات', goal: 'استخدم Styles لتوحيد التنسيق وتجنب انتقال التعديلات غير المقصودة بين الأنماط.', abstract: 'الأنماط بتوفر وقت في التنسيق وبتخلي كل العناوين المتشابهة بنفس الشكل.' },
    'e01-entering-data-formulas': { title: 'إدخال البيانات وكتابة المعادلات', goal: 'رتّب بيانات التجربة في أعمدة واستخدم المعادلات لحساب القيم المشتقة.', abstract: 'ترتيب البيانات والمعادلات بيساعدوا على تقليل أخطاء الحساب وتحديث النتائج تلقائيًا.' },
    'e02-summary-statistics': { title: 'الإحصائيات الوصفية والملخصة', goal: 'احسب المتوسط والانحراف المعياري والخطأ المعياري وحجم العينة في Excel.', abstract: 'الإحصائيات بتلخص مجموعة القياسات وبتوضح القيمة المتوسطة ومدى تشتت النتائج.' },
    'e03-chart-anatomy': { title: 'مكونات الرسم البياني', goal: 'حدد العنوان والمحاور ومنطقة الرسم والعناصر الأساسية للرسم البياني.', abstract: 'فهم مكونات الرسم بيساعدك تعرض البيانات بوضوح وتشرح المقارنة أو الاتجاه للقارئ.' },
    'e04-column-bar-charts': { title: 'الأعمدة والأشرطة البيانية', goal: 'اعمل رسوم أعمدة أو أشرطة لمقارنة البيانات الفئوية واختار الاتجاه المناسب للتسميات.', abstract: 'اختيار الرسم المناسب بيخلّي المقارنة بين الفئات أسرع وأسهل في الفهم.' },
    'e05-pie-charts': { title: 'الرسوم الدائرية والنسب', goal: 'اعرض النسب باستخدام رسم دائري واحسب زاوية كل قطاع من النسبة المئوية.', abstract: 'الرسم الدائري مفيد لما الهدف توضيح أجزاء من إجمالي واحد، بشرط إن النسب واضحة.' },
    'e06-line-charts': { title: 'الرسوم الخطية والاتجاهات الزمنية', goal: 'اعرض بيانات الزمن على المحور الأفقي والمتغير المقاس على المحور الرأسي.', abstract: 'الرسم الخطي بيظهر التغير مع الوقت ويساعد على ملاحظة الاتجاهات والأنماط.' },
    'e07-histograms': { title: 'المدرجات التكرارية والتوزيعات', goal: 'احسب فئات البيانات وعرض الفئة واعرض التكرارات في Histogram.', abstract: 'المدرج التكراري بيوضح شكل توزيع البيانات وتجمعها وانتشارها بين الفئات.' },
    'e08-dot-plots': { title: 'مخطط النقاط والقيم الشاذة', goal: 'اعمل Dot Plot لتحديد التكرارات والتجمعات والفجوات والقيم الشاذة.', abstract: 'مخطط النقاط مناسب للمجموعات الصغيرة لأنه بيظهر كل قيمة ويكشف القيم البعيدة.' },
    'e09-choosing-charts': { title: 'اختيار الرسم البياني المناسب', goal: 'اختار نوع الرسم بناءً على نوع البيانات وحجم العينة والهدف من التحليل.', abstract: 'اختيار الرسم على أساس السؤال والبيانات يمنع عرضًا مضللًا ويساعد القارئ يفهم النتيجة.' },
    'r01-report-checklist': { title: 'مراجعة التقرير قبل التسليم', goal: 'راجع التقرير كاملًا مقابل المتطلبات قبل التسليم النهائي.', abstract: 'المراجعة الأخيرة بتلقط النواقص وأخطاء التنسيق قبل التسليم وتزود فرصة إن التقرير يكون كامل.' }
  };

  function getLessonText(lesson, field) {
    if (state.language === 'ar') return lessonArabic[lesson.id]?.[field] || lesson[field] || '';
    return lesson[field] || '';
  }

  function applyLanguage() {
    const isArabic = state.language === 'ar';
    document.documentElement.lang = isArabic ? 'ar-EG' : 'en';
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.body.dataset.language = state.language;
    const setText = (selector, text) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = text;
    };

    setText('.skip-link', t('skip'));
    setText('.brand-text h1', t('brand'));
    setText('.site-footer-prefix', state.language === 'ar' ? 'تنفيذ الموقع بواسطة ' : 'Created by ');
    setText('.overview-title', t('progress'));
    setText('#download-project-btn span:last-child', t('download'));
    setText('.deadline-pill span', t('deadline'));
    if (elements.downloadProjectBtn) elements.downloadProjectBtn.title = t('downloadTitle');
    if (elements.searchInput) {
      elements.searchInput.placeholder = t('search');
      elements.searchInput.setAttribute('aria-label', t('searchLabel'));
    }
    if (elements.menuToggle) elements.menuToggle.setAttribute('aria-label', isArabic ? 'إظهار أو إخفاء قائمة الدروس' : 'Toggle navigation menu');
    if (elements.sidebar) elements.sidebar.setAttribute('aria-label', t('topics'));
    if (elements.sidebarNav) elements.sidebarNav.setAttribute('aria-label', t('lessons'));
    const overallProgress = document.querySelector('.sidebar-overview .progress-track');
    if (overallProgress) overallProgress.setAttribute('aria-label', t('progress'));
    if (elements.contentArea) elements.contentArea.setAttribute('aria-label', isArabic ? 'محتوى الدرس' : 'Lesson content');
    if (elements.languageToggle) {
      elements.languageToggle.setAttribute('aria-label', t('languageLabel'));
      elements.languageToggle.title = t('languageLabel');
    }
    if (elements.languageText) elements.languageText.textContent = isArabic ? 'English' : 'عربي';
    if (elements.themeToggle) elements.themeToggle.title = t('themeTitle');
    updateThemeButton();
  }

  // Initialize theme
  function initTheme() {
    if (state.theme === 'dark' || (!state.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      state.theme = 'dark';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      state.theme = 'light';
    }
    updateThemeButton();
  }

  function toggleTheme() {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    state.theme = nextTheme;
    document.documentElement.setAttribute('data-theme', nextTheme);
    storage.set('theme', nextTheme);
    updateThemeButton();
  }

  function updateThemeButton() {
    if (!elements.themeIcon || !elements.themeText) return;
    if (elements.themeToggle) elements.themeToggle.setAttribute('aria-pressed', state.theme === 'dark' ? 'true' : 'false');
    if (state.theme === 'dark') {
      elements.themeIcon.textContent = '☀️';
      elements.themeText.textContent = state.language === 'ar' ? 'فاتح' : 'Light';
    } else {
      elements.themeIcon.textContent = '🌙';
      elements.themeText.textContent = state.language === 'ar' ? 'داكن' : 'Dark';
    }
  }

  function renderExpectedOutputPreview(lesson, step) {
    const isArabic = state.language === 'ar';
    const description = `${getLessonText(lesson, 'title')}: ${step.text}`;
    const hint = `${step.path || ''} ${step.text || ''}`.toLowerCase();
    const isExcel = (lesson.group || '').toLowerCase().includes('excel');
    let resultVisual = '';

    if (lesson.id === 'e01-entering-data-formulas') {
      resultVisual = `<rect x="92" y="72" width="18" height="58" fill="#f1f3f5"/><rect x="110" y="72" width="214" height="18" fill="#dbeafe"/><rect x="110" y="65" width="214" height="7" fill="#f1f3f5"/><path d="M110 72h214v58H110zM176 72v58M241 72v58M110 91h214M110 110h214M148 65v7M213 65v7M282 65v7M92 91h18M92 110h18" fill="none" stroke="#cbd5e1"/><text x="143" y="70" text-anchor="middle" class="preview-grid-heading">A</text><text x="208" y="70" text-anchor="middle" class="preview-grid-heading">B</text><text x="281" y="70" text-anchor="middle" class="preview-grid-heading">C</text><text x="101" y="84" text-anchor="middle" class="preview-grid-heading">1</text><text x="143" y="84" text-anchor="middle" class="preview-small">Before</text><text x="208" y="84" text-anchor="middle" class="preview-small">After</text><text x="281" y="84" text-anchor="middle" class="preview-small">Difference</text><text x="101" y="104" text-anchor="middle" class="preview-grid-heading">2</text><text x="143" y="104" text-anchor="middle" class="preview-small">142</text><text x="208" y="104" text-anchor="middle" class="preview-small">140</text><text x="281" y="104" text-anchor="middle" class="preview-small">-2</text><text x="101" y="123" text-anchor="middle" class="preview-grid-heading">3</text><text x="143" y="123" text-anchor="middle" class="preview-small">140</text><text x="208" y="123" text-anchor="middle" class="preview-small">136</text><text x="281" y="123" text-anchor="middle" class="preview-small">-4</text>`;
    } else if (lesson.id === 'e02-summary-statistics') {
      resultVisual = `<rect x="132" y="72" width="168" height="58" fill="#fff" stroke="#94a3b8"/><rect x="132" y="72" width="168" height="17" fill="#dbeafe"/><path d="M132 89h168M132 103h168M132 117h168M218 72v58" stroke="#cbd5e1"/><text x="174" y="84" text-anchor="middle" class="preview-small">Statistic</text><text x="258" y="84" text-anchor="middle" class="preview-small">Value</text><text x="174" y="100" class="preview-small">Mean</text><text x="258" y="100" class="preview-small">144.5</text><text x="174" y="114" class="preview-small">Std. Dev.</text><text x="258" y="114" class="preview-small">3.1002</text><text x="174" y="128" class="preview-small">Count</text><text x="258" y="128" class="preview-small">10</text>`;
    } else if (lesson.id === 'e04-column-bar-charts') {
      resultVisual = `<line x1="125" y1="132" x2="315" y2="132" stroke="#64748b"/><line x1="125" y1="76" x2="125" y2="132" stroke="#64748b"/><rect x="148" y="82" width="35" height="50" fill="#107c41"/><rect x="201" y="103" width="35" height="29" fill="#2f75b5"/><rect x="254" y="117" width="35" height="15" fill="#ed7d31"/><text x="165" y="144" text-anchor="middle" class="preview-small">Hospital</text><text x="218" y="144" text-anchor="middle" class="preview-small">Physician</text><text x="271" y="144" text-anchor="middle" class="preview-small">Drugs</text>`;
    } else if (lesson.id === 'e05-pie-charts') {
      resultVisual = `<path d="M216 109 L216 72 A37 37 0 1 1 186 131 Z" fill="#107c41"/><path d="M216 109 L186 131 A37 37 0 0 1 179 96 Z" fill="#2f75b5"/><path d="M216 109 L179 96 A37 37 0 0 1 206 73 Z" fill="#ed7d31"/><path d="M216 109 L206 73 A37 37 0 0 1 216 72 Z" fill="#ffc000"/><text x="270" y="92" class="preview-small">68%</text><text x="270" y="107" class="preview-small">23%</text><text x="270" y="122" class="preview-small">6% · 3%</text><text x="216" y="145" text-anchor="middle" class="preview-small">100% = 360°</text>`;
    } else if (lesson.id === 'e06-line-charts') {
      resultVisual = `<line x1="122" y1="132" x2="320" y2="132" stroke="#64748b"/><line x1="122" y1="75" x2="122" y2="132" stroke="#64748b"/><polyline points="132,125 153,119 174,112 195,104 216,95 237,86 258,78 279,71 300,66 318,60" fill="none" stroke="#107c41" stroke-width="3"/><circle cx="132" cy="125" r="3" fill="#107c41"/><circle cx="195" cy="104" r="3" fill="#107c41"/><circle cx="258" cy="78" r="3" fill="#107c41"/><circle cx="318" cy="60" r="3" fill="#107c41"/><text x="221" y="145" text-anchor="middle" class="preview-small">Year →</text><text x="130" y="72" class="preview-small">Population (Millions)</text>`;
    } else if (lesson.id === 'e07-histograms') {
      resultVisual = `<line x1="120" y1="132" x2="322" y2="132" stroke="#64748b"/><line x1="120" y1="75" x2="120" y2="132" stroke="#64748b"/><rect x="130" y="127" width="30" height="5" fill="#107c41"/><rect x="160" y="121" width="30" height="11" fill="#107c41"/><rect x="190" y="101" width="30" height="31" fill="#107c41"/><rect x="220" y="91" width="30" height="41" fill="#107c41"/><rect x="250" y="61" width="30" height="71" fill="#107c41"/><rect x="280" y="86" width="30" height="46" fill="#107c41"/><text x="215" y="145" text-anchor="middle" class="preview-small">Score intervals · bars touch</text>`;
    } else if (lesson.id === 'e08-dot-plots') {
      resultVisual = `<line x1="122" y1="132" x2="322" y2="132" stroke="#64748b"/><g fill="#107c41"><circle cx="145" cy="124" r="4"/><circle cx="183" cy="124" r="4"/><circle cx="183" cy="113" r="4"/><circle cx="183" cy="102" r="4"/><circle cx="183" cy="91" r="4"/><circle cx="183" cy="80" r="4"/><circle cx="183" cy="69" r="4"/><circle cx="260" cy="124" r="4"/><circle cx="298" cy="124" r="4"/></g><text x="145" y="145" text-anchor="middle" class="preview-small">30</text><text x="183" y="145" text-anchor="middle" class="preview-small">47 × 6</text><text x="298" y="145" text-anchor="middle" class="preview-small">58</text>`;
    } else if (lesson.id === 'e09-choosing-charts') {
      resultVisual = `<rect x="120" y="71" width="202" height="62" rx="5" fill="#f8fafc" stroke="#cbd5e1"/><text x="138" y="88" class="preview-small">Small numeric → Dot plot</text><text x="138" y="103" class="preview-small">Large numeric → Histogram</text><text x="138" y="118" class="preview-small">Time → Line · Shares → Pie</text><text x="138" y="129" class="preview-small">Categories → Column / Bar</text>`;
    } else if (lesson.id === 'w01-page-setup') {
      resultVisual = `<rect x="153" y="68" width="126" height="72" fill="#fff" stroke="#94a3b8"/><rect x="171" y="78" width="90" height="52" fill="none" stroke="#60a5fa" stroke-dasharray="3 2"/><text x="216" y="75" text-anchor="middle" class="preview-small">A4 · Portrait</text><text x="216" y="145" text-anchor="middle" class="preview-small">Normal 2.5 cm · Bound left 3.5 cm</text>`;
    } else if (lesson.id === 'w09-figures') {
      resultVisual = `<rect x="168" y="72" width="96" height="37" rx="3" fill="#dbeafe" stroke="#60a5fa"/><path d="M178 101l20-20 15 13 12-10 29 17" fill="none" stroke="#0284c7" stroke-width="2"/><text x="216" y="123" text-anchor="middle" class="preview-small">Fig. 1. Caption below · bold</text><text x="216" y="139" text-anchor="middle" class="preview-small">Cross-reference by figure number</text>`;
    } else if (lesson.id === 'w10-tables') {
      resultVisual = `<text x="216" y="77" text-anchor="middle" class="preview-small" font-weight="bold">Table 1: PV Module Parameters</text><rect x="135" y="83" width="162" height="47" fill="#fff" stroke="#94a3b8"/><rect x="135" y="83" width="162" height="15" fill="#dbeafe"/><path d="M135 98h162M135 114h162M189 83v47M243 83v47" stroke="#cbd5e1"/><text x="216" y="144" text-anchor="middle" class="preview-small">Centered · missing values use —</text>`;
    } else if (lesson.id === 'w12-equations') {
      resultVisual = `<text x="216" y="96" text-anchor="middle" class="preview-equation">I = Iₚₕ − Iₒ [exp((V + I Rₛ) / Vₜ) − 1]</text><line x1="142" y1="105" x2="290" y2="105" stroke="#cbd5e1"/><text x="304" y="105" text-anchor="end" class="preview-small">(1)</text><text x="216" y="128" text-anchor="middle" class="preview-small">Centered · numbered · cited as eqn. (1)</text>`;
    } else if (/chart|histogram|pie|plot|graph/.test(hint)) {
      resultVisual = `<line x1="112" y1="135" x2="315" y2="135" stroke="#94a3b8"/><line x1="112" y1="54" x2="112" y2="135" stroke="#94a3b8"/><rect x="138" y="91" width="28" height="44" rx="3" fill="#38bdf8"/><rect x="184" y="72" width="28" height="63" rx="3" fill="#0284c7"/><rect x="230" y="58" width="28" height="77" rx="3" fill="#0369a1"/><text x="214" y="47" text-anchor="middle" class="preview-small">${isArabic ? 'رسم بياني بعناوين' : 'Labeled chart'}</text>`;
    } else if (/table|cell|column|row|worksheet|spreadsheet/.test(hint)) {
      resultVisual = `<rect x="106" y="58" width="218" height="78" rx="3" fill="#fff" stroke="#94a3b8"/><rect x="106" y="58" width="218" height="20" fill="#dbeafe"/>${[0,1,2].map(row => `<line x1="106" y1="${78 + row * 19}" x2="324" y2="${78 + row * 19}" stroke="#cbd5e1"/>`).join('')}<line x1="178" y1="58" x2="178" y2="136" stroke="#cbd5e1"/><line x1="251" y1="58" x2="251" y2="136" stroke="#cbd5e1"/><text x="215" y="72" text-anchor="middle" class="preview-small">${isArabic ? 'جدول متنسق' : 'Formatted table'}</text>`;
    } else if (/equation|math|formula|function/.test(hint)) {
      resultVisual = `<text x="216" y="91" text-anchor="middle" class="preview-equation">f(x) = a + b·x</text><line x1="145" y1="103" x2="286" y2="103" stroke="#cbd5e1"/><text x="216" y="123" text-anchor="middle" class="preview-small">${isArabic ? 'المعادلة في النص' : 'Centered and readable'}</text>`;
    } else if (/cover|title page/.test(hint)) {
      resultVisual = `<text x="216" y="78" text-anchor="middle" class="preview-heading">TECHNICAL REPORT</text><line x1="160" y1="90" x2="272" y2="90" stroke="#0284c7" stroke-width="3"/><text x="216" y="110" text-anchor="middle" class="preview-small">Student · Course · Date</text>`;
    } else if (/font|color|format|heading|style|text|caption/.test(hint)) {
      resultVisual = `<text x="122" y="71" class="preview-heading">Section heading</text><line x1="122" y1="84" x2="302" y2="84" stroke="#0284c7" stroke-width="3"/><line x1="122" y1="101" x2="306" y2="101" stroke="#94a3b8" stroke-width="3"/><line x1="122" y1="114" x2="289" y2="114" stroke="#cbd5e1" stroke-width="3"/><line x1="122" y1="127" x2="300" y2="127" stroke="#cbd5e1" stroke-width="3"/>`;
    } else {
      resultVisual = `<text x="122" y="73" class="preview-heading">${isArabic ? (isExcel ? 'تنظيم البيانات' : 'عنوان القسم') : (isExcel ? 'Clean data layout' : 'Document section')}</text><line x1="122" y1="89" x2="306" y2="89" stroke="#94a3b8" stroke-width="3"/><line x1="122" y1="103" x2="289" y2="103" stroke="#cbd5e1" stroke-width="3"/><line x1="122" y1="117" x2="300" y2="117" stroke="#cbd5e1" stroke-width="3"/><circle cx="311" cy="129" r="8" fill="#dcfce7"/><path d="M307 129l3 3 5-6" fill="none" stroke="#16a34a" stroke-width="2"/>`;
    }

    const appLabel = isExcel ? 'Excel 365' : 'Word 365';
    const fileLabel = isExcel ? 'Lab_Data_Analysis.xlsx' : 'Technical_Report_Draft.docx';
    const ribbonTabs = (isExcel ? ['File', 'Home', 'Insert', 'Formulas', 'Data'] : ['File', 'Home', 'Insert', 'Layout', 'References'])
      .map((label, index) => `<text x="${10 + [0, 34, 71, 108, 151][index]}" y="34" class="preview-ribbon-tab">${label}</text>`)
      .join('');
    const formulaPreview = isExcel
      ? `<rect x="8" y="45" width="40" height="12" rx="1" fill="#fff" stroke="#cbd5e1"/><text x="13" y="54" class="preview-toolbar-text">${lesson.id === 'e01-entering-data-formulas' ? 'C2' : 'A1'}</text><text x="57" y="54" class="preview-toolbar-text" font-style="italic">fx</text><rect x="72" y="45" width="280" height="12" rx="1" fill="#fff" stroke="#cbd5e1"/><text x="78" y="54" class="preview-toolbar-text">${lesson.id === 'e01-entering-data-formulas' ? '=B2-A2' : 'Enter data or a formula'}</text>`
      : `<rect x="8" y="45" width="105" height="12" rx="1" fill="#fff" stroke="#cbd5e1"/><text x="13" y="54" class="preview-toolbar-text">Times New Roman</text><rect x="117" y="45" width="24" height="12" rx="1" fill="#fff" stroke="#cbd5e1"/><text x="124" y="54" class="preview-toolbar-text">12</text><text x="153" y="54" class="preview-toolbar-text" font-weight="bold">B</text><text x="169" y="54" class="preview-toolbar-text" font-style="italic">I</text><text x="185" y="54" class="preview-toolbar-text">U</text>`;
    return `
      <details class="step-preview">
        <summary>${escapeHtml(t('expectedOutput'))}</summary>
        <div class="step-preview-visual" role="img" aria-label="${escapeHtml(description)}">
          <svg viewBox="0 0 360 160" direction="ltr" aria-hidden="true" focusable="false">
            <rect x="1" y="1" width="358" height="158" rx="3" fill="#f4f6f8" stroke="#cbd2d9"/>
            <rect x="1" y="1" width="358" height="21" fill="${isExcel ? '#107c41' : '#185abd'}"/>
            <rect x="9" y="5" width="13" height="13" rx="2" fill="#fff"/>
            <text x="12" y="15" class="preview-office-mark" fill="${isExcel ? '#107c41' : '#185abd'}">${isExcel ? 'X' : 'W'}</text>
            <text x="28" y="15" class="preview-app-label">${fileLabel}</text>
            <text x="333" y="15" class="preview-window-controls">− □ ×</text>
            <rect x="1" y="22" width="358" height="18" fill="#f8f9fa" stroke="#d6dee8"/>
            ${ribbonTabs}
            <line x1="43" y1="39" x2="70" y2="39" stroke="${isExcel ? '#107c41' : '#185abd'}" stroke-width="2"/>
            <rect x="1" y="41" width="358" height="21" fill="#f1f3f5" stroke="#d6dee8"/>
            ${formulaPreview}
            <rect x="18" y="65" width="324" height="83" fill="#fff" stroke="#cbd5e1"/>
            ${resultVisual}
          </svg>
        </div>
        <p class="step-preview-caption">${escapeHtml(t('previewDisclaimer'))}</p>
      </details>
    `;
  }

  // Calculate overall progress across all lessons
  function calculateProgress() {
    let totalSteps = 0;
    let completedCount = 0;

    state.lessons.forEach(lesson => {
      if (Array.isArray(lesson.steps)) {
        lesson.steps.forEach((_, stepIdx) => {
          totalSteps++;
          const stepKey = `${lesson.id}_${stepIdx}`;
          if (state.completedSteps[stepKey]) {
            completedCount++;
          }
        });
      }
    });

    const percent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
    return { totalSteps, completedCount, percent };
  }

  function updateOverallProgressBar() {
    const { totalSteps, completedCount, percent } = calculateProgress();
    if (elements.overallProgressFill) {
      elements.overallProgressFill.style.width = `${percent}%`;
      const progressTrack = elements.overallProgressFill.parentElement;
      if (progressTrack) {
        progressTrack.setAttribute('aria-valuenow', String(completedCount));
        progressTrack.setAttribute('aria-valuemax', String(totalSteps));
        progressTrack.setAttribute('aria-valuetext', state.language === 'ar'
          ? `تم إنجاز ${completedCount} من ${totalSteps} خطوة (${percent}٪)`
          : `${completedCount} of ${totalSteps} steps completed (${percent}%)`);
      }
    }
    if (elements.overallProgressText) {
      elements.overallProgressText.textContent = `${completedCount}/${totalSteps} (${percent}%)`;
    }
  }

  // Render Sidebar
  function renderSidebar() {
    if (!elements.sidebarNav) return;
    const q = state.searchQuery.trim().toLowerCase();

    // Filter lessons if searching
    const filteredLessons = state.lessons.filter(lesson => {
      if (!q) return true;
      const matchTitle = (lesson.title || '').toLowerCase().includes(q)
        || getLessonText(lesson, 'title').toLowerCase().includes(q);
      const matchId = (lesson.id || '').toLowerCase().includes(q);
      const matchGoal = (lesson.goal || '').toLowerCase().includes(q)
        || getLessonText(lesson, 'goal').toLowerCase().includes(q);
      const matchRules = Array.isArray(lesson.rules) && lesson.rules.some(r => r.toLowerCase().includes(q));
      const matchSteps = Array.isArray(lesson.steps) && lesson.steps.some(s => s.text.toLowerCase().includes(q) || s.path.toLowerCase().includes(q));
      return matchTitle || matchId || matchGoal || matchRules || matchSteps;
    });

    if (filteredLessons.length === 0) {
      elements.sidebarNav.innerHTML = `
        <div style="padding: 1.5rem 0.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          ${escapeHtml(t('noTopics'))} "<strong>${escapeHtml(state.searchQuery)}</strong>"
        </div>
      `;
      return;
    }

    // Group lessons by `group`
    const groups = {};
    const groupOrder = ['Word', 'Excel & Data', 'Report'];

    filteredLessons.forEach(lesson => {
      const g = lesson.group || 'Word';
      if (!groups[g]) groups[g] = [];
      groups[g].push(lesson);
    });

    let html = '';
    const activeLesson = state.lessons.find(lesson => lesson.id === state.currentLessonId);
    const activeGroup = activeLesson ? (activeLesson.group || 'Word') : 'Word';
    const sortedGroups = Object.keys(groups).sort((a, b) => {
      const idxA = groupOrder.indexOf(a);
      const idxB = groupOrder.indexOf(b);
      return (idxA !== -1 ? idxA : 99) - (idxB !== -1 ? idxB : 99);
    });

    sortedGroups.forEach(grpName => {
      html += `<details class="nav-group" ${grpName === activeGroup ? 'open' : ''}>`;
      const localizedGroup = state.language === 'ar'
        ? ({ 'Word': 'وورد', 'Excel & Data': 'إكسل وبيانات', 'Report': 'التقرير' }[grpName] || grpName)
        : grpName;
      html += `<summary class="nav-group-title"><span>${escapeHtml(localizedGroup)}</span><span class="nav-group-count">${groups[grpName].length}</span></summary>`;
      html += '<ul class="lesson-list">';

      groups[grpName].forEach(lesson => {
        const isActive = lesson.id === state.currentLessonId;
        const navTitle = getLessonText(lesson, 'title');
        const lessonSteps = Array.isArray(lesson.steps) ? lesson.steps : [];
        const totalLessonSteps = lessonSteps.length;
        let doneLessonSteps = 0;

        if (totalLessonSteps > 0) {
          lesson.steps.forEach((_, idx) => {
            if (state.completedSteps[`${lesson.id}_${idx}`]) doneLessonSteps++;
          });
        }

        const isFullyDone = totalLessonSteps > 0 && doneLessonSteps === totalLessonSteps;

        html += `
          <li>
            <a class="lesson-nav-item ${isActive ? 'active' : ''}" data-lesson-id="${escapeHtml(lesson.id)}" href="#${escapeHtml(lesson.id)}">
              <span class="lesson-nav-id">${escapeHtml(lesson.id.toUpperCase())}</span>
              <span class="lesson-nav-title">${escapeHtml(navTitle)}</span>
              ${isFullyDone ? `<span class="nav-check-badge" aria-label="${escapeHtml(state.language === 'ar' ? 'مكتمل' : 'Completed')}">✓</span>` : ''}
            </a>
          </li>
        `;
      });

      html += '</ul></details>';
    });

    elements.sidebarNav.innerHTML = html;

    // Attach click events
    const navItems = elements.sidebarNav.querySelectorAll('.lesson-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const lid = item.getAttribute('data-lesson-id');
        selectLesson(lid);
        if (window.innerWidth <= 900) {
          closeSidebar(false);
          const heading = elements.contentArea.querySelector('.lesson-title') || elements.contentArea.querySelector('h2');
          if (heading) {
            heading.tabIndex = -1;
            heading.focus();
          }
        }
      });
    });
  }

  // Render Lesson Content
  function renderLesson(lesson) {
    if (!elements.contentArea) return;

    if (!lesson) {
      elements.contentArea.innerHTML = `
        <div class="welcome-hero">
          <h2>${escapeHtml(t('welcome'))}</h2>
          <div class="lesson-goal-box">
            ${escapeHtml(t('welcomeHint'))}
          </div>
          <div class="meta-grid">
            <div class="meta-card">
              <div class="meta-label">${escapeHtml(t('course'))}</div>
              <div class="meta-val">ELE123 / ELE114</div>
            </div>
            <div class="meta-card">
              <div class="meta-label">${escapeHtml(t('due'))}</div>
              <div class="meta-val">Tuesday 17 Nov 2026</div>
            </div>
            <div class="meta-card">
              <div class="meta-label">${escapeHtml(t('software'))}</div>
              <div class="meta-val">MS Word & Excel 365</div>
            </div>
          </div>
        </div>
      `;
      return;
    }

    const lessonTitle = getLessonText(lesson, 'title');
    const lessonGoal = getLessonText(lesson, 'goal');

    // Calculate step progress for current lesson
    const totalSteps = Array.isArray(lesson.steps) ? lesson.steps.length : 0;
    let completedCount = 0;
    if (totalSteps > 0) {
      lesson.steps.forEach((_, idx) => {
        if (state.completedSteps[`${lesson.id}_${idx}`]) completedCount++;
      });
    }
    const stepPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

    // Visual Diagram and Playground data
    const diagramHtml = (window.PLAYGROUNDS && window.PLAYGROUNDS.getDiagram(lesson.id)) || '';
    const playgroundWidgetHtml = (window.PLAYGROUNDS && window.PLAYGROUNDS.getPlayground(lesson.id)) || '';
    const challenges = (window.LESSON_CHALLENGES && window.LESSON_CHALLENGES[lesson.id]) || [];

    // Rules
    let rulesHtml = '';
    if (Array.isArray(lesson.rules) && lesson.rules.length > 0) {
      rulesHtml = `
        <div class="section-block">
          <h3 class="section-title">${escapeHtml(t('requirements'))}</h3>
          <ul class="rules-list">
            ${lesson.rules.map(rule => `
              <li class="rule-item">
                <span class="rule-icon">▸</span>
                <span>${escapeHtml(rule)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    // Steps
    let stepsHtml = '';
    if (Array.isArray(lesson.steps) && lesson.steps.length > 0) {
      stepsHtml = `
        <div class="section-block">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.25rem;">
            <h3 class="section-title" style="margin-bottom:0; border:none; padding:0;">${escapeHtml(t('steps'))}</h3>
            <span id="lesson-progress-text" style="font-size:0.82rem; font-weight:700; color:var(--brand-blue);">${completedCount} / ${totalSteps} ${escapeHtml(t('completed'))} (${stepPercent}%)</span>
          </div>
          <div class="progress-track" role="progressbar" aria-label="${escapeHtml(lesson.title)} step progress" aria-valuemin="0" aria-valuemax="${totalSteps}" aria-valuenow="${completedCount}" aria-valuetext="${completedCount} / ${totalSteps} ${escapeHtml(t('completed'))}" style="margin-bottom: 0.85rem; height: 6px;">
            <div class="progress-fill" id="lesson-progress-fill" style="width: ${stepPercent}%;"></div>
          </div>
          <div class="steps-list">
            ${lesson.steps.map((step, idx) => {
              const status = state.completedSteps[`${lesson.id}_${idx}`];
              const isChecked = !!status;
              const isVerified = status === 'verified';
              const isSelf = status === 'self-marked' || status === true;
              return `
                <div class="step-card ${isChecked ? 'completed' : ''} ${isVerified ? 'verified' : isSelf ? 'self-marked' : ''}">
                  <input type="checkbox" class="step-checkbox" id="step_${lesson.id}_${idx}" data-lesson="${escapeHtml(lesson.id)}" data-step="${idx}" ${isChecked ? 'checked' : ''} aria-label="${escapeHtml(t('markStep'))} ${idx + 1} ${escapeHtml(t('completed'))}" />
                  <div class="step-content">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem; flex-wrap:wrap; gap:0.35rem;">
                      ${step.path ? `<span class="step-path-badge">${escapeHtml(step.path)}</span>` : '<span></span>'}
                      ${isVerified ? `<span class="status-verified-pill" title="${escapeHtml(t('verifiedTitle'))}">${escapeHtml(t('verified'))}</span>` : isSelf ? `<span class="status-self-pill" title="${escapeHtml(t('selfMarkedTitle'))}">${escapeHtml(t('selfMarked'))}</span>` : ''}
                    </div>
                    <div class="step-text">${escapeHtml(step.text)}</div>
                    ${renderExpectedOutputPreview(lesson, step)}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // Practice
    let practiceHtml = '';
    if (lesson.practice) {
      practiceHtml = `
        <div class="section-block">
          <div class="practice-box">
            <div class="practice-header">${escapeHtml(t('practice'))}</div>
            <div>${escapeHtml(lesson.practice)}</div>
          </div>
        </div>
      `;
    }

    // Mistakes
    let mistakesHtml = '';
    if (Array.isArray(lesson.mistakes) && lesson.mistakes.length > 0) {
      mistakesHtml = `
        <div class="section-block">
          <h3 class="section-title">${escapeHtml(t('mistakes'))}</h3>
          <ul class="mistakes-list">
            ${lesson.mistakes.map(m => `
              <li class="mistake-item">
                <span class="mistake-icon">✕</span>
                <span>${escapeHtml(m)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    // Checklist
    let checkHtml = '';
    if (Array.isArray(lesson.check) && lesson.check.length > 0) {
      checkHtml = `
        <div class="section-block">
          <h3 class="section-title">${escapeHtml(t('check'))}</h3>
          <ul class="check-list">
            ${lesson.check.map(c => `
              <li class="check-item">
                <span class="check-icon">✓</span>
                <span>${escapeHtml(c)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    // Notes
    const lessonNote = state.notes[lesson.id] || '';
    const notesHtml = `
      <div class="section-block">
        <div class="notes-container">
          <div class="notes-header">
            <h3 style="font-size: 0.95rem; font-weight:700;">${escapeHtml(t('notes'))}</h3>
            <span class="notes-status" id="notes-status">${escapeHtml(t('autoSaved'))}</span>
          </div>
          <textarea class="notes-textarea" id="lesson-notes-input" placeholder="${escapeHtml(t('notesPlaceholder'))}">${escapeHtml(lessonNote)}</textarea>
        </div>
      </div>
    `;

    // Next / Previous navigation buttons
    const currentIndex = state.lessons.findIndex(l => l.id === lesson.id);
    const prevLesson = currentIndex > 0 ? state.lessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < state.lessons.length - 1 ? state.lessons[currentIndex + 1] : null;

    const navButtonsHtml = `
      <div class="lesson-nav-buttons">
        <button class="btn-nav" id="btn-prev-lesson" ${!prevLesson ? 'disabled' : ''}>
          ← ${prevLesson ? escapeHtml(prevLesson.title) : escapeHtml(t('previous'))}
        </button>
        <button class="btn-nav" id="btn-next-lesson" ${!nextLesson ? 'disabled' : ''}>
          ${nextLesson ? escapeHtml(nextLesson.title) : escapeHtml(t('next'))} →
        </button>
      </div>
    `;

    // Challenge Tab HTML
    let challengeViewHtml = '';
    if (challenges.length > 0) {
      let correctCount = 0;
      challenges.forEach((c, idx) => {
        if (state.challengeAnswers[`${lesson.id}_${idx}`] === c.correct) correctCount++;
      });

      challengeViewHtml = `
        <div class="challenge-container">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <h3 class="section-title" style="margin:0; border:none; padding:0;">${escapeHtml(t('challenge'))}</h3>
            <span style="font-size:0.85rem; font-weight:700; color:var(--brand-blue);">${correctCount}/${challenges.length} ${escapeHtml(t('correct'))}</span>
          </div>
          ${challenges.map((c, qIdx) => {
            const savedAns = state.challengeAnswers[`${lesson.id}_${qIdx}`];
            const isAnswered = typeof savedAns === 'number';
            const isCorrect = isAnswered && savedAns === c.correct;
            return `
              <div class="challenge-card" data-qid="${qIdx}">
                <div class="challenge-question">Q${qIdx + 1}. ${escapeHtml(c.question)}</div>
                <div class="challenge-options">
                  ${c.options.map((opt, optIdx) => {
                    let optClass = '';
                    if (isAnswered) {
                      if (optIdx === c.correct) optClass = 'correct';
                      else if (optIdx === savedAns) optClass = 'incorrect';
                    }
                    const letter = String.fromCharCode(65 + optIdx);
                    return `
                      <button class="challenge-opt-btn ${optClass}" data-lesson="${escapeHtml(lesson.id)}" data-qid="${qIdx}" data-opt="${optIdx}" ${isAnswered ? 'disabled' : ''}>
                        <span class="challenge-opt-letter">${letter}</span>
                        <span>${escapeHtml(opt)}</span>
                      </button>
                    `;
                  }).join('')}
                </div>
                ${isAnswered ? `
                  <div class="challenge-feedback ${isCorrect ? 'feedback-banner success' : 'feedback-banner warning'}">
                    <strong>${escapeHtml(isCorrect ? t('correctBang') : t('keepMind'))}</strong> ${escapeHtml(c.explanation)}
                    ${!isCorrect ? `
                      <div style="margin-top:0.5rem;">
                        <button class="btn-toggle btn-retry-q" data-lesson="${escapeHtml(lesson.id)}" data-qid="${qIdx}">${escapeHtml(t('retry'))}</button>
                      </div>
                    ` : ''}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else {
      challengeViewHtml = `
        <div class="welcome-hero" style="text-align:center; padding:2rem;">
          <h3>${escapeHtml(t('checklistReady'))}</h3>
          <p>${escapeHtml(t('checklistHint'))}</p>
        </div>
      `;
    }

    // Playground View HTML - Interactive Simulator Mount
    let playgroundViewHtml = `
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        <div id="interactive-playground-root"></div>
        ${diagramHtml}
      </div>
    `;

    // Tabs Bar
    const tabsBarHtml = `
      <nav class="lesson-nav-tabs" aria-label="${escapeHtml(t('views'))}">
        <button class="lesson-tab-btn ${state.activeTab === 'guide' ? 'active' : ''}" data-tab="guide">
          <span>${escapeHtml(t('guide'))}</span>
        </button>
        <button class="lesson-tab-btn ${state.activeTab === 'playground' ? 'active' : ''}" data-tab="playground">
          <span>${escapeHtml(t('lab'))}</span>
        </button>
        <button class="lesson-tab-btn ${state.activeTab === 'challenge' ? 'active' : ''}" data-tab="challenge">
          <span>${escapeHtml(t('quiz'))}</span>
          <span class="tab-badge">${challenges.length}</span>
        </button>
      </nav>
    `;

    // Active Content based on state.activeTab
    let activeTabBody = '';
    if (state.activeTab === 'playground') {
      activeTabBody = `${playgroundViewHtml}${navButtonsHtml}`;
    } else if (state.activeTab === 'challenge') {
      activeTabBody = `${challengeViewHtml}${navButtonsHtml}`;
    } else {
      activeTabBody = `
        ${stepsHtml}
        <details class="lesson-extras">
          <summary>${escapeHtml(t('more'))} <span>${escapeHtml(t('moreHint'))}</span></summary>
          <div class="lesson-extras-content">
            ${rulesHtml}
            ${practiceHtml}
            ${mistakesHtml}
            ${checkHtml}
            ${notesHtml}
          </div>
        </details>
        <section class="guide-expected-output" aria-labelledby="guide-expected-output-title">
          <h3 id="guide-expected-output-title">${escapeHtml(t('guideExpected'))}</h3>
          <p>${escapeHtml(state.language === 'ar' ? (lessonArabic[lesson.id]?.abstract || t('abstractLead')) : (lesson.abstract || t('abstractLead')))}</p>
          ${renderExpectedOutputPreview(lesson, { text: lessonGoal, path: lesson.steps?.[0]?.path || '' }).replace('<details class="step-preview">', '<details class="step-preview" open>')}
        </section>
        ${navButtonsHtml}
      `;
    }

    elements.contentArea.innerHTML = `
      <article class="lesson-card">
        <header class="lesson-header">
          <div class="lesson-meta-bar">
            <div class="lesson-tags">
              <span class="tag tag-primary">${escapeHtml(lesson.group || 'General')}</span>
              <span class="tag">${escapeHtml(lesson.lecture || 'Lecture')}</span>
              <span class="tag">${escapeHtml(lesson.id.toUpperCase())}</span>
            </div>
            <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">${escapeHtml(t('standard'))}</span>
          </div>
          <h2 class="lesson-title">${escapeHtml(lessonTitle)}</h2>
          <div class="lesson-goal-box">
            <strong>${escapeHtml(t('goal'))}</strong> ${escapeHtml(lessonGoal)}
          </div>
          <section class="lesson-abstract" aria-labelledby="lesson-abstract-title">
            <h3 id="lesson-abstract-title">${escapeHtml(t('abstract'))}</h3>
            <p>${escapeHtml(state.language === 'ar' ? (lessonArabic[lesson.id]?.abstract || t('abstractLead')) : (lesson.abstract || t('abstractLead')))}</p>
          </section>
          ${state.language === 'ar' ? `<p class="language-note">${escapeHtml(t('lessonLanguageNote'))}</p>` : ''}
        </header>
        ${tabsBarHtml}
        <div class="lesson-body">
          ${activeTabBody}
        </div>
      </article>
    `;

    // Tab button click events
    const tabBtns = elements.contentArea.querySelectorAll('.lesson-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        state.activeTab = targetTab;
        renderLesson(lesson);
        if (targetTab === 'playground') {
          requestAnimationFrame(() => {
            const practiceSheet = document.getElementById('word-desk');
            const excelSheet = document.getElementById('excel-grid-viewport');
            const sheet = practiceSheet || excelSheet;
            if (sheet) sheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      });
    });

    // Mount interactive playground simulator if playground tab is active
    if (state.activeTab === 'playground' && window.PlaygroundManager) {
      const root = document.getElementById('interactive-playground-root');
      if (root) {
        window.PlaygroundManager.init(root, lesson.id);
      }
    }

    // Bind challenge option clicks
    const challengeOptBtns = elements.contentArea.querySelectorAll('.challenge-opt-btn');
    challengeOptBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget;
        const lid = target.getAttribute('data-lesson');
        const qid = target.getAttribute('data-qid');
        const optIdx = parseInt(target.getAttribute('data-opt'), 10);

        state.challengeAnswers[`${lid}_${qid}`] = optIdx;
        storage.set('challenge_answers', state.challengeAnswers);
        renderLesson(lesson);
      });
    });

    // Bind challenge retry button
    const retryBtns = elements.contentArea.querySelectorAll('.btn-retry-q');
    retryBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lid = btn.getAttribute('data-lesson');
        const qid = btn.getAttribute('data-qid');
        delete state.challengeAnswers[`${lid}_${qid}`];
        storage.set('challenge_answers', state.challengeAnswers);
        renderLesson(lesson);
      });
    });

    // Bind step checkbox toggles (distinguishes self-marked from verified)
    const stepCheckboxes = elements.contentArea.querySelectorAll('.step-checkbox');
    stepCheckboxes.forEach(cb => {
      cb.addEventListener('change', (e) => {
        const lid = e.target.getAttribute('data-lesson');
        const sidx = e.target.getAttribute('data-step');
        const key = `${lid}_${sidx}`;

        if (e.target.checked) {
          if (state.completedSteps[key] !== 'verified') {
            state.completedSteps[key] = 'self-marked';
          }
        } else {
          delete state.completedSteps[key];
        }
        storage.set('completed_steps', state.completedSteps);

        // Update step card appearance
        const card = e.target.closest('.step-card');
        if (card) {
          const isVerified = state.completedSteps[key] === 'verified';
          const isChecked = !!state.completedSteps[key];
          card.classList.toggle('completed', isChecked);
          card.classList.toggle('verified', isVerified);
          card.classList.toggle('self-marked', isChecked && !isVerified);

          const badgeWrap = card.querySelector('.step-path-badge')?.parentElement;
          if (badgeWrap) {
            const oldPill = badgeWrap.querySelector('.status-verified-pill, .status-self-pill');
            if (oldPill) oldPill.remove();
            if (isVerified) {
              badgeWrap.insertAdjacentHTML('beforeend', `<span class="status-verified-pill" title="${escapeHtml(t('verifiedTitle'))}">${escapeHtml(t('verified'))}</span>`);
            } else if (isChecked) {
              badgeWrap.insertAdjacentHTML('beforeend', `<span class="status-self-pill" title="${escapeHtml(t('selfMarkedTitle'))}">${escapeHtml(t('selfMarked'))}</span>`);
            }
          }
        }

        // Update chips in playground simulator if open
        if (window.PlaygroundManager && typeof window.PlaygroundManager.updateAllChips === 'function') {
          window.PlaygroundManager.updateAllChips();
        }

        // Update lesson progress header in-place
        let currentLessonDone = 0;
        const totalLessonSteps = Array.isArray(lesson.steps) ? lesson.steps.length : 0;
        if (totalLessonSteps > 0) {
          lesson.steps.forEach((_, i) => {
            if (state.completedSteps[`${lesson.id}_${i}`]) currentLessonDone++;
          });
        }
        const updatedPercent = totalLessonSteps > 0 ? Math.round((currentLessonDone / totalLessonSteps) * 100) : 0;
        const progText = document.getElementById('lesson-progress-text');
        const progFill = document.getElementById('lesson-progress-fill');
        if (progText) {
          progText.textContent = `${currentLessonDone} / ${totalLessonSteps} ${t('completed')} (${updatedPercent}%)`;
        }
        if (progFill) {
          progFill.style.width = `${updatedPercent}%`;
          const track = progFill.parentElement;
          if (track) {
            track.setAttribute('aria-valuenow', String(currentLessonDone));
            track.setAttribute('aria-valuetext', state.language === 'ar'
              ? `تم إنجاز ${currentLessonDone} من ${totalLessonSteps} خطوة (${updatedPercent}٪)`
              : `${currentLessonDone} of ${totalLessonSteps} steps completed (${updatedPercent}%)`);
          }
        }

        // Update overall progress bar
        updateOverallProgressBar();

        // Update sidebar step counts
        renderSidebar();
      });
    });

    // Bind Notes auto-save with debounce
    const notesInput = document.getElementById('lesson-notes-input');
    const notesStatus = document.getElementById('notes-status');
    let debounceTimer;

    if (notesInput) {
      notesInput.addEventListener('input', (e) => {
          if (notesStatus) notesStatus.textContent = t('saving');
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          state.notes[lesson.id] = e.target.value;
          storage.set('notes', state.notes);
          if (notesStatus) notesStatus.textContent = t('saved');
        }, 500);
      });
    }

    // Bind Prev/Next buttons
    const prevBtn = document.getElementById('btn-prev-lesson');
    const nextBtn = document.getElementById('btn-next-lesson');

    if (prevBtn && prevLesson) {
      prevBtn.addEventListener('click', () => selectLesson(prevLesson.id));
    }
    if (nextBtn && nextLesson) {
      nextBtn.addEventListener('click', () => selectLesson(nextLesson.id));
    }
  }

  // Select lesson
  function selectLesson(id) {
    state.currentLessonId = id;
    state.activeTab = 'guide';
    storage.set('last_active_lesson', id);
    const lesson = state.lessons.find(l => l.id === id);
    renderSidebar();
    renderLesson(lesson);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Escape HTML helper
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Sidebar mobile drawer toggles
  function openSidebar() {
    state.sidebarOpen = true;
    if (elements.sidebar) {
      elements.sidebar.classList.remove('collapsed');
      elements.sidebar.classList.add('open');
      elements.sidebar.inert = false;
      elements.sidebar.setAttribute('aria-hidden', 'false');
    }
    if (elements.sidebarOverlay && window.matchMedia('(max-width: 900px)').matches) {
      elements.sidebarOverlay.classList.add('active');
      elements.sidebarOverlay.setAttribute('aria-hidden', 'false');
    }
    if (elements.menuToggle) elements.menuToggle.setAttribute('aria-expanded', 'true');
    if (elements.sidebar && window.matchMedia('(max-width: 900px)').matches) {
      elements.sidebar.inert = false;
      elements.sidebar.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(() => elements.sidebar.querySelector('.lesson-nav-item')?.focus());
    }
  }

  function closeSidebar(restoreFocus = true) {
    state.sidebarOpen = false;
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    if (elements.sidebar) {
      elements.sidebar.classList.remove('open');
      if (!isMobile) elements.sidebar.classList.add('collapsed');
      elements.sidebar.inert = true;
      elements.sidebar.setAttribute('aria-hidden', 'true');
    }
    if (elements.sidebarOverlay) { elements.sidebarOverlay.classList.remove('active'); elements.sidebarOverlay.setAttribute('aria-hidden', 'true'); }
    if (elements.menuToggle) elements.menuToggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus && elements.menuToggle && isMobile) elements.menuToggle.focus();
  }

  function syncSidebarForViewport(isMobile) {
    state.mobileLayout = isMobile;
    state.sidebarOpen = !isMobile;
    if (elements.sidebar) {
      elements.sidebar.classList.remove('open', 'collapsed');
      elements.sidebar.inert = isMobile;
      elements.sidebar.setAttribute('aria-hidden', isMobile ? 'true' : 'false');
    }
    if (elements.menuToggle) elements.menuToggle.setAttribute('aria-expanded', String(state.sidebarOpen));
    if (elements.sidebarOverlay) {
      elements.sidebarOverlay.classList.remove('active');
      elements.sidebarOverlay.setAttribute('aria-hidden', 'true');
    }
  }

  // Setup Event Listeners
  function setupListeners() {
    if (elements.themeToggle) {
      elements.themeToggle.addEventListener('click', toggleTheme);
    }

    if (elements.menuToggle) {
      elements.menuToggle.addEventListener('click', () => {
        if (state.sidebarOpen) closeSidebar();
        else openSidebar();
      });
    }

    if (elements.sidebarOverlay) {
      elements.sidebarOverlay.addEventListener('click', closeSidebar);
    }

    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    syncSidebarForViewport(isMobile);

    window.addEventListener('keydown', event => {
      if (event.key === 'Escape' && state.sidebarOpen) closeSidebar();
    });

    window.matchMedia('(max-width: 900px)').addEventListener('change', event => {
      syncSidebarForViewport(event.matches);
    });

    window.addEventListener('resize', () => {
      const isMobile = window.matchMedia('(max-width: 900px)').matches;
      if (isMobile !== state.mobileLayout) syncSidebarForViewport(isMobile);
    });

    if (elements.languageToggle) {
      elements.languageToggle.addEventListener('click', () => {
        state.language = state.language === 'ar' ? 'en' : 'ar';
        storage.set('language', state.language);
        applyLanguage();
        renderSidebar();
        const lesson = state.lessons.find(item => item.id === state.currentLessonId);
        renderLesson(lesson);
      });
    }

    if (elements.downloadProjectBtn) {
      elements.downloadProjectBtn.addEventListener('click', () => {
        if (window.OfficeSkillsDownloader) {
          window.OfficeSkillsDownloader.openModal();
        }
      });
    }

    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderSidebar();
      });
    }

    // Handle hash changes (e.g. bookmarks or back/forward)
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && state.lessons.some(l => l.id === hash)) {
        selectLesson(hash);
      }
    });
  }

  // App Initialization
  function init() {
    initTheme();
    applyLanguage();
    setupListeners();

    // Re-sync LESSONS from global if populated
    state.lessons = window.LESSONS || [];

    updateOverallProgressBar();

    // Check hash or restored lesson
    const hash = window.location.hash.replace('#', '');
    const lastActive = storage.get('last_active_lesson', null);

    let initialLesson = null;
    if (hash && state.lessons.some(l => l.id === hash)) {
      initialLesson = hash;
    } else if (lastActive && state.lessons.some(l => l.id === lastActive)) {
      initialLesson = lastActive;
    } else if (state.lessons.length > 0) {
      initialLesson = state.lessons[0].id;
    }

    if (initialLesson) {
      selectLesson(initialLesson);
    } else {
      renderSidebar();
      renderLesson(null);
    }
  }

  // Expose global interface for simulator communication and progress sync
  window.OfficeSkillsApp = {
    getCompletedSteps: function () {
      return state.completedSteps;
    },
    onTaskVerified: function (lessonId, taskIdx) {
      const key = `${lessonId}_${taskIdx}`;
      state.completedSteps[key] = 'verified';
      storage.set('completed_steps', state.completedSteps);

      // Live update study guide step checkbox if present in DOM
      const cb = document.getElementById(`step_${lessonId}_${taskIdx}`);
      if (cb) {
        cb.checked = true;
        const card = cb.closest('.step-card');
        if (card) {
          card.classList.add('completed', 'verified');
          card.classList.remove('self-marked');
          const badgeWrap = card.querySelector('.step-path-badge')?.parentElement;
          if (badgeWrap) {
            const oldPill = badgeWrap.querySelector('.status-verified-pill, .status-self-pill');
            if (oldPill) oldPill.remove();
            badgeWrap.insertAdjacentHTML('beforeend', `<span class="status-verified-pill" title="${escapeHtml(t('verifiedTitle'))}">${escapeHtml(t('verified'))}</span>`);
          }
        }
      }

      // Update in-place progress counters
      updateOverallProgressBar();
      const progText = document.getElementById('lesson-progress-text');
      const progFill = document.getElementById('lesson-progress-fill');
      const currentLesson = state.lessons.find(l => l.id === lessonId);
      if (currentLesson && Array.isArray(currentLesson.steps)) {
        let done = 0;
        currentLesson.steps.forEach((_, i) => {
          if (state.completedSteps[`${lessonId}_${i}`]) done++;
        });
        const pct = Math.round((done / currentLesson.steps.length) * 100);
        if (progText) progText.textContent = `${done} / ${currentLesson.steps.length} ${t('completed')} (${pct}%)`;
        if (progFill) progFill.style.width = `${pct}%`;
        if (progFill && progFill.parentElement) {
          progFill.parentElement.setAttribute('aria-valuenow', String(done));
          progFill.parentElement.setAttribute('aria-valuetext', state.language === 'ar'
            ? `تم إنجاز ${done} من ${currentLesson.steps.length} خطوة (${pct}٪)`
            : `${done} of ${currentLesson.steps.length} steps completed (${pct}%)`);
        }
      }

      renderSidebar();
    }
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
