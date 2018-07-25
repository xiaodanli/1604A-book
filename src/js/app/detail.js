require(['jquery', 'render', 'getRequest', 'text!detailTpl', 'text!bookTB', 'storage'], function($, render, getRequest, detailTpl, bookTB, storage) {

    $('body').append(detailTpl);
    $('body').append(bookTB);

    var fiction_id = getRequest.fiction_id;

    console.log(fiction_id);

    $.ajax({
        url: '/api/detail?fiction_id=' + fiction_id,
        dataType: 'json',
        success: function(res) {
            console.log(res);
            if (res.code === 1) {

                // 渲染top
                render('#detail-template', '#detail', res.data.item);

                //渲染类别
                render('#tag-template', '.type-tags', res.data.item);

                //渲染相关书籍
                render('#book-t-b', '#other-list', res.data.related);

                //版权信息
                render('#copyright-template', '.copyright', res.data.item);

                $('#start-btn').on('click', function() {
                    var code = storage.get('code') || 0;
                    if (code) {
                        location.href = '../../page/aritcal.html?fiction_id=' + fiction_id;
                    } else {
                        location.href = '../../page/login.html';
                    }

                })
            }
        },
        error: function(error) {
            console.log(error)
        }
    })

    $('.icon-back').on('click', function() {
        location.href = '/';
    })


})