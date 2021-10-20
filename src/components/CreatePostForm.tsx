import { Formik } from "formik";
import * as Yup from "yup";
import { Post } from "../models";

export const CreatePostForm = ({
  onSubmit,
}: {
  onSubmit: (values: Pick<Post, "name" | "description">) => void;
}) => {
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
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="name">Nombre: </label>
            <input
              id="firstName"
              type="text"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="description">Descripcion: </label>
            <input
              id="firstName"
              type="text"
              {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
            ) : null}
          </div>

          <button type="submit">Crear</button>
        </form>
      )}
    </Formik>
  );
};
