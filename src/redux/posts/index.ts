import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../../models";

export const postsAPI = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000/` }),
  // refetchOnReconnect: true,
  // refetchOnFocus: true,

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
        } catch (error) {
          console.log("Error en create post", error);
        }
      },
    }),
    deletePost: builder.mutation<Post, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: (result, error, id) => [{ type: "Posts", id }],
      // Optimistic
      // onQueryStarted(id, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     postsAPI.util.updateQueryData("getPosts", undefined, (draft) => {
      //       const indexFind = draft.findIndex(
      //         (p) => p.id.toString() === id.toString()
      //       );
      //       draft.splice(indexFind, 1);
      //     })
      //   );
      //   queryFulfilled.catch(patchResult.undo);
      // },
      // Pesimictic
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
