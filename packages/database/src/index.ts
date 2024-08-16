import { createImage, deleteImage, getImage, getImages, updateImage } from "./images/queries"
import { TImageFilter, TListImageResponse } from "./images/type"
import { createPost, getPost, getPosts, updatePost, updatePostStatus } from "./posts/queries"
import { TCreatePostInput, TPostActionType, TPostItem } from "./posts/selects"
import { TGetPostsRequest, TGetPostsResponse } from "./posts/type"
import prisma from "./prisma"
import {
  ActionReturnType,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  OrderBy,
  PeriodValues,
  TGetListResponse,
} from "./shared/type"
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
  createPost,
  updatePost,
  updatePostStatus,

  // Images
  getImages,
  createImage,
  updateImage,
  deleteImage,
  getImage,
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

  // Images
  TImageFilter,
  TListImageResponse,

  // Shared
  ActionReturnType,
  OrderBy,
  TGetListResponse,
  PeriodValues,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
}
