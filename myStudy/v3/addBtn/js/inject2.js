console.log("-----inject2------")

$('#su').after('<input type=button class="bg s_btn" value="自定义2" id="selfs" />');

$('#selfs').click(function(){
    $('#kw').val('北大');
    var button = document.querySelector('#su');
    button.click();
});

