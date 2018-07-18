define(function() {
    var storage = window.localStorage;

    //setItem(key,val)  注：val必须是字符串

    //getItem(key)   removeItem(key)  clear()  删除所有的

    var storageObj = {
        set: function(key, val) {
            if (!val) {
                storage.removeItem(key);
            } else {
                storage.setItem(key, JSON.stringify(val))
            }

        },
        get: function(key) {
            var val = JSON.parse(storage.getItem(key));

            return val
        },

        remove: function(key) {
            storage.removeItem(key)
        },

        clear: function() {
            storage.clear()
        }
    };

    return storageObj
})