import "./App.css";
import { CreatePost } from "./components/CreatePost";
import { ListPosts } from "./components/ListPosts";
import { useGetPostsQuery } from "./redux/posts";

function App() {
  const { data, isLoading, isSuccess } = useGetPostsQuery();
  return (
    <div className="App">
      <h1>Redux TCIT</h1>
      <CreatePost />
      {isLoading && <span>Loading posts...</span>}
      {isSuccess && data ? <ListPosts posts={data} /> : null}
    </div>
  );
}

export default App;
