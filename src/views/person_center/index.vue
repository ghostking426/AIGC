<template>
    <el-row class="container">
        <el-col :span="24" style="padding:20px;padding-top: 0;">
            <el-row>
                <h1>个人中心</h1>
            </el-row>
            <el-row>
                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" style="width: 100%;">
                    <el-tab-pane label="账户" name="2">
                        <el-row>
                            <el-button>添加额度</el-button>
                        </el-row>
                        <el-row>
                            <el-table :data="limitTable">
                                <el-table-column type="index" label="#" :index="indexMethod" />
                                <el-table-column label="编号" prop="number" />
                                <el-table-column label="记录" prop="record" />
                                <el-table-column label="时间" prop="time" />
                                <el-table-column label="类型" prop="type" />
                                <el-table-column label="备注" prop="remark" />
                            </el-table>
                            <div class="table-bottom" style="display: flex;justify-content:flex-end;width: 100%;">
                                <el-pagination background :page-sizes="paging.pageSizes"
                                    layout="slot,total, prev, pager, next, sizes, jumper" :total="paging.total"
                                    :current-page="paging.pageNumber" @current-change="handleCurrentChange"
                                    :page-size="paging.size" @size-change="handleSizeChange">
                                </el-pagination>
                            </div>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="套餐" name="3">
                        <el-row>
                            <h2>套餐介绍</h2>
                        </el-row>
                        <el-row>
                            <el-col :span="8" v-for="item in goods">
                                <good :title="item.title" :price="item.price" :description="item.description"></good>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="邀请码" name="4">
                        <el-row>
                            邀请新用户注册将获得1000额度
                        </el-row>
                        <el-row>
                            点击下方复制邀请链接，将其发送给你的朋友，对方成功注册后，你即可获得额度，邀请越多，奖励越多！
                        </el-row>
                        <el-row>
                            邀请码
                        </el-row>
                        <el-row>
                            <h1>ABCDEFG <el-button>复制邀请链接</el-button></h1>
                        </el-row>
                        <el-table :data="invitationTable">
                            <el-table-column type="index" label="#" :index="indexMethod" />
                            <el-table-column label="名称" prop="number" />
                            <el-table-column label="邮箱" prop="record" />
                            <el-table-column label="时间" prop="time" />
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-row>
        </el-col>
    </el-row>
</template>
<script setup>
import { ref, reactive } from 'vue';
import good from './good.vue';
let paging = reactive({
    pageSizes: [10, 20, 30],
    pageSize: 10,
    pageNumber: 1,
    total: 0,
})
let activeName = '2';
//额度分页
let limitTable = ref([]);

const indexMethod = (index) => paging.pageSize * (paging.pageNumber - 1) + index + 1;
const handleCurrentChange = (current) => {
    paging.pageNumber = current;
    handleSearch();
}
const handleSizeChange = (newSize) => {
    paging.pageSize = newSize;
    handleSearch();
}
const handleSearch = () => {
    limitTable.value = [
        { number: '100086111', record: '-2', time: '2023/06/28 11:11:11', type: '绘画', remark: '系统扣除' },
        { number: '100086111', record: '-2', time: '2023/06/28 11:11:11', type: '绘画', remark: '系统扣除' },
        { number: '100086111', record: '-2', time: '2023/06/28 11:11:11', type: '绘画', remark: '系统扣除' },
        { number: '100086111', record: '-2', time: '2023/06/28 11:11:11', type: '绘画', remark: '系统扣除' },
        { number: '100086111', record: '-2', time: '2023/06/28 11:11:11', type: '绘画', remark: '系统扣除' },
        { number: '100086111', record: '-2', time: '2023/06/28 11:11:11', type: '绘画', remark: '系统扣除' },
        { number: '100086111', record: '-2', time: '2023/06/28 11:11:11', type: '绘画', remark: '系统扣除' },
        { number: '100086111', record: '-2', time: '2023/06/28 11:11:11', type: '绘画', remark: '系统扣除' },
        { number: '100086111', record: '-2', time: '2023/06/28 11:11:11', type: '绘画', remark: '系统扣除' },
        { number: '100086111', record: '-2', time: '2023/06/28 11:11:11', type: '绘画', remark: '系统扣除' },
        { number: '100086111', record: '-2', time: '2023/06/28 11:11:11', type: '绘画', remark: '系统扣除' },
    ]
}
handleSearch();
//套餐
let goods = reactive([
    {
        title: 'AI绘画基础包',
        price: '9.9',
        description: '获得20额度点，额度永久有效'
    },
    {
        title: 'AI绘画基础包',
        price: '9.9',
        description: '获得20额度点，额度永久有效'
    }
    ,
    {
        title: 'AI绘画基础包',
        price: '9.9',
        description: '获得20额度点，额度永久有效'
    }
])
//邀请码
</script>
<style lang="scss" scoped>
.container {
    height: 100%;
}
</style>