# -*- coding: utf-8 -*-
import os

from pypinyin import lazy_pinyin, Style

def zlkmlgx():
    path = 'C:\\Users\\Administrator\\Desktop\\test\\Miao-Yunzai\\plugins\\luoke\\img\\zlk'
    cwmz ,pinyin= [],[]

    zlk_name = os.listdir(path)
    for i in zlk_name:
        cwmz2 = i.replace('·', '').split('资')
        cwmz.append(cwmz2[0])

    # 多个汉字转换
    for i in cwmz:
        test = ''
        cwmz2 = lazy_pinyin(i, style=Style.FIRST_LETTER)
        for j in cwmz2:
            test=test+j
        pinyin.append(test)

    return pinyin
if __name__ == "__main__":
    print(zlkmlgx())
