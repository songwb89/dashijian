$(function() {
    getUserInfo();
})

//获取用户信息
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            renderUserInfo(res.data);
        }
    })
}


//用户信息渲染
function renderUserInfo(data) {
    // 渲染用户名
    var uname = data.nickname || data.username;
    $('.welcome').html('欢迎  ' + uname);

    //渲染头像
    if (data.user_pic == null) {
        //如果没头像,采用用户名首字作头像显示
        var headFirst = uname[0];
        $('.layui-nav-img').hide();
        $('.initial-head').html(headFirst).show();
    } else {
        // 如果有头像,显示头像图片
        $('.layui-nav-img').attr('src', data.user_pic).show();
        $('.initial-head').hide();
    }
}

//退出
$('.exit').on('click', function() {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        localStorage.removeItem('token');
        location.href = 'login.html';
        layer.close(index);
    });
})

//头部右侧打开个人信息页面,左侧导航项跟随选中
$('.user-info-rig a').on('click', function(e) {
    var index = $(e.target).parent().index();
    $('.layui-nav-tree .layui-this').removeClass('layui-this')
    $('.user-info-left dd').eq(index).addClass('layui-this');
})