import { Prisma } from "@prisma/client"

import prisma from "../prisma"
import { IActionReturn } from "../shared/type"
import { TUserDetail, userDetailSelect } from "./selects"

export const getUser = async (
  userFindFirstArgs: Prisma.UserFindFirstArgs
): Promise<IActionReturn<TUserDetail>> => {
  try {
    const data = await prisma.user.findFirst({
      ...userFindFirstArgs,
      select: userDetailSelect,
    })

    if (!data) {
      throw {
        data: null,
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

export const createUser = async (
  userCreateArgs: Prisma.UserCreateArgs
): Promise<IActionReturn<TUserDetail>> => {
  try {
    const data = await prisma.user.create({
      ...userCreateArgs,
      select: userDetailSelect,
    })

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

export const updateUser = async (
  userUpdateArgs: Prisma.UserUpdateArgs
): Promise<IActionReturn<TUserDetail>> => {
  try {
    const data = await prisma.user.update({
      ...userUpdateArgs,
      select: userDetailSelect,
    })
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
