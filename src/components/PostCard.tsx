import { Post } from "../models";
import { useDeletePostMutation } from "../redux/posts";
import TimeAgoReact from "timeago-react";
import * as timeago from "timeago.js";
import es from "timeago.js/lib/lang/es";
timeago.register("es", es);
export const PostCard = ({ post }: { post: Post }) => {
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  return (
    <div className="bg-purple-100 rounded-lg px-5 py-2 space-y-2">
      <h2 className="text-2xl flex justify-between items-center">
        {post.name}
        <span className="text-gray-800 text-xs">
          <TimeAgoReact datetime={post.createdAt} locale="es" />
        </span>
      </h2>
      <p className=""> {post.description} </p>

      <div className="flex justify-end">
        <button
          className="bg-red-500 text-white px-5 py-1 rounded-lg"
          disabled={isDeleting}
          onClick={() => deletePost(post.id)}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};
