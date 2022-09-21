
chrome.omnibox.onInputChanged.addListener((text, suggest) => {

    if(!text) return;
    if(text == '北大'){
        suggest([
            {"content":text + '学霸', description:"你要找北大学霸?"},
            {"content":text + '校花', description:"你要找北大校花?"},
            {"content":text + '校草', description:"你要找北大校草?"}
        ]);
    }
});

chrome.omnibox.onInputEntered.addListener((text) => {
    if(!text) return;
    var href = "";
    if(text.startsWith("北大")) href = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=' + text;
    openUrl(href);
});

function openUrl(url){
    getCurrentTabId(tabId => {
        chrome.tabs.update(tabId, {url:url})
    });
}


function getCurrentTabId(callback){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        if(callback) callback(tabs.length ? tabs[0].id : null)
    });
}