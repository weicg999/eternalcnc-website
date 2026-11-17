---
title: "Выбор материалов для робота на одной странице: узел × среда × материал × обработка"
description: "Не спрашивайте, какой материал лучше. Пять схем подскажут, что взять для каждого узла робота, учитывая среду, обработку и бюджет."
pubDate: 2026-11-17
category: "Material Selection"
system: "robotics"
tags: ["робототехника", "выбор материалов", "алюминий 6061", "алюминий 7075", "углеволокно", "отделка поверхностей", "конструкторы"]
author: Отдел закупок
readingTime: "7 мин чтения"
---

Первое, что останавливает при сборке робота, — не чертёж. Выбор материала. 6061, 7075, нержавейка, титан, углеволокно — разложишь таблицу и запутаешься сильнее, чем в начале.

Дело в вопросе. **«Какой материал лучше» не имеет ответа. Нет лучшего материала — есть подходящий для конкретной задачи.**

Это не энциклопедия материалов. Это способ сопоставить: ответьте на четыре вопроса, потом посмотрите пять схем. Прочитав, вы сможете сказать: «эта деталь — вот из такого материала, а не из того». Этого достаточно.

Глубокая проработка шарниров — в двух длинных статьях в конце.

## 1. Сначала четыре вопроса, потом выбор

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 316" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Порядок выбора материала для робота: сначала среда, потом нагрузка, потом вес, потом бюджет" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Не выбор материала, а четыре вопроса</text>
<rect x="16" y="46" width="488" height="58" rx="9" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="42" y="82" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#0C447C">1</text>
<text x="66" y="69" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Какая среда?</text>
<text x="66" y="97" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Влага, жар, чистота — исключают сразу</text>
<rect x="16" y="112" width="488" height="58" rx="9" style="fill:#EAF3EC;stroke:#7FBF9A;stroke-width:1"/>
<text x="42" y="148" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#1B5E3A">2</text>
<text x="66" y="135" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Какая нагрузка?</text>
<text x="66" y="163" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Покой, частый пуск или удар</text>
<rect x="16" y="178" width="488" height="58" rx="9" style="fill:#FAEEDA;stroke:#EF9F27;stroke-width:1"/>
<text x="42" y="214" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#633806">3</text>
<text x="66" y="201" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Вес критичен?</text>
<text x="66" y="229" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Каждый грамм на конце — цена всей руки</text>
<rect x="16" y="244" width="488" height="58" rx="9" style="fill:#F3E8EE;stroke:#C77BA6;stroke-width:1"/>
<text x="42" y="280" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#6B2447">4</text>
<text x="66" y="267" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Куда вложить деньги?</text>
<text x="66" y="295" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Усиливать только нагруженное</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Рис. 1 · Порядок важен: среда отсекает варианты, нагрузка задаёт прочность, вес — удельную прочность, бюджет — что усиливать</figcaption>
</figure>

**Первый вопрос пропускают чаще всего.** Среда — не примечание в конце. Она может исключить половину вариантов ещё до чертежа. Прототип, который работает на столе, через три месяца во влажном цехе может выйти из строя.

**Второй понимают неправильнее всего.** Робот испытывает повторные пуски-остановы, а не статическую нагрузку. Предел выносливости обычно составляет 30–40% от предела прочности. Расчёт по статике даёт деталь на грани.

