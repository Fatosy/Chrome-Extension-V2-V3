console.log("----popup.js start--------")

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

var tabId = getCurrentTab((res) => {
    return tab.id
})


/* var messages = 'fasong'
chrome.runtime.sendMessage(messages, (res) => {
    console.log('1111')
});  */