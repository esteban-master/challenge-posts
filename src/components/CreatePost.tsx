import { Post } from "../models";
import { useCreatePostMutation } from "../redux/posts";
import { CreatePostForm } from "./CreatePostForm";
import { toast } from "react-toastify";

export const CreatePost = () => {
  const [createPost, { isLoading }] = useCreatePostMutation();

  function createNewPost({
    name,
    description,
  }: Pick<Post, "name" | "description">) {
    createPost({
      name,
      description,
    });
    toast.success(`Post creado con exito!`);
  }
  return (
    <div className="border border-gray-300 rounded-lg p-5 space-y-3">
      <h1 className="text-2xl font-bold"> Crear Nuevo Post </h1>
      <CreatePostForm isLoading={isLoading} onSubmit={createNewPost} />
    </div>
  );
};
