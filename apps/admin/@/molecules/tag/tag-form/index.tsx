"use client"

import React, { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/gif"]

type TagFormProps = {}

interface Tag {
  name: string
  description: string
  image: string
}

const TagForm: React.FC<TagFormProps> = ({}) => {
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(100),
    image: z
      .any()
      .refine((file) => {
        return file?.size < 1000000
      }, "Image size must be less than 1MB")
      .refine((file) => {
        return ACCEPTED_IMAGE_TYPES.includes(file?.type)
      }, "File must be an image"),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (e: React.FormEvent) => {
    //
  }

  const { handleSubmit } = form

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default TagForm
