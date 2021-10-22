import { CreatePostForm } from "./CreatePostForm";

export const CreatePost = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-5 space-y-3">
      <h1 className="text-2xl font-bold"> Crear Nuevo Post </h1>
      <CreatePostForm />
    </div>
  );
};
