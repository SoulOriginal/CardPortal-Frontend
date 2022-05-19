import Vue from "vue";
import Router from "vue-router";
import { scrollBehavior } from "~/utils";

Vue.use(Router);

const page = (path) => () => {
  return import(`~/pages/${path}`).then((m) => m.default || m);
};

const routes = [
  { path: "/", name: "home", component: page("index.vue") },
  { path: "/test", name: "testtf", component: page("test.vue") },
  // },
  { path: "/login", name: "login", component: page("auth/login.vue") },
  { path: "/register", name: "auth.user", component: page("auth/user.vue") },
  { path: "/admin", name: "admin", component: page("admin/index.vue") },
  {
    path: "/admin/users",
    name: "admin.users",
    component: page("admin/users.vue"),
  },
  {
    path: "/admin/cards",
    name: "admin.cards",
    component: page("admin/cards.vue"),
  },
  {
    path: "/admin/find/by/order/nuber",
    name: "admin.get_by_order_number",
    component: page("admin/get_by_order_number.vue"),
  },
  { path: "/user", name: "user", component: page("products.vue") },
  { path: "/user/orders", name: "orders", component: page("orders.vue") },
  {
    path: "/settings",
    name: "settings",
    component: page("settings/password.vue"),
  },
  {
    path: "/user/orders/history",
    name: "orders.history",
    component: page("ordersHistory.vue"),
  },
  {
    path: "/password/reset",
    name: "password.request",
    component: page("auth/password/email.vue"),
  },
  {
    path: "/password/reset/auth",
    name: "password.reset",
    component: page("auth/password/reset.vue"),
  },
  {
    path: "/email/verify/",
    name: "verification.verify",
    component: page("auth/verification/verify.vue"),
  },
  {
    path: "/email/resend",
    name: "verification.resend",
    component: page("auth/verification/resend.vue"),
  },
];

export function createRouter() {
  return new Router({
    routes,
    scrollBehavior,
    mode: "history",
  });
}
