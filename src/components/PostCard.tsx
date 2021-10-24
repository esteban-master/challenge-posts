import { Post } from "../models";
import TimeAgoReact from "timeago-react";
import * as timeago from "timeago.js";
import es from "timeago.js/lib/lang/es";
import { toast } from "react-toastify";

import { usePosts, useStoreDispatch } from "../redux/store";
import { deletePost } from "../redux/postsState";
timeago.register("es", es);

export const PostCard = ({
  post,
  indexPost,
}: {
  post: Post;
  indexPost: number;
}) => {
  const { isDeleting } = usePosts();
  const dispatch = useStoreDispatch();

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
          disabled={isDeleting[indexPost].status}
          type="button"
          onClick={() => {
            dispatch(deletePost({ id: post.id, indexPost }))
              .unwrap()
              .then((res) => {
                toast.success(`${res.name} eliminado con exito`);
              })
              .catch(() => {
                toast.error(`Error al eliminar post: ${post.name}`);
              });
          }}
        >
          {isDeleting[indexPost].status ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};
