import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Lapangan from "../views/Lapangan.vue";
import Booking from "../views/Booking.vue";
import Riwayat from "../views/Riwayat.vue";
import DashboardAdmin from "../views/DashboardAdmin.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/lapangan",
    component: Lapangan,
  },
  {
    path: "/booking",
    component: Booking,
  },
  {
    path: "/riwayat",
    component: Riwayat,
  },
  {
    path: "/admin",
    component: DashboardAdmin,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;