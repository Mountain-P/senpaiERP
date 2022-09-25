import Vue from "vue";
import VueRouter from "vue-router";

import mainLayout from "@/components/layout/mainLayout.vue";
import loginLayout from "@/components/layout/loginLayout.vue";

import PageNotFound from "@/views/pageNotFound.vue"

import login from "@/views/login.vue";
import dashboard from "@/views/dashboard.vue";
import accounting from "@/views/accounting/tables.vue";
import accountTables from "@/views/accounting/accountTables.vue";
import categoryTables from "@/views/accounting/categoryTables.vue";
import projectTables from "@/views/project/tables.vue";
import empolyeeManageTables from "@/views/employee/tables.vue";
import empolyeeManagePTTables from "@/views/employee/PTtables.vue";
import employeeManageSalaryManage from "@/views/employee/salaryManage.vue"
import employeeManageDutyTables from "@/views/employee/dutyTables.vue"
import equipmentManageTables from '@/views/equipment/tables.vue'
import equipmentManageUsage from '@/views/equipment/usage.vue'
import clientManageTables from '@/views/client/tables.vue';
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
      {
        path: "/projectManage/tables",
        name: "projectTables",
        component: projectTables,
      },
      {
        path: "/employeeManage/tables",
        name: "employeeManageTables",
        component: empolyeeManageTables,
      },
      {
        path: "/employeeManage/PTtables",
        name: "employeeManagePTTables",
        component: empolyeeManagePTTables,
      },
      {
        path: "/employeeManage/salaryManage",
        name: "employeeManageSalaryManage",
        component: employeeManageSalaryManage
      },
      {
        path: "/employeeManage/duty",
        name: "employeeManageDutyTables",
        component: employeeManageDutyTables
      },
      {
        path: "/equipmentManage/tables",
        name: "equipmentManageTables",
        component: equipmentManageTables
      },
      {
        path: "/equipmentManage/usage",
        name: "equipmantManageUsage",
        component: equipmentManageUsage
      },
      {
        path: "clientManage/tables",
        name: "clientManageTables",
        component: clientManageTables,
      },
      { path: "*", component: PageNotFound },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
