import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🚀 开始修复项目配置...");

// 1. 修复 tailwind.config.js
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
fs.writeFileSync(path.join(__dirname, 'tailwind.config.js'), tailwindConfig);
console.log("✅ tailwind.config.js 已重置");

// 2. 修复 postcss.config.js
const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
fs.writeFileSync(path.join(__dirname, 'postcss.config.js'), postcssConfig);
console.log("✅ postcss.config.js 已重置");

// 3. 修复 src/index.css
const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;
// 确保 src 目录存在
if (!fs.existsSync(path.join(__dirname, 'src'))) {
    fs.mkdirSync(path.join(__dirname, 'src'));
}
fs.writeFileSync(path.join(__dirname, 'src', 'index.css'), indexCss);
console.log("✅ src/index.css 已重置");

// 4. 修复 src/main.jsx (确保引入了 css)
const mainJsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;
fs.writeFileSync(path.join(__dirname, 'src', 'main.jsx'), mainJsx);
console.log("✅ src/main.jsx 已重置 (确保引入了样式)");

console.log("\n🎉 修复文件已生成！请立即执行以下命令推送到 GitHub：");
console.log("1. git add .");
console.log('2. git commit -m "Fix: regenerate config files"');
console.log("3. git push");