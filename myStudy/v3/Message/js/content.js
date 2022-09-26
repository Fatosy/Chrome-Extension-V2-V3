console.log("----content.js start------")
console.log('--- chrome --- ', chrome)

/* var messages = "fasong"
chrome.runtime.sendMessage(messages, (res) => {
    console.log(res)
});  */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("content get Message : ", request)
    
    if(request.indexOf('popup') > -1){
        sendResponse('content return a message to popup!')
    }

    if(request.indexOf('back') > -1){
        sendResponse('content return a message to back!')
    }
    
});