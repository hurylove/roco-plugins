import { exec } from 'child_process';

const runPythonScript = () => {
  const command = 'C:\\Users\\Administrator\\AppData\\Local\\Programs\\Python\\Python311\\python.exe "C:\\Users\\Administrator\\Desktop\\test\\Miao-Yunzai\\plugins\\luoke\\app\\mode\\res.py"';
  
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('执行命令时出错：', error);
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
};
export {runPythonScript};
