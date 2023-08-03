<template>
    <el-dialog v-model="dialogVisible" width="300px" @close="handleClose">
        <div class="login-main">
            <!--<el-image :src="logoPng" style="width: 500px;height: 150px;"></el-image>-->
            <div class="form-container">
                <el-image :src="props.isDark ? logoPng2 : logoPng"></el-image>
                <el-form class="login-form" ref="loginFormRef" :model="message" :rules="rules">
                    <el-form-item prop="email">
                        <el-input v-model="message.email" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input v-model="message.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input show-password v-model="message.password" type="password" placeholder="密码"
                            @keyup.enter="registerCheck"></el-input>
                    </el-form-item>
                    <el-form-item prop="verificationCode">
                        <el-input v-model="message.verificationCode" placeholder="验证码" style="width: 172px;">
                        </el-input>
                        <el-button @click="sendCode" type="primary">立即发送</el-button>
                    </el-form-item>
                </el-form>
                <el-button style="width:100%" class="login-btn" type="primary" @click="registerCheck"> 注册 </el-button>
            </div>
        </div>
    </el-dialog>
</template>
    
<script setup>
import { ref, reactive, onMounted, nextTick, watch } from "vue";
import { apiEmail, apiRegister } from '@/api/login/login.js';
import logoPng from '@/assets/logo.png';
import logoPng2 from '@/assets/logo2.png';
let dialogVisible = ref(true);
let message = reactive({
    email: "",
    username: "",
    password: "",
    verificationCode: "",
});
const props = defineProps({
    isDark: Boolean,
});
const emit = defineEmits(['confirm', 'cancel']);
let loginFormRef = ref();

const rules = reactive({
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' }, ,
    ],
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }, ,
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }, ,
    ],
    verificationCode: [
        { required: true, message: '请输入验证码', trigger: 'blur' }, ,
    ],
})
const registerCheck = async () => {
    const res = await apiRegister({ ...message });
    console.log(res);
}
const sendCode = async () => {

    const res = await apiEmail({ email: message.email, username: message.username, verificationCode: message.verificationCode });
    console.log(res);
}
const handleClose = () => {
    emit('cancel');
}
</script>
<script>
export default {
    name: 'login'
}
</script>
  
<style scoped lang="scss">
.login-main {
    display: flex;
}

.form-container {
    width: 300px;

}
</style>
    