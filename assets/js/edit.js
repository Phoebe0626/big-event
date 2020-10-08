let form = layui.form;



// 获取地址栏的id
let id = new URLSearchParams(location.search).get('id');



// 获取下拉框内文章类别
$.ajax({
  url: '/my/article/cates',
  success: function (res) {
    let html = template('tpl_category', res);
    $('select').html(html);
    form.render('select');
    // 发送请求获取文章详情，并完成数据回填
    $.ajax({
      url: '/my/article/' + id,
      success: function (res) {
        console.log(res);
        form.val('form', res.data);
        // 将textarea区域更换为富文本编辑器
        initEditor();
        $image.cropper('destroy').attr('src', 'http://ajax.frontend.itheima.net' + res.data.cover_img).cropper(options);
      }

    });
  }
});

// 封面剪裁
let $image = $('#image');
let options = {
  aspectRatio: 22 / 15,
  preview: '.img-preview',
  autoCropArea: 1
};
$image.cropper(options);

// 选择封面 - 点击事件
$('button:contains("选择封面")').on('click', function () {
  $('#file').click();
})

$('#file').on('change', function () {
  console.log(this.files[0]);
  let fileObj = this.files[0];
  let url = URL.createObjectURL(fileObj);
  $image.cropper('destroy').attr('src', url).cropper(options);
});

// 发布文章
$('form').on('submit', function (e) {
  e.preventDefault();

  let fd = new FormData(this);
  fd.set('content', tinyMCE.activeEditor.getContent());

  let canvas = $image.cropper('getCroppedCanvas', {
    width: 400,
    height: 280
  });
  // 把图片转换为blob形式
  canvas.toBlob(function (blob) {
    fd.append('cover_img', blob);
    fd.append('Id', id);
    $.ajax({
      type: 'POST',
      url: '/my/article/edit',
      data: fd,
      processData: false,
      contentType: false,
      success: function (res) {
        if (res.status === 0) {
          console.log(fd.get('state'));
          location.href = '/home/artical.html';
        }
      }
    });
  });



});
