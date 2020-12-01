$(function() {

    //发起请求时,拼接全局根路径
    $.ajaxPrefilter(function(options) {
        options.url = 'http://ajax.frontend.itheima.net' + options.url
    });

})