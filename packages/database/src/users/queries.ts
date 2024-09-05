import prisma from "../prisma"
import { IActionReturn } from "../shared/type"
import { TUserDetail, userDetailSelect } from "./selects"
import { TGetUserProps } from "./type"

export const getUser = async ({ userId }: TGetUserProps): Promise<IActionReturn<TUserDetail>> => {
  try {
    const data = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: userDetailSelect,
    })

    if (!data) {
      throw {
        error: "NOT_FOUND",
      }
    }

    return {
      data,
    }
  } catch (error) {
    throw {
      error,
      data: null,
    }
  }
}
