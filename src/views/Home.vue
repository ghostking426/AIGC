<template>
  <el-container class="main-container">
    <el-header class="main-header">
      <el-row style="width: 100%">
        <el-col :span="3">
          <el-image :src="isDark ? logoPng2 : logoPng"></el-image>
        </el-col>
        <el-col :span="16">
          <Menu></Menu>
        </el-col>
        <el-col :span="5" class="icon-group">
          <el-switch size="small" inactive-text="深色模式" v-model="isDark" />
          <el-badge :value="1" class="item">
            <el-icon :size="30">
              <Bell />
            </el-icon>
          </el-badge>
          <div style="display: flex; align-items: center; cursor: pointer" @click="loginVisable = true">
            <el-avatar :size="30" :src="state.circleUrl" />
            <span style="line-height: 34px; margin-left: 8px">{{
              username ? username : "未登录"
            }}</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <RouterView></RouterView>
    </el-main>
  </el-container>
  <loginDialog v-if="loginVisable" @cancel="getCancel" @toRegister="toRegister" :isDark="isDark" @confirm="getConfirm">
  </loginDialog>
  <registerDialog v-if="registerVisable" @cancel="getRegisterCancel" :isDark="isDark"></registerDialog>
</template>
<script setup>
import Menu from "../components/layout/Menu.vue";
import logoPng from "@/assets/logo.png";
import logoPng2 from "@/assets/logo2.png";
import loginDialog from "@/views/login/index.vue";
import registerDialog from "@/views/login/register.vue";
import { useDark, useToggle } from "@vueuse/core";
import { ref, reactive } from "vue";
import { setCookie, getCookie } from "@/utils/cookie.js";
import { apiLogin } from "@/api/login/login.js";
const isDark = useDark();
//const toggleDark = useToggle(isDark);
let loginVisable = ref(false);
let username = ref(getCookie("username"));
console.log(username.value);
let password = ref(getCookie("password"));
console.log(password.value);
if (username.value && password.value) {
  apiLogin({ username: username.value, password: password.value }).then(
    (res) => {
      if (res.data.code == 200) {
        localStorage.setItem("token", res.data.data.token);
      }
    }
  );
}
const getCancel = () => {
  loginVisable.value = false;
};
let registerVisable = ref(false);
const getRegisterCancel = () => {
  registerVisable.value = false;
};
const toRegister = () => {
  loginVisable.value = false;
  registerVisable.value = true;
};
const getConfirm = () => {
  loginVisable.value = false;
};
const state = reactive({
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
});
</script>
<style>
.main-container {
  width: 100%;
  height: 100%;
  padding: 0;
  min-width: 1200px;
}

.main-header {
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;
  border-color: var(--el-border-color);
}

.icon-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 2vw;
}

.el-dialog__body {
  padding-top: 0;
}

.el-main {
  height: calc(100% - 8vh);
}
</style>
