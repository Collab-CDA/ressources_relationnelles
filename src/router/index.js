import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import TutoPage from "../views/TutoPage.vue";
import PublicResources from "../views/PublicResources.vue";
import CompleteResources from "@/views/CompleteResources.vue";
import ResourceDetail from "@/views/ResourceDetail.vue";
import ProgressionPage from "../views/ProgressionPage.vue";
import CguPage from "../views/CguPage.vue";
import Statistics from "@/views/Statistics.vue";
import AdminDashboard from "@/views/AdminDashboard.vue";
import AdminResources from "@/views/AdminResources.vue";
import CategoryManagement from "@/views/CategoryManagement.vue";
import UserManagement from "@/views/UserManagement.vue";
import ActivityPage from "@/views/ActivityPage.vue";
import MessageriePage from "@/views/MessageriePage.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/tuto", name: "TutoPage", component: TutoPage },
  { path: "/register", name: "RegisterPage", component: RegisterPage },
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: "/profile", name: "ProfilePage", component: ProfilePage },
  { path: "/messagerie", name: "MessageriePage", component: MessageriePage },
  { path: "/resources-public", name: "PublicResources", component: PublicResources },
  { path: "/complete-resources", name: "CompleteResources", component: CompleteResources },
  { path: "/resource-detail/:id", name: "ResourceDetail", component: ResourceDetail },
  { path: "/activity", name: "ActivityPage", component: ActivityPage },
  { path: "/progression", name: "ProgressionPage", component: ProgressionPage },
  { path: "/cgu", name: "CguPage", component: CguPage },
  { path: "/statistics", name: "Statistics", component: Statistics },
  { path: "/admin/dashboard", name: "AdminDashboard", component: AdminDashboard },
  { path: "/admin/resources", name: "AdminResources", component: AdminResources },
  { path: "/admin/category", name: "CategoryManagement", component: CategoryManagement },
  { path: "/admin/user", name: "UserManagement", component: UserManagement },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
