import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Post } from "../models";
import { addPost } from "../redux/postsState";
import { usePosts, useStoreDispatch } from "../redux/store";

type PostValuesForm = Pick<Post, "name" | "description">;

const schema = Yup.object({
  name: Yup.string()
    .min(3, "Minimo 3 caracteres para el nombre")
    .required("El nombre es requerido"),
  description: Yup.string()
    .min(10, "Minimo 10 caracteres para la descripcion")
    .required("La descripcion es requerida")
    .trim(),
});

export const CreatePostForm = () => {
  const { isCreating } = usePosts();
  const dispatch = useStoreDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<PostValuesForm>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  async function createNewPost(values: PostValuesForm) {
    const { name, description } = values;

    try {
      await dispatch(addPost({ name, description })).unwrap();
      reset({ name: "", description: "" });
      toast.success(`Post creado correctamente!`);
    } catch (error: any) {
      toast.error(`Post no se pudo crear`);
    }
  }
  return (
    <form onSubmit={handleSubmit(createNewPost)}>
      <div className="space-y-3 ">
        <div>
          <label className="text-xl font-semibold" htmlFor="name">
            Nombre:
          </label>
          <input
            className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
            id="name"
            placeholder="Nombre..."
            type="text"
            {...register("name")}
          />
          <div className="text-sm text-red-500 my-1">
            {errors.name && <div>{errors.name.message}</div>}
          </div>
        </div>
        <div>
          <label className="text-xl font-semibold" htmlFor="description">
            Descripcion:
          </label>
          <textarea
            className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
            placeholder="Descripcion..."
            {...register("description")}
            id="description"
          ></textarea>

          <div className="text-sm text-red-500">
            {errors.description && <div>{errors.description.message}</div>}
          </div>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-400 text-white px-5 py-2 rounded-lg"
          type="submit"
          disabled={isSubmitting}
        >
          {isCreating ? "Creando..." : "Crear"}
        </button>
      </div>
    </form>
  );
};
