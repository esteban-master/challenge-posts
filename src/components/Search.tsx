import { useState } from "react";
import { Post } from "../models";
import { FilterPosts } from "./FilterPosts";
import { ListPosts } from "./ListPosts";

export const Search = ({ posts }: { posts: Post[] }) => {
  const [textSearch, setTextSearch] = useState("");
  return (
    <div>
      <input
        className="w-80 border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
        type="text"
        onChange={(e) => setTextSearch(e.target.value)}
        placeholder="Buscar posts..."
      />
      <FilterPosts searchText={textSearch} />

      {!textSearch && (
        <div>
          <h2 className="text-2xl my-2">
            {posts.length === 0
              ? "No hay posts publicados"
              : `${posts.length} posts publicados`}
          </h2>
          <ListPosts posts={posts} />
        </div>
      )}
    </div>
  );
};
