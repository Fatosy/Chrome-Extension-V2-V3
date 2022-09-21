
/* 1. 设置插件图标 */
// Warn : 打包成crx的插件可以兼容大多数格式的图片，未打包的插件只能兼容显示png格式图片
// 1-1. 通过画布canavas设置图标
const canvas = new OffscreenCanvas(16, 16);
const context = canvas.getContext('2d');
context.clearRect(0, 0, 16, 16);
context.fillStyle = '#00FF00';  // Green
context.fillRect(0, 0, 16, 16);
const imageData = context.getImageData(0, 0, 16, 16);
chrome.action.setIcon({imageData: imageData}, () => {
     /* ... */ 
});

// 1-2. 通过path路径设置图标
chrome.action.setIcon({path: "img/icon16.png"});


/* 2. 设置插件标题 */
//  2-1. 设置鼠标悬停插件上显示的default_title
chrome.action.setTitle({title:"Hello Action!"});

//  2-2. 获取当前插件上显示的default_title
chrome.action.getTitle({}, (result) => {
    /* console.log(result) */
});


/* 3. 设置插件徽章 */
// 3-1. 设置颜色（绿色）的三种方式
// Warn : 参数对象还可以设置成{ color:*, tabId:* }，可以通过获取标签ID来设置不同的徽章颜色
/* chrome.action.setBadgeBackgroundColor({color: [0, 255, 0, 0]},() => { 

});
  
chrome.action.setBadgeBackgroundColor({color: '#00FF00'},() => {

}); */
  
chrome.action.setBadgeBackgroundColor({color: 'green'}, () => {
    /* ... */ 
});

// 3-2. 获取颜色
chrome.action.getBadgeBackgroundColor({}, (result) => {
    /* console.log(result) */
});


// 3-3. 设置徽章文本
// Warn : 英文文本支持4个字符，中文文本支持2个字符
// Warn : 参数对象还可以设置成{ text:*, tabId:* }，可以通过获取标签ID来设置不同的徽章文本
chrome.action.setBadgeText({text:"on"}, () => {
    /* ... */ 
});

// 3-4. 获取徽章文本
chrome.action.getBadgeText({}, (result) => {
    /* console.log(result) */
});


/* 4. 设置插件popup页面 */
// Warn : 页面不小于25x25， 不大于800x600
// Warn : action.onClicked()函数在manifest.json指定了default_popup后失去响应
// Warn : 参数对象还可以设置成{ popup:*, tabId:* }，可以通过获取标签ID来设置不同的popup
// 4-1. 设置popup页面
/* chrome.action.setPopup({popup: "popup_back.html"}, () => {

}); */

// 4-2. 获取popup页面
// Warn : 返回的是一个popup地址链接
/* chrome.action.getPopup({}, (result) => {

}); */


/* 5. 设置插件action动作 */
// Warn : 参数对象还可以设置成{ tabId:* }，可以通过获取标签ID来设置action动作
/*
// 5-1. 禁止弹出
chrome.action.disable({}, () =>{
    
});

// 5-2. 允许弹出
chrome.action.enable({}, () =>{
   
});
*/

/* 5. 注入JS脚本 */
// Warn : 一旦popup页面被设置，则onclicked方法失效
// Warn ： 必须在http类型的网页中才能注入脚本，不能在 chrome://开头的页面注入
// 5-1. 注入脚本的第三种方式-普通
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['content.js']
    });
});

// 5-2. 注入脚本的第二种方式-对象
/* const tabId = getTabId();
const frameIds = [frameId1, frameId2];
chrome.scripting.executeScript({
      target: {tabId: tabId, frameIds: frameIds},
      files: ['script.js'],
    },() => { 

}); */

// 5-3. 注入脚本的第三种方式-函数和传参
/* const color = getUserColor();
function changeBackgroundColor(backgroundColor) {
  document.body.style.backgroundColor = backgroundColor;
}
const tabId = getTabId();
chrome.scripting.executeScript(
    {
      target: {tabId: tabId},
      func: changeBackgroundColor,
      args: [color],
    }, () => {

}); */


console.log("script", chrome.scripting)

/* 6. CSS注入的方式 */ 
chrome.action.onClicked.addListener((tab) => {
    const css = 'p { color: red; }';
    const tabId = tab.id;
    chrome.scripting.insertCSS({target: {tabId: tabId}, css: css,}, () => {

    });
    chrome.scripting.removeCSS({target: {tabId: tabId}, css: css,}, () => {

    });
});





