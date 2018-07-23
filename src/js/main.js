require.config({
    baseUrl: '/js/',
    paths: {
        //库文件
        'jquery': './libs/jquery-2.1.1.min',
        'swiper': './libs/swiper.min',
        'bscroll': './libs/bscroll',
        'handlebars': './libs/handlebars-v4.0.11',
        'text': './libs/text',
        'lazyload': './libs/jquery.lazyload',

        //公用的
        'getSlideDirection': './common/direction',
        'render': './common/render',
        'storage': './common/storage',
        'getRequest': './common/getRequest',

        //页面js

        'index': './app/index',
        'search': './app/search',
        'list': './app/list',
        'detail': './app/detail',
        'chapterList': './app/chapter-list',
        'login': './app/login',
        'artical': './app/artical',

        //模板
        'bookTB': '../page/tpl/book-t-b.html',
        'bookLR': '../page/tpl/book-l-r-list.html',
        'indexTpl': '../page/tpl/index-tpl.html',
        'searchTpl': '../page/tpl/book-l-r-s-list.html',
        'listTpl': '../page/tpl/list.html',
        'detailTpl': '../page/tpl/detail.html'
    },
    shim: {
        'lazyload': {
            deps: ['jquery']
        }
    }
})