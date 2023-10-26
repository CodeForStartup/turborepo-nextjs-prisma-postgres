"use client"

import { Label } from "@radix-ui/react-dropdown-menu"
import { GithubIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
    <div className="mt-16 flex flex-1 justify-center">
      <div className="grid-6 grid w-full max-w-md">
        <form>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
            </div>
            <Button>Sign In with Email</Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center py-4 text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button variant="outline" type="button" onClick={onSignIn}>
          <GithubIcon size={16} />
          <span className="ml-2">GitHub</span>
        </Button>
      </div>
    </div>
  )
}
