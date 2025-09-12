//@ts-nocheck

import fs from 'fs'
import zlib from 'zlib'
import { minify_sync as terserMinify } from "terser";
import { JSDOM } from 'jsdom'
import CleanCSS from "clean-css";


const styleId = 'please_upgrade_or_change_your_browser__style'
const bodyId = 'please_upgrade_or_change_your_browser__body'


const dom = new JSDOM(fs.readFileSync('src/raw.html').toString('utf-8'))
const { document, NodeFilter } = dom.window


const style = new CleanCSS({
    compatibility: 'ie7',
    level: {
        1: {
            optimizeBackground: false,
        },
    },
}).minify(
    document.getElementById(styleId).innerHTML
).styles.replace(
    /['\\\n]/g,
    m => (({
        "'": "\\'",
        "\\": "\\\\",
        "\n": "\\n",
    })[m])
)


const body = document.getElementById(bodyId)

body.querySelector('#please_upgrade_or_change_your_browser__title').innerHTML = '{{title}}'

for (const a of body.querySelectorAll('#please_upgrade_or_change_your_browser__browsers a[name]')) {
    a.setAttribute('href', `{{${a.getAttribute('name')}Href}}`)
    a.removeAttribute('name')
    const img = a.querySelector('img')
    img.setAttribute('src', '{{dir}}' + img.getAttribute('src'))
}

{
    // 清除空文本
    const tw = document.createTreeWalker(body, NodeFilter.SHOW_TEXT)
    while (tw.nextNode()) {
        // @ts-ignore
        tw.currentNode.textContent = tw.currentNode.textContent.trim()
    }
}

const outputBody = body.innerHTML.replace(
    /['\\\n]/g,
    m => (({
        "'": "\\'",
        "\\": "\\\\",
        "\n": "\\n",
    })[m])
).replace(
    /\{\{(\w+)\}\}/g,
    (m, a) => `'+${a}+'`
)


/** @type {import('terser').MinifyOptions} */
const terserConfig = {
    sourceMap: false,
    compress: {
        defaults: false,
        arrows: false,
        ecma: 3,
        typeofs: false,
    },
    format: {
        comments: true,
        ascii_only: true,
        quote_style: 3,
    },
}

function minifyjs(js) {
    return terserMinify(js, terserConfig).code.replace(/;?\s*$/, '')
}


const indexjs = minifyjs(fs.readFileSync('src/index.js').toString('utf-8'))

const bodyjs = minifyjs(fs.readFileSync('src/body.js').toString('utf-8').replace(
    /<<(\w+)>>/g,
    (m, a) => ({ styleId, style, bodyId, outputBody }[a])
))


fs.mkdirSync('dist/please-upgrade-or-change-your-browser', { recursive: true })
fs.writeFileSync('dist/please-upgrade-or-change-your-browser/index.js', indexjs)
fs.writeFileSync('dist/please-upgrade-or-change-your-browser/body.js', bodyjs)
fs.cpSync('src/icon', 'dist/please-upgrade-or-change-your-browser/icon', { recursive: true })


let gz = zlib.gzipSync(indexjs, { level: zlib.constants.Z_BEST_COMPRESSION })
fs.writeFileSync('dist/please-upgrade-or-change-your-browser/index.js.gz', gz)
let br = zlib.brotliCompressSync(indexjs)
fs.writeFileSync('dist/please-upgrade-or-change-your-browser/index.js.br', br)


gz = zlib.gzipSync(bodyjs, { level: zlib.constants.Z_BEST_COMPRESSION })
fs.writeFileSync('dist/please-upgrade-or-change-your-browser/body.js.gz', gz)
br = zlib.brotliCompressSync(bodyjs)
fs.writeFileSync('dist/please-upgrade-or-change-your-browser/body.js.br', br)
