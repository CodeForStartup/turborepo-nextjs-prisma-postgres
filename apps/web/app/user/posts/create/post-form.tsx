"use client";

import { Button } from "@/components/ui/button";
import Editor from "@/molecules/editor";
import InputTitle from "@/molecules/input-title";
import Image from "next/image";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { IPostForm, createPost } from "../post-handlers";

const PostForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onCreatePost: SubmitHandler<IPostForm> = async (data) => {
    createPost(data);
  };

  return (
    <form
      className="mx-auto w-full max-w-6xl lg:px-8"
      onSubmit={handleSubmit(onCreatePost)}
    >
      <div className="mx-auto w-full max-w-6xl lg:px-8 mt-8">
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
          render={({ field }) => <Editor placeholder="Content..." {...field} />}
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
