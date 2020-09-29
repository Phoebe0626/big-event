// 修改密码 - submit
$('form').on('submit', function (e) {
  e.preventDefault();
  let form = layui.form;
  form.verify({
    len: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],

    same: function (value) {
      if (value !== $('input[name="newPwd"]').val()) {
        return '两次输入密码不一致';
      }
    },

    diff: function (value) {
      if (value == $('input[name="oldPwd"]').val()) {
        return '新密码不能和原密码相同'
      }
    }
  });
  // 发送修改密码请求
  let data = $('form').serialize();
  $.ajax({
    type: 'POST',
    url: '/my/updatepwd',
    data: data,
    success: function (res) {
      layer.msg(res.message);
      $('form input').val("");
    }
  })
})
