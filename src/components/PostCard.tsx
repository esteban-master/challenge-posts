import { Post } from "../models";
import TimeAgoReact from "timeago-react";
import * as timeago from "timeago.js";
import es from "timeago.js/lib/lang/es";

import { useDeletePost } from "../react-query/posts";
import { useQueryClient } from "react-query";
timeago.register("es", es);

export const PostCard = ({ post }: { post: Post }) => {
  const queryClient = useQueryClient();
  const deletePost = useDeletePost(queryClient);
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
          className="bg-red-500 hover:bg-red-400 text-white px-5 py-1 rounded-lg"
          disabled={deletePost.isLoading}
          type="button"
          onClick={() => {
            deletePost.mutate({ id: post.id });
          }}
        >
          {deletePost.isLoading ? "Deleting..." : `Delete`}
        </button>
      </div>
    </div>
  );
};
