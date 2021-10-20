import { CreatePost } from "../../components/CreatePost";
import { useGetPostsQuery } from "../../redux/posts";
import { Search } from "../../components/Search";

export const PostsPage = () => {
  const { data, isLoading, isSuccess } = useGetPostsQuery();
  return (
    <div className="space-y-3 py-8">
      <CreatePost />

      {isLoading && <span>Cargando publicaciones...</span>}

      {isSuccess && data ? <Search posts={data} /> : null}
    </div>
  );
};