## 2. Шесть узлов — сопоставьте

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Шесть узлов робота и материалы: рама 6061, шарнир 7075 или 17-4PH, привод сталь, захват 6061 или POM, корпус лист, втулки POM" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Шесть узлов — шесть материалов</text>
<rect x="16" y="46" width="150" height="40" rx="6" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="28" y="72" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Рама</text>
<rect x="174" y="46" width="330" height="40" rx="6" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="186" y="72" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">6061-T6　лучшая цена</text>
<rect x="16" y="90" width="150" height="40" rx="6" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="28" y="116" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Шарнир</text>
<rect x="174" y="90" width="330" height="40" rx="6" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="186" y="116" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">7075-T6 / 17-4PH　локально</text>
<rect x="16" y="134" width="150" height="40" rx="6" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="28" y="160" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Привод</text>
<rect x="174" y="134" width="330" height="40" rx="6" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="186" y="160" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Сталь 4140 / 4340　шлифовка</text>
<rect x="16" y="178" width="150" height="40" rx="6" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="28" y="204" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Захват</text>
<rect x="174" y="178" width="330" height="40" rx="6" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="186" y="204" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">6061 / POM　лёгкость выигрывает</text>
<rect x="16" y="222" width="150" height="40" rx="6" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="28" y="248" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Корпус, кожух</text>
<rect x="174" y="222" width="330" height="40" rx="6" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="186" y="248" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Лист 5052　гнуть, не фрезеровать</text>
<rect x="16" y="266" width="150" height="40" rx="6" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="28" y="292" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Втулки, трение</text>
<rect x="174" y="266" width="330" height="40" rx="6" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="186" y="292" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">POM / UHMW-PE　самосмазка</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Рис. 2 · По умолчанию весь робот из 6061 и пластика; денег стоят только две верхние строки</figcaption>
</figure>

Одна фраза для памяти: **деньги — туда, где есть нагрузка. Всё остальное — 6061, пластик и покупные узлы.**

Для длинных деталей покупайте прессованный профиль и обрабатывайте только торцы, а не выбирайте из целого бруса — отходов намного меньше. Для корпусов гнутый лист 5052 стоит 10–20% от цельной фрезерованной заготовки. Подшипники, направляющие, редукторы — покупные. Не делайте то, что можно заказать.

Подробный разбор по подсистемам — в статье [«Материалы деталей робота»](/ru/knowledge/tech-blog/robot-parts-material-selection-cost-guide/).

## 3. Сменили среду — сменили ответ

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Четыре среды и материалы: помещение 6061, влага 316L или герметизация, чистота электрополировка, жар сталь или титан" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Один робот, другая среда — другой ответ</text>
<rect x="16" y="46" width="110" height="52" rx="8" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="71" y="78" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Помещение</text>
<rect x="134" y="46" width="370" height="52" rx="8" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="148" y="66" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">6061 + анодирование</text>
<text x="148" y="93" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Дёшево и достаточно</text>
<rect x="16" y="106" width="110" height="52" rx="8" style="fill:#FAEEDA;stroke:#EF9F27;stroke-width:1"/>
<text x="71" y="138" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#633806">Влага, соль</text>
<rect x="134" y="106" width="370" height="52" rx="8" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="148" y="126" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">316L или твёрдый анод + герметик</text>
<text x="148" y="153" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">7075 без защиты — коррозия</text>
<rect x="16" y="166" width="110" height="52" rx="8" style="fill:#EAF3EC;stroke:#7FBF9A;stroke-width:1"/>
<text x="71" y="198" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1B5E3A">Чистота</text>
<rect x="134" y="166" width="370" height="52" rx="8" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="148" y="186" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">316L, электрополировка</text>
<text x="148" y="213" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Пластик с выделениями не берём</text>
<rect x="16" y="226" width="110" height="52" rx="8" style="fill:#F3E8EE;stroke:#C77BA6;stroke-width:1"/>
<text x="71" y="258" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#6B2447">Жар</text>
<rect x="134" y="226" width="370" height="52" rx="8" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="148" y="246" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Сталь или титан</text>
<text x="148" y="273" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Алюминий мягкий после 150 °C</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Рис. 3 · Среда решает первой: влага — коррозия, чистота — выделения, жар — размягчение, а не твёрдость</figcaption>
</figure>

Здесь стоит поправить две частые ошибки.

**Нержавейка для влаги — из-за коррозии, не из-за твёрдости.** Хром образует пассивную плёнку. Твёрдость тут ни при чём. Нужна твёрдость — есть мартенситные стали; нужно облегчить — нержавейка тяжелее. Настоящая цена — упрочнение при обработке, низкая теплопроводность и липкая стружка.

