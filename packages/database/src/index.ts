import { getPost, getPosts, updatePost } from "./posts/queries"
import { TCreatePostInput, TPostActionType, TPostItem } from "./posts/selects"
import { TGetPostsRequest, TGetPostsResponse } from "./posts/type"
import prisma from "./prisma"
import { createTag, getTag, getTags, getTopTags } from "./tags/queries"
import type { TTagItem, TTagListItem } from "./tags/selects"

export * from "@prisma/client"
export default prisma

export {
  // Tags
  createTag,
  getTag,
  getTags,
  getTopTags,

  // Posts
  getPost,
  getPosts,
  updatePost,
}

export type {
  //Tags
  TTagItem,
  TTagListItem,
  TCreatePostInput,
  TPostActionType,

  // Posts
  TPostItem,
  TGetPostsRequest,
  TGetPostsResponse,
}
