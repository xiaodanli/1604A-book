define(["jquery","handlebars"],function(d,f){return function(e,r,n,t){var i=d(e).html(),u=f.compile(i);f.registerHelper("first",function(e){return 0===e}),f.registerHelper("addIndex",function(e){return e+1});var a=u(n);t?d(r).html(a):d(r).append(a)}});