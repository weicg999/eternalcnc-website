# -*- coding: utf-8 -*-
"""chat.js 增加市场部询盘轮值 + 企微 text 消息 @。注意：JS 源码里的 \n 转义在 python 中必须写 \\n。"""
import io

P = r'functions/api/chat.js'

edits = []

# ---------- Edit 1: 常量区加 ROTA ----------
old1 = "const LEAD_ALERT_DAILY_KEY = 'leadalert:';\nconst LEAD_ALERT_INTERNAL_KEYS = ['msg_count', 'lead_alerted'];"
new1 = (
"const LEAD_ALERT_DAILY_KEY = 'leadalert:';\n"
"const LEAD_ALERT_INTERNAL_KEYS = ['msg_count', 'lead_alerted'];\n"
"\n"
"// ===== 市场部询盘轮值（2026-11-19）=====\n"
"// A=韦春光, B=罗婷, C=陈烈廷, D=卢昌伶；出单按顺序轮替 @。\n"
"// mobile 填企业微信绑定手机号，用于群机器人 mentioned_mobile_list 精确 @；留空则仅文字标注。\n"
"const ROTA_MEMBERS = [\n"
"  { code: 'A', name: '\u97e6\u6625\u5149', mobile: '' },\n"
"  { code: 'B', name: '\u7f57\u5a77', mobile: '' },\n"
"  { code: 'C', name: '\u9648\u70c8\u5ef7', mobile: '' },\n"
"  { code: 'D', name: '\u5362\u660c\u4f36', mobile: '' },\n"
"];\n"
"const ROTA_IDX_KEY = 'rota:idx';"
)
edits.append((old1, new1))

# ---------- Edit 2: notifyLeadAlert 整体替换 ----------
old2 = """async function notifyLeadAlert(webhook, profile, userId) {
  const parts = (profile.parts_interested || []).join(', ');
  const concerns = (profile.concerns || []).join(', ');
  const lines = [
    '\U0001F514 **\u56fd\u9645\u5b98\u7f51 \u00b7 \u9ad8\u610f\u5411\u8bbf\u5ba2 \u00b7 \u672a\u7559\u8054\u7cfb\u65b9\u5f0f**',
    '> \u65f6\u95f4\uff1a' + new Date().toISOString(),
    '> \u8bed\u8a00\uff1a' + (profile.language || '-') + '\uff5c\u4f1a\u8bdd\u8f6e\u6b21\uff1a' + (profile.msg_count || '-'),
  ];
  if (profile.company) lines.push('\\n**\u516c\u53f8**\uff1a' + profile.company);
  if (profile.industry) lines.push('**\u884c\u4e1a**\uff1a' + profile.industry);
  if (parts) lines.push('**\u5173\u6ce8\u96f6\u4ef6**\uff1a' + parts);
  if (profile.quote_status) lines.push('**\u62a5\u4ef7\u8fdb\u5ea6**\uff1a' + profile.quote_status);
  if (concerns) lines.push('**\u5173\u6ce8\u70b9**\uff1a' + concerns);
  if (profile.has_sent_drawing) lines.push('**\u5df2\u53d1\u56fe\u7eb8**\uff1a\u662f');
  if (profile.last_message) lines.push('\\n**\u6700\u540e\u4e00\u53e5\u8bdd**\uff1a\\n' + profile.last_message);
  if (profile.notes) lines.push('**\u5907\u6ce8**\uff1a' + profile.notes);
  lines.push('\\n\u8bbf\u5ba2 ID\uff1a' + userId);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    const resp = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msgtype: 'markdown', markdown: { content: lines.join('\\n') } }),
      signal: controller.signal,
    });
    if (!resp.ok) console.warn('lead-alert wecom notify failed:', resp.status);
  } catch (e) {
    console.warn('lead-alert wecom notify error:', e.message);
  } finally {
    clearTimeout(timer);
  }
}"""

new2 = """async function notifyLeadAlert(webhook, profile, userId, assigned) {
  const parts = (profile.parts_interested || []).join(', ');
  const concerns = (profile.concerns || []).join(', ');
  const lines = [
    '\U0001F514\u3010\u56fd\u9645\u5b98\u7f51\u3011\u9ad8\u610f\u5411\u8bbf\u5ba2 \u00b7 \u672a\u7559\u8054\u7cfb\u65b9\u5f0f',
    '\u65f6\u95f4\uff1a' + new Date().toISOString(),
    '\u8bed\u8a00\uff1a' + (profile.language || '-') + '\uff5c\u4f1a\u8bdd\u8f6e\u6b21\uff1a' + (profile.msg_count || '-'),
    (assigned ? '\u672c\u5355\u8ba4\u9886\uff1a@' + assigned.name + '\uff08\u8f6e\u503c ' + assigned.code + '\uff09' : '\u672c\u5355\u8ba4\u9886\uff1a\u7fa4\u5185\u6309\u8f6e\u503c\u987a\u5e8f\u63a5\u624b'),
  ];
  if (profile.company) lines.push('\u516c\u53f8\uff1a' + profile.company);
  if (profile.industry) lines.push('\u884c\u4e1a\uff1a' + profile.industry);
  if (parts) lines.push('\u5173\u6ce8\u96f6\u4ef6\uff1a' + parts);
  if (profile.quote_status) lines.push('\u62a5\u4ef7\u8fdb\u5ea6\uff1a' + profile.quote_status);
  if (concerns) lines.push('\u5173\u6ce8\u70b9\uff1a' + concerns);
  if (profile.has_sent_drawing) lines.push('\u5df2\u53d1\u56fe\u7eb8\uff1a\u662f');
  if (profile.last_message) lines.push('\u2014\u2014 \u6700\u540e\u4e00\u53e5\u8bdd \u2014\u2014\\n' + profile.last_message);
  if (profile.notes) lines.push('\u5907\u6ce8\uff1a' + profile.notes);
  lines.push('\u8bbf\u5ba2 ID\uff1a' + userId);
  lines.push('\u82e5 30 \u5206\u949f\u5185\u672a\u54cd\u5e94\uff0c\u8bf7\u7fa4\u5185\u4e0b\u4e00\u4f4d\u63a5\u624b\uff1a' + ROTA_MEMBERS.map(function (m) { return m.name + '[' + m.code + ']'; }).join(' \u2192 '));

  const mentionedMobile = (assigned && assigned.mobile) ? [assigned.mobile] : [];
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    const payload = { msgtype: 'text', text: { content: lines.join('\\n') } };
    if (mentionedMobile.length) payload.text.mentioned_mobile_list = mentionedMobile;
    const resp = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!resp.ok) console.warn('lead-alert wecom notify failed:', resp.status, await resp.text());
  } catch (e) {
    console.warn('lead-alert wecom notify error:', e.message);
  } finally {
    clearTimeout(timer);
  }
}"""
edits.append((old2, new2))

