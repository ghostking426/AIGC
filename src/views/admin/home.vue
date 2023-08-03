<template>
  <el-container class="main-container">
    <el-aside class="main-aside">
      <el-menu
        :default-active="route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :router="true"
      >
        <el-menu-item index="userManage">
          <el-icon><setting /></el-icon>
          <span>用户列表</span>
        </el-menu-item>
        <el-menu-item index="goodsManage">
          <el-icon><setting /></el-icon>
          <span>商品列表</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <RouterView></RouterView>
    </el-main>
  </el-container>
</template>
<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<style lang="scss" scoped>
.main-container {
  width: 100%;
  height: 100%;
  padding: 0;
}
</style>
