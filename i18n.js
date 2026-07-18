// ── Language Detection & Storage ────────────────────────────────────────────
const SUPPORTED_LANGS = ['zh-CN','zh-TW','en','ja','ko','es','fr','de','pt','ar'];

function detectLang() {
  const saved = localStorage.getItem('lang');
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  const nav = navigator.language || navigator.userLanguage || 'en';
  if (nav.startsWith('zh')) return nav.includes('TW') || nav.includes('HK') || nav.includes('MO') ? 'zh-TW' : 'zh-CN';
  if (nav.startsWith('ja')) return 'ja';
  if (nav.startsWith('ko')) return 'ko';
  if (nav.startsWith('es')) return 'es';
  if (nav.startsWith('fr')) return 'fr';
  if (nav.startsWith('de')) return 'de';
  if (nav.startsWith('pt')) return 'pt';
  if (nav.startsWith('ar')) return 'ar';
  return 'en';
}

function getLang() { return window.__lang || (window.__lang = detectLang()); }

function setLang(lang) {
  window.__lang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  if (typeof render === 'function') { render(); }
  else if (typeof renderPage === 'function') { renderPage(); }
}

function t(key) {
  const lang = getLang();
  return (UI[lang] && UI[lang][key]) || UI['en'][key] || key;
}

