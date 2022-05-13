import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Clients from "../views/Clients.vue";
import Contracts from "../views/Contracts.vue";
import Tickets from "../views/Tickets.vue";
Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    meta: {
      layout: "default"
    },
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: "no-sidebar"
    }

  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
    meta: {
      layout: "default"
    }
  },
  {
    path: "/contracts",
    name: "Contracts",
    component: Contracts,
    meta: {
      layout: "default"
    }
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: Tickets,
    meta: {
      layout: "default"
    }
  },
  {
    path: "/clients",
    name: "Clients",
    component: Clients,
    meta: {
      layout: "default"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;