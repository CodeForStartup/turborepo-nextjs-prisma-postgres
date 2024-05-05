"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { Label } from "@radix-ui/react-dropdown-menu"
import { Tabs } from "@radix-ui/react-tabs"
import { GithubIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Input,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from "ui"

export default function SignInForm() {
  const searchParams = useSearchParams()

  const onSignIn = async (e) => {
    e.preventDefault()
    await signIn("github", {
      redirect: true,
      callbackUrl: (searchParams.get("callbackUrl") as string) || "/",
    })
  }

  return (
    <div className="mt-16 w-full max-w-md flex-1 rounded-md p-8">
      <div>
        <Typography variant="h1">Sign In</Typography>

        <Typography
          variant="span"
          className="mt-4"
        >
          Sign in to your account to continue.
        </Typography>
      </div>

      <div className="grid-6 mt-8 grid w-full">
        <form>
          <Card>
            <CardContent className="pt-6">
              <Tabs>
                <div className="mb-1">
                  <Label>Sign in mode</Label>
                </div>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="magic">Magic Link</TabsTrigger>
                  <TabsTrigger value="username_password">Username/Password</TabsTrigger>
                </TabsList>
                <TabsContent value="username_password">
                  <div className="grid gap-4">
                    <div className="grid gap-1">
                      <Label className="">Email</Label>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label className="">Password</Label>
                      <Input
                        id="password"
                        placeholder="********"
                        type="password"
                        autoCapitalize="none"
                        autoCorrect="off"
                      />
                    </div>
                    <Button>Sign In</Button>
                  </div>
                </TabsContent>
                <TabsContent value="magic">
                  <div className="grid gap-4">
                    <div className="grid gap-1">
                      <Label className="">Email</Label>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                      />
                    </div>
                    <Button>Sign In With Email</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <div className="flex w-full flex-col">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center py-4 text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  type="button"
                  onClick={onSignIn}
                >
                  <GithubIcon size={16} />
                  <span className="ml-2">GitHub</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>

      <div className="mt-4 text-center">
        <Link href="register">
          <Typography
            variant="span"
            className="mt-4"
          >
            Don&apos;t have an account?{" "}
            <Typography
              className="font-bold hover:underline"
              variant="span"
            >
              Sign Up
            </Typography>
          </Typography>
        </Link>
      </div>
    </div>
  )
}
