<template>
    <div style="display: flex;height: 100%;width: 100%;">
        <div class="add-container">
            <div class="add-box" @click="addChatBox">新建聊天</div>
            <div v-for="item in  ChatBoxes" class="chat-box">
                <div>
                    <el-icon>
                        <ChatDotSquare />
                    </el-icon>
                </div>
                <div>
                    {{ item.name }}
                </div>
                <div>
                    <el-icon>
                        <Edit />
                    </el-icon>
                    <el-icon>
                        <Delete />
                    </el-icon>
                </div>
            </div>
        </div>
        <div
            style="height: 100%;width: calc(100% - 260px);display: flex;justify-content: space-between;flex-direction: column;">
            <div class="header">
                当前聊天标题
            </div>
            <div class="bottom">
                <el-icon>
                    <Delete />
                </el-icon>
                <el-icon>
                    <Download />
                </el-icon>
                <el-icon>
                    <Clock />
                </el-icon>
                <el-input v-model="sendMessage"></el-input>
                <el-button type="primary">发送</el-button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
const ChatBoxes = reactive([]);
let currentId = ref();
let currentName = ref();
let sendMessage = ref();
const addChatBox = () => {
    ChatBoxes.push({
        id: 999,
        name: '新聊天'
    })
}
</script>
<style  scoped>
.add-box {
    border: 1px dashed rgb(239, 239, 245);
    height: 34px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px;
    font-size: 14px;
}

.add-box:hover {
    color: #409eff;
    border-color: #409eff;
    cursor: pointer;
}

.chat-box {
    height: 46px;
    border: 1px solid rgb(239, 239, 245);
    margin: 10px 16px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.add-container {
    border: 1px solid rgb(239, 239, 245);
    width: 260px;
    height: 100%;
    box-sizing: border-box;
}

.header {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgb(239, 239, 245);
    display: flex;
    align-items: center;
    padding-left: 40px;
    font-weight: bold;
    box-sizing: border-box;
}

.bottom {
    height: 60px;
    width: 100%;
    position: relative;
    padding: 10px 200px;
    box-sizing: border-box;
    border-top: 1px solid rgb(239, 239, 245);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>