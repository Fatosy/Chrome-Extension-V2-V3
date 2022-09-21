/* 
function autoStart () {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.executeScript(null,{
            code: "var kw=document.querySelector('#kw');kw.value='你好';var button=document.querySelector('#su');button.click();"
        });
    })
}

chrome.runtime.onInstalled.addListener(function(){
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions:[
                    new chrome.declarativeContent.PageStateMatcher({pageUrl:{urlContains:"baidu.com"}})
                ],
                actions:[
                    new chrome.declarativeContent.ShowPageAction()
                ]
            }
        ]);
    });
})
 */