console.log("----back.js start------")
console.log(chrome)
console.log(chrome.scripting)
for(let key1 in chrome){
    for(let key2 in chrome[key1]){
        let names = 'chrome.' + key1 + '.' + key2
        console.log(names)
    }
}
console.log("----back.js end------")

