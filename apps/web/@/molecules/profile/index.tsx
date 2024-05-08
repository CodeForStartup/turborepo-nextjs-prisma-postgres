"use client"

import React from "react"

import { useForm } from "react-hook-form"
import { Button, Input, Label, Textarea, Typography } from "ui"

import APP_APIS from "@/constants/apis"
import { TUserItem } from "@/types/users"
import { generatePath } from "@/utils/generatePath"

type ProfileType = {
  user: TUserItem
}

const Profile: React.FC<ProfileType> = ({ user }) => {
  const { register, handleSubmit } = useForm<
    TUserItem & {
      firstName: string
      lastName: string
    }
  >({
    defaultValues: {
      name: user?.name,
      firstName: user?.name,
      lastName: user?.name,
      email: user?.email,
      address: user?.address,
      phone: user?.phone,
      twitter: user?.twitter,
      github: user?.github,
      facebook: user?.facebook,
      bio: user?.bio,
    },
  })

  const onSubmit = async (user: TUserItem) => {
    try {
      // Post to API
      await fetch(
        generatePath(APP_APIS.protected.user.UPDATE, {
          userId: user.id,
        }),
        {
          method: "PUT",
          body: JSON.stringify({
            ...user,
            // name: `${firstName} ${lastName}`,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    } catch (error) {}
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 rounded-md border p-8">
          <Typography variant="h2">Account</Typography>

          <div className="mb-4">
            <Label
              className="pb-2"
              htmlFor="email"
            >
              Username
            </Label>
            <Input
              disabled
              id="name"
              {...register("name")}
            />
          </div>

          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <Label htmlFor="firstName">First name</Label>
              <Input
                disabled
                id="firstName"
                {...register("firstName")}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                disabled
                id="lastName"
                {...register("lastName")}
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled
              id="email"
              {...register("email")}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              {...register("address")}
            />
          </div>

          {/* <div className="mb-4">
            <Label htmlFor="country">Country</Label>
            <Input id="country" {...register("country")} />
          </div> */}

          <div className="mb-4">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              {...register("phone")}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              {...register("twitter")}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="github">Github</Label>
            <Input
              id="github"
              {...register("address")}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              {...register("facebook")}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              {...register("bio")}
            />
          </div>

          <div className="w-full">
            <Button
              className="w-full"
              type="submit"
            >
              Update your account
            </Button>
          </div>
        </div>

        <div className="mt-8 rounded-md border p-8">
          <Typography variant="h2">Deactive account</Typography>

          <Button
            variant="destructive"
            className="mt-4"
            type="button"
          >
            Deactive account
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Profile