**Титан дорог не только как материал.** Его теплопроводность около 7 Вт/(м·К) — в двадцать четыре раза ниже алюминия. Корпус шарнира ещё и радиатор; титан запирает тепло внутри. И ещё контринтуитивное: удельная жёсткость алюминия, магния, титана и стали почти одинакова — узкий диапазон 24–26. Замена алюминия титаном ради облегчения даёт намного меньше, чем ждут. **Материал решает прочность, конструкция решает жёсткость.**

С углеволокном та же история. Удельная жёсткость и прочность действительно высоки, но оно **анизотропно, слабо на межслойный сдвиг и склонно к расслоению у кромок**. Годится для длинных рычагов, не для корпусов шарниров с отверстиями и резьбой. Не берите его потому, что оно «престижнее».

## 4. Обработка — часть выбора материала

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Пять материалов и их обработка: 6061 анодирование, 7075 твёрдое анодирование, углеродистая сталь никель, 316L пассивация, титан окрас но плохой радиатор" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Обработка выбирается вместе с материалом</text>
<rect x="16" y="46" width="90" height="46" rx="7" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="61" y="75" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">6061</text>
<rect x="114" y="46" width="390" height="46" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="126" y="75" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Анодирование — маска для контакта</text>
<rect x="16" y="96" width="90" height="46" rx="7" style="fill:#FAEEDA;stroke:#EF9F27;stroke-width:1"/>
<text x="61" y="125" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#633806">7075</text>
<rect x="114" y="96" width="390" height="46" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="126" y="125" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Твёрдый анод — запас под посадку</text>
<rect x="16" y="146" width="90" height="46" rx="7" style="fill:#EAF3EC;stroke:#7FBF9A;stroke-width:1"/>
<text x="61" y="175" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1B5E3A">Сталь</text>
<rect x="114" y="146" width="390" height="46" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="126" y="175" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Никель / воронение — иначе ржа</text>
<rect x="16" y="196" width="90" height="46" rx="7" style="fill:#EAF3EC;stroke:#7FBF9A;stroke-width:1"/>
<text x="61" y="225" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1B5E3A">316L</text>
<rect x="114" y="196" width="390" height="46" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="126" y="225" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Пассивация — для чистоты полировка</text>
<rect x="16" y="246" width="90" height="46" rx="7" style="fill:#F3E8EE;stroke:#C77BA6;stroke-width:1"/>
<text x="61" y="275" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#6B2447">Титан</text>
<rect x="114" y="246" width="390" height="46" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="126" y="275" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Окрас — но не радиатор из него</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Рис. 4 · Обработку решают в момент выбора материала, а не после готовых деталей</figcaption>
</figure>

Толщина покрытия — самая простая ловушка. Она **измеряется**, то есть относится к проверяемой стороне, но несколько микрон анодного слоя съедают посадочный размер. Места под подшипник либо маскируют, либо закладывают поправку на плёнку в чертеже. Решение принимают до выпуска, а не после гальваники. Подробный расчёт — в статье [«Анодирование и контроль размеров»](/ru/knowledge/tech-blog/robotics-anodizing-dimension-control/).

## 5. Куда вложить деньги

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Лестница стоимости материалов робота от дешёвых к дорогим: 6061 и POM, лист 5052 и сталь 4140, 7075 и 17-4PH и 316L, титан и PEEK" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Деньги на край, не на весь робот</text>
<rect x="16" y="48" width="110" height="42" rx="7" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="26" y="75" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Базовый</text>
<rect x="134" y="48" width="356" height="42" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="146" y="75" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">6061 / POM / покупное</text>
<rect x="16" y="98" width="180" height="42" rx="7" style="fill:#EAF3EC;stroke:#7FBF9A;stroke-width:1"/>
<text x="26" y="125" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1B5E3A">Форма экономит</text>
<rect x="204" y="98" width="286" height="42" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="216" y="125" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Лист 5052 / сталь 4140</text>
<rect x="16" y="148" width="270" height="42" rx="7" style="fill:#FAEEDA;stroke:#EF9F27;stroke-width:1"/>
<text x="26" y="175" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#633806">Локальный апгрейд</text>
<rect x="294" y="148" width="196" height="42" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="306" y="175" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">7075 / 17-4PH / 316L</text>
<rect x="16" y="198" width="360" height="42" rx="7" style="fill:#F3E8EE;stroke:#C77BA6;stroke-width:1"/>
<text x="26" y="225" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#6B2447">Особый случай</text>
<rect x="384" y="198" width="106" height="42" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="392" y="225" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Титан / PEEK</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Рис. 5 · Дороже — значит правее. Большинство деталей остаются в базовом ряду, усиление — в одном-двух местах</figcaption>
</figure>

