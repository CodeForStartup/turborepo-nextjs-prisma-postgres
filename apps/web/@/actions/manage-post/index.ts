import { postSelect, TPostItem } from "@/types/posts"

export const getPostByUserId = async (userId: string): Promise<TPostItem[]> => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      select: postSelect,
    })

    return posts
  } catch (error) {
    throw error
  }
}
