const APP_ROUTES = {
  // Public routes
  HOME: "/",

  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_EMAIL: "/verify-email",

  ABOUT: "/about",
  TECHNICAL: "/technical",

  POSTS: "/posts",
  POST: "/posts/[post]",
  TAGS: "/tags",
  TAG: "/tags/[tag]",
  USERS: "/users",
  USER: "/users/[user]",

  // Authenticated routes
  PROFILE: "user/profile",
  SETTINGS: "user/settings",
  CHANGE_PASSWORD: "user/change-password",

  USER_POSTS: "user/posts",
  CREATE_POST: "user/posts/create",
  EDIT_POST: "user/posts/[post]/edit",
}

export default APP_ROUTES
