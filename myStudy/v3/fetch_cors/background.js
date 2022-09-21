import {http} from './js/http.js';
 
console.log('background.js');
 
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
});