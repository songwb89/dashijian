$(function() {

    var form = layui.form;
    //点击去注册,切换到登录表单
    $('.link-reg a').on('click', function() {
        $('#form-login').hide();
        $('#form-reg').show();
    });

    //点击去登录,切换到注册表单
    $('.link-login a').on('click', function() {
        $('#form-reg').hide();
        $('#form-login').show();
    });

    //自定义表单验证规则
    form.verify({
        username: [
            /^[\S]{6,12}$/, '用户名必须6到12位不含空格'
        ],
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位不含空格'
        ],
        againpwd: function(value) {
            let agaginpwd = $('#form-reg input[name="password"]').val();
            if (agaginpwd != value) {
                return '两次密码不一致';
            }
        }
    });

    //登录请求
    $('#form-login').on('submit', function(e) {
        console.log(1111);
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $('#form-login').serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        });
    })




    //注册请求
    $('#form-reg').on('submit', function(e) {
        console.log(222);
        e.preventDefault();
        var username = $('#form-reg input[name="username"]').val();
        var password = $('#form-reg input[name="password"]').val();
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                'username': username,
                'password': password
            },
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $('.link-login a').click();
            }
        });
    });

});