import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/utilisateurs/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import TutoPage from "../views/utilisateurs/TutoPage.vue";
import PublicResources from "../views/utilisateurs/PublicResources.vue";
import CompleteResources from "@/views/utilisateurs/CompleteResources.vue";
import ResourceDetail from "@/views/utilisateurs/ResourceDetail.vue";
import ProgressionPage from "../views/utilisateurs/ProgressionPage.vue";
import CguPage from "../views/footer/cguPage.vue";
import Statistics from "@/views/administration/Statistics.vue";
import AdminDashboard from "@/views/administration/AdminDashboard.vue";
import AdminResources from "@/views/administration/AdminResources.vue";
import CategoryManagement from "@/views/administration/CategoryManagement.vue";
import UserManagement from "@/views/administration/UserManagement.vue";
import ActivityPage from "@/views/utilisateurs/ActivityPage.vue";
import MessageriePage from "@/views/utilisateurs/MessageriePage.vue";
import EditResource from "@/views/utilisateurs/EditResource.vue";
import AddResources from "@/views/utilisateurs/AddResources.vue";
import ContactUsPage from "@/views/footer/ContactUsPage.vue";
import FaqsPage from "@/views/footer/FaqsPage.vue";
import PersonalDataPage from "@/views/footer/PersonalDataPage.vue";
import FriendsPage from '@/views/utilisateurs/FriendsPage.vue';
import MyResources from '@/views/utilisateurs/MyResources.vue';
import ChoixHeader from '@/views/administration/ChoixHeader.vue';
import CommentManagement from "@/views/administration/CommentManagement.vue";
import ModoResources from "@/views/administration/ModoResources.vue";
import SuperAdminUserManagement from "@/views/administration/SuperAdminUserManagement.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/tuto", name: "TutoPage", component: TutoPage },
  { path: "/register", name: "RegisterPage", component: RegisterPage },
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: '/choix-header', component: ChoixHeader },
  { path: "/profile", name: "ProfilePage", component: ProfilePage },
  { path: "/messagerie/:friendId", name: "MessageriePage", component: MessageriePage, props: true }, // Correction ici
  { path: "/resources-public", name: "PublicResources", component: PublicResources },
  { path: "/complete-resources", name: "CompleteResources", component: CompleteResources },
  { path: "/resource-detail/:id", name: "ResourceDetail", component: ResourceDetail },
  { path: "/activity", name: "ActivityPage", component: ActivityPage },
  { path: "/progression", name: "ProgressionPage", component: ProgressionPage },
  { path: "/cgu", name: "CguPage", component: CguPage },
  { path: "/personaldata", name: "PersonalDataPage", component: PersonalDataPage },
  { path: "/faqs", name: "FaqsPage", component: FaqsPage },
  { path: "/contactus", name: "ContactUsPage", component: ContactUsPage },
  { path: "/statistics", name: "Statistics", component: Statistics },
  { path: "/admin/dashboard", name: "AdminDashboard", component: AdminDashboard },
  { path: "/admin/resources", name: "AdminResources", component: AdminResources },
  { path: "/admin/category", name: "CategoryManagement", component: CategoryManagement },
  { path: "/admin/user", name: "UserManagement", component: UserManagement },
  { path: '/admin/resources/edit/:id', name: 'editResource', component: EditResource, props: true },
  { path: "/add-resources", name: "AddResources", component: AddResources },
  { path: '/amis', name: 'FriendsPage', component: FriendsPage },
  { path: '/my-resources', name: 'MyResources', component: MyResources },
  { path: '/commentaires', component: CommentManagement },
  { path: "/modo/resources", name: "ModoResources", component: ModoResources },
  { path: "/super-admin/user", name: "SuperAdminUserManagement", component: SuperAdminUserManagement }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
