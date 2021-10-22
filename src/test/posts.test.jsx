import { setupApiStore } from "./utils";
import {
  postsAPI,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
} from "../redux/posts";
import { renderHook, act } from "@testing-library/react-hooks";
import { mockData } from "../mocks/handlers";

describe("Test hooks postsApi", () => {
  const { wrapper } = setupApiStore(postsAPI);
  test("Get posts hook", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetPostsQuery(), {
      wrapper,
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.data).toEqual(mockData);
  });
  test("Delete post hook", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useDeletePostMutation(),
      {
        wrapper,
      }
    );
    const [primerPost] = mockData;
    const [deletePost, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBeFalsy();

    act(() => {
      deletePost(primerPost.id);
    });

    const [_, resultLoadingResponse] = result.current;
    expect(resultLoadingResponse.isLoading).toBe(true);

    await waitForNextUpdate();

    const [__, loadResponse] = result.current;
    expect(loadResponse.data).toEqual(primerPost);
    expect(loadResponse.isLoading).toBeFalsy();
    expect(loadResponse.isSuccess).toBe(true);
  });
  test("Create post hook", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useCreatePostMutation(),
      {
        wrapper,
      }
    );
    const newPost = {
      name: "Create Desde Test Hook Redux",
      description: "Texto de relleno para el test!!!!!!!!!!!",
    };
    const [createPost, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBeFalsy();

    act(() => {
      createPost(newPost);
    });

    const [_, resultLoadingResponse] = result.current;
    expect(resultLoadingResponse.isLoading).toBe(true);

    await waitForNextUpdate();

    const [__, loadResponse] = result.current;
    expect(loadResponse.data).toEqual({
      name: newPost.name,
      description: newPost.description,
      id: 4,
      createdAt: "2021-10-21T22:39:18.320Z",
      updatedAt: "2021-10-21T22:39:18.320Z",
    });
    expect(loadResponse.isLoading).toBeFalsy();
    expect(loadResponse.isSuccess).toBe(true);
  });
});
