<template>
  <div>
    <h3 class="t-c">开发者们</h3>
    <p class="t-c">让世界丰富多彩的你们！</p>
    <profiles-item
      v-for="profilesItem of profiles"
      :key="profilesItem._id"
      :profilesItem="profilesItem"
    ></profiles-item>
  </div>
</template>

<script>
import ProfilesItem from "./ProfilesItem";
export default {
  name: "Profiles",
  components: { ProfilesItem },
  data() {
    return {
      profiles: []
    };
  },
  created() {
    this.getProfiles();
  },
  methods: {
    async getProfiles() {
      const res = await this.$axios.get("api/profile/all");
      try {
        this.profiles = res.data;
        this.$store.dispatch("setProfiles", res.data);
      } catch (error) {
        this.profiles = [];
        this.$store.dispatch("setProfiles", []);
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
