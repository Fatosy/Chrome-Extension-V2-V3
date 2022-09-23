console.log("---- popup.js start --------")
console.log('--- popup.js ----  ', chrome)

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function sendm (mes) {

    getCurrentTab((tab) => {
        return tab
    }).then((tab) => {
        console.log('mes: ', mes)
        chrome.tabs.sendMessage(tab.id, {"type":"imgdownload", "text":mes}, (res) => {
            console.log('popup : 图片下载发送成功')
        });
    })
} 


/* var messages = 'fasong'
chrome.runtime.sendMessage(messages, (res) => {
    console.log('1111')
});  */


$("#pc_main").click(e => {

    console.log('pc_main down')
    sendm("pc_main");

});

$("#pc_sku").click(e => {

    console.log('pc_sku down')
    sendm("pc_sku");

});

$("#pc_dtl").click(e => {

    console.log('pc_dtl down')
    sendm("pc_dtl");

});

$("#pc_all").click(e => {

    console.log('pc_all down')
    sendm("pc_all");

})

$("#pc_video").click(e => {

    console.log('pc_video down')
    sendm("pc_video");

})


$("#pc_comment_nopic").click(e => {

    console.log('pc_comment_nopic down')
    sendm("pc_comment_nopic");

})

$("#pc_comment_pic").click(e => {

    console.log('pc_comment_nopic down')
    sendm("pc_comment_nopic");

})