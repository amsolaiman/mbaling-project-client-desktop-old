import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("pages/LoginForm.vue"),
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "logs", component: () => import("src/pages/LogsPage.vue") },
    ],
  },
  {
    path: "/records/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/Records/RecordsMenu.vue"),
      },
      {
        path: "student",
        component: () => import("src/pages/Records/RecordsStudent.vue"),
      },
      {
        path: "landlord",
        component: () => import("src/pages/Records/RecordsLandlord.vue"),
      },
    ],
  },
  {
    path: "/accounts/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/Accounts/AccountsMenu.vue"),
      },
      {
        path: "create",
        component: () => import("src/pages/Accounts/AccountsCreateForm.vue"),
      },
      {
        path: "delete",
        component: () => import("src/pages/Accounts/AccountsDeleteForm.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
