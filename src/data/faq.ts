// 鑫永恒官网 · 静态 FAQ 知识库（方案 A：零后端、零出网、零维护）
// 数据源：官网真实信息（BaseLayout orgSchema / contact）+ E:\鑫永恒自动回复系统 4 份 HTML 的技术内容
// ⚠️ 联系信息必须以官网为准（sales@eternalcnc.com / +86 181 2398 3352 / 深圳宝安），
//    旧素材里的东莞地址、0769 电话、info@ 邮箱均为过时信息，已纠正。
// ⚠️ 设备台数/年限为口径敏感项，本知识库一律用模糊表述，避免制造新的口径冲突。
// ⚠️ 日/俄/韩/西/德/阿答案为 AI 翻译，口径与英文一致（模糊年限、不碰敏感数字），建议母语者校对。
// ⚠️ 非拉丁/汉字语系的关键词（日/俄/韩/阿）与西语重音、德语变音都单独列出词干，不能复用中/英关键词。

export interface FaqItem {
  id: string;
  /** 英文匹配关键词（含同义/拼写变体） */
  kw: string[];
  /** 中文匹配关键词 */
  kwZh: string[];
  /** 日语匹配关键词（日文汉字/假名与中文简体不同，需单独列出：見積/納期/支払い/表面処理…） */
  kwJa?: string[];
  /** 俄语匹配关键词（西里尔词干） */
  kwRu?: string[];
  /** 韩语匹配关键词（谚文词干） */
  kwKo?: string[];
  /** 西班牙语匹配关键词（含重音变体） */
  kwEs?: string[];
  /** 德语匹配关键词（含变音 ä/ö/ü/ß 及 ae/oe/ue/ss 替代） */
  kwDe?: string[];
  /** 阿拉伯语匹配关键词（阿拉伯字母词干） */
  kwAr?: string[];
  /** 法语匹配关键词（含重音词干 é/è/ê/à/ç/ô/î/ù/û/œ 等） */
  kwFr?: string[];
  en: { q: string; a: string };
  zh: { q: string; a: string };
  /** 日语答案（可选，AI 翻译） */
  ja?: { q: string; a: string };
  /** 俄语答案（可选，AI 翻译） */
  ru?: { q: string; a: string };
  /** 韩语答案（可选，AI 翻译） */
  ko?: { q: string; a: string };
  /** 西班牙语答案（可选，AI 翻译） */
  es?: { q: string; a: string };
  /** 德语答案（可选，AI 翻译） */
  de?: { q: string; a: string };
  /** 阿拉伯语答案（可选，AI 翻译，RTL） */
  ar?: { q: string; a: string };
  /** 法语答案（可选，AI 翻译） */
  fr?: { q: string; a: string };
}

export const COMPANY = {
  email: 'sales@eternalcnc.com',
  phone: '+86 181 2398 3352',
  name: 'Eternal CNC (Xinyongheng Precision Industrial Co., Ltd.)',
  nameZh: '鑫永恒（深圳）精密实业有限公司',
  location: 'Shenzhen, China',
  locationZh: '中国深圳（宝安区）',
  site: 'https://eternalcnc.com',
};

