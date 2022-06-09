//获取用户信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token"),
    // },
    success: (res) => {
      console.log(res);
      if (res.status !== 0) return layer.msg(res.message);
      layer.msg("获取用户信息成功！");
      renderAvatar(res.data);
    },
  });
}
//渲染用户信息
const renderAvatar = (user) => {
  const name = user.nickname || user.username;
  // 设置欢迎文本
  $("#welcome").html(`欢迎 ${name}`);
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 渲染文本头像
    $(".layui-nav-img").hide();
    let firstName = name[0].toUpperCase();
    $(".text-avatar").html(firstName).show();
  }
};
//退出效果
// 退出登录
$("#btnLogout").click(() => {
  layui.layer.confirm(
    "确定退出登录？",
    { icon: 3, title: "提示" },
    function (index) {
      // 清空本地存储里面的 token
      localStorage.removeItem("token");
      // 重新跳转到登录页面
      location.href = "/login.html";
    }
  );
});
getUserInfo();