// ── UI Strings (all 10 languages) ────────────────────────────────────────────
const UI = {
  'zh-CN': {
    title: '中医体质辨识 · 免疫力自测', chip: '免疫力自测系统',
    h1a: '了解你的', h1b: '中医体质',
    subtitle: '基于《中医体质分类与判定》国家标准（GB/T 2009）\n结合现代免疫学 · 神经内分泌学 · 肠道微生物学',
    basicInfo: '基础信息', startBtn: '开始测评 →', nextBtn: '下一步 →',
    resultBtn: '查看结果 →', backBtn: '← 上一步', retakeBtn: '重新测评',
    deviationPct: '偏颇度%', analysisTitle: '体质分析与免疫关联',
    secondaryTitle: '兼夹体质倾向', planTitle: '个性化改善方案',
    scoreTitle: '八维体质评分', exerciseTitle: '🏃 运动处方',
    dietTitle: '🥗 饮食调养', lifeTitle: '🌙 生活起居',
    warning: '⚠️ 本测评基于《中医体质分类与判定》国家标准（GB/T 2009），结合现代免疫学研究，仅供健康参考，不作为医学诊断依据。如有健康问题，请咨询专业医师。',
    balanced: '平和质', balancedSub: '气血调和 · 阴阳平衡 · 正气充足',
    reportTitle: '我的中医体质报告', reportTag: '🌿 中医体质辨识报告',
    yourConst: '您的主体质类型', bodySays: '您的身体在说什么',
    dualTitle: '中西医双维度解读', tcmLabel: '🏛 中医病机', westLabel: '🔬 西医机制',
    roadmapTitle: '90天改善路线图', todayTitle: '今天就可以开始的3件事',
    exType: '运动处方', dietType: '饮食调养', lifeType: '生活起居',
    secConstTitle: '兼夹体质提示', secConstDesc: '在主体质调理基础上，需额外注意：',
    secConstSuffix: '，并适当参考', secConstSuffix2: '的饮食建议。',
    shareTitle: '开始你的90天改善计划', shareSub: '保存报告，随时查阅你的个性化方案',
    printBtn: '🖨 打印/保存PDF', copyBtn: '🔗 复制报告链接', copied: '✅ 已复制',
    notice: '⚠️ 本报告基于《中医体质分类与判定》国家标准（GB/T 2009），结合现代免疫学研究生成，仅供健康参考，不构成医学诊断。如有健康问题，请咨询专业医师。',
    deviationLbl: '偏颇%', langBtn: '🌐 语言', stepOf: '/',
    saveBannerTitle:'收藏这个链接，随时查看你的报告',
    saveBannerSub:'你的个性化报告不会消失——复制链接或添加书签，下次直接打开继续打卡',
    copyLinkBtn:'📋 复制专属链接',dismissBtn:'收起',
    checkinTitle:'每日打卡',checkinPerfect:'🌟 完美打卡',checkinCompleted:'✅ 今日达标',checkinIncomplete:'进行中...',
    streakLabel:'已坚持 {n} 天',monthLabel:'本月完成 {n} 天',
    calendarTitle:'30天打卡记录',calWeekdays:'日,一,二,三,四,五,六',lowestRate:'最需坚持',
    dataNotice:'💡 数据存储在本机浏览器中，清除缓存会丢失记录',
  },
  'zh-TW': {
    title: '中醫體質辨識 · 免疫力自測', chip: '免疫力自測系統',
    h1a: '了解你的', h1b: '中醫體質',
    subtitle: '基於《中醫體質分類與判定》國家標準（GB/T 2009）\n結合現代免疫學 · 神經內分泌學 · 腸道微生物學',
    basicInfo: '基礎資訊', startBtn: '開始測評 →', nextBtn: '下一步 →',
    resultBtn: '查看結果 →', backBtn: '← 上一步', retakeBtn: '重新測評',
    deviationPct: '偏頗度%', analysisTitle: '體質分析與免疫關聯',
    secondaryTitle: '兼夾體質傾向', planTitle: '個性化改善方案',
    scoreTitle: '八維體質評分', exerciseTitle: '🏃 運動處方',
    dietTitle: '🥗 飲食調養', lifeTitle: '🌙 生活起居',
    warning: '⚠️ 本測評基於《中醫體質分類與判定》國家標準（GB/T 2009），結合現代免疫學研究，僅供健康參考，不作為醫學診斷依據。如有健康問題，請諮詢專業醫師。',
    balanced: '平和質', balancedSub: '氣血調和 · 陰陽平衡 · 正氣充足',
    reportTitle: '我的中醫體質報告', reportTag: '🌿 中醫體質辨識報告',
    yourConst: '您的主體質類型', bodySays: '您的身體在說什麼',
    dualTitle: '中西醫雙維度解讀', tcmLabel: '🏛 中醫病機', westLabel: '🔬 西醫機制',
    roadmapTitle: '90天改善路線圖', todayTitle: '今天就可以開始的3件事',
    exType: '運動處方', dietType: '飲食調養', lifeType: '生活起居',
    secConstTitle: '兼夾體質提示', secConstDesc: '在主體質調理基礎上，需額外注意：',
    secConstSuffix: '，並適當參考', secConstSuffix2: '的飲食建議。',
    shareTitle: '開始你的90天改善計畫', shareSub: '儲存報告，隨時查閱你的個性化方案',
    printBtn: '🖨 列印/儲存PDF', copyBtn: '🔗 複製報告連結', copied: '✅ 已複製',
    notice: '⚠️ 本報告基於《中醫體質分類與判定》國家標準（GB/T 2009），結合現代免疫學研究生成，僅供健康參考，不構成醫學診斷。如有健康問題，請諮詢專業醫師。',
    deviationLbl: '偏頗%', langBtn: '🌐 語言', stepOf: '/',
    saveBannerTitle:'收藏這個連結，隨時查看你的報告',
    saveBannerSub:'你的個性化報告不會消失——複製連結或加入書籤，下次直接開啟繼續打卡',
    copyLinkBtn:'📋 複製專屬連結',dismissBtn:'收起',
    checkinTitle:'每日打卡',checkinPerfect:'🌟 完美打卡',checkinCompleted:'✅ 今日達標',checkinIncomplete:'進行中...',
    streakLabel:'已堅持 {n} 天',monthLabel:'本月完成 {n} 天',
    calendarTitle:'30天打卡記錄',calWeekdays:'日,一,二,三,四,五,六',lowestRate:'最需堅持',
    dataNotice:'💡 資料儲存在本機瀏覽器中，清除快取會遺失記錄',
  },
  'en': {
    title: 'TCM Constitution · Immunity Self-Assessment', chip: 'IMMUNITY SELF-ASSESSMENT',
    h1a: 'Discover Your', h1b: 'TCM Constitution',
    subtitle: 'Based on Chinese National Standard for TCM Constitution Classification (GB/T 2009)\nIntegrating Modern Immunology · Neuroendocrinology · Gut Microbiome Science',
    basicInfo: 'Basic Information', startBtn: 'Start Assessment →', nextBtn: 'Next →',
    resultBtn: 'View Results →', backBtn: '← Back', retakeBtn: 'Retake Assessment',
    deviationPct: 'Score%', analysisTitle: 'Constitution Analysis & Immunity Link',
    secondaryTitle: 'Secondary Constitution Tendencies', planTitle: 'Personalized Improvement Plan',
    scoreTitle: '8-Dimension Constitution Score', exerciseTitle: '🏃 Exercise Rx',
    dietTitle: '🥗 Dietary Therapy', lifeTitle: '🌙 Lifestyle',
    warning: '⚠️ This assessment is based on the Chinese National Standard for TCM Constitution Classification (GB/T 2009), combined with modern immunology research. For health reference only — not a medical diagnosis. Consult a qualified physician for any health concerns.',
    balanced: 'Balanced Constitution', balancedSub: 'Harmonious Qi & Blood · Balanced Yin-Yang · Sufficient Vital Energy',
    reportTitle: 'My TCM Constitution Report', reportTag: '🌿 TCM Constitution Report',
    yourConst: 'Your Primary Constitution Type', bodySays: 'What Your Body Is Telling You',
    dualTitle: 'TCM & Western Medicine Perspectives', tcmLabel: '🏛 TCM Pathomechanism', westLabel: '🔬 Western Mechanism',
    roadmapTitle: '90-Day Improvement Roadmap', todayTitle: '3 Things You Can Start Today',
    exType: 'Exercise', dietType: 'Diet', lifeType: 'Lifestyle',
    secConstTitle: 'Secondary Constitution Note', secConstDesc: 'In addition to primary constitution care, also pay attention to: ',
    secConstSuffix: ', and refer to dietary guidance for ', secConstSuffix2: '.',
    shareTitle: 'Start Your 90-Day Improvement Plan', shareSub: 'Save this report for easy access to your personalized plan',
    printBtn: '🖨 Print / Save PDF', copyBtn: '🔗 Copy Report Link', copied: '✅ Copied!',
    notice: '⚠️ This report is generated based on the Chinese National Standard for TCM Constitution Classification (GB/T 2009), combined with modern immunology research. For health reference only — not a medical diagnosis. Please consult a qualified physician for health concerns.',
    deviationLbl: 'Score', langBtn: '🌐 Language', stepOf: '/',
    saveBannerTitle:'Save this link to access your report anytime',
    saveBannerSub:'Your personalized report is always here — copy the link or bookmark this page to continue your daily check-ins',
    copyLinkBtn:'📋 Copy My Link',dismissBtn:'Dismiss',
    checkinTitle:'Daily Check-in',checkinPerfect:'🌟 Perfect Day',checkinCompleted:'✅ Completed',checkinIncomplete:'In Progress...',
    streakLabel:'{n}-day streak',monthLabel:'{n} days this month',
    calendarTitle:'30-Day Check-in History',calWeekdays:'Su,Mo,Tu,We,Th,Fr,Sa',lowestRate:'Needs focus',
    dataNotice:'💡 Data is stored in your browser — clearing cache will erase records',
  },
  'ja': {
    title: '中医体質判定 · 免疫力セルフチェック', chip: '免疫力セルフチェック',
    h1a: 'あなたの', h1b: '中医体質を知る',
    subtitle: '中医体質分類国家基準（GB/T 2009）に基づく\n現代免疫学・神経内分泌学・腸内微生物学を統合',
    basicInfo: '基本情報', startBtn: '検査開始 →', nextBtn: '次へ →',
    resultBtn: '結果を見る →', backBtn: '← 戻る', retakeBtn: '再検査',
    deviationPct: 'スコア%', analysisTitle: '体質分析と免疫との関係',
    secondaryTitle: '兼夾体質傾向', planTitle: 'パーソナル改善プラン',
    scoreTitle: '8次元体質スコア', exerciseTitle: '🏃 運動処方',
    dietTitle: '🥗 食事療法', lifeTitle: '🌙 生活習慣',
    warning: '⚠️ 本検査は中医体質分類国家基準（GB/T 2009）に基づく健康参考情報であり、医学的診断ではありません。健康上の問題がある場合は医師にご相談ください。',
    balanced: '平和体質', balancedSub: '気血調和・陰陽バランス・正気充実',
    reportTitle: '私の中医体質レポート', reportTag: '🌿 中医体質レポート',
    yourConst: 'あなたの主体質タイプ', bodySays: 'あなたの体が伝えていること',
    dualTitle: '中西医学デュアル解析', tcmLabel: '🏛 中医病機', westLabel: '🔬 西洋医学メカニズム',
    roadmapTitle: '90日間改善ロードマップ', todayTitle: '今日から始める3つのこと',
    exType: '運動', dietType: '食事', lifeType: '生活',
    secConstTitle: '兼夾体質について', secConstDesc: '主体質のケアに加えて注意すべき点：',
    secConstSuffix: '、また', secConstSuffix2: 'の食事指導も参考に。',
    shareTitle: '90日間改善プランを始める', shareSub: 'レポートを保存して、いつでもプランを確認',
    printBtn: '🖨 印刷/PDF保存', copyBtn: '🔗 リンクをコピー', copied: '✅ コピー済み',
    notice: '⚠️ 本レポートは中医体質分類国家基準（GB/T 2009）と現代免疫学研究に基づく健康参考情報です。医学的診断ではありません。',
    deviationLbl: 'スコア', langBtn: '🌐 言語', stepOf: '/',
  },
  'ko': {
    title: '중의 체질 판별 · 면역력 자가진단', chip: '면역력 자가진단',
    h1a: '나의', h1b: '중의 체질 알기',
    subtitle: '중의 체질 분류 국가표준(GB/T 2009) 기반\n현대 면역학·신경내분비학·장내 미생물학 통합',
    basicInfo: '기본 정보', startBtn: '검사 시작 →', nextBtn: '다음 →',
    resultBtn: '결과 보기 →', backBtn: '← 이전', retakeBtn: '다시 검사',
    deviationPct: '점수%', analysisTitle: '체질 분석과 면역 연관성',
    secondaryTitle: '겸협 체질 경향', planTitle: '맞춤 개선 플랜',
    scoreTitle: '8차원 체질 점수', exerciseTitle: '🏃 운동 처방',
    dietTitle: '🥗 식이 요법', lifeTitle: '🌙 생활 습관',
    warning: '⚠️ 본 검사는 중의 체질 분류 국가표준(GB/T 2009)과 현대 면역학 연구에 기반한 건강 참고 정보이며, 의학적 진단이 아닙니다. 건강 문제가 있으면 전문 의사와 상담하세요.',
    balanced: '평화 체질', balancedSub: '기혈 조화 · 음양 균형 · 정기 충족',
    reportTitle: '나의 중의 체질 리포트', reportTag: '🌿 중의 체질 리포트',
    yourConst: '나의 주요 체질 유형', bodySays: '내 몸이 말하는 것',
    dualTitle: '중서의학 이중 분석', tcmLabel: '🏛 한의 병기', westLabel: '🔬 서양의학 메커니즘',
    roadmapTitle: '90일 개선 로드맵', todayTitle: '오늘 시작할 수 있는 3가지',
    exType: '운동', dietType: '식이', lifeType: '생활',
    secConstTitle: '겸협 체질 안내', secConstDesc: '주요 체질 관리와 함께 추가로 주의할 사항: ',
    secConstSuffix: ', 또한 ', secConstSuffix2: '의 식이 지침도 참고하세요.',
    shareTitle: '90일 개선 플랜 시작하기', shareSub: '리포트를 저장하고 맞춤 플랜을 언제든 확인하세요',
    printBtn: '🖨 인쇄/PDF 저장', copyBtn: '🔗 링크 복사', copied: '✅ 복사됨',
    notice: '⚠️ 본 리포트는 중의 체질 분류 국가표준(GB/T 2009)과 현대 면역학 연구를 기반으로 생성된 건강 참고 정보입니다. 의학적 진단이 아닙니다.',
    deviationLbl: '점수', langBtn: '🌐 언어', stepOf: '/',
  },
  'es': {
    title: 'Constitución MTC · Autoevaluación Inmunológica', chip: 'AUTOEVALUACIÓN INMUNOLÓGICA',
    h1a: 'Descubre tu', h1b: 'Constitución MTC',
    subtitle: 'Basado en el Estándar Nacional Chino de Clasificación Constitucional MTC (GB/T 2009)\nIntegrando Inmunología Moderna · Neuroendocrinología · Microbioma Intestinal',
    basicInfo: 'Información Básica', startBtn: 'Iniciar Evaluación →', nextBtn: 'Siguiente →',
    resultBtn: 'Ver Resultados →', backBtn: '← Atrás', retakeBtn: 'Repetir Evaluación',
    deviationPct: 'Puntuación%', analysisTitle: 'Análisis Constitucional y Conexión Inmune',
    secondaryTitle: 'Tendencias Constitucionales Secundarias', planTitle: 'Plan de Mejora Personalizado',
    scoreTitle: 'Puntuación Constitucional 8 Dimensiones', exerciseTitle: '🏃 Ejercicio Terapéutico',
    dietTitle: '🥗 Terapia Dietética', lifeTitle: '🌙 Estilo de Vida',
    warning: '⚠️ Esta evaluación está basada en el Estándar Nacional Chino de MTC (GB/T 2009), combinado con investigación inmunológica moderna. Solo como referencia de salud — no es un diagnóstico médico.',
    balanced: 'Constitución Equilibrada', balancedSub: 'Qi y Sangre Armoniosos · Yin-Yang Balanceado · Energía Vital Suficiente',
    reportTitle: 'Mi Informe de Constitución MTC', reportTag: '🌿 Informe de Constitución MTC',
    yourConst: 'Tu Tipo Constitucional Principal', bodySays: 'Lo que tu cuerpo está diciendo',
    dualTitle: 'Perspectivas MTC y Medicina Occidental', tcmLabel: '🏛 Patomecanismo MTC', westLabel: '🔬 Mecanismo Occidental',
    roadmapTitle: 'Hoja de Ruta de 90 Días', todayTitle: '3 Cosas que puedes empezar hoy',
    exType: 'Ejercicio', dietType: 'Dieta', lifeType: 'Estilo de vida',
    secConstTitle: 'Nota sobre Constitución Secundaria', secConstDesc: 'Además del cuidado constitucional primario, presta atención a: ',
    secConstSuffix: ', y consulta la guía dietética para ', secConstSuffix2: '.',
    shareTitle: 'Inicia tu Plan de 90 Días', shareSub: 'Guarda este informe para acceder a tu plan personalizado',
    printBtn: '🖨 Imprimir / Guardar PDF', copyBtn: '🔗 Copiar enlace', copied: '✅ ¡Copiado!',
    notice: '⚠️ Este informe se genera según el Estándar Nacional Chino de MTC (GB/T 2009). Solo como referencia de salud — no es un diagnóstico médico.',
    deviationLbl: 'Puntaje', langBtn: '🌐 Idioma', stepOf: '/',
  },
  'fr': {
    title: 'Constitution MTC · Auto-évaluation Immunitaire', chip: 'AUTO-ÉVALUATION IMMUNITAIRE',
    h1a: 'Découvrez votre', h1b: 'Constitution MTC',
    subtitle: 'Basé sur le Standard National Chinois de Classification Constitutionnelle MTC (GB/T 2009)\nIntégrant Immunologie Moderne · Neuroendocrinologie · Microbiome Intestinal',
    basicInfo: 'Informations de Base', startBtn: 'Commencer →', nextBtn: 'Suivant →',
    resultBtn: 'Voir les Résultats →', backBtn: '← Retour', retakeBtn: 'Refaire l\'évaluation',
    deviationPct: 'Score%', analysisTitle: 'Analyse Constitutionnelle et Lien Immunitaire',
    secondaryTitle: 'Tendances Constitutionnelles Secondaires', planTitle: 'Plan d\'Amélioration Personnalisé',
    scoreTitle: 'Score Constitutionnel 8 Dimensions', exerciseTitle: '🏃 Prescription Sportive',
    dietTitle: '🥗 Thérapie Alimentaire', lifeTitle: '🌙 Mode de Vie',
    warning: '⚠️ Cette évaluation est basée sur le Standard National Chinois MTC (GB/T 2009), combiné avec la recherche immunologique moderne. À titre de référence santé uniquement — pas un diagnostic médical.',
    balanced: 'Constitution Équilibrée', balancedSub: 'Qi et Sang Harmonieux · Yin-Yang Équilibré · Énergie Vitale Suffisante',
    reportTitle: 'Mon Rapport de Constitution MTC', reportTag: '🌿 Rapport de Constitution MTC',
    yourConst: 'Votre Type Constitutionnel Principal', bodySays: 'Ce que votre corps vous dit',
    dualTitle: 'Perspectives MTC et Médecine Occidentale', tcmLabel: '🏛 Pathoméchanisme MTC', westLabel: '🔬 Mécanisme Occidental',
    roadmapTitle: 'Feuille de Route 90 Jours', todayTitle: '3 choses à commencer aujourd\'hui',
    exType: 'Exercice', dietType: 'Alimentation', lifeType: 'Mode de vie',
    secConstTitle: 'Note sur la Constitution Secondaire', secConstDesc: 'En plus des soins constitutionnels primaires, portez attention à : ',
    secConstSuffix: ', et référez-vous aux conseils diététiques pour ', secConstSuffix2: '.',
    shareTitle: 'Commencez votre Plan de 90 Jours', shareSub: 'Sauvegardez ce rapport pour accéder à votre plan personnalisé',
    printBtn: '🖨 Imprimer / Sauvegarder PDF', copyBtn: '🔗 Copier le lien', copied: '✅ Copié !',
    notice: '⚠️ Ce rapport est généré selon le Standard National Chinois MTC (GB/T 2009). À titre de référence santé uniquement — pas un diagnostic médical.',
    deviationLbl: 'Score', langBtn: '🌐 Langue', stepOf: '/',
  },
  'de': {
    title: 'TCM-Konstitution · Immunität-Selbsttest', chip: 'IMMUNITÄT-SELBSTTEST',
    h1a: 'Entdecken Sie Ihre', h1b: 'TCM-Konstitution',
    subtitle: 'Basiert auf dem chinesischen Nationalstandard für TCM-Konstitutionsklassifikation (GB/T 2009)\nModerne Immunologie · Neuroendokrinologie · Darmmikrobiom',
    basicInfo: 'Grundinformationen', startBtn: 'Bewertung starten →', nextBtn: 'Weiter →',
    resultBtn: 'Ergebnisse anzeigen →', backBtn: '← Zurück', retakeBtn: 'Neu bewerten',
    deviationPct: 'Punktzahl%', analysisTitle: 'Konstitutionsanalyse & Immunzusammenhang',
    secondaryTitle: 'Sekundäre Konstitutionstendenzen', planTitle: 'Personalisierter Verbesserungsplan',
    scoreTitle: '8-dimensionaler Konstitutionsscore', exerciseTitle: '🏃 Bewegungstherapie',
    dietTitle: '🥗 Ernährungstherapie', lifeTitle: '🌙 Lebensstil',
    warning: '⚠️ Diese Bewertung basiert auf dem chinesischen Nationalstandard für TCM (GB/T 2009) und moderner Immunologieforschung. Nur zur Gesundheitsorientierung — kein medizinisches Gutachten.',
    balanced: 'Ausgeglichene Konstitution', balancedSub: 'Harmonisches Qi & Blut · Ausgeglichenes Yin-Yang · Ausreichend Lebensenergie',
    reportTitle: 'Mein TCM-Konstitutionsbericht', reportTag: '🌿 TCM-Konstitutionsbericht',
    yourConst: 'Ihr Haupt-Konstitutionstyp', bodySays: 'Was Ihr Körper Ihnen sagt',
    dualTitle: 'TCM- und westmedizinische Perspektiven', tcmLabel: '🏛 TCM-Pathomechanismus', westLabel: '🔬 Westlicher Mechanismus',
    roadmapTitle: '90-Tage-Verbesserungsplan', todayTitle: '3 Dinge, die Sie heute starten können',
    exType: 'Bewegung', dietType: 'Ernährung', lifeType: 'Lebensstil',
    secConstTitle: 'Hinweis zur sekundären Konstitution', secConstDesc: 'Zusätzlich zur primären Konstitutionspflege achten Sie auf: ',
    secConstSuffix: ', und beziehen Sie die Ernährungsempfehlungen für ', secConstSuffix2: ' ein.',
    shareTitle: 'Starten Sie Ihren 90-Tage-Plan', shareSub: 'Speichern Sie diesen Bericht für Ihren personalisierten Plan',
    printBtn: '🖨 Drucken / PDF speichern', copyBtn: '🔗 Link kopieren', copied: '✅ Kopiert!',
    notice: '⚠️ Dieser Bericht basiert auf dem chinesischen Nationalstandard für TCM (GB/T 2009). Nur zur Gesundheitsorientierung — kein medizinisches Gutachten.',
    deviationLbl: 'Punkte', langBtn: '🌐 Sprache', stepOf: '/',
  },
  'pt': {
    title: 'Constituição MTC · Autoavaliação Imunológica', chip: 'AUTOAVALIAÇÃO IMUNOLÓGICA',
    h1a: 'Descubra sua', h1b: 'Constituição MTC',
    subtitle: 'Baseado no Padrão Nacional Chinês de Classificação Constitucional MTC (GB/T 2009)\nImunologia Moderna · Neuroendocrinologia · Microbioma Intestinal',
    basicInfo: 'Informações Básicas', startBtn: 'Iniciar Avaliação →', nextBtn: 'Próximo →',
    resultBtn: 'Ver Resultados →', backBtn: '← Voltar', retakeBtn: 'Refazer Avaliação',
    deviationPct: 'Pontuação%', analysisTitle: 'Análise Constitucional e Ligação Imune',
    secondaryTitle: 'Tendências Constitucionais Secundárias', planTitle: 'Plano de Melhoria Personalizado',
    scoreTitle: 'Pontuação Constitucional 8 Dimensões', exerciseTitle: '🏃 Prescrição de Exercício',
    dietTitle: '🥗 Terapia Alimentar', lifeTitle: '🌙 Estilo de Vida',
    warning: '⚠️ Esta avaliação é baseada no Padrão Nacional Chinês de MTC (GB/T 2009), combinado com pesquisa imunológica moderna. Apenas como referência de saúde — não é diagnóstico médico.',
    balanced: 'Constituição Equilibrada', balancedSub: 'Qi e Sangue Harmoniosos · Yin-Yang Equilibrado · Energia Vital Suficiente',
    reportTitle: 'Meu Relatório de Constituição MTC', reportTag: '🌿 Relatório de Constituição MTC',
    yourConst: 'Seu Tipo Constitucional Principal', bodySays: 'O que seu corpo está dizendo',
    dualTitle: 'Perspectivas MTC e Medicina Ocidental', tcmLabel: '🏛 Patomecanismo MTC', westLabel: '🔬 Mecanismo Ocidental',
    roadmapTitle: 'Roteiro de 90 Dias', todayTitle: '3 coisas que você pode começar hoje',
    exType: 'Exercício', dietType: 'Dieta', lifeType: 'Estilo de vida',
    secConstTitle: 'Nota sobre Constituição Secundária', secConstDesc: 'Além do cuidado constitucional primário, preste atenção a: ',
    secConstSuffix: ', e consulte as orientações dietéticas para ', secConstSuffix2: '.',
    shareTitle: 'Inicie seu Plano de 90 Dias', shareSub: 'Salve este relatório para acessar seu plano personalizado',
    printBtn: '🖨 Imprimir / Salvar PDF', copyBtn: '🔗 Copiar link', copied: '✅ Copiado!',
    notice: '⚠️ Este relatório é gerado segundo o Padrão Nacional Chinês de MTC (GB/T 2009). Apenas como referência de saúde — não é diagnóstico médico.',
    deviationLbl: 'Pontuação', langBtn: '🌐 Idioma', stepOf: '/',
  },
  'ar': {
    title: 'دستور الطب الصيني · تقييم المناعة الذاتي', chip: 'تقييم المناعة الذاتي',
    h1a: 'اكتشف', h1b: 'دستورك الصحي الصيني',
    subtitle: 'استناداً إلى المعيار الوطني الصيني لتصنيف الدستور الصحي (GB/T 2009)\nيدمج علم المناعة الحديث · علم الغدد العصبية · ميكروبيوم الأمعاء',
    basicInfo: 'المعلومات الأساسية', startBtn: 'بدء التقييم →', nextBtn: 'التالي →',
    resultBtn: 'عرض النتائج →', backBtn: '← رجوع', retakeBtn: 'إعادة التقييم',
    deviationPct: 'النتيجة%', analysisTitle: 'تحليل الدستور والارتباط المناعي',
    secondaryTitle: 'الميول الدستورية الثانوية', planTitle: 'خطة التحسين الشخصية',
    scoreTitle: 'نتيجة الدستور ثماني الأبعاد', exerciseTitle: '🏃 وصفة التمارين',
    dietTitle: '🥗 العلاج الغذائي', lifeTitle: '🌙 نمط الحياة',
    warning: '⚠️ هذا التقييم مستند إلى المعيار الوطني الصيني للطب الصيني (GB/T 2009) مع أبحاث علم المناعة الحديثة. للإرشاد الصحي فقط — وليس تشخيصاً طبياً.',
    balanced: 'دستور متوازن', balancedSub: 'تناسق الطاقة والدم · توازن اليين-يانغ · طاقة حيوية كافية',
    reportTitle: 'تقرير دستوري الصيني', reportTag: '🌿 تقرير الدستور الصيني',
    yourConst: 'نوع دستورك الرئيسي', bodySays: 'ما يخبرك به جسمك',
    dualTitle: 'منظور الطب الصيني والغربي', tcmLabel: '🏛 آلية الطب الصيني', westLabel: '🔬 الآلية الغربية',
    roadmapTitle: 'خارطة طريق 90 يوماً', todayTitle: '3 أشياء يمكنك البدء بها اليوم',
    exType: 'رياضة', dietType: 'تغذية', lifeType: 'نمط حياة',
    secConstTitle: 'ملاحظة الدستور الثانوي', secConstDesc: 'بالإضافة إلى رعاية الدستور الأساسي، انتبه إلى: ',
    secConstSuffix: '، وراجع الإرشادات الغذائية لـ', secConstSuffix2: '.',
    shareTitle: 'ابدأ خطة الـ 90 يوماً', shareSub: 'احفظ هذا التقرير للوصول إلى خطتك الشخصية',
    printBtn: '🖨 طباعة / حفظ PDF', copyBtn: '🔗 نسخ الرابط', copied: '✅ تم النسخ',
    notice: '⚠️ تم إنشاء هذا التقرير وفق المعيار الوطني الصيني للطب الصيني (GB/T 2009). للإرشاد الصحي فقط — وليس تشخيصاً طبياً.',
    deviationLbl: 'النتيجة', langBtn: '🌐 اللغة', stepOf: '/',
  },
};

