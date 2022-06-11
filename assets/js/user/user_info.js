$(function () {
  const form = layui.form;
  //   1、自定义检测规则
  form.verify({
    nickname: (value) => {
      if (value.length > 6) return '昵称长度不能超过6个字符';
    },
  });
  // 2、获取用户基本信息
  const initUserInfo = () => {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: (res) => {
        if (res.status !== 0) return layer.msg('获取用户信息失败');
        layer.msg('获取用户信息成功');
        // console.log(res);
        // 3、调用 `form.val()` 方法为表单赋值
        form.val('formUserInfo', res.data);
      },
    });
  };
  initUserInfo();
  //  4、 重置表单
  $('#btnReset').click((e) => {
    e.preventDefault();
    initUserInfo();
  });
  //  5、更新用户信息
  $('.layui-form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: (res) => {
        console.log(res);
        if (res.status !== 0) return layer.msg('更新用户信息失败');
        layer.msg('更新用户信息成功');
        // 通知父页面，更新用户信息
        window.parent.getUserInfo();
      },
    });
  });

  //
});
