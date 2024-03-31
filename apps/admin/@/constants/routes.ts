const APP_ROUTES = {
  DASHBOARD: "/",

  POST: {
    LIST: "/posts",
    DETAIL: "/posts/:id",
    ADD: "/posts/add",
    EDIT: "/posts/edit/:id",
  },

  TAG: {
    LIST: "/tags",
    DETAIL: "/tags/:id",
    ADD: "/tags/add",
    EDIT: "/tags/edit/:id",
  },

  ASSETS: {
    LIST: "/assets",
    DETAIL: "/assets/:id",
    ADD: "/assets/add",
    EDIT: "/assets/edit/:id",
  },

  CATEGORY: {
    LIST: "/categories",
    DETAIL: "/categories/:id",
    ADD: "/categories/add",
    EDIT: "/categories/edit/:id",
  },

  USER: {
    LIST: "/users",
    DETAIL: "/users/:id",
    ADD: "/users/add",
    EDIT: "/users/edit/:id",
  },

  ROLE: {
    LIST: "/roles",
    DETAIL: "/roles/:id",
    ADD: "/roles/add",
    EDIT: "/roles/edit/:id",
  },

  PERMISSION: {
    LIST: "/permissions",
    DETAIL: "/permissions/:id",
    ADD: "/permissions/add",
    EDIT: "/permissions/edit/:id",
  },

  SETTINGS: {
    LIST: "/settings",
    DETAIL: "/settings/:id",
    ADD: "/settings/add",
    EDIT: "/settings/edit/:id",
  },

  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  REGISTER: "/register",
  PROFILE: "/profile",
  PROFILE_EDIT: "/profile/edit",

  NOT_FOUND: "/404",
  SERVER_ERROR: "/500",
  UNAUTHORIZED: "/401",
  FORBIDDEN: "/403",
}

export default APP_ROUTES
