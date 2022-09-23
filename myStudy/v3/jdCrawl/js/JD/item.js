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


/* --- PC端图片下载 start ---- */
// 获取主图链接-PC
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


// 获取SKU图链接-PC
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


/* 获取详情图-PC  start */

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

/* 获取详情图-PC  end */


// 下载全部图片-PC
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

/* --- PC端图片下载 end ---- */



/* --- 移动端图片下载 start ---- */

// 移动端-主图链接获取
// 移动端获取图片方式更改，需要调整
//index_url2 = "https://api.m.jd.com/mview/switch?appid=m_core&functionId=mview_switch&body={'datatype':'1','sku':'" + str(index_url) + "'}"
const phoneMainPic = (skuid) =>{
    let json_url = "https://api.m.jd.com/mview/switch?appid=m_core&functionId=mview_switch&body={'datatype':'1','sku':'" + skuid + "'}"
    console.log(json_url)
    http.get({url: json_url, headers: {"referer":"https://union.jd.com",'user-agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'}}).then((response)=>{
        contents = $.parseJSON(response.body);
        console.log("phone main json : ", contents)
        return contents;
    }).then((res) => {
        
    });
}

/* --- 移动端图片下载 end ---- */


/* --- PC端-视频下载 start --- */

const getVideoUrl = () =>{
    $('.video-icon').click();
    let url = $('video source').attr('src');
    return url != undefined ? url : undefined;
}

// 下载函数
function daonloadVideo(url){
    let name = '商品视频_' + Date.now()
	fetch(url)
	.then(res => res.blob())
	.then(blob => {
		const a = document.createElement("a");
		const objectUrl = window.URL.createObjectURL(blob);
		a.download = name;
		a.href = objectUrl;
		a.click();
		window.URL.revokeObjectURL(objectUrl);
		a.remove();
	})
}

/* --- PC端-视频下载 start --- */



/* --- 评价下载 start --- */

// 无图评价下载
//"https://club.jd.com/comment/skuProductPageComments.action?callback=fetchJSON_comment98&productId=" + str(skuId) + "&score=0&sortType=5&page=0&pageSize=10&isShadowSku=0&fold=1"
const getCmtsNoPic = async (cnum) => {
    
    // 获取商品链接
    let skuUrl = window.location.href;
    // 获取商品ID
    let skuId = getSkuId(skuUrl);

    let json_url_list = new Array();
    let total_page = 0;

    let tpage1 = parseInt(cnum * 10 / 100); 
    let tpage2 = cnum % 10;
    if(cnum < 10){
        total_page = 1;
    }else{
        if(tpage2 != 0){
            total_page = tpage1 + 1;
        }else{
            total_page = tpage1;
        }
    }
    
    for(var i = 0; i < total_page; i++){
        let jsonUrl = "https://club.jd.com/comment/skuProductPageComments.action?productId=" + skuId + "&score=0&sortType=5&page=" + i + "&pageSize=10&isShadowSku=0&fold=1"
        json_url_list.push(jsonUrl)
    }

    let sumData = new Array();

    for(var i = 0; i< total_page; i++){
        
        await http.get({url: json_url_list[i]}).then((response)=>{
            let jsondata = $.parseJSON(response);
            let nowPage = 0;
            if (jsondata.csv != undefined ){
                regs = jsondata.csv.match(/pageSize=.*?(\d+)/);
                nowPage = regs != undefined ? regs[1] : 0;
            }
            // 获取最大页码
            let maxPage = jsondata.maxPage;
            // 初始化评价时间，默认获取当前时间
            let nowTime = getMyDateTime();
    
            let cmt_list = jsondata.comments
            for(var j = 0; j < cmt_list.length; j++){
                // 初始化序号
                let order = j + (nowPage-1) * 10;
                if (order <= cnum){
                    // 初始化每条评价的图片链接
                    let imgUrls = new Array();
                    // 初始化每条评价的视频链接
                    let videoUrls = new Array();
                    // 评价内容
                    let content = cmt_list[j].content != undefined ? cmt_list[j].content : undefined;
                    // 追加评价
                    let after_content = cmt_list[j].afterUserComment != undefined ? cmt_list[j].afterUserComment : undefined;
                    // 所有评价
                    let all_content = "";
                    if(content != undefined){
                        all_content = content
                    }
                    if(after_content != undefined){
                        all_content = all_content + ' ' + after_content
                    }
                    
                    // 评价时间
                    let ctime = cmt_list[j].creationTime != undefined ? cmt_list[j].creationTime : nowTime;
                    // 判断是否是无图
                    let isNoPic = cmt_list[j].images != undefined ? false : true;
                    
                    if(isNoPic == true){
                        let c_obj = {"order":order, "time":ctime, "content":all_content, "after_content":after_content, "imgs":[], "videos":[]}
                        sumData.push(c_obj)
                    }
                }
            }
        })
    }

    return sumData
    
}


//console.log(document.cookie)



//导出excel相关函数
function sheet2blob(sheet, sheetName) {//将文件转换为二进制文件
    sheetName = sheetName || 'sheet1';
    var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
    // 字符串转ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    return blob;
}

/*************************************************************************************/
function openDownloadXLSXDialog(url, saveName){//下载模板文件
    if(typeof url == 'object' && url instanceof Blob){
        url = URL.createObjectURL(url); // 创建blob地址
    }
    
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if(window.MouseEvent) event = new MouseEvent('click');
    else{
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);

}

