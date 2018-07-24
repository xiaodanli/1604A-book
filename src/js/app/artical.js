require(['jquery', 'storage'], function($, storage) {

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

    //点击大
    var initFz = storage.get('fz') || 14,
        maxFz = 30,
        minFz = 10;

    $('.artical-content p').css('fontSize', initFz / 37.5 * 1 + 'rem');

    $('.big-btn').on('click', function() {
        if (initFz < maxFz) {
            initFz += 2;
        }
        $('.artical-content p').css('fontSize', initFz / 37.5 * 1 + 'rem');
        storage.set('fz', initFz);
    })

    //点击小

    $('.small-btn').on('click', function() {
        if (initFz > minFz) {
            initFz -= 2;
        }
        $('.artical-content p').css('fontSize', initFz / 37.5 * 1 + 'rem');
        storage.set('fz', initFz);
    })

    //初始的状态

    var bg = storage.get('bg') || '#f7eee5';

    var tag = storage.get('tag') || '夜间';
    var status = tag === '夜间' ? true : false;

    var index = storage.get('index') || 0;

    var _dayBtn = $('.day-btn');

    if (status) {
        _dayBtn.find('dd').text('夜间');
        _dayBtn.removeClass('light');
        $('.artical-content').css('background', bg);
        $('.bg-list li').eq(index).addClass('active').siblings().removeClass('active');
    } else {
        _dayBtn.find('dd').text('白天');
        _dayBtn.addClass('light');
        $('.artical-content').css('background', '#0f1410');
        $('.bg-list li').eq(5).addClass('active').siblings().removeClass('active');
    }

    //切换背景
    $('.bg-list').on('click', 'li', function() {
        var index = $(this).index();
        bg = $(this).attr('data-bg');
        storage.set('bg', bg);
        storage.set('index', index);
        if (status) {
            $('.artical-content').css('background', bg);
        }
        $(this).addClass('active').siblings().removeClass('active');
    })

    //点击白天和黑夜
    $('.day-btn').on('click', function() {
        //status true  白天的状态 ---- >夜间
        //status false  夜间的状态 ----->白天
        status = !status;
        if (status) {
            $(this).find('dd').text('夜间');
            $(this).removeClass('light');
            $('.artical-content').css('background', bg);
        } else {
            $(this).find('dd').text('白天');
            $(this).addClass('light');
            $('.artical-content').css('background', '#0f1410');
            $('.bg-list li').eq(5).addClass('active').siblings().removeClass('active');
        }
        var tag = status === true ? '夜间' : '白天';
        storage.set('tag', tag);
    })






})