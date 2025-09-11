// https://github.com/bddjr/please-upgrade-or-change-your-browser
(function () {
    var lang = navigator.language || navigator.userLanguage
        , zh = /^zh/i.test(lang)
        , isIE_1to10 = /MSIE/.test(navigator.userAgent)
        , isIE = isIE_1to10 || /Trident/.test(navigator.userAgent)
        , dir = document.getElementById('please_upgrade_or_change_your_browser').getAttribute('src').replace(/[^\/\\]*$/, '')
        , style = document.createElement('style')
        , css = '<<STYLE>>'
        , body = document.createElement('div')
        , title = zh ? '请升级或更换浏览器' : 'Please upgrade or change your browser'
        , chromeHref =
            isIE_1to10
                ? 'https://dl.google.com/update2/installers/win_7/ChromeSetup.exe'
                : 'https://www.google.c' + (zh ? 'n' : 'om') + '/chrome/' + (
                    /(Trident|Edge)/.test(navigator.userAgent)
                        ? 'fallback/'
                        : ''
                )
        , edgeHref =
            isIE
                ? 'http://go.microsoft.com/fwlink/?linkid=2192449'
                : 'https://www.microsoft.com/edge'
        , firefoxHref =
            isIE_1to10
                ? 'https://download.mozilla.org/?product=firefox-esr115-latest-ssl&os=win'
                : 'https://www.firefox.com'
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