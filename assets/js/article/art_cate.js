$(function() {


    getCates();

    //获取分类列表并渲染页面
    function getCates() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取文章分类失败');
                }
                var htmlStr = template('cateList', res);
                $('tbody').html(htmlStr);
            }
        })
    }

    var addindex = null;
    //绑定添加分类按钮,弹出表单
    $('#addbtn').on('click', function() {
        addindex = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#addform').html()
        });
    })

    //监听添加分类表单提交
    $('body').on('submit', '.add-form', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $('.add-form').serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('添加失败');
                }
                layer.close(addindex);
                layer.msg('添加成功');
                getCates();
            }
        })
    })

    var updindex = null;
    //绑定编辑按钮,弹出表单
    $('table').on('click', '#updbtn', function() {
        updindex = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $('#updform').html()
        });
        var id = $(this).parent().attr('index-id');
        getCateById(id);
    })


    //根据ID获取文章分类数据并填充修改表单
    function getCateById(id) {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取分类失败');
                }
                layui.form.val('upd-form', res.data);
            }
        })
    }

    //监听修改分类表单提交
    $('body').on('submit', '.upd-form', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            // data: {
            //     Id: $(this).attr('index-id'),
            //     name: $(this).find('[name="name"]').val(),
            //     alias: $(this).find('[name="alias"]').val()
            // },
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('修改失败');
                }
                layer.close(updindex);
                layer.msg('修改成功');
                getCates();
            }
        })
    })

    //监听删除分类按钮
    $('table').on('click', '#delbtn', function() {
        var id = $(this).parent().attr('index-id');
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg('删除失败');
                    }
                    layer.msg('删除成功');
                    layer.close(index);
                    getCates();
                }
            })
        });
    })


})