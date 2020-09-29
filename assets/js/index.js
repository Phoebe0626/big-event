// 获取用户信息，并渲染到页面
function renderUser() {
  $.ajax({
    url: '/my/userinfo',
    success: function (res) {
      console.log(res);
      if (res.data.nickname) {
        $('.userinfo .name').html(res.data.nickname);
      } else {
        $('.userinfo .name').html(res.data.username);
      };

      if (res.data.user_pic) {
        $('.layui-nav-img').attr('src', res.data.user_pic);
        $('.img_avatar').show();
      }
    }
  })
}

renderUser();