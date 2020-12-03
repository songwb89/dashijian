//发起请求时,拼接全局根路径
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    // 统一为有权限的接口设置headers
    if (options.url.indexOf('/my') != -1) {
        options.headers = { 'Authorization': localStorage.getItem('token') }
    };

    // 控制访问权限
    options.complete = function(res) {
        //这里必须加上'身份认证失败',不能只判断status状态, 否则会影响到登录功能.
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            window.parent.location.href = '/login.html';
        }
    }
});