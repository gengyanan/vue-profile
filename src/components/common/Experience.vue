<template>
  <div class="exp-group">
    <h3>个人履历</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        label="公司"
        prop="campany"
        align="center"
      ></el-table-column>
      <el-table-column
        label="职位"
        prop="title"
        align="center"
      ></el-table-column>

      <el-table-column
        label="年份"
        prop="from"
        align="center"
      ></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.row)" size="mini" type="danger"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Experience",
  props: {
    experience: Array
  },
  data() {
    return {
      tableData: this.experience
    };
  },
  methods: {
    async handleDelete(row) {
      const { _id: id } = row;
      this.$emit("deleteExperience", id);
    }
  }
};
</script>

<style scoped>
.exp-group {
  width: 720px;
  margin: 0 auto 30px;
}
</style>
