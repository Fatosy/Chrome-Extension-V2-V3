console.log("---- item.js injected ------");

console.log("---- item.js ------", chrome);

/* --- fetch请求函数 start ---  */
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
/* http.get({url: "https://www.baidu.com/"}).then((response)=>{
//http.get({url: "http://pddzdtest.junchenlun.com/pddzd/public/"}).then((response)=>{
    alert("获取结果：" + response.body)
}) */
 
/* // 发送Delete请求
http.request({
    method: "DELETE",
    url: "https://www.example.com/",
    headers: {
        cookie: "test=true;"
    }
}) */

/* --- fetch请求函数 end ---  */

const shopDiagnosis = (num) => {

    // 要诊断的商品数量
    let skuNum = num;
    // 获取商品链接
    let skuUrl = window.location.href;
    // 获取商品ID
    let skuId = getSkuId(skuUrl);
    // 获取商品类型ID
    let typeId = getTypeId()
    // 获取商品venderId
    let venderId = getVenderId();
    // 获取商品shopId
    let shopId = getShopId();
    // 拼接搜本店链接
    let sbdUrl = compareSbdUrl(typeId, venderId, shopId);
    // 获取商品标题
    let skuTitle = $('.sku-name').text().trim();
    // 获取商品价格

    // 获取主图链接数组
    let skuMianPics = getMainImg()

    // 获取sku图链接数组
    let skuSKuPics = getSkuImg()

    //mainSkuId
    let mainSkuId = getmainSkuId()



};


// skuId获取
const getSkuId = (url) => {
    let regs = url.match(/item.jd.com.*?(\d+)/);
    let id = regs.length >= 2 ? regs[1] : undefined;
    return id;
};


/* --- 搜本店链接构造 start --- */
// 获取搜本店链接第一个ID
const getTypeId = () => {
    let script_list = $('script');
    for(let i=0; i<script_list.length; i++){
        let script_text = script_list[i].innerText;
        if(script_text.indexOf('mall.jd.com/advance_search') > -1){
            let regs = script_text.match(/advance_search.*?(\d+)/);
            let id = regs.length >= 2 ? regs[1] : undefined; 
            return id;
        }
    }
};

// 搜本店链接第二个ID
const getVenderId = () => {
    let script_list = $('script');
    for(let i=0; i<script_list.length; i++){
        let script_text = script_list[i].innerText;
        if(script_text.indexOf('venderId:') > -1){
            let regs = script_text.match(/venderId:.*?(\d+)/);
            let id = regs.length >= 2 ? regs[1] : undefined; 
            return id;
        }
    }
};

// 搜本店链接第三个ID
const getShopId = () => {
    let script_list = $('script');
    for(let i=0; i<script_list.length; i++){
        let script_text = script_list[i].innerText;
        if(script_text.indexOf('shopId:') > -1){
            let regs = script_text.match(/shopId:.*?(\d+)/);
            let id = regs.length >= 2 ? regs[1] : undefined; 
            return id;
        }
    }
};

// 组合成搜本店链接
const compareSbdUrl = (id1, id2, id3) => {
    //https://mall.jd.com/advance_search-2277560-12030855-11748521-5-0-0-1-1-60.html?other=&isRedisstore=0
    if (id1 != undefined && id2 != undefined && id3 != undefined){
        let url = "https://mall.jd.com/advance_search-" + id1 + "-" + id2 + "-" + id3 + "-5-0-0-1-1-60.html?other=&isRedisstore=0";
        return url;
    }else{
        return undefined;
    }
}

/* --- 搜本店链接构造 end --- */


// 获取主图链接
const getMainImg = () => {
    let main_img_list = new Array();
    let main_tag_list = $('#spec-list ul li img');
    for (var i = 0; i < main_tag_list.length; i++){
        let img_url = main_tag_list[i].src;
        img_url = img_url.replace('n5/s54x54_jfs', 'n1/jfs');
        img_url = img_url.match('.+\\.(jpg|png)')[0]
        img_url = img_url.replace('http:', 'https:')
        if(img_url.indexOf('png') > -1 || img_url.indexOf('jpg') > -1){
            main_img_list.push(img_url);
        }
    }
    return main_img_list.length > 0 ? main_img_list : undefined;
}


