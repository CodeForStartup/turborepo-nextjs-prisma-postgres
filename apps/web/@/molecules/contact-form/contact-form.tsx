"use client"

import { useForm } from "react-hook-form"
import { Button, Input, Label, Textarea } from "ui"

type FormData = {
  name: string
  email: string
  description: string
}

const ContactForm = () => {
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = () => {
    // Handle form submission
  }

  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 grid w-full max-w-lg items-center gap-1.5">
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name"
              {...register("name")}
            />
          </div>

          <div className="mb-4 grid w-full max-w-lg items-center gap-1.5">
            <Label htmlFor="email">Your email</Label>
            <Input
              id="email"
              {...register("email")}
            />
          </div>

          <div className="mb-4 grid w-full max-w-lg items-center gap-1.5">
            <Label htmlFor="description">Your request</Label>
            <Textarea
              id="description"
              {...register("description")}
            />
          </div>

          <div className="mt-4">
            <Button
              type="submit"
              className="w-full max-w-lg"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
