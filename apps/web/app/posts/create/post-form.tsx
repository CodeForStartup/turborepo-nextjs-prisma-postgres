"use client";

import { Prisma } from "database";

import { Button } from "@/components/ui/button";
import Editor from "@/molecules/editor";
import InputTitle from "@/molecules/input-title";
import Image from "next/image";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { createPost, updatePost } from "../post-handlers";
import { useParams } from "next/navigation";

export type PostFormProps = {
  defaultValues?: Pick<Prisma.Post, "title" | "content">;
};

const PostForm = ({
  defaultValues = { title: "", content: "" },
}: PostFormProps) => {
  const { postId } = useParams();

  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const handleSubmitPost: SubmitHandler<
    Pick<Prisma.Post, "title" | "content">
  > = async (data) => {
    if (postId) {
      await updatePost(Number(postId), {
        ...data,
      });
      return;
    }

    await createPost({
      ...data,
    });
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
        <Button variant="link">Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default PostForm;
