import { CreatePost } from "../../components/CreatePost";
import { Search } from "../../components/Search";
import { usePosts } from "../../react-query/postsHooks";

export const PostsPage = () => {
  const { data, isLoading, isSuccess } = usePosts();
  if (isLoading) return <span>Cargando publicaciones...</span>;
  return (
    <div className="space-y-3 py-8">
      <CreatePost />

      {isSuccess && data ? <Search posts={data} /> : null}
    </div>
  );
};
