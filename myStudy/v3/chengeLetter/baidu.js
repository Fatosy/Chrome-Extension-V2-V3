document.addEventListener("DOMContentLoaded", function(){
    jsPath = 'js/inject.js'
    var tmp = document.createElement('script');
    tmp.src = chrome.extension.getURL(jsPath);
    tmp.setAttribute("type", "text/javascript");
    document.head.appendChild(tmp)
})