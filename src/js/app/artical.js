require(['jquery'], function($) {

    var _setWrap = $('.set-wrap');

    //点击内容
    $('.artical-content').on('click', function() {
        _setWrap.show();
    })

    //点击mask
    $('.mask').on('click', function() {
        _setWrap.hide();
        $('.set-panel').hide();
        $('.font-btn').removeClass('active');
    })

    //点击字体
    $('.font-btn').on('click', function() {
        $(this).toggleClass('active');
        $('.set-panel').toggle();
    })
})