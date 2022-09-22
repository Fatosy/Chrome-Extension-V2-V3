console.log("---- service-worker.js start------")

console.log("---- service-worker ------", chrome)

/* // 获取所有标签页
function getCurrentTabId(callback){
    chrome.tabs.query({}, function(tabs){
        if(callback) callback(tabs.length ? tabs : null)
    });
} 

getCurrentTabId(tabId => {
    console.log("service-worker tabs --- ", tabId)
});

function inject(){
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
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("service-worker get Message : ", request)
    sendResponse('shoudao')
});   */