# -*- coding: gbk -*-
import json

import requests

url = "https://xiaobapi.top/api/xb/api/pixiv_r18.php?token=1582276357&password=123456789"
response = requests.get(url)

if response.status_code == 200:
    data = json.loads(response.text)
    img_url=data['data'][0]['urls']['original']
    response = requests.get(img_url)
    # 检查响应状态码是否为成功
    if response.status_code == 200:
        # 提取文件名
        file_name = "缓存.png"

        # 保存图片到文件
        with open(file_name, 'wb') as file:
            file.write(response.content)
            print('图片保存成功！')
    else:
        print('无法获取图片。')
else:
    print("请求失败，状态码：", response.status_code)
