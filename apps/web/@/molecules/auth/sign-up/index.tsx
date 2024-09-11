"use client"

import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { GithubIcon } from "lucide-react"
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
  Input,
  Label,
  Typography,
} from "ui"
import { z } from "zod"

import AuthForm from "../auth-form"

export default function SignUp() {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
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
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit">Register</Button>
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
            Already have an account?{" "}
            <Typography
              className="font-bold hover:underline"
              variant="span"
            >
              Sign In
            </Typography>
          </Typography>
        </Link>
      </div>
    </div>
  )
}