// ── BASIC questions (zh-CN + en; others fall back to en) ──────────────────────
const BASIC_DATA = {
  'zh-CN': [
    {id:'age', q:'您的年龄段', opts:['18—35岁','36—55岁','55岁以上']},
    {id:'lifestyle', q:'日常主要生活状态', opts:['上班族 / 学生','退休在家','自由职业 / 其他']}
  ],
  'zh-TW': [
    {id:'age', q:'您的年齡段', opts:['18—35歲','36—55歲','55歲以上']},
    {id:'lifestyle', q:'日常主要生活狀態', opts:['上班族 / 學生','退休在家','自由職業 / 其他']}
  ],
  'en': [
    {id:'age', q:'Your age group', opts:['18–35 years','36–55 years','55+ years']},
    {id:'lifestyle', q:'Primary daily lifestyle', opts:['Office worker / Student','Retired','Freelance / Other']}
  ],
  'ja': [
    {id:'age', q:'年齢層', opts:['18〜35歳','36〜55歳','55歳以上']},
    {id:'lifestyle', q:'主な生活スタイル', opts:['会社員・学生','定年退職','フリーランス・その他']}
  ],
  'ko': [
    {id:'age', q:'연령대', opts:['18~35세','36~55세','55세 이상']},
    {id:'lifestyle', q:'주요 생활 방식', opts:['직장인/학생','은퇴','프리랜서/기타']}
  ],
  'es': [
    {id:'age', q:'Su grupo de edad', opts:['18–35 años','36–55 años','55+ años']},
    {id:'lifestyle', q:'Estilo de vida principal', opts:['Empleado / Estudiante','Jubilado','Autónomo / Otro']}
  ],
  'fr': [
    {id:'age', q:'Votre tranche d\'âge', opts:['18–35 ans','36–55 ans','55+ ans']},
    {id:'lifestyle', q:'Style de vie principal', opts:['Salarié / Étudiant','Retraité','Freelance / Autre']}
  ],
  'de': [
    {id:'age', q:'Ihre Altersgruppe', opts:['18–35 Jahre','36–55 Jahre','55+ Jahre']},
    {id:'lifestyle', q:'Hauptlebensweise', opts:['Angestellt / Student','Rentner','Freiberuflich / Sonstiges']}
  ],
  'pt': [
    {id:'age', q:'Sua faixa etária', opts:['18–35 anos','36–55 anos','55+ anos']},
    {id:'lifestyle', q:'Estilo de vida principal', opts:['Trabalhador / Estudante','Aposentado','Freelancer / Outro']}
  ],
  'ar': [
    {id:'age', q:'الفئة العمرية', opts:['18–35 عاماً','36–55 عاماً','55+ عاماً']},
    {id:'lifestyle', q:'نمط الحياة الرئيسي', opts:['موظف / طالب','متقاعد','مستقل / آخر']}
  ],
};

