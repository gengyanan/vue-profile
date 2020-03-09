<template>
  <div class="home">
    <el-header class="bg-34">
      <NavBar />
    </el-header>
    <el-main class="pd-0">
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-main>
    <el-footer class="pd-0">
      <Foot />
    </el-footer>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Foot from "../components/Foot";
import jwt_decode from "jwt-decode";
import Loading from "../components/common/loading";
export default {
  name: "Home",
  components: { Loading, Foot, NavBar },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  created() {
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      //获取当前时间
      const currentTime = Date.now() / 1000;
      //检测token是否过期
      if (decoded.exp < currentTime) {
        /*this.$store.dispatch("setIsAuthenticated", false);
        this.$store.dispatch("setUser", {});*/
        this.$store.dispatch("clearCurrentState");
        this.$router.push("/login");
      } else {
        //分发action 更改store的state
        this.$store.dispatch("setIsAuthenticated", !!this.isEmpty(decoded));
        this.$store.dispatch("setUser", decoded);
      }
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.bg-34 {
  height: 56px;
  background-color: #343a40;
}
.pd-0 {
  padding: 0;
}
</style>
