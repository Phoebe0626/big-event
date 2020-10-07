function renderCategory() {
  $.ajax({
    url: '/my/article/cates',
    success: function (res) {
      console.log(res);
      let html = template('tpl_list', res);
      $('tbody').html(html);
    }
  })
}

renderCategory();

// ----------------------------------添加类别-----------------------------------------
$('.addbtn').on('click', function () {
  let html = $('#tpl_add').html();
  // 弹出添加框
  let index = layer.open({
    type: 1,
    title: '添加文章分类',
    content: html,
    area: ['500px', '250px']
  });

  $('.add_form').on('submit', function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: data,
      success: function (res) {
        layer.msg(res.message);
        layer.close(index);
        renderCategory();
      }
    })
  })
});