// 获取SKU图
const getSkuImg = () => {
    let sku_list = new Array();
    let sku_tag_img_list = $('#choose-attrs div div div a img');
    let sku_tag_text_list = $('#choose-attrs div div div a i');
    for (var i = 0; i < sku_tag_img_list.length; i++){
        let img_url = sku_tag_img_list[i].src;
        let img_text = sku_tag_img_list[i].alt;
        img_url = img_url.replace('n9/s40x40_jfs', 'n1/jfs');
        img_url = img_url.match('.+\\.(jpg|png)')[0]
        img_url = img_url.replace('http:', 'https:')
        if(img_url.indexOf('png') > -1 || img_url.indexOf('jpg') > -1){
            let img_obj = {
                "url": img_url,
                "text": img_text
            }
            sku_list.push(img_obj);
        }
    }
    return sku_list.length > 0 ? sku_list : undefined;
}


/* 获取详情图 */

// 获取mainSkuId
const getmainSkuId = () => {
    let script_list = $('script');
    for(let i=0; i<script_list.length; i++){
        let script_text = script_list[i].innerText;
        if(script_text.indexOf('mainSkuId:') > -1){
            let regs = script_text.match(/mainSkuId:.*?(\d+)/);
            let id = regs.length >= 2 ? regs[1] : undefined; 
            return id;
        }
    }
};

// 构造详情图JSON链接
const compareDtlImgUrl = (id1, id2) => {
    //id1 是skuId， id2是mainskuId
    //https://cd.jd.com/description/channel?skuId=10042581919640&mainSkuId=10021908239582&charset=utf-8
    if (id1 != undefined && id2 != undefined){
        let url = "https://cd.jd.com/description/channel?skuId=" + id1 + "&mainSkuId=" + id2 + "&charset=utf-8"
        return url;
    }else{
        return undefined;
    }
}

// 下载PC端详情图
const downloadDtlImg = () => {
    let skuUrl = window.location.href;
    let mainSkuId = getmainSkuId();
    let skuId = getSkuId(skuUrl);
    let dtl_url = compareDtlImgUrl(skuId, mainSkuId);

    http.get({url: dtl_url}).then((response)=>{
        contents = $.parseJSON(response.body).content;
        var img = contents.match(/(http:\/\/\S+.avif)/ig);
        if(img == null){
            img = contents.match(/(https:\/\/\S+.avif)/ig);
        }
        let img_list = new Array()
        for(var i = 0; i < img.length; i++){
            if(img[i].indexOf('.jpg') > -1 || img[i].indexOf('png') > -1){
                img_url = img[i].match('.+\\.(jpg|png)')[0]
                img_url = img_url.replace('http:', 'https:');
                img_list.push(img_url);
            }
        }
        return img_list.length > 0 ? img_list : undefined;
    }).then((res) => {
        if(res != undefined && res.length > 0){
            packageImages(res, "详情图", "PC端-详情图下载");
        }
    });
}



// 下载全部图片
const downloadAllImg = () => {

    // 主图
    let mains = getMainImg()
    // sku图
    let skus = getSkuImg()

    // 全部
    let pic_all = new Array()
    for (var i = 0; i < mains.length; i++){
        ts = "主图_" + i
        pic_obj = {
            "url": mains[i],
            "text": ts
        }
        pic_all.push(pic_obj)
    }
    for (var i = 0; i < skus.length; i++){
        pic_all.push(skus[i])
    }


    // 详情图
    let skuUrl = window.location.href;
    let mainSkuId = getmainSkuId();
    let skuId = getSkuId(skuUrl);
    let dtl_url = compareDtlImgUrl(skuId, mainSkuId);

    http.get({url: dtl_url}).then((response)=>{
        contents = $.parseJSON(response.body).content;
        var img = contents.match(/(http:\/\/\S+.avif)/ig);
        if(img == null){
            img = contents.match(/(https:\/\/\S+.avif)/ig);
        }
        let img_list = new Array()
        for(var i = 0; i < img.length; i++){
            if(img[i].indexOf('.jpg') > -1 || img[i].indexOf('png') > -1){
                img_url = img[i].match('.+\\.(jpg|png)')[0]
                img_url = img_url.replace('http:', 'https:');
                img_list.push(img_url);
            }
        }
        return img_list.length > 0 ? img_list : undefined;
    }).then((res) => {
        if(res != undefined && res.length > 0){
            for (var i = 0; i < res.length; i++){
                ts = "详情图_" + i
                pic_obj = {
                    "url": res[i],
                    "text": ts
                }
                pic_all.push(pic_obj)
            }
            console.log(pic_all)
            packageSkuImages(pic_all, "PC端-图片全部下载");
        }
    });
}



