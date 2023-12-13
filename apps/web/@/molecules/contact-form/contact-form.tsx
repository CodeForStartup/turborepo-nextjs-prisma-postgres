"use client"

import { useForm } from "react-hook-form"

type FormData = {
  name: string
  email: string
  description: string
}

const ContactForm = () => {
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    // Handle form submission
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" {...register("name")} />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" {...register("email")} />

      <label htmlFor="description">Description</label>
      <textarea id="description" {...register("description")} />

      <button type="submit">Submit</button>
    </form>
  )
}

export default ContactForm
