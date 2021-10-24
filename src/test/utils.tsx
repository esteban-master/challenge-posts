import { configureStore } from "@reduxjs/toolkit";
// import { render } from "@testing-library/react";
import postsReducer from "../redux/postsState";

import { Provider } from "react-redux";

export function reduxProvider({
  store = configureStore({
    reducer: { posts: postsReducer },
  }),
} = {}) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { wrapper: Wrapper };
}
