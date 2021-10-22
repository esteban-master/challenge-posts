import { setupApiStore, withProvider } from "./utils";
import { postsAPI } from "../redux/posts/index";
import { PostsPage } from "../pages/Posts";
import { render, waitFor, screen, act } from "@testing-library/react";

import { mockData } from "../mocks/handlers";
import userEvent from "@testing-library/user-event";
// import { render, waitFor, screen } from "@testing-library/react";
// import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
// import { Provider } from "react-redux";
// import { store } from "../redux/store";

describe("Test PagePost con redux", () => {
  const { store } = setupApiStore(postsAPI);
  test("Crear nuevo post", async () => {
    const newPost = {
      name: "Test para redux",
      description: "Buenos dias redux!",
    };
    const { data } = await store.dispatch(
      postsAPI.endpoints.createPost.initiate(newPost)
    );

    expect(data.name).toEqual(newPost.name);
    expect(data.description).toEqual(newPost.description);
  });

  test("Encuentra el titulo", async () => {
    const Wrapper = withProvider(store);
    render(
      <Wrapper>
        <PostsPage />
      </Wrapper>
    );

    expect(
      await screen.findByRole("heading", {
        name: `${mockData.length} posts publicados`,
      })
    ).toBeInTheDocument();
  });
  test("Encuentra el nombre de los posts listados", async () => {
    const Wrapper = withProvider(store);
    render(
      <Wrapper>
        <PostsPage />
      </Wrapper>
    );

    await waitFor(() => {
      mockData.forEach((p) => {
        expect(screen.getByText(p.name)).toBeInTheDocument();
      });
    });
  });

  test("Elimina el primer post", async () => {
    const Wrapper = withProvider(store);
    render(
      <Wrapper>
        <PostsPage />
      </Wrapper>
    );
    const [button1] = await screen.findAllByText(/delete/i);
    const [primerPost] = mockData;
    userEvent.click(button1);

    await waitFor(() => {
      expect(screen.queryByText(primerPost.name)).not.toBeInTheDocument();
    });
    expect(
      screen.getByRole("heading", { name: `2 posts publicados` })
    ).toBeInTheDocument();
  });
});