# ---------- Edit 3: maybeAlertLead 推送处加轮值计算 ----------
old3 = """    profile.lead_alerted = true;
    try { await kv.put(capKey, String(used + 1), { expirationTtl: 48 * 60 * 60 }); } catch (e) { /* \u8ba1\u6570\u5931\u8d25\u4e0d\u963b\u65ad */ }

    if (webhookUrl) {
      await notifyLeadAlert(webhookUrl, profile, userId);
      console.log('[lead-alert] wecom pushed user=' + userId + ' turns=' + turns + ' signals=' + signals.join('/'));
    }
    if (env) {
      await notifyLeadEmail(profile, userId, env);
    } else {
      console.log('[lead-alert] \u672a\u914d\u7f6e\u901a\u77e5\u6e20\u9053(webhook \u4e0e env \u5747\u7f3a)\uff0c\u8df3\u8fc7\u63a8\u9001 user=' + userId);
    }"""
new3 = """    profile.lead_alerted = true;
    try { await kv.put(capKey, String(used + 1), { expirationTtl: 48 * 60 * 60 }); } catch (e) { /* \u8ba1\u6570\u5931\u8d25\u4e0d\u963b\u65ad */ }

    // \u5e02\u573a\u90e8\u8be2\u76d8\u8f6e\u503c\uff1a\u51fa\u5355\u63a8\u8fdb\u6e38\u6807\uff0c\u6309 A\u2192B\u2192C\u2192D \u8f6e\u66ff @ \u5f53\u73ed\u4eba
    let assigned = null;
    if (kv && ROTA_MEMBERS && ROTA_MEMBERS.length) {
      try {
        const rawIdx = await kv.get(ROTA_IDX_KEY);
        let idx = parseInt(rawIdx, 10);
        if (!Number.isFinite(idx) || idx < 0) idx = 0;
        assigned = ROTA_MEMBERS[idx % ROTA_MEMBERS.length];
        await kv.put(ROTA_IDX_KEY, String((idx + 1) % ROTA_MEMBERS.length));
      } catch (e) {
        console.warn('[lead-alert] rota pick failed, fallback to A:', e.message);
        assigned = ROTA_MEMBERS[0];
      }
    }

    if (webhookUrl) {
      await notifyLeadAlert(webhookUrl, profile, userId, assigned);
      console.log('[lead-alert] wecom pushed user=' + userId + ' turns=' + turns + ' signals=' + signals.join('/') + ' duty=' + (assigned ? assigned.name : 'none'));
    }
    if (env) {
      await notifyLeadEmail(profile, userId, env, assigned);
    } else {
      console.log('[lead-alert] \u672a\u914d\u7f6e\u901a\u77e5\u6e20\u9053(webhook \u4e0e env \u5747\u7f3a)\uff0c\u8df3\u8fc7\u63a8\u9001 user=' + userId);
    }"""
edits.append((old3, new3))

# ---------- Edit 4: notifyLeadEmail 签名加 assigned + 认领行 ----------
old4 = "async function notifyLeadEmail(profile, userId, env) {"
new4 = "async function notifyLeadEmail(profile, userId, env, assigned) {"
edits.append((old4, new4))

old5 = """  const lines = [
    '[High-intent lead] \u3010\u56fd\u9645\u5b98\u7f51\u3011\u9ad8\u610f\u5411\u8bbf\u5ba2 \u00b7 \u672a\u7559\u8054\u7cfb\u65b9\u5f0f',"""
new5 = """  const lines = [
    '[High-intent lead] \u3010\u56fd\u9645\u5b98\u7f51\u3011\u9ad8\u610f\u5411\u8bbf\u5ba2 \u00b7 \u672a\u7559\u8054\u7cfb\u65b9\u5f0f',
    '\u8ba4\u9886\uff1a' + (assigned ? assigned.name + ' \uff08\u8f6e\u503c ' + assigned.code + '\uff09' : '\u7fa4\u5185\u6309\u8f6e\u503c\u987a\u5e8f\u63a5\u624b'),"""
edits.append((old5, new5))

s = io.open(P, encoding='utf-8', newline='').read()
for i, (old, new) in enumerate(edits, 1):
    c = s.count(old)
    if c != 1:
        raise SystemExit('MATCH_COUNT=%d at edit %d' % (c, i))
    s = s.replace(old, new)
    print('applied edit %d' % i)
with io.open(P, 'w', encoding='utf-8', newline='') as f:
    f.write(s)
print('ALL EDITS OK')