import { QueryClient } from "react-query";
import { mockData } from "../mocks/handlers";
import { waitFor } from "@testing-library/react";
import { PostsPage } from "../pages/Posts/index";
import userEvent from "@testing-library/user-event";
import { renderWithClient } from "./utils";

describe("Imprime los post", () => {
  test("Encuentra el titulo", async () => {
    const queryClient = new QueryClient();
    const result = renderWithClient(queryClient, <PostsPage />);
    expect(
      await result.findByRole("heading", {
        name: `${mockData.length} posts publicados`,
      })
    ).toBeInTheDocument();
  });
  test("Encuentra el nombre de los posts listados", async () => {
    const queryClient = new QueryClient();
    const result = renderWithClient(queryClient, <PostsPage />);
    await waitFor(() => {
      mockData.forEach((mockPost) => {
        expect(
          result.getByText(mockPost.name, { exact: false })
        ).toBeInTheDocument();
      });
    });
  });
  test("Elimina el primer post", async () => {
    const queryClient = new QueryClient();
    const result = renderWithClient(queryClient, <PostsPage />);
    const [button1] = await result.findAllByText(/delete/i);
    const [primerPost] = mockData;
    userEvent.click(button1);
    await waitFor(() => {
      expect(result.queryByText(primerPost.name)).not.toBeInTheDocument();
    });
    expect(
      result.getByRole("heading", { name: `2 posts publicados` })
    ).toBeInTheDocument();
  });
  test("Crear nuevo post", async () => {
    const queryClient = new QueryClient();
    const result = renderWithClient(queryClient, <PostsPage />);
    const inputName = await result.findByRole("textbox", { name: /nombre:/i });
    const inputDescription = await result.findByRole("textbox", {
      name: /descripcion:/i,
    });
    const mockCreatePost = {
      name: "Post desde un test",
      description: "Descripcion desde un mock en test!!!!!!!!!!!!!",
    };

    userEvent.type(inputName, mockCreatePost.name);
    userEvent.type(inputDescription, mockCreatePost.description);

    userEvent.click(await result.findByText("Crear"));
    expect(await result.findByText(mockCreatePost.name)).toBeInTheDocument();
  });
});
