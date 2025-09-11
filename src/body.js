// https://github.com/bddjr/please-upgrade-or-change-your-browser
(function () {
    var lang = navigator.language || navigator.userLanguage
        , zh = /^zh/i.test(lang)
        , dir = document.getElementById('please_upgrade_or_change_your_browser').getAttribute('src').replace(/[^\/\\]*$/, '')
        , style = document.createElement('style')
        , css = '<<STYLE>>'
        , body = document.createElement('div')
        , title = zh ? '请升级或更换浏览器' : 'Please upgrade or change your browser'
        , chromeHref =
            /MSIE/.test(navigator.userAgent)
                ? 'https://dl.google.com/update2/installers/ChromeSetup.exe'
                : 'https://www.google.c' + (zh ? 'n' : 'om') + '/chrome/' + (
                    /(Trident|Edge)/.test(navigator.userAgent)
                        ? 'fallback/'
                        : ''
                )
        ;

    style.id = 'please_upgrade_or_change_your_browser__style';

    typeof style.styleSheet == 'object'
        ? (style.type = 'text/css', style.styleSheet.cssText = css)
        : style.innerHTML = css;

    body.id = 'please_upgrade_or_change_your_browser__body';
    body.innerHTML = '<<HTML>>';

    function f() {
        document.getElementsByTagName('head')[0].appendChild(style);
        document.body.insertBefore(body, document.body.firstChild)
    }

    if (document.body) f();
    else var t = setInterval(function () {
        document.body && (clearInterval(t), f())
    }, 50)
})()