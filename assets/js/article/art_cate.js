$(function () {
  const form = layui.form;
  // 1、获取文章分类列表
  const initArtCateList = () => {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: (res) => {
        if (res.status !== 0) return layer.msg('');
        //调用模板引擎渲染页面
        const htmlStr = template('tpl-table', res);
        $('tbody').empty().html(htmlStr);
      },
    });
  };
  initArtCateList();

  let indexAdd = null; //关闭弹层
  // 2、在按钮的点击事件中，通过 `layer.open()` 展示弹出层，
  $('#btnAddCate').click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html(), //content 可以是string/html
    });
  });

  // 3、添加文章分类，通过事件委托
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: (res) => {
        console.log(res);
        if (res.status !== 0) return layer.msg('添加文章分类失败');
        layer.msg('添加文章分类成功');
        initArtCateList(); //渲染页面
        layer.close(indexAdd); //关闭模态框
      },
    });
  });

  // 通过事件委托方式打开编辑框
  // 通过代理方式，为 btn-edit 按钮绑定点击事件
  // 通过代理方式，为 btn-edit 按钮绑定点击事件
  let indexEdit = null;
  $('tbody').on('click', '.btn-edit', function () {
    // 弹出修改文章分类的弹窗
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html(),
    });
    // 在展示弹出层之后，根据 `id` 的值发起请求获取文章分类的数据，并填充到表单中
    // 为编辑按钮绑定 `data-id` 自定义属性
    const id = $(this).attr('data-id');
    $.ajax({
      type: 'get',
      url: '/my/article/cates/' + id,
      success: (res) => {
        if (res.status !== 0) return layer.msg('获取文章分类失败');
        form.val('form-edit', res.data);
      },
    });
  });

  // 更新文章分类
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败！');
        }
        layer.msg('更新分类数据成功！');
        initArtCateList();
        layer.close(indexEdit);
      },
    });
  });
  // 删除文章分类
  $('tbody').on('click', '.btn-delete', function () {
    const id = $(this).attr('data-id');
    // 提示用户是否删除
    layer.confirm('确定删除吗？', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        type: 'get',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) return layer.msg('删除分类失败！');
          layer.msg('删除分类成功！');
          layer.close(index);
          initArtCateList(); //
        },
      });
    });
  });

  //
});
