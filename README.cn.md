[English](README.md) | 中文

使用 JavaScript 生成弹窗，提醒用户升级或更换浏览器，提供 Chrome、Edge、Supermium、Firefox 的官网链接。  

实测支持 Internet Explorer 8 和 11 。  

### 安装

```
git clone https://github.com/bddjr/please-upgrade-or-change-your-browser
cd please-upgrade-or-change-your-browser
npm i
npm run build
```

然后将 `dist` 文件夹里的 `please-upgrade-or-change-your-browser` 文件夹复制到 `index.html` 文件所在文件夹下，然后在 `<head>` 标签里添加以下内容即可。  

请按需修改 `src` 属性。  
不得修改或删除 `id` 属性。  

```html
<script id="please_upgrade_or_change_your_browser" src="./please-upgrade-or-change-your-browser/index.js"></script>
```
