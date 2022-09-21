
chrome.contextMenus.create({
    // 标题
    title:"百度自动提交搜索",
    // 点击后执行的函数
    onclick: function(){
        chrome.tabs.executeScript(null,{
            code: "var kw=document.querySelector('#kw');kw.value='北大';var button=document.querySelector('#su');button.click();"
        });
    }
});
