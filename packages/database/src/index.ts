import prisma from "./prisma";
import { createTag, getTag, getTags } from "./tags/queries";
import type { TTagItem, TTagListItem } from "./tags/selects";

export * from "@prisma/client";
export default prisma;

export { createTag, getTag, getTags };

export type { TTagItem, TTagListItem };
