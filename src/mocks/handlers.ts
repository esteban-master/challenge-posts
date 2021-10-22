import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";
import { Post } from "../models";
export const mockData = [
  {
    id: 1,
    createdAt: "2021-10-21T13:40:46.864Z",
    updatedAt: "2021-10-21T13:40:46.865Z",
    name: "Publicacion mock 1",
    description: "Texto de la publicacion para rellenar!!!!!!!!!!",
  },
  {
    id: 2,
    createdAt: "2021-10-21T22:39:18.320Z",
    updatedAt: "2021-10-21T22:39:18.321Z",
    name: "Publicacion mock 2",
    description: "Texto de la publicacion para rellenar 2!!!!!!!!!!",
  },
];

export const handlers = [
  rest.get("http://localhost:3000/posts", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  }),
  rest.delete("http://localhost:3000/posts/:id", (req, res, ctx) => {
    const { id } = req.params;
    const elementoEliminado = mockData.find((p) => p.id.toString() === id);
    return res(ctx.status(200), ctx.json(elementoEliminado));
  }),
  rest.post("http://localhost:3000/posts", (req, res, ctx) => {
    const { name, description } = req.body as Pick<
      Post,
      "description" | "name"
    >;
    const newPost = {
      name,
      description,
      id: uuidv4(),
      createdAt: "2021-10-21T22:39:18.320Z",
      updatedAt: "2021-10-21T22:39:18.320Z",
    };
    return res(ctx.status(200), ctx.json(newPost));
  }),
];
