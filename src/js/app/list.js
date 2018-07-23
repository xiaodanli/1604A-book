require(['jquery', 'render', 'text!listTpl', 'getRequest', 'lazyload'], function($, render, listTpl, getRequest, lazy) {

    $('body').append(listTpl);

    var type = getRequest.type;

    var _listContent = $('.list-content');

    getList();

    function getList() {
        $.ajax({
            url: '/api/list?type=' + type,
            dataType: 'json',
            success: function(res) {
                if (res.code === 1) {
                    render("#list-tpl", '.list-wrap', res.data.items);
                    $('img[data-original]').lazyload({
                        container: _listContent
                    })
                    _listContent.on('scroll', loadmore);
                }
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }

    var listConHeight = _listContent.height(); //盒子
    function loadmore() {
        var conHeight = $('.list-wrap').height(); //内容

        var maxScrollHeight = conHeight - listConHeight;
        if (_listContent.scrollTop() > maxScrollHeight - 40) {
            _listContent.off('scroll');
            getList();
        }
    }

    //点击icon-back
    $('.icon-back').on('click', function() {
        location.href = "/"
    })
})