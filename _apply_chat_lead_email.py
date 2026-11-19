# -*- coding: utf-8 -*-
"""给 chat.js 的 maybeAlertLead 增加 Resend 邮件告警（企微 webhook 兜底通道）。"""
import io

P = r'functions/api/chat.js'

EMAIL_FN = """/**
 * 高意向客户邮件告警（Resend）。作为企微 webhook 的补充/兜底通道：客户在官网
 * 冒出高意向但未留联系方式时，实时发邮件到 NOTIFY_EMAIL，手机邮件 App 即可收到。
 * 任何异常自吞，绝不影响访客回复。
 */
async function notifyLeadEmail(profile, userId, env) {
  const parts = (profile.parts_interested || []).join(', ');
  const concerns = (profile.concerns || []).join(', ');
  const lines = [
    '[High-intent lead] 高意向访客 \u00b7 未留联系方式',
    '\u65f6\u95f4\uff1a' + new Date().toISOString(),
    '\u8bed\u8a00\uff1a' + (profile.language || '-') + ' | \u4f1a\u8bdd\u8f6e\u6b21\uff1a' + (profile.msg_count || '-'),
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

  const fromEmail = env.FROM_EMAIL || 'onboarding@resend.dev';
  const toEmail = env.NOTIFY_EMAIL || 'sales@eternalcnc.com';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    if (!env.RESEND_API_KEY) {
      console.log('[lead-alert] RESEND_API_KEY \u672a\u914d\u7f6e\uff0c\u90ae\u4ef6\u544a\u8b66\u8df3\u8fc7');
      return;
    }
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: '[EternalCNC] \u5b98\u7f51\u9ad8\u610f\u5411\u5ba2\u6237\u7ebf\u7d22\uff08\u81ea\u52a8\u544a\u8b66\uff09',
        text: lines.join('\\n'),
      }),
      signal: controller.signal,
    });
    if (!resp.ok) console.warn('lead-alert email notify failed:', resp.status, await resp.text());
  } catch (e) {
    console.warn('lead-alert email notify error:', e.message);
  } finally {
    clearTimeout(timer);
  }
}
"""

edits = []

# 1) 插入 notifyLeadEmail 并给 maybeAlertLead 签名加 env
oldA = ("/**\n * \u5224\u5b9a\u300c\u9ad8\u610f\u5411\u4f46\u6ca1\u7559\u8054\u7cfb\u65b9\u5f0f\u300d\u5e76\u63a8\u9001\u4e00\u6b21\u3002\n"
        " * \u4efb\u4f55\u5f02\u5e38\u90fd\u81ea\u541e\uff0c\u7edd\u4e0d\u5f71\u54cd\u8bbf\u5ba2\u56de\u590d\uff1b\u540c\u4e00\u8bbf\u5ba2\u53ea\u63a8\u4e00\u6b21\uff08profile.lead_alerted \u843d\u6863\uff09\u3002\n"
        " */\nasync function maybeAlertLead(kv, userId, profile, webhookUrl) {\n")
newA = (EMAIL_FN + "\n\n/**\n * \u5224\u5b9a\u300c\u9ad8\u610f\u5411\u4f46\u6ca1\u7559\u8054\u7cfb\u65b9\u5f0f\u300d\u5e76\u63a8\u9001\u4e00\u6b21\u3002\n"
        " * \u4efb\u4f55\u5f02\u5e38\u90fd\u81ea\u541e\uff0c\u7edd\u4e0d\u5f71\u54cd\u8bbf\u5ba2\u56de\u590d\uff1b\u540c\u4e00\u8bbf\u5ba2\u53ea\u63a8\u4e00\u6b21\uff08profile.lead_alerted \u843d\u6863\uff09\u3002\n"
        " */\nasync function maybeAlertLead(kv, userId, profile, webhookUrl, env) {\n")
edits.append((oldA, newA, 1))