// 单张图片下载功能
function downloadIamge(imgsrc, name) {//下载图片地址和图片名
    var image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var a = document.createElement("a"); // 生成一个a元素
        var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        a.download = name + '.png' || "photo.png"; // 设置图片名称
        if(imgsrc.indexOf('png') > -1){
            url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
            a.download = name + '.png' || "photo.png"; // 设置图片名称
        }
        if(imgsrc.indexOf('jpg') > -1){
            url = canvas.toDataURL("image/jpeg"); //得到图片的base64编码数据
            a.download = name + '.jpg' || "photo.jpg"; // 设置图片名称
        }
        var event = new MouseEvent("click"); // 创建一个单击事件
        
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
    };
    image.src = imgsrc;
}


/* --- 图片打包下载，传入图片链接数组, 图片名称， 打包名称 start --- */

function packageImages(imgsSrc, imgName, zipName) {

    var imgBase64 = [] //base64图片
    var imageSuffix = [] //图片后缀
    var zip = new JSZip()
    //var img = zip.folder(zipName)
 
    for (var i = 0; i < imgsSrc.length; i++) {
        var suffix = imgsSrc[i].substring(imgsSrc[i].lastIndexOf('.'))
        imageSuffix.push(suffix)
 
        getBase64(imgsSrc[i], function (base64) {
            imgBase64.push(base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""))
            if (imgsSrc.length == imgBase64.length) {
                for (var i = 0; i < imgsSrc.length; i++) {
                    // 文件名  数据
                    let imgNames = imgName + "_" + i
                    //img.file(imgNames + imageSuffix[i], imgBase64[i], {
                    zip.file(imgNames + imageSuffix[i], imgBase64[i], {
                        base64: true,
                    })
                }
                zip.generateAsync({
                    type: 'blob'
                }).then(function (content) {
                    // see FileSaver.js
                    let zipNames = zipName + '.zip'
                    saveAs(content, zipNames)
                })
            }
        })
    }
}

function packageSkuImages(imgsSrc, zipName) {

    var imgBase64 = [] //base64图片
    var imageSuffix = [] //图片后缀
    var zip = new JSZip()
    //var img = zip.folder(zipName)
 
    for (var i = 0; i < imgsSrc.length; i++) {
        var suffix = imgsSrc[i]['url'].substring(imgsSrc[i]['url'].lastIndexOf('.'))
        imageSuffix.push(suffix)
        
        getBase64(imgsSrc[i]['url'], function (base64) {
            imgBase64.push(base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""))
            if (imgsSrc.length == imgBase64.length) {
                for (var i = 0; i < imgsSrc.length; i++) {
                    // 文件名  数据
                    let imgNames = imgsSrc[i]['text']
                    //console.log(imgsSrc[i]['text'], imgsSrc[i]['url'])
                    //img.file(imgNames + imageSuffix[i], imgBase64[i], {
                    zip.file(imgNames + imageSuffix[i], imgBase64[i], {
                        base64: true,
                    })
                }
                zip.generateAsync({
                    type: 'blob'
                }).then(function (content) {
                    // see FileSaver.js
                    let zipNames = zipName + '.zip'
                    saveAs(content, zipNames)
                })
            }
        })
    }
}

function getBase64(img, callback) {
    fetch(img).then(
        res => res.blob())
        .then(res => {
            let fr = new FileReader();//https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
            fr.onload = function (e) {
                callback(e.target.result)
            };
            fr.onerror = function () {
                console.log('读取错误！')
            };
            fr.readAsDataURL(res);//如果是转文字，第二个参数可以使用编码
        })
}

// packageImages(mains, "主图", "PC端-主图下载")
// packageSkuImages(skus, "PC端-SKU图下载")

/* --- 图片打包下载，传入图片链接数组, 图片名称， 打包名称 end--- */



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("item.js get Message : ", request)
    if(request.type != undefined && request.type == "imgdownload"){
        rt = request.text;
        if(rt == "pc_main"){
            let mains = getMainImg()
            packageImages(mains, "主图", "PC端-主图下载")
            sendResponse('item.js pc_main get ok')
        }else if(rt == "pc_sku"){
            let skus = getSkuImg()
            console.log(skus)
            packageSkuImages(skus, "PC端-SKU图下载")
            sendResponse('item.js pc_sku get ok')
        }else if(rt == "pc_dtl"){
            downloadDtlImg()
            sendResponse('item.js pc_dtl get ok')
        }else if(rt == "pc_all"){
            downloadAllImg()
            sendResponse('item.js pc_all get ok')
        }
    }
    
});

