import { useEffect, useState } from "react";
import { CreatePost } from "../../components/CreatePost";
import { ListPosts } from "../../components/ListPosts";
import { Search } from "../../components/Search";
import { Post } from "../../models";
import { getPosts } from "../../redux/postsState";
import { usePosts, useStoreDispatch } from "../../redux/store";

export const PostsPage = () => {
  const { posts, isLoading, isError } = usePosts();
  const [postsFilter, setPostsFilter] = useState<Post[]>([]);

  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="space-y-3 py-8">
      <CreatePost />

      {isLoading && <span>Cargando publicaciones...</span>}
      {isError && <p>Error al obtener posts...</p>}

      {!isLoading && posts && (
        <>
          <Search
            posts={posts}
            searchPosts={(postsFilter) => setPostsFilter(postsFilter)}
          />

          {postsFilter.length > 0 ? (
            <>
              <h2> {postsFilter.length} posts encontrados</h2>
              <ListPosts posts={postsFilter} />
            </>
          ) : (
            <>
              <h2> {posts.length} posts publicados</h2>
              <ListPosts posts={posts} />
            </>
          )}
        </>
      )}
    </div>
  );
};
