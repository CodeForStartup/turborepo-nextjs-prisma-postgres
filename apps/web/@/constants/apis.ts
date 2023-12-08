const APP_APIS = {
  public: {
    post: {
      GET: "/api/public/post/:postIdOrSlug",
    },
  },
  protected: {
    post: {
      actions: "/api/protected/post/:postId/actions",
    },
  },
}

export default APP_APIS
