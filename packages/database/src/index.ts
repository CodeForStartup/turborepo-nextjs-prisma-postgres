import { createImage, deleteImage, getImage, getImages, updateImage } from "./images/queries"
import { IImageFilter, IListImageResponse, ImageOrderBys } from "./images/type"
import { createPost, getPost, getPosts, updatePost, updatePostStatus } from "./posts/queries"
import { TCreatePostInput, TPostActionType, TPostItem } from "./posts/selects"
import { TGetPostsRequest, TGetPostsResponse } from "./posts/type"
import prisma from "./prisma"
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  IActionReturn,
  IGetListResponse,
  OrderBy,
  PeriodValues,
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
  IImageFilter,
  IListImageResponse,
  ImageOrderBys,

  // Shared
  IActionReturn,
  OrderBy,
  IGetListResponse,
  PeriodValues,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
}
