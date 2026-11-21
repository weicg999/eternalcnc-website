---
title: "Алюминий 1xxx–7xxx: от 6061 и 7075 к реальным ловушкам выбора марки"
description: "Как делятся серии алюминия 1xxx–7xxx? 6061 и 7075 различаются по прочности на 85%, но по жёсткости лишь на 4%. Одна схема, шесть ловушек, данные с источниками."
pubDate: 2026-11-21
category: "Material Selection"
tags: ["алюминий", "серии 1xxx-7xxx", "6061", "7075", "выбор материалов", "коррозионное растрескивание", "анодирование", "ЧПУ-обработка"]
system: "general"
author: Отдел закупок
readingTime: "10 мин чтения"
---

В ЧПУ-обработке чаще всего спрашивают две марки — 6061 и 7075. Они стали кратким обозначением «обычного алюминия» и «премиального алюминия».

Но чтобы по-настоящему их понять, отступите назад и посмотрите на семейства 1xxx–7xxx. 6061 — рабочая лошадка серии 6xxx, 7075 — флагман 7xxx. Их роль определяется серией, к которой они относятся. Без этого контекста выбор превращается в догадки: прочнее — значит лучше, дороже — значит выше класс, авиационный — значит подходит для любой детали.

Оговорка об источниках: классификация серий и механические свойства ниже — внешние данные, источники указаны в конце. Внутренняя структура заказов — это устные наблюдения, не статистика.

## Карта семейств 1xxx–7xxx

Деформируемый алюминий обозначается четырьмя цифрами, и первая цифра задаёт серию. Зная основной легирующий элемент каждой серии, вы читаете характер марки с первого взгляда.

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 382" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Схема серий алюминия 1–7: основной легирующий элемент, возможность термообработки и типичное применение" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="28" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="18" font-weight="700" style="fill:#1A1A1A">Алюминий 1xxx–7xxx: характер задаёт цифра</text>
<rect x="16" y="42" width="488" height="40" rx="7" style="fill:#F5F5F4;stroke:#D6D6D4;stroke-width:1"/>
<text x="30" y="68" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Серия</text>
<text x="112" y="68" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Элемент</text>
<text x="232" y="68" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Термообр.</text>
<text x="356" y="68" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Применение</text>
<rect x="16" y="86" width="488" height="38" rx="7" style="fill:#FFFFFF;stroke:#E5E7EB;stroke-width:1"/>
<text x="30" y="112" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">1xxx</text>
<text x="112" y="112" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Чистый 99%+</text>
<text x="232" y="112" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Нет</text>
<text x="356" y="112" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Электрика</text>
<rect x="16" y="128" width="488" height="38" rx="7" style="fill:#F5F5F4;stroke:#E5E7EB;stroke-width:1"/>
<text x="30" y="154" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">2xxx</text>
<text x="112" y="154" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Медь</text>
<text x="232" y="154" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Да</text>
<text x="356" y="154" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Авиакаркас</text>
<rect x="16" y="170" width="488" height="38" rx="7" style="fill:#FFFFFF;stroke:#E5E7EB;stroke-width:1"/>
<text x="30" y="196" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">3xxx</text>
<text x="112" y="196" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Марганец</text>
<text x="232" y="196" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Нет</text>
<text x="356" y="196" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Теплообменники</text>
<rect x="16" y="212" width="488" height="38" rx="7" style="fill:#F5F5F4;stroke:#E5E7EB;stroke-width:1"/>
<text x="30" y="238" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">4xxx</text>
<text x="112" y="238" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Кремний</text>
<text x="232" y="238" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Частично</text>
<text x="356" y="238" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Проволока</text>
<rect x="16" y="254" width="488" height="38" rx="7" style="fill:#FFFFFF;stroke:#E5E7EB;stroke-width:1"/>
<text x="30" y="280" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">5xxx</text>
<text x="112" y="280" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Магний</text>
<text x="232" y="280" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Нет</text>
<text x="356" y="280" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Море, ёмкости</text>
<rect x="16" y="296" width="488" height="38" rx="7" style="fill:#EAF3EC;stroke:#7FBF9A;stroke-width:1"/>
<text x="30" y="322" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#1B5E3A">6xxx</text>
<text x="112" y="322" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#1B5E3A">Mg + Si</text>
<text x="232" y="322" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#1B5E3A">Да</text>
<text x="356" y="322" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#1B5E3A">Профили · 6061</text>
<rect x="16" y="338" width="488" height="38" rx="7" style="fill:#FCECEC;stroke:#E5A5A5;stroke-width:1"/>
<text x="30" y="364" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#8B0000">7xxx</text>
<text x="112" y="364" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#8B0000">Zn + Mg/Cu</text>
<text x="232" y="364" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#8B0000">Да</text>
<text x="356" y="364" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#8B0000">Прочность 7075</text>
</svg>
<figcaption style="text-align:center;font-size:0.9em;color:#666;margin-top:0.6em;">Рис. 1 · Карта 1xxx–7xxx: 6061 относится к 6xxx, 7075 — к 7xxx</figcaption>
</figure>

