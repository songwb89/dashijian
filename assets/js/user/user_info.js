$(function() {
    initUserInfo();

    //输入框格式验证
    layui.form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6之间';
            }
        }
    });

    $('[type="reset"]').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })



    //获取用户基本信息
    function initUserInfo() {
        $.ajax({
            typt: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                //通过layui.form.val为表单快速赋值
                layui.form.val('formUserInfo', res.data)
                    // $('.layui-form').val(res.data.username);
                    // $('[name="nickname"]').val(res.data.nickname);
                    // $('[name="email"]').val(res.data.email);
                    // $('[name="id"]').val(res.data.id);
            }
        })
    }



    //提交更新
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                console.log(res);
                window.parent.getUserInfo();
                return layer.msg('更新信息成功');
            }
        })

    })


})