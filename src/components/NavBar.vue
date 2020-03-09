<template>
  <div>
    <el-row :span="24">
      <el-col :offset="2" :span="8" class="col-fff">
        <span class="title">开发者</span>
        <router-link class="nav-link" to="/profiles">开发者</router-link>
      </el-col>
      <el-col :span="12" class="nav-right">
        <router-link to="/feed">留言</router-link>
        <router-link to="/dashboard" v-show="isLogin">Dashboard</router-link>
        <router-link to="/register" v-show="!isLogin">注册</router-link>
        <span class="col-fff">|</span>
        <router-link to="/login" v-show="!isLogin">登录</router-link>
        <!--@click.stop 阻止事件冒泡

        @click.prevent 阻止事件的默认行为，-->

        <a
          @click.prevent="logout"
          class="logout"
          v-show="isLogin"
          v-if="user !== null"
        >
          <!--                    <span class="iconfont icon-user "></span>-->
          <img :alt="user.name" :src="user.avatar" class="header-img" />
          <span class="ml-5">退出</span>
        </a>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  computed: {
    isLogin() {
      const isAuthenticated = this.$store.getters.isAuthenticated;
      if (isAuthenticated) {
        return true;
      } else {
        return false;
      }
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    logout() {
      //删除localStorage中jwtToken
      localStorage.removeItem("jwtToken");
      //干掉请求头
      this.$store.dispatch("clearCurrentState");
      //跳转登陆
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss" scoped>
$col-fff: #fff;
$col-f80: #ffffff80;
$ft20: 20px;
.col-fff {
  color: $col-fff;
  line-height: 56px;
}

a {
  color: $col-fff;
  text-decoration: none;
}

.title {
  font-size: $ft20;
  margin-right: 27px;
}

.nav-link {
  font-size: 16px;
  color: $col-f80;

  &:hover {
    color: $col-fff;
  }
}

.nav-right {
  text-align: right;
  line-height: 55px;

  .logout {
    cursor: pointer;
  }

  span {
    margin: 0 10px;
    color: $col-f80;
  }

  .ml-5 {
    margin-left: 5px;
  }

  .header-img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    vertical-align: text-bottom;
    margin-right: 10px;
  }
}
</style>
