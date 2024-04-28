"use client"

import React, { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/gif"]

type TagFormProps = {
  //
}

const TagForm: React.FC<TagFormProps> = ({}) => {
  const formSchema = z.object({
    name: z
      .string({
        required_error: "Tag name is required",
      })
      .min(2, "Tag name must be at least 2 characters")
      .max(50, "Tag name must be at most 50 characters"),
    // Method 1:
    // description: z
    //   .union([
    //     z
    //       .string()
    //       .min(4, "Description must be at least 4 characters")
    //       .max(255, "Description must be at most 255 characters"),
    //     z.string().length(0),
    //   ])
    //   .optional()
    //   .transform((e) => (e === "" ? undefined : e)),
    // Method 2:
    // description: z
    //   .string()
    //   .min(4, "Description must be at least 4 characters")
    //   .max(255, "Description must be at most 255 characters")
    //   .or(z.literal("")),
    // Method 3:
    description: z
      .string()
      .min(4, "Description must be at least 4 characters")
      .max(255, "Description must be at most 255 characters")
      .optional()
      .or(z.literal("").transform(() => undefined)),
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

  const onSubmit = () => {
    //
  }

  const { handleSubmit } = form

  return (
    <div className="max-w-[800px]">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="reactjs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="React is a free and open-source front-end JavaScript library for building user interfaces based on components."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button>Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default TagForm
