<template>
  <div class="login">
    <h3>登录</h3>
    <p>使用已有的账户登录</p>
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
      <el-form-item :class="[isEmail ? 'mb-0' : 'mb-20']" prop="email">
        <el-input placeholder="邮箱地址" v-model="loginForm.email"
          >邮箱地址
        </el-input>
        <p class="error" v-if="errors.email">
          {{ errors.email }}
        </p>
      </el-form-item>
      <el-form-item :class="[isPwd ? 'mb-0' : 'mb-20']" prop="password">
        <el-input placeholder="密码" v-model="loginForm.password"
          >密码
        </el-input>
        <p :class="[isPwd ? 'mb-0' : 'mb-20']" class="error">
          {{ errors.password }}
        </p>
      </el-form-item>
      <el-form-item>
        <el-button @click="loginHandle('loginForm')" type="primary"
          >登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      errors: {
        email: "",
        password: ""
      },
      isEmail: false,
      isPwd: false,
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    loginHandle(name) {
      this.$refs[name].validate(async volid => {
        if (volid) {
          const url = "/api/users/login";
          try {
            const res = await this.$axios.post(url, this.loginForm);
            const {
              data: { success, token }
            } = res;
            if (success) {
              //将token存储到locaStorage
              window.localStorage.setItem("jwtToken", token);
              //解析token
              const decode = jwt_decode(token);
              //分发action更改store.state
              //判断decode是否为空
              this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decode));
              this.$store.dispatch("setUser", decode);
              //页面跳转
              this.$router.push({ name: "Dashboard" });
            } else {
              this.errors.password = "";
              this.isPwd = false;
            }
          } catch (error) {
            const err = error.response.data;
            if (err) {
              this.errors = err;
              this.isEmail = !!err.email;
              this.isPwd = !!err.password;
            }
          }
          /*this.$axios
              .post(url, this.loginForm)
              .then(res => {
                console.log(res.data);
                this.errors.password = "";
                this.isPwd = false;
              })
              .catch(error => {
                const err = error.response.data;
                if (err) {
                  this.errors = err;
                  this.isEmail = !!err.email;
                  this.isPwd = !!err.password;
                }
              });*/
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
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
.login {
  width: 600px;
  margin: 0 auto;
  text-align: center;
}

.error {
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
