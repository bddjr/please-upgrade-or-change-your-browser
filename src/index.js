// https://github.com/bddjr/please-upgrade-or-change-your-browser
// Chrome/97 Firefox/104 Safari/15.4
!function () {
    try {
        if (eval("[].findLast")) return
    } catch (e) { }
    var s = document.createElement('script')
    s.src = document.getElementById('please_upgrade_or_change_your_browser').getAttribute('src').replace(/[^\/\\]*$/, 'body.js')
    document.getElementsByTagName('head')[0].appendChild(s)
}()