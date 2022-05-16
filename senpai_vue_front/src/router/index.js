import Vue from "vue";
import VueRouter from "vue-router";

import mainLayout from "@/components/layout/mainLayout.vue";
import loginLayout from "@/components/layout/loginLayout.vue";

import login from "@/views/login.vue";
import dashboard from "@/views/dashboard.vue";
import accounting from "@/views/accounting/tables.vue";
import accountTables from "@/views/accounting/accountTables.vue";
import categoryTables from "@/views/accounting/categoryTables";
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
        component: login,
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
        component: dashboard,
      },
      {
        path: "/accounting/tables",
        name: "accountingTables",
        component: accounting,
      },
      {
        path: "/accounting/accounts",
        name: "accountTables",
        component: accountTables,
      },
      {
        path: "/accounting/categorys",
        name: "categoryTables",
        component: categoryTables,
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
