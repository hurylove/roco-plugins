import cheerio from 'cheerio';
import axios from 'axios';
import iconv from 'iconv-lite';
import { getWebpageInfo } from './更新公告爬虫.js';

async function getURl() {
    const resultsArray = [];
    const urlRegex = /https:\/\/\S+/g;
    const result = await getWebpageInfo();
    const urls = result.match(urlRegex);
    for (let i = 0; i < urls.length; i++) {
        const webpageUrl = urls[i]
        // 使用 axios 发送 HTTP 请求获取网页的 HTML 代码
        const response = await axios.get(webpageUrl, { responseType: 'arraybuffer' });
        const htmlBuffer = response.data; // 获取网页的二进制数据

        console.log()

        // 指定网页的字符编码，例如 GBK、ISO-8859-1 等，根据实际情况进行设置
        const charset = 'gb2312'; // 假设网页使用了 GBK 编码

        // 将网页内容从指定编码转换为 UTF-8
        const htmlCode = iconv.decode(htmlBuffer, charset);
        const results = [];
        const textSelector = 'span'; // 将此处替换为你要获取文本信息的具体节点选择器
        const texth3 = 'h3'
        const $ = cheerio.load(htmlCode);

        $(textSelector).each((index, element) => {
              // 获取文本内容
              const nodeText = $(element).text();
              // 将结果保存到数组中
              results.push(`${nodeText}:`);
            } 
        );
        //提取h3标题里的日期，修改为自己的标题
        const h3 = $(texth3).text()
        const dateRegex = /(\d+)月(\d+)日/;
        const dateMatch = h3.match(dateRegex);

        let xibieString = '';
        let tntString = '';
        if (dateMatch) {
        // 提取到了日期信息，组合系别禁赛的日期
        const month = dateMatch[1];
        const day = dateMatch[2];
        xibieString = `${month}月${day}日更新系别禁赛:`;
        tntString =`${month}月${day}日更新天梯禁赛:`;
        }
        //提取禁赛信息
        let startIndex = -1;
        for (const [index, item] of results.entries()) {
        if (item.startsWith('．系别排位赛本周参与系别及禁赛宠物更新')) {
            startIndex = index;
            break;
        }
        }
        // 使用 cheerio 加载 HTML 代码
        const parsedHtml = cheerio.load(htmlCode);

        // 使用选择器来获取纯文本内容，会自动去除所有标签
        const plainText = parsedHtml('body').text();

        const modifiedText = plainText.replace(/。/g, '。\n');

        let relevantContent;

        const index = modifiedText.indexOf('本周五参赛系别');
        if (index === -1) {
            console.log('找不到匹配的字符串');
        } else {
            // 提取 "本周五参赛系别" 之后的内容
            relevantContent = modifiedText.slice(index);
        }

        //console.log(relevantContent)

        const lines = relevantContent.split('\n');
        let startIndex2 = -1;

        // 找到以 "本周五参赛系别：" 开头的行的索引
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('本周五参赛系别：')) {
                startIndex2 = i;
                break;
            }
        }
        let extractedText = ''
        // 如果找到了以 "本周五参赛系别：" 开头的行
        if (startIndex2 !== -1) {
            // 截取以 "本周五参赛系别：" 开头的行及其下五行的内容
            const extractedLines = lines.slice(startIndex2, startIndex2 + 5);
            // 将截取的内容重新组合成字符串
            extractedText = extractedLines.join('\n');
        } else {
            console.log('未找到以 "本周五参赛系别：" 开头的行');
        }

        // 拆分 extractedText 为行数组
        const lsline = extractedText.split('\n');

        // 如果行数组长度小于 5，则不执行任何操作
        if (lsline.length < 5) {
            console.log('行数少于 5 行，无法执行追加操作');
        } else {
            // 将前四行连接到 xibieString
            const xibieLines = lsline.slice(0, 4);
            xibieString += '\n' + xibieLines.join('\n');

            // 将第五行连接到 tntString
            const tntLine = lsline[4].replace(/^.*?2．本周天梯禁赛本周禁赛宠物包括\s*/, '');
            tntString += '\n' + tntLine+'\n';

            // 打印结果
            // console.log('xibieString:', xibieString);
            // console.log('tntString:', tntString);
        }

        //修改逻辑，符合接口需求
            const beforeString = xibieString
            const afterString = tntString
                
        // 将 beforeString 和 afterString 放入结果数组
        resultsArray.push([beforeString, afterString]);

    }
    // 返回结果数组
    return resultsArray;  
}
export { getURl };
