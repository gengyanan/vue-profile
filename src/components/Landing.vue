<template>
  <div class="bg-img">
    <div class="mask">
      <div class="land-group">
        <p class="land-dev">开发者</p>
        <p class="land-content">更多内容</p>
        <router-link to="/register">
          <el-button class="land-res" type="primary">注册</el-button>
        </router-link>
        <router-link to="/login">
          <el-button class="land-login">登录</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Landing"
};
</script>

<style lang="scss" scoped>
$col-fff: #fff;
.bg-img {
  width: 100%;
  background: url("../assets/images/showcase.jpg") no-repeat center center;
  background-size: cover;
  height: 100vh;

  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .land-group {
    padding-top: 1px;
    text-align: center;
    color: $col-fff;

    p.land-dev {
      font-size: 72px;
      font-weight: bold;
      margin: 30px 0 0;
    }

    p.land-content {
      font-size: 20px;
    }

    .land-res,
    .land-login {
      font-size: 20px;
    }

    .land-res {
      margin-right: 10px;
    }
  }
}
</style>
