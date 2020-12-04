$(function() {

    var laypage = layui.laypage;

    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示条数
        cate_id: '', //分类id
        state: '' //文章状态
    }

    getCates();
    //1.获取文章类别并渲染筛选栏数据
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


    getartList();
    // 2获取文章列表渲染页面
    function getartList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取文章失败');
                }
                var htmlStr = template('artList', res);
                $('tbody').html(htmlStr);
                layui.form.render();
                paging(res.total)
            }
        })
    }

    //2.1定义文章列表模板时间过滤器
    template.defaults.imports.dateFormat = function(date) {
        var pubDate = new Date(date);
        var y = zeroize(pubDate.getFullYear());
        var m = zeroize(pubDate.getMonth() + 1);
        var d = zeroize(pubDate.getDate());
        var hh = zeroize(pubDate.getHours());
        var mm = zeroize(pubDate.getMinutes());
        var ss = zeroize(pubDate.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss // 注意，过滤器最后一定要 return 一个值
    }

    //2.1.1时间补0方法
    function zeroize(str) {
        return str >= 10 ? str : '0' + str;
    }


    //3.根据筛选条件显示文章
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        q.cate_id = $('#cate').val();
        q.state = $('#state').val(); //文章状态
        getartList();
    })





    //4.分类函数
    function paging(total) {

        laypage.render({
            limits: [2, 5, 10, 20],
            elem: 'paging', //页面分页容器ID，不用加 # 号.
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, //每页显示的条数
            curr: q.pagenum, //页码
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) { //obj包含了当前分页的所有参数
                q.pagenum = obj.curr; //得到当前页,更新分页对象.
                // console.log(obj.limit); //得到每页显示的条数

                //首次不执行,切换页码.选择每页条数等分页操作时执行
                if (!first) {
                    q.pagesize = obj.limit; //得到每页显示条数,更新分页对象.
                    getartList(); //根据选择的页面刷新列表
                }
            }
        });
    }


    //5.删除文章
    $('tbody').on('click', '#delbtn', function() {
        var delId = $(this).parent().attr('index-id');
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/delete/' + delId,
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg('删除失败');
                    }
                    var num = $('tbody #delbtn').length;
                    //若当前页只剩1条数据,且页码不为1,则删除后,页码要减1
                    if (num == 1) {
                        q.pagenum = q.pagenum == 1 ? 1 : q.pagenum--;
                    }
                    getartList();
                    layer.msg('删除成功');
                }
            })
            layer.close(index);
        });
    })


    //6.修改文章
    $('tbody').on('click', '#editbtn', function() {
        var delId = $(this).parent().attr('index-id');
        location.href = '/article/art_edit.html?id=' + delId;
    })



})