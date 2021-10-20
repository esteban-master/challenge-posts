import { Post } from "../models";
import { useCreatePostMutation } from "../redux/posts";
import { CreatePostForm } from "./CreatePostForm";

export const CreatePost = () => {
  const [createPost, resultCreatePost] = useCreatePostMutation();

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
      <CreatePostForm onSubmit={createNewPost} />
    </div>
  );
};
