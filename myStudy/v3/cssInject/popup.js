
// 获取当前标签页ID
async function getCurrentTabId() {
    let queryOptions = { active: true, currentWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab
}

// 点击事件
$("#updateCSS").click(e => {
    const color ="blue"
    const fontsize = "30px"

    getCurrentTabId().then((tab) => {
        tabIds = tab.id
        chrome.scripting.executeScript({
            target: {tabId: tabIds},
            func: changeBackgroundColor,
            args: [color, fontsize],
        });
    })
})

// 脚本函数
function changeBackgroundColor(backgroundColor, fsize) {
    document.body.style.backgroundColor=backgroundColor;
    document.body.style.fontSize=fsize;
}
    