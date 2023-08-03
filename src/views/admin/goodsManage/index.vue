<template>
  <el-table :data="tableData">
    <el-table-column prop="name" label="名称"></el-table-column>
    <el-table-column prop="description" label="描述"></el-table-column>
  </el-table>
</template>
<script setup>
import { ref, reactive } from "vue";
import { apiGetList } from "@/api/goods.js";
let paging = reactive({
  page_size: 10,
  page_num: 1,
});
let tableData = ref([]);
const getList = async () => {
  const res = await apiGetList({ ...paging });
  tableData.value = res.data.data.records;
};
getList();
</script>