Три приёма экономии не связаны с маркой стали.

**Меняйте форму.** Лист — для тонких панелей, профиль — для длинных, литьё и пластик — для партий, ЧПУ — для прототипов. Здесь часто экономят больше, чем на замене сплава.

**Не бойтесь пластика.** Захваты, втулки, кожухи — пластик не только дешевле, часто лучше. Легче, тише, без смазки.

**Делайте DFM заранее.** Толщина стенки, реально нужный допуск, упрощение признаков — всё это снижает стоимость обработки до первого реза.

## 6. Конструктору с ограниченным бюджетом

Инженер и конструктор ошибаются по-разному. Инженер боится, что конструкция откажет. Конструктор — что деньги кончатся раньше, чем робот начнёт двигаться.

Тратьте в таком порядке:

1. Сделайте первую версию из базового ряда на рисунке 2. Не берите титан и углеволокно сразу.
2. Усиливайте ту деталь, которая сломалась — **только её**, замените на 7075 или сталь. Не меняйте всю руку.
3. Покупайте всё, что есть в каталоге. Не фрезеруйте корпуса подшипников и редукторы.
4. Обработку решите в чертеже. Не узнавайте о посеченном посадочном месте после гальваники.
5. В сомнениях спросите: «Есть ли дешевле материал, который справится?» Обычно есть.

Что мы берём на себя: до расчёта цены отмечаем, какие операции попадают на сторону «нельзя проверить после»; есть алюминий, сталь, титан и инженерный пластик — от одного прототипа до малой партии, без минимального заказа; расчёт цены за 2 часа, прототип за 3–7 дней; сертификат EN 10204 3.1 и привязка плавки по запросу.

[Пришлите чертёж, расчёт за 2 часа](/ru/contact/get-a-quote/)

## Частые вопросы

**Всем роботам нужен 6061?**
Большинству силовых деталей — да. Шарниры, приводы и детали трения часто требуют усиления. Базовый ряд — старт, а не финиш.

**Влажная среда — значит всё из нержавейки?**
Нет. Весь робот из 316L дороже и тяжелее. Детали, контактирующие с влагой, — из нержавейки, остальные — твёрдый анод с герметизацией.

**Углеволокно лучше алюминия?**
Не «лучше», а другое и анизотропное. Хорошо для длинных рычагов, не обязательно для корпуса шарнира с отверстиями и теплоотводом.

**Бюджет только на одно усиление. Что выбирать?**
То, что отказывает первым. Обычно фланец шарнира или нагруженная часть захвата, никогда не корпус.

## Читать дальше

- [«Материалы деталей робота: что использовать для каждого компонента»](/ru/knowledge/tech-blog/robot-parts-material-selection-cost-guide/) — разбор по подсистемам и пять правил экономии.
- [«Как выбрать материалы для шарниров робота: семь решений»](/ru/knowledge/tech-blog/robot-joint-material-selection/) — только шарниры: таблица параметров, сюрприз с удельной жёсткостью и три ловушки.

Диапазоны параметров взяты из двух указанных статей, уже опубликованных на сайте. Критерии выбора согласованы с типовыми данными марок 6061-T6, 7075-T6 и Ti-6Al-4V; конкретную марку всегда подтверждайте актуальным сертификатом поставщика.
