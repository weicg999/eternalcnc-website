# -*- coding: utf-8 -*-
"""给聊天告警消息增加「国际官网」标识（企微 markdown 标题 + 邮件首行/主题）。"""
import io

P = r'functions/api/chat.js'
edits = [
    # notifyLeadAlert（企微 markdown）标题
    ("    '\U0001F514 **\u9ad8\u610f\u5411\u8bbf\u5ba2 \u00b7 \u672a\u7559\u8054\u7cfb\u65b9\u5f0f**',",
     "    '\U0001F514 **\u56fd\u9645\u5b98\u7f51 \u00b7 \u9ad8\u610f\u5411\u8bbf\u5ba2 \u00b7 \u672a\u7559\u8054\u7cfb\u65b9\u5f0f**',"),
    # notifyLeadEmail 首行
    ("    '[High-intent lead] \u9ad8\u610f\u5411\u8bbf\u5ba2 \u00b7 \u672a\u7559\u8054\u7cfb\u65b9\u5f0f',",
     "    '[High-intent lead] \u3010\u56fd\u9645\u5b98\u7f51\u3011\u9ad8\u610f\u5411\u8bbf\u5ba2 \u00b7 \u672a\u7559\u8054\u7cfb\u65b9\u5f0f',"),
    # notifyLeadEmail 主题
    ("        subject: '[EternalCNC] \u5b98\u7f51\u9ad8\u610f\u5411\u5ba2\u6237\u7ebf\u7d22\uff08\u81ea\u52a8\u544a\u8b66\uff09',",
     "        subject: '[EternalCNC \u56fd\u9645\u5b98\u7f51] \u5b98\u7f51\u9ad8\u610f\u5411\u5ba2\u6237\u7ebf\u7d22\uff08\u81ea\u52a8\u544a\u8b66\uff09',"),
]

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