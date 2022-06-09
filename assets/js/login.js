$(function () {
  // 1、点击切换 登陆 注册 界面
  $('#link_reg').click(() => {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  $('#link_login').click(() => {
    $('.login-box').show();
    $('.reg-box').hide();
  });
  //   引入form来自layUI
  const form = layui.form;
  //   自定义校验
  form.verify({
    password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 函数的方式
    repwd: (value) => {
      //
      const pwd = $('.reg-box [name=password]').val();
      if (pwd !== value) return '两次输入的密码不一致';
    },
  });
  // 定义根路径
  //   const baseUrl = 'http://www.liulongbin.top:3007';//使用请求拦截器
  //  2、 监听表单的提交事件，发送post请求
  $('#form_reg').submit((e) => {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg('注册成功');
        // 跳转到登陆
        $('#link_login').click();
      },
    });
  });

  //  3、 监听登陆报表单提交事件，发送登录请求
  $('#form_login').submit(function (e) {
    e.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('登陆失败');
        layer.msg('登陆成功');
        // 1、将token存储到本地
        localStorage.setItem('token', res.token);
        // 2.跳转界面
        location.href = '/index.html';
      },
    });
  });
});
