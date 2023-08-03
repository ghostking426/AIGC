<template>
  <el-dialog v-model="dialogVisible" width="300px" @close="handleClose">
    <div class="login-main">
      <!--<el-image :src="logoPng" style="width: 500px;height: 150px;"></el-image>-->
      <div class="form-container">
        <el-image :src="props.isDark ? logoPng2 : logoPng"></el-image>
        <el-form class="login-form" ref="loginFormRef" v-model="loginMessage">
          <el-form-item>
            <el-input v-model="loginMessage.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input show-password v-model="loginMessage.password" type="password" placeholder="密码"
              @keyup.enter="loginCheck"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="邀请码，没有可不填"></el-input>
          </el-form-item>
        </el-form>
        <el-button style="width: 100%" class="login-btn" type="primary" @click="loginCheck">
          立即登录
        </el-button>
        <el-button link type="primary" @click="toRegister">
          立即注册
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, watch } from "vue";
import { setCookie, getCookie } from "@/utils/cookie.js";
import { apiLogin } from "@/api/login/login.js";
import logoPng from "@/assets/logo.png";
import logoPng2 from "@/assets/logo2.png";
import { ElMessage } from "element-plus";
let dialogVisible = ref(true);
let loginMessage = reactive({
  username: "",
  password: "",
});
const props = defineProps({
  isDark: Boolean,
});
const emit = defineEmits(["confirm", "cancel", "toRegister"]);
const loginCheck = async () => {
  const res = await apiLogin({ ...loginMessage });
  if (res.data.code == 200) {
    ElMessage.success("登录成功!");
    localStorage.setItem("token", res.data.data.token);
    setCookie("username", loginMessage.username, 7);
    setCookie("password", loginMessage.password, 7);
  }
  emit("confirm");
};
const handleClose = () => {
  emit("cancel");
};
const toRegister = () => {
  emit("toRegister");
};
</script>
<script>
export default {
  name: "login",
};
</script>

<style scoped lang="scss">
.login-main {
  display: flex;
}

.form-container {
  width: 300px;
}
</style>
