"use client"

import React from "react"
import { Form, useForm } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Typography from "../typography"

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = () => {}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-8">
        <Typography variant="h2">Account</Typography>

        <div className="mb-4">
          <Label htmlFor="email">Username</Label>
          <Input id="username" {...register("username")} />
        </div>

        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" {...register("firstName")} />
          </div>
          <div className="flex-1">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" {...register("lastName")} />
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register("email")} />
        </div>
      </div>

      <div></div>
    </form>
  )
}

export default Profile
