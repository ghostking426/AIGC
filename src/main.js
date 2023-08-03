import { createApp } from "vue";
import "@/styles/global-el.scss";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/theme-chalk/dark/css-vars.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "@/styles/common.scss";
let pinia = createPinia();
const app = createApp(App).use(pinia).use(router).use(ElementPlus, {
  locale: zhCn,
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
