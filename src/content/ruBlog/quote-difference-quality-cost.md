---
title: "Одна и та же деталь — почему цены в двух предложениях так расходятся?"
description: "Заказ на 8 000 деталей. Поящичная проверка выявила 140 деталей, не прошедших калибр. Дешёвая цена не убирает контроль — она переносит его."
category: "Machining Tips"
pubDate: 2026-10-19
system: "general"
tags: ["обработка на ЧПУ", "расчёт цены", "калибр проход/непроход", "контроль качества", "стоимость качества", "сплошной контроль", "выбор поставщика", "стабильность партии"]
author: "Eternal CNC Engineering Team"
readingTime: "9 мин чтения"
---

## 1. Несколько сотен расчётов за две недели — и одна закономерность

За последние две недели наша инженерная группа посчитала много заказов — несколько сотен деталей, больших и малых.

Когда расчётов становится много, проступает закономерность: **клиенты, с которыми мы уже работали, обычно закрывают заказ быстро. А многие новые клиенты склоняются к тому предложению, где цифра ниже.**

Это совершенно понятно. Новый клиент вас не видел и с вами не работал. Перед ним несколько предложений, и единственное, что можно сравнить напрямую, — это число. Выбрать меньшее — рациональный шаг. Окажись мы на другой стороне стола, смотрели бы так же.

Но человек, который провёл годы в цеху, хочет поговорить о вопросе, спрятанном за этим числом:

**Почему на одну и ту же деталь два предложения расходятся настолько? Из чего состоит эта разница?**

Сегодня без теории. Просто случай, который произошёл в эти самые дни. Ответ — в нём.

## 2. Что случилось на этой неделе

Некоторое время назад мы взяли заказ: 8 000 деталей. В тот момент мы перестраивали загрузку, поэтому часть ушла на обработку партнёру из нашей расширенной семейной сети.

Сразу скажем честно: **партнёр действительно хорош.** Круглый год работает на иностранных заказчиков, программирует сильно, станки у него хорошие, люди грамотные. Сваливать на него случившееся было бы необъективно — на самом деле **любой цех, который держится на доверии, а не на контроле**, мог получить тот же результат.

Когда товар пришёл, мы, как обычно, вскрыли ящики и начали проверку. 500 деталей в двух ящиках: **один проверен деталь за деталью, замечаний нет; во втором 140 деталей не прошли проходной калибр.**

Проходной калибр — это «проходная» сторона калибра «проход/непроход»: жёсткая мера, изготовленная точно по границе допуска. Годная деталь обязана пройти проходную сторону и не пройти непроходную. Если деталь не проходит даже проходную, её размер уже вышел из поля допуска. Это самая простая проверка в цеху — и та, которая врёт меньше всего.

Если разделить 500 деталей поровну, доля брака во втором ящике превысила пятьдесят процентов.

Но нас насторожила не доля. Нас насторожило **то, как распределился брак**: он не размазался ровно по двум ящикам, а собрался в одном — сплошным блоком.

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 462" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="500 деталей в двух ящиках: все 250 в ящике A прошли калибр; в ящике B 140 деталей не прошли, и брак идёт сплошным блоком" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="135" y="34" font-family="'Segoe UI', system-ui, sans-serif" font-size="14" font-weight="700" style="fill:#111827;">Ящик A · 250 шт.</text>
<text x="545" y="34" text-anchor="end" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" style="fill:#6B7280;">Калибр на каждой детали · 0 брака</text>
<rect x="135.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<text x="135" y="240" font-family="'Segoe UI', system-ui, sans-serif" font-size="14" font-weight="700" style="fill:#111827;">Ящик B · 250 шт.</text>
<text x="545" y="240" text-anchor="end" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="700" style="fill:#8B0000;">140 шт. не прошли калибр · 56 %</text>
<rect x="135.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135" y="432" width="12" height="12" rx="2.5" style="fill:#E5E7EB;"/>
<text x="155" y="442" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280;">Прошли калибр</text>
<rect x="265" y="432" width="12" height="12" rx="2.5" style="fill:#8B0000;"/>
<text x="285" y="442" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280;">Не прошли калибр</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Рис. 1 · 500 деталей в двух ящиках — один чистый, во втором 140 деталей не прошли калибр, и они идут сплошным блоком</figcaption>
</figure>

