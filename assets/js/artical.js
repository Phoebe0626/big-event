let form = layui.form;
let laypage = layui.laypage;

let data = {
  pagenum: 1,
  pagesize: 2
}

// ----------------------------------获取下拉框内所有分类-------------------------------
$.ajax({
  url: '/my/article/cates',
  success: function (res) {
    let html = template('tpl_category', res);
    $('select[name="category"]').html(html);
    // 动态插入的表单元素 - 需要更新渲染
    form.render('select');
  }
});

// ----------------------------------获取文章列表并渲染到页面-------------------------------
function renderArticle() {

  $.ajax({
    url: '/my/article/list',
    data: data,
    success: function (res) {
      console.log(res);
      let html = template("tpl_artical", res);
      $('tbody').html(html);
      showPage(res.total);
    }

  })
}

renderArticle();



// -----------------------------------------分页-------------------------------------------
function showPage(t) {
  layui.use('laypage', function () {
    //执行一个laypage实例
    laypage.render({
      elem: 'laypage',
      count: t,
      limit: data.pagesize,
      limits: [2, 3, 5, 10],
      curr: data.pagenum,
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      jump: function (obj, first) {
        //首次不执行
        if (!first) {
          data.pagenum = obj.curr;
          data.pagesize = obj.limit;
          renderArticle();
        }
      }
    });
  });
}



// ----------------------------------注册模板过滤器-------------------------------
template.defaults.imports.dateFormat = function (str) {
  let date = new Date(str);
  let y = addZero(date.getFullYear());
  let m = addZero(date.getMonth() + 1);
  let d = addZero(date.getDate());
  let h = addZero(date.getHours());
  let i = addZero(date.getMinutes());
  let s = addZero(date.getSeconds());
  return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
}

function addZero(n) {
  return n < 10 ? '0' + n : n;
}

// ----------------------------------下拉框筛选-------------------------------
$('.search').on('submit', function (e) {
  e.preventDefault();
  let p = $(this).serializeArray();
  data.cate_id = p[0].value;
  data.state = p[1].value;
  data.pagenum = 1;
  renderArticle();
});

// ----------------------------------删除文章-------------------------------
$('tbody').on('click', 'button:contains("删除")', function () {
  let id = $(this).data('id');
  layer.confirm('确定删除吗', function (index) {
    $.ajax({
      url: '/my/article/delete/' + id,
      success: function (res) {
        if (res.status === 0) {
          layer.msg(res.message);
          renderArticle();
        }
      }
    })
    layer.close(index);
  });
});