/*************************************************************************************/
function teaModel(title, datas){//下载监考老师xlsx文件模板

	var array = [['序号','评价内容']];
    for (var i = 0; i < datas.length; i++){
        a_obj = [datas[i].order, datas[i].content]
        array.push(a_obj)
    }
	var sheet = XLSX.utils.aoa_to_sheet(array);
	var blob = sheet2blob(sheet, '无图评价');
    file_name = "无图评价_" + title + '.xlsx'
	openDownloadXLSXDialog(blob, file_name);
}


/* --- 评价下载 end --- */


// 获取时间格式化YYYY-MM-DD HH:MM:SS
const getMyDateTime = () => {
    let myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth();
    let day = myDate.getDate();
    let hour = myDate.getHours();
    let minute = myDate.getMinutes();
    let second = myDate.getSeconds(); 
    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;
    let mydate = year + '-' + month + '-' + day
    let mytime = hour + ':' + minute + ':' + second
    let result = mydate + ' ' + mytime
    return result
}


const gbk2utf8 = () => {  
    this.Dig2Dec=function(s){  
          var retV = 0;  
          if(s.length == 4){  
          for(var i = 0; i < 4; i ++){  
              retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);  
          }  
          return retV;  
          }  
          return -1;  
    }   
    this.Hex2Utf8=function(s){  
         var retS = "";  
         var tempS = "";  
         var ss = "";  
         if(s.length == 16){  
         tempS = "1110" + s.substring(0, 4);  
         tempS += "10" + s.substring(4, 10);   
         tempS += "10" + s.substring(10,16);   
         var sss = "0123456789ABCDEF";  
         for(var i = 0; i < 3; i ++){  
            retS += "%";  
            ss = tempS.substring(i * 8, (eval(i)+1)*8);  
            retS += sss.charAt(this.Dig2Dec(ss.substring(0,4)));  
            retS += sss.charAt(this.Dig2Dec(ss.substring(4,8)));  
         }  
         return retS;  
         }  
         return "";  
    }   
    this.Dec2Dig=function(n1){  
          var s = "";  
          var n2 = 0;  
          for(var i = 0; i < 4; i++){  
         n2 = Math.pow(2,3 - i);  
         if(n1 >= n2){  
            s += '1';  
            n1 = n1 - n2;  
          }  
         else  
          s += '0';  
          }  
          return s;        
    }  
  
    this.Str2Hex=function(s){  
          var c = "";  
          var n;  
          var ss = "0123456789ABCDEF";  
          var digS = "";  
          for(var i = 0; i < s.length; i ++){  
         c = s.charAt(i);  
         n = ss.indexOf(c);  
         digS += this.Dec2Dig(eval(n));  
          }  
          return digS;  
    }  
    this.Gb2312ToUtf8=function(s1){  
        var s = escape(s1);  
        var sa = s.split("%");  
        var retV ="";  
        if(sa[0] != ""){  
          retV = sa[0];  
        }  
        for(var i = 1; i < sa.length; i ++){  
          if(sa[i].substring(0,1) == "u"){  
        retV += this.Hex2Utf8(this.Str2Hex(sa[i].substring(1,5)));  
       if(sa[i].length){  
        retV += sa[i].substring(5);  
       }  
          }  
          else{  
         retV += unescape("%" + sa[i]);  
       if(sa[i].length){  
        retV += sa[i].substring(5);  
       }  
       }  
        }  
        return retV;  
    }  
    this.Utf8ToGb2312=function(str1){  
        var substr = "";  
        var a = "";  
        var b = "";  
        var c = "";  
        var i = -1;  
        i = str1.indexOf("%");  
        if(i==-1){  
          return str1;  
        }  
        while(i!= -1){  
        if(i<3){  
            substr = substr + str1.substr(0,i-1);  
            str1 = str1.substr(i+1,str1.length-i);  
            a = str1.substr(0,2);  
            str1 = str1.substr(2,str1.length - 2);  
            if(parseInt("0x" + a) & 0x80 == 0){  
              substr = substr + String.fromCharCode(parseInt("0x" + a));  
            }  
            else if(parseInt("0x" + a) & 0xE0 == 0xC0){ //two byte  
                b = str1.substr(1,2);  
                str1 = str1.substr(3,str1.length - 3);  
                var widechar = (parseInt("0x" + a) & 0x1F) << 6;  
                widechar = widechar | (parseInt("0x" + b) & 0x3F);  
                substr = substr + String.fromCharCode(widechar);  
            }  
            else{  
                b = str1.substr(1,2);  
                str1 = str1.substr(3,str1.length - 3);  
                c = str1.substr(1,2);  
                str1 = str1.substr(3,str1.length - 3);  
                var widechar = (parseInt("0x" + a) & 0x0F) << 12;  
                widechar = widechar | ((parseInt("0x" + b) & 0x3F) << 6);  
                widechar = widechar | (parseInt("0x" + c) & 0x3F);  
                substr = substr + String.fromCharCode(widechar);  
            }  
         }  
         else {  
          substr = substr + str1.substring(0,i);  
          str1= str1.substring(i);  
         }  
              i = str1.indexOf("%");  
        }  
  
        return substr+str1;  
    }  
}  


/* --- 图片打包下载，传入图片链接数组, 图片名称， 打包名称 start --- */

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
        }else if(rt == "pc_video"){
            let video_url = getVideoUrl()
            daonloadVideo(video_url)
            sendResponse('item.js pc_video get ok')
        }else if(rt == "pc_comment_nopic"){
            getCmtsNoPic(20).then((res) => {
                let skuTitle = $('.sku-name').text().trim();
                teaModel(skuTitle, res);
            });
            sendResponse('item.js pc_comment_nopic get ok')
        }else if(rt == "pc_comment_pic"){

            sendResponse('item.js pc_comment_pic get ok')
        }
    }
    
});

