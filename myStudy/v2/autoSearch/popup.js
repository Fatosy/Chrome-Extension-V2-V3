$("#startSearch").click(e => {
    var bg = chrome.extension.getBackgroundPage();
    bg.autoStart()
})