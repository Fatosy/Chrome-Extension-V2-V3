console.log("-----inject------")

document.querySelector('#su').setAttribute('value', "    北大一下");

//var tmp = document.querySelector('#kw').getAttribute('value');

document.querySelector("#su").removeAttribute('type');

document.querySelector('#su').setAttribute('onclick', "alert(document.querySelectorAll('.s_ipt')[0].value);")