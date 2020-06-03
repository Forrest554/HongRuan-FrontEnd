import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import("../views/Admin/Admin.vue")
  },
  {
    path: "/server",
    name: "Server",
    component: () =>
      import("../views/Server/Server.vue")
  },
  {
    path: "/server_stu",
    name: "ServerStu",
    component: () =>
      import("../views/Server/ServerStu.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
