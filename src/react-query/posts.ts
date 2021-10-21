import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useQuery, useMutation, QueryClient } from "react-query";
import api from "../config/api";
import { Post } from "../models";

type ErrorResponse = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;

export const usePosts = () =>
  useQuery<Post[]>("posts", async () => {
    const { data } = await api.get<Post[]>("/posts");
    return data.sort((postA, postB) =>
      postB.createdAt.localeCompare(postA.createdAt)
    );
  });

export const useCreatePost = (queryClient: QueryClient) =>
  useMutation<Post, ErrorResponse, Pick<Post, "name" | "description">>(
    async (newPost) => {
      const { data } = await api.post<Post>(`/posts`, newPost);
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Post[]>("posts", (oldPost = []) => [
          data,
          ...oldPost,
        ]);
        toast.success(`Post creado con exito!`);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

export const useDeletePost = (queryClient: QueryClient) =>
  useMutation<Post, ErrorResponse, Pick<Post, "id">>(
    async ({ id }) => {
      const { data } = await api.delete<Post>(`/posts/${id}`);
      return data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData<Post[]>("posts", (oldPost = []) =>
          oldPost.filter((p) => p.id !== data.id)
        );
        toast.success(`${data.name} eliminado con exito`);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