Один ящик полностью годный, второй — больше половины брака. Такая картина с высокой вероятностью означает, что плохой ящик вышел в основном с одного станка: инструмент, изношенный до предела, ослабшее приспособление, одна смена с ушедшими параметрами. Любого из этого достаточно, чтобы станок какое-то время подряд выдавал негодные детали.

Эта деталь важнее, чем «партия оказалась бракованной», потому что говорит о двух вещах:

1. **Риск по качеству никогда не распределяется равномерно.** Он идёт блоками — по станкам, по сменам, по партиям инструмента.
2. **Без сплошной проверки можно даже не узнать, что проблема есть** — смешайте годный ящик с негодным и проверьте их вместе выборочно, и поймаете ли вы брак, решит случай: из какого ящика попалась деталь. Остановить его — уже вне вопроса.

А теперь развернём. Допустим, тот ящик не проверили деталь за деталью, а взяли выборочно — или не проверили вовсе — и отгрузили клиенту.

Клиент принимает товар на склад, подаёт на линию, собирает. К моменту, когда проблема всплывёт, несколько сотен деталей вне допуска могут уже уехать дальше вперемешку с годными. Дальше — остановка линии, разбраковка и доработка, возвраты и замены, сорванный срок поставки.

Какие из этих потерь покроет сэкономленная стоимость обработки? **Дешёвая деталь, купленная на входе, превращается в самую дорогую строку в расходах клиента.**

## 3. Арифметика здесь несложная

Разложим счёт по этому случаю:

| | Поймали сплошным контролем (наш выбор) | Отгрузили без проверки |
|---|---|---|
| Стоимость обработки | Выше (контроль включён) | Заметно ниже |
| Брак, дошедший до клиента | 0 деталей | Неизвестное количество |
| Риск для линии клиента | Нет | Остановка + доработка + возвраты |
| Доверие | Строится | Расходуется |

В предложении видно только одну строку — «стоимость обработки». То, чего не видно — контроль первого образца, межоперационные проверки, сплошной контроль перед отгрузкой, вложения в меритель, доработка брака, — всё это реальные, оплаченные деньги.

**Низкая цена эти затраты не убирает. Она их переносит** — на производственную линию клиента, на его время и внимание, на его репутацию.

Разница между предложениями — это, по сути, разница в том, **кто берёт на себя риск по качеству.**

## 4. Из чего складывается эта разница

Конкретно: добросовестное предложение содержит как минимум следующее.

1. **Контроль первого образца** — первая деталь подтверждена по всем размерам до запуска серии, чтобы систематическое отклонение ловилось в источнике.
2. **Межоперационные проверки** — замеры с заданной частотой, которые показывают кривую износа инструмента, а не одну проверку «на удачу».
3. **Сплошной контроль перед отгрузкой** — как в этом случае: каждая деталь, ящик за ящиком, проходной калибр и критические размеры, ничего не пропущено.
4. **Меритель и оборудование** — калибры «проход/непроход», микрометры, покупка и периодическая поверка всего мерителя. У этой строки нет конца, и мы сами её продолжаем: **в нашем цеху нет постоянно работающей КИМ.** Детали, по которым нужны данные координатных измерений, по запросу отправляются в общий метрологический центр нашей группы и встают там в график. Признавать, чего у тебя пока нет, не стыдно; делать вид, что есть всё, — стыдно.
5. **Стоимость работы с браком** — отбракованные детали всё равно либо дорабатываются, либо идут в лом. И то и другое стоит денег.

Ничего из этого в предложении не видно. Но в руках клиента товар ощущается по-разному.