// ── OPTS (answer scale) ───────────────────────────────────────────────────────
const OPTS_DATA = {
  'zh-CN': [{l:'从不',v:0},{l:'偶尔',v:1},{l:'经常',v:2},{l:'总是',v:3}],
  'zh-TW': [{l:'從不',v:0},{l:'偶爾',v:1},{l:'經常',v:2},{l:'總是',v:3}],
  'en':    [{l:'Never',v:0},{l:'Sometimes',v:1},{l:'Often',v:2},{l:'Always',v:3}],
  'ja':    [{l:'まったくない',v:0},{l:'たまに',v:1},{l:'よくある',v:2},{l:'いつも',v:3}],
  'ko':    [{l:'전혀',v:0},{l:'가끔',v:1},{l:'자주',v:2},{l:'항상',v:3}],
  'es':    [{l:'Nunca',v:0},{l:'A veces',v:1},{l:'A menudo',v:2},{l:'Siempre',v:3}],
  'fr':    [{l:'Jamais',v:0},{l:'Parfois',v:1},{l:'Souvent',v:2},{l:'Toujours',v:3}],
  'de':    [{l:'Nie',v:0},{l:'Manchmal',v:1},{l:'Oft',v:2},{l:'Immer',v:3}],
  'pt':    [{l:'Nunca',v:0},{l:'Às vezes',v:1},{l:'Frequentemente',v:2},{l:'Sempre',v:3}],
  'ar':    [{l:'أبداً',v:0},{l:'أحياناً',v:1},{l:'غالباً',v:2},{l:'دائماً',v:3}],
};