Через всю таблицу проходит одна невидимая линия: **возможность термообработки определяет поведение при сварке.** Серии 1xxx, 3xxx и 5xxx набирают прочность наклёпом, поэтому зона термического влияния не теряет состояние. Серии 2xxx, 6xxx и 7xxx упрочняются закалкой и старением, поэтому сварка размягчает зону шва. Поэтому сварные конструкции тяготеют к 5xxx и 6xxx, а 7xxx почти не сваривают плавлением. Эта линия ещё не раз всплывёт в сравнении 6061 и 7075.

## 6061 против 7075: главное

| Свойство | 6061-T6 | 7075-T6 | Разница |
|---|---|---|---|
| Предел прочности | 310 МПа | 572 МПа | 7075 выше ~на 85% |
| Предел текучести | 270 МПа | 503 МПа | 7075 выше ~на 85% |
| Твёрдость по Бринеллю | 95 HB | 150 HB | 7075 выше ~на 58% |
| Модуль упругости | 69 ГПа | 71,7 ГПа | **всего ~4%** |
| Плотность | 2,70 г/см³ | 2,81 г/см³ | 7075 выше ~на 4% |
| Сварка | сварится плавлением | практически не сварится | решающее различие |
| Анодирование | чистое, стабильное | темнеет, возможны пятна | важно для внешнего вида |

**Правило:** в сомнениях берите 6061. Переходите на 7075 только тогда, когда деталь действительно ограничена прочностью и ни масса, ни габариты не могут вырасти.

## Ловушка 1: прочность +85%, жёсткость +4%

Это главная ловушка и самая распространённая.

Предел прочности 310 против 572 МПа — 7075 действительно намного прочнее. Но если задача — прогиб под нагрузкой, нужно смотреть не прочность, а жёсткость.

Жёсткость задаётся модулем упругости. У 6061 он 69 ГПа, у 7075 — 71,7 ГПа, разница 4%. Одно сечение, одна форма — и 7075 гнётся почти так же. Доплата за материал не даёт того, что было нужно.

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 292" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="6061 и 7075 различаются по прочности примерно на 85%, но по модулю упругости лишь на 4%" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="18" font-weight="700" style="fill:#1A1A1A">Прочность — разрыв, жёсткость — почти та же</text>
<rect x="16" y="46" width="236" height="152" rx="9" style="fill:#FCECEC;stroke:#E5A5A5;stroke-width:1"/>
<text x="36" y="76" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#8B0000">Предел прочности</text>
<text x="36" y="108" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">6061　310 МПа</text>
<text x="36" y="136" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">7075　572 МПа</text>
<text x="36" y="174" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="18" font-weight="700" style="fill:#8B0000">7075 выше ~на 85%</text>
<rect x="268" y="46" width="236" height="152" rx="9" style="fill:#EAF3EC;stroke:#7FBF9A;stroke-width:1"/>
<text x="288" y="76" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#1B5E3A">Модуль упругости</text>
<text x="288" y="108" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">6061　69 ГПа</text>
<text x="288" y="136" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">7075　71,7 ГПа</text>
<text x="288" y="174" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="18" font-weight="700" style="fill:#1B5E3A">Всего ~4%</text>
<rect x="16" y="214" width="488" height="58" rx="9" style="fill:#F5F5F4;stroke:#D6D6D4;stroke-width:1"/>
<text x="260" y="251" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="18" font-weight="700" style="fill:#1A1A1A">Жёсткость — геометрией сечения, не маркой</text>
</svg>
<figcaption style="text-align:center;font-size:0.9em;color:#666;margin-top:0.6em;">Рис. 2 · Прочность выше на 85%, жёсткость — лишь на 4%</figcaption>
</figure>

Жёсткость даёт форма сечения, рёбра и конструкция. Не смена марки.

Правильный случай для 7075 — деталь, ограниченная прочностью: она не гнётся заметно, но ломается — звенья робота, нагруженные кронштейны, плиты пресс-форм. Вот где разрыв в 85% окупается.

## Ловушка 2: 7075 на самом деле обрабатывается лучше, проблема в другом

Старое мнение: «7075 твёрдая, поэтому съедает инструмент». Верно лишь наполовину.

