console.log("----content.js start------")
console.log(chrome)
for(let key1 in chrome){
    for(let key2 in chrome[key1]){
        let names = 'chrome.' + key1 + '.' + key2
        console.log(names)
    }
}
console.log("----content.js end------")