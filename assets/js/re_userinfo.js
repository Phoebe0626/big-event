$.ajax({
  url: '/my/userinfo',
  success: function (res) {
    $('.username').val(res.data.username);
    $('input[name="id"]').val(res.data.id);
  }
});

$('form').on('submit', function (e) {
  e.preventDefault();
  let data = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: '/my/userinfo',
    data: data,
    success: function (res) {
      console.log(res);
      layer.msg(res.message);
      $('input[name=nickname], input[name=email]').val("");
      window.parent.renderUser();
    }
  })
})