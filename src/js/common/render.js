define(['jquery', 'handlebars'], function($, handlebars) {
    var render = function(tpl, target, data, isHtml) {
        //第一步

        var source = $(tpl).html();

        //第二步

        var template = handlebars.compile(source);

        handlebars.registerHelper('first', function(index) {
            return index === 0
        })

        handlebars.registerHelper('addIndex', function(index) {
            return index + 1
        })

        //第三步

        var html = template(data);

        if (isHtml) {
            $(target).html(html);
        } else {
            $(target).append(html);
        }

    }

    return render
})