export const faqItems: FaqItem[] = [
  {
    id: 'services',
    kw: ['service', 'services', 'capabilit', 'milling', 'turning', 'grinding', 'edm', 'wire', '5 axis', '5-axis', 'cnc', 'what do you', 'offer'],
    kwZh: ['服务', '加工', '工艺', '铣', '车', '磨', '线切割', '五轴', '能力', '做什么'],
    kwJa: ['加工', 'サービス', 'フライス', '旋盤', '研削', '放電', '5軸', 'cnc', 'できますか'],
    kwRu: ['услуг', 'обработк', 'фрезер', 'токарн', 'шлифов', 'электроэрози', '5-ос', 'cnc', 'предоставляете', 'чпу'],
    kwKo: ['서비스', '가공', '밀링', '선반', '연삭', '와이어', '5축', 'cnc', '제공'],
    kwEs: ['servicio', 'servicios', 'mecanizado', 'fresado', 'torneado', 'rectificado', 'edm', '5 ejes', 'cnc', 'ofrecen'],
    kwDe: ['dienstleistung', 'leistungen', 'fräsen', 'fraesen', 'drehen', 'schleifen', 'erodieren', '5-achs', 'cnc', 'anbieten'],
    kwAr: ['خدمات', 'تصنيع', 'تفريز', 'خراطة', 'طحن', 'تفريغ', '5 محاور', 'cnc', 'تقدمون'],
    en: {
      q: 'What CNC services do you provide?',
      a: 'We provide full CNC precision machining:\n• CNC milling — 3/4/5-axis, up to 1200×600×500mm, ±0.01mm\n• CNC turning — up to Ø500mm\n• Precision grinding — flatness 0.005mm, Ra 0.2µm mirror finish\n• Wire EDM — ±0.005mm, up to 400mm cut height\nPlus free DFM analysis, surface treatment and full quality inspection.',
    },
    zh: {
      q: '你们提供哪些 CNC 加工服务？',
      a: '我们提供完整的 CNC 精密加工：\n• CNC 铣削 — 3/4/5 轴联动，最大 1200×600×500mm，精度 ±0.01mm\n• CNC 车削 — 最大直径 Ø500mm\n• 精密磨削 — 平面度 0.005mm，Ra 0.2µm 镜面\n• 线切割（Wire EDM）— 精度 ±0.005mm，最大切高 400mm\n另提供免费 DFM 分析、表面处理与全尺寸质量检测。',
    },
    ja: {
      q: 'どのようなCNC加工サービスを提供していますか？',
      a: 'フルラインのCNC精密加工を提供しています：\n• CNCフライス加工 — 3/4/5軸、最大1200×600×500mm、±0.01mm\n• CNC旋盤加工 — 最大Ø500mm\n• 精密研削 — 平面度0.005mm、Ra 0.2µm鏡面仕上げ\n• ワイヤ放電加工（ワイヤEDM）— ±0.005mm、最大切高400mm\nさらに無料のDFM解析、表面処理、全寸法品質検査もご提供します。',
    },
    ru: {
      q: 'Какие услуги ЧПУ-обработки вы предоставляете?',
      a: 'Мы предоставляем полный спектр прецизионной ЧПУ-обработки:\n• Фрезерная обработка — 3/4/5-осевая, до 1200×600×500 мм, ±0,01 мм\n• Токарная обработка — до Ø500 мм\n• Прецизионное шлифование — плоскостность 0,005 мм, зеркальная поверхность Ra 0,2 мкм\n• Проволочная электроэрозионная обработка (Wire EDM) — ±0,005 мм, высота реза до 400 мм\nТакже бесплатный DFM-анализ, обработка поверхности и полный контроль размеров.',
    },
    ko: {
      q: '어떤 CNC 가공 서비스를 제공하나요?',
      a: '완전한 CNC 정밀 가공을 제공합니다:\n• CNC 밀링 — 3/4/5축, 최대 1200×600×500mm, ±0.01mm\n• CNC 선반 — 최대 Ø500mm\n• 정밀 연삭 — 평탄도 0.005mm, Ra 0.2µm 경면\n• 와이어컷 방전가공(Wire EDM) — ±0.005mm, 최대 절단 높이 400mm\n또한 무료 DFM 분석, 표면 처리, 전체 치수 품질 검사를 제공합니다.',
    },
    es: {
      q: '¿Qué servicios de mecanizado CNC ofrecen?',
      a: 'Ofrecemos mecanizado CNC de precisión completo:\n• Fresado CNC — 3/4/5 ejes, hasta 1200×600×500 mm, ±0,01 mm\n• Torneado CNC — hasta Ø500 mm\n• Rectificado de precisión — planitud 0,005 mm, acabado espejo Ra 0,2 µm\n• Electroerosión por hilo (Wire EDM) — ±0,005 mm, altura de corte hasta 400 mm\nAdemás, análisis DFM gratuito, tratamiento de superficies e inspección de calidad completa.',
    },
    de: {
      q: 'Welche CNC-Dienstleistungen bieten Sie an?',
      a: 'Wir bieten vollständige CNC-Präzisionsbearbeitung:\n• CNC-Fräsen — 3/4/5-Achsen, bis 1200×600×500 mm, ±0,01 mm\n• CNC-Drehen — bis Ø500 mm\n• Präzisionsschleifen — Ebenheit 0,005 mm, Spiegeloberfläche Ra 0,2 µm\n• Drahterodieren (Wire EDM) — ±0,005 mm, Schnitthöhe bis 400 mm\nZusätzlich kostenlose DFM-Analyse, Oberflächenbehandlung und vollständige Qualitätsprüfung.',
    },
    ar: {
      q: 'ما هي خدمات التصنيع باستخدام الحاسب الآلي (CNC) التي تقدمونها؟',
      a: 'نقدم تصنيعاً دقيقاً كاملاً باستخدام الحاسب الآلي:\n• تفريز CNC — 3/4/5 محاور، حتى 1200×600×500 مم، ±0.01 مم\n• خراطة CNC — حتى Ø500 مم\n• طحن دقيق — استواء 0.005 مم، سطح مرآة Ra 0.2 ميكرومتر\n• التفريغ الكهربائي بالسلك (Wire EDM) — ±0.005 مم، ارتفاع قطع حتى 400 مم\nبالإضافة إلى تحليل DFM مجاني، ومعالجة الأسطح، وفحص الجودة الكامل.',
    },
    kwFr: ['service', 'services', 'usinage', 'fraisage', 'tournage', 'rectification', 'edm', 'électroérosion', 'electroerosion', '5 axes', 'cnc'],
    fr: {
      q: 'Quels services d\u2019usinage CNC proposez-vous ?',
      a: 'Nous proposons un usinage CNC de précision complet :\n• Fraisage CNC — 3/4/5 axes, jusqu\u2019à 1200×600×500 mm, ±0,01 mm\n• Tournage CNC — jusqu\u2019à Ø500 mm\n• Rectification de précision — planéité 0,005 mm, fini miroir Ra 0,2 µm\n• Électroérosion par fil (Wire EDM) — ±0,005 mm, hauteur de coupe jusqu\u2019à 400 mm\nPlus une analyse DFM gratuite, des traitements de surface et un contrôle qualité complet.',
    },
  },
  {
    id: 'materials',
    kw: ['material', 'aluminum', 'aluminium', 'stainless', 'steel', 'titanium', 'plastic', '6061', '7075', '316', 'peek', 'delrin', 'brass', 'what metal'],
    kwZh: ['材料', '哪些材料', '什么材料', '铝', '不锈钢', '钛', '塑料', '铜', '6061', '7075', '316', 'peek', '材质'],
    kwJa: ['材料', '材質', 'アルミ', 'ステンレス', 'チタン', 'プラスチック', 'どのような材料', 'どんな材料'],
    kwRu: ['материал', 'алюмин', 'нержаве', 'титан', 'пластик', 'сталь', 'латун', 'медь', '6061', '7075', '316', 'peek', 'какие материалы', 'с какими материалами'],
    kwKo: ['재료', '소재', '알루미늄', '스테인리스', '티타늄', '플라스틱', '6061', '7075', '316', 'peek', '어떤 재료'],
    kwEs: ['material', 'materiales', 'aluminio', 'acero inoxidable', 'titanio', 'plástico', 'plastico', 'latón', 'cobre', '6061', '7075', '316', 'peek', 'qué materiales', 'que materiales'],
    kwDe: ['material', 'materialien', 'aluminium', 'edelstahl', 'titan', 'kunststoff', 'messing', 'kupfer', '6061', '7075', '316', 'peek', 'welche materialien'],
    kwAr: ['مواد', 'خامات', 'ألمنيوم', 'ستانلس', 'تيتانيوم', 'بلاستيك', 'نحاس', '6061', '7075', '316', 'peek', 'ما المواد'],
    en: {
      q: 'What materials do you work with?',
      a: '30+ metals and engineering plastics:\n• Aluminum: 6061-T6, 7075-T6, 2024-T3, 5052-H32, MIC6\n• Stainless steel: 303, 304, 316L, 17-4 PH, 416\n• Carbon/alloy steel: 1018, 1045, 4140, 4340\n• Titanium: Grade 2, Grade 5 (Ti-6Al-4V)\n• Engineering plastics: POM (Delrin), PA6, PEEK, PTFE, UHMW-PE\n• Copper & brass: C360, C172 beryllium copper\nSpecial materials available on request.',
    },
    zh: {
      q: '你们能加工哪些材料？',
      a: '支持 30+ 种金属和工程塑料：\n• 铝合金：6061-T6、7075-T6、2024-T3、5052-H32、MIC6\n• 不锈钢：303、304、316L、17-4 PH、416\n• 碳钢/合金钢：1018、1045、4140、4340\n• 钛合金：Grade 2、Grade 5 (Ti-6Al-4V)\n• 工程塑料：POM（Delrin）、PA6、PEEK、PTFE、UHMW-PE\n• 铜及黄铜：C360 黄铜、C172 铍铜\n特殊材料可单独咨询。',
    },
    ja: {
      q: 'どのような材料を加工できますか？',
      a: '30種類以上の金属・エンジニアリングプラスチックに対応：\n• アルミニウム：6061-T6、7075-T6、2024-T3、5052-H32、MIC6\n• ステンレス鋼：303、304、316L、17-4PH、416\n• 炭素鋼・合金鋼：1018、1045、4140、4340\n• チタン：Grade 2、Grade 5（Ti-6Al-4V）\n• エンジニアリングプラスチック：POM（デルリン）、PA6、PEEK、PTFE、UHMW-PE\n• 銅・黄銅：C360黄銅、C172ベリリウム銅\n特殊材料は個別にご相談ください。',
    },
    ru: {
      q: 'С какими материалами вы работаете?',
      a: 'Более 30 металлов и инженерных пластиков:\n• Алюминий: 6061-T6, 7075-T6, 2024-T3, 5052-H32, MIC6\n• Нержавеющая сталь: 303, 304, 316L, 17-4 PH, 416\n• Углеродистая/легированная сталь: 1018, 1045, 4140, 4340\n• Титан: Grade 2, Grade 5 (Ti-6Al-4V)\n• Инженерные пластики: POM (Delrin), PA6, PEEK, PTFE, UHMW-PE\n• Медь и латунь: C360, бериллиевая медь C172\nСпециальные материалы — по запросу.',
    },
    ko: {
      q: '어떤 재료를 가공할 수 있나요?',
      a: '30가지 이상의 금속 및 엔지니어링 플라스틱:\n• 알루미늄: 6061-T6, 7075-T6, 2024-T3, 5052-H32, MIC6\n• 스테인리스강: 303, 304, 316L, 17-4 PH, 416\n• 탄소강/합금강: 1018, 1045, 4140, 4340\n• 티타늄: Grade 2, Grade 5 (Ti-6Al-4V)\n• 엔지니어링 플라스틱: POM(Delrin), PA6, PEEK, PTFE, UHMW-PE\n• 구리 및 황동: C360 황동, C172 베릴륨동\n특수 재료는 별도 문의 바랍니다.',
    },
    es: {
      q: '¿Con qué materiales trabajan?',
      a: 'Más de 30 metales y plásticos de ingeniería:\n• Aluminio: 6061-T6, 7075-T6, 2024-T3, 5052-H32, MIC6\n• Acero inoxidable: 303, 304, 316L, 17-4 PH, 416\n• Acero al carbono/aleado: 1018, 1045, 4140, 4340\n• Titanio: Grado 2, Grado 5 (Ti-6Al-4V)\n• Plásticos de ingeniería: POM (Delrin), PA6, PEEK, PTFE, UHMW-PE\n• Cobre y latón: C360, cobre-berilio C172\nMateriales especiales bajo pedido.',
    },
    de: {
      q: 'Mit welchen Materialien arbeiten Sie?',
      a: 'Über 30 Metalle und technische Kunststoffe:\n• Aluminium: 6061-T6, 7075-T6, 2024-T3, 5052-H32, MIC6\n• Edelstahl: 303, 304, 316L, 17-4 PH, 416\n• Kohlenstoff-/Legierungsstahl: 1018, 1045, 4140, 4340\n• Titan: Grade 2, Grade 5 (Ti-6Al-4V)\n• Technische Kunststoffe: POM (Delrin), PA6, PEEK, PTFE, UHMW-PE\n• Kupfer und Messing: C360, Berylliumkupfer C172\nSonderwerkstoffe auf Anfrage.',
    },
    ar: {
      q: 'ما هي المواد التي تعملون بها؟',
      a: 'أكثر من 30 معدناً وبلاستيك هندسي:\n• الألمنيوم: 6061-T6، 7075-T6، 2024-T3، 5052-H32، MIC6\n• الفولاذ المقاوم للصدأ: 303، 304، 316L، 17-4 PH، 416\n• الفولاذ الكربوني/السبائكي: 1018، 1045، 4140، 4340\n• التيتانيوم: الدرجة 2، الدرجة 5 (Ti-6Al-4V)\n• البلاستيك الهندسي: POM (Delrin)، PA6، PEEK، PTFE، UHMW-PE\n• النحاس والأصفر: C360، نحاس البريليوم C172\nالمواد الخاصة متاحة عند الطلب.',
    },
    kwFr: ['matériau', 'materiau', 'matériaux', 'materiaux', 'aluminium', 'inox', 'acier', 'titane', 'plastique', 'laiton', 'cuivre', '6061', '7075', '316', 'peek', 'quels matériaux', 'quels materiaux', 'avec quels matériaux'],
    fr: {
      q: 'Avec quels matériaux travaillez-vous ?',
      a: 'Plus de 30 métaux et plastiques techniques :\n• Aluminium : 6061-T6, 7075-T6, 2024-T3, 5052-H32, MIC6\n• Acier inoxydable : 303, 304, 316L, 17-4 PH, 416\n• Acier carbone / allié : 1018, 1045, 4140, 4340\n• Titane : Grade 2, Grade 5 (Ti-6Al-4V)\n• Plastiques techniques : POM (Delrin), PA6, PEEK, PTFE, UHMW-PE\n• Cuivre et laiton : C360, cuivre-béryllium C172\nMatériaux spéciaux sur demande.',
    },
  },
  {
    id: 'tolerance',
    kw: ['tolerance', 'precision', 'accuracy', '0.01', '0.005', 'micron', 'surface finish', 'ra ', 'flatness', 'how accurate', 'how precise'],
    kwZh: ['公差', '精度', '精确', '光洁度', '粗糙度', '平面度', '准不准', '0.01'],
    kwJa: ['公差', '精度', '面粗さ', '平面度', '0.01', '0.005'],
    kwRu: ['допуск', 'точность', 'шероховатост', 'плоскостность', '0.01', '0.005', 'прецизион'],
    kwKo: ['공차', '정밀도', '정확도', '표면조도', '평탄도', '0.01', '0.005'],
    kwEs: ['tolerancia', 'precisión', 'precision', 'exactitud', 'acabado superficial', 'planitud', '0.01', '0.005'],
    kwDe: ['toleranz', 'präzision', 'praezision', 'genauigkeit', 'oberflächengüte', 'oberflaechenguete', 'ebenheit', '0.01', '0.005'],
    kwAr: ['تفاوت', 'دقة', 'تشطيب', 'استواء', '0.01', '0.005', 'دقيق'],
    en: {
      q: "What tolerances and accuracy can you hold?",
      a: '• Dimensional tolerance: ±0.05mm standard, ±0.01mm precision\n• Positional tolerance: ±0.1mm standard, ±0.02mm precision\n• Surface finish: Ra 1.6µm standard, Ra 0.4µm precision\n• Grinding flatness: 0.005mm; Wire EDM: ±0.005mm\nGeneral tolerance per ISO 2768-m.',
    },
    zh: {
      q: '你们的加工精度和公差能达到多少？',
      a: '• 尺寸公差：标准 ±0.05mm，精密 ±0.01mm\n• 位置公差：标准 ±0.1mm，精密 ±0.02mm\n• 表面光洁度：标准 Ra 1.6µm，精密 Ra 0.4µm\n• 磨削平面度 0.005mm，线切割精度 ±0.005mm\n通用标准按 ISO 2768-m 执行。',
    },
    ja: {
      q: 'どの程度の公差・精度を保証できますか？',
      a: '• 寸法公差：標準±0.05mm、精密±0.01mm\n• 位置公差：標準±0.1mm、精密±0.02mm\n• 表面粗さ：標準Ra 1.6µm、精密Ra 0.4µm\n• 研削平面度0.005mm、ワイヤEDM±0.005mm\n一般公差はISO 2768-m準拠です。',
    },
    ru: {
      q: 'Какие допуски и точность вы обеспечиваете?',
      a: '• Допуск на размер: стандарт ±0,05 мм, прецизионно ±0,01 мм\n• Допуск на положение: стандарт ±0,1 мм, прецизионно ±0,02 мм\n• Шероховатость поверхности: стандарт Ra 1,6 мкм, прецизионно Ra 0,4 мкм\n• Плоскостность при шлифовании 0,005 мм; Wire EDM ±0,005 мм\nОбщие допуски по ISO 2768-m.',
    },
    ko: {
      q: '어느 정도의 공차와 정밀도를 보장하나요?',
      a: '• 치수 공차: 표준 ±0.05mm, 정밀 ±0.01mm\n• 위치 공차: 표준 ±0.1mm, 정밀 ±0.02mm\n• 표면조도: 표준 Ra 1.6µm, 정밀 Ra 0.4µm\n• 연삭 평탄도 0.005mm, 와이어 EDM ±0.005mm\n일반 공차는 ISO 2768-m 기준입니다.',
    },
    es: {
      q: '¿Qué tolerancias y precisión pueden mantener?',
      a: '• Tolerancia dimensional: estándar ±0,05 mm, precisión ±0,01 mm\n• Tolerancia de posición: estándar ±0,1 mm, precisión ±0,02 mm\n• Acabado superficial: estándar Ra 1,6 µm, precisión Ra 0,4 µm\n• Planitud de rectificado 0,005 mm; Wire EDM ±0,005 mm\nTolerancia general según ISO 2768-m.',
    },
    de: {
      q: 'Welche Toleranzen und Genauigkeit können Sie einhalten?',
      a: '• Maßtoleranz: Standard ±0,05 mm, Präzision ±0,01 mm\n• Lagetoleranz: Standard ±0,1 mm, Präzision ±0,02 mm\n• Oberflächengüte: Standard Ra 1,6 µm, Präzision Ra 0,4 µm\n• Schleif-Ebenheit 0,005 mm; Drahterodieren ±0,005 mm\nAllgemeintoleranzen nach ISO 2768-m.',
    },
    ar: {
      q: 'ما هي التفاوتات والدقة التي يمكنكم تحقيقها؟',
      a: '• تفاوت الأبعاد: قياسي ±0.05 مم، دقيق ±0.01 مم\n• تفاوت الموضع: قياسي ±0.1 مم، دقيق ±0.02 مم\n• تشطيب السطح: قياسي Ra 1.6 ميكرومتر، دقيق Ra 0.4 ميكرومتر\n• استواء الطحن 0.005 مم؛ Wire EDM ±0.005 مم\nالتفاوت العام وفق ISO 2768-m.',
    },
    kwFr: ['tolérance', 'tolerance', 'tolérances', 'tolerances', 'précision', 'precision', 'exactitude', 'état de surface', 'etat de surface', 'planéité', 'planeite', 'rugosité', 'rugosite', '0.01', '0.005'],
    fr: {
      q: 'Quelles tolérances et précision pouvez-vous garantir ?',
      a: '• Tolérance dimensionnelle : ±0,05 mm standard, ±0,01 mm en précision\n• Tolérance de position : ±0,1 mm standard, ±0,02 mm en précision\n• État de surface : Ra 1,6 µm standard, Ra 0,4 µm en précision\n• Planéité de rectification 0,005 mm ; Wire EDM ±0,005 mm\nTolérances générales selon ISO 2768-m.',
    },
  },
  {
    id: 'quote',
    kw: ['quote', 'quotation', 'price', 'cost', 'pricing', 'how much', 'rfq', 'get a quote', 'how to order', 'order'],
    kwZh: ['报价', '价格', '多少钱', '费用', '询价', '下单', '怎么买', '成本'],
    kwJa: ['見積', '価格', '費用', 'いくら', '注文', '発注'],
    kwRu: ['расчёт', 'расчет', 'стоимост', 'цена', 'цену', 'сколько стоит', 'запрос', 'rfq', 'заказ', 'котиров', 'оферт'],
    kwKo: ['견적', '가격', '비용', '얼마', '주문', '문의', 'rfq'],
    kwEs: ['presupuesto', 'cotización', 'cotizacion', 'precio', 'coste', 'costo', 'cuánto', 'cuanto', 'pedido', 'rfq', 'oferta'],
    kwDe: ['angebot', 'kostenvoranschlag', 'preis', 'kosten', 'wie viel', 'bestellung', 'rfq', 'anfrage'],
    kwAr: ['عرض سعر', 'تسعير', 'سعر', 'تكلفة', 'كم', 'طلب', 'rfq', 'اقتباس'],
    en: {
      q: 'How do I get a quote?',
      a: 'Email the following to ' + COMPANY.email + ' and we reply within 24 hours (usually within 2 hours):\n• 3D model (STEP preferred; also IGES, STL, X_T, SolidWorks)\n• 2D drawing (PDF/DXF) with key dimensions\n• Material grade\n• Quantity and lead-time requirement\n• Surface treatment or special requirements\nYou can also use the RFQ form on our website.',
    },
    zh: {
      q: '怎么获取报价？需要提供什么？',
      a: '把以下信息发到 ' + COMPANY.email + '，我们 24 小时内回复（通常 2 小时内）：\n• 3D 模型（推荐 STEP，也支持 IGES、STL、X_T、SolidWorks）\n• 带关键尺寸的 2D 图纸（PDF/DXF）\n• 材料牌号\n• 数量与交期要求\n• 表面处理等特殊要求\n也可直接在官网提交询价表单。',
    },
    ja: {
      q: '見積もりはどうすれば取れますか？',
      a: '以下の情報を ' + COMPANY.email + ' までお送りください。24時間以内（通常2時間以内）に返信します：\n• 3Dモデル（STEP推奨。IGES、STL、X_T、SolidWorksも可）\n• 主要寸法入りの2D図面（PDF/DXF）\n• 材料グレード\n• 数量と納期のご要望\n• 表面処理などの特別要件\n当サイトの見積りフォームからもお申し込みいただけます。',
    },
    ru: {
      q: 'Как получить расчёт стоимости?',
      a: 'Отправьте следующее на ' + COMPANY.email + ', ответим в течение 24 часов (обычно в течение 2 часов):\n• 3D-модель (рекомендуется STEP; также IGES, STL, X_T, SolidWorks)\n• 2D-чертёж (PDF/DXF) с ключевыми размерами\n• Марка материала\n• Количество и требуемый срок\n• Обработка поверхности и особые требования\nТакже можно использовать форму запроса на нашем сайте.',
    },
    ko: {
      q: '견적은 어떻게 받을 수 있나요?',
      a: '다음 정보를 ' + COMPANY.email + ' 로 보내주시면 24시간 이내(보통 2시간 이내)에 답변드립니다:\n• 3D 모델(STEP 권장; IGES, STL, X_T, SolidWorks도 가능)\n• 주요 치수가 포함된 2D 도면(PDF/DXF)\n• 재료 등급\n• 수량 및 납기 요구사항\n• 표면 처리 등 특수 요구사항\n웹사이트의 견적 문의 양식을 이용하셔도 됩니다.',
    },
    es: {
      q: '¿Cómo obtengo un presupuesto?',
      a: 'Envíe lo siguiente a ' + COMPANY.email + ' y respondemos en 24 horas (normalmente en 2 horas):\n• Modelo 3D (recomendado STEP; también IGES, STL, X_T, SolidWorks)\n• Plano 2D (PDF/DXF) con dimensiones clave\n• Grado del material\n• Cantidad y plazo requerido\n• Tratamiento superficial u otros requisitos\nTambién puede usar el formulario RFQ de nuestro sitio web.',
    },
    de: {
      q: 'Wie erhalte ich ein Angebot?',
      a: 'Senden Sie Folgendes an ' + COMPANY.email + ', wir antworten innerhalb von 24 Stunden (normalerweise innerhalb von 2 Stunden):\n• 3D-Modell (empfohlen STEP; auch IGES, STL, X_T, SolidWorks)\n• 2D-Zeichnung (PDF/DXF) mit Schlüsselabmessungen\n• Werkstoffgüte\n• Stückzahl und Liefertermin\n• Oberflächenbehandlung oder Sonderanforderungen\nSie können auch das RFQ-Formular auf unserer Website nutzen.',
    },
    ar: {
      q: 'كيف أحصل على عرض سعر؟',
      a: 'أرسل ما يلي إلى ' + COMPANY.email + ' وسنرد خلال 24 ساعة (عادة خلال ساعتين):\n• نموذج ثلاثي الأبعاد (يُفضَّل STEP؛ وأيضاً IGES، STL، X_T، SolidWorks)\n• رسم ثنائي الأبعاد (PDF/DXF) بالأبعاد الرئيسية\n• درجة المادة\n• الكمية ومدة التسليم المطلوبة\n• معالجة الأسطح أو متطلبات خاصة\nيمكنك أيضاً استخدام نموذج طلب عرض السعر على موقعنا.',
    },
    kwFr: ['devis', 'prix', 'coût', 'cout', 'tarif', 'combien', 'commande', 'rfq', 'chiffrage', 'offre', 'obtenir un devis'],
    fr: {
      q: 'Comment obtenir un devis ?',
      a: 'Envoyez les éléments suivants à ' + COMPANY.email + ', nous répondons sous 24 heures (généralement sous 2 heures) :\n• Modèle 3D (STEP recommandé ; également IGES, STL, X_T, SolidWorks)\n• Plan 2D (PDF/DXF) avec les dimensions clés\n• Nuance du matériau\n• Quantité et délai souhaités\n• Traitement de surface ou exigences particulières\nVous pouvez aussi utiliser le formulaire de demande de devis sur notre site.',
    },
  },
  {
    id: 'file-format',
    kw: ['file', 'format', 'step', 'stp', 'iges', 'igs', 'stl', 'parasolid', 'x_t', 'solidworks', 'sldprt', 'dxf', 'pdf', 'cad', 'drawing', '3d model', 'upload'],
    kwZh: ['文件', '格式', 'step', 'iges', 'stl', '图纸', '模型', '上传', 'cad', 'pdf', 'dxf'],
    kwJa: ['ファイル', 'フォーマット', '形式', 'step', 'iges', 'stl', '図面', 'cad', 'pdf', 'dxf'],
    kwRu: ['файл', 'формат', 'step', 'iges', 'stl', 'чертёж', 'чертеж', 'cad', 'pdf', 'dxf', 'модел'],
    kwKo: ['파일', '형식', '포맷', 'step', 'iges', 'stl', '도면', 'cad', 'pdf', 'dxf', '모델'],
    kwEs: ['archivo', 'formato', 'step', 'iges', 'stl', 'plano', 'cad', 'pdf', 'dxf', 'modelo'],
    kwDe: ['datei', 'format', 'step', 'iges', 'stl', 'zeichnung', 'cad', 'pdf', 'dxf', 'modell'],
    kwAr: ['ملف', 'صيغة', 'تنسيق', 'step', 'iges', 'stl', 'رسم', 'cad', 'pdf', 'dxf', 'نموذج'],
    en: {
      q: 'What CAD file formats do you accept?',
      a: '3D models: STEP (.step/.stp), IGES (.igs/.iges), STL, Parasolid (.x_t), SolidWorks (.sldprt)\n2D drawings: PDF, DXF\nRecommendation: STEP gives the highest accuracy and fastest quoting.',
    },
    zh: {
      q: '你们接受哪些 CAD 文件格式？',
      a: '3D 模型：STEP (.step/.stp)、IGES (.igs/.iges)、STL、Parasolid (.x_t)、SolidWorks (.sldprt)\n2D 图纸：PDF、DXF\n推荐：STEP 精度最高、兼容性最好，报价最准最快。',
    },
    ja: {
      q: '対応しているCADファイル形式は？',
      a: '3Dモデル：STEP（.step/.stp）、IGES（.igs/.iges）、STL、Parasolid（.x_t）、SolidWorks（.sldprt）\n2D図面：PDF、DXF\n推奨：STEPは精度が最も高く、見積りが最も正確かつ迅速です。',
    },
    ru: {
      q: 'Какие форматы CAD-файлов вы принимаете?',
      a: '3D-модели: STEP (.step/.stp), IGES (.igs/.iges), STL, Parasolid (.x_t), SolidWorks (.sldprt)\n2D-чертежи: PDF, DXF\nРекомендация: STEP даёт наивысшую точность и самое быстрое составление расчёта.',
    },
    ko: {
      q: '어떤 CAD 파일 형식을 지원하나요?',
      a: '3D 모델: STEP(.step/.stp), IGES(.igs/.iges), STL, Parasolid(.x_t), SolidWorks(.sldprt)\n2D 도면: PDF, DXF\n권장: STEP이 정확도가 가장 높고 견적이 가장 빠르고 정확합니다.',
    },
    es: {
      q: '¿Qué formatos de archivo CAD aceptan?',
      a: 'Modelos 3D: STEP (.step/.stp), IGES (.igs/.iges), STL, Parasolid (.x_t), SolidWorks (.sldprt)\nPlanos 2D: PDF, DXF\nRecomendación: STEP ofrece la mayor precisión y la cotización más rápida.',
    },
    de: {
      q: 'Welche CAD-Dateiformate akzeptieren Sie?',
      a: '3D-Modelle: STEP (.step/.stp), IGES (.igs/.iges), STL, Parasolid (.x_t), SolidWorks (.sldprt)\n2D-Zeichnungen: PDF, DXF\nEmpfehlung: STEP bietet die höchste Genauigkeit und die schnellste Angebotserstellung.',
    },
    ar: {
      q: 'ما هي صيغ ملفات CAD التي تقبلونها؟',
      a: 'النماذج ثلاثية الأبعاد: STEP (.step/.stp)، IGES (.igs/.iges)، STL، Parasolid (.x_t)، SolidWorks (.sldprt)\nالرسومات ثنائية الأبعاد: PDF، DXF\nالتوصية: STEP يمنح أعلى دقة وأسرع تسعير.',
    },
    kwFr: ['fichier', 'format', 'formats', 'step', 'iges', 'stl', 'plan', 'dessin', 'cad', 'pdf', 'dxf', 'modèle', 'modele', 'fichier cad'],
    fr: {
      q: 'Quels formats de fichier CAD acceptez-vous ?',
      a: 'Modèles 3D : STEP (.step/.stp), IGES (.igs/.iges), STL, Parasolid (.x_t), SolidWorks (.sldprt)\nPlans 2D : PDF, DXF\nRecommandation : STEP offre la meilleure précision et le devis le plus rapide.',
    },
  },
  {
    id: 'moq',
    kw: ['moq', 'minimum order', 'minimum quantity', 'prototype', 'small batch', 'low volume', 'one off', '1 piece', 'quantity'],
    kwZh: ['起订量', '最小', '打样', '小批量', '样品', '一件', '数量', 'moq'],
    kwJa: ['最小ロット', 'moq', '試作', '小ロット', '数量', '個'],
    kwRu: ['moq', 'минимальн', 'минимальный заказ', 'прототип', 'мелкосерийн', 'образец', 'количество', '1 шт'],
    kwKo: ['최소주문', '최소', '주문 수량', 'moq', '시제품', '소량', '샘플', '수량', '개'],
    kwEs: ['moq', 'cantidad mínima', 'cantidad minima', 'pedido mínimo', 'prototipo', 'series pequeñas', 'muestra', 'cantidad', '1 pieza'],
    kwDe: ['mindestmenge', 'moq', 'mindestbestellmenge', 'prototyp', 'kleinserie', 'muster', 'stückzahl', 'stueckzahl', '1 stück'],
    kwAr: ['الحد الأدنى', 'moq', 'نموذج أولي', 'كميات صغيرة', 'عينة', 'كمية', 'قطعة'],
    en: {
      q: 'What is your minimum order quantity (MOQ)?',
      a: 'No strict MOQ:\n• Prototypes: 1–5 pieces\n• Small-to-medium batches: tens to hundreds\n• Production: 10,000+\nPricing scales down with quantity, and single-piece prototype pricing is still competitive.',
    },
    zh: {
      q: '最小起订量（MOQ）是多少？',
      a: '没有严格起订量限制：\n• 原型件：支持 1–5 件小批量打样\n• 中小批量：几十到几百件\n• 大批量：10,000 件以上\n价格随数量阶梯下降，单件打样定价也有竞争力。',
    },
    ja: {
      q: '最小ロット（MOQ）はいくつですか？',
      a: '厳格なMOQはありません：\n• 試作品：1～5個\n• 小～中ロット：数十～数百個\n• 量産：10,000個以上\n数量に応じて価格は段階的に下がり、単品試作でも競争力のある価格です。',
    },
    ru: {
      q: 'Какой у вас минимальный объём заказа (MOQ)?',
      a: 'Строгого MOQ нет:\n• Прототипы: 1–5 шт.\n• Мелкие и средние партии: от десятков до сотен\n• Серийное производство: от 10 000 шт.\nЦена снижается с ростом количества, при этом цена единичного прототипа остаётся конкурентоспособной.',
    },
    ko: {
      q: '최소 주문 수량(MOQ)은 얼마인가요?',
      a: '엄격한 MOQ는 없습니다:\n• 시제품: 1~5개\n• 중소량: 수십~수백 개\n• 양산: 10,000개 이상\n수량에 따라 가격이 단계적으로 낮아지며, 단품 시제품 가격도 경쟁력이 있습니다.',
    },
    es: {
      q: '¿Cuál es su cantidad mínima de pedido (MOQ)?',
      a: 'Sin MOQ estricto:\n• Prototipos: 1–5 piezas\n• Lotes pequeños y medianos: de decenas a cientos\n• Producción: 10 000+ piezas\nEl precio baja con la cantidad, y el precio de un prototipo unitario sigue siendo competitivo.',
    },
    de: {
      q: 'Wie hoch ist Ihre Mindestbestellmenge (MOQ)?',
      a: 'Keine strenge MOQ:\n• Prototypen: 1–5 Stück\n• Klein- bis Mittelserien: zehn bis mehrere hundert\n• Serienproduktion: 10 000+ Stück\nDer Preis sinkt mit der Menge, und Einzelstück-Prototypen sind weiterhin wettbewerbsfähig.',
    },
    ar: {
      q: 'ما هو الحد الأدنى لكمية الطلب (MOQ)؟',
      a: 'لا يوجد حد أدنى صارم:\n• النماذج الأولية: 1–5 قطع\n• الدفعات الصغيرة والمتوسطة: من العشرات إلى المئات\n• الإنتاج: 10,000 قطعة فأكثر\nينخفض السعر مع زيادة الكمية، ويبقى سعر النموذج الأولي المفرد تنافسياً.',
    },
    kwFr: ['moq', 'quantité minimale', 'quantite minimale', 'prototype', 'petite série', 'petite serie', 'échantillon', 'echantillon', 'quantité', 'quantite', '1 pièce', '1 piece'],
    fr: {
      q: 'Quelle est votre quantité minimale de commande (MOQ) ?',
      a: 'Pas de MOQ strict :\n• Prototypes : 1 à 5 pièces\n• Petites et moyennes séries : de quelques dizaines à quelques centaines\n• Production : 10 000 pièces et plus\nLe prix diminue avec la quantité, et le prix d\u2019un prototype unitaire reste compétitif.',
    },
  },
  {
    id: 'dfm',
    kw: ['dfm', 'manufacturability', 'design for manufacturing', 'design review', 'optimize', 'feedback'],
    kwZh: ['可制造性', 'dfm', '设计评审', '优化建议', '工艺分析'],
    kwJa: ['dfm', '製造性', '設計', 'レビュー', '解析'],
    kwRu: ['dfm', 'технологичност', 'производств', 'анализ', 'оптимизац', 'конструкц'],
    kwKo: ['dfm', '제조가능성', '설계검토', '최적화', '분석'],
    kwEs: ['dfm', 'fabricabilidad', 'revisión de diseño', 'revision de diseño', 'optimización', 'optimizacion', 'análisis', 'analisis'],
    kwDe: ['dfm', 'fertigbarkeit', 'designprüfung', 'designpruefung', 'optimierung', 'analyse'],
    kwAr: ['dfm', 'قابلية التصنيع', 'مراجعة التصميم', 'تحسين', 'تحليل'],
    en: {
      q: 'Do you provide DFM (Design for Manufacturability) analysis?',
      a: 'Yes, free of charge. At quoting stage our engineers review your design to:\n• Flag issues affecting cost, lead time or quality\n• Suggest optimizations to reduce cost while keeping function\n• Include tolerance analysis and material selection advice\nDFM feedback is delivered together with the quote at no extra cost.',
    },
    zh: {
      q: '你们提供 DFM 可制造性分析吗？',
      a: '提供，且免费。报价阶段工程师会对图纸做可制造性评审：\n• 指出影响成本、周期或质量的设计问题\n• 在保证功能的前提下给出降本优化建议\n• 包含公差分析与材料选择建议\nDFM 反馈随报价一起提供，不额外收费。',
    },
    ja: {
      q: 'DFM（製造性設計）解析は提供していますか？',
      a: 'はい、無料です。見積り段階で当社エンジニアが設計をレビューします：\n• コスト・納期・品質に影響する問題点の指摘\n• 機能を維持したままコストを下げる最適化提案\n• 公差解析と材料選定のアドバイス\nDFMフィードバックは見積りと一緒に、追加費用なしでご提供します。',
    },
    ru: {
      q: 'Вы делаете DFM-анализ (технологичность конструкции)?',
      a: 'Да, бесплатно. На этапе расчёта наши инженеры проверяют вашу конструкцию:\n• Выявляют проблемы, влияющие на стоимость, сроки и качество\n• Предлагают оптимизацию для снижения стоимости при сохранении функций\n• Включают анализ допусков и рекомендации по выбору материала\nDFM-заключение предоставляется вместе с расчётом без дополнительной платы.',
    },
    ko: {
      q: 'DFM(제조 가능성) 분석을 제공하나요?',
      a: '네, 무료입니다. 견적 단계에서 엔지니어가 설계를 검토합니다:\n• 비용, 납기, 품질에 영향을 주는 문제 지적\n• 기능을 유지하면서 비용을 낮추는 최적화 제안\n• 공차 분석 및 재료 선정 조언 포함\nDFM 피드백은 견적과 함께 추가 비용 없이 제공됩니다.',
    },
    es: {
      q: '¿Hacen análisis DFM (diseño para fabricación)?',
      a: 'Sí, gratis. En la etapa de cotización nuestros ingenieros revisan su diseño para:\n• Señalar problemas que afectan al coste, plazo o calidad\n• Sugerir optimizaciones para reducir el coste manteniendo la función\n• Incluir análisis de tolerancias y consejo de selección de material\nEl informe DFM se entrega junto con el presupuesto sin coste adicional.',
    },
    de: {
      q: 'Bieten Sie eine DFM-Analyse (fertigungsgerechte Konstruktion) an?',
      a: 'Ja, kostenlos. In der Angebotsphase prüfen unsere Ingenieure Ihr Design:\n• Aufzeigen von Problemen, die Kosten, Lieferzeit oder Qualität beeinflussen\n• Optimierungsvorschläge zur Kostensenkung bei erhaltener Funktion\n• Toleranzanalyse und Beratung zur Materialauswahl\nDas DFM-Feedback wird zusammen mit dem Angebot ohne Aufpreis geliefert.',
    },
    ar: {
      q: 'هل تقدمون تحليل DFM (التصميم للتصنيع)؟',
      a: 'نعم، مجاناً. في مرحلة التسعير يراجع مهندسونا تصميمك:\n• تحديد المشكلات التي تؤثر على التكلفة أو المدة أو الجودة\n• اقتراح تحسينات لخفض التكلفة مع الحفاظ على الوظيفة\n• يتضمن تحليل التفاوتات ونصائح اختيار المواد\nتُسلَّم ملاحظات DFM مع عرض السعر دون أي تكلفة إضافية.',
    },
    kwFr: ['dfm', 'fabricabilité', 'fabricabilite', 'revue de conception', 'optimisation', 'analyse', 'conception pour la fabrication'],
    fr: {
      q: 'Fournissez-vous une analyse DFM (conception pour la fabrication) ?',
      a: 'Oui, gratuitement. Au stade du devis, nos ingénieurs examinent votre conception pour :\n• Signaler les problèmes affectant le coût, le délai ou la qualité\n• Proposer des optimisations pour réduire le coût tout en conservant la fonction\n• Inclure l\u2019analyse des tolérances et des conseils sur le choix du matériau\nLe retour DFM est livré avec le devis, sans coût supplémentaire.',
    },
  },
  {
    id: 'lead-time',
    kw: ['lead time', 'leadtime', 'delivery', 'how long', 'turnaround', 'when', 'deadline', 'urgent', 'rush', 'schedule', 'timeline'],
    kwZh: ['交期', '多久', '时间', '周期', '加急', '什么时候', '交货'],
    kwJa: ['納期', 'リードタイム', '期間', 'いつ', '特急', '納品'],
    kwRu: ['срок', 'сроки', 'изготовлени', 'доставк', 'как долго', 'срочн', 'когда', 'график'],
    kwKo: ['납기', '리드타임', '기간', '얼마나', '긴급', '언제', '납품'],
    kwEs: ['plazo', 'plazos', 'entrega', 'cuánto tarda', 'cuanto tarda', 'urgente', 'cuándo', 'cuando', 'calendario'],
    kwDe: ['lieferzeit', 'lieferzeiten', 'dauer', 'wie lange', 'eilig', 'wann', 'zeitplan'],
    kwAr: ['مدة التسليم', 'موعد التسليم', 'المدة', 'كم تستغرق', 'عاجل', 'متى', 'جدول'],
    en: {
      q: 'What is your standard lead time?',
      a: '• Standard parts: 5–10 business days\n• Complex 5-axis parts: 10–15 business days\n• Rush orders: 3–5 days (rush fee applies, priority scheduling)\nOn-time delivery rate above 98%. Exact lead time is confirmed with the quote.',
    },
    zh: {
      q: '标准交期是多久？',
      a: '• 标准零件：5–10 个工作日\n• 复杂五轴零件：10–15 个工作日\n• 加急订单：3–5 天（需加急费，优先级排产）\n准时交付率 98% 以上，具体交期以报价确认为准。',
    },
    ja: {
      q: '標準納期はどのくらいですか？',
      a: '• 標準部品：5～10営業日\n• 複雑な5軸部品：10～15営業日\n• 特急注文：3～5日（特急料金がかかり、優先生産）\n納期遵守率は98%以上。正確な納期は見積り時に確定します。',
    },
    ru: {
      q: 'Каковы ваши стандартные сроки изготовления?',
      a: '• Стандартные детали: 5–10 рабочих дней\n• Сложные 5-осевые детали: 10–15 рабочих дней\n• Срочные заказы: 3–5 дней (срочный сбор, приоритетное планирование)\nСвоевременность поставок выше 98%. Точный срок подтверждается вместе с расчётом.',
    },
    ko: {
      q: '표준 납기는 얼마나 걸리나요?',
      a: '• 표준 부품: 5~10 영업일\n• 복잡한 5축 부품: 10~15 영업일\n• 긴급 주문: 3~5일(긴급 수수료 적용, 우선 생산)\n납기 준수율 98% 이상. 정확한 납기는 견적 시 확정됩니다.',
    },
    es: {
      q: '¿Cuál es su plazo de entrega estándar?',
      a: '• Piezas estándar: 5–10 días laborables\n• Piezas complejas de 5 ejes: 10–15 días laborables\n• Pedidos urgentes: 3–5 días (se aplica recargo, programación prioritaria)\nTasa de entrega a tiempo superior al 98%. El plazo exacto se confirma con el presupuesto.',
    },
    de: {
      q: 'Wie lang ist Ihre Standard-Lieferzeit?',
      a: '• Standardteile: 5–10 Werktage\n• Komplexe 5-Achs-Teile: 10–15 Werktage\n• Eilaufträge: 3–5 Tage (Eilzuschlag, Prioritätsplanung)\nLiefertreue über 98%. Die genaue Lieferzeit wird mit dem Angebot bestätigt.',
    },
    ar: {
      q: 'ما هي مدة التسليم القياسية؟',
      a: '• القطع القياسية: 5–10 أيام عمل\n• القطع المعقدة ذات 5 محاور: 10–15 يوم عمل\n• الطلبات العاجلة: 3–5 أيام (تُطبَّق رسوم عاجلة، أولوية في الجدولة)\nمعدل التسليم في الوقت المحدد يتجاوز 98%. تُؤكَّد المدة الدقيقة مع عرض السعر.',
    },
    kwFr: ['délai', 'delai', 'délais', 'delais', 'livraison', 'combien de temps', 'urgent', 'quand', 'calendrier', 'délai de fabrication', 'délai de livraison'],
    fr: {
      q: 'Quel est votre délai de fabrication standard ?',
      a: '• Pièces standard : 5 à 10 jours ouvrés\n• Pièces complexes 5 axes : 10 à 15 jours ouvrés\n• Commandes urgentes : 3 à 5 jours (frais d\u2019urgence, planification prioritaire)\nTaux de livraison à temps supérieur à 98 %. Le délai exact est confirmé avec le devis.',
    },
  },
  {
    id: 'shipping',
    kw: ['ship', 'shipping', 'delivery', 'worldwide', 'international', 'dhl', 'fedex', 'ups', 'export', 'logistics', 'freight', 'ddp', 'customs'],
    kwZh: ['发货', '物流', '全球', '快递', '出口', '国际', 'dhl', '海运', '报关'],
    kwJa: ['発送', '配送', '輸送', '海外', '国際', 'dhl', '船便', '輸出'],
    kwRu: ['доставк', 'отправк', 'международ', 'по всему миру', 'dhl', 'fedex', 'ups', 'экспорт', 'логистик', 'морем', 'ddp', 'таможн'],
    kwKo: ['배송', '발송', '해외', '국제', 'dhl', 'fedex', 'ups', '수출', '물류', '해운', 'ddp'],
    kwEs: ['envío', 'envio', 'enviar', 'envía', 'envia', 'envian', 'env', 'internacional', 'mundial', 'dhl', 'fedex', 'ups', 'exportación', 'exportacion', 'logística', 'logistica', 'marítimo', 'maritimo', 'ddp', 'aduana'],
    kwDe: ['versand', 'versenden', 'weltweit', 'international', 'dhl', 'fedex', 'ups', 'export', 'logistik', 'seefracht', 'ddp', 'zoll'],
    kwAr: ['شحن', 'إرسال', 'دولي', 'عالمي', 'dhl', 'fedex', 'ups', 'تصدير', 'لوجستيات', 'بحري', 'ddp', 'جمارك'],
    en: {
      q: 'Do you ship worldwide? What are the shipping options?',
      a: 'Yes, worldwide from Shenzhen/China:\n• Express: DHL, FedEx, UPS — 3–5 days to major cities\n• Sea freight: best for large orders\n• Export handling: full export documentation\n• DDP available for most destinations',
    },
    zh: {
      q: '支持全球发货吗？物流方式有哪些？',
      a: '支持全球配送，从深圳发货：\n• 快递：DHL、FedEx、UPS，全球主要城市 3–5 天\n• 海运：大批量订单成本更优\n• 出口：负责全套出口文件\n• 大多数目的地可提供 DDP 完税交货',
    },
    ja: {
      q: '海外発送は可能ですか？配送方法は？',
      a: 'はい、深セン（中国）から全世界へ発送します：\n• 国際宅配便：DHL、FedEx、UPS — 主要都市へ3～5日\n• 海上輸送：大口注文に最適\n• 輸出：輸出書類一式を代行\n• ほとんどの仕向地でDDP（関税込み）対応可',
    },
    ru: {
      q: 'Вы отправляете по всему миру? Какие варианты доставки?',
      a: 'Да, отправляем по всему миру из Шэньчжэня (Китай):\n• Экспресс: DHL, FedEx, UPS — 3–5 дней до крупных городов\n• Морская доставка: оптимальна для крупных заказов\n• Экспорт: полное оформление экспортных документов\n• DDP доступен для большинства направлений',
    },
    ko: {
      q: '전 세계로 배송하나요? 배송 옵션은?',
      a: '네, 중국 선전에서 전 세계로 배송합니다:\n• 특송: DHL, FedEx, UPS — 주요 도시까지 3~5일\n• 해상 운송: 대량 주문에 최적\n• 수출: 수출 서류 일체 대행\n• 대부분의 목적지에 DDP(관세 포함) 가능',
    },
    es: {
      q: '¿Envían a todo el mundo? ¿Qué opciones de envío hay?',
      a: 'Sí, envíos a todo el mundo desde Shenzhen (China):\n• Mensajería: DHL, FedEx, UPS — 3–5 días a las principales ciudades\n• Transporte marítimo: ideal para pedidos grandes\n• Exportación: documentación de exportación completa\n• DDP disponible para la mayoría de destinos',
    },
    de: {
      q: 'Liefern Sie weltweit? Welche Versandoptionen gibt es?',
      a: 'Ja, weltweiter Versand ab Shenzhen (China):\n• Express: DHL, FedEx, UPS — 3–5 Tage in große Städte\n• Seefracht: ideal für große Bestellungen\n• Export: vollständige Exportdokumentation\n• DDP für die meisten Bestimmungsorte verfügbar',
    },
    ar: {
      q: 'هل تشحنون إلى جميع أنحاء العالم؟ ما هي خيارات الشحن؟',
      a: 'نعم، نشحن إلى جميع أنحاء العالم من شنجن (الصين):\n• الشحن السريع: DHL، FedEx، UPS — 3–5 أيام إلى المدن الرئيسية\n• الشحن البحري: الأفضل للطلبات الكبيرة\n• التصدير: مستندات تصدير كاملة\n• DDP متاح لمعظم الوجهات',
    },
    kwFr: ['expédition', 'expedition', 'envoi', 'livraison', 'international', 'mondial', 'dhl', 'fedex', 'ups', 'export', 'logistique', 'maritime', 'ddp', 'douane', 'expédiez', 'expediez', 'expédier'],
    fr: {
      q: 'Expédiez-vous dans le monde entier ? Quelles sont les options ?',
      a: 'Oui, expédition dans le monde entier depuis Shenzhen (Chine) :\n• Express : DHL, FedEx, UPS — 3 à 5 jours vers les grandes villes\n• Fret maritime : idéal pour les grosses commandes\n• Export : documentation d\u2019exportation complète\n• DDP disponible pour la plupart des destinations',
    },
  },
  {
    id: 'quality',
    kw: ['quality', 'inspection', 'cmm', 'report', 'fai', 'iso', 'certificate', 'material cert', 'rohs', 'reach', 'traceability', 'defect', 'problem'],
    kwZh: ['质量', '检测', '三坐标', '报告', '检验', 'iso', '认证', '材质证明', 'rohs', '追溯', '有问题', '次品'],
    kwJa: ['品質', '検査', '測定', '三次元', 'cmm', '報告', '証明', 'iso', '認証', 'トレーサビリティ'],
    kwRu: ['качеств', 'контрол', 'инспекц', 'кмм', 'cmm', 'отчёт', 'отчет', 'fai', 'iso', 'сертификат', 'rohs', 'reach', 'прослеживаемост', 'дефект'],
    kwKo: ['품질', '검사', '측정', '3차원', 'cmm', '보고서', 'iso', '인증', '재질증명', 'rohs', '추적', '불량'],
    kwEs: ['calidad', 'inspección', 'inspeccion', 'medición', 'medicion', 'cmm', 'informe', 'iso', 'certificado', 'rohs', 'reach', 'trazabilidad', 'defecto'],
    kwDe: ['qualität', 'qualitaet', 'prüfung', 'pruefung', 'messung', 'cmm', 'bericht', 'iso', 'zertifikat', 'rohs', 'reach', 'rückverfolgbarkeit', 'rueckverfolgbarkeit', 'defekt'],
    kwAr: ['جودة', 'فحص', 'قياس', 'cmm', 'تقرير', 'iso', 'شهادة', 'rohs', 'reach', 'تتبع', 'عيب'],
    en: {
      q: 'What is your quality control system?',
      a: 'Full-process quality control:\n• First Article Inspection (FAI) on every batch\n• In-process sampling at multiple nodes\n• 100% final inspection of critical dimensions\n• Hexagon CMM (coordinate measuring machine) with full dimensional reports\n• Material certificates, RoHS/REACH compliance, full traceability\nISO 9001:2015 certification in progress. PPAP/FAI documents available on request.',
    },
    zh: {
      q: '你们的质量控制体系是怎样的？',
      a: '全过程品质管控：\n• 首件检验（FAI）：每批首件全尺寸检测\n• 过程检验：加工过程中多节点抽检\n• 终检：出厂前 100% 关键尺寸检验\n• 海克斯康三坐标（CMM），可出全尺寸检测报告\n• 材质证明、RoHS/REACH 合规、完整可追溯\nISO 9001:2015 认证办理中，可按需提供 PPAP/FAI 文件。',
    },
    ja: {
      q: '品質管理体制はどのようになっていますか？',
      a: '全工程の品質管理：\n• 初品検査（FAI）：各ロットの初品を全寸法検査\n• 工程内検査：加工中の複数ノードで抜き取り検査\n• 最終検査：出荷前に重要寸法を100%検査\n• ヘキサゴン三次元測定機（CMM）による全寸法レポート\n• 材料証明書、RoHS/REACH準拠、完全なトレーサビリティ\nISO 9001:2015認証は取得手続き中。PPAP/FAI書類はご要望に応じて提供可能です。',
    },
    ru: {
      q: 'Как устроена ваша система контроля качества?',
      a: 'Полный контроль качества на всех этапах:\n• Первичная проверка изделия (FAI) для каждой партии\n• Выборочный контроль на нескольких этапах процесса\n• 100% финальная проверка критических размеров\n• КИМ Hexagon с полными отчётами по размерам\n• Сертификаты на материалы, соответствие RoHS/REACH, полная прослеживаемость\nСертификация ISO 9001:2015 в процессе. Документы PPAP/FAI — по запросу.',
    },
    ko: {
      q: '품질 관리 시스템은 어떻게 되나요?',
      a: '전 공정 품질 관리:\n• 초품 검사(FAI): 모든 배치 초품 전 치수 검사\n• 공정 중 검사: 가공 중 여러 단계에서 샘플링\n• 최종 검사: 출하 전 중요 치수 100% 검사\n• 헥사곤 3차원 측정기(CMM)로 전체 치수 보고서 제공\n• 재질 증명서, RoHS/REACH 준수, 완전한 이력 추적\nISO 9001:2015 인증 진행 중. PPAP/FAI 문서는 요청 시 제공.',
    },
    es: {
      q: '¿Cómo es su sistema de control de calidad?',
      a: 'Control de calidad de proceso completo:\n• Inspección de primera pieza (FAI) en cada lote\n• Muestreo en proceso en múltiples puntos\n• Inspección final del 100% de dimensiones críticas\n• MMC Hexagon con informes dimensionales completos\n• Certificados de material, cumplimiento RoHS/REACH, trazabilidad completa\nCertificación ISO 9001:2015 en curso. Documentos PPAP/FAI bajo pedido.',
    },
    de: {
      q: 'Wie ist Ihr Qualitätskontrollsystem aufgebaut?',
      a: 'Qualitätskontrolle über den gesamten Prozess:\n• Erstmusterprüfung (FAI) für jede Charge\n• Zwischenprüfung an mehreren Stellen\n• 100% Endkontrolle kritischer Maße\n• Hexagon-KMG (Koordinatenmessgerät) mit vollständigen Messberichten\n• Materialzertifikate, RoHS/REACH-Konformität, vollständige Rückverfolgbarkeit\nISO 9001:2015-Zertifizierung in Arbeit. PPAP/FAI-Dokumente auf Anfrage.',
    },
    ar: {
      q: 'كيف يعمل نظام مراقبة الجودة لديكم؟',
      a: 'مراقبة جودة كاملة على جميع المراحل:\n• فحص القطعة الأولى (FAI) لكل دفعة\n• أخذ عينات أثناء العملية في عدة نقاط\n• فحص نهائي بنسبة 100% للأبعاد الحرجة\n• جهاز قياس إحداثيات Hexagon (CMM) بتقارير أبعاد كاملة\n• شهادات المواد، الامتثال لـ RoHS/REACH، تتبع كامل\nشهادة ISO 9001:2015 قيد الإصدار. مستندات PPAP/FAI متاحة عند الطلب.',
    },
    kwFr: ['qualité', 'qualite', 'contrôle', 'controle', 'inspection', 'mesure', 'cmm', 'rapport', 'iso', 'certificat', 'rohs', 'reach', 'traçabilité', 'tracabilite', 'défaut', 'defaut', 'contrôle qualité'],
    fr: {
      q: 'Comment fonctionne votre système de contrôle qualité ?',
      a: 'Contrôle qualité sur l\u2019ensemble du processus :\n• Contrôle de la première pièce (FAI) sur chaque lot\n• Échantillonnage en cours de production à plusieurs étapes\n• Inspection finale à 100 % des dimensions critiques\n• MMT Hexagon (machine à mesurer tridimensionnelle) avec rapports dimensionnels complets\n• Certificats matière, conformité RoHS/REACH, traçabilité complète\nCertification ISO 9001:2015 en cours. Documents PPAP/FAI sur demande.',
    },
  },
  {
    id: 'payment',
    kw: ['payment', 'pay', 'tt', 'wire transfer', 'paypal', 'lc', 'letter of credit', 'terms', 'deposit', 'net 30', 'invoice'],
    kwZh: ['付款', '支付', '电汇', 'paypal', '信用证', '定金', '账期', '怎么付'],
    kwJa: ['支払い', '決済', '振込', 't/t', 'paypal', '信用状', '前金'],
    kwRu: ['оплат', 'платёж', 'платеж', 'т/т', 'tt', 'банковский перевод', 'paypal', 'аккредитив', 'lc', 'предоплат', 'условия'],
    kwKo: ['결제', '지불', '송금', 't/t', 'paypal', '신용장', '계약금', '조건'],
    kwEs: ['pago', 'pagar', 'transferencia', 't/t', 'paypal', 'carta de crédito', 'carta de credito', 'lc', 'depósito', 'deposito', 'condiciones'],
    kwDe: ['zahlung', 'bezahlung', 'überweisung', 'ueberweisung', 't/t', 'paypal', 'akkreditiv', 'lc', 'anzahlung', 'bedingungen'],
    kwAr: ['دفع', 'سداد', 'تحويل', 't/t', 'paypal', 'اعتماد', 'lc', 'دفعة مقدمة', 'شروط'],
    en: {
      q: 'What payment methods do you accept?',
      a: '• T/T (wire transfer)\n• PayPal\n• Letter of Credit (L/C) for large orders\nStandard terms: 50% deposit + 50% before shipment. Established customers can apply for Net-30.',
    },
    zh: {
      q: '支持哪些付款方式？',
      a: '• 电汇（T/T）\n• PayPal\n• 信用证（L/C，适用于大额订单）\n标准付款条件：50% 定金 + 50% 发货前付清。合作稳定客户可申请 Net-30 月结。',
    },
    ja: {
      q: '支払い方法は何に対応していますか？',
      a: '• T/T（銀行振込）\n• PayPal\n• 信用状（L/C、大口注文向け）\n標準条件：前金50% + 出荷前50%。継続取引のお客様はNet-30月次決済を申請可能です。',
    },
    ru: {
      q: 'Какие способы оплаты вы принимаете?',
      a: '• T/T (банковский перевод)\n• PayPal\n• Аккредитив (L/C) для крупных заказов\nСтандартные условия: 50% предоплата + 50% перед отгрузкой. Постоянные клиенты могут оформить Net-30.',
    },
    ko: {
      q: '어떤 결제 방식을 지원하나요?',
      a: '• T/T(전신 송금)\n• PayPal\n• 신용장(L/C, 대량 주문용)\n표준 조건: 계약금 50% + 출하 전 50%. 거래 안정 고객은 Net-30 월결제 신청 가능.',
    },
    es: {
      q: '¿Qué métodos de pago aceptan?',
      a: '• T/T (transferencia bancaria)\n• PayPal\n• Carta de crédito (L/C) para pedidos grandes\nCondiciones estándar: 50% de depósito + 50% antes del envío. Clientes habituales pueden solicitar Net-30.',
    },
    de: {
      q: 'Welche Zahlungsmethoden akzeptieren Sie?',
      a: '• T/T (Banküberweisung)\n• PayPal\n• Akkreditiv (L/C) für große Bestellungen\nStandardbedingungen: 50% Anzahlung + 50% vor Versand. Stammkunden können Net-30 beantragen.',
    },
    ar: {
      q: 'ما هي طرق الدفع التي تقبلونها؟',
      a: '• T/T (تحويل بنكي)\n• PayPal\n• الاعتماد المستندي (L/C) للطلبات الكبيرة\nالشروط القياسية: 50% دفعة مقدمة + 50% قبل الشحن. يمكن للعملاء الدائمين طلب Net-30.',
    },
    kwFr: ['paiement', 'payer', 'virement', 't/t', 'paypal', 'lettre de crédit', 'lettre de credit', 'lc', 'acompte', 'conditions', 'facture', 'règlement', 'reglement'],
    fr: {
      q: 'Quels modes de paiement acceptez-vous ?',
      a: '• T/T (virement bancaire)\n• PayPal\n• Lettre de crédit (L/C) pour les grosses commandes\nConditions standard : 50 % d\u2019acompte + 50 % avant expédition. Les clients fidèles peuvent demander un Net-30.',
    },
  },
  {
    id: 'confidentiality',
    kw: ['nda', 'confidential', 'confidentiality', 'ip', 'intellectual', 'secret', 'secure', 'protect', 'design safe', 'proprietary'],
    kwZh: ['保密', 'nda', '知识产权', '安全', '图纸保密', '隐私', '保护'],
    kwJa: ['機密', '秘密', 'nda', '知財', '保護', '安全'],
    kwRu: ['nda', 'конфиденциальн', 'интеллектуальн', 'секрет', 'защит', 'безопасн', 'чертеж', 'чертёж'],
    kwKo: ['기밀', '비밀', 'nda', '지식재산', '보호', '보안', '도면'],
    kwEs: ['nda', 'confidencial', 'confidencialidad', 'propiedad intelectual', 'secreto', 'proteger', 'seguridad', 'plano'],
    kwDe: ['nda', 'vertraulich', 'vertraulichkeit', 'geistiges eigentum', 'geheimnis', 'schutz', 'sicherheit', 'zeichnung'],
    kwAr: ['nda', 'سرية', 'ملكية فكرية', 'سر', 'حماية', 'أمان', 'رسم'],
    en: {
      q: 'Will you keep my drawings confidential?',
      a: 'Yes. We take IP protection seriously:\n• NDA can be signed before receiving drawings\n• Files stored in an access-controlled system\n• Strict internal information-security process\nYour drawings and design information are kept strictly confidential.',
    },
    zh: {
      q: '你们会保密吗？图纸和设计安全怎么保障？',
      a: '会。我们非常重视客户知识产权：\n• 接收图纸前可签署 NDA 保密协议\n• 文件存于带访问权限控制的安全系统\n• 严格的内部信息安全管理流程\n客户图纸与设计信息绝对保密。',
    },
    ja: {
      q: '図面の機密は守ってもらえますか？',
      a: 'はい。知的財産保護を重視しています：\n• 図面受領前にNDA（秘密保持契約）を締結可能\n• ファイルはアクセス制御された安全なシステムで保管\n• 厳格な社内情報セキュリティプロセス\nお客様の図面・設計情報は厳重に機密管理されます。',
    },
    ru: {
      q: 'Вы сохраните конфиденциальность моих чертежей?',
      a: 'Да. Мы серьёзно относимся к защите интеллектуальной собственности:\n• NDA можно подписать до передачи чертежей\n• Файлы хранятся в системе с контролем доступа\n• Строгие внутренние процедуры информационной безопасности\nВаши чертежи и конструкторская информация строго конфиденциальны.',
    },
    ko: {
      q: '도면의 기밀을 보호해 주나요?',
      a: '네. 지식재산 보호를 중요하게 생각합니다:\n• 도면 수령 전 NDA(비밀유지계약) 체결 가능\n• 파일은 접근 제어 시스템에 안전하게 보관\n• 엄격한 사내 정보 보안 프로세스\n고객의 도면과 설계 정보는 철저히 기밀로 관리됩니다.',
    },
    es: {
      q: '¿Mantendrán mis planos confidenciales?',
      a: 'Sí. Nos tomamos muy en serio la protección de la propiedad intelectual:\n• Se puede firmar un NDA antes de recibir los planos\n• Archivos guardados en un sistema con control de acceso\n• Estricto proceso interno de seguridad de la información\nSus planos e información de diseño se mantienen estrictamente confidenciales.',
    },
    de: {
      q: 'Behandeln Sie meine Zeichnungen vertraulich?',
      a: 'Ja. Wir nehmen den Schutz geistigen Eigentums ernst:\n• NDA kann vor Erhalt der Zeichnungen unterzeichnet werden\n• Dateien werden in einem zugriffsgesteuerten System gespeichert\n• Strenge interne Informationssicherheitsprozesse\nIhre Zeichnungen und Konstruktionsdaten werden streng vertraulich behandelt.',
    },
    ar: {
      q: 'هل ستحافظون على سرية رسوماتي؟',
      a: 'نعم. نولي حماية الملكية الفكرية أهمية كبيرة:\n• يمكن توقيع اتفاقية عدم إفشاء (NDA) قبل استلام الرسومات\n• تُخزَّن الملفات في نظام ذي تحكم في الوصول\n• إجراءات داخلية صارمة لأمن المعلومات\nتُحفَظ رسوماتكم ومعلومات التصميم بسرية تامة.',
    },
    kwFr: ['nda', 'confidentiel', 'confidentialité', 'confidentialite', 'propriété intellectuelle', 'propriete intellectuelle', 'secret', 'protéger', 'proteger', 'sécurité', 'securite', 'plan', 'dessin', 'plans confidentiels'],
    fr: {
      q: 'Garderez-vous mes plans confidentiels ?',
      a: 'Oui. Nous prenons la protection de la propriété intellectuelle très au sérieux :\n• Un NDA peut être signé avant la réception des plans\n• Fichiers stockés dans un système à accès contrôlé\n• Processus interne strict de sécurité de l\u2019information\nVos plans et informations de conception restent strictement confidentiels.',
    },
  },
  {
    id: 'surface',
    kw: ['surface', 'finish', 'anodize', 'anodizing', 'plating', 'nickel', 'zinc', 'polish', 'bead blast', 'passivation', 'powder coat', 'black oxide', 'coating'],
    kwZh: ['表面处理', '阳极氧化', '电镀', '镀镍', '镀锌', '抛光', '喷砂', '钝化', '喷涂', '发黑', '氧化'],
    kwJa: ['表面処理', 'アルマイト', 'めっき', '研磨', 'ブラスト', '不動態化', '塗装', '鏡面'],
    kwRu: ['поверхност', 'покрыт', 'анодирован', 'никелирован', 'цинкован', 'полировк', 'пескостру', 'пассивац', 'порошков', 'оксидирован', 'отделк'],
    kwKo: ['표면처리', '표면', '처리', '아노다이징', '도금', '니켈', '아연', '연마', '샌딩', '부동태', '분체', '코팅', '산화'],
    kwEs: ['superficie', 'superficial', 'acabado', 'anodizado', 'niquelado', 'cincado', 'pulido', 'granallado', 'pasivación', 'pasivacion', 'recubrimiento', 'oxidado'],
    kwDe: ['oberfläche', 'oberflaeche', 'oberflächenbehandlung', 'eloxieren', 'vernickeln', 'verzinken', 'polieren', 'strahlen', 'passivieren', 'pulverbeschicht', 'oxidation'],
    kwAr: ['سطح', 'تشطيب', 'أكسدة', 'طلاء', 'نيكل', 'زنك', 'تلميع', 'سفع', 'تخميل', 'مسحوق', 'تغطية'],
    en: {
      q: 'What surface finishes do you offer?',
      a: '• Anodizing Type II / Type III (hard) — aluminum\n• Electroless nickel, chrome plating — steel/copper\n• Zinc plating, black oxide — carbon steel\n• Passivation — stainless steel\n• Bead blasting, polishing / mirror finish\n• Powder coating\nSurface treatment adds to lead time (roughly +1 to +5 days depending on process).',
    },
    zh: {
      q: '你们提供哪些表面处理？',
      a: '• 阳极氧化 Type II / 硬质 Type III — 铝合金\n• 化学镀镍、电镀铬 — 钢、铜\n• 镀锌、发黑 — 碳钢\n• 钝化 — 不锈钢\n• 喷砂、抛光/镜面\n• 粉末喷涂\n表面处理在机加工后叠加，视工艺增加约 1–5 天交期。',
    },
    ja: {
      q: 'どのような表面処理を提供していますか？',
      a: '• アルマイト処理 Type II / 硬質 Type III — アルミニウム\n• 無電解ニッケルめっき、クロムめっき — 鋼・銅\n• 亜鉛めっき、黒染め — 炭素鋼\n• 不動態化処理 — ステンレス鋼\n• ブラスト処理、研磨/鏡面仕上げ\n• 粉体塗装\n表面処理は機械加工後に追加され、工程により納期が約1～5日延びます。',
    },
    ru: {
      q: 'Какие виды обработки поверхности вы предлагаете?',
      a: '• Анодирование Type II / твёрдое Type III — алюминий\n• Химическое никелирование, хромирование — сталь/медь\n• Цинкование, оксидирование — углеродистая сталь\n• Пассивация — нержавеющая сталь\n• Пескоструйная обработка, полировка/зеркальная отделка\n• Порошковая окраска\nОбработка поверхности добавляет время (примерно +1…+5 дней в зависимости от процесса).',
    },
    ko: {
      q: '어떤 표면 처리를 제공하나요?',
      a: '• 아노다이징 Type II / 경질 Type III — 알루미늄\n• 무전해 니켈 도금, 크롬 도금 — 강, 구리\n• 아연 도금, 흑색 산화 — 탄소강\n• 부동태화 — 스테인리스강\n• 샌드 블라스팅, 연마/경면\n• 분체 도장\n표면 처리는 가공 후 추가되며 공정에 따라 납기가 약 1~5일 늘어납니다.',
    },
    es: {
      q: '¿Qué acabados superficiales ofrecen?',
      a: '• Anodizado Tipo II / Tipo III (duro) — aluminio\n• Niquelado químico, cromado — acero/cobre\n• Cincado, oxidado negro — acero al carbono\n• Pasivación — acero inoxidable\n• Granallado, pulido/acabado espejo\n• Recubrimiento en polvo\nEl tratamiento superficial añade plazo (aproximadamente +1 a +5 días según el proceso).',
    },
    de: {
      q: 'Welche Oberflächenbehandlungen bieten Sie an?',
      a: '• Eloxieren Typ II / Harteloxieren Typ III — Aluminium\n• Chemisch Nickel, Verchromen — Stahl/Kupfer\n• Verzinken, Brünieren — Kohlenstoffstahl\n• Passivieren — Edelstahl\n• Sandstrahlen, Polieren/Spiegelpolitur\n• Pulverbeschichtung\nOberflächenbehandlung verlängert die Lieferzeit (je nach Verfahren ca. +1 bis +5 Tage).',
    },
    ar: {
      q: 'ما هي معالجات الأسطح التي تقدمونها؟',
      a: '• الأنودة من النوع الثاني / الثالث (الصلب) — الألمنيوم\n• طلاء النيكل الكيميائي، طلاء الكروم — الفولاذ/النحاس\n• طلاء الزنك، الأكسدة السوداء — الفولاذ الكربوني\n• التخميل — الفولاذ المقاوم للصدأ\n• السفع الرملي، التلميع/التشطيب المرآوي\n• الطلاء بالمسحوق\nتضيف معالجة الأسطح إلى مدة التسليم (حوالي +1 إلى +5 أيام حسب العملية).',
    },
    kwFr: ['surface', 'finition', 'anodisation', 'anodisé', 'anodise', 'placage', 'nickel', 'zinc', 'polissage', 'sablage', 'passivation', 'peinture', 'revêtement', 'revetement', 'oxydation', 'finition de surface'],
    fr: {
      q: 'Quelles finitions de surface proposez-vous ?',
      a: '• Anodisation Type II / Type III (dure) — aluminium\n• Nickelage chimique, chromage — acier/cuivre\n• Zingage, oxydation noire — acier carbone\n• Passivation — acier inoxydable\n• Sablage, polissage/fini miroir\n• Peinture en poudre\nLe traitement de surface ajoute du délai (environ +1 à +5 jours selon le procédé).',
    },
  },
  {
    id: 'contact',
    kw: ['contact', 'email', 'phone', 'whatsapp', 'address', 'location', 'where are you', 'company', 'about you', 'hours', 'who are you'],
    kwZh: ['联系', '邮箱', '电话', '地址', '在哪', '公司', '介绍', '微信', '工作时间', '怎么找'],
    kwJa: ['連絡', 'メール', '電話', '住所', '所在地', '問い合わせ'],
    kwRu: ['контакт', 'email', 'почт', 'телефон', 'адрес', 'где вы', 'связаться', 'написать', 'позвонить'],
    kwKo: ['연락', '이메일', '전화', '주소', '위치', '문의', '회사'],
    kwEs: ['contacto', 'email', 'correo', 'teléfono', 'telefono', 'dirección', 'direccion', 'dónde están', 'donde estan', 'contactar', 'escribir'],
    kwDe: ['kontakt', 'email', 'e-mail', 'telefon', 'adresse', 'wo sind sie', 'kontaktieren', 'schreiben'],
    kwAr: ['اتصال', 'بريد', 'هاتف', 'عنوان', 'أين أنتم', 'تواصل', 'مراسلة'],
    en: {
      q: 'How do I contact you?',
      a: '• Email: ' + COMPANY.email + '\n• Phone: ' + COMPANY.phone + '\n• Location: ' + COMPANY.location + '\n• Website: ' + COMPANY.site + '\nWe typically respond within 2 business hours on working days.',
    },
    zh: {
      q: '怎么联系你们？',
      a: '• 邮箱：' + COMPANY.email + '\n• 电话：' + COMPANY.phone + '\n• 地址：' + COMPANY.locationZh + '\n• 官网：' + COMPANY.site + '\n工作日通常 2 小时内回复。',
    },
    ja: {
      q: 'どうやって連絡すればよいですか？',
      a: '• メール：' + COMPANY.email + '\n• 電話：' + COMPANY.phone + '\n• 所在地：' + COMPANY.location + '\n• ウェブサイト：' + COMPANY.site + '\n平日は通常2時間以内に返信します。',
    },
    ru: {
      q: 'Как с вами связаться?',
      a: '• Email: ' + COMPANY.email + '\n• Телефон: ' + COMPANY.phone + '\n• Расположение: ' + COMPANY.location + '\n• Сайт: ' + COMPANY.site + '\nОбычно отвечаем в течение 2 рабочих часов в рабочие дни.',
    },
    ko: {
      q: '어떻게 연락하나요?',
      a: '• 이메일: ' + COMPANY.email + '\n• 전화: ' + COMPANY.phone + '\n• 위치: ' + COMPANY.location + '\n• 웹사이트: ' + COMPANY.site + '\n평일에는 보통 2시간 이내에 답변합니다.',
    },
    es: {
      q: '¿Cómo puedo contactarles?',
      a: '• Email: ' + COMPANY.email + '\n• Teléfono: ' + COMPANY.phone + '\n• Ubicación: ' + COMPANY.location + '\n• Sitio web: ' + COMPANY.site + '\nNormalmente respondemos en 2 horas laborables.',
    },
    de: {
      q: 'Wie kann ich Sie kontaktieren?',
      a: '• E-Mail: ' + COMPANY.email + '\n• Telefon: ' + COMPANY.phone + '\n• Standort: ' + COMPANY.location + '\n• Website: ' + COMPANY.site + '\nWir antworten werktags normalerweise innerhalb von 2 Stunden.',
    },
    ar: {
      q: 'كيف أتواصل معكم؟',
      a: '• البريد الإلكتروني: ' + COMPANY.email + '\n• الهاتف: ' + COMPANY.phone + '\n• الموقع: ' + COMPANY.location + '\n• الموقع الإلكتروني: ' + COMPANY.site + '\nنرد عادة خلال ساعتي عمل في أيام العمل.',
    },
    kwFr: ['contact', 'email', 'e-mail', 'téléphone', 'telephone', 'adresse', 'où êtes-vous', 'ou etes-vous', 'contacter', 'écrire', 'ecrire', 'société', 'societe', 'joindre'],
    fr: {
      q: 'Comment vous contacter ?',
      a: '• Email : ' + COMPANY.email + '\n• Téléphone : ' + COMPANY.phone + '\n• Localisation : ' + COMPANY.location + '\n• Site web : ' + COMPANY.site + '\nNous répondons généralement sous 2 heures ouvrées en jours ouvrables.',
    },
  },
];
