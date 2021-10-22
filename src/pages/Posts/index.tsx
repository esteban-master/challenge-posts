import { CreatePost } from "../../components/CreatePost";
import { useGetPostsQuery } from "../../redux/posts";
import { Search } from "../../components/Search";

export const PostsPage = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery();
  console.log("data posts: ", isError, isLoading, error);
  return (
    <div className="space-y-3 py-8">
      <CreatePost />

      {isLoading && <span>Cargando publicaciones...</span>}

      {isSuccess && data ? <Search posts={data} /> : null}

      {isError && <p>Error al obtener posts...</p>}
    </div>
  );
};
