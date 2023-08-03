<template>
    <el-row class="container" :gutter="20">
        <el-col :span="12" :offset="6" style="height:100%;">
            <el-row class="title">您的创作记录以及收藏都在这里啦</el-row>
            <el-row :gutter="20" style="margin:1rem 0;">
                <el-col :span="20">
                    全部作品
                </el-col>
                <el-col :span="4" style="display: flex;justify-content: flex-end;">
                    <template v-if="editable">
                        <div class="checkedall-common">
                            <el-checkbox v-model="checkedAll" @change="handleCheckAll" label="全选" />
                        </div>
                        <el-button @click="editable = false">取消</el-button>
                        <el-button>下载</el-button>
                        <el-button @click="handle">删除</el-button>
                    </template>
                    <el-button v-else @click="editable = true">编辑</el-button>
                </el-col>
            </el-row>
            <el-scrollbar style="height:calc(100% - 8vh- 1rem);">
                <el-row :gutter="20">
                    <el-col :span="6" v-for="(item, index) in historyImages" class="image-box">
                        <div class="checkbox" v-if="editable"><el-checkbox v-model="checkList[item.id]"
                                size="large"></el-checkbox></div>
                        <el-image :src="item.src" style="width: 100%;" :preview-src-list="historyImages.map(x => x.src)"
                            :initial-index="index"></el-image>
                        <div class="tab">
                            <el-button @click="goMain(item.keywords)">画同款</el-button>
                            <a :href="item.src" download><el-icon :size="25" @click="downloadPng(item.src)">
                                    <Download />
                                </el-icon>
                            </a>
                        </div>
                    </el-col>
                </el-row>
            </el-scrollbar>
        </el-col>
    </el-row>
</template>
<script setup>
import { ref, reactive } from 'vue';
import historyPng from '@/assets/spiderman.png';
import childPng from '@/assets/child.png';
import personPng from '@/assets/person.png';
import gewenPng from '@/assets/gewen.png';
import router from '../../router';
let historyImages = reactive([
    {
        id: 1,
        src: historyPng,
        keywords: ['蜘蛛侠', '蜘蛛侠2']
    },
    {
        id: 2,
        src: personPng,
        keywords: ['蜘蛛侠']
    },
    {
        id: 3,
        src: historyPng,
        keywords: ['蜘蛛侠']
    },
    {
        id: 4,
        src: personPng,
        keywords: ['蜘蛛侠']
    },
    {
        id: 5,
        src: historyPng,
        keywords: ['蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠']
    },
    {
        id: 6,
        src: personPng,
        keywords: ['蜘蛛侠']
    },
    {
        id: 7,
        src: historyPng,
        keywords: ['蜘蛛侠']
    },
    {
        id: 8,
        src: personPng,
        keywords: ['蜘蛛侠']
    },
    {
        id: 9,
        src: historyPng,
        keywords: ['蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠']
    },
    {
        id: 10,
        src: personPng,
        keywords: ['蜘蛛侠']
    },
    {
        id: 11,
        src: historyPng,
        keywords: ['蜘蛛侠']
    },
    {
        id: 12,
        src: personPng,
        keywords: ['蜘蛛侠']
    },
    {
        id: 13,
        src: historyPng,
        keywords: ['蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠']
    },
    {
        id: 14,
        src: personPng,
        keywords: ['蜘蛛侠']
    },
    {
        id: 15,
        src: historyPng,
        keywords: ['蜘蛛侠']
    },
    {
        id: 16,
        src: personPng,
        keywords: ['蜘蛛侠']
    },
])
let editable = ref(false);
let checkList = ref([]);
let checkedAll = ref(false);
const handleCheckAll = (val) => {
    if (val) {
        for (let i in historyImages) {
            checkList.value[historyImages[i].id] = true;
        }
    }
    else {
        for (let i in historyImages) {
            checkList.value[historyImages[i].id] = false;
        }
    }
}
const goMain = (keywords) => {
    router.push({
        path: '/home/draw',
        params: {
            keywords: keywords.toString()
        }
    })
}
</script>
<style lang="scss">
.container {
    height: 100%;
    width: 100%;
}

.title {
    justify-content: center;
    align-items: center;
    font-size: 30px;
}

.image-box {
    position: relative;
    cursor: pointer;
}

.tab {
    position: absolute;
    bottom: 5px;
    visibility: hidden;
    width: calc(100% - 20px);
    height: 50px;
    background-color: rgb(255, 255, 255, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 8px;
}

.image-box:hover .tab {
    visibility: visible;
}

.checkbox {
    position: absolute;
    right: 15px;
    top: 0;

    .el-checkbox {
        height: auto;
    }
}

.checkedall-common {
    box-sizing: border-box;
    height: 30px;

    .el-checkbox {
        border: 1px solid var(--el-border-color);
        height: 30px;
        padding: 0 8px;
        border-radius: 4px;
    }

    margin-right: 8px;
}
</style>