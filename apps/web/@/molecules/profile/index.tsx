"use client"

import React from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Typography from "../typography"

const Profile = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = () => {
    // TODO: implement
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 rounded-md border p-8">
          <Typography variant="h2">Account</Typography>

          <div className="mb-4">
            <Label className="pb-2" htmlFor="email">
              Username
            </Label>
            <Input disabled id="username" {...register("username")} />
          </div>

          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <Label htmlFor="firstName">First name</Label>
              <Input disabled id="firstName" {...register("firstName")} />
            </div>
            <div className="flex-1">
              <Label htmlFor="lastName">Last name</Label>
              <Input disabled id="lastName" {...register("lastName")} />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input disabled id="email" {...register("email")} />
          </div>

          <div className="mb-4">
            <Label htmlFor="phoneNumber">Phone number</Label>
            <Input id="phoneNumber" {...register("phoneNumber")} />
          </div>

          <div className="mb-4">
            <Label htmlFor="address">Twitter</Label>
            <Input id="address" {...register("address")} />
          </div>

          <div className="mb-4">
            <Label htmlFor="address">Github</Label>
            <Input id="address" {...register("address")} />
          </div>

          <div className="mb-4">
            <Label htmlFor="address">Facebook</Label>
            <Input id="address" {...register("address")} />
          </div>

          <div className="mb-4">
            <Label htmlFor="address">Bio</Label>
            <Textarea id="address" {...register("address")} />
          </div>

          <div className="w-full">
            <Button className="w-full" type="submit">
              Update your account
            </Button>
          </div>
        </div>

        <div className="mt-8 rounded-md border p-8">
          <Typography variant="h2">Password</Typography>

          <div className="mb-4">
            <Label htmlFor="password">Current password</Label>
            <Input id="password" {...register("password")} />
          </div>

          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" {...register("password")} />
          </div>

          <div className="mb-4">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input id="confirmPassword" {...register("confirmPassword")} />
          </div>
        </div>

        <div className="mt-8 rounded-md border p-8">
          <Typography variant="h2">Deactive account</Typography>

          <Button variant="destructive" className="mt-4" type="button">
            Deactive account
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Profile
