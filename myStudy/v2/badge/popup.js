// 显示Badge
$("#showBadge").click(e => {
    // 设置文本，中文两个，英文4个
    chrome.browserAction.setBadgeText({
        text:"New"
    });
    // 设置颜色
    chrome.browserAction.setBadgeBackgroundColor({
        color:[0, 255, 0, 255]
    });
})

// 隐藏Badge
$("#hideBadge").click(e => {
    // 设置文本，中文两个，英文4个
    chrome.browserAction.setBadgeText({
        text:""
    });
    // 设置颜色
    chrome.browserAction.setBadgeBackgroundColor({
        color:[0, 0, 0, 0]
    });
})