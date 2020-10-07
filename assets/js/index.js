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
      } else {
        let str = (res.data.username).slice(0, 1).toUpperCase();
        $('.text_avatar').html(str).css('display', 'inline-block');
      }
    }
  })
}

renderUser();