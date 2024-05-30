import { createRouter, createWebHashHistory } from "vue-router";
import type { NavigationGuardWithThis } from "vue-router";
import { useUserStore } from "~/stores/user.ts";
import HomePage from "~/pages/HomePage.vue";
import NotFoundPage from "~/pages/NotFoundPage.vue";

const requireUserBeforeEnter: NavigationGuardWithThis<undefined> = (to, _from, next) => {
  const user = useUserStore();

  if (!user.info) {
    next({ name: "LoginPage" });
  }
  else {
    next(to);
  }
};

const requireGuestBeforeEnter: NavigationGuardWithThis<undefined> = (to, _from, next) => {
  const user = useUserStore();

  if (user.info) {
    next({ name: "HomePage" });
  }
  else {
    next(to);
  }
};

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: "HomePage",
      path: "/",
      component: HomePage,
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: "LoginPage",
      path: "/login",
      component: () => import("~/pages/LoginPage.vue"),
      meta: {
        requiresAuth: false,
      },
      beforeEnter: requireGuestBeforeEnter,
    },
    {
      name: "ProfilePage",
      path: "/profile",
      component: () => import("~/pages/ProfilePage.vue"),
      meta: {
        requiresAuth: true,
      },
      beforeEnter: requireUserBeforeEnter,
    },
    {
      name: "NotFoundPage",
      path: "/:pathMatch(.*)*",
      component: NotFoundPage,
    },
    {
      path: "/code:afterUser(.*)",
      redirect: "/",
    },
  ],
});
