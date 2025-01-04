import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import PublicResources from "../views/PublicResources.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: "/register", name: "RegisterPage", component: RegisterPage },
  { path: "/resources", name: "ResourcesPage", component: PublicResources },
  { path: "/dashboard", name: "DashboardPage", component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