При резании 7075 даёт более короткую, хрупкую стружку, которая легко ломается и уходит, оставляя чистую поверхность. 6061 идёт липче, склонна к наросту и требует острее инструмент и лучше эвакуацию стружки. По обрабатываемости 7075 не проигрывает.

Так в чём же сложность 7075? В остаточных напряжениях.

Прокатанная плита держит внутреннее напряжение. Черовое фрезерование снимает материал слой за слоем, напряжение перераспределяется — и деталь коробится, особенно тонкостенная.

Правильный маршрут: черновая обработка, снятие напряжений, чистовая — в две установки. Пропустите шаг, и размеры уйдут в брак. Это задача технологии, не инструмента. Никакой фрезой её не спасти.

## Ловушка 3: состояние важнее марки

«Мне нужен 7075» — неполная фраза.

7075 бывает в состояниях T6, T651, T73, T7351 и других. T6 даёт пик прочности, но склонен к коррозионному растрескиванию под напряжением в коротком поперечном направлении: постоянная растягивающая нагрузка плюс влага — и деталь трескается сама.

T73 и T7351 — перестаренные состояния. Они отдают ступень прочности в обмен на стойкость к коррозионному растрескиванию. Морская эксплуатация, влажный цех, длительно нагруженные конструкции — указывайте T73, а не по умолчанию T6.

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Компромисс между прочностью и стойкостью к коррозионному растрескиванию для состояний 7075 T6 и T73" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="18" font-weight="700" style="fill:#1A1A1A">Марка одна — состояние меняет характер</text>
<rect x="16" y="46" width="488" height="82" rx="9" style="fill:#FCECEC;stroke:#E5A5A5;stroke-width:1"/>
<text x="36" y="76" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="18" font-weight="700" style="fill:#8B0000">7075-T6　пик прочности</text>
<text x="36" y="106" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Короткое направление + нагрузка + влага: риск КРН</text>
<rect x="16" y="138" width="488" height="82" rx="9" style="fill:#EAF3EC;stroke:#7FBF9A;stroke-width:1"/>
<text x="36" y="168" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="18" font-weight="700" style="fill:#1B5E3A">7075-T73 / T7351　перестаренное</text>
<text x="36" y="198" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Меньше прочности, больше стойкости к КРН</text>
<rect x="16" y="232" width="488" height="54" rx="9" style="fill:#F5F5F4;stroke:#D6D6D4;stroke-width:1"/>
<text x="260" y="266" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#1A1A1A">И 6061: T651 снимает напряжения, стабильнее</text>
</svg>
<figcaption style="text-align:center;font-size:0.9em;color:#666;margin-top:0.6em;">Рис. 3 · Кроме марки проверяйте состояние</figcaption>
</figure>

У 6061 тоже есть состояния. T651 добавляет к T6 растяжение для снятия напряжений и даёт лучшую стабильность размеров при точной обработке. В заявке написано просто «6061» без состояния — значит результат зависит от того, что пришлёт поставщик.

## Ловушка 4: медь делает анодирование 7075 пятнистым

6061 анодируется чисто, равномерно и предсказуемо. Поэтому это выбор по умолчанию для наружных деталей.

7075 содержит цинк и медь, меди обычно около 1,2–2,0%. Эти элементы темнят анодную плёнку и могут давать пятна. Твёрдое анодирование затемняет её ещё сильнее.

Если партия должна быть в один цвет или попадать в эталон заказчика — берите 6061. Задать 7075, а потом гнаться за цветом — значит искать себе неприятности.

## Ловушка 5: 7075 не сваривается — причина в интервале плавления

6061 нормально сварится плавлением присадочной проволокой 4043 или 5356. 7075 фактически не сварится плавлением: шов и зона термического влияния трескаются по горячей трещине.

Обычное объяснение — «медь мешает сварке». Полезнее посмотреть на интервал плавления: у 6061 солидус 580 °C, ликвидус 650 °C; у 7075 солидус около 480 °C, ликвидус около 640 °C. Диапазон у 7075 намного шире, поэтому низкоплавкие фазы плавятся первыми и трескаются при остывании.

Соединяйте 7075 механическим крепежом, структурным клеем или сваркой трением с перемешиванием — процессами, не плавящими основной металл.

Ещё один легко упускаемый момент: после сварки 6061 зона термического влияния теряет состояние и намного слабее T6. Расчитывайте шов на ослабленное состояние, а не по таблице свойств основного металла.

## Ловушка 6: цена — это не только цена за килограмм

