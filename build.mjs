import { rimrafSync } from "rimraf";
import htmlminifier from "html-minifier-terser";
import fs from 'fs'
import zlib from 'zlib'

rimrafSync('dist')

let style = ''

let html = fs.readFileSync('src/raw.html').toString()

html = await htmlminifier.minify(html, {
    removeAttributeQuotes: false,
    removeComments: true,
    collapseWhitespace: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    minifyJS: false,
    minifyCSS: true,
})

html = html
    .replace(/icon\/\w+\.png/g, m => ("data:image/png;base64," + fs.readFileSync("src/" + m).toString('base64')))
    .replace(/['\\\n]/g, m => (({
        "'": "\\'",
        "\\": "\\\\",
        "\n": "\\n",
    })[m]))
    .replace(/<style[^>]+>([\s\S]+?)<\/style>/, (m, a) => ((style = a), ''))
    .replace("https://www.google.com/chrome/", "'+(/MSIE/.test(navigator.userAgent)?'https://dl.google.com/update2/installers/ChromeSetup.exe':'https://www.google.c'+(zh?'n':'om')+'/chrome/'+(/(Trident|Edge)/.test(navigator.userAgent)?'fallback/':''))+'")
    .replace("Please upgrade or change your browser", "'+(zh?'请升级或更换浏览器':'Please upgrade or change your browser')+'")
    .trim()

let js = fs.readFileSync('src/template.js').toString()

js = js
    .replace("<<STYLE>>", style)
    .replace("<<HTML>>", html)

fs.mkdirSync('dist')
fs.writeFileSync('dist/please-upgrade-or-change-your-browser.js', js)

let gz = zlib.gzipSync(js, { level: zlib.constants.Z_BEST_COMPRESSION })

fs.writeFileSync('dist/please-upgrade-or-change-your-browser.js.gz', gz)
