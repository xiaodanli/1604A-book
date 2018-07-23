require(['jquery', 'storage'], function($, storage) {
    $('.login-btn').on('click', function() {
        var username = $('#username').val();

        var pwd = $('#pwd').val();

        if (!username) {
            alert('用户不为空');
        } else if (!pwd) {
            alert('密码不能为空');
        } else {
            $.ajax({
                url: '/api/login',
                dataType: 'json',
                data: {
                    username: username,
                    pwd: pwd
                },
                type: 'post',
                success: function(res) {
                    console.log(res);
                    if (res.code === 1) {
                        storage.set('code', res.code);
                        history.go(-1);
                    } else {
                        alert(res.msg);
                    }
                },
                error: function(error) {
                    console.warn(error)
                }
            })
        }
    })
})