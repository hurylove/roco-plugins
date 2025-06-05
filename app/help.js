//suhe写的插件
import fetch from "node-fetch";
import {runPythonScript} from './mode/r18down.js'
export class newcomer extends plugin {
  constructor () {
    super({
      name: 'roco帮助',
      dsc: '洛克王国插件帮助',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      priority: 5000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^\\#roco帮助(.*)',
          /** 执行方法 */
          fnc: 'roco',
        }
    ]
    })
  }

  async roco(e) {
    const helpurl="https://roco-1318546299.cos.ap-beijing.myqcloud.com/Roco_img-main%2Fimg%2Fhelp%2Fhelp.jpg";
    if (e.msg == '#roco帮助') {
        e.reply(segment.image(helpurl), false)
        return false
    }
  }


}