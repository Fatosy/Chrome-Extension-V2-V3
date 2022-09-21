

function getCurrentTabId(callback){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        if(callback) callback(tabs.length ? tabs[0].id : null);
    });
}

function executeScriptCurrentTab(scriptcode){
    getCurrentTabId((tabId) => {
        chrome.tabs.executeScript(tabId, {code: scriptcode});
    });
}

$("#updateCSS").click(e => {
    executeScriptCurrentTab('document.body.style.fontSize="30px";');
    executeScriptCurrentTab('document.body.style.backgroundColor="blue";');
})