import { useEffect, useState } from "react";
import { CreatePost } from "./components/CreatePost";
import { ListPosts } from "./components/ListPosts";
import { Post } from "./models";
import { useGetPostsQuery } from "./redux/posts";
import { search } from "./utils/searchPosts";

function App() {
  const { data, isLoading, isSuccess } = useGetPostsQuery();
  const [textSearch, setTextSearch] = useState("");
  const [searchPosts, setSearchPosts] = useState<{
    posts: Post[];
    search: boolean;
  }>({ posts: [], search: false });

  useEffect(() => {
    if (data) {
      if (textSearch) {
        setSearchPosts((prev) => ({
          search: true,
          posts: search(data, textSearch),
        }));
      } else {
        setSearchPosts((prev) => ({
          search: false,
          posts: [],
        }));
      }
    }
  }, [textSearch, data]);
  return (
    <div className="container mx-auto space-y-3 py-8">
      <h1 className="text-4xl">App React Con Redux - TCIT</h1>

      <div>
        <input
          className="w-80 border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
          type="text"
          onChange={(e) => setTextSearch(e.target.value)}
          placeholder="Buscar posts..."
        />
      </div>

      <CreatePost />
      {isLoading && <span>Loading posts...</span>}
      <div>
        {isSuccess && data ? (
          <div>
            {searchPosts.search ? (
              <>
                <h2 className="text-2xl my-2">
                  {searchPosts.posts.length} posts encontrados
                </h2>
                <ListPosts posts={searchPosts.posts} />
              </>
            ) : (
              <>
                <h2 className="text-2xl my-2">
                  {data.length === 0
                    ? "No hay posts publicados"
                    : `${data.length} posts publicados`}
                </h2>
                <ListPosts posts={data} />
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
