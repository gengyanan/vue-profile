<template>
  <el-row>
    <el-container>
      <el-col :span="24">
        <el-breadcrumb class="back-group">
          <el-breadcrumb-item :to="{ path: '/dashboard' }">
            <i class="el-icon-d-arrow-left back">返回</i>
          </el-breadcrumb-item>
        </el-breadcrumb>

        <div class="breadcrumb">
          <h3 class=" t-c">添加个人资料</h3>
          <p class="t-c">填写您的个人资料，让我们更多的了解你！</p>
          <p class="t-l">*表示必填项</p>
        </div>
        <text-field-group :createForm="createForm"></text-field-group>
      </el-col>
    </el-container>
  </el-row>
</template>

<script>
import TextFieldGroup from "./TextFieldGroup";

export default {
  name: "CreateProfile",
  components: { TextFieldGroup },
  data() {
    return {
      createForm: {
        handle: "",
        status: "",
        company: "",
        website: "",
        location: "",
        skills: "",
        githubusername: "",
        bio: "",
        wechat: "",
        QQ: "",
        tengxunkt: "",
        wangyikt: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 22px;
}

.lead {
  font-size: 15px;
}

.t-c {
  text-align: center;
}

.t-r {
  text-align: right;
}
.breadcrumb {
  width: 720px;
  margin: 0 auto;
}
.back-group {
  width: 720px;
  margin: 20px auto;
}
</style>
