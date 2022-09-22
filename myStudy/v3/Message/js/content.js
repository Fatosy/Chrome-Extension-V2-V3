console.log("----content.js start------")


var messages = fasong
chrome.runtime.sendMessage(messages, (res) => {
    console.log(res)
}); 