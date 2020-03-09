<template>
  <div class="loading">
    <img src="../../assets/images/loading.gif" alt="" />
  </div>
</template>

<script>
export default {
  name: "loading"
};
</script>

<style scoped>
.loading {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.loading img {
  position: absolute;
  width: 50px;
  height: 50px;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
}
</style>