// ── CONSTS data (zh-CN + en content; other languages show en) ─────────────────
const CONSTS_DATA = {
  'zh-CN': [
    {id:'qiXu',name:'气虚质',color:'#2E7D6B',light:'#E8F5F1',icon:'🌿',sum:'元气不足，卫表不固',west:'NK细胞活性低，细胞免疫受抑',qs:['容易感冒，且感冒后恢复较慢（超过1周）','稍微活动就感到疲倦、气短，懒得说话','不运动也容易出汗，或稍动即大汗','说话声音偏低弱，平时不爱动、容易疲乏']},
    {id:'yangXu',name:'阳虚质',color:'#1C5FAF',light:'#E8F0FB',icon:'❄️',sum:'命门火衰，温煦无力',west:'基础代谢率低，体温调节障碍',qs:['手脚发凉，即使夏天也比别人冷','比同龄人更怕冷，需要比别人多添衣物','精神不振，早晨难以起床，情绪偏低落','大便偏稀或不成形，容易腹泻']},
    {id:'yinXu',name:'阴虚质',color:'#C0392B',light:'#FEF0ED',icon:'🔥',sum:'阴液亏少，虚热内生',west:'氧化应激增加，Th2偏移',qs:['手足心发热，午后面部有发热感','口干咽燥，喜喝冷饮，眼睛干涩','夜间睡眠差，入睡困难或易惊醒、盗汗','大便干燥，皮肤干燥缺水']},
    {id:'tanShi',name:'痰湿质',color:'#2E8B57',light:'#E8F5EE',icon:'💧',sum:'脾失健运，痰湿凝聚',west:'慢性低度炎症，肠道菌群失衡',qs:['体型偏胖，腹部肥满松软','身体感觉沉重，头脑不清醒，像裹了层东西','口中发黏有异味，或早起痰多','饭后腹胀明显，肠胃容易不适']},
    {id:'shiRe',name:'湿热质',color:'#B7770D',light:'#FEF6E4',icon:'☀️',sum:'湿热内蕴，三焦壅滞',west:'Th17/Treg失衡，LPS内毒素升高',qs:['面部油脂旺盛，容易长痤疮粉刺','口苦口干，大便偏黄黏腻，小便颜色深','身体容易感到燥热，心烦易怒']},
    {id:'xueYu',name:'血瘀质',color:'#8B2A2A',light:'#FAEAEA',icon:'🌸',sum:'气滞血瘀，脉络不畅',west:'微循环障碍，免疫细胞归巢受阻',qs:['皮肤晦暗无光泽，容易出现色斑或瘀青','面唇颜色偏暗紫，或舌头颜色偏紫暗','身体容易出现固定位置的刺痛']},
    {id:'qiYu',name:'气郁质',color:'#6B3FA0',light:'#F0EAFC',icon:'🌙',sum:'肝失疏泄，气机郁结',west:'HPA轴持续激活，皮质醇抑制免疫',qs:['情绪容易低落、郁闷，对事物缺乏兴趣','胸口有憋闷感，或肋骨两侧有胀痛','容易紧张焦虑，对压力敏感，难以放松','睡眠质量差，易受情绪影响']},
    {id:'teBing',name:'特禀质',color:'#1A7A6E',light:'#E4F5F3',icon:'⚡',sum:'禀赋不足，营卫不和',west:'IgE过激，Treg功能不足',qs:['对花粉、灰尘、某些食物或药物容易过敏','季节变化或温差大时出现鼻痒、打喷嚏、皮肤瘙痒','有过敏性鼻炎、哮喘、湿疹等过敏性疾病史']}
  ],
  'en': [
    {id:'qiXu',name:'Qi Deficiency',color:'#2E7D6B',light:'#E8F5F1',icon:'🌿',sum:'Insufficient vital energy, weak defensive Qi',west:'Low NK cell activity, suppressed cellular immunity',qs:['Catch colds easily; recovery takes more than 1 week','Feel fatigued and breathless after mild activity; reluctant to talk','Sweat without exercise, or sweat heavily with minimal movement','Speak in a low, weak voice; generally inactive and easily fatigued']},
    {id:'yangXu',name:'Yang Deficiency',color:'#1C5FAF',light:'#E8F0FB',icon:'❄️',sum:'Declining vital-gate fire, inadequate warmth',west:'Low basal metabolic rate, thermoregulation disorder',qs:['Cold hands and feet, even in summer','Feel colder than peers; need more clothing than others','Low energy, difficulty getting up, low mood','Loose or unformed stools; prone to diarrhea']},
    {id:'yinXu',name:'Yin Deficiency',color:'#C0392B',light:'#FEF0ED',icon:'🔥',sum:'Depleted Yin fluids, internal deficiency-heat',west:'Increased oxidative stress, Th2 immune shift',qs:['Warm palms and soles; flushing sensation in the afternoon','Dry mouth and throat; prefer cold drinks; dry eyes','Poor sleep; difficulty falling asleep, easily awakened, night sweats','Dry stools; dry, dehydrated skin']},
    {id:'tanShi',name:'Phlegm-Dampness',color:'#2E8B57',light:'#E8F5EE',icon:'💧',sum:'Spleen failing to transform, phlegm-dampness accumulating',west:'Chronic low-grade inflammation, gut microbiome dysbiosis',qs:['Overweight, especially soft/flabby abdomen','Body feels heavy and sluggish; foggy mind, like wrapped in something','Sticky or bad taste in mouth; excessive phlegm in the morning','Notable bloating after meals; prone to digestive discomfort']},
    {id:'shiRe',name:'Damp-Heat',color:'#B7770D',light:'#FEF6E4',icon:'☀️',sum:'Damp-heat accumulation, triple-burner stagnation',west:'Th17/Treg imbalance, elevated LPS endotoxin',qs:['Oily face; prone to acne and pimples','Bitter or dry mouth; yellowish sticky stools; dark urine','Easily feel overheated; irritable and easily angered']},
    {id:'xueYu',name:'Blood Stasis',color:'#8B2A2A',light:'#FAEAEA',icon:'🌸',sum:'Qi stagnation and blood stasis, blocked channels',west:'Microcirculation disorder, impaired immune cell homing',qs:['Dull, lackluster skin; prone to dark spots or bruising','Dark or purplish complexion, lips, or tongue','Fixed stabbing pain at specific body locations']},
    {id:'qiYu',name:'Qi Stagnation',color:'#6B3FA0',light:'#F0EAFC',icon:'🌙',sum:'Liver failing to spread Qi, Qi mechanism stagnating',west:'Sustained HPA axis activation, cortisol suppressing immunity',qs:['Prone to low mood or depression; lack of interest in things','Chest tightness or distending pain along the ribs','Prone to anxiety, sensitive to stress, difficulty relaxing','Poor sleep quality; easily affected by emotions']},
    {id:'teBing',name:'Allergic Constitution',color:'#1A7A6E',light:'#E4F5F3',icon:'⚡',sum:'Innate insufficiency, disharmony of nutrients and defenses',west:'IgE over-activation, insufficient Treg function',qs:['Easily allergic to pollen, dust, certain foods or medications','Nasal itching, sneezing, or skin itching during seasonal/temperature changes','History of allergic rhinitis, asthma, eczema or other allergic diseases']}
  ],
};
// For other languages, fall back to English constitution data
['zh-TW','ja','ko','es','fr','de','pt','ar'].forEach(lang => {
  CONSTS_DATA[lang] = CONSTS_DATA['en'];
});
// zh-TW uses Traditional Chinese names
CONSTS_DATA['zh-TW'] = CONSTS_DATA['zh-CN'].map(c => ({...c}));

