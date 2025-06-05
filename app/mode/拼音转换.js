import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

async function pyl(apath, extractedText) {
  return new Promise((resolve, reject) => {
    const files = fs.readdirSync(apath);
    const filenames = files.map((file) => path.parse(file).name.trim());  
    const command = 'C:\\Users\\Administrator\\AppData\\Local\\Programs\\Python\\Python311\\python.exe C:\\Users\\Administrator\\Desktop\\test\\Miao-Yunzai\\plugins\\luoke\\app\\mode\\my_python_script.py';
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('执行命令时出错：', error);
        reject(error);
        return;
      }
      const arr = stdout.slice(1, -1).split(", ").map(item => item.replace(/'/g, ''));
      const index = arr.indexOf(extractedText);
      let name = '';
      name = filenames[index];
      resolve(name);
    });
  });
}

export { pyl };






