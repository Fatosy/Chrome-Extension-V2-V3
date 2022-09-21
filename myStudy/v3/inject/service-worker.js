// 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("service-worker : addListener...")
    console.log(request)
        switch(request.type) {
            case 'get':
                fetch(request.url)
                    .then(function(response) { sendResponse(response.json()) })
                .then(function(json) { sendResponse(json) })
                .catch(function(error) { sendResponse(null) });
            break;
            case 'post':
                fetch(request.url, {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: JSON.stringify(request.data)
                })
                    .then(function(response) { 
                        console.log(response)
                        sendResponse(response.json())
                    })
                    .then(function(json) {
                        console.log(json)
                        sendResponse(json)
                    })
                    .catch(function(error) {
                        console.log(error)
                        sendResponse(null)
                    });
            break;
            // 你可以定义任意内容，使用sendResponse()来返回它
            case 'test':
                sendResponse({'msg': 'test'});
            break;
    }
});