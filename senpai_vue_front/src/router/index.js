import Vue from "vue";
import VueRouter from "vue-router";

import mainLayout from "@/components/layout/mainLayout.vue";
import loginLayout from "@/components/layout/loginLayout.vue";

import loginView from "@/views/loginView.vue";
import dashboardView from "@/views/dashboardView.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "login",
    component: loginLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: loginView,
        meta: {
          title: "登入",
        },
      },
    ],
  },
  {
    path: "/",
    redirect: "login",
    name: "layout",
    component: mainLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: dashboardView,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
