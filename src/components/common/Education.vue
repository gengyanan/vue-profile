<template>
  <div class="create-form">
    <el-col :span="24">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb :to="{ path: '/dashboard' }">
          <i class="el-icon-d-arrow-left back">返回</i>
        </el-breadcrumb>
      </el-breadcrumb>
    </el-col>
    <h3 class="t-c">添加教育经历</h3>
    <p class="t-c">你所毕业的学校，参加的培训等</p>
    <p>*为必填项</p>
    <el-form :model="EducationForm" :rules="rules" ref="EducationForm">
      <el-form-item prop="school">
        <el-input
          type="text"
          name="school"
          v-model="EducationForm.school"
          placeholder="* 学校或培训"
        ></el-input>
      </el-form-item>

      <el-form-item prop="degree">
        <el-input
          placeholder="*学历"
          v-model="EducationForm.degree"
          type="text"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-input
          placeholder="专业"
          v-model="EducationForm.fieldofstudy"
          type="text"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          type="date"
          placeholder="开始时间"
          v-model="EducationForm.from"
          style="width: 100%"
          @change="startData"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          type="date"
          placeholder="结束时间"
          v-model="EducationForm.to"
          style="width: 100%"
          @change="endData"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-checkbox-group v-model="EducationForm.current">
          <el-checkbox>当前在校</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-input
          type="textarea"
          placeholder="在校表现"
          v-model="EducationForm.description"
        ></el-input>
        <p>说说你在学习过程的经历</p>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="edu-w100"
          @click="handleEducation('EducationForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Education",
  data() {
    return {
      EducationForm: {
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: "",
        description: ""
      },
      rules: {
        school: [
          { required: true, message: "学校培训必须不能为空！", trigger: "blur" }
        ],
        degree: [
          {
            required: true,
            message: "学历不能为空！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    startData(state) {
      this.EducationForm.from = state;
    },
    endData(end) {
      this.EducationForm.to = end;
    },
    handleEducation(name) {
      this.$refs[name].validate(async volid => {
        try {
          if (volid) {
            const url = "/api/profile/education";
            const res = await this.$axios.post(url, this.EducationForm);
            if (res) {
              this.errors = {};
              this.$router.push("/dashboard");
            } else {
              console.log("信息出错");
            }
          }
        } catch (error) {
          this.errors = error.response.data;
        }
      });
    }
  }
};
</script>

<style scoped>
.create-form {
  width: 720px;
  margin: 0 auto;
}
.back {
  color: red;
  font-size: 12px;
  font-weight: bold;
}
.edu-w100 {
  width: 100%;
}
</style>
