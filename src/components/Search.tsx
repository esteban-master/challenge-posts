import { useEffect, useState } from "react";
import { Post } from "../models";
import { search } from "../utils/searchPosts";

export const Search = ({
  posts,
  searchPosts,
}: {
  posts: Post[];
  searchPosts: (posts: Post[]) => void;
}) => {
  const [textSearch, setTextSearch] = useState("");

  useEffect(() => {
    if (textSearch) {
      searchPosts(search(posts, textSearch));
    } else {
      searchPosts([]);
    }
  }, [textSearch, posts]);

  return (
    <div>
      <input
        className="w-80 border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
        type="text"
        onChange={(e) => setTextSearch(e.target.value)}
        placeholder="Buscar posts..."
      />
    </div>
  );
};
