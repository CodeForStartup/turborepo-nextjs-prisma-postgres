const APP_APIS = {
  public: {
    post: {
      GET: "/api/public/post/:postIdOrSlug",
      GET_COMMENTS: "/api/public/post/:postIdOrSlug/comments",
      GET_ACTIONS: "/api/public/post/:postIdOrSlug/actions/:actionType", // actionType: LIKE, BOOKMARK
    },
    comment: {
      GET: "/api/public/comment/:commentId",
    },
    posts: {
      GET: "/api/public/posts",
    },
    tags: {
      GET: "/api/public/tags",
    },
    tag: {
      GET: "/api/public/tag/:tagIdOrSlug",
      FOLLOWERS: "/api/public/tag/:tagIdOrSlug/followers",
      FOLLOWINGS: "/api/public/tag/:tagIdOrSlug/followings",
    },
    users: {
      GET: "/api/public/users",
      FOLLOWERS: "/api/protected/user/:userIdOrSlug/followers",
      FOLLOWINGS: "/api/protected/user/:userIdOrSlug/followings",
      FOLLOWINGS_TAGS: "/api/public/users/:userIdOrSlug/followings/tags",
    },
  },
  protected: {
    comment: {
      CREATE: "/api/protected/comment",
      DELETE: "/api/protected/comment/:commentId",
      UPDATE: "/api/protected/comment/:commentId",
      ACTIONS: "/api/protected/comment/:commentId/actions",
    },
    posts: {
      GET: "/api/protected/posts",
    },
    post: {
      ACTIONS: "/api/protected/post/:postId/actions", // actionType: LIKE, BOOKMARK
      DELETE: "/api/protected/post/:postId",
      // CREATE: "/api/protected/post",
      UPDATE: "/api/protected/post/:postId",
      POST_TOGGLE_PUBLISHED: "/api/protected/post/:postId/toggle-published", // actionType: PUBLISH, UNPUBLISH
    },
    tag: {
      CREATE: "/api/protected/tags",
    },
    user: {
      GET: "/api/protected/user/:userId",
      UPDATE: "/api/protected/user/:userId",
      DELETE: "/api/protected/user/:userId", // Deactivate account
      TOGGLE_FOLLOWER: "/api/protected/user/:userId/followers",
      GET_FOLLOWER_STATUS: "api/protected/user/:userId/follower",
    },
  },
}

export default APP_APIS
