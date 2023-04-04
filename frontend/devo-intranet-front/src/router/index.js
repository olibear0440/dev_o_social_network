import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PostView from "../views/PostView.vue";
import MypostView from "../views/MypostView.vue";
import ThisPostView from "../views/ThisPostView.vue";
import UsersView from "../views/UsersView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/Posts",
    name: "postView",
    component: PostView,
  },
  {
    path: "/Mypost",
    name: "Mypost",
    component: MypostView,
  },
  {
    path: "/Posts/:id",
    name: "ThisPost",
    component: ThisPostView,
  },
  {
    path: "/users",
    name: "users",
    component: UsersView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
