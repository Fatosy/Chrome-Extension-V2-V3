
chrome.contextMenus.create({
    // 标题
    title:"百度自动提交搜索",
    // editable - 只能在可编辑的地方显示右键菜单
    // selection - 在一些可选中的地方显示菜单，比如全选文本
    contexts: ["editable", "selection"],
    id:"1",
    // 点击后执行的函数
    onclick: function(){
        // 获取DOM元素并执行事件
        chrome.tabs.executeScript(null,{
            code: "var kw=document.querySelector('#kw');kw.value='北大';var button=document.querySelector('#su');button.click();"
        });
    },
    // 只有在下面链接的页面才显示右键菜单
    documentUrlPatterns: ["https://*.baidu.com/*"]
});

chrome.contextMenus.create({
    // 标题
    title:"子菜单1",
    // editable - 只能在可编辑的地方显示右键菜单
    // selection - 在一些可选中的地方显示菜单，比如全选文本
    contexts: ["editable", "selection"],
    type:"radio",
    parentId:"1",
    // 点击后执行的函数
    onclick: function(){
        // 获取DOM元素并执行事件
        chrome.tabs.executeScript(null,{
            code: "var kw=document.querySelector('#kw');kw.value='北大';var button=document.querySelector('#su');button.click();"
        });
    },
    // 只有在下面链接的页面才显示右键菜单
    documentUrlPatterns: ["https://*.baidu.com/*"]
});

chrome.contextMenus.create({
    // 标题
    title:"子菜单2",
    // editable - 只能在可编辑的地方显示右键菜单
    // selection - 在一些可选中的地方显示菜单，比如全选文本
    contexts: ["editable", "selection"],
    type:"radio",
    parentId:"1",
    // 点击后执行的函数
    onclick: function(){
        // 获取DOM元素并执行事件
        chrome.tabs.executeScript(null,{
            code: "var kw=document.querySelector('#kw');kw.value='北大';var button=document.querySelector('#su');button.click();"
        });
    },
    // 只有在下面链接的页面才显示右键菜单
    documentUrlPatterns: ["https://*.baidu.com/*"]
});
