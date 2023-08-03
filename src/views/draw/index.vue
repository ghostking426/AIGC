<template>
  <el-row class="container">
    <el-col :span="3" style="height: 100%">
      <el-row style="
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--el-border-color);
          height: 100%;
          flex-direction: column;">
        <div style="font-size: 1.25rem; font-weight: bold; line-height: 2" @click="getList">
          绘画记录
        </div>
        <el-scrollbar style="height: calc(100% - 100px)">
          <div v-for="(item, index) in  historyImages " class="image-box"
            :class="index == mainIndex ? 'active-image' : ''" @click="setMainImage(index)">
            <el-image :src="'http://want-youwant.com/' + item.imageUrl.split('/')[3]" style="width: 100%"></el-image>
            <el-tooltip :content="item.keywords" placement="top" effect="light">
              <el-text class="keywords" truncated>关键词：{{ item.prompt }}</el-text>
            </el-tooltip>
          </div>
        </el-scrollbar>
        <div style="
            font-size: 1.25rem;
            font-weight: bold;
            line-height: 2;
            cursor: pointer;
          " @click="router.push('/home/drawHistory')">
          更多创作记录
        </div>
      </el-row>
    </el-col>
    <el-col :span="13" class="right" style="
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      ">
      <el-row style="justify-content: center; padding: 20px">
        <el-image :src="mainImage" v-if="mainImage" :preview-src-list="[mainImage]" :initial-index="0"
          style="width: 75%"></el-image>
        <el-empty v-else description="暂无图片" />
      </el-row>
      <el-row style="justify-content: center; margin-bottom: 20px">
        <el-input v-model="mainInput" style="width: 80%" :rows="1" type="textarea" placeholder="请输入关键词">
        </el-input><el-button @click="submit">提交</el-button>
      </el-row>
    </el-col>
    <el-col :span="5" class="right">
      <el-row>
        <el-col :span="24">
          <div style="margin-left: 16px; margin-top: 16px; font-weight: bold">
            上传参考图
            <el-tooltip class="box-item" effect="light" content="出于个人隐私保护，您上传的照片无法被其它人看到，同时您可以在生成图像后及时删除上传的图片。"
              placement="top">
              <el-icon>
                <InfoFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
      <el-row style="padding: 16px">
        <el-col :span="24" class="upload-container">
          <el-row style="height: 100%; align-items: center">
            <el-col :span="16" class="des" style="display: flex; flex-direction: column; align-items: center">
              <div>
                <div>上传参考图(选填)</div>
                <div style="font-size: 12px; margin-top: 8px">
                  支持JPG、PNG、10M以内
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <el-upload ref="upload" class="upload-demo" :limit="5" :auto-upload="false" :accept="'.jpg,.png'">
                <template #trigger>
                  <el-button type="primary">上传文件</el-button>
                </template>
              </el-upload>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div style="display: flex">
        <div class="box-container" v-for="( item, index ) in  sizeGroup ">
          <div class="box" @click="setActive(index)" :class="item.size == ativeSize ? 'active' : ''">
            <el-icon>
              <FullScreen />
            </el-icon>
            <div style="font-weight: bold">{{ item.size }}</div>
            <div style="font-size: 12px">
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
      <el-row>
        <div style="margin-left: 16px; margin-top: 16px; font-weight: bold">
          放大参考图
          <el-tooltip class="box-item" effect="light" content="将左侧的其中一张图片进行放大" placement="top">
            <el-icon>
              <InfoFilled />
            </el-icon>
          </el-tooltip>
        </div>
      </el-row>
      <div style="display: flex">
        <div class="btn-container">
          <el-button>左上</el-button>
        </div>
        <div class="btn-container">
          <el-button>右上</el-button>
        </div>
        <div class="btn-container">
          <el-button>左下</el-button>
        </div>
        <div class="btn-container">
          <el-button>右下</el-button>
        </div>
      </div>
      <el-row>
        <div style="margin-left: 16px; margin-top: 16px; font-weight: bold">
          变体图片
          <el-tooltip class="box-item" effect="light" content="以左侧的其中一张图片为基准重新生成" placement="top">
            <el-icon>
              <InfoFilled />
            </el-icon>
          </el-tooltip>
        </div>
      </el-row>
      <div style="display: flex">
        <div class="btn-container">
          <el-button>左上</el-button>
        </div>
        <div class="btn-container">
          <el-button>右上</el-button>
        </div>
        <div class="btn-container">
          <el-button>左下</el-button>
        </div>
        <div class="btn-container">
          <el-button>右下</el-button>
        </div>
      </div>
      <el-row>
        <div style="margin-left: 16px; margin-top: 16px; font-weight: bold">
          功能区
          <el-tooltip class="box-item" effect="light" content="生成&变换图片消耗2点额度。放大图片消耗1点额度。邀请新用户奖励5点额度。" placement="top">
            <el-icon>
              <InfoFilled />
            </el-icon>
          </el-tooltip>
        </div>
      </el-row>
      <div style="display: flex">
        <div class="btn-container">
          <el-button type="primary">重新生成</el-button>
        </div>
        <div class="btn-container">
          <el-button type="danger" @click="handleDelete">删除</el-button>
        </div>
        <div class="btn-container">
          <el-button type="primary">一键切图</el-button>
        </div>
      </div>
      <el-row>
        <div style="margin-left: 16px; margin-top: 16px; font-weight: bold">
          高级配置
        </div>
      </el-row>
      <el-row style="padding: 16px">
        <el-form ref="formRef" :model="settings">
          <el-form-item label="模型版本">
            <el-select v-model="settings.version">
              <el-option label="5.1" value="5.1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="细节丰富度">
            <el-select v-model="settings.detailLevel">
              <el-option label="高清" value="高清"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="风格化程度">
            <el-slider v-model="settings.formLevel"></el-slider>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row style="padding: 16px">
        <span style="font-size: 14px">更多</span><el-button type="primary" link>使用教程</el-button>
      </el-row>
    </el-col>
    <el-col :span="3" class="right" style="height: 100%">
      <el-row style="
          justify-content: center;
          border-bottom: 1px solid var(--el-border-color);
          height: 100%;
        ">
        <div style="font-size: 20px; font-weight: bold; line-height: 50px">
          艺术风格集锦
        </div>
        <el-scrollbar style="height: calc(100% - 50px)">
          <div v-for="( item, index ) in  artImages " class="image-box" :class="mainInput.split(',').indexOf(artImages[index].keywords) != -1
            ? 'active-image'
            : ''
            " @click="setKeyWords(index)">
            <el-image :src="item.src"></el-image>
            <el-tooltip :content="item.keywords" placement="top" effect="light">
              <el-text class="keywords" truncated>关键词：{{ item.keywords }}</el-text>
            </el-tooltip>
          </div>
        </el-scrollbar>
      </el-row>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import historyPng from "@/assets/spiderman.png";
