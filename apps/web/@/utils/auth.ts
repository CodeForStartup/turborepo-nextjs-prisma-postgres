import { authConfigs } from "configs/auth"
import { getServerSession as getServerSessionNextAuth } from "next-auth"

export const getServerSession = async () => {
  return await getServerSessionNextAuth(authConfigs)
}
