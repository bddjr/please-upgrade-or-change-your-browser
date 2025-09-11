//@ts-nocheck

import htmlminifier from "html-minifier-terser";
import fs from 'fs'
import zlib from 'zlib'
import { minify_sync as terserMinify } from "terser";


let style = ''

let html = fs.readFileSync('src/raw.html').toString()

html = await htmlminifier.minify(html, {
    removeAttributeQuotes: false,
    quoteCharacter: '"',
    removeComments: true,
    collapseWhitespace: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    minifyJS: false,
    /** @type {import("clean-css").Options} */
    minifyCSS: {
        compatibility: 'ie7',
        level: {
            1: {
                optimizeBackground: false,
            },
        },
    },
})

html = html.trim().replace(
    /['\\\n]/g,
    m => (({
        "'": "\\'",
        "\\": "\\\\",
        "\n": "\\n",
    })[m])
).replace(
    /<style[^>]+>([\s\S]+?)<\/style>/,
    (m, a) => ((style = a), '')
).replace(
    /^<div[^>]+>([\s\S]+)<\/div>$/,
    (m, a) => a
).replaceAll(
    "</span> </a>",
    "</span></a>"
).replaceAll(
    "icon/",
    "'+dir+'icon/"
).replace(
    "https://www.google.com/chrome/",
    "'+chromeHref+'"
).replace(
    "Please upgrade or change your browser",
    "'+title+'"
).trim()


/** @type {import('terser').MinifyOptions} */
const terserConfig = {
    sourceMap: false,
    compress: {
        defaults: false,
        arrows: false,
        ecma: 3,
        dead_code: false,
        typeofs: false,
        unused: false,
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


let indexjs = fs.readFileSync('src/index.js').toString()

indexjs = minifyjs(indexjs)


let bodyjs = fs.readFileSync('src/body.js').toString()

bodyjs = bodyjs
    .replace("<<STYLE>>", style)
    .replace("<<HTML>>", html)

bodyjs = minifyjs(bodyjs)


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
