import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../../models";
import { toast } from "react-toastify";

export const postsAPI = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000/` }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
    }),
    createPost: builder.mutation<Post, Pick<Post, "name" | "description">>({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            postsAPI.util.updateQueryData("getPosts", undefined, (draft) => {
              draft.unshift(data);
            })
          );
          toast.success(`Post creado con exito!`);
        } catch (error) {
          toast.error(`Error al crear post`);
        }
      },
    }),
    deletePost: builder.mutation<Post, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            postsAPI.util.updateQueryData("getPosts", undefined, (draft) => {
              const indexFind = draft.findIndex(
                (p) => p.id.toString() === data.id.toString()
              );
              draft.splice(indexFind, 1);
            })
          );
        } catch (error) {
          console.log("Error", error);
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsAPI;
