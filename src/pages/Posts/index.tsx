import { CreatePost } from "../../components/CreatePost";
import { Search } from "../../components/Search";
import { usePosts } from "../../react-query/posts";

export const PostsPage = () => {
  const { data, isLoading, isSuccess } = usePosts();

  return (
    <div className="space-y-3 py-8">
      <CreatePost />

      {isLoading && <span>Cargando publicaciones...</span>}

      {isSuccess && data ? <Search posts={data} /> : null}
    </div>
  );
};
