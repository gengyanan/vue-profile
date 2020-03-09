<template>
  <div class="feed-content">
    <el-card>
      <h3>说点啥。。。。。</h3>
      <el-form :model="feedForm" ref="feedForm" :rules="rules">
        <el-form-item prop="text">
          <el-input
            type="textarea"
            v-model="feedForm.text"
            placeholder="随便说点"
            row="2"
            :class="[feedForm.text?'':errors.text]"
          />
        </el-form-item>
        <p class="error" v-if="errors.text">{{errors.text}}</p>
        <el-form-item class="t-c">
          <el-button type="primary" @click="handleFeed('feedForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt-30"
             v-for="(newItem,index) of newPost"
             :key="index"
    >
      <el-row>
        <el-col :span="3">
          <div class="feed-img">
            <img :src="newItem.avatar" alt="" />
          </div>
          <p class="t-c">{{newItem.name}}</p>
        </el-col>
        <el-col :span="20" :offset="1">
          <p>
            {{newItem.text}}
          </p>
          <div class="feed-give">
            <el-tag
                    type="primary"
                    class="mr-10"
                    @click="handleLike(newItem._id)"
            >
              <icon-svg icon-class="give" class-name="icon-feed"></icon-svg>
              <span> {{newItem.likes}}</span>
             </el-tag
            >
            <el-tag
                    @click="handleUnLike(_id)"
                    type="primary"
                    class="mr-10">
              <icon-svg
                icon-class="teasing"
                class-name="icon-teasing"
              ></icon-svg>
              <span>{{newItem.likes}}</span>
            </el-tag>
              <el-button
                      type="primary"
                      class="feed-liuy"

              >鼓励留言</el-button>
            <span class="feed-error"
                  v-if="newItem !=null  && user.id===newItem.user "
                  @click="handleError(newItem._id)"
            >X</span>

          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import IconSvg from "../../components/IconSvg";
export default {
  name: "Feed",
  components: { IconSvg },
  data() {
    return {
      errors:'',
      feedForm: {
        text: ""
      },
      newPost: {
        text: "",
        name: "",
        avatar: ""
      },
      rules: {
        text: [
          {
            required: true,
            message: "评论不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  comments:{
    user(){
      return this.$store.getters.user;
    }
  },
  methods: {
    handleFeed(names) {
      this.$refs[names].validate(async volid => {
        if (volid) {
          try {
            const user = this.$store.getters.user;
            this.newPost = {
              text: this.feedForm.text,
              name: user.name,
              avatar: user.avatar
            };
            const url = "/api/posts";
           const res= await this.$axios.post(url, this.newPost);
            const {data}=res;
            console.log(data.likes.length);
            this.newPost.likes=data.likes.length?data.likes.length:0;

            this.feedForm.text = "";
          } catch (err) {
            this.errors=err.response.data;
            this.newPost = {
              text: "",
              name: "",
              avatar: ""
            };
          }
        } else {
          alert("验证失败");
          this.errors='';
        }
      });
    },
    async handleError(id){
      try{
        const url=`api/posts/${id}`;
        await this.$axios.delete(url);
        const urls=`api/posts`;
        const res=await this.$axios.get(urls);
        this.newPost=res.data;
      }catch (e) {
        this.newPost=[];
      }


    }
  }
};
</script>

<style scoped lang="scss">
.feed-content {
  width: 1170px;
  margin: 30px auto;
  .feed-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border:1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  h3 {
    height: 50px;
    background: #089f9f;
    border-radius: 4px;
    line-height: 50px;
    padding-left: 30px;
    color: #fff;
  }
  /deep/ .icon-feed,
  /deep/.icon-teasing {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .feed-give {
    font-size: 13px;
    color: #fff;
    font-weight: bold;
  }
}
  .loading{
    position: absolute;
    width: 100%;
    height: 100%!important;
    top: 0;
    left: 0;
    background: #00000080;
    z-index: 10;
  }
  /deep/.el-form-item{
    margin-bottom: 12px;
  }
  .error{
    color: red;
    font-size: 13px;

  }
  .feed-liuy{
    cursor: pointer;
  }
  .feed-error{
    color: red;
    font-weight: bold;
    margin-left: 20px;
    font-size: 30px;
    vertical-align: middle;
    cursor: pointer;
  }
</style>
