import { search } from "../utils/searchPosts";
import { ListPosts } from "./ListPosts";
import { usePosts } from "../react-query/postsHooks";

export const FilterPosts = ({ searchText }: { searchText: string }) => {
  const { data } = usePosts();
  const posts = data && searchText ? search(data, searchText) : [];

  if (posts.length === 0) return null;
  return (
    <div>
      <h2 className="text-2xl my-2">{posts.length} encontrados</h2>
      <ListPosts posts={posts} />
    </div>
  );
};
