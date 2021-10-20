import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../../models";

export const postsAPI = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000/` }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
      providesTags: (posts) =>
        posts
          ? [
              ...posts.map(({ id }) => ({ type: "Posts" as const, id })),
              { type: "Posts", id: "LIST_POSTS" },
            ]
          : [{ type: "Posts", id: "LIST_POSTS" }],
    }),
    createPost: builder.mutation<Post, Pick<Post, "name" | "description">>({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST_POSTS" }],
    }),
    deletePost: builder.mutation<Post, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Posts", id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsAPI;
