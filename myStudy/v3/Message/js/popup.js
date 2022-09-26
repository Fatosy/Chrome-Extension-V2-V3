console.log("----popup.js start--------")
console.log("--- chrome --- ", chrome)

async function getCurrentTabId() {
    let queryOptions = { active: true, currentWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}




$('#sends').click(e => {

    getCurrentTabId().then((tab) => {
        tabIds = tab.id
        var messages2 = 'popup send message to content!'
        console.log("tabids:",tabIds)
        chrome.tabs.sendMessage(tabIds, messages2, (res) => {
            console.log('popup sends and get :', res)
        }); 

        var messages3 = tabIds
        chrome.runtime.sendMessage(messages3, (res) => {
            console.log('popup sends ids to back  and get :', res)
        }); 
    })
})
