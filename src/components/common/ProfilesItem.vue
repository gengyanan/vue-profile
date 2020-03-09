<template>
  <div class="content">
    <el-card class="bg-f1f3f5 mb-30 pb-30">
      <el-row type="flex">
        <el-col :span="2">
          <img
            :src="profilesItem.user.avatar"
            alt=""
            class="profiles-img fl"
            v-if="profilesItem.user"
          />
        </el-col>
        <el-col :span="6">
          <div class="profiles-info">
            <h3 v-if="profilesItem.user">{{ profilesItem.user.name }}</h3>
            <p v-if="profilesItem.status">{{ profilesItem.status }}</p>
            <p v-if="profilesItem.location">{{ profilesItem.location }}</p>
            <!-- <router-link
                                :to="{ name: 'Profile', params: { handle: profilesItem.handle } }"
                        >-->
            <router-link :to="`/profile/${profilesItem.handle}`">
              <el-button class="t-c" size="small" type="primary">
                更多信息
              </el-button>
            </router-link>
          </div>
        </el-col>
        <el-col :offset="8" :span="9">
          <h3>技能</h3>
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="(skill, index) of profilesItem.skills"
              :key="index"
            >
              <icon-svg class-name="icon-bd" icon-class="dui"></icon-svg>
              {{ skill }}
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import IconSvg from "../IconSvg";

export default {
  name: "ProfilesItem",
  components: { IconSvg },
  props: {
    profilesItem: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 1170px;
  margin: 0 auto;

  .bg-f1f3f5 {
    background-color: #f1f3f5;
  }

  .profiles-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    box-shadow: 1px 0 2px 1px #ccc;
    vertical-align: middle;
  }

  .profiles-info {
    margin-left: 50px;
    text-align: center;

    h3,
    p {
      margin: 8px 0;
    }

    h3 {
      font-size: 20px;
    }

    p {
      font-size: 15px;
    }
  }

  .list-group {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }

  .list-group-item {
    line-height: 50px;
    height: 50px;
    background-color: white;
    border: 1px solid #ccc;
    padding-left: 20px;
  }

  .list-group-item:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .list-group-item:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}

/deep/ .icon-bd {
  width: 2em;
  height: 2em;
  vertical-align: middle;
  margin-right: 10px;
}
</style>