// ── DET advice data (zh-CN + en) ──────────────────────────────────────────────
const DET_DATA = {
  'zh-CN': {
    qiXu:{risk:'高',rc:'#E8614A',desc:'气虚表现较明显。气是生命活动的根本动力，气虚则卫表不固，外邪容易乘虚而入。现代研究证实，气虚质人群NK细胞活性和CD4⁺/CD8⁺比值显著偏低，呼吸道分泌型IgA（sIgA）下降30-40%，导致反复感冒和持续性疲劳。',ex:['八段锦：双手托天、调理脾胃须单举','每日散步30分钟（中低强度）','避免大量出汗的剧烈运动'],di:['黄芪15g + 红枣5枚泡水代茶','薏苡仁山药粥（健脾补气）','少食生冷油腻，忌过饱'],li:['23点前入睡（保护生长激素峰值）','避免过度劳累，适当午休20分钟','腹式深呼吸每日2次，每次5分钟']},
    yangXu:{risk:'高',rc:'#E8614A',desc:'阳虚体质突出。阳气是人体的"发动机"，阳虚则温煦不足，免疫细胞活性随体温下降——体温每降1°C，免疫细胞活性下降约37%。寒冷环境下干扰素（IFN-γ）产生减少，固有免疫和适应性免疫效率均明显减弱。',ex:['五禽戏熊戏（激活肾阳）','慢跑或快走，运动后及时保暖','太极拳（温和激活阳气）'],di:['生姜红糖水（温中散寒）','羊肉汤、韭菜（温阳补肾）','忌西瓜、冷饮、冰淇淋等寒凉食物'],li:['艾灸关元、命门、足三里（每周2-3次）','热水泡脚（40°C，20分钟）','注意背部保暖（督脉阳气枢纽）']},
    yinXu:{risk:'中高',rc:'#F0A040',desc:'阴虚热象明显。阴液是濡润滋养的基础，阴虚则虚火内生。现代研究表明阴虚质氧化应激升高，Th1/Th2失衡偏向Th2，端粒酶活性降低，夜间皮质醇偏高抑制T细胞增殖。',ex:['太极拳（慢速以柔养阴）','游泳（水性属阴，最适合阴虚质）','六字诀"呬"字功，避免大量出汗'],di:['百合莲子银耳汤（滋阴润燥）','枸杞麦冬泡水（滋补肝肾）','少食辛辣、油炸、烧烤食物'],li:['23点前入睡，保护褪黑素-免疫轴','减少熬夜和过度用眼','午间小憩15-20分钟']},
    tanShi:{risk:'高',rc:'#E8614A',desc:'痰湿体质明显。脾主运化水湿，脾虚则湿聚成痰。内脏脂肪积累导致TNF-α、IL-6、CRP慢性升高（是平和质的2.3倍），肠漏增加LPS入血，形成持续性低度内毒素血症，持续消耗免疫资源。',ex:['快走、游泳、骑车（每周5次，每次45分钟）','八段锦全套（运化脾胃）','坚持规律运动，切忌间断'],di:['薏苡仁赤小豆粥（健脾祛湿）','陈皮茯苓茶（化痰利湿）','严控精制碳水、甜食、酒精'],li:['饭后散步30分钟（助运化）','避免久坐，每小时起身活动','保持居室干燥通风']},
    shiRe:{risk:'中高',rc:'#F0A040',desc:'湿热内蕴较重。Th17细胞过度活跃，IL-17、IL-6炎症因子持续升高；肠道革兰阴性菌过度生长产生大量LPS，推动系统性炎症；皮肤微生物群失衡，屏障功能受损。',ex:['中等强度有氧运动，避免极度出汗后受凉','游泳（清热利湿）','避免高温瑜伽、桑拿等产热运动'],di:['绿豆汤（清热解毒）','苦瓜、蒲公英、冬瓜（清利湿热）','戒酒戒烟，少食辛辣烧烤'],li:['保持大便通畅（肠道排毒关键）','规律作息，避免熬夜','保持皮肤清洁']},
    xueYu:{risk:'中高',rc:'#F0A040',desc:'血瘀状态较明显。微循环障碍导致免疫细胞归巢效率降低，到达感染灶时间延迟；血管内皮功能受损与IL-6、CRP升高正相关；组织慢性缺氧影响代谢废物清除，加速细胞老化。',ex:['五禽戏鸟戏（展翅动作，促进气血流通）','有氧运动改善微循环（每日30分钟）','冷热交替浴（促进血液循环）'],di:['山楂陈皮茶（活血化瘀）','黑木耳、红曲（改善微循环）','少食高脂油腻食物'],li:['严禁久坐（每小时起立活动5分钟）','睡前腿部抬高促进静脉回流','保持情绪舒畅，避免气滞']},
    qiYu:{risk:'高',rc:'#E8614A',desc:'气郁状态突出。心理神经免疫学研究：长期压力使感冒病毒易感性增加2-3倍（Cohen等，NEJM 1991），抑郁患者NK细胞活性降低30-50%，皮质醇慢性升高直接加速病毒复制，迷走神经张力降低影响全身免疫调控。',ex:['太极拳、站桩（调节自主神经平衡）','户外有氧运动（阳光+运动双调5-羟色胺）','集体运动（社交改善气郁）'],di:['玫瑰花茶、茉莉花茶（疏肝解郁）','陈皮、佛手（理气解郁）','少饮酒（短期缓解长期加重）'],li:['腹式呼吸激活迷走神经（每日早晚各10分钟）','培养社交活动，避免自我孤立','情绪日记（客观化压力）']},
    teBing:{risk:'特殊',rc:'#2E7D6B',desc:'特禀体质（过敏体质）明显。与其他体质不同，特禀质不是免疫低下，而是免疫调节紊乱——IgE介导I型超敏反应过激，Th1/Th2严重偏向Th2，Treg细胞功能不足。干预目标是「调节免疫平衡」而非「提升免疫」。',ex:['规律适度有氧运动调节Th1/Th2平衡','户外运动增加自然暴露，激活Treg细胞','游泳（注意氯气过敏）'],di:['益生菌食品（酸奶、泡菜）调节肠道菌群','玉屏风散：黄芪、白术、防风（固表止敏）','严格回避已知过敏原'],li:['适度接触自然环境（支持卫生假说）','使用空气净化器改善居室环境','过敏季节提前预防']}
  },
  'en': {
    qiXu:{risk:'High',rc:'#E8614A',desc:'Significant Qi Deficiency signs. Qi is the fundamental driving force of life — when deficient, the body\'s defensive surface weakens, allowing pathogens to invade. Modern research confirms that Qi Deficiency individuals show markedly lower NK cell activity and CD4⁺/CD8⁺ ratios, with respiratory sIgA (secretory IgA) reduced by 30–40%, causing recurrent colds and persistent fatigue.',ex:['Baduanjin Qigong: "Two Hands Hold Up the Sky" and "One Hand Rises"','Daily 30-min walk (low-moderate intensity)','Avoid vigorous exercise that causes heavy sweating'],di:['Astragalus (15g) + Red dates (5) steeped as daily tea','Yam and barley congee (strengthens Spleen Qi)','Avoid cold/raw foods and overeating'],li:['Sleep before 11pm (protect growth hormone peak)','Avoid overexertion; take a 20-min afternoon nap','Abdominal breathing: 2×/day, 5 min each (activates parasympathetic)']},
    yangXu:{risk:'High',rc:'#E8614A',desc:'Prominent Yang Deficiency constitution. Yang Qi is the body\'s "engine" — deficiency means insufficient warmth, and immune cell activity drops with body temperature: every 1°C drop reduces immune cell activity by ~37%. IFN-γ production decreases in cold conditions, significantly weakening both innate and adaptive immunity.',ex:['Five-Animal Frolics "Bear Play" (activates kidney Yang)','Jogging or brisk walking; warm up immediately after exercise','Tai Chi (gentle activation of Yang Qi)'],di:['Ginger-brown sugar tea (warming and dispelling cold)','Lamb soup, chives (tonify Yang and nourish kidneys)','Strictly avoid watermelon, cold drinks, ice cream'],li:['Moxibustion on Guanyuan, Mingmen, Zusanli (2–3×/week)','Hot foot bath (40°C, 20 min)','Keep back and lower back warm (Du channel Yang hub)']},
    yinXu:{risk:'Medium-High',rc:'#F0A040',desc:'Clear Yin Deficiency heat signs. Yin fluids are the basis for nourishment — deficiency generates internal deficiency-heat. Research shows increased oxidative stress, Th1/Th2 imbalance shifted toward Th2, reduced telomerase activity, and elevated nighttime cortisol suppressing T-cell proliferation.',ex:['Tai Chi (slow pace, softness nourishes Yin)','Swimming (water nature is Yin — ideal for this constitution)','Six-Healing Sounds "Sss" exercise; avoid heavy sweating'],di:['Lily, lotus seed and white fungus soup (nourish Yin and moisten dryness)','Goji berry and ophiopogon tea (tonify Liver and Kidney Yin)','Avoid spicy, deep-fried, and grilled foods'],li:['Sleep before 11pm (protect melatonin-immune axis)','Reduce late nights and excessive screen time','Short 15–20 min afternoon nap']},
    tanShi:{risk:'High',rc:'#E8614A',desc:'Marked Phlegm-Dampness constitution. The Spleen governs transformation of fluids — Spleen deficiency leads to dampness accumulating into phlegm. Visceral fat accumulation drives chronic elevation of TNF-α, IL-6, CRP (2.3× higher than balanced constitution), leaky gut increases LPS in blood, creating sustained low-grade endotoxemia.',ex:['Brisk walking, swimming, cycling (5×/week, 45 min each)','Full Baduanjin Qigong set (activates Spleen and Stomach)','Consistency is key — never skip for extended periods'],di:['Barley and adzuki bean porridge (strengthen Spleen, remove dampness)','Tangerine peel and poria tea (dissolve phlegm, drain dampness)','Strictly limit refined carbs, sweets, and alcohol'],li:['Walk 30 min after meals (aids digestion)','Avoid prolonged sitting; stand and move every hour','Keep living space dry and well-ventilated']},
    shiRe:{risk:'Medium-High',rc:'#F0A040',desc:'Significant Damp-Heat accumulation. Th17 cells are overactive with persistently elevated IL-17 and IL-6; overgrowth of gram-negative gut bacteria produces excess LPS driving systemic inflammation; skin microbiome imbalance impairs barrier function.',ex:['Moderate-intensity aerobic exercise; avoid getting chilled after heavy sweating','Swimming (exercise while clearing heat)','Avoid hot yoga, saunas, and other heat-generating activities'],di:['Mung bean soup (clear heat and toxins)','Bitter melon, dandelion tea, winter melon (clear damp-heat)','Quit alcohol and smoking; minimize spicy and grilled foods'],li:['Maintain regular bowel movements (key for eliminating damp-heat)','Regular schedule; absolutely avoid late nights','Keep skin clean; use gentle cleansers']},
    xueYu:{risk:'Medium-High',rc:'#F0A040',desc:'Evident Blood Stasis state. Microcirculation disorders reduce immune cell homing efficiency, delaying arrival at infection sites; vascular endothelial dysfunction positively correlates with elevated IL-6 and CRP; chronic tissue hypoxia accelerates cellular aging.',ex:['Five-Animal Frolics "Bird Play" (wing movements promote Qi and blood flow)','Aerobic exercise to improve microcirculation (30 min/day)','Contrast bath: alternating warm/cold water (3 cycles)'],di:['Hawthorn and tangerine peel tea (activate blood, dissolve stasis)','Black fungus, red yeast (improve microcirculation)','Minimize high-fat and greasy foods'],li:['Never sit for long periods (stand and move 5 min/hour)','Elevate legs before sleep to promote venous return','Keep emotions balanced; avoid Qi stagnation worsening blood stasis']},
    qiYu:{risk:'High',rc:'#E8614A',desc:'Prominent Qi Stagnation. Psychoneuroimmunology research: chronic stress increases cold virus susceptibility 2–3× (Cohen et al., NEJM 1991); depressed individuals show 30–50% lower NK cell activity; chronically elevated cortisol directly accelerates virus replication; reduced vagal tone impairs systemic immune regulation.',ex:['Tai Chi, standing meditation (regulate autonomic nervous balance)','Outdoor aerobic exercise (sunlight + exercise both boost serotonin)','Group sports (social interaction is medicine for Qi Stagnation)'],di:['Rose and jasmine tea (soothe Liver, relieve stagnation)','Tangerine peel, finger citron (regulate Qi, relieve stagnation)','Minimize alcohol (short-term relief worsens long-term stagnation)'],li:['Abdominal breathing to activate vagal nerve (10 min morning and evening)','Build social connections; avoid self-isolation','Emotion journal: record 3 good things daily (scientifically shown to lower cortisol)']},
    teBing:{risk:'Special',rc:'#2E7D6B',desc:'Marked Allergic Constitution. Unlike other constitutions, this is not immune deficiency — it\'s immune dysregulation: overactivated IgE-mediated type-I hypersensitivity, severe Th1/Th2 imbalance toward Th2, insufficient regulatory T-cell (Treg) function. The intervention goal is "regulate immune balance" — not "boost immunity".',ex:['Regular moderate aerobic exercise to regulate Th1/Th2 balance','Outdoor exercise to increase nature exposure and activate Treg cells','Swimming (watch for chlorine sensitivity)'],di:['Probiotic foods (plain yogurt, kimchi) to balance gut microbiome','Jade Screen formula: astragalus, atractylodes, saposhnikovia (tonify defensive Qi)','Strictly avoid all known allergens'],li:['Moderate exposure to natural environments (supports hygiene hypothesis)','Air purifier for indoor environment','Begin preventive measures 2–3 weeks before allergy season']}
  }
};
['zh-TW','ja','ko','es','fr','de','pt','ar'].forEach(lang => {
  DET_DATA[lang] = DET_DATA['en'];
});

