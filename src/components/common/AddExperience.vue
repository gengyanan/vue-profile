<template>
  <div class="create-form">
    <el-col :span="24">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/dashboard' }">
          <i class="el-icon-d-arrow-left back">返回</i>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <h3 class="t-c">添加个人经历</h3>
    <p class="t-c">有关于工作的任何经验</p>
    <p>*为必填项</p>
    <el-form :model="AddForm" :rules="rules" ref="AddForm">
      <el-form-item prop="title">
        <el-input placeholder="*工作内容" v-model="AddForm.title"></el-input>
      </el-form-item>
      <p class="errors">{{ errors.title }}</p>
      <el-form-item prop="company">
        <el-input placeholder="*公司" v-model="AddForm.company"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="地点" v-model="AddForm.location"></el-input>
      </el-form-item>
      <h4>开始时间</h4>
      <el-form-item>
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="AddForm.from"
          style="width: 100%;"
          @change="startData"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <h6>结束时间</h6>
      <el-form-item>
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="AddForm.to"
          style="width: 100%;"
          @change="endData"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-checkbox-group v-model="AddForm.type">
          <el-checkbox label="" name="type">当前在职</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-input
          type="textarea"
          placeholder="工作描述"
          :row="2"
          v-model="AddForm.description"
        >
        </el-input>
      </el-form-item>
      <p>其他工作职责等</p>
      <el-form>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleAdd('AddForm')"
            class="add-btn"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddExperience",
  data() {
    return {
      AddForm: {
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        type: "",
        description: ""
      },
      rules: {
        title: [
          { required: true, message: "工作内容不能为空！", trigger: "blur" }
        ],
        company: [
          {
            required: true,
            message: "公司不能为空！",
            trigger: "blur"
          }
        ],
        from: [
          {
            required: true,
            message: "工作经历不能为空！",
            trigger: "blur"
          }
        ]
      },
      errors: {
        title: "",
        company: ""
      }
    };
  },
  methods: {
    startData(data) {
      this.AddForm.from = data;
    },
    endData(data) {
      this.AddForm.to = data;
    },
    handleAdd(name) {
      this.$refs[name].validate(async volid => {
        if (volid) {
          try {
            await this.$axios.post("/api/profile/experience", this.AddForm);
            this.errors = {};
            this.$router.push("/dashboard");
          } catch (error) {
            this.errors = error.response.data;
          }
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
.t-c {
  text-align: center;
}
.add-btn {
  display: block;
  width: 100%;
}
.errors {
  font-size: 12px;
  color: red;
}
.back {
  cursor: pointer;
  color: red;
}
</style>
