<template>
  <div class="reg-w">
    <h3>注册</h3>
    <p>创建新的账户</p>
    <el-form :model="regForm" :rules="rules" ref="regForm">
      <el-form-item prop="name" :class="[isName ? 'mb-0' : 'mb-20']">
        <el-input
          placeholder="用户名"
          v-model="regForm.name"
          :class="{ is_validate: errors.name }"
          >用户名</el-input
        >
        <p v-if="errors.name" class="invail">
          {{ errors.name }}
        </p>
      </el-form-item>
      <el-form-item prop="email" :class="[isEmail ? 'mb-0' : 'mb-20']">
        <el-input
          placeholder="邮箱地址"
          v-model="regForm.email"
          :class="{ is_validate: errors.email }"
          >地址</el-input
        >
        <p v-if="errors.email" class="invail">
          {{ errors.email }}
        </p>
      </el-form-item>
      <el-form-item prop="password" :class="[isPsw ? 'mb-0' : 'mb-20']">
        <el-input
          placeholder="密码"
          v-model="regForm.password"
          :class="{ is_validate: errors.password }"
          >密码</el-input
        >
        <p v-if="errors.password" class="invail">
          {{ errors.password }}
        </p>
      </el-form-item>
      <el-form-item prop="password2" :class="[isPsw ? 'mb-0' : 'mb-20']">
        <el-input
          placeholder="确认密码"
          v-model="regForm.password2"
          :class="{ is_validate: errors.password2 }"
          >确认密码</el-input
        >
        <p v-if="errors.password2" class="invail">
          {{ errors.password2 }}
        </p>
      </el-form-item>
      <el-form-item>
        <el-button @click="regHandle('regForm')" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      regForm: {
        name: "",
        email: "",
        password: "",
        password2: ""
      },
      errors: {
        name: "",
        email: "",
        password: ""
      },
      isEmail: false,
      isPsw: false,
      isName: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"]
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"]
          }
        ],

        password2: [
          {
            required: true,
            message: "请输入密码2",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    regHandle(name) {
      this.$refs[name].validate(volid => {
        if (volid) {
          const url = "/api/users/register";
          this.$axios
            .post(url, this.regForm)
            .then(res => {
              //执行mutation操作
              // this.$store.commit('setUser',res.data)
              //执行actions异步操作
              this.$store.dispatch("setUser", res.data);
              //页面跳转
              this.$router.push({ name: "Login" });
            })
            .catch(error => {
              if (error.response.data) {
                this.errors = error.response.data;
                this.isName = this.errors.name ? true : false;
                this.isEmail = this.errors.email ? true : false;
                this.isPsw = this.errors.password ? true : false;
              }
            });
        }
      });
    }
  }
};
</script>

<style scoped>
.reg-w {
  width: 600px;
  margin: 0 auto;
  text-align: center;
}
.invail {
  color: red;
  font-size: 12px;
  text-align: left;
  line-height: 10px;
}
.mb-0 {
  margin-bottom: 0;
}
.mb-20 {
  margin-bottom: 20px;
}
</style>