// ── DB data for report.html (same content as index.html DET but richer) ───────
// Report uses the same constitution names from CONSTS_DATA for labels
// The detailed report DB is large; we reuse CONSTS_DATA for names and DET_DATA for advice

// ── Accessor functions ────────────────────────────────────────────────────────
function getBasic() {
  const lang = getLang();
  return BASIC_DATA[lang] || BASIC_DATA['en'];
}
function getOpts() {
  const lang = getLang();
  return OPTS_DATA[lang] || OPTS_DATA['en'];
}
function getConsts() {
  const lang = getLang();
  return CONSTS_DATA[lang] || CONSTS_DATA['en'];
}
function getDet() {
  const lang = getLang();
  return DET_DATA[lang] || DET_DATA['en'];
}
function getConstName(id) {
  const c = getConsts().find(x => x.id === id);
  return c ? c.name : id;
}

// ── UID ─────────────────────────────────────────────────────────────────────
function getOrCreateUid(){
  let uid=localStorage.getItem('user_uid');
  if(uid&&uid.length===14) return uid;
  const ts=Date.now().toString(36).slice(-8).padStart(8,'0');
  const rnd=Math.random().toString(36).slice(2,8).padStart(6,'0');
  uid=ts+rnd;
  localStorage.setItem('user_uid',uid);
  return uid;
}

