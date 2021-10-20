import { useGetPostsQuery } from "../redux/posts";
import { search } from "../utils/searchPosts";
import { ListPosts } from "./ListPosts";

export const FilterPosts = ({ searchText }: { searchText: string }) => {
  const { posts } = useGetPostsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      posts: data && searchText ? search(data, searchText) : [],
    }),
  });

  if (posts.length === 0) return null;
  return (
    <div>
      <h2 className="text-2xl my-2">{posts.length} encontrados</h2>
      <ListPosts posts={posts} />
    </div>
  );
};
