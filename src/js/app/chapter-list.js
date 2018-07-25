require(['jquery', 'render', 'getRequest', 'bscroll', 'storage'], function($, render, getRequest, bscroll, storage) {
    var fiction_id = getRequest.fiction_id;

    $.ajax({
        url: '/api/chapterList?fiction_id=' + fiction_id,
        dataType: 'json',
        success: function(res) {
            if (res.code === 1) {
                var already = storage.get(fiction_id + 'already') || [];
                already.forEach(function(item) {
                    res.data.item.toc[item].already = true;
                })
                render('#chapter-template', '.chapter-list', res.data.item.toc);
                var chapterScroll = new bscroll('.chapter-wrap', {
                    click: true
                })
                var target = getRequest.chapter_id || $('.chapter-list li').length - 1;

                chapterScroll.scrollToElement($('.chapter-list li').eq(target)[0]);
            }
        },
        error: function(error) {
            console.warn(error);
        }
    })

    //点击返回
    $('.icon-back').on('click', function() {
        if (getRequest.chapter_id) {
            location.href = '../../page/aritcal.html?fiction_id=' + fiction_id + '&chapter_id=' + getRequest.chapter_id;
        } else {
            location.href = '../../page/detail.html?fiction_id=' + fiction_id;
        }
    })

    //点击列表
    $('.chapter-list').on('click', 'li', function() {
        var chapter_id = $(this).attr('data-id');
        storage.set(fiction_id, chapter_id);
        location.href = '../../page/aritcal.html?fiction_id=' + fiction_id;
    })
})