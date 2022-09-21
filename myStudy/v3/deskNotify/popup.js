$("#startNotify").click(e => {
    chrome.notifications.create(null, {
        type: "image",
        iconUrl: "./img/icon16.png",
        title:"Desk Notify",
        message: "This is a Desk Notify!",
        imageUrl: "./img/icon128.png"
    })
})