import { Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Post } from "../models";
import { addPost } from "../redux/postsState";
import { usePosts, useStoreDispatch } from "../redux/store";

type PostValuesForm = Pick<Post, "name" | "description">;

export const CreatePostForm = () => {
  const { isCreating } = usePosts();
  const dispatch = useStoreDispatch();
  async function createNewPost({
    values,
    formikHelpers,
  }: {
    values: PostValuesForm;
    formikHelpers: FormikHelpers<PostValuesForm>;
  }) {
    const { name, description } = values;
    try {
      await dispatch(addPost({ name, description })).unwrap();
      formikHelpers.resetForm();
      toast.success(`Post creado correctamente!`);
    } catch (error: any) {
      toast.error(`Post no se pudo crear`);
    }
  }
  return (
    <Formik
      initialValues={{ name: "", description: "" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(3, "Minimo 3 caracteres para el nombre")
          .required("El nombre es requerido"),
        description: Yup.string()
          .min(20, "Minimo 20 caracteres para la descripcion")
          .required("La descripcion es requerida")
          .trim(),
      })}
      onSubmit={(values, formikHelpers) =>
        createNewPost({ values, formikHelpers })
      }
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-3 ">
            <div>
              <label className="text-xl font-semibold" htmlFor="name">
                Nombre:
              </label>
              <input
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
                id="firstName"
                placeholder="Nombre..."
                type="text"
                {...formik.getFieldProps("name")}
              />
              <div className="text-sm text-red-500 my-1">
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </div>
            </div>
            <div>
              <label className="text-xl font-semibold" htmlFor="description">
                Descripcion:
              </label>
              <textarea
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
                placeholder="Descripcion..."
                {...formik.getFieldProps("description")}
                id=""
              ></textarea>

              <div className="text-sm text-red-500">
                {formik.touched.description && formik.errors.description ? (
                  <div>{formik.errors.description}</div>
                ) : null}
              </div>
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-400 text-white px-5 py-2 rounded-lg"
              type="submit"
            >
              {isCreating ? "Creando..." : "Crear"}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};