7075 стоит примерно вдвое дороже 6061 за фунт. Реальная разница в стоимости шире.

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Пять скрытых факторов стоимости 7075 относительно 6061: материал, сортамент, технология, отделка, сертификация" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="18" font-weight="700" style="fill:#1A1A1A">7075 дороже не только по цене материала</text>
<rect x="16" y="46" width="488" height="46" rx="8" style="fill:#F5F5F4;stroke:#D6D6D4;stroke-width:1"/>
<text x="36" y="76" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#8B0000">Материал</text>
<text x="146" y="76" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">~в 2 раза дороже 6061</text>
<rect x="16" y="98" width="488" height="46" rx="8" style="fill:#FFFFFF;stroke:#D6D6D4;stroke-width:1"/>
<text x="36" y="128" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#8B0000">Сортамент</text>
<text x="146" y="128" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Мало профилей — вытачивают из плиты</text>
<rect x="16" y="150" width="488" height="46" rx="8" style="fill:#F5F5F4;stroke:#D6D6D4;stroke-width:1"/>
<text x="36" y="180" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#8B0000">Технология</text>
<text x="146" y="180" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Напряжения — две установки для стенок</text>
<rect x="16" y="202" width="488" height="46" rx="8" style="fill:#FFFFFF;stroke:#D6D6D4;stroke-width:1"/>
<text x="36" y="232" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#8B0000">Отделка</text>
<text x="146" y="232" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Анодирование темнее, цвет не попасть</text>
<rect x="16" y="254" width="488" height="46" rx="8" style="fill:#F5F5F4;stroke:#D6D6D4;stroke-width:1"/>
<text x="36" y="284" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#8B0000">Сертификат</text>
<text x="146" y="284" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">Авиационная плита даёт наценку</text>
</svg>
<figcaption style="text-align:center;font-size:0.9em;color:#666;margin-top:0.6em;">Рис. 4 · Пять факторов стоимости сверх цены материала</figcaption>
</figure>

Начнём с сортамента. Уголки, швеллеры и трубы из 6061 есть везде; 7075 — в основном плита, пруток и труба, профилей намного меньше. Деталь, которая могла быть стандартным профилем 6061, превращается в брус 7075 — снимаемый объём, время цикла и отходы растут.

Затем технология. Остаточные напряжения вынуждают работать в две установки; лист в T6 почти не гнётся, поэтому его формируют мягким и закаливают после — лишние операции и риск по размерам.

И наоборот: там, где прочность действительно ограничивает, а объём оправдывает, поковка 7075 выгоднее, чем вытачивание из целой плиты. Соотношение «купил — получил» совсем другое. Экономить там, где можно, и тратить там, где окупается, — это и есть практический выбор материала.

## Все шесть ловушек одной фразой

Сначала спросите: деталь ограничена прочностью или жёсткостью? Потом: нужна ли сварка, декоративная отделка, какая среда? Ответьте на это — и материал выберется сам.

В сомнениях берите 6061. Это не консерватизм: большинство людей переоценивают нужную прочность и недооценивают сварку, коррозию и внешний вид как реальные ограничения.

Пришлите чертёж и условия эксплуатации. Инженеры проверят реальные нагрузки и укажут, где можно сэкономить.

[Бесплатный DFM-разбор и расчёт цены](/ru/contact/get-a-quote/) · [Выбор материалов для робота на одной странице](/ru/knowledge/tech-blog/robot-material-selection-quick-guide/) · [6061 против 7075: основы](/ru/knowledge/tech-blog/6061-vs-7075-aluminum-choose/)

---

**Источники данных и оговорки**

Значения предела прочности, текучести, твёрдости, модуля и плотности — внешние типовые данные из «Aluminum Standards and Data» Алюминиевой ассоциации и базы ASM, сверенные через таблицу Engineers Edge. Значения в ksi и пересчёт в МПа совпадают между источниками.

- 【Внешний】Основные элементы серий 1xxx–7xxx, возможность термообработки и типичное применение — из трёх источников: таблица марок и состояний Ассоциации производителей алюминиевых профилей (AEC), классификация алюминиевых сплавов в сварочном справочнике ESAB и справочник серий Southwest Aluminum. Все три согласны.
- 【Внешний】Интервалы плавления, свариваемость, коррозионное растрескивание, поведение при анодировании, сортамент и качественная оценка стоимости — из указанных выше источников.
- 【Внешний】Диапазон содержания меди — типовые данные по составу.
- 【Внутренний журнал】В этом периоде новых записей нет, внутренняя статистика не приводится.
- 【Вывод】Никакие предполагаемые значения не выдаются за выводы. Кратность цены — качественная оценка, зависит от сортамента и рынка, не является основой для расчёта цены.
- Внутренняя структура заказов — устные наблюдения, не статистика. В статье нет внутренних измеренных данных; если они появятся, они будут помечены отдельно.
