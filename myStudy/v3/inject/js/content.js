// 发送消息
console.log("---content.js : 发送消息请求---")
chrome.runtime.sendMessage(
    {
     type: 'post',
     url: "http://pddzdtest.junchenlun.com/pddzd/public/",
     data: {
         url: 'test'
     }
    },
    function response(res) {
        console.log("回调...")
        console.log(res)
    }
)

// 注入inject
// 可以操作当前页面中的DOM
$(document).ready(function() {
 
    console.log("---content.js ： 注入---");
 
    // 注入inject.js
    injectCustomJs();
 
});
 
function injectCustomJs() {
    let jsPath = 'js/inject.js';
 
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.runtime.getURL(jsPath);
    temp.onload = function() {
        // 执行完后移除掉
        this.parentNode.removeChild(this);
    };
    // 挂载
    document.head.appendChild(temp);
}
