console.log("---- item.js injected ------");

console.log("---- item.js ------", chrome);

/* --- skuId获取 start --- */
let url = window.location.href;
const getSkuId = (url) => {
    let regs = url.match(/item.jd.com.*?(\d+)/)
    let id = regs.length >= 2 ? regs[1] : undefined;
    return id
};
let skuId = getSkuId(url);
/* --- skuId获取 end --- */


/* --- 搜本店链接构造 start --- */
// 获取搜本店链接第一个ID
const getTypeId = () => {
    let script_list = $('script')
    for(let i=0; i<script_list.length; i++){
        let script_text = script_list[i].innerText
        if(script_text.indexOf('mall.jd.com/advance_search') > -1){
            let regs = script_text.match(/advance_search.*?(\d+)/)
            let id = regs.length >= 2 ? regs[1] : undefined; 
            return id
        }
    }
};
let typeId = getTypeId()

// 搜本店链接第二个ID
const getVenderId = () => {
    let script_list = $('script')
    for(let i=0; i<script_list.length; i++){
        let script_text = script_list[i].innerText
        if(script_text.indexOf('venderId:') > -1){
            let regs = script_text.match(/venderId:.*?(\d+)/)
            let id = regs.length >= 2 ? regs[1] : undefined; 
            return id
        }
    }
};
let venderId = getVenderId();

// 搜本店链接第三个ID
const getShopId = () => {
    let script_list = $('script')
    for(let i=0; i<script_list.length; i++){
        let script_text = script_list[i].innerText
        if(script_text.indexOf('shopId:') > -1){
            let regs = script_text.match(/shopId:.*?(\d+)/)
            let id = regs.length >= 2 ? regs[1] : undefined; 
            return id
        }
    }
};
let shopId = getShopId();

// 组合成搜本店链接
const compareSbdUrl = (id1, id2, id3) => {
    //https://mall.jd.com/advance_search-2277560-12030855-11748521-5-0-0-1-1-60.html?other=&isRedisstore=0
    if (id1 != undefined && id2 != undefined && id3 != undefined){
        let url = "https://mall.jd.com/advance_search-" + id1 + "-" + id2 + "-" + id3 + "-5-0-0-1-1-60.html?other=&isRedisstore=0"
        return url
    }else{
        return undefined
    }
}
let sbdUrl = compareSbdUrl(typeId, venderId, shopId);
/* --- 搜本店链接构造 end --- */


/* 获取标题 */
//let skuTitle = $('.sku-name').text().trim();


/* 获取价格 */
//let price = $('.p-price').text();

//console.log(document.querySelectorAll("li.lh"))



