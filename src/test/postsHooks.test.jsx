import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { delayApi, mockData } from "../mocks/handlers";
import { PostsPage } from "../pages/Posts";
import { usePosts } from "../redux/store";
import { reduxProvider } from "./utils";

describe.only("Test hooks postsApi", () => {
  test("Obteniendo los posts desde el state de redux con usePosts", async () => {
    const { wrapper } = reduxProvider();
    render(<PostsPage />, { wrapper });
    const { result, waitForNextUpdate } = renderHook(() => usePosts(), {
      wrapper,
    });

    expect(result.current.posts).toEqual([]);
    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate({ timeout: delayApi + 100 });
    console.log(result.current);
    expect(result.current.posts).toEqual(mockData);
    // expect(result.current.isLoading).toBeFalsy();
    // expect(result.current.isDeleting).toEqual([
    //   { id: 1, status: false },
    //   { id: 2, status: false },
    //   { id: 3, status: false },
    // ]);
  });
});