По сути клиент покупает не цену. Он покупает **определённость** — можно ли эту партию сразу поставить на линию. Именно эта определённость и есть то, что на самом деле продаётся за разницей в цене.

И ещё одно, прежде чем идти дальше. В сентябре мы написали материал [«Почему срок поставки стоит денег»](/ru/knowledge/tech-blog/lead-time-and-price/): там речь о другой невидимой строке в том же предложении — «придётся ли мне бегать за графиком». Здесь — о второй: «придётся ли мне тревожиться за качество». Вещи разные, счёт один: **самый дешёвый поставщик — не тот, у кого ниже цена, а тот, у кого ниже полная стоимость.** Если вас интересует сторона приёмки — какие размеры мерить при получении, — читайте [«Приёмка и контроль»](/ru/knowledge/tech-blog/inspection-and-acceptance/).

## 5. Наше правило: лучше заплатить самому, чем передать проблему клиенту

По этому заказу на 8 000 деталей мы в итоге выбрали: **сплошной контроль, ящик за ящиком, ни одной детали, не прошедшей проходной калибр, дальше не идёт.**

Отбракованные детали доработали там, где доработка была возможна, остальное списали. Убыток взяли на себя. Потратили лишний труд и лишнее время — это тоже взяли на себя.

Честно говоря, в этом нет ничего благородного. Это то, как бизнес и должен работать. Клиент, размещая заказ, ставит на вас часть своего положения и своей репутации. Единственный способ оказаться достойным этого доверия — **не дать проблеме уйти туда, где вы до неё не достанете.**

Внутри компании у нас есть очень простая фраза: **брак нужно убивать до отгрузки.** До отгрузки брак — наша себестоимость. После отгрузки — катастрофа клиента и трещина в отношениях.

## 6. Почему клиенты возвращаются

Вернёмся к закономерности из начала.

Постоянные клиенты закрывают заказ быстро не потому, что мы дешёвые, — часто наши цены вовсе не низкие. Потому что они умеют считать: здесь они покупают не только детали, а уверенность, что не придётся заниматься послепродажными вопросами. Партия приходит и сразу идёт на линию: не нужно перебирать, не нужно нервничать, не нужно днями переписываться с поставщиком. Для них сэкономленное время и внимание стоят куда больше, чем разница в цене.

Поэтому мы верим в одну вещь: **доверие не экономится — оно накапливается, по одному «ничего не случилось» за раз.** Доверять друг другу, усиливать друг друга — только так сотрудничество и живёт долго.

И меньше всего нам хотелось бы видеть клиента, который получил товар и теперь бегает по кругу, разбираясь с послепродажными проблемами. Правда не хотелось бы.

Если вы сейчас выбираете между несколькими предложениями, надеемся, эта статья даст вам ещё один угол зрения. Приходите с чертежом — **мы не обещаем самую низкую цену. Мы обещаем, что каждая деталь, которая до вас дошла, прошла тот контроль, который должен была пройти.**

## Одна строка для вас

**Каждый рубль, сэкономленный в предложении, кто-то должен взять на себя как риск. Вопрос только в том, кто это будет — вы или тот, кто продал вам детали.**

## О компании Eternal CNC

Мы делаем прецизионные корпусные детали двадцать три года. Среди тридцати станков с ЧПУ у нас есть настоящий пятиосевой, и мы часто берём корпуса модулей шарниров роботов, водила редукторов, основания концевых эффекторов — те детали, где «чуть в сторону — и отказ».

Мы не станем утверждать, что у нас всё на отлично: в собственном цеху нет постоянно работающей КИМ, детали с потребностью в координатных измерениях по запросу идут в общий метрологический центр нашей группы. Об этом мы говорим прямо.

Если возврат по вашей детали недопустим, пришлите чертёж — сначала пройдёмся вместе по тому, что нужно проверять.

[Бесплатный DFM-разбор и расценка](/ru/contact/get-a-quote/)
