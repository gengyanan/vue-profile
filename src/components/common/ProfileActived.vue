<template>
  <div class="btn-group mb-4" role="group">
    <router-link to="/edit-profile" class="btn btn-light">
      <i class="iconfont icon-bianji"></i>
      编辑个人信息
    </router-link>
    <router-link to="/add-experience" class="btn btn-light">
      <i class="iconfont icon-icon-test"></i>
      添加个人经历
    </router-link>
    <router-link to="/add-education" class="btn btn-light">
      <i class="iconfont icon-icon-test"></i>
      添加教育经历
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ProfileActived"
};
</script>

<style scoped>
.btn {
  text-decoration: none;
  margin-right: 10px;
  color: #18a2b8;
  margin-top: 30px;
}
.btn-group {
  margin-top: 30px;
}
</style>
