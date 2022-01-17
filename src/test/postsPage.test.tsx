import { reduxProvider } from "./utils";
import { PostsPage } from "../pages/Posts";
import { waitFor, screen, render } from "@testing-library/react";
import { delayApi, mockData } from "../mocks/handlers";
import userEvent from "@testing-library/user-event";

const delay = delayApi + 100;

describe("Test PagePost con redux", () => {
  beforeEach(() => {
    const { wrapper } = reduxProvider();
    render(<PostsPage />, { wrapper });
  });

  test("Encuentra el titulo", async () => {
    expect(
      await screen.findByRole(
        "heading",
        {
          name: `${mockData.length} posts publicados`,
        },
        {
          timeout: delay,
        }
      )
    ).toBeInTheDocument();
  });
  test("Crear nuevo post", async () => {
    const newPost = {
      name: "Test para redux",
      description: "Buenos dias redux, texto para hacer relleno!",
    };

    await waitFor(
      () => {
        expect(getAllButtonDelete().length).toBe(mockData.length);
      },
      {
        timeout: delay,
      }
    );

    userEvent.type(getInputNamePost(), newPost.name);
    userEvent.type(getInputDescriptionPost(), newPost.description);
    userEvent.click(getButtonCrear());

    await waitFor(
      () => {
        expect(screen.getByText(newPost.name)).toBeInTheDocument();
        expect(getAllButtonDelete().length).toBe(4);
      },
      {
        timeout: delay,
      }
    );
  });

  test("Encuentra el nombre de los posts listados", async () => {
    await waitFor(
      () => {
        mockData.forEach((p) => {
          expect(screen.getByText(p.name)).toBeInTheDocument();
        });
      },
      {
        // La api de mock le di un delay de 1500 milisegundos
        timeout: delay,
      }
    );
  });

  test("Elimina el primer post", async () => {
    const [deleteButton1] = await screen.findAllByText(
      /delete/i,
      {},
      { timeout: delay }
    );
    const [primerPost] = mockData;
    userEvent.click(deleteButton1);

    await waitFor(
      () => {
        expect(screen.queryByText(primerPost.name)).not.toBeInTheDocument();
      },
      {
        timeout: delay,
      }
    );

    expect(
      screen.getByRole("heading", {
        name: `${
          mockData.filter((p) => p.id !== primerPost.id).length
        } posts publicados`,
      })
    ).toBeInTheDocument();
  });
});

function getInputNamePost() {
  return screen.getByLabelText(/nombre:/i);
}
function getInputDescriptionPost() {
  return screen.getByLabelText(/descripcion:/i);
}
function getButtonCrear() {
  return screen.getByRole("button", { name: /crear/i });
}

function getAllButtonDelete() {
  return screen.getAllByRole("button", { name: "Delete", exact: true });
}
