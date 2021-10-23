import { Post } from "../models";
import { PostCard } from "./PostCard";

export const ListPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <ul className="space-y-3">
      {posts.map((p, i) => (
        <PostCard key={p.id} post={p} indexPost={i} />
      ))}
    </ul>
  );
};
