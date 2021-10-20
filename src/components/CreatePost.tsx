import { Post } from "../models";
import { useCreatePostMutation } from "../redux/posts";
import { CreatePostForm } from "./CreatePostForm";

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
  }
  return (
    <div>
      <CreatePostForm isLoading={isLoading} onSubmit={createNewPost} />
    </div>
  );
};
