import { Post } from "../models";
import { useDeletePostMutation } from "../redux/posts";

export const PostCard = ({ post }: { post: Post }) => {
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  return (
    <div>
      <h2> {post.name} </h2>
      <p> {post.description} </p>
      <span>{post.createdAt}</span>
      <button disabled={isDeleting} onClick={() => deletePost(post.id)}>
        {isDeleting ? "Deleting..." : "Delete Post"}
      </button>
    </div>
  );
};
