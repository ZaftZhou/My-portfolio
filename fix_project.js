import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🚀 开始修复项目配置 (切换为 .cjs 格式，兼容性更好)...");

// 0. 删除可能导致冲突的旧文件
const filesToDelete = ['tailwind.config.js', 'postcss.config.js'];
filesToDelete.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ 已删除旧配置: ${file}`);
    }
});

// 1. 创建 tailwind.config.cjs (注意后缀是 cjs)
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
fs.writeFileSync(path.join(__dirname, 'tailwind.config.cjs'), tailwindConfig);
console.log("✅ tailwind.config.cjs 已创建");

// 2. 创建 postcss.config.cjs (注意后缀是 cjs)
const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
fs.writeFileSync(path.join(__dirname, 'postcss.config.cjs'), postcssConfig);
console.log("✅ postcss.config.cjs 已创建");

// 3. 修复 src/index.css
const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;
if (!fs.existsSync(path.join(__dirname, 'src'))) {
    fs.mkdirSync(path.join(__dirname, 'src'));
}
fs.writeFileSync(path.join(__dirname, 'src', 'index.css'), indexCss);
console.log("✅ src/index.css 已重置");

// 4. 修复 src/main.jsx
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
console.log("✅ src/main.jsx 已重置");

console.log("\n🎉 修复完成！请执行以下命令推送到 GitHub：");
console.log("1. git add .");
console.log('2. git commit -m "Fix: switch to cjs config"');
console.log("3. git push");