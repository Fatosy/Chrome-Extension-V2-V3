
// 封装 chrome.runtime.sendMessage，使其能处理多种消息类型，接收的信息必须是JSON类型，并且必须具备type键值
const sendSocket = async (message) => {
    // 因为是异步，所以返回一个promise对象
    return new Promise((resolve, reject) => {
        // 如果传值不合法
        if(message.type == undefined) return reject('发送的请求消息类型不合法，请带上key值type！');
        // 成功则调用chrome.runtime.sendMessage发送消息
        chrome.runtime.sendMessage( message, (response) => {
            resolve(response)
        });
    })
}

// 把封装好的对象暴露出去
export default {sendSocket};