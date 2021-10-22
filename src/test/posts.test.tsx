import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook } from "@testing-library/react-hooks";
import { usePosts, useDeletePost } from "../react-query/posts";
import { mockData } from "../mocks/handlers";
import { renderWithClient } from "./utils/utils";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Test de hooks posts", () => {
  test.skip("Obtener los posts", async () => {
    const { result, waitFor } = renderHook(() => usePosts(), { wrapper });

    await waitFor(() => {
      return result.current.isSuccess;
    });
    console.log(result.current);
    expect(result.current.data).toEqual(mockData);
  });
  test("Hook de borrar 1 post", async () => {
    function PageTest() {
      const { mutate } = useDeletePost(queryClient);
      const { data, isLoading } = usePosts();
      if (isLoading) return <p>Cargando...</p>;
      return (
        <div>
          {data && (
            <ul>
              {data.map((p) => (
                <li key={p.id}>
                  <p>{p.name}</p>
                  <button
                    onClick={() =>
                      mutate({
                        id: p.id,
                      })
                    }
                  >
                    Borrar {p.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    const { getByText, findByText, queryByText, findByRole, debug } =
      renderWithClient(queryClient, <PageTest />);
    expect(getByText("Cargando...")).toBeInTheDocument();
    const [primerPost] = mockData;
    expect(await findByText(primerPost.name)).toBeInTheDocument();
    userEvent.click(
      await findByRole("button", { name: `Borrar ${primerPost.name}` })
    );

    await waitFor(() => {
      expect(queryByText(primerPost.name)).not.toBeInTheDocument();
    });
  });
});
