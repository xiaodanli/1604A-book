require(['jquery', 'render', 'getRequest', 'bscroll'], function($, render, getRequest, bscroll) {
    var fiction_id = getRequest.fiction_id;

    $.ajax({
        url: '/api/chapterList?fiction_id=' + fiction_id,
        dataType: 'json',
        success: function(res) {
            if (res.code === 1) {
                render('#chapter-template', '.chapter-list', res.data.item.toc);
                var chapterScroll = new bscroll('.chapter-wrap', {
                    click: true
                })

                var last = $('.chapter-list li').length - 1;
                chapterScroll.scrollToElement($('.chapter-list li').eq(last)[0]);
            }
        },
        error: function(error) {
            console.warn(error);
        }
    })

    $('.icon-back').on('click', function() {
        location.href = '../../page/detail.html?fiction_id=' + fiction_id;
    })
})