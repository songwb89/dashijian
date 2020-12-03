$(function() {


    //输入框格式验证
    layui.form.verify({
        //密码格式校验
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位不含空格'
        ],
        //重复密码是否一致
        affirmNewPwd: function(value) {
            let newPwd = $('[name="newPwd"]').val();
            if (newPwd != value) {
                return '两次密码不一致';
            }
        }
    });

    // 重置密码
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                //若重置成功,弹出提示,两秒后退出到首页.
                layer.msg(res.message);
                localStorage.removeItem('token');
                setTimeout(function() {
                    window.parent.location.href = '/login.html';
                }, 2000)
            }
        })
    })
})