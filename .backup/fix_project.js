import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🚀 开始全量重置项目 (强制降级到 Tailwind v3)...");

// 1. 重写 package.json (关键：锁定 tailwindcss 版本为 3.x)
const packageJson = {
  "name": "my-portfolio",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.292.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.53.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.4.1", 
    "vite": "^5.0.0"
  }
};
// 注意：tailwindcss 版本锁定为 ^3.4.1，这能完美解决你的报错
fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(packageJson, null, 2));
console.log("✅ package.json 已重置 (Tailwind 锁定为 v3)");

// 2. 删除所有可能冲突的配置文件
['vite.config.js', 'tailwind.config.js', 'tailwind.config.cjs', 'postcss.config.js', 'postcss.config.cjs'].forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) fs.unlinkSync(path.join(__dirname, file));
});

// 3. 重写 vite.config.js (标准配置)
const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`;
fs.writeFileSync(path.join(__dirname, 'vite.config.js'), viteConfig);
console.log("✅ vite.config.js 已重置");

// 4. 重写 postcss.config.js (标准 v3 配置)
const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;
fs.writeFileSync(path.join(__dirname, 'postcss.config.js'), postcssConfig);
console.log("✅ postcss.config.js 已重置");

// 5. 重写 tailwind.config.js (标准 v3 配置)
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
}
`;
fs.writeFileSync(path.join(__dirname, 'tailwind.config.js'), tailwindConfig);
console.log("✅ tailwind.config.js 已重置");

// 6. 修复 src/index.css
const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;
if (!fs.existsSync(path.join(__dirname, 'src'))) fs.mkdirSync(path.join(__dirname, 'src'));
fs.writeFileSync(path.join(__dirname, 'src', 'index.css'), indexCss);
console.log("✅ src/index.css 已重置");

console.log("\n🎉 文件重置完成！下一步非常重要，请依次执行：");
console.log("1. npm install (这一步会真的去下载 v3 版本，替换掉你的 v4 版本)");
console.log("2. git add .");
console.log('3. git commit -m "Fix: downgrade to tailwind v3"');
console.log("4. git push");