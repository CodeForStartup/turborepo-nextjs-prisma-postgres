import React from "react"
import Link from "next/link"

import { GithubIcon } from "lucide-react"
import { Button, Card, CardContent, CardFooter, Input, Label, Typography } from "ui"

const RegisterPage: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="mt-16 w-full max-w-md flex-1 rounded-md p-8">
        <div>
          <Typography variant="h1">Register</Typography>

          <Typography
            variant="span"
            className="mt-4"
          >
            Register to your account to continue.
          </Typography>
        </div>

        <div className="grid-6 mt-8 grid w-full">
          <form>
            <Card>
              <CardContent className="pt-6">
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
                  <Button>Sign up</Button>
                </div>
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
          <Link href="sign-in">
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
    </div>
  )
}

export default RegisterPage
