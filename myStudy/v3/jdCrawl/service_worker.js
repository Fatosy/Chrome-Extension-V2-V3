console.log("---- service-worker.js start------")

import {http} from './js/http.js';
console.log("---- service-worker : import http.js ok ------")

console.log("---- service-worker ------", chrome)

/* // 获取所有标签页
function getCurrentTabId(callback){
    chrome.tabs.query({}, function(tabs){
        if(callback) callback(tabs.length ? tabs : null)
    });
} 

getCurrentTabId(tabId => {
    console.log("service-worker tabs --- ", tabId)
});

function inject(){
    getCurrentTabId(tabId => {
        console.log("tab", tabId)
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ['./js/jquery-3.6.1.js', './js/tab.js']
        });
    });
}


function getCurrentTabId(callback){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        if(callback) callback(tabs.length ? tabs[0].id : null)
    });
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("service-worker get Message : ", request)
    sendResponse('shoudao')
});   */

 
 
function packMsgRep(state, data, message) {
	return {
		state,
		uuid: message.uuid,
		data,
		timestamp: Date.now()
	};
}
 
async function parseHttpResponse(response) {

	if (response == null) {
		return {
			status: -2,
			statusText: null,
			body: null
		};
	} else if (response instanceof Error) {
		return {
			status: -1,
			statusText: `${response.name}: ${response.message}`,
			body: response.stack
		};
	} else {
		return {
			status: response.status,
			statusText: response.statusText,
			body: await response.text()
		};
	}
}
 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if(message.type != "imgdownload"){
		new Promise(async (resolve, reject) => {
			if (typeof message != 'object' || !message.type) {
				console.error("消息格式不符合规范：", message);
				reject(`消息 ${JSON.stringify(message)} 格式不符合规范。`);
				return;
			}
			switch (message.type) {
	
				case 'FetchRequest': {
					http.request(message.data).then(response => {
						resolve(parseHttpResponse(response));
					}).catch(error => {
						reject(parseHttpResponse(error));
					});
					break;
				}
				case 'FetchGet': {
					http.get(message.data).then(response => {
						resolve(parseHttpResponse(response));
					}).catch(error => {
						reject(parseHttpResponse(error));
					});
					break;
				}
				case 'FetchPost': {
					http.post(message.data).then(response => {
						resolve(parseHttpResponse(response));
					}).catch(error => {
						reject(parseHttpResponse(error));
					});
					break;
				}
				default: {
					console.error("消息类型非法：", message);
					reject(`消息 ${message} 类型非法。`);
					break;
				}
			}
		}).then((response) => {
			sendResponse(packMsgRep(true, response, message));
			console.log(`消息 ${JSON.stringify(message)} 处理完成。`);
		}).catch(e => {
			sendResponse(packMsgRep(false, e, message));
			console.error(`消息 ${JSON.stringify(message)} 处理失败：`, e);
		});
		return true;
	}else{
		chrome.runtime.sendMessage({"type":"imgdownload", "text":"pc_main"}, (res) => {
			console.log('service_worker : 主图下载发送成功')
		});
	}
	
});