<template>
  <div class="create-form">
    <el-form :model="createForm" :rules="rules" ref="createForm">
      <el-form-item prop="handle">
        <el-input v-model="createForm.handle"></el-input>
      </el-form-item>
      <p class="text">
        此处的handle是在后端接口中需要用来查询数据的, 通常是写你email的名字
      </p>
      <el-form-item>
        <el-select v-model="createForm.status">
          <el-option
            v-for="item of options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <p class="text">请告知我们您目前所从事的岗位</p>
      <el-form-item>
        <el-input v-model="createForm.company"></el-input>
      </el-form-item>
      <p class="text">可以是你自己的公司或者是你的在职公司</p>
      <el-form-item>
        <el-input v-model="createForm.website"></el-input>
      </el-form-item>
      <p class="text">你公司网址或者是你在职公司网址</p>

      <el-form-item>
        <el-input v-model="createForm.location"></el-input>
      </el-form-item>
      <p class="text">你所在的城市及所在区 (例如. 北京市昌平区)</p>

      <el-form-item>
        <el-input v-model="createForm.skills"> </el-input>
      </el-form-item>
      <p class="text">
        请使用逗号隔开你所掌握的语言 (例如: HTML,CSS,JavaScript,PHP)
      </p>

      <el-form-item>
        <el-input v-model="createForm.githubusername"></el-input>
      </el-form-item>
      <p class="text">
        如果你希望将你的项目分享给大家, 可以填写你的github用户名
      </p>
      <el-form-item>
        <el-input
          :rows="2"
          placeholder="请输入内容"
          type="textarea"
          v-model="createForm.bio"
        ></el-input>
      </el-form-item>
      <p class="text">简单介绍一下自己</p>

      <div class="add-group">
        <el-button plain @click="addHandler">添加社交账号</el-button>
        <span class="selected">选项</span>
        <div class="infogroup" v-if="show">
          <div class="mt-20">
            <el-input v-model="createForm.wechat" placeholder="微信公众号">
              <i class="iconfont icon-weixin weixin-style" slot="prefix"></i>
            </el-input>
          </div>

          <div class="mt-20">
            <el-input placeholder="qq号" v-model="createForm.QQ">
              <i class="iconfont icon-qq weixin-style" slot="prefix"></i>
            </el-input>
          </div>

          <div class="mt-20">
            <el-input v-model="createForm.tengxunkt" placeholder="腾讯课堂网址">
              <i
                class="iconfont icon-tengxunweibo weixin-style"
                slot="prefix"
              ></i>
            </el-input>
          </div>

          <div class="mt-20">
            <el-input v-model="createForm.wangyikt" placeholder="网易课堂网址">
              <i class="el-input__icon el-icon-search" slot="prefix"></i>
            </el-input>
          </div>
        </div>
      </div>

      <el-form-item>
        <el-button
          @click="createHandle('createForm')"
          class="create-btn"
          type="primary"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "EditTextFieldGroup",
  data() {
    return {
      options: [
        { label: "请选择您的职业", value: "请选择您的职业" },
        { label: "前端初级工程师", value: "前端初级工程师" },
        { label: "前端中级工程师", value: "前端中级工程师" },
        { label: "前端高级工程师", value: "前端高级工程师" },
        { label: "前端管理", value: "前端管理" },
        { label: "后端开发", value: "后端开发" },
        { label: "Python机器学习", value: "Python机器学习" },
        { label: "其他", value: "其他" }
      ],
      show: false,
      createForm: {
        handle: ""
      },
      rules: {
        handle: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        status: [
          { required: true, trigger: "blur", message: "status不能为空！" }
        ],
        skills: [
          { required: true, trigger: "blur", message: "skills不能为空！" }
        ]
      }
    };
  },
  methods: {
    createHandle(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            const url = "/api/profile";
            const res = await this.$axios.post(url, this.createForm);

            if (res) {
              this.profile=res.data;
              this.$store.dispatch("setProfile", res.data);
              this.$router.push("/dashboard");
            }
          } catch (error) {
            this.errors = error.reponse.data;
          }
        }
      });
    },
    addHandler() {
      this.show = !this.show;
    }
  }
};
</script>
<style scoped>
.create-form {
  width: 720px;
  margin: 0 auto;
}

/deep/ .el-select {
  display: block;
  position: relative;
  width: 100%;
}

.create-btn {
  width: 100%;
  display: block;
  margin-top: 20px;
}

.add-group {
  width: 720px;
  margin: 0 auto;
}

.mt-20 {
  margin-top: 20px;
}

.selected {
  margin-left: 10px;
}

.weixin-style {
  font-size: 20px;
  vertical-align: middle;
  line-height: 40px;
}
</style>
