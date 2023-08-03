import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue"),
    children: [
      {
        path: "chat",
        name: "chat",
        component: () => import("@/views/chat/index.vue"),
      },
      {
        path: "draw",
        name: "draw",
        component: () => import("@/views/draw/index.vue"),
      },
      {
        path: "drawHistory",
        name: "drawHistory",
        component: () => import("@/views/draw/history.vue"),
      },
      {
        path: "personCenter",
        name: "personCenter",
        component: () => import("@/views/person_center/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/home.vue"),
    children: [
      {
        path: "userManage",
        name: "userManage",
        component: () => import("@/views/admin/userManage/index.vue"),
      },
      {
        path: "goodsManage",
        name: "goodsManage",
        component: () => import("@/views/admin/goodsManage/index.vue"),
      },
    ],
  },
  {
    path: "/",
    redirect: "/home/draw",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
