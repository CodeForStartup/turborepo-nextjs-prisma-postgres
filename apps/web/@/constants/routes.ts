const APP_ROUTES = {
  // Public routes
  HOME: "/",

  LOGIN: "/signin",
  REGISTER: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_EMAIL: "/verify-email",

  ABOUT: "/about",
  TECHNICAL: "/technical",

  POSTS: "/posts",
  POST: "/posts/:postId",
  TAGS: "/tags",
  TAG: "/tags/:tagId",
  USERS: "/users",
  USER: "/users/:userId",
  AUTHOR: "/author/:authorId",
  AUTHORS: "/authors",

  // Authenticated routes
  PROFILE: "/user/profile",
  SETTINGS: "/user/settings",
  CHANGE_PASSWORD: "/user/change-password",

  USER_POSTS: "/user/posts",
  CREATE_POST: "/user/posts/create",
  EDIT_POST: "/user/posts/:postId/edit",
}

export default APP_ROUTES
