//suhe写的插件
import fetch from "node-fetch";
import {runPythonScript} from './mode/r18down.js'
export class newcomer extends plugin {
  constructor () {
    super({
      name: '看腿',
      dsc: '洛克王国插件附属',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      priority: 5000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^\\#看看(.*)',
          /** 执行方法 */
          fnc: 'r18',
        },
        {
          /** 命令正则匹配 */
          reg: '^\\#kfcv50(.*)',
          /** 执行方法 */
          fnc: 'kfc',
        }
    ]
    })
  }

  async r18(e) {
    let url
    const zm='?token=1582276357&password=123456789'
    const urlPool = [1,2,3,4,5];
    const randomIndex = Math.floor(Math.random() * urlPool.length);

    if (e.msg == '#看看腿') {
        url = "https://xiaobapi.top/api/xb/api/meitui.php"+zm;
        let res = await fetch(url)
        res = await res.text()
        e.reply(segment.image(res))
        return false
    }
    if (e.msg == '#看看妹子') {
	      // url = "https://xiaobapi.top/api/xb/api/meizi.php"+zm;
        url = "https://free.wqwlkj.cn/wqwlapi/ks_xjj.php?type=json"
        let res = await fetch(url)
        res = await res.json()
        e.reply(segment.image(res.img))
        return false
    }
    if (e.msg == '#看看买家秀'){
      // url = "https://xiaobapi.top/api/xb/api/mjx.php"+zm;
      url = "https://api.uomg.com/api/rand.img3?format=json";
      let res = await fetch(url)
      res = await res.json()
      e.reply(segment.image(res.imgurl))
        return false
    }
    if (e.msg == '#看看少女'){
      url = "https://api.r10086.com/樱道随机图片api接口.php?图片系列=少女写真"+urlPool[randomIndex]+"&参数=json";
      let res = await fetch(url)
      res = await res.json()
      e.reply(segment.image("https:"+res.img))
        return false
    }
    if (e.msg == '#看看cg'||e.msg == '看看CG'){
      url = "https://api.r10086.com/樱道随机图片api接口.php?图片系列=CG系列"+urlPool[randomIndex]+"&参数=json";
      let res = await fetch(url)
      res = await res.json()
      e.reply(segment.image("https:"+res.img))
        return false
    }
    if (e.msg == '#看看原神'){
      url = "https://api.lolimi.cn/API/yuan/?type=json";
      let res = await fetch(url)
      res = await res.json()
      e.reply(segment.image(res.text))
        return false
    }
    if (e.msg == '#看看三次元'){
      url = "https://api.vvhan.com/api/mobil.girl?type=json";
      let res = await fetch(url)
      res = await res.json()
      e.reply(segment.image(res.imgurl))
        return false
    }
  }

  async kfc(e) {
    let url
    if (e.msg == '#kfcv50') {
        url = "https://api.ahfi.cn/api/kfcv50?type=text";
        let res = await fetch(url)
        res = await res.text()
        e.reply(res)
        return false
    }
  }


}