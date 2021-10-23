import { usePosts } from "../redux/store";
import { ListPosts } from "./ListPosts";

export const FilterPosts = ({ searchText }: { searchText: string }) => {
  const { posts } = usePosts();
  if (posts.length === 0) return null;
  return (
    <div>
      <h2 className="text-2xl my-2">{posts.length} encontrados</h2>
      <ListPosts posts={posts} />
    </div>
  );
};
