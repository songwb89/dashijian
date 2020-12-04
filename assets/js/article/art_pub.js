$(function() {

    //默认发布状态
    var artState = '已发布';

    //1.创建富文本编辑器
    layui.use('layedit', function() {
        var layedit = layui.layedit;
        layedit.build('details'); //建立编辑器
    });



    // 2. 初始化图片裁剪器
    var $image = $('#image')

    // 3. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 4. 初始化裁剪区域
    $image.cropper(options)





    getCates();
    //5.获取文章类别并渲染筛选栏数据
    function getCates() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取文章分类失败');
                }
                var htmlStr = template('cateList', res);
                $('#cate').html(htmlStr);
                layui.form.render();
            }
        })
    }


    //监听图片选择按钮
    $('#cover-btn').on('click', function() {
        $('#file').click();
    })

    //监听文件域改变
    $('#file').on('change', function(e) {
        var file = $(this)[0].files[0];
        if (!file) {
            return;
        }
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域
    })



    //监听保存草稿按钮
    $('.artbtn button:eq(1)').on('cilic', function() {
        artState = '草稿';
    })



    //监听表单提交
    $('#artform').on('submit', function(e) {
        e.preventDefault();
        var imgStr = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
            })
        var  fd  =  new  FormData($(this)[0]);

        // fd.append('title', $('#title').val());
        // fd.append('cate_id', $('#cate').val());
        // fd.append('content', $('#details').val());
        // fd.append('cover_img', imgStr);
        fd.append('state', artState);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                fd.append('cover_img', blob);
                $.ajax({
                    type: 'POST',
                    url: '/my/article/add',
                    data:  fd,
                    contentType:  false,
                    processData:  false,
                    success: function(res) {
                        if (res.status != 0) {
                            layer.msg('发布失败');
                        }
                        location.href = '/article/art_list.html';
                    }
                })
            })
    })
})