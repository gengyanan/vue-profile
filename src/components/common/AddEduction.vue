<template>
  <div class="create-form">
    <h3>教育经历</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        label="学校"
        placeholder="* 学校或培训"
        v-model="tableData.school"
      >
      </el-table-column>
      <el-table-column
        label="学历"
        placeholder="* 学历"
        v-model="tableData.degree"
      >
      </el-table-column>
      <el-table-column
        label="开始时间"
        placeholder="开始时间"
        v-model="tableData.from"
      >
      </el-table-column>

      <el-table-column
        label="结束时间"
        placeholder="结束时间"
        v-model="tableData.to"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleDelete(scope.$index, scope.row)"
            size="mini"
            type="danger"
            >删除 >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AddEduction",
  data() {
    return {};
  },
  props: {
    education: Array
  },
  computed: {
    tableData() {
      return this.education;
    }
  },
  methods: {
    handleDelete(row) {
      const { id } = row;
      this.$emit("deleteEducation", id);
    }
  }
};
</script>

<style scoped lang="scss">
.create-form {
  width: 720px;
  margin: 30px auto;
}
</style>
