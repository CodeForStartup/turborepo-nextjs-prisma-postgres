"use client";

import { Prisma } from "database";

import { Button } from "@/components/ui/button";
import Editor from "@/molecules/editor";
import InputTitle from "@/molecules/input-title";
import Image from "next/image";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { createPost, updatePost } from "../post-handlers";
import { useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const PostForm = ({
  title = "",
  content = "",
}: Partial<Prisma.PostCreateInput>) => {
  const router = useRouter();
  const { postId } = useParams();

  const postSchema = z.object({
    title: z.string(),
    content: z
      .string()
      .max(10000, "Content must be at most 10000 characters")
      .optional()
      .nullable(),
  }) satisfies z.ZodType<Partial<Prisma.PostCreateInput>>;

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<Partial<Prisma.PostCreateInput>>({
    defaultValues: {
      title,
      content,
    },
    resolver: zodResolver(postSchema),
  });

  const handleSubmitPost = async (data) => {
    try {
      if (postId) {
        await updatePost(Number(postId), {
          ...data,
        });
        toast.success("Post updated successfully", {
          autoClose: 200,
        });
        router.push(`/posts/${postId}`);
      } else {
        const newPost = await createPost({
          ...data,
        });
        toast.success("Post published successfully");
        router.push(`/posts/${newPost.id}`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      className="mx-auto w-full max-w-6xl"
      onSubmit={handleSubmit(handleSubmitPost)}
    >
      <div className="mx-auto w-full max-w-6xl mt-8">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <InputTitle placeholder="Title..." {...field} />
          )}
        />
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <Editor
              content={field?.value}
              placeholder="Content..."
              {...field}
            />
          )}
        />
      </div>
      <div className="flex justify-end p-2">
        <Link
          className="flex items-center justify-center rounded-md text-sm font-medium mr-4 h-10"
          href="/posts"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={!isValid}>
          Publish
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
