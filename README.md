English | [中文](README.cn.md)

Use JavaScript to generate a pop-up window to remind users to upgrade or change browsers, and provide links to the official websites of Chrome, Edge, Supermium, and Firefox.  

Tested support for Internet Explorer 8 and 11.  

### Setup

```
git clone https://github.com/bddjr/please-upgrade-or-change-your-browser
cd please-upgrade-or-change-your-browser
npm i
npm run build
```

Then copy the `please-upgrade-or-change-your-browser` folder in the `dist` folder to the folder where the `index.html` file is located, and then add the following content in the `<head>` tag.  

Please modify the `src` attribute as needed.  
Do not modify or delete the `id` attribute.  

```html
<script id="please_upgrade_or_change_your_browser" src="./please-upgrade-or-change-your-browser/index.js"></script>
```
