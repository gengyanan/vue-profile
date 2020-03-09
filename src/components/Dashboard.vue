<template>
  <div class="dashboard">
    <h1 class="display-4">Dashboard</h1>
    <p class="lead" v-if="user !== null">Welcome {{ user.name }}</p>
    <h4 v-if="profile != null">
      <!-- 编辑个人信息  添加个人经历 添加教育经历 -->
      <ProfileActived />
      <!--展示个人经历-->
      <experience
        :experience="profile.experience"
        @deleteExperience="handleDeleteExp"
      />
      <!--展示教育经历-->
      <education
        :education="profile.education"
        @deleteEducation="handleDeleteEdu"
      ></education>
      <!--删除账户按钮-->
      <div>
        <el-button class="btn btn-danger" @click="deleteClick"
          >删除当前账户</el-button
        >
      </div>
    </h4>
    <div v-else>
      <p>没有任何相关的个人信息，请添加您的个人信息</p>
      <router-link class="btn-group" to="/create-profile">
        <el-button class="btn" type="primary">添加个人信息</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import ProfileActived from "./common/ProfileActived";
import Experience from "./common/Experience";
import Education from "./common/Education";
export default {
  name: "Dashboard",
  components: { Education, Experience, ProfileActived },
  data() {
    return {
      profile: null
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    async getProfileData() {
      try {
        const res = await this.$axios.get("/api/profile");
        const { data } = res;
        if (data) {
          this.profile = data;
          this.$store.dispatch("setProfile", this.profile);
        } else {
          this.$store.dispatch("setProfile", null);
        }
      } catch (err) {
        this.$store.dispatch("setProfile", null);
      }
    },
    //删除当前账户
    async deleteClick() {
      try {
        const res = await this.$axios.delete("/api/profile");
        if (res) {
          this.profile = res;
          //更新store
          this.$store.dispatch("clearCurrentstate");
          this.$router.push({ name: "Login" });
        }
      } catch (err) {
        console.log(err);
      }
    },
    //删除个人经历
    async handleDeleteExp(id) {
      const url = `api/profile/experience/${id}`;
      const res = await this.$axios.delete(url);
      this.profile = res.data;
    },
    //删除教育经历
    async handleDeleteEdu(id) {
      const url = `api/profile/education/${id}`;
      const res = await this.$axios.delete(url);
      this.profile = res.data;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getProfileData();
    });
  }
};
</script>

<style scoped>
.display-4 {
  text-align: center;
  display: block;
}

.lead,
h4,
p,
.btn,
.btn-group {
  text-align: center;
}

.btn-group {
  display: list-item;
  margin-bottom: 50px;
}
</style>
