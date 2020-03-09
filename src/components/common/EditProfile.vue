<template>
  <el-row>
    <el-container>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/dashboard' }">
            <i class="el-icon-d-arrow-left back">返回</i>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="breadcrumb">
          <h3 class=" t-c">编辑个人资料</h3>
          <p class="t-c">填写您的个人资料，让我们更多的了解你！</p>
          <p class="t-l">*表示必填项</p>
        </div>
        <edit-text-field-group :createForm="createForm"></edit-text-field-group>
      </el-col>
    </el-container>
  </el-row>
</template>
<script>
import EditTextFieldGroup from "./EditTextFieldGroup";
export default {
  name: "EditProfile",
  components: { EditTextFieldGroup },
  data() {
    return {
      createForm: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let profile = vm.$store.getters.profile;
      profile.company = profile.company ? profile.company : "";
      profile.website = profile.website ? profile.website : "";
      profile.location = profile.bocation ? profile.bocation : "";
      profile.githubusername = profile.githubusername
        ? profile.githubusername
        : "";
      profile.social = profile.social ? profile.social : {};
      profile.wechat = profile.social.wechat ? profile.social.wechat : "";
      profile.QQ = profile.social.QQ ? profile.social.QQ : "";
      profile.tengxunkt = profile.social.tengxunkt
        ? profile.social.tengxunkt
        : "";
      profile.wangyikt = profile.social.wangyikt ? profile.social.wangyikt : "";
      profile.skills = profile.skills.length ? profile.skills.join(",") : "";
      vm.createForm = profile;
    });
  }
};
</script>
<style scoped>
.breadcrumb {
  width: 720px;
  margin: 20px auto;
}
.t-c {
  text-align: center;
}
.back {
  cursor: pointer;
  color: red;
}
</style>
