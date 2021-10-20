import { Post } from "../models";

export function search(posts: Post[], search: string): Post[] {
  return posts.filter((p) => {
    const { name, description } = p;
    const lowercaseSearch = search.toLowerCase();
    return (
      description.toLowerCase().includes(lowercaseSearch) ||
      name.toLowerCase().includes(lowercaseSearch)
    );
  });
}
