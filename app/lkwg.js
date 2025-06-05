import fs from 'fs';
import loader from "../../../lib/plugins/loader.js";
import plugin from "../../../lib/plugins/plugin.js";
import { getWebpageInfo } from './mode/更新公告爬虫.js';
import {getURl} from './mode/禁赛爬虫.js'
import {pyl} from './mode/拼音转换.js'

export class newcomer extends plugin {
  constructor () {
    super({
      name: '洛克王国',
      dsc: '添加洛克王国的基本功能',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      priority: 500,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^\\$(.*)',
          /** 执行方法 */
          fnc: 'gg',
        }
    ]
    })
  }

  async gg(e) {
    //更新公告模块，收到#更新公告，调用更新公告爬虫爬取更新公告，发送
    if (e.msg == '$更新公告') {
          getWebpageInfo()
        .then(result => {
          this.reply(result, false) // 输出结果字符串
          // 可以在这里进行后续操作，使用 result 字符串
        })
        .catch(error => {
          console.error('获取网页信息出错：', error);
        });
      }
      //系别禁赛
    if (e.msg == '$系别禁赛') {
      
        let xb='';
        let tnt='';
          const [beforeString, afterString] = await getURl();
          for (let i = 0; i < afterString.length; i++) {
            const element = afterString[i];
            if (i < 1) {
              xb =xb+element; // 将第一次循环的元素累加到 xb
            } else {
              tnt += element; // 后面的元素累加到 tnt
            }
          }
          xb =xb+'\n'
          for (let i = 0; i < beforeString.length; i++) {
            const element = beforeString[i];
            if (i < 1) {
              xb += element; // 将第一次次循环的元素累加到 xb
            } else {
              tnt += element; // 后面的元素累加到 tnt
            }
          }
          this.reply(xb, false) // 输出结果字符串
    }
    if (e.msg == '$天梯禁赛') {
        let xb='';
        let tnt='';
          const [beforeString, afterString] = await getURl();
          for (let i = 0; i < afterString.length; i++) {
            const element = afterString[i];
            if (i < 1) {
              xb += element; // 将第一次循环的元素累加到 xb
            } else {
              tnt += element; // 后面的元素累加到 tnt
            }
          }
          for (let i = 0; i < beforeString.length; i++) {
            const element = beforeString[i];
            if (i < 1) {
              xb += element; // 将第一次次循环的元素累加到 xb
            } else {
              tnt += element; // 后面的元素累加到 tnt
            }
          }
          this.reply(tnt, false) // 输出结果字符串
      
    }
    const  otherurl="https://roco-1318546299.cos.ap-beijing.myqcloud.com/Roco_img-main/img/other/";
    const  jxkurl="https://roco-1318546299.cos.ap-beijing.myqcloud.com/Roco_img-main/img/jxk/";
    const  sskzurl="https://roco-1318546299.cos.ap-beijing.myqcloud.com/Roco_img-main/img/sskz/";
    const  zlkurl="https://roco-1318546299.cos.ap-beijing.myqcloud.com/Roco_img-main/img/zlk/";
    if (e.msg == '$天气展示'|| e.msg === '$环境展示'|| e.msg === '$性格表'|| e.msg === '$亲密度配方'|| e.msg === '$属性克制'|| e.msg === '$山海经攻略') {
      let originalString =e.msg;
      let stringWithoutDollar = originalString.substring(1);
      let res = otherurl+stringWithoutDollar+".png"
      e.reply(segment.image(res))
    }
    const regex = /^\$.*(?:资料卡|zlk)$/; 
    if(regex.test(e.msg)){
      let originalString =e.msg;
      //去掉开头的$
      if (originalString.startsWith('$')) {
        originalString = originalString.substring(1);
      }
      // 去掉结尾的 '资料卡和zlk'
      originalString = originalString.replace(/(资料卡|zlk)$/, '');
      let stringWithoutDollar = originalString+'资料卡'
      let res = zlkurl+stringWithoutDollar+".png"
      e.reply(segment.image(res))
    }
    const regex3 = /^\$.*(解析卡|jxk)$/; 
    if (regex3.test(e.msg)){
      let originalString =e.msg;
      //去掉开头的$
      if (originalString.startsWith('$')) {
        originalString = originalString.substring(1);
      }
      // 去掉结尾的 '解析卡和jxk'
      originalString = originalString.replace(/(解析卡|jxk)$/, '');

      let stringWithoutDollar = originalString
      let res = jxkurl+stringWithoutDollar+".png"
      e.reply(segment.image(res))
    }
    const regex4=/^\$.*(系克制)$/;
    if (regex4.test(e.msg)){
      let originalString =e.msg;
      let stringWithoutDollar = originalString.substring(1);
      let res = sskzurl+stringWithoutDollar+".png"
      e.reply(segment.image(res))
    }



  }



    
}

