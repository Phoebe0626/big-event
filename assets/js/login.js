// ------------------------------点击 a 链接 - 切换两个盒子---------------------------------
$('.layui-form-item a').on('click', function () {
  $(this).parents('form').hide().siblings().show();
});

// ---------------------------------注册按钮 - 点击事件-------------------------------------
$('.register').on('submit', function (e) {
  e.preventDefault();

  let form = layui.form;

  form.verify({
    // 验证密码长度
    len: [/^[\S]{6,12}$/, '请输入6-12位的密码'],
    // 验证两次密码是否一致
    same: function (value) { //value：表单的值、item：表单的DOM对象
      if (value !== $('.register input[name="password"]').val()) {
        return '两次输入密码不一致';
      }
    }
  });


  let data = $('.register').serialize();
  // 发送ajax请求, 注册账号
  $.ajax({
    type: 'POST',
    url: '/api/reguser',
    data: data,
    success: function (res) {
      layer.msg('注册成功，请登录');
      // 注册成功, 返回登录页面
      location.href = '/login.html';
    }
  })
});


// ---------------------------------登录按钮 - 点击事件-------------------------------------
$('.login').on('submit', function (e) {
  e.preventDefault();
  let data = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: '/api/login',
    data: data,
    success: function (res) {
      localStorage.setItem('token', res.token);
      location.href = '/index.html';
    }
  })
})

