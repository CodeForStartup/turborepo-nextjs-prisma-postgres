"use client"

import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { GithubIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Typography,
} from "ui"
import { z } from "zod"

import AuthForm from "../auth-form"

export default function SignUp() {
  const t = useTranslations("auth")

  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(t("email.invalid")),
        password: z.string().min(8, t("password.min")),
        confirmPassword: z.string().min(8, t("password.min")),
      })
    ),
  })

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = form

  const onSubmit = (data: any) => {
    // TODO: Implement sign up
  }

  return (
    <div className="w-full max-w-md flex-1 p-8">
      <AuthForm
        title="Register"
        description="Register to your account to continue."
      >
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full gap-4">
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">{t("email_label")}</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder={t("email")}
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
                    <FormLabel htmlFor="email">{t("password_label")}</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder={t("password")}
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
                    <FormLabel htmlFor="email">{t("confirm_password_label")}</FormLabel>
                    <FormControl>
                      <Input
                        id="confirmPassword"
                        placeholder={t("confirm_password_placeholder")}
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
