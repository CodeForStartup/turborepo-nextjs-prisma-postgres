"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "configs/auth"
import { Github } from "lucide-react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from "ui"
import { z } from "zod"

import { signInWithCredentials, signInWithGithub } from "@/actions/auth"

type FormData = {
  email: string
  password: string
}

export default function SignInForm() {
  const t = useTranslations("auth")

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      })
    ),
  })

  const onSignIn = async (data: FormData) => {
    await signInWithCredentials(data.email, data.password)
  }

  return (
    <div className="mt-16 w-full max-w-md flex-1 rounded-md p-8">
      <div className="text-center">
        <Typography variant="h1">Sign In</Typography>

        <Typography
          variant="span"
          className="mt-4"
        >
          Sign in to your account to continue.
        </Typography>
      </div>

      <div className="grid-6 mt-8 grid w-full">
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSignIn)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="********"
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    {...register("password", { required: true })}
                  />
                </div>
                <Button type="submit">{t("sign_in.title")}</Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="flex w-full flex-col">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center py-4 text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {t("or_continue_with")}
                  </span>
                </div>
              </div>

              <form action={signInWithGithub}>
                <Button
                  variant="outline"
                  type="submit"
                >
                  <Github size={16} />
                  <span className="ml-2">{t("github")}</span>
                </Button>
              </form>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-4 text-center">
        <Link href="/signup">
          <Typography
            variant="span"
            className="mt-4"
          >
            {t("dont_have_an_account")}
            <Typography
              className="font-bold hover:underline"
              variant="span"
            >
              {t("sign_up.title")}
            </Typography>
          </Typography>
        </Link>
      </div>
    </div>
  )
}
