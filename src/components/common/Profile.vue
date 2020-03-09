<template>
  <div class="content">
    <!--返回-->
    <a class="pro-link">
      <el-button @click.prevent="$router.go(-1)">
        返回个人信息
      </el-button>
    </a>
    <!--基本信息-->
    <el-card class="bg-17a2b8">
      <el-row>
        <el-col :span="24">
          <img
            :src="profile.user.avatar"
            alt="头像"
            class="pro-img"
            v-if="profile.user"
          />
        </el-col>
        <el-col :span="24">
          <div class="t-c profile-text">
            <h3 class="ft-20" v-if="profile.user">{{ profile.user.name }}</h3>
            <p class="ft-15" v-if="profile.company">{{ profile.company }}</p>
            <p class="ft-13" v-if="profile.location">{{ profile.location }}</p>
          </div>
        </el-col>

        <div class="t-c">
          <icon-svg class-name="icon-content" icon-class="inter"></icon-svg>
          <icon-svg class-name="icon-content" icon-class="QQ"></icon-svg>
          <icon-svg class-name="icon-content" icon-class="weixin"></icon-svg>
        </div>
      </el-row>
    </el-card>
    <!--个人能力-->
    <el-card class="profile-personal mt-30">
      <h3 class="t-c col-17a2b8">个人介绍</h3>
      <p>专注于在线教育</p>
      <hr />
      <h3 class="t-c col-17a2b8">个人技能</h3>
      <ul class="clear pro-list">
        <li :key="index" class="fl" v-for="(skill, index) of profile.skills">
          <icon-svg
            class-name="icon-content icon-aligin"
            icon-class="dui"
          ></icon-svg>
          {{ skill }}
        </li>
      </ul>
    </el-card>
    <!--个人经历-->
    <el-card class="mt-30 pro-card-group">
      <el-row>
        <el-col :span="13">
          <h1 class="pro-title">个人经历</h1>
          <el-card
            :key="index"
            class="pro-card mt-30"
            v-for="(exp, index) of profile.experience"
          >
            <ul class="profile-group-item">
              <li>
                <h2>{{ exp.company }}</h2>
                <p>{{ exp.from }}-{{ exp.to ? exp.to : "在职" }}</p>
                <p><span>职位:</span> {{ exp.title }}</p>
                <p><span>地点:</span> {{ exp.location }}</p>
                <p><span>岗位职责:</span> {{ exp.description }}</p>
              </li>
            </ul>
          </el-card>
        </el-col>
        <el-col :offset="1" :span="10">
          <h1 class="pro-title">教育经历</h1>
          <el-card
            :key="index"
            class="pro-card mt-30"
            v-for="(edu, index) of profile.education"
          >
            <ul class="profile-group-item">
              <li>
                <h2>{{ edu.school }}</h2>
                <p>{{ edu.from }}--{{ edu.to ? edu.to : "在职" }}</p>
                <p><span>学历:</span> {{ edu.degree }}</p>
                <p><span>所学专业:</span> {{ edu.fieldofstudy }}</p>
              </li>
            </ul>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <!--仓库信息-->
    <el-card class="mt-30">
      <h2>Github仓库信息</h2>
      <ul class="pro-git-group" v-if="profile && profile.githubusername">
        <li class="pro-git-item" v-for="repo of repos" :key="repo.id">
          <el-col :span="3">
            <router-link class="col-17a2b8" :to="repo.html_url">
              {{ repo.name }}
            </router-link>
            <p>{{ repo.description }}</p>
          </el-col>
          <el-col :offset="8" :span="8">
            <el-tag type="success">Starts:{{ repo.stargazers_count }}</el-tag>
            <el-tag type="info">Watchers:{{ repo.watchers_count }}</el-tag>
            <el-tag type="warning">Forks:{{ repo.forks_count }}</el-tag>
          </el-col>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import IconSvg from "../IconSvg";

export default {
  name: "Profile",
  components: { IconSvg },
  data() {
    return {
      profile: {},
      clientId: "8f060ca407b882d0768e",
      client_secret: "49d360e829e80b226f82e9aa93916c0be4a35039",
      count: 0,
      sort: "created desc",
      repos: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const {
        params: { handle }
      } = to;
      vm.getProfileData(handle);
    });
  },
  async created() {
    await this.HandlegitHub();
  },
  methods: {
    async getProfileData(handle) {
      try {
        const res = await this.$axios.get(`/api/profile/handle/${handle}`);
        this.profile = res.data;
      } catch (error) {
        this.profile = [];
      }
    },
    HandlegitHub() {
      /*
          * github 创建地址
          * https://github.com/settings/applications/new
          * github 请求地址
          * Client ID
              8f060ca407b882d0768e
              Client Secret
              49d360e829e80b226f82e9aa93916c0be4a35039
          *
          *
          *
          *
          * */
      const url = `https://api.github.com/users/${this.username}/repos?per_page=${this.count}&sort=${this.sort}&client_id=${this.cliendId}&client_secret=${this.client_secret}`;

      fetch(url, {
        method: "GET",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
        .then(res => res.json())
        .then(data => {
          this.repos = data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 1170px;
  margin: 0 auto 30px;
}

.pro-link {
  margin: 20px auto;
  text-decoration: none;
  color: #343a40;
  display: block;
}

.pro-img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid #cccc;
  text-align: center;
  margin: 10px auto 0;
  display: block;
  background-color: #fff;
}

.profile-text {
  font-size: 20px;
  color: #fff;
}

/deep/ .icon-content {
  width: 30px;
  height: 30px;
  margin-left: 20px;
}

.profile-personal {
  margin-top: 30px;
  background-color: #f8f9fa;
  font-size: 20px;
}

.pro-list {
  padding-left: 0;
}

.pro-title {
  font-weight: bold;
  color: #17a2b8;
  text-align: center;
}

.profile-group-item {
  p {
    font-size: 15px;
  }

  span {
    font-weight: bold;
  }
}

.pro-card {
  border: 1px solid #ccc;
}

/deep/ .pro-card-group {
  box-shadow: 0 0 0 0 #fff !important;
  border: none;

  .el-card__body {
    padding: 0;
  }
}

.pro-git-item {
  width: 100%;
  line-height: 50px;
  border: 1px solid #ccc;
  height: 50px;
  padding: 0 20px;
  border-radius: 4px;
}

/deep/ .icon-aligin {
  vertical-align: text-top;
  margin-right: 10px;
}
</style>
