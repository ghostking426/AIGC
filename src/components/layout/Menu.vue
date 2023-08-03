<template>
    <el-menu :default-active="route.path" class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item index="/home/draw">AI 绘画</el-menu-item>
        <el-menu-item index="/home/chat">AI 聊天</el-menu-item>
        <el-menu-item index="/home/personCenter">个人中心</el-menu-item>
    </el-menu>
</template>
<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
let activeIndex = '1';
const state = reactive({

})
</script>
<style scoped>
.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: none;
}

.el-menu--horizontal {
    border-bottom: none;
}

.el-menu--horizontal {
    height: 100%
}

.el-menu--horizontal>.el-menu-item {
    width: 10vw;
}
</style>