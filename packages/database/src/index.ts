import { createImage, deleteImage, getImage, getImages, updateImage } from "./images/queries"
import { TImage } from "./images/selects"
import { IImageFilter, IListImageResponse, ImageOrderBys } from "./images/type"
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
  updatePostStatus,
} from "./posts/queries"
import { TCreatePostInput, TPostActionType, TPostItem } from "./posts/selects"
import { TGetPostsRequest, TGetPostsResponse } from "./posts/type"
import prisma from "./prisma"
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  FilterValues,
  IActionReturn,
  IGetListResponse,
  PeriodValues,
} from "./shared/type"
import { createTag, getTag, getTags, getTopTags } from "./tags/queries"
import type { TTagItem, TTagListItem } from "./tags/selects"
import { tagListSelect } from "./tags/selects"
import { getUser } from "./users/queries"
import { TUserDetail } from "./users/selects"

export * from "@prisma/client"
export default prisma

export {
  // Tags
  createTag,
  getTag,
  getTags,
  getTopTags,
  tagListSelect,

  // Posts
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  updatePostStatus,
  FilterValues,
  PeriodValues,

  // Users
  getUser,

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
  TImage,

  // Users
  TUserDetail,

  // Shared
  IActionReturn,
  IGetListResponse,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
}
