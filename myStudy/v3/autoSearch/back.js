
function autoStart () {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.executeScript(null,{
            code: "var kw=document.querySelector('#kw');kw.value='你好';var button=document.querySelector('#su');button.click();"
        });
    })
}
