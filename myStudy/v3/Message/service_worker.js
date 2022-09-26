console.log("----service-worler.js start------")

/* function inject(){
    getCurrentTabId(tabId => {
        console.log("tab", tabId)
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ['./js/jquery-3.6.1.js', './js/tab.js']
        });
    });
}


function getCurrentTabId(callback){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        if(callback) callback(tabs.length ? tabs[0].id : null)
    });
} */

async function getCurrentTabId() {
    let queryOptions = { active: true, currentWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}


chrome.runtime.sendMessage("back send message to content!", (res) => {
    console.log("back : content return message :", res)
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("back get Message : ", request)
    sendResponse("back get Message")
    console.log("---- back to content ----")
    chrome.runtime.sendMessage(request, "back send message to content!", (res) => {
        console.log("back : content return message :", res)
    });
});