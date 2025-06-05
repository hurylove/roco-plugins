# -*- coding: gbk -*-
import json

import requests

url = "https://xiaobapi.top/api/xb/api/pixiv_r18.php?token=1582276357&password=123456789"
response = requests.get(url)

if response.status_code == 200:
    data = json.loads(response.text)
    img_url=data['data'][0]['urls']['original']
    response = requests.get(img_url)
    # �����Ӧ״̬���Ƿ�Ϊ�ɹ�
    if response.status_code == 200:
        # ��ȡ�ļ���
        file_name = "����.png"

        # ����ͼƬ���ļ�
        with open(file_name, 'wb') as file:
            file.write(response.content)
            print('ͼƬ����ɹ���')
    else:
        print('�޷���ȡͼƬ��')
else:
    print("����ʧ�ܣ�״̬�룺", response.status_code)
