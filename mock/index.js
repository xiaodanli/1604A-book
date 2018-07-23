var home = require('./mock/home.json');

var detail = require('./mock/352876.json');

var recommend1 = require('./mock/recommend/recommend1.json');
var recommend2 = require('./mock/recommend/recommend2.json');
var recommend3 = require('./mock/recommend/recommend3.json');

var searchHot = require('./mock/search-hot.json');

var searchTian = require('./mock/search-tian.json');
var searchZhu = require('./mock/search-zhu.json');

var female = require('./mock/female.json');

var detail352876 = require('./mock/352876.json');

var chapterList = require('./mock/chapter-list.json');

var dataObj = {
    "/api/index": home,
    "/api/detail": detail,
    '/api/recommend?pagenum=1': recommend1,
    '/api/recommend?pagenum=2': recommend2,
    '/api/recommend?pagenum=3': recommend3,
    '/api/searchHot': searchHot,
    '/api/search?key=诛仙': searchZhu,
    '/api/search?key=择天记': searchTian,
    '/api/list?type=female': female,
    '/api/detail?fiction_id=352876': detail352876,
    '/api/chapterList?fiction_id=352876': chapterList
}

module.exports = function(url) {
    return dataObj[url]
}