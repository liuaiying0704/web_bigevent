//不能写入口函数，window.获取不到。
// - 定义 `getUserInfo` 函数，当页面加载完毕之后调用这个函数
// - 利用 `$.ajax()` 进行网络请求，查阅文档，获取关键信息
// 请求的时候就需要设置请求头信息，把我们获取到的 `token` 传递给后台
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // baseUrl
    // headers: { Authorization: localStorage.getItem('token') },
    success: (res) => {
      console.log(res);
      if (res.status !== 0) return layer.msg(res.message);
      layer.msg('获取用户信息成功');
      //   调用渲染函数
      renderAvatar(res.data);
    },

    //5、控制用户的访问权限.  用户如果没有登录，是不能够允许用户访问后台主页.
    // 不论成功还是失败，最终都会调用 complete 回调函数

    // 移至baseAPI.js
  });
}

// 二、渲染用户信息
const renderAvatar = (user) => {
  const name = user.nickname || user.username;
  // 设置欢迎文本
  $('#welcome').html(`欢迎 ${name}`);
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    // 渲染文本头像
    $('.layui-nav-img').hide();
    let firstName = name[0].toUpperCase();
    $('.text-avatar').html(firstName).show();
  }
};

// 退出登陆
$('#btnlogout').click(() => {
  layer.confirm('是否退出登陆？', { icon: 3, title: '提示' }, function () {
    // 1清除本地存储的token
    localStorage.removeItem('token');
    // 2 跳转到首页
    location.href = '/login.html';
  });
});
// 获取用户列表
getUserInfo();
