import cheerio from 'cheerio';
import axios from 'axios';
import iconv from 'iconv-lite';

async function getWebpageInfo() {
  try {
    const webpageUrl = 'https://roco.qq.com/webplat/info/news_version3/397/11016/11018/m8583/list_1.shtml';

    // 使用 axios 发送 HTTP 请求获取网页的 HTML 代码
    const response = await axios.get(webpageUrl, { responseType: 'arraybuffer' });

    const htmlBuffer = response.data; // 获取网页的二进制数据

    // 指定网页的字符编码，例如 GBK、ISO-8859-1 等，根据实际情况进行设置
    const charset = 'gb2312'; // 假设网页使用了 GBK 编码

    // 将网页内容从指定编码转换为 UTF-8
    const htmlCode = iconv.decode(htmlBuffer, charset);

    const $ = cheerio.load(htmlCode);

    // 定义要获取信息的节点选择器
    const textSelector = 'font'; // 将此处替换为你要获取文本信息的具体节点选择器

    // 定义一个数组用于保存结果
    const results = [];

    // 定义计数器
    let count = 0;

    // 遍历所有的 <font> 标签
    $(textSelector).each((index, element) => {
      if (count < 2) {
        // 获取文本内容
        const nodeText = $(element).text();

        // 获取父级元素，并获取其 href 属性值
        const parentElement = $(element).parent();
        const hrefAttributeValue = parentElement.attr('href');

        // 将结果保存到数组中
        results.push(`${nodeText}:`);
        results.push(`https://roco.qq.com${hrefAttributeValue}`);

        count++;
      } else {
        // 已经获取了前两个节点，退出循环
        return false;
      }
    });

    // 将结果数组连接成一个字符串
    const resultString = results.join('\n');

    return resultString;
  } catch (error) {
    console.error('获取网页内容出错：', error);
    return ''; // 出错时返回空字符串
  }
}

export { getWebpageInfo };