# 2) 推送分支：有 webhook 推企微；有 env 则必发邮件（兜底/主通道）
oldB = ("    if (webhookUrl) {\n"
        "      await notifyLeadAlert(webhookUrl, profile, userId);\n"
        "      console.log('[lead-alert] pushed user=' + userId + ' turns=' + turns + ' signals=' + signals.join('/'));\n"
        "    } else {\n"
        "      console.log('[lead-alert] FEEDBACK_WEBHOOK_URL \u672a\u914d\u7f6e\uff0c\u4ec5\u8bb0\u5f55\u4e0d\u63a8\u9001 user=' + userId + ' signals=' + signals.join('/'));\n"
        "    }\n")
newB = ("    if (webhookUrl) {\n"
        "      await notifyLeadAlert(webhookUrl, profile, userId);\n"
        "      console.log('[lead-alert] wecom pushed user=' + userId + ' turns=' + turns + ' signals=' + signals.join('/'));\n"
        "    }\n"
        "    if (env) {\n"
        "      await notifyLeadEmail(profile, userId, env);\n"
        "    } else {\n"
        "      console.log('[lead-alert] \u672a\u914d\u7f6e\u901a\u77e5\u6e20\u9053(webhook \u4e0e env \u5747\u7f3a)\uff0c\u8df3\u8fc7\u63a8\u9001 user=' + userId);\n"
        "    }\n")
edits.append((oldB, newB, 1))

# 3) asyncExtractAndSave 签名加 env
oldC = "function asyncExtractAndSave(kv, userId, userMessage, botReply, profile, lang, ai, model, webhookUrl) {"
newC = "function asyncExtractAndSave(kv, userId, userMessage, botReply, profile, lang, ai, model, webhookUrl, env) {"
edits.append((oldC, newC, 1))

# 4) 2620 调用 asyncExtractAndSave 传入 env
oldD = ("          kv, userId, message, result.content, customerProfile, userLang, ai, model,\n"
        "          env.FEEDBACK_WEBHOOK_URL || ''\n"
        "        );")
newD = ("          kv, userId, message, result.content, customerProfile, userLang, ai, model,\n"
        "          env.FEEDBACK_WEBHOOK_URL || '', env\n"
        "        );")
edits.append((oldD, newD, 1))

# 5) 1774 maybeAlertLead 调用传入 env
oldE = "      await maybeAlertLead(kv, userId, updatedProfile, webhookUrl);"
newE = "      await maybeAlertLead(kv, userId, updatedProfile, webhookUrl, env);"
edits.append((oldE, newE, 1))

# 6) 2396 & 2640 两处相同调用加 env（replace all）
oldF = ".then(() => maybeAlertLead(kv, userId, customerProfile, env.FEEDBACK_WEBHOOK_URL || ''));"
newF = ".then(() => maybeAlertLead(kv, userId, customerProfile, env.FEEDBACK_WEBHOOK_URL || '', env));"
edits.append((oldF, newF, -1))  # -1 = replace all


def nl(t):
    # 应用 \r\n 行尾（文件为 CRLF）
    return t.replace('\n', '\r\n')


with open(P, 'rb') as f:
    raw = f.read()
crlf = raw.count(b'\r\n')

s = io.open(P, encoding='utf-8', newline='').read()

for old, new, mode in edits:
    oo, nn = old, new
    c = s.count(oo)
    if mode == -1:
        if c == 0:
            raise SystemExit('NO_MATCH(all): ' + old[:60])
        s = s.replace(oo, nn)
        print('replace-all applied x%d: %s' % (c, old.splitlines()[0][:50]))
    else:
        if c != 1:
            raise SystemExit('MATCH_COUNT=%d (expected 1): %s' % (c, old.splitlines()[0][:60]))
        s = s.replace(oo, nn)
        print('applied: %s' % old.splitlines()[0][:60])

with io.open(P, 'w', encoding='utf-8', newline='') as f:
    f.write(s)

print('CRLF was %s' % ('CRLF' if crlf else 'LF'))
print('ALL EDITS OK')