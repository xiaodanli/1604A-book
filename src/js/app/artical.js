require(['jquery', 'storage', 'getRequest', 'base64', 'render'], function($, storage, getRequest, base64, render) {

    var _setWrap = $('.set-wrap');

    var fiction_id = getRequest.fiction_id;

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

    var bg = storage.get('bg') || '#f7eee5'; //默认的背景 第一个

    var index = storage.get('index') || 0; //active 是第一个

    var tag = storage.get('tag') || '夜间';

    var status = tag === '夜间' ? true : false; //白天的状态 ----->字显示是夜间

    var _dayBtn = $('.day-btn'),
        _articalCon = $('.artical-content'),
        _libgs = $(".bg-list li");

    if (status) {
        lightStatus();
    } else {
        nightStatus();
    }

    $('.bg-list').on('click', 'li', function() {
        bg = $(this).attr('data-bg');
        index = $(this).index();
        if (status) {
            $('.artical-content').css('background', bg);
        }

        $(this).addClass('active').siblings().removeClass('active');
        storage.set('bg', bg);

        storage.set('index', index);
    })

    //点击白天和黑夜

    $('.day-btn').on('click', function() {
        status = !status;

        if (status) {
            lightStatus();
        } else {
            nightStatus();
        }

        var tag = status ? '夜间' : '白天';
        storage.set('tag', tag);
    })

    //白天的状态
    function lightStatus() {
        _dayBtn.find('dd').text('夜间');
        _dayBtn.removeClass('light');
        _articalCon.css('background', bg);

        _libgs.eq(index).addClass('active').siblings().removeClass('active');
    }

    //夜间的状态
    function nightStatus() {
        _dayBtn.find('dd').text('白天');
        _dayBtn.addClass('light');

        _articalCon.css('background', '#0f1410');
        _libgs.eq(5).addClass('active').siblings().removeClass('active');
    }

    //请求章节数
    $.ajax({
        url: '/api/chapterList?fiction_id=' + fiction_id,
        dataType: 'json',
        success: function(res) {
            if (res.code === 1) {
                $('.total').html(res.data.item.toc.length);
            }
        },
        error: function(error) {
            console.warn(error);
        }
    })

    var _cur = $('.cur');

    var chapter_id = storage.get(fiction_id) || 1; //请求第一章的数据

    var already = storage.get(fiction_id + 'already') || [];

    var _cur = $('.cur');

    _cur.html(chapter_id);

    getArtical(chapter_id);

    //点击上一章

    $('.prev').on('click', function() {
        if (chapter_id > 1) {
            chapter_id--;
            var _cur = $('.cur');
            $('.cur').html(chapter_id);
            getArtical(chapter_id);
            storage.set(fiction_id, chapter_id);
        } else {
            alert('已经到第一章');
        }
    })

    //点击下一章
    $('.next').on('click', function() {
        if (chapter_id < 4) {
            chapter_id++;
            var _cur = $('.cur');
            $('.cur').html(chapter_id);
            getArtical(chapter_id);
            storage.set(fiction_id, chapter_id);
        } else {
            alert('已经到最后一章');
        }
    })




    //请求内容
    function getArtical(chapter_id) {
        $.ajax({
            url: '/api/artical?fiction_id=' + fiction_id + '&chapter_id=' + chapter_id,
            dataType: 'json',
            success: function(res) {
                console.log(res);

                if (res.code === 1) {
                    if (already.indexOf(chapter_id) == -1) {
                        already.push(chapter_id);
                        storage.set(fiction_id + 'already', already);
                    }

                    var script = document.createElement('script');
                    script.src = res.data.jsonp;
                    window.duokan_fiction_chapter = function(data) {
                        var articalCon = JSON.parse($.base64().decode(data));
                        render('#artical-tpl', '.artical-content', articalCon, true);
                        $('.artical-content p').css('fontSize', initFz / 37.5 * 1 + 'rem');
                    }
                    document.body.appendChild(script);
                }

            },
            error: function(error) {
                console.warn(error)
            }
        })
    }

    //点击目录
    $('.chapter-btn').on('click', function() {
        location.href = '../../page/chapter-list.html?fiction_id=' + fiction_id + '&chapter_id=' + chapter_id;
    })

    //点击返回
    $('.icon-cricle-back').on('click', function() {
        location.href = '../../page/detail.html?fiction_id=' + fiction_id;
    })

})