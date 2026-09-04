#!/usr/bin/env python3
# Baidu 主动推送（Active Push）一键脚本
# 用法：python baidu_push.py <TOKEN>
# 读取 baidu-push-urls.txt（每行一个 URL），POST 到百度搜索资源平台接口。
# 纯标准库实现（urllib），无需 pip install。

import sys
import urllib.request
import urllib.error

SITE = "https://www.eternalcnc.com"
URLS_FILE = "baidu-push-urls.txt"
API = "http://data.zz.baidu.com/urls?site=" + SITE + "&token="


def main():
    if len(sys.argv) < 2:
        print("用法: python baidu_push.py <TOKEN>")
        sys.exit(1)
    token = sys.argv[1]

    with open(URLS_FILE, encoding="utf-8") as f:
        urls = [u.strip() for u in f if u.strip()]
    if not urls:
        print("没有可推送的 URL，退出。")
        sys.exit(1)

    data = ("\n".join(urls)).encode("utf-8")
    req = urllib.request.Request(
        API + token,
        data=data,
        headers={"Content-Type": "text/plain"},
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            body = r.read().decode("utf-8", "ignore")
        print("HTTP", r.status)
        print("返回:", body)
        # 成功示例: {"remain":4999997,"success":137,"not_same_site":0,"not_valid":0}
    except urllib.error.HTTPError as e:
        print("HTTPError", e.code, e.read().decode("utf-8", "ignore"))
    except Exception as e:
        print("Error:", e)


if __name__ == "__main__":
    main()
