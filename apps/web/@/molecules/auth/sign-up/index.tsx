"use client"

import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Typography,
} from "ui"
import { z } from "zod"

import { signUp } from "@/actions/auth"
import { SignUpDataInput, signUpSchema } from "@/actions/auth/type"
import { redirect } from "@/utils/navigation"

import AuthForm from "../auth-form"

export default function SignUp() {
  const t = useTranslations("auth")

  const form = useForm<SignUpDataInput>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  })

  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = form

  // TODO:
  // const [state, formAction] = useActionState<Pick<Prisma.UserCreateInput, "email" | "password">>(
  //   signUp,
  //   null
  // )

  const formAction = async ({ confirmPassword, ...data }: SignUpDataInput) => {
    const error = await signUp(data)

    if (error.formErrors) {
      toast.error(error.formErrors?.at(0))

      return
    }
    if (error.fieldErrors) {
      Object?.entries(error.fieldErrors)?.forEach(([field, message]) => {
        setError(field, {
          type: "manual",
          message,
        })
      })
      return
    }

    redirect("/login")
  }

  return (
    <div className="w-full max-w-md flex-1 p-8">
      <AuthForm
        title="Register"
        description="Register to your account to continue."
      >
        <Form {...form}>
          <form onSubmit={handleSubmit(formAction)}>
            <div className="grid w-full gap-4">
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">{t("email_label")}</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder={t("email_label")}
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">{t("password_label")}</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="********"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmPassword">{t("confirm_password_label")}</FormLabel>
                    <FormControl>
                      <Input
                        id="confirmPassword"
                        placeholder="********"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit">{t("sign_up.title")}</Button>
            </div>
          </form>
        </Form>
      </AuthForm>

      <div className="mt-4 text-center">
        <Link href="signin">
          <Typography
            variant="span"
            className="mt-4"
          >
            {t("sign_up.already_have_an_account")}
            <Typography
              className="pl-1 font-bold hover:underline"
              variant="span"
            >
              {t("sign_up.sign_in")}
            </Typography>
          </Typography>
        </Link>
      </div>
    </div>
  )
}
