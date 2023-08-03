<template>
    <div>
        <div class="title">
            {{ props.title }}
        </div>
        <div>
            价格：<span>
                {{ props.price }}
            </span>
        </div>
        <div>
            <span class="description">
                {{ props.description }}
            </span>
        </div>
        <el-button>立即购买</el-button>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
const props = defineProps({
    title: String,
    price: String,
    description: String,
})
</script>