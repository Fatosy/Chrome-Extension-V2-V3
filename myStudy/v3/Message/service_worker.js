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


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("service-worker get Message : ", request)
    sendResponse('shoudao')
});