import childPng from "@/assets/child.png";
import personPng from "@/assets/person.png";
import gewenPng from "@/assets/gewen.png";
import { useRoute, useRouter } from "vue-router";
import { apiSubmit, apiGetList } from "@/api/image";
const router = useRouter();
const route = useRoute();
let sizeGroup = reactive([
  {
    size: "1:1",
    label: "头像图",
  },
  {
    size: "1:2",
    label: "手机壁纸",
  },
  {
    size: "3:4",
    label: "文案图",
  },
  {
    size: "4:3",
    label: "社交媒体",
  },
  {
    size: "9:16",
    label: "宣传海报",
  },
]);
let ativeSize = ref();
const setActive = (index) => {
  if (ativeSize.value == sizeGroup[index].size) {
    ativeSize.value = "";
  } else ativeSize.value = sizeGroup[index].size;
};
const settings = reactive({
  version: "5.1",
  detailLevel: "高清",
  formLevel: 50,
});
let historyImages = ref([
  /*{
    src: historyPng,
    keywords: "蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠",
  },
  {
    src: personPng,
    keywords: "蜘蛛侠",
  },
  {
    src: historyPng,
    keywords: "蜘蛛侠",
  },
  {
    src: personPng,
    keywords: "蜘蛛侠",
  },*/
]);

let artImages = reactive([
  {
    src: gewenPng,
    keywords: "格温",
  },
  {
    src: childPng,
    keywords: "我推的孩子",
  },
  {
    src: gewenPng,
    keywords: "格温2",
  },
  {
    src: childPng,
    keywords: "我推的孩子2",
  },
]);
let mainIndex = ref();
let mainImage = ref();
const setMainImage = (index) => {
  mainImage.value = historyImages.value[index].imageUrl;
  mainIndex.value = index;
};
let mainInput = ref("");
if (route.params.keywords) {
  mainInput.value = route.params.keywords.split(",");
}
let artArr = ref([]);
const setKeyWords = (index) => {
  if (artArr.value.indexOf(artImages[index].keywords) != -1) {
    artArr.value.splice(artArr.value.indexOf(artImages[index].keywords), 1);
  } else artArr.value.push(artImages[index].keywords);
  mainInput.value = artArr.value.toString();
};
const handleDelete = () => {
  historyImages.value.splice(mainIndex.value, 1);
  mainImage.value = "";
};
let upload = ref();

const submit = async () => {
  const res = await apiSubmit({ prompt: mainInput.value });
};

const getList = async () => {
  const res = await apiGetList({ page_size: 10, page_num: 1 });
  if (res.data.code == 200) {
    historyImages.value = res.data.data.data;
  }
};
onMounted(() => {
  getList()
})
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
}

.right {
  height: 100%;
  border-left: 1px solid;
  border-color: var(--el-border-color);
}

.upload-container {
  height: 100px;
  border: 1px solid;
  border-color: var(--el-border-color);
  border-radius: 5px;
}

.box-container {
  flex: 1 1;
  padding: 10px;
}

.box {
  border: 1px solid;
  border-color: var(--el-border-color);
  border-radius: 5px;
  height: 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: var(--el-color-primary-light-9);
  }
}

.active {
  background-color: var(--el-color-primary-light-9);
  border-color: aquamarine;
}

.btn-container {
  flex: 1 1 25%;
  padding: 8px;
}

.btn-container .el-button {
  width: 100%;
}

.image-box {
  cursor: pointer;
  margin: 4px 8px;

  .keywords {
    background-color: gray;
    color: white;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.active-image {
  border: 2px solid var(--el-color-primary);
}

@media (max-width: 1440px) {
  .btn-container {
    padding: 0;
  }

  .des {
    display: hidden;
  }
}
</style>