// ── Language Switcher UI ──────────────────────────────────────────────────────
const LANG_LABELS = {
  'zh-CN':'简体中文','zh-TW':'繁體中文','en':'English','ja':'日本語',
  'ko':'한국어','es':'Español','fr':'Français','de':'Deutsch','pt':'Português','ar':'العربية'
};

function renderLangSwitcher() {
  const cur = getLang();
  return `
<div id="langSwitcher" style="position:fixed;top:16px;right:16px;z-index:1000">
  <button onclick="toggleLangMenu()" id="langBtn" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:rgba(255,255,255,.92);border:1px solid #E4ECF2;border-radius:100px;font-family:inherit;font-size:12px;color:#1A2B3C;cursor:pointer;box-shadow:0 2px 12px rgba(28,53,87,.1);backdrop-filter:blur(8px)">${t('langBtn')} <span style="font-size:10px;opacity:.6">▾</span></button>
  <div id="langMenu" style="display:none;position:absolute;right:0;top:calc(100% + 6px);background:#fff;border:1px solid #E4ECF2;border-radius:14px;box-shadow:0 8px 32px rgba(28,53,87,.14);overflow:hidden;min-width:160px">
    ${SUPPORTED_LANGS.map(l=>`<div onclick="setLang('${l}');toggleLangMenu()" style="padding:10px 18px;font-size:13px;cursor:pointer;color:${l===cur?'#2E7D6B':'#1A2B3C'};font-weight:${l===cur?'600':'400'};background:${l===cur?'#E8F5F1':'transparent'};transition:background .15s" onmouseover="this.style.background='${l===cur?'#E8F5F1':'#F7F9FC'}'" onmouseout="this.style.background='${l===cur?'#E8F5F1':'transparent'}'">${LANG_LABELS[l]}</div>`).join('')}
  </div>
</div>`;
}

function toggleLangMenu() {
  const m = document.getElementById('langMenu');
  if (m) m.style.display = m.style.display === 'none' ? 'block' : 'none';
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
  const sw = document.getElementById('langSwitcher');
  if (sw && !sw.contains(e.target)) {
    const m = document.getElementById('langMenu');
    if (m) m.style.display = 'none';
  }
});

// Apply lang/dir on load
(function() {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
})();
