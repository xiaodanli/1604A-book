require(["jquery","render","text!searchTpl","lazyload","storage"],function(o,e,t,a,n){o("body").append(t);var i=o(".search-list"),r=o(".tag-wrap"),s=o(".ipt");o(".icon-back").on("click",function(){location.href="/"}),o.ajax({url:"/api/searchHot",dataType:"json",success:function(t){console.log(t),1===t.code&&e("#tag-tpl",".hot",t.data.ads)},error:function(t){console.warn(t)}}),o(".search-btn").on("click",function(){var t=s.val();t?l(t):i.html("<p>输入内容为空</p>"),r.hide(),i.show()});var c=n.get("history")||[];function l(a){c.some(function(t){return t.ad_name===a})||(c.push({ad_name:a}),n.set("history",c)),o.ajax({url:"/api/search?key="+a,dataType:"json",success:function(t){console.log(t),1===t.code&&(t.data?(e("#search-template",".search-list",t.data.items,!0),o("img[data-original]").lazyload({effect:"fadeIn",container:i})):i.html("<p>没有相应的数据</p>"))},error:function(t){console.warn(t)}})}0<c.length&&(o(".history-title").show(),e("#tag-tpl",".history",c,!0)),s.on("input",function(){o(this).val()||(r.show(),i.hide(),o(".history-title").show(),e("#tag-tpl",".history",c,!0))}),o(".tag-wrap").on("click","li",function(){var t=o(this).text();s.val(t),l(t),r.hide(),i.show()})});