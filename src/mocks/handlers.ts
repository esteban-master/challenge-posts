import { rest } from "msw";

import { Post } from "../models";
export const mockData = [
  {
    id: 1,
    createdAt: "2021-10-22T02:39:52.573Z",
    updatedAt: "2021-10-22T02:39:52.573Z",
    name: "Post MOCK 1",
    description: "El primer posts en TCIT",
  },
  {
    id: 2,
    createdAt: "2021-10-22T02:38:04.745Z",
    updatedAt: "2021-10-22T02:38:04.746Z",
    name: "Post MOCK 2",
    description: "El segundo posts en TCIT",
  },
  {
    id: 3,
    createdAt: "2021-10-20T19:51:09.986Z",
    updatedAt: "2021-10-20T19:51:09.987Z",
    name: "Post MOCK 3",
    description: "Algun texto para esta publicacion",
  },
];

export const handlers = [
  rest.get("http://localhost:3001/posts", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  }),
  rest.delete("http://localhost:3001/posts/:id", (req, res, ctx) => {
    const { id } = req.params;
    const elementoEliminado = mockData.find((p) => p.id.toString() === id);
    return res(ctx.status(200), ctx.json(elementoEliminado));
  }),
  rest.post("http://localhost:3001/posts", (req, res, ctx) => {
    console.log("Body:::", req.body);
    const { name, description } = req.body as Pick<
      Post,
      "description" | "name"
    >;
    const newPost = {
      name,
      description,
      id: 4,
      createdAt: "2021-10-21T22:39:18.320Z",
      updatedAt: "2021-10-21T22:39:18.320Z",
    };
    return res(ctx.status(200), ctx.json(newPost));
  }),
];
