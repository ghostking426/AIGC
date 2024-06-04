<template>
  <el-table :data="tableData">
    <el-table-column label="用户名" prop="username"></el-table-column>
    <el-table-column label="昵称" prop="nickname"></el-table-column>
    <el-table-column label="邮箱" prop="email"></el-table-column>
  </el-table>
</template>
<script setup>
import { ref, reactive } from "vue";
import { apiGetList } from "@/api/userList.js";
let tableData = ref([]);
const getList = async () => {
  const res = await apiGetList();
  tableData.value = res.data.data.data;
};
//getList();
</script>
