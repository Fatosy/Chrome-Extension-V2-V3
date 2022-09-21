function packMsgReq(type, data) {
	return {
		uuid: function () {
			return 'generate-uuid-4you-seem-professional'.replace(
				/[genratuidyosmpfl]/g, function (c) {
					const r = Math.random() * 16 | 0,
						v = c === 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});
		}(),
		type: type,
		data: data,
		timestamp: Date.now()
	};
}
 
const http = {
	request: function (options) {
		return new Promise((resolve, reject) => {
			chrome.runtime.sendMessage(packMsgReq('FetchRequest', options),
				(response) => {
					if (response.state) {
						resolve(response.data);
					} else {
						reject(response.data);
					}
				});
		});
	},
	get: function (options) {
		return new Promise((resolve, reject) => {
			chrome.runtime.sendMessage(packMsgReq('FetchGet', options),
				(response) => {
					if (response.state) {
						resolve(response.data);
					} else {
						reject(response.data);
					}
				});
		});
	},
	post: function (options) {
		return new Promise((resolve, reject) => {
			chrome.runtime.sendMessage(packMsgReq('FetchPost', options),
				(response) => {
					if (response.state) {
						resolve(response.data);
					} else {
						reject(response.data);
					}
				});
		});
	}
};


// 发送get请求
http.get({url: "https://www.baidu.com/"}).then((response)=>{
//http.get({url: "http://pddzdtest.junchenlun.com/pddzd/public/"}).then((response)=>{
    alert("获取结果：" + response.body)
})
 
/* // 发送Delete请求
http.request({
    method: "DELETE",
    url: "https://www.example.com/",
    headers: {
        cookie: "test=true;"
    }
}) */