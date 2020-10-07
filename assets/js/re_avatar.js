// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')

// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options);


// ------------------------ 点击 上传 触发input选择文件 ----------------------
$('button:contains("上传")').on('click', function () {
  $('#file').trigger('click');
});


// ----------------------------- 更换剪裁区的图片 ---------------------------
$('#file').on('change', function () {
  let fileObj = this.files[0];
  let url = URL.createObjectURL(fileObj);
  $image.cropper('destroy').attr('src', url).cropper(options);
});


//  ----------------------------- 上传修改的图片 ---------------------------
$('button:contains("确定")').on('click', function () {
  let canvas = $image.cropper('getCroppedCanvas', {
    width: 100,
    height: 100
  });
  let str = canvas.toDataURL('image/png');
  $.ajax({
    type: 'POST',
    url: '/my/update/avatar',
    data: {
      avatar: str
    },
    success: function (res) {
      layer.msg(res.message);
      if (res.status === 0) {
        window.parent.renderUser();
      }
    }
  })
})
