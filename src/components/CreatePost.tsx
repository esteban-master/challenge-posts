import { Post } from "../models";
import { CreatePostForm } from "./CreatePostForm";

import { useCreatePost } from "../react-query/posts";
import { useQueryClient } from "react-query";

export const CreatePost = () => {
  const queryClient = useQueryClient();
  const createPost = useCreatePost(queryClient);

  function createNewPost({
    name,
    description,
  }: Pick<Post, "name" | "description">) {
    createPost.mutate({
      name,
      description,
    });
  }
  return (
    <div className="border border-gray-300 rounded-lg p-5 space-y-3">
      <h1 className="text-2xl font-bold"> Crear Nuevo Post </h1>
      <CreatePostForm
        isLoading={createPost.isLoading}
        onSubmit={createNewPost}
      />
    </div>
  